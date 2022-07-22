<script lang="ts">
  import Palette from '$lib/components/palette.svelte';
  import History from '$lib/components/history.svelte';
  import Canvas from '$lib/components/canvas.svelte';
  import Presence from '$lib/components/presence.svelte';
</script>

<Palette>
  <History />
</Palette>

<Canvas />
<Presence />
