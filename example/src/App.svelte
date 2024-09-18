<script lang="ts">
  import Provider from "../../dist/Provider.svelte";

  import { createStore } from "./store.js";

  import Counter from "./Counter.svelte";

  const store = createStore();
</script>

<Provider {store}>
  <Counter />
</Provider>
