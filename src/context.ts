import type { Store } from "@laserware/stasis";
import { getContext, setContext } from "svelte";

/**
 * Key used to access the Redux store from the Svelte context.
 *
 * @internal
 */
export const storeContextKey = Symbol("@laserware/sword/store");

/**
 * Key used to access the Redux state getter from the Svelte context.
 *
 * @internal
 */
export const getStateContextKey = Symbol("@laserware/sword/state");

/**
 * Adds the specified Redux `store` and `getState` function to Svelte context.
 *
 * @internal
 */
export function setSwordContext<State>(
  store: Store<State>,
  getState: () => State,
): void {
  setContext(storeContextKey, store);
  setContext(getStateContextKey, getState);
}

/**
 * Returns the Redux store from Svelte context.
 *
 * @internal
 *
 * @template S Redux state definition.
 */
export function getStoreContext<S>(): Store<S> {
  return getContext<Store<S>>(storeContextKey);
}

/**
 * Returns the Redux state getter from Svelte context.
 *
 * @internal
 *
 * @template S Redux state definition.
 */
export function getGetStateContext<S>(): () => S {
  return getContext<() => S>(getStateContextKey);
}
