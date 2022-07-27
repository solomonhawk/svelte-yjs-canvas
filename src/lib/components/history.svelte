<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import Button from "./button.svelte";
  import { undoManager } from "$lib/store";

  let canUndo = false;
  let canRedo = false;

  function update() {
    canUndo = undoManager.canUndo();
    canRedo = undoManager.canRedo();
  }

  onMount(() => {
    undoManager.on('stack-item-added', update);
    undoManager.on('stack-item-popped', update);
    undoManager.on('stack-item-updated', update);
    undoManager.on('stack-cleared', update);
  })

  onDestroy(() => {
    undoManager.off('stack-item-added', update);
    undoManager.off('stack-item-popped', update);
    undoManager.off('stack-item-updated', update);
    undoManager.off('stack-cleared', update);
  })
</script>

<div class="flex gap-1 text-xl">
  <Button disabled={!canUndo} title="Undo" on:click={() => undoManager.undo()}>
   <span class="leading-none mt-1"> ⃔</span>
  </Button>

  <Button disabled={!canRedo} title="Redo" on:click={() => undoManager.redo()}>
    <span class="leading-none mt-1"> ⃕</span>
  </Button>
</div>