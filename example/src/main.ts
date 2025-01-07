import { mount } from "svelte";

import { provide } from "../../dist/index";
import App from "./App.svelte";
import { createStore } from "./store.js";

const store = createStore();

export default mount(App, { target: document.body, context: provide(store) });
