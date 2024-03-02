import { getStoreContext } from "./context";
import type { ReduxState, Redux } from "./types";

/**
 * Returns the Redux store from Svelte context. Note that you should normally
 * not need to use this unless you need to call `replaceReducer` or perform
 * some other operation that requires access to the entire store.
 */
export function useStore(): Redux.Store<ReduxState> {
  return getStoreContext();
}
