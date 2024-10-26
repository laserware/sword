import type { Store } from "@laserware/stasis";
import { getContext, setContext } from "svelte";

/**
 * Key used to access the Redux store from the Svelte context.
 * @private
 */
const storeContextKey = Symbol("@laserware/sword/store");

/**
 * Key used to access the Redux state getter from the Svelte context.
 * @private
 */
const getStateContextKey = Symbol("@laserware/sword/state");

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
 * @template State Redux state definition.
 */
export function getStoreContext<State>(): Store<State> {
  return getContext<Store<State>>(storeContextKey);
}

/**
 * Returns the Redux state getter from Svelte context.
 *
 * @template State Redux state definition.
 */
export function getGetStateContext<State>(): () => State {
  return getContext<() => State>(getStateContextKey);
}
