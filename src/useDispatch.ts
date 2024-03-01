import type { UnknownAction } from "@reduxjs/toolkit";

import { getStoreContext } from "./context";

export function useDispatch(): (action: UnknownAction) => void {
  const store = getStoreContext();

  return (action: UnknownAction): void => {
    store.dispatch(action);
  };
}
