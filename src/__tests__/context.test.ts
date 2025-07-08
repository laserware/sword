import { describe, expect, it, mock } from "bun:test";

import { configureStore, createSlice } from "@reduxjs/toolkit";

import {
  getGetStateContext,
  getStateContextKey,
  getStoreContext,
  setSwordContext,
  storeContextKey,
} from "../context.js";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    decrement(state) {
      state.value -= 1;
    },
    increment(state) {
      state.value += 1;
    },
  },
  selectors: {
    selectValue: (state) => state.value,
  },
});

const createStore = () => configureStore({ reducer: { counter: counterSlice.reducer } });

describe("within context", () => {
  it("the setSwordContext function updates context", () => {
    const getContext = mock();
    const setContext = mock();

    const store = createStore();
    const getState = () => store.getState();

    mock.module("svelte", () => ({ getContext, setContext }));

    setSwordContext(store, getState);

    expect(setContext).toHaveBeenCalledWith(storeContextKey, store);
    expect(setContext).toHaveBeenCalledWith(getStateContextKey, getState);
  });

  it("the getStoreContext and getGetStateContext functions returns the values from context", () => {
    const getContext = mock();
    const setContext = mock();

    mock.module("svelte", () => ({ getContext, setContext }));

    getStoreContext();
    expect(getContext).toHaveBeenCalledWith(storeContextKey);

    getContext.mockClear();

    getGetStateContext();
    expect(getContext).toHaveBeenCalledWith(getStateContextKey);
  });
});
