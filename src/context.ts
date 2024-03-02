import { getContext } from "svelte";

import type { ReduxState, Redux } from "./types";

/**
 * Key used to access the Redux store from the Svelte context. If for some
 * reason this key is already in use, pass in an override key to the
 * {@link withStore} function.
 * @private
 */
let storeContextKey = "@laserware/sword/store";

/**
 * Returns the Redux store from Svelte context.
 */
export function getStoreContext<S = ReduxState>(): Redux.Store<S> {
  return getContext<Redux.Store<S>>(storeContextKey);
}

/**
 * Overrides the default context key for the Redux store in Svelte context.
 * @param overriddenKey Key value to override
 */
export function overrideStoreContextKey(overriddenKey: string): void {
  storeContextKey = overriddenKey;
}

/**
 * Returns the cached context key used to access the Redux store from Svelte
 * context.
 */
export function getStoreContextKey(): string {
  return storeContextKey;
}
