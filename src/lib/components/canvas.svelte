<script lang="ts">
	import { onMount } from 'svelte';
	import Cursor from '$lib/components/icons/cursor.svelte';
	import Pixel from './pixel.svelte';
	import { getPaletteColor } from '$lib/palette';
	import {
		currentUserId,
		state,
		canvasWidth,
		canvasHeight,
		updateUserCursor,
		setPixel,
		usersState,
		localState
	} from '$lib/store';
	import { useSnapshot } from 'sveltio';

	const sharedState = useSnapshot(state);
	const usersList = useSnapshot(usersState);
	const local = useSnapshot(localState);

	const grid = new Array(canvasHeight).fill(0).map(() => new Array(canvasWidth).fill(0));

	let pressing = false;
	let canvasEl: HTMLDivElement | null = null;

	$: mode = $local.gridMode;
	$: canvasRect = canvasEl && canvasEl.getBoundingClientRect();

	onMount(() => {
		function onResize() {
			canvasRect = canvasEl && canvasEl.getBoundingClientRect();
		}

		window.addEventListener('resize', onResize);

		return () => window.removeEventListener('resize', onResize);
	});

	function updateCursor(e: MouseEvent) {
		const { clientX, clientY } = e;
		const { width, height, top } = canvasRect!;

		let cx = width / 2 - clientX;
		let cy = height / 2 + top - clientY;

		updateUserCursor({ x: -cx, y: -cy });
	}

	function startPressing() {
		pressing = true;
	}

	function stopPressing() {
		pressing = false;
	}
</script>

<div
	class="flex flex-col grow relative overflow-y-auto touch-none"
	on:pointermove={updateCursor}
	on:pointerdown={startPressing}
	on:pointerup={stopPressing}
>
	{#if canvasRect}
		{#each $usersList.users as user}
			{#if user.id !== currentUserId}
				<div
					class="cursor-wrapper"
					style="--color: {user.color}; --y: {user.cursorState.y}px; --x: {user.cursorState.x}px"
				>
					<Cursor class="block w-6 h-6 -ml-[2px] -mt-[1px]" color={user.color} />
					<small class="cursor-name">{user.name}</small>
				</div>
			{/if}
		{/each}
	{/if}

	<div class="flex grow items-center justify-center" bind:this={canvasEl}>
		<div class=" outline-1 outline-gray-200 outline-offset-[-1px] m-10 drop-shadow-2xl">
			<table class="border-collapse" style="--pixel-size: {$local.pixelSize}px" cellpadding="0">
				<tbody>
					{#each grid as row, y}
						<tr class="table-row">
							{#each row as _, x}
								<td
									class="border"
									class:border-white={mode === 'transparent'}
									class:border-transparent={mode === 'invisible'}
									style="--color: {getPaletteColor(
										$local.palette,
										$sharedState.pixels[x + y * canvasWidth]
									) || 'hotpink'}"
								>
									<div class:pixel-bleed={mode === 'invisible'}>
										<Pixel
											on:pointerdown={() => setPixel({ x, y }, $local.selectedColor)}
											on:pointerenter={() => {
												if (pressing) {
													setPixel({ x, y }, $local.selectedColor);
												}
											}}
										/>
									</div>
								</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

<style>
	.cursor-wrapper {
		@apply absolute flex pointer-events-none top-[50%] left-[50%] z-10;
		fill: var(--color);
		transform: translate(var(--x), var(--y));
	}

	.cursor-name {
		@apply mt-3 font-semibold drop-shadow bg-white rounded-sm px-1;
	}

	.pixel-bleed {
		box-shadow: 0px 0px 0 1px var(--color);
	}
</style>
