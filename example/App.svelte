<script lang="ts">
  import { useDispatch, useSelector } from "../src";

  import { counterSlice } from "./store";

  const dispatch = useDispatch();

  const counterValue = useSelector(counterSlice.selectors.selectValue);

  function handleClick(): void {
    dispatch(counterSlice.actions.increment());
  }
</script>

<div>{counterValue}</div>
<button onclick={handleClick}>Increment</button>
