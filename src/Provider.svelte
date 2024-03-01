<script>
  import { setStoreContext } from "./context";

  export let store;

  setStoreContext(store);
</script>

<slot />
