<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { tracksList } from '$lib/pages/party/tracks';
	import partyDarwinImg from '$lib/assets/images/darwin-hat.png';

	let openDescriptions = $state<Record<number, boolean>>({});

	function toggleDescription(index: number) {
		openDescriptions = {
			...openDescriptions,
			[index]: !openDescriptions[index]
		};
	}
</script>

<div class="flex h-full flex-col gap-2">
	<!-- Header -->
	<div class="flex items-center justify-between pr-1">
		<div class="flex items-center gap-2">
			<img src={partyDarwinImg} alt="Darwin listening" class="w-14" />
			<div class="flex flex-col justify-end">
				<p class="text-xs">Special Playlist</p>
				<h2 class="text-xl font-bold text-[#2f2f2f]">birth of days</h2>
			</div>
		</div>

		<div class="flex flex-col items-end text-xs">
			<p class="">30 tracks</p>
			<p>1 hr 55 min</p>
		</div>
	</div>

	<!-- Scrollable Tracklist -->
	<div class="scrollbar flex-1 overflow-y-auto border-y-2 border-[#2f2f2f] pr-3">
		<div class="flex flex-col divide-y-2 divide-[#2f2f2f]">
			{#each tracksList as track, index (index)}
				<div
					class="overflow-hidden rounded-none -outline-offset-1 outline-[#2f2f2f] transition-colors duration-200 hover:bg-[#d9ecff] hover:outline-2"
				>
					<div class="flex items-center justify-between gap-2 px-3 py-2">
						<p class="w-6 pr-2 text-right font-extrabold">{index}</p>
						<a
							href={track.spotifyUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="group min-w-0 flex-2 cursor-pointer"
						>
							<div class="flex items-baseline gap-2">
								<h3
									class="truncate text-base font-bold text-[#2f2f2f] transition-all group-hover:underline"
								>
									{track.title}
								</h3>
							</div>
							<p class="text-sm text-[#5E5F7D]">{track.artist}</p>
						</a>

						<button
							type="button"
							class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded border-2 border-[#2f2f2f] bg-amber-100 text-[#2f2f2f] transition hover:bg-amber-200"
							onclick={() => toggleDescription(index)}
							aria-expanded={openDescriptions[index] ? 'true' : 'false'}
							aria-label={openDescriptions[index] ? 'Hide description' : 'Show description'}
						>
							<span
								class={`text-base leading-none font-extrabold transition-transform ${openDescriptions[index] ? 'rotate-180' : ''}`}
								>↓</span
							>
						</button>
					</div>

					{#if openDescriptions[index]}
						<div
							transition:slide={{ duration: 220, easing: cubicOut }}
							class="border-x-2 border-t-2 border-[#2f2f2f] bg-[#e8d7ff] px-3 py-1 text-sm leading-relaxed text-[#2f2f2f]"
						>
							{track.description ?? 'Selected for you.'}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="flex justify-between text-xs">
		<p>Sincerely, Sam</p>
		<p>Jolly good.</p>
	</div>
</div>

<style>
	/* firefox */
	.scrollbar {
		scrollbar-width: auto;
		scrollbar-color: #d4d6f0 transparent;
	}

	/* chrome, edge, safari */
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: transparent;
	}

	::-webkit-scrollbar-thumb {
		background: #c4d6f0;
		border-radius: 4px;
	}

	::-webkit-scrollbar-thumb:hover {
		background: #9ab3d6;
	}
</style>
