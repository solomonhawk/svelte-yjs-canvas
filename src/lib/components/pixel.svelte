
<script lang="ts">
  import { pixelSize } from '$lib/store';

  export let color = "#fff";
</script>

<button
  type="button"
  class="block"
  style="background-color: {color}; width: {pixelSize}px; height: {pixelSize}px;"
  on:pointerdown|preventDefault
  on:pointerenter|preventDefault
/>