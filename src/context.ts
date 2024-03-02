import { getContext } from "svelte";

import type { ReduxState, Redux } from "./types";

/**
 * Key used to access the Redux store from the Svelte context.
 * @private
 */
export const storeContextKey = "@laserware/sword/store";

/**
 * Returns the Redux store from Svelte context.
 */
export function getStoreContext<S = ReduxState>(): Redux.Store<S> {
  return getContext<Redux.Store<S>>(storeContextKey);
}
