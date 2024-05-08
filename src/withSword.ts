import type { Store } from "@laserware/stasis";
import { mount, type ComponentType, type SvelteComponent } from "svelte";

import { storeContextKey } from "./context";

type Options = Parameters<typeof mount>[1];

/**
 * Adds the specified Redux store to the specified Svelte component entry point
 * with the specified component options. This must be done in order to use the
 * {@link useDispatch}, {@link useSelector}, and {@link useStore} functions.
 *
 * @template State Redux state definition.
 *
 * @param Component Svelte component entry point for the application.
 * @param options Svelte component constructor options.
 * @param store Redux store for the application.
 * @example
 * import { withSword } from "@laserware/sword";
 *
 * import App from "./App.svelte";
 * import { createStore } from "./my-redux-store";
 *
 * const store = createStore();
 *
 * const app = withSword(
 *   store,
 *   App,
 *   { target: document.body },
 * );
 *
 * export default app();
 */
export function withSword<State>(
  store: Store<State>,
  Component: ComponentType,
  options: Options,
): () => SvelteComponent {
  const context = options.context ?? new Map();

  context.set(storeContextKey, store);

  return () => mount(Component, options);
}
