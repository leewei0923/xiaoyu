import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import  ThunkMiddleware  from "redux-thunk";
import reducer from "./reducer";

let store;

function initStore(initState) {
  return createStore(
    reducer,
    initState,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
  );
}

export const initializeStore = (preloadedStore) => {
  let _store = store ?? initStore(preloadedStore);

  if (preloadedStore && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedStore,
    });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}