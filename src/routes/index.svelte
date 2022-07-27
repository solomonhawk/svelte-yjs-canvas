<script lang="ts">
  import AppBar from '$lib/components/app-bar.svelte';
  import Canvas from '$lib/components/canvas.svelte';
  import Loading from '$lib/components/loading.svelte';
  import Presence from '$lib/components/presence.svelte';
  import { localState } from '$lib/store';
  import { useSnapshot } from 'sveltio';

  const local = useSnapshot(localState);
</script>

{#if $local.synced}
  <AppBar />
  <Canvas />
  <Presence />
{:else}
  <Loading />
{/if}
