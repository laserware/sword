import type { Store } from "@reduxjs/toolkit";
import { getContext, setContext } from "svelte";

import type { State } from "./types";

export const storeContextKey = "@laserware/sword/store";

export function getStoreContext<S = State>(): Store<S> {
  return getContext<Store<S>>(storeContextKey);
}

export function setStoreContext<S = State>(store: Store<S>): void {
  setContext<Store<S>>(storeContextKey, store);
}
