<script lang="ts">
  import { usersState } from '$lib/store';
  import { useSnapshot } from 'sveltio';

  const usersList = useSnapshot(usersState);
</script>

<div class="fixed top-12 right-0 pointer-events-none py-2 px-3 text-right">
  {#each $usersList.users as user}
    <small class="username block" style="--user-color: {user.color}">
      {user.name}
    </small>
  {/each}
</div>

<style>
  .username {
    color: var(--user-color);
  }
</style>