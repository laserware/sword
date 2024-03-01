import type { Selector } from "@reduxjs/toolkit";
import { type Readable, readable } from "svelte/store";

import { getStoreContext } from "./context";
import type { State } from "./types";

export function useSelector<R, S = State>(
  selector: Selector<S, R>,
): Readable<R> {
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
    function start(set: (value: R) => void) {
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
