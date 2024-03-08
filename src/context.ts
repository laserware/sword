import type { Store } from "@laserware/stasis";
import { getContext } from "svelte";

/**
 * Key used to access the Redux store from the Svelte context.
 * @private
 */
export const storeContextKey = "@laserware/sword/store";

/**
 * Returns the Redux store from Svelte context.
 *
 * @template State Redux state definition.
 */
export function getStoreContext<State>(): Store<State> {
  return getContext<Store<State>>(storeContextKey);
}
