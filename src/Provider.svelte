<script lang="ts">
  import { onDestroy, type Snippet } from "svelte";
  import type { EnhancedStore } from "@laserware/stasis";

  import {
    setSwordContext,
  } from "./context.js";

  let { store, children }: { store: EnhancedStore; children: Snippet } = $props();

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
