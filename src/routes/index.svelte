<script lang="ts">
  import {useSnapshot} from 'sveltio';
  import {state, usersState, currentUserId, updateUserCursor} from '$lib/store';
  import {browser} from '$app/env';
  import Cursor from '$lib/components/icons/cursor.svelte';

  const sharedState = useSnapshot(state);
  const usersList = useSnapshot(usersState);

  const onMove = (e: MouseEvent) => {
    const {clientX, clientY} = e;
    updateUserCursor({x: clientX, y: clientY});
  };
</script>

<div on:mousemove={onMove} class="flex flex-col min-h-full relative">
  {#if browser}
    <button on:click={() => state.count++}>
      {$sharedState.count}
    </button>
  {/if}

  <div>
    {#each $usersList.users as user}
      {#if user.id !== currentUserId}
        <div class="absolute flex pointer-events-none" style="stroke: {user.color}; top: {user.cursorState.y}px; left: {user.cursorState.x}px">
          <Cursor class="block w-6 h-6 -ml-[2px] -mt-[1px]" color={user.color} />
          <small class="mt-3">{user.name}</small>
        </div>
      {/if}
    {/each}
  </div>
</div>

<div class="fixed bottom-0 left-0 w-full pb-2">
  {#each $usersList.users as user}
    <div class="flex justify-between px-2">
      <div class="username" style="--user-color: {user.color}">
        {user.name}
      </div>

      <div>
        {user.cursorState.x} {user.cursorState.y}
      </div>
    </div>
  {/each}
</div>

<style>
  .username {
    color: var(--user-color);
  }
</style>