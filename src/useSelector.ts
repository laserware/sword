import { type Readable, readable } from "svelte/store";

import { getStoreContext } from "./context";
import type { ReduxState, Redux } from "./types";

/**
 * Returns a Svelte store that subscribes to changes in the value returned by
 * the specified selector.
 * @param selector Selector function either returned by `createSelector` (from `reselect`)
 *                 or a simple state accessor.
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
export function useSelector<Result, State = ReduxState>(
  selector: Redux.Selector<State, Result>,
): Readable<Result> {
  const store = getStoreContext();

  return readable(
    // Make sure we're setting the initial value of the Svelte store to the
    // current value in state, otherwise we'll get undefined errors all over
    // the place:
    // @ts-ignore
    selector(store.getState()),

    // Create the Redux subscription that updates the Svelte store value
    // whenever it changes. This enables us to maintain a laser focus on only
    // updating the UI in response to changes to this particular slice of state,
    // and it eliminates a lot of extra boilerplate code:
    function start(set: (value: Result) => void) {
      const unsubscribe = store.subscribe(() => {
        // @ts-ignore
        set(selector(store.getState()));
      });

      // As soon as we unsubscribe from the Svelte store, ensure we also
      // unsubscribe from the Redux store:
      return function stop() {
        unsubscribe();
      };
    },
  );
}
