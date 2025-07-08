import type { Store } from "@reduxjs/toolkit";

import { getStateContextKey, storeContextKey } from "./context.js";

/**
 * Adds the specified Redux `store` to the specified Svelte `context`.
 *
 * This is an alternative to wrapping your application's entry point in a
 * {@linkcode ProviderComponent}, which requires an extra component.
 *
 * @template S Redux state definition.
 *
 * @param store Redux store to add to context.
 * @param [context] Optional existing context to add entries to.
 *
 * @returns The Svelte context Map with the Redux entries added.
 *
 * @example
 * **Only Entry in Context**
 *
 * If you don't need to add anything else to context:
 *
 * ```ts
 * import { provide } from "@laserware/sword";
 * import { mount } from "svelte";
 *
 * import { createStore } from "./my-redux-store";
 *
 * import App from "./App.svelte";
 *
 * const store = createStore();
 *
 * const app = mount(App, {
 *   target: document.body,
 *   context: provide(store),
 * });
 *
 * export default app();
 * ```
 *
 * **With Additional Context Entries**
 *
 * If you need to add other items to the Svelte context, use the return value
 * of `provide`:
 *
 * ```ts
 * import { provide } from "@laserware/sword";
 * import { mount } from "svelte";
 *
 * import { createStore } from "./my-redux-store";
 *
 * import App from "./App.svelte";
 *
 * const store = createStore();
 *
 * // This is a Map<any, any>:
 * const context = provide(store);
 *
 * context.set("extraItem", { foo: "bar" });
 *
 * const app = mount(App, {
 *   target: document.body,
 *   context,
 * });
 *
 * export default app();
 * ```
 */
export function provide<S>(
  store: Store<S>,
  context = new Map(),
): Map<any, any> {
  let state = $state(store.getState());

  store.subscribe(() => {
    state = store.getState();
  });

  context.set(storeContextKey, store);
  context.set(getStateContextKey, () => state);

  return context;
}
