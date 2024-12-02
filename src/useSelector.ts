import type { Selector } from "@laserware/stasis";

import { getGetStateContext } from "./context.js";

/**
 * Creates an object with a `value` property which contains the current value
 * of the specified `selector`.
 *
 * @template R Return value from the `selector`.
 * @template S Redux state definition.
 *
 * @param selector Selector function either returned by [`createSelector`](https://redux-toolkit.js.org/api/createSelector)
 *                 or a simple state accessor.
 * @param args Additional args to pass to selector.
 *
 * @returns An object with a reactive `value` property that represents the return
 *          value of the specified `selector`.
 *
 * @example
 * ```html
 * <script>
 *   import { useSelector } from "@laserware/sword";
 *
 *   import { selectSomeValue } from "./my-redux-selectors";
 *
 *   const someValue = useSelector(selectSomeValue);
 *
 *   function handleClick() {
 *     console.log(someValue.value);
 *   }
 * </script>
 *
 * <button onclick={handleClick}>Click Me</button>
 * ```
 */
export function useSelector<R, S>(
  selector: Selector<S, R>,
  ...args: any[]
): { readonly value: R } {
  const getState = getGetStateContext<S>();

  return {
    get value(): R {
      return selector(getState(), ...args);
    },
  };
}
