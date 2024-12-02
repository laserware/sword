import type { UnknownAction } from "@laserware/stasis";

import { getStoreContext } from "./context.js";

/**
 * Gets the `dispatch` function from the Redux store in context.
 *
 * @returns Dispatch function that can be called with a Redux action.
 *
 * @example
 * ```html
 * <script>
 *   import { useDispatch } from "@laserware/sword";
 *
 *   import { someAction } from "./my-redux-actions";
 *
 *   const dispatch = useDispatch();
 *
 *   function handleClick() {
 *     dispatch(someAction());
 *   }
 * </script>
 *
 * <button onclick={handleClick}>Click Me</button>
 * ```
 */
export function useDispatch(): (action: UnknownAction) => void {
  const store = getStoreContext();

  return (action: UnknownAction): void => {
    store.dispatch(action);
  };
}
