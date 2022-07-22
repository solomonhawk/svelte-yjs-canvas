<script lang="ts">
  import Cursor from '$lib/components/icons/cursor.svelte';
  import { currentUserId, state, canvasWidth, canvasHeight, updateUserCursor, setPixel, usersState } from '$lib/store';
  import { useSnapshot } from 'sveltio';
  import Pixel from './pixel.svelte';

  const sharedState = useSnapshot(state);
  const usersList = useSnapshot(usersState);

  const onMove = (e: MouseEvent) => {
    const {clientX, clientY} = e;
    updateUserCursor({x: clientX, y: clientY});
  };

  const grid = new Array(canvasHeight).fill(0).map(() => new Array(canvasWidth).fill(0));
</script>

<div on:mousemove={onMove} class="flex flex-col min-h-full relative">
  {#each $usersList.users as user}
    {#if user.id !== currentUserId}
      <div class="absolute flex pointer-events-none" style="stroke: {user.color}; top: {user.cursorState.y}px; left: {user.cursorState.x}px">
        <Cursor class="block w-6 h-6 -ml-[2px] -mt-[1px]" color={user.color} />
        <small class="mt-3">{user.name}</small>
      </div>
    {/if}
  {/each}

  <div class="flex grow items-center justify-center">
    <div class="border-b border-r flex flex-col">
      {#each grid as row, y}
        <div class="flex">
          {#each row as _, x}
            {@const filled = $sharedState.pixels[x + y * canvasWidth] > 0}

            <Pixel filled={filled} on:click={() => {
              setPixel({ x, y }, !filled);
            }} />
          {/each}
        </div>
      {/each}
    </div>
  </div>
</div>