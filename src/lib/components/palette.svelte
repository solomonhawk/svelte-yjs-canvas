<script lang="ts">
  import { colors } from "$lib/palette";
  import { drawState, pickColor } from "$lib/store";
  import { useSnapshot } from "sveltio";

  const draw = useSnapshot(drawState);
</script>

<ol class="flex justify-center p-2 bg-gray-200">
  {#each colors as color, i}
    {@const selected = $draw.selectedColor === i}

    <li class="w-8 h-8 rounded-small border-white" class:border={selected} style="background-color: {color};">
      <button on:click={() => pickColor(i)} class="w-full block h-full" />
    </li>
  {/each}
</ol>