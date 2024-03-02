import { getStoreContext } from "./context";
import type { Redux } from "./types";

/**
 * Returns a dispatch function that can be called with a Redux action.
 * @example
 * // Inside a Svelte <script> block:
 * import { useDispatch } from "@laserware/sword";
 *
 * import { someAction } from "./my-redux-actions";
 *
 * const dispatch = useDispatch();
 *
 * function handleClick() {
 *   dispatch(someAction());
 * }
 */
export function useDispatch(): (action: Redux.UnknownAction) => void {
  const store = getStoreContext();

  return (action: Redux.UnknownAction): void => {
    store.dispatch(action);
  };
}
