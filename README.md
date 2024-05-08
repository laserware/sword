# @laserware/sword

Svelte wrapper over Redux.

## Usage

Install the dependency. Note that `svelte` is required as a peer dependency:

```
npm install @laserware/sword svelte
```

Wrap your Svelte entry point component with `withSword`:

```ts
// src/main.ts
import { withSword } from "@laserware/sword";
import { mount } from "svelte";

import App from "./App.svelte";
import { createStore } from "./my-redux-store";

const store = createStore();

const app = mount(App, withSword(store, { target: document.body }));

export default app();
```

Import the `useDispatch` or `useSelect` functions in components that need to dispatch Redux actions or access Redux state:

```sveltehtml

<script lang="ts">
  import { useDispatch, useSelector } from "@laserware/sword";

  import { someAction } from "./my-redux-actions";
  import { selectSomeValue } from "./my-redux-selectors";

  const dispatch = useDispatch();

  const someValue = useSelector(selectSomeValue);

  function handleClick(): void {
    // Note that you must use a `$` prefix because
    // `useSelector` returns a Svelte store:
    dispatch(someAction($someValue));
  }
</script>

<button on:click={handleClick}>Click me</button>
```
