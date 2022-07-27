<script lang="ts">
  import { localState, resetCanvas, setGridMode, zoomIn, zoomOut } from "$lib/store";
  import { useSnapshot } from "sveltio";
  import ButtonGroup from "./button-group.svelte";
  import Button from "./button.svelte";
  import History from "./history.svelte";
  import Palette from "./palette.svelte";
  import MdDeleteForever from 'svelte-icons/md/MdDeleteForever.svelte'
  import MdGridOn from 'svelte-icons/md/MdGridOn.svelte'
  import MdGridOff from 'svelte-icons/md/MdGridOff.svelte'
  import MdVisibilityOff from 'svelte-icons/md/MdVisibilityOff.svelte'
  import MdZoomOut from 'svelte-icons/md/MdZoomOut.svelte'
  import MdZoomIn from 'svelte-icons/md/MdZoomIn.svelte'

  const local = useSnapshot(localState)

  $: mode = $local.gridMode;

  $: buttons = [
    {
      label: "Grid",
      icon: MdGridOn,
      selected: mode === "solid",
      onClick: () => setGridMode('solid')
    },
    {
      label: "Transparent Grid",
      icon: MdGridOff,
      selected: mode === "transparent",
      onClick: () => setGridMode('transparent')
    },
    {
      label: "No Grid",
      icon: MdVisibilityOff,
      selected: mode === "invisible",
      onClick: () => setGridMode('invisible')
    }
  ]
</script>

<div class="flex p-2 bg-gray-200 justify-center items-center gap-1">
  <Palette />
  <History />

  <ButtonGroup>
    {#each buttons as button}
      <Button class="{button.selected ? '!text-blue-500' : ''}" title="{button.label}" on:click={button.onClick} rounded={false} disabled={button.selected}>
        <div class="icon">
          <svelte:component this={button.icon} />
        </div>
      </Button>
    {/each}
  </ButtonGroup>

  <Button title="Zoom In" on:click={zoomIn}>
    <div class="icon">
      <MdZoomIn />
    </div>
  </Button>

  <Button title="Zoom Out" on:click={zoomOut}>
    <div class="icon">
      <MdZoomOut />
    </div>
  </Button>

  <Button title="Clear Canvas"on:click={resetCanvas}>
    <div class="icon">
      <MdDeleteForever />
    </div>
  </Button>
</div>

<style>
  .icon {
    @apply w-4 h-4;
  }
</style>