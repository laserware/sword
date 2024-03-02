import type {
  ComponentConstructorOptions,
  ComponentType,
  SvelteComponent,
} from "svelte";

import { getStoreContextKey, overrideStoreContextKey } from "./context";
import type { ReduxState, Redux } from "./types";

type WithStoreOptions<S = ReduxState> = {
  component: ComponentType;
  options: ComponentConstructorOptions;
  store: Redux.Store<S>;
  contextKey?: string;
};

/**
 * Adds the specified Redux store to the specified Svelte component entry point
 * with the specified component options. This must be done in order to use the
 * {@link useDispatch}, {@link useSelector}, and {@link useStore} functions.
 * @param component Svelte component entry point for the application
 * @param options Svelte component constructor options
 * @param store Redux store for the application
 * @param [contextKey="@laserware/sword/store"] Optional override for the default store context key
 * @example
 * import { withStore } from "@laserware/sword";
 *
 * import App from "./App.svelte";
 * import { configureStore } from "./redux";
 *
 * const store = configureStore();
 *
 * const app = withStore({
 *   component: App,
 *   options: { target: document.body },
 *   store,
 *   // Optionally override default context key:
 *   contextKey: "some-custom-context-key",
 * });
 *
 * export default app;
 */
export function withStore<S = ReduxState>({
  component,
  options,
  store,
  contextKey,
}: WithStoreOptions<S>): SvelteComponent {
  const context = options.context ?? new Map();

  if (contextKey !== undefined) {
    overrideStoreContextKey(contextKey);
  }

  context.set(getStoreContextKey(), store);

  return new component({ ...options, context });
}
