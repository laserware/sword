<script lang="ts">
  import { useDispatch, useSelector } from "../../dist/index.js";

  import { counterSlice } from "./store.js";

  const dispatch = useDispatch();

  const counter = useSelector(counterSlice.selectors.selectValue);

  function handleIncrementClick(): void {
    dispatch(counterSlice.actions.increment());
  }

  function handleDecrementClick(): void {
    dispatch(counterSlice.actions.decrement());
  }
</script>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: sans-serif;
  }

  button {
    display: block;
    width: 6rem;
    height: fit-content;
  }
</style>

<main>
  <button onclick={handleIncrementClick}>Increment</button>
  <button onclick={handleDecrementClick}>Decrement</button>

  <div>Value: {counter.value}</div>
</main>
