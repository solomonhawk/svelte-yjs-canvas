import { browser } from '$app/env';
import * as Y from 'yjs';
import memoize from 'proxy-memoize';
import { proxy, subscribe } from 'sveltio';
import { proxyWithComputed } from 'sveltio/utils';
import { bindProxyAndYMap } from 'valtio-yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { randomName } from './user';
import { autumn, endsega32, randomColor, type Palette } from './palette';

type User = {
	id: number;
	name: string;
	color: string;
	cursorState: {
		x: number;
		y: number;
	};
};

type State = {
	pixels: number[];
};

type UsersState = {
	users: User[];
};

type LocalState = {
	selectedColor: number;
	paletteId: number;
	synced: boolean;
};

const webRtcRoom = `svelte-yjs-canvas-demo-${process.env.NODE_ENV}`;

const doc = new Y.Doc();
const ymap = doc.getMap('map');
const undoManager = new Y.UndoManager(ymap);

const userName = randomName();
const userColor = randomColor(autumn);
const canvasWidth = 64;
const canvasHeight = 64;
const pixelSize = 10;

const palettes = [autumn, endsega32];

const selectedColor = browser ? JSON.parse(localStorage?.getItem('selectedColorId') || '0') : 0;
const selectedPalette = browser ? JSON.parse(localStorage?.getItem('selectedPaletteId') || '0') : 0;

const state = proxy<State>({
	pixels: new Array(canvasWidth * canvasHeight).fill(0)
});

const usersState = proxy<UsersState>({
	users: []
});

const localState = proxyWithComputed<LocalState, { palette: Palette }>(
	{
		selectedColor,
		paletteId: selectedPalette,
		synced: false
	},
	{
		palette: memoize((snap) => palettes[snap.paletteId])
	}
);

subscribe(localState, () => {
	localStorage.setItem('selectedColorId', JSON.stringify(localState.selectedColor));
	localStorage.setItem('selectedPaletteId', JSON.stringify(localState.paletteId));

	if (localState.selectedColor >= localState.palette.length) {
		localState.selectedColor = localState.palette.length - 1;
	}
});

let provider: WebrtcProvider | undefined;
let persistence: IndexeddbPersistence | undefined;
let currentUserId: number | undefined;

if (browser) {
	provider = new WebrtcProvider(webRtcRoom, doc);
	persistence = new IndexeddbPersistence(webRtcRoom, doc);

	currentUserId = provider?.awareness.clientID;

	provider.awareness.on('change', () => {
		const states = Array.from(provider?.awareness.getStates().values() || []).map(
			(state) => state.user
		);

		usersState.users = states;
	});

	updateLocalUserState({
		id: provider.awareness.clientID,
		name: userName,
		color: userColor,
		cursorState: { x: 0, y: 0 }
	});

	provider.on('synced', ({ synced }: { synced: boolean }) => {
		localState.synced = synced;
	});

	// bind the ymap to the valito proxy state
	// TODO: investigate. doing this server-side seems to cause a problem with
	// clients resetting the shared doc state
	bindProxyAndYMap(state, ymap);
}

function updateLocalUserState(newState: Record<string, unknown>) {
	const currentState = provider?.awareness.getLocalState();

	provider?.awareness.setLocalStateField('user', {
		...currentState?.user,
		...newState
	});
}

function updateUserCursor(cursorState: { x: number; y: number }) {
	updateLocalUserState({ cursorState });
}

function setPixel(pixel: { x: number; y: number }, colorIndex: number) {
	state.pixels[pixel.x + pixel.y * canvasWidth] = colorIndex;
	undoManager.stopCapturing();
}

function setPalette(paletteIndex: number) {
	localState.paletteId = paletteIndex;
}

function pickColor(color: number) {
	localState.selectedColor = color;
}

function resetCanvas() {
	state.pixels = new Array(canvasWidth * canvasHeight).fill(0);
}

export {
	state,
	usersState,
	localState,
	canvasWidth,
	canvasHeight,
	pixelSize,
	currentUserId,
	setPalette,
	setPixel,
	pickColor,
	resetCanvas,
	updateUserCursor,
	undoManager
};
