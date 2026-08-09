<script lang="ts">
	import birthdayManImg from '$lib/assets/images/birthday-man.png';
	import dollingDarwinImg from '$lib/assets/images/darwin-doll.png';

	type RSVPPage = 'first' | 'name' | 'final';
	type Props = {
		guestsList?: string[];
		onSubmit?: (name: string) => void;
	};

	let { guestsList = [], onSubmit }: Props = $props();

	let page = $state<RSVPPage>('first');
	let guestName = $state('');
	let error = $state('');

	function goToNamePage() {
		page = 'name';
	}

	function submitName() {
		error = '';
		const name = guestName.trim();
		if (!name) {
			error = 'Everyone has a name, and so do you!';
			return;
		}

		// check against provided guests list (case-insensitive)
		const matched = guestsList.some((g) => g.toLowerCase() === name.toLowerCase());
		if (!matched) {
			error = 'Hm, are you invited?';
			return;
		}

		onSubmit?.(name);
		page = 'final';
	}

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			submitName();
		}
	}
</script>

<div class="flex h-full min-h-0 flex-col gap-4">
	<!-- contents -->
	<div class="min-h-0 flex-1 overflow-hidden rounded-lg border-2 border-[#2f2f2f] bg-[#d8ecff] p-4">
		{#if page === 'first'}
			<div class="flex h-full items-center gap-4">
				<img src={dollingDarwinImg} alt="Darwin" class="h-40 w-40 object-contain" />
				<div class="flex flex-col gap-3">
					<h2 class="text-2xl font-extrabold text-[#2f2f2f]">Funs! Prepare!</h2>
					<p>
						<span class="font-extrabold">She</span> is on her birthday today! Let's celebrate with
						Darwin!
					</p>
				</div>
			</div>
		{:else if page === 'name'}
			<div class="space-y-2">
				<h2 class="text-2xl font-extrabold text-[#2f2f2f]">One last thing...</h2>
				<p>Make sure you're invited!</p>

				<div class="flex flex-col gap-1">
					<input
						type="text"
						class="rounded-lg border px-3 py-2 outline-none focus:border-[#4090d1] focus:ring-1 focus:ring-[#4090d1]"
						placeholder="Your fancy name"
						bind:value={guestName}
						onkeydown={onKeydown}
					/>
					{#if error}
						<div class="text-sm text-red-600">{error}</div>
					{/if}
				</div>
			</div>
		{:else if page === 'final'}
			<div class="flex h-full items-center gap-4">
				<img src={birthdayManImg} alt="Birthday person" class="h-56 w-48 shrink-0 object-contain" />

				<div class="space-y-5">
					<h2 class="text-3xl font-extrabold text-[#2f2f2f]">WAIT..</h2>
					<div class="space-y-1">
  					<p>It certainly seems that this party.. is</p>
  					<button
       			  type="button"
              class="w-fit cursor-pointer self-center rounded-lg border-2 bg-amber-100 px-2 py-0 font-bold hover:bg-amber-200"
  					>
  					  YOUR PARTY!
  					</button>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<!-- buttons -->
	{#if page === 'first'}
		<button
			type="button"
			class="w-fit shrink-0 cursor-pointer self-center rounded-lg border-2 bg-amber-100 px-4 py-1 font-bold hover:bg-amber-200"
			onclick={goToNamePage}
		>
			Come In
		</button>
	{:else if page === 'name'}
		<button
			type="button"
			class="w-fit shrink-0 cursor-pointer self-center rounded-lg border-2 bg-amber-100 px-4 py-1 font-bold hover:bg-amber-200"
			onclick={submitName}
		>
			Join!
		</button>
	{/if}
</div>
