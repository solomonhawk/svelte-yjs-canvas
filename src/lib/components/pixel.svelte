
<script lang="ts">
  export let filled = false;
</script>

<button type="button" class="w-10 h-10 border-t border-l" class:bg-black={filled} on:click|preventDefault />