<script lang="ts">
  import GoSync from 'svelte-icons/go/GoSync.svelte'
</script>

<div class="flex flex-col grow items-center justify-center">
  <div class="icon">
    <GoSync />
  </div>
</div>

<style>
  .icon {
    @apply animate-spin text-blue-500 w-8 h-8;
  }
</style>