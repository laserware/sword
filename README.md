# @laserware/sword

Svelte wrapper over Redux.

## Usage

Install the dependency. Note that `svelte` is required as a peer dependency:

```
npm install @laserware/sword @laserware/stasis svelte
```

Wrap your Svelte entry point component with `<Provider>`:

```ts
// src/main.ts
import { Provider } from "@laserware/sword";
import { mount } from "svelte";

import App from "./App.svelte";

const app = mount(App, { target: document.body });

export default app();
```

```sveltehtml
<!-- App.svelte -->
<script lang="ts">
  import { Provider } from "@laserware/sword";

  import { createStore } from "./my-redux-store";

  import MyComponent from "./MyComponent.svelte"

  const store = createStore();
</script>

<Provider {store}>
  <MyComponent />
</Provider>
```

Import the `useDispatch` or `useSelect` functions in components that need to dispatch Redux actions or access Redux state:

```sveltehtml
<!-- MyComponent.svelte -->
<script lang="ts">
  import { useDispatch, useSelector } from "@laserware/sword";

  import { someAction } from "./my-redux-actions";
  import { selectSomeValue } from "./my-redux-selectors";

  const dispatch = useDispatch();

  const someValue = useSelector(selectSomeValue);

  function handleClick(): void {
    dispatch(someAction(someValue.value));
  }
</script>

<button on:click={handleClick}>Click me</button>
```
