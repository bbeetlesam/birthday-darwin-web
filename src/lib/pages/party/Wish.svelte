<script lang="ts">
	import type { Component } from 'svelte';
	import WishPage1 from '$lib/pages/party/wish-pages/WishPage1.svelte';
	import WishPage2 from '$lib/pages/party/wish-pages/WishPage2.svelte';
	import WishPage3 from '$lib/pages/party/wish-pages/WishPage3.svelte';

	type WishPage = {
		id: number;
		PageContent: Component;
		isFullBleed?: boolean;
	};

	type Props = {
		onAllPagesViewed?: () => void;
		isUnlocked?: boolean;
	};

	const pages: WishPage[] = [
		{
			id: 1,
			PageContent: WishPage1,
			isFullBleed: true
		},
		{
			id: 2,
			PageContent: WishPage2,
			isFullBleed: true
		},
		{
			id: 3,
			PageContent: WishPage3
		}
	];

	const totalPages = pages.length;
	const pageIndexes = Array.from({ length: totalPages }, (_, index) => index);

	let { onAllPagesViewed, isUnlocked = false }: Props = $props();
	let currentPage = $state(0);
	let visitedPageIds = $state<number[]>([pages[0].id]);
	let hasReportedCompletion = $state(false);

	const currentWishPage = $derived(pages[currentPage]);
	const CurrentPageContent = $derived(currentWishPage.PageContent);
	const currentPageIsFullBleed = $derived(currentWishPage.isFullBleed ?? false);

	function previousPage() {
		currentPage = Math.max(currentPage - 1, 0);
	}

	function nextPage() {
		currentPage = Math.min(currentPage + 1, totalPages - 1);
	}

	function goToPage(pageIndex: number) {
		currentPage = pageIndex;
	}

	$effect(() => {
		const currentPageId = pages[currentPage].id;
		if (!visitedPageIds.includes(currentPageId)) {
			visitedPageIds = [...visitedPageIds, currentPageId];
		}
	});

	$effect(() => {
		if (isUnlocked || hasReportedCompletion || visitedPageIds.length !== totalPages) return;

		hasReportedCompletion = true;
		onAllPagesViewed?.();
	});
</script>

<div class="flex h-full min-h-0 flex-col gap-4 p-4">
	<div class={`min-h-0 flex-1 overflow-auto ${currentPageIsFullBleed ? '-mx-4 -mt-4' : 'pb-4'}`}>
		<CurrentPageContent />
	</div>

	<div
		class={`flex shrink-0 items-center gap-4 ${isUnlocked ? 'justify-between' : 'justify-center'}`}
	>
		{#if isUnlocked}
			<button
				type="button"
				class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 text-sm font-bold hover:bg-amber-200 disabled:cursor-default disabled:opacity-45"
				disabled={currentPage === 0}
				onclick={previousPage}
			>
				Prev
			</button>

			<div class="flex items-center gap-2" aria-label="Wish pages">
				{#each pageIndexes as pageIndex (pageIndex)}
					<button
						type="button"
						class={`h-2.5 w-2.5 cursor-pointer rounded-full border border-[#2f2f2f] ${pageIndex === currentPage ? 'bg-[#2f2f2f]' : 'bg-white/80'}`}
						onclick={() => goToPage(pageIndex)}
						aria-label={`Go to wish page ${pageIndex + 1}`}
						aria-current={pageIndex === currentPage ? 'page' : undefined}
					></button>
				{/each}
			</div>
		{/if}

		<button
			type="button"
			class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 text-sm font-bold hover:bg-amber-200 disabled:cursor-default disabled:opacity-45"
			disabled={currentPage === totalPages - 1}
			onclick={nextPage}
		>
			Next
		</button>
	</div>
</div>
