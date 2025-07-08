import type { Selector, Store, UnknownAction } from "@reduxjs/toolkit";

import { getGetStateContext, getStoreContext } from "./context.js";

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

/**
 * Returns a function to get the current state from the Redux store in context.
 *
 * Note that we can't just return the state here because we probably want to
 * access it dynamically, and Svelte won't let you do that within a function
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
  return getGetStateContext<S>();
}

/**
 * Gets the Redux store from the Svelte context. Note that you should normally
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
