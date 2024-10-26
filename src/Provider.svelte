<script>
  import { onDestroy } from "svelte";

  import { setSwordContext } from "./context.js";

  let { store, children } = $props();

  let state = $state(store.getState());

  const unsubscribe = store.subscribe(() => {
    state = store.getState();
  });

  onDestroy(() => {
    unsubscribe();
  });

  setSwordContext(store, () => state);
</script>

{@render children()}
