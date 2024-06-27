import type { Store } from "@laserware/stasis";
import type {
  ComponentConstructorOptions,
  ComponentType,
  SvelteComponent,
} from "svelte";

import { storeContextKey } from "./context";

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
 * export default app;
 */
export function withSword<State>(
  store: Store<State>,
  Component: ComponentType,
  options: ComponentConstructorOptions,
): SvelteComponent {
  const context = options.context ?? new Map();

  if (context.has(storeContextKey)) {
    // prettier-ignore
    throw new Error(`Context entry with key ${storeContextKey} already exists, please choose another name for your key`);
  }

  context.set(storeContextKey, store);

  return new Component({ ...options, context });
}
