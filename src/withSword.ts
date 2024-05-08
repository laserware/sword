import type { Store } from "@laserware/stasis";
import { mount } from "svelte";

import { storeContextKey } from "./context";

type MountOptions = Parameters<typeof mount>[1];

/**
 * Adds the specified Redux store to the specified Svelte component options.
 * This must be done in order to use the {@link useDispatch}, {@link useSelector},
 * and {@link useStore} functions.
 *
 * @template State Redux state definition.
 *
 * @param store Redux store for the application.
 * @param options Svelte component constructor options (if any).
 * @example
 * import { withSword } from "@laserware/sword";
 * import { mount } from "svelte";
 *
 * import App from "./App.svelte";
 * import { createStore } from "./my-redux-store";
 *
 * const store = createStore();
 *
 * const app = mount(App, withSword(store, { target: document.body }));
 *
 * export default app();
 */
export function withSword<State>(
  store: Store<State>,
  options: MountOptions,
): any {
  // ^ Note that I'm returning `any` here because I got sick of fighting with TypeScript.

  const context = options.context ?? new Map();

  context.set(storeContextKey, store);

  return { ...options, context };
}
