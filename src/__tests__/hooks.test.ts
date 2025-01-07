import { describe, expect, it, mock } from "bun:test";

import { configureStore, createSlice } from "@reduxjs/toolkit";

import { storeContextKey } from "../context.js";
import { useDispatch, useSelector, useState, useStore } from "../hooks.js";

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

describe("within hooks", () => {
  it("the useDispatch hook dispatches an action", () => {
    const store = createStore();

    mock.module("svelte", () => ({
      getContext: (key: any) => {
        if (key === storeContextKey) {
          return store;
        } else {
          return () => store.getState();
        }
      },
    }));

    const dispatch = useDispatch();

    dispatch(counterSlice.actions.increment());

    expect(store.getState()).toEqual({ counter: { value: 1 } });

    dispatch(counterSlice.actions.decrement());

    expect(store.getState()).toEqual({ counter: { value: 0 } });
  });

  it("the useSelector hook returns the value selected from state", () => {
    const store = createStore();

    mock.module("svelte", () => ({
      getContext: (key: any) => {
        if (key === storeContextKey) {
          return store;
        } else {
          return () => store.getState();
        }
      },
    }));

    store.dispatch(counterSlice.actions.increment());

    const result = useSelector(counterSlice.selectors.selectValue);

    expect(result.value).toBe(1);
  });

  it("the useState hook returns a function that returns state", () => {
    const store = createStore();

    mock.module("svelte", () => ({
      getContext: (key: any) => {
        if (key === storeContextKey) {
          return store;
        } else {
          return () => store.getState();
        }
      },
    }));

    store.dispatch(counterSlice.actions.increment());

    const result = useState();

    expect(result()).toEqual(store.getState());
  });

  it("the useStore hook returns the Redux store", () => {
    const store = createStore();

    mock.module("svelte", () => ({
      getContext: (key: any) => {
        if (key === storeContextKey) {
          return store;
        } else {
          return () => store.getState();
        }
      },
    }));

    const result = useStore();

    expect(result).toEqual(store);
  });
});
