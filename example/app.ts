import { mount } from "svelte";

import { withSword } from "../src";

import { createStore } from "./store";

import App from "./App.svelte";

const store = createStore();

const app = mount(App as any, withSword(store, { target: document.body }));
