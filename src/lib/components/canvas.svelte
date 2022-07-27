<script lang="ts">
  import Cursor from '$lib/components/icons/cursor.svelte';
  import Pixel from './pixel.svelte';
  import { getPaletteColor } from '$lib/palette';
  import { currentUserId, state, canvasWidth, canvasHeight, updateUserCursor, setPixel, usersState, localState } from '$lib/store';
  import { useSnapshot } from 'sveltio';

  const sharedState = useSnapshot(state);
  const usersList = useSnapshot(usersState);
  const local = useSnapshot(localState);

  let pressing = false;

  const updateCursor = (e: MouseEvent) => {
    const {clientX, clientY} = e;
    updateUserCursor({x: clientX, y: clientY});
  };

  const startPressing = () => {
    pressing = true;
  };

  const stopPressing = () => {
    pressing = false;
  };

  const grid = new Array(canvasHeight).fill(0).map(() => new Array(canvasWidth).fill(0));
</script>

<div
  class="flex flex-col grow relative overflow-y-auto p-10 touch-none"
  on:mousemove={updateCursor}
  on:pointerdown={startPressing}
  on:pointerup={stopPressing}
>
  {#each $usersList.users as user}
    {#if user.id !== currentUserId}
      <div class="absolute flex pointer-events-none" style="stroke: {user.color}; top: {user.cursorState.y}px; left: {user.cursorState.x}px">
        <Cursor class="block w-6 h-6 -ml-[2px] -mt-[1px]" color={user.color} />
        <small class="mt-3">{user.name}</small>
      </div>
    {/if}
  {/each}

  <div class="flex grow items-center justify-center">
    <table class="border border-collapse">
      <tbody>
        {#each grid as row, y}
          <tr class="table-row">
            {#each row as _, x}
              <td class="table-cell leading-none border p-0 m-0">
                <Pixel
                  color={getPaletteColor($local.palette, $sharedState.pixels[x + y * canvasWidth])}
                  on:pointerdown={() => setPixel({ x, y }, $local.selectedColor)}
                  on:pointerenter={() => {
                    if (pressing) {
                      setPixel({ x, y }, $local.selectedColor)
                    }
                  }}
                />
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>