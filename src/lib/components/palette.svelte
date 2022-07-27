<script lang="ts">
  import Button from "./button.svelte";
  import { localState,pickColor,resetCanvas,setPalette } from "$lib/store";
  import { useSnapshot } from "sveltio";

  const local = useSnapshot(localState);

  const changePalette = (e: Event & { currentTarget: EventTarget & HTMLSelectElement; }) => {
    setPalette(Number(e.currentTarget.value))
  }
</script>

<div class="flex p-2 bg-gray-200 justify-center items-center gap-1">
  <select on:change={changePalette} class="rounded-sm text-xs p-2">
    <option value={0} selected={$local.paletteId === 0}>Autumn</option>
    <option value={1} selected={$local.paletteId === 1}>Endsega 32</option>
  </select>

  <ol class="flex flex-wrap max-w-[576px] mx-2">
    {#each $local.palette as color, i}
      {@const selected = $local.selectedColor === i}

      <li class="w-8 h-8 rounded-small ring-blue-500 ring-opacity-100 relative" class:ring-2={selected} class:z-10={selected} style="background-color: {color};">
        <button on:click={() => pickColor(i)} class="w-full block h-full" />
      </li>
    {/each}
  </ol>

  <slot />

  <Button title="Clear Canvas"on:click={resetCanvas}>
    ⊗
  </Button>
</div>