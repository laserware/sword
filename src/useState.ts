import { getStoreContext } from "./context.js";

/**
 * Returns a function to get the current state from the Redux store in context.
 *
 * Note that we can't just return state here because we probably want to
 * access it dynamically and Svelte won't let you do that within a function
 * (since the context must be initialized with the component loads).
 *
 * @template S Redux state definition.
 *
 * @returns Function that returns Redux state.
 *
 * @example
 * ```html
 * <script>
 *   import { useState } from "@laserware/sword";
 *
 *   const getState = useState();
 *
 *   function handleClick() {
 *     console.log(getState()); // Returns state
 *   }
 * </script>
 *
 * <button onclick={handleClick}>Click Me</button>
 * ```
 */
export function useState<S>(): () => S {
  const store = getStoreContext<S>();

  return () => store.getState();
}
