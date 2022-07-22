import { browser } from '$app/env';
import * as Y from 'yjs';
import { proxy } from 'sveltio';
import { bindProxyAndYMap } from 'valtio-yjs';
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from 'y-indexeddb';
import { randomColor, randomName } from './user';

// create a new Y doc
const doc = new Y.Doc();

const userName = randomName();
const userColor = randomColor();

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
	count: number;
	pixels: [];
};

type UsersState = {
	users: User[];
};

const state = proxy<State>({
	count: 0,
	pixels: []
});

const usersState = proxy<UsersState>({
	users: []
});

let provider: WebrtcProvider | undefined;
let persistence: IndexeddbPersistence | undefined;
let currentUserId: number | undefined;

if (browser) {
	provider = new WebrtcProvider('svelte-yjs-canvas-demo', doc);
	persistence = new IndexeddbPersistence('svelte-yjs-canvas-demo', doc);

	// doc.on('beforeTransaction', (...args) => console.log('beforeTransaction', ...args))
	// doc.on('beforeObserverCalls', (...args) => console.log('beforeObserverCalls', ...args))
	// doc.on('afterTransaction', (...args) => console.log('afterTransaction', ...args))
	// doc.on('update', (...args) => console.log('update', ...args))

	currentUserId = provider?.awareness.clientID;

	provider.awareness.on('change', () => {
		const states = Array.from(provider?.awareness.getStates().values() || []).map(
			(state) => state.user
		);

		usersState.users = states;
	});

	provider.awareness.setLocalStateField('user', {
		id: provider.awareness.clientID,
		name: randomName(),
		color: randomColor(),
		cursorState: { x: 0, y: 0 }
	});
}

// create a Y map
const ymap = doc.getMap('map');

// bind the ymap to the valito proxy state
// TODO: investigate. doing this server-side seems to cause a problem with
// clients resetting the shared doc state
if (browser) {
	bindProxyAndYMap(state, ymap);
}

function updateUserCursor(cursorState: { x: number; y: number }) {
	provider?.awareness.setLocalStateField('user', {
		id: provider?.awareness.clientID,
		name: userName,
		color: userColor,
		cursorState
	});
}

export { state, usersState, currentUserId, updateUserCursor };
