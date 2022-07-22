<script lang="ts">
  import {useSnapshot} from 'sveltio';
  import {state} from '$lib/store';
  import {browser} from '$app/env';

  const snap = useSnapshot(state);
</script>

{#if browser}
  <button on:click={() => state.count++}>
    {$snap.count}
  </button>
{/if}