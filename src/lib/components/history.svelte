<script lang="ts">
  import { state } from "$lib/store";
  import { useSnapshot } from "sveltio";

  const sharedState = useSnapshot(state);
</script>

<div class="flex gap-1 ml-1 text-xl">
  <button disabled={!$sharedState.canUndo()} class="rounded bg-white w-8 h-8 flex items-center justify-center drop-shadow-sm" on:click={$sharedState.undo}>
   <span class="leading-none mt-1"> ⃔</span>
  </button>

  <button disabled={!$sharedState.canRedo()} class="rounded bg-white w-8 h-8 flex items-center justify-center drop-shadow-sm" on:click={$sharedState.redo}>
    <span class="leading-none mt-1"> ⃕</span>
  </button>
</div>