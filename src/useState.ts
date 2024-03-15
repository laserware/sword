import { getStoreContext } from "./context";

/**
 * Returns a function to get the current state from the Redux store in context.
 * Note that we can't just return state here because we probably want to
 * access it dynamically and Svelte won't let you do that within a function
 * (since the context must be initialized with the component loads).
 *
 * @template State Redux state definition.
 */
export function useState<State>(): () => State {
  const store = getStoreContext<State>();

  return () => store.getState();
}
