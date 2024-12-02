import type { SvelteComponent } from "svelte";

export { provide } from "./provide.svelte.js";
export { useDispatch } from "./useDispatch.js";
export { useSelector } from "./useSelector.js";
export { useState } from "./useState.js";
export { useStore } from "./useStore.js";
export { default as Provider } from "./Provider.svelte";

/**
 * This is a type alias for the `<Provider>` component. Do _not_ use this
 * export, rather use `<Provider>`. The only purpose of this export is to
 * ensure it is included in the documentation.
 *
 * @example
 * ```html
 * <script lang="ts">
 *   import { Provider } from "@laserware/sword";
 *
 *   import { createStore } from "./my-redux-store";
 *
 *   import MyComponent from "./MyComponent.svelte"
 *
 *   const store = createStore();
 * </script>
 *
 * <Provider {store}>
 *   <MyComponent />
 * </Provider>
 * ```
 */
export type ProviderComponent = SvelteComponent;
