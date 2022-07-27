<script lang="ts">
  import { usersState } from '$lib/store';
  import { useSnapshot } from 'sveltio';

  const usersList = useSnapshot(usersState);
</script>

<ul class="fixed bottom-0 right-0 pointer-events-none py-2 px-3 text-right">
  {#each $usersList.users as user}
    <li class="my-1">
      <small class="username" style="--color: {user.color}">
        {user.name}
      </small>
    </li>
  {/each}
</ul>

<style>
  .username {
    @apply text-white font-bold px-2 py-1 rounded drop-shadow;
    background-color: var(--color);
  }
</style>