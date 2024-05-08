import { configureStore, createSlice, type Store } from "@laserware/stasis";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0 as number,
  },
  reducers: {
    increment(state) {
      state.value += 1;
    },
  },
  selectors: {
    selectValue: (state) => state.value,
  },
});

export function createStore(): Store {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
    },
  });
}
