import type { Store } from "@reduxjs/toolkit";

import { getStoreContext } from "./context";
import type { State } from "./types";

export function useStore(): Store<State> {
  return getStoreContext();
}
