<script lang="ts">
	import { cubicOut } from 'svelte/easing';
	import { slide } from 'svelte/transition';
	import { tracksList, tracksPlaylistUrl } from '$lib/pages/party/tracks';
	import partyDarwinImg from '$lib/assets/images/darwin-hat.png';
	import spotifyIcon from '$lib/assets/images/spotify-icon.svg';

	let openDescriptions = $state<Record<number, boolean>>({});

	function toggleDescription(index: number) {
		openDescriptions = {
			...openDescriptions,
			[index]: !openDescriptions[index]
		};
	}
</script>

<div class="flex h-full flex-col gap-3 pb-2">
	<!-- Header -->
	<div class="flex items-center justify-between gap-3 px-0 pt-0">
		<div class="flex items-center gap-3">
			<img src={partyDarwinImg} alt="Darwin listening" class="w-14" />
			<div class="flex flex-col">
				<p class="text-xs">Special Playlist</p>
				<h2 class="text-xl font-bold text-[#2f2f2f]">birth of days</h2>
			</div>
		</div>
		<a
			href={tracksPlaylistUrl}
			target="_blank"
			rel="noopener noreferrer"
			class="rounded-md border-2 border-[#2f2f2f] bg-white px-1 py-1 transition hover:bg-[#e7f6ea]"
			aria-label="Open playlist on Spotify"
		>
			<img src={spotifyIcon} alt="" aria-hidden="true" class="h-6 w-6" />
		</a>
	</div>

	<!-- Scrollable Tracklist -->
	<div
		class="flex-1 overflow-y-auto border-t-2 border-[#2f2f2f]/20 px-0 pr-2"
		style="scrollbar-width: auto; scrollbar-color: #c4d6f0 transparent;"
	>
		<div class="space-y-2">
			{#each tracksList as track, index (index)}
				<div
					class="overflow-hidden rounded-md border-2 bg-[#d9ecff] transition-all duration-200 hover:bg-[#d9f9fd]"
				>
					<div class="flex items-start justify-between gap-2 px-3 py-2">
						<a
							href={track.spotifyUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="group min-w-0 flex-2"
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
							class="border-t-2 border-[#2f2f2f] bg-[#e8d7ff] px-3 py-1 text-sm leading-relaxed text-[#2f2f2f]"
						>
							{track.description ?? 'Selected for you.'}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<div class="flex justify-between border-t-2 border-[#2f2f2f]/20 text-xs">
		<p>Sincerely, Sam</p>
		<p>Jolly good.</p>
	</div>
</div>

<style>
	/* Custom scrollbar styling */
	::-webkit-scrollbar {
		width: 8px;
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
