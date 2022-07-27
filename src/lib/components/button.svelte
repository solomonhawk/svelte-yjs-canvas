<script lang="ts">
  export let title = '';
  export let accessibleText = '';
  export let disabled = false;
  export let rounded = true;

  let className = '';

  export {
    className as class
  }
</script>

<button
  type="button"
  title={title}
  disabled={disabled}
  class:rounded={rounded}
  class="{className} bg-white hover:text-blue-500 active:bg-gray-100 active:text-blue-600 active:drop-shadow-none disabled:bg-gray-100 disabled:text-gray-400 w-8 h-8 flex shrink-0 items-center justify-center drop-shadow-sm"
  on:click|preventDefault
>
  <span class="sr-only">{accessibleText || title}</span>
  <slot />
</button>