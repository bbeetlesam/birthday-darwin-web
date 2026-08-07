<script lang="ts">
	import type { GalleryItem } from '$lib/types';
	import { galleryEntries } from '$lib/pages/darwin/gallery-entries';

	const ITEMS_PER_PAGE = 6; // 2 rows x 3 columns
	const TOTAL_PAGES = Math.ceil(galleryEntries.length / ITEMS_PER_PAGE);
	const pageIndexes = Array.from({ length: TOTAL_PAGES }, (_, index) => index);

	let currentPage = $state(0);
	let selectedEntry = $state<GalleryItem | null>(null);

	const currentEntries = $derived(
		galleryEntries.slice(
			currentPage * ITEMS_PER_PAGE,
			currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE
		)
	);

	function previousPage() {
		currentPage = Math.max(currentPage - 1, 0);
	}

	function nextPage() {
		currentPage = Math.min(currentPage + 1, TOTAL_PAGES - 1);
	}

	function goToPage(page: number) {
		currentPage = page;
	}

	function openEntry(entry: GalleryItem) {
		selectedEntry = entry;
	}

	function closeEntry() {
		selectedEntry = null;
	}
</script>

{#if selectedEntry}
	<div class="flex h-full min-h-0 flex-col gap-4">
		<div class="flex shrink-0 overflow-hidden rounded-lg border-2 border-[#2f2f2f] bg-[#fff7d6]">
			<div class="shrink-0 bg-white/80 p-3">
				<img
					src={selectedEntry.image}
					alt={selectedEntry.title}
					class="h-28 w-28 rounded-md object-cover"
				/>
			</div>

			<div class="min-w-0 flex-1 space-y-2 border-l-2 border-[#2f2f2f] bg-[#d9ecff] p-3">
				<h2 class="text-2xl font-extrabold text-[#2f2f2f]">{selectedEntry.title}</h2>
				<p>{selectedEntry.shortDesc}</p>
			</div>
		</div>

		<div class="min-h-0 flex-1 overflow-auto rounded-lg border-2 border-[#2f2f2f] bg-white/80 p-3">
			<p>{selectedEntry.longDesc}</p>
		</div>

		<button
			type="button"
			class="w-fit shrink-0 cursor-pointer self-center rounded-lg border-2 bg-amber-100 px-3 py-1 text-sm font-bold hover:bg-amber-200"
			onclick={closeEntry}
		>
			Back
		</button>
	</div>
{:else}
	<div class="flex h-full min-h-0 flex-col gap-3">
		<div class="grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-3">
			{#each currentEntries as entry (entry.id)}
				<article
					class="flex min-h-0 flex-col overflow-hidden rounded-lg border-2 border-[#2f2f2f] bg-[#fff7d6]"
				>
					<div class="min-h-0 flex-1 overflow-hidden bg-[#d9ecff] p-2">
						<img src={entry.image} alt={entry.title} class="h-full w-full object-contain" />
					</div>

					<div class="shrink-0 border-t-2 border-[#2f2f2f] bg-[#f2d3dd] px-2 py-1">
						<button
							type="button"
							class="w-full cursor-pointer truncate text-center text-sm font-bold text-[#2f2f2f] hover:underline"
							onclick={() => openEntry(entry)}
						>
							{entry.title}
						</button>
					</div>
				</article>
			{/each}
		</div>

		<div class="flex shrink-0 items-center justify-between gap-4">
			<button
				type="button"
				class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 text-sm font-bold hover:bg-amber-200 disabled:cursor-default disabled:opacity-45"
				disabled={currentPage === 0}
				onclick={previousPage}
			>
				Prev
			</button>

			<div class="flex items-center gap-2" aria-label="Gallery pages">
				{#each pageIndexes as pageIndex (pageIndex)}
					<button
						type="button"
						class={`h-2.5 w-2.5 cursor-pointer rounded-full border border-[#2f2f2f] ${pageIndex === currentPage ? 'bg-[#2f2f2f]' : 'bg-white/80'}`}
						onclick={() => goToPage(pageIndex)}
						aria-label={`Go to gallery page ${pageIndex + 1}`}
						aria-current={pageIndex === currentPage ? 'page' : undefined}
					></button>
				{/each}
			</div>

			<button
				type="button"
				class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 text-sm font-bold hover:bg-amber-200 disabled:cursor-default disabled:opacity-45"
				disabled={currentPage === TOTAL_PAGES - 1}
				onclick={nextPage}
			>
				Next
			</button>
		</div>
	</div>
{/if}
