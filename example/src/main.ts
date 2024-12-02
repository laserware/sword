import { mount } from "svelte";

import { provide } from "../../dist/index";
import { createStore } from "./store";
import App from "./App.svelte";

const store = createStore();

export default mount(App, { target: document.body, context: provide(store) });
