import type { Selector } from "@laserware/stasis";
import { readable, type Readable } from "svelte/store";

import { getStoreContext } from "./context";

type EqualityFunc<Result> = (lhs: Result, rhs: Result) => boolean;

/**
 * Returns a Svelte store that subscribes to changes in the value returned by
 * the specified selector.
 *
 * @template Result Result returned from the selector.
 * @template State Redux state definition.
 *
 * @param selector Selector function either returned by `createSelector` (from `reselect`)
 *                 or a simple state accessor.
 * @param equalityFunc Optional equality function for more advanced use cases.
 * @param args Additional args to pass to selector.
 *
 * @example
 * // Inside a Svelte <script> block:
 * import { useSelector } from "@laserware/sword";
 *
 * import { selectStateValue } from "./my-redux-selectors";
 *
 * const stateValue = useSelector(selectStateValue);
 *
 * function handleClick() {
 *   // Note that you must use `$` prefix because it is a Svelte store:
 *   console.log($stateValue);
 * }
 */
export function useSelector<Result, State>(
  selector: Selector<State, Result>,
  equalityFunc?: EqualityFunc<Result>,
  ...args: any[]
): Readable<Result>;
export function useSelector<Result, State>(
  selector: Selector<State, Result>,
  ...args: any[]
): Readable<Result> {
  let equalityFunc = (lhs: Result, rhs: Result): boolean => lhs === rhs;

  if (typeof args[0] === "function") {
    equalityFunc = args.shift() as EqualityFunc<Result>;
  }

  const store = getStoreContext();

  let lastSelectorValue: Result;

  return readable(
    // Make sure we're setting the initial value of the Svelte store to the
    // current value in state, otherwise we'll get undefined errors all over
    // the place:
    // @ts-ignore
    selector(store.getState<State>(), ...args),

    // Create the Redux subscription that updates the Svelte store value
    // whenever it changes. This enables us to maintain a laser focus on only
    // updating the UI in response to changes to this particular slice of state,
    // and it eliminates a lot of extra boilerplate code:
    function start(set: (value: Result) => void) {
      const unsubscribe = store.subscribe(() => {
        // @ts-ignore
        const selectorValue = selector(store.getState<State>(), ...args);

        if (!equalityFunc(selectorValue, lastSelectorValue)) {
          lastSelectorValue = selectorValue;

          set(lastSelectorValue);
        }
      });

      // As soon as we unsubscribe from the Svelte store, ensure we also
      // unsubscribe from the Redux store:
      return function stop() {
        unsubscribe();
      };
    },
  );
}
