import { getStoreContext } from "./context";

/**
 * Returns the current state from the Redux store in context.
 *
 * @template State Redux state definition.
 */
export function useState<State>(): State {
  const store = getStoreContext<State>();

  return store.getState();
}
