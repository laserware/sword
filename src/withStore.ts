import type { Store } from "@reduxjs/toolkit";
import type {
  ComponentType,
  ComponentConstructorOptions,
  SvelteComponent,
} from "svelte";

import { storeContextKey } from "./context";
import type { State } from "./types";

export function withStore<S = State>(
  store: Store<S>,
  Component: ComponentType,
  options: ComponentConstructorOptions,
): SvelteComponent {
  const context = options.context ?? new Map();

  if (context.has(storeContextKey)) {
    throw new Error(`The context key ${storeContextKey} is already in use`);
  }

  context.set(storeContextKey, store);

  return new Component({ ...options, context });
}
