<script lang="ts">
	type RSVPPage = 'intro' | 'details' | 'final';

	let page = $state<RSVPPage>('intro');

	function goToDetails() {
		page = 'details';
	}
</script>

<div class="flex h-full min-h-0 flex-col gap-4">
	<div class="min-h-0 flex-1 overflow-auto rounded-lg border-2 border-[#2f2f2f] bg-white/80 p-4">
		{#if page === 'intro'}
			<div class="space-y-3">
				<h2 class="text-2xl font-extrabold text-[#2f2f2f]">RSVP</h2>
				<p>This is the first RSVP page.</p>
				<p>Click next to continue. You cannot return to this page afterward.</p>
			</div>
		{:else if page === 'details'}
			<div class="space-y-3">
				<h2 class="text-2xl font-extrabold text-[#2f2f2f]">Details</h2>
				<p>This is the second RSVP page.</p>
				<p>The next button is gone here for now.</p>
			</div>
		{:else if page === 'final'}
			<div class="space-y-3">
				<h2 class="text-2xl font-extrabold text-[#2f2f2f]">Final</h2>
				<p>This is the third RSVP page.</p>
			</div>
		{/if}
	</div>

	{#if page === 'intro'}
		<button
			type="button"
			class="w-fit shrink-0 cursor-pointer self-center rounded-lg border-2 bg-amber-100 px-4 py-1 font-bold hover:bg-amber-200"
			onclick={goToDetails}
		>
			Next
		</button>
	{/if}
</div>
