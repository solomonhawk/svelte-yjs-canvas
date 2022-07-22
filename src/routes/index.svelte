<script lang="ts">
  import {useSnapshot} from 'sveltio';
  import {state} from '$lib/store';
  const snap = useSnapshot(state);
</script>

<button on:click={() => state.count++}>
  {$snap.count}
</button>