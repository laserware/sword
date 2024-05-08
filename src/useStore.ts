import type { Store } from "@laserware/stasis";

import { getStoreContext } from "./context";

/**
 * Returns the Redux store from Svelte context. Note that you should normally
 * not need to use this unless you need to call `replaceReducer` or perform
 * some other operation that requires access to the entire store.
 *
 * @template State Redux state definition.
 */
export function useStore<State>(): Store<State> {
  return getStoreContext();
}
