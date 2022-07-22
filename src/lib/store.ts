import { browser } from '$app/env';
import * as Y from "yjs";
import { proxy } from "sveltio";
import { bindProxyAndYMap } from "valtio-yjs";
import { WebrtcProvider } from 'y-webrtc';
import { IndexeddbPersistence } from "y-indexeddb";

// create a new Y doc
const doc = new Y.Doc();

if (browser) {
  new WebrtcProvider("svelte-yjs-canvas-demo", doc)
  new IndexeddbPersistence("svelte-yjs-canvas-demo", doc);

  // doc.on('beforeTransaction', (...args) => console.log('beforeTransaction', ...args))
  // doc.on('beforeObserverCalls', (...args) => console.log('beforeObserverCalls', ...args))
  // doc.on('afterTransaction', (...args) => console.log('afterTransaction', ...args))
  // doc.on('update', (...args) => console.log('update', ...args))
}

// create a Y map
const ymap = doc.getMap("map");

// create a valtio state
export const state = proxy({ count: 0 });

// bind them
if (browser) {
  bindProxyAndYMap(state, ymap);
}