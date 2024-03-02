# @laserware/sword

Svelte wrapper over Redux.

## Usage

Install the dependency. Note that `svelte` is required as a peer dependency:

```
npm install @laserware/sword svelte
```

Use declaration merging to specify your Redux state (optional):

```ts
// sword.d.ts
import "@laserware/sword";

declare module "@laserware/sword" {
  import type { MyCustomReduxState } from "./my-redux-state";
  
  export interface ReduxState extends MyCustomReduxState {}
}
```

Wrap your Svelte entry point component with `withStore`:

```ts
// src/main.ts
import { withStore } from "@laserware/sword";

import App from "./App.svelte";
import { createStore } from "./my-redux-store";

const store = createStore();

const app = withStore(store, App, { target: document.body });
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
