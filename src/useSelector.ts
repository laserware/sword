import type { Selector } from "@laserware/stasis";

import { getGetStateContext } from "./context.js";

/**
 * Returns an object with a `value` property which contains the current value
 * of the specified selector.
 *
 * @template Result Result returned from the selector.
 * @template State Redux state definition.
 *
 * @param selector Selector function either returned by `createSelector` (from `reselect`)
 *                 or a simple state accessor.
 * @param args Additional args to pass to selector.
 *
 * @example
 * // Inside a Svelte <script> block:
 * import { useSelector } from "@laserware/sword";
 *
 * import { selectSomeValue } from "./my-redux-selectors";
 *
 * const someValue = useSelector(selectSomeValue);
 *
 * function handleClick() {
 *   console.log(someValue.value);
 * }
 */
export function useSelector<Result, State>(
  selector: Selector<State, Result>,
  ...args: any[]
): { readonly value: Result } {
  const getState = getGetStateContext<State>();

  return {
    get value(): Result {
      return selector(getState(), ...args);
    },
  };
}
