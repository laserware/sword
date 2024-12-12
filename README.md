# Sword

Svelte wrapper over Redux.

> [!IMPORTANT]
> Version 3 of this library only works with Svelte v5!

## Usage

Install the dependency. Note that `svelte` and `@laserware/stasis` are required as a peer dependencies:

```bash
npm install @laserware/sword @laserware/stasis svelte
```

Wrap your Svelte entry point component with `<Provider>`:

**Entry File (`src/main.ts`)**

```ts
import { Provider } from "@laserware/sword";
import { mount } from "svelte";

import App from "./App.svelte";

const app = mount(App, { target: document.body });

export default app();
```

**Svelte Component (`src/App.svelte`)**

```html
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

If you don't want to create another component file just to add Redux context, you can use the `provide` function:

**Entry File (`src/main.ts`)**

```ts
import { provide } from "@laserware/sword";
import { mount } from "svelte";

import { createStore } from "./my-redux-store";

import App from "./App.svelte";

const store = createStore();

const app = mount(App, { 
  target: document.body,
  context: provide(store),
});

export default app();
```

Import the `useDispatch` or `useSelect` functions in components that need to dispatch Redux actions or access Redux state:

```html
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

<button onclick={handleClick}>Click me</button>
```
