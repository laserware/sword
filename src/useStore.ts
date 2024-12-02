import type { Store } from "@laserware/stasis";

import { getStoreContext } from "./context.js";

/**
 * Gets the Redux store from Svelte context. Note that you should normally
 * not need to use this unless you need to call `replaceReducer` or perform
 * some other operation that requires access to the entire store.
 *
 * @template S Redux state definition.
 *
 * @returns The Redux store from Svelte context.
 *
 * @example
 * ```html
 * <script>
 *   import { useStore } from "@laserware/sword";
 *
 *   import { someAction } from "./my-redux-actions";
 *
 *   const store = useStore();
 *
 *   function handleClick() {
 *     console.log(store.getState()); // Returns state
 *
 *     store.dispatch(someAction());
 *   }
 * </script>
 *
 * <button onclick={handleClick}>Click Me</button>
 * ```
 */
export function useStore<S>(): Store<S> {
  return getStoreContext();
}
