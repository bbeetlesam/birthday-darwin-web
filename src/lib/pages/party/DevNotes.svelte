<script lang="ts">
	// Restored original notes list (kept content unchanged as requested)
	const notes: string[] = [
		"I think I have been busy lately. With sometimes less time to message you, I don't know but feel regret and missing for not texting you so frequent just like any other past days. And unfortunately, I probably will be like this for God knows how long.",
		"But, yesterday you were turning older, and let's view it in a positive way, that you survived for twenty years! Not all people can do that, isn't it? And you still managed to keep those smile, energy, and beauty.. that is definitely one of a kind!",
		"This is a simple gift I'd like to give you because I don't know yet about your favorite things, but at least I know you have a nice taste, so I try to compare it with my taste too, so these are the results!",
		"It's not that good, though. Early plans to add some animations and sounds, and even longer scenes, has come to naught because of my limited time and skills... So these all are actually a stripped out version of the gift, to make sure I can complete it in the desired time.",
		'It may not be that useful to you, or even important (I guess). I even may end up forgetting that I had created such silly thing like this, but I hope my main message is sent crystal clear through this interface - happy birthday to the most exquisite girl in the world!',
		"I can't give you some cash, outfits, or maybe makeups, but I poured my sweat and time to build this just for you, so I hope this simple gift can cheer up your day when the clouds are dark, pale down the colour of your mood when it's red, and I hope you will still keep those characters in your soul even after if the years has passed like a swift river, because that's what I like about you :)",
		'Btw, bisa lah nnti kalo kamu dah sampe di gunpat (boleh ya aku jemput, mau kok direpotin) dan beristirahat dulu, boleh kali aku ketemu sama kamu lagi... he,, he,, kangen memang gaada di kalender dik,, ',
		"Anyway, that's my liner notes for this site! I hope you enjoy the simple party and your life, and.. I think that's all.",
		"Now go back and explore anything that you can find and don't forget to enjoy it!"
	];

	let page = $state(0);

	function prev() {
		page = Math.max(0, page - 1);
	}

	function next() {
		page = Math.min(notes.length - 1, page + 1);
	}
</script>

<div class="flex h-full flex-col items-stretch">
	<!-- notes -->
	<div class="flex flex-1 items-center justify-center">
		<article
			class="flex h-full w-full max-w-md flex-col rounded-lg border-2 border-[#2f2f2f] bg-[#fff7d6] shadow-lg"
			role="region"
			aria-label="Dev note"
		>
			<!-- paper notes -->
			<div class="flex-1 overflow-hidden">
				<div class="lined h-full overflow-auto p-2 text-sm leading-6 text-[#2f2f2f]">
					{#each notes[page].split('\n') as line (line)}
						<p class="m-0">{line}</p>
					{/each}
				</div>
			</div>
		</article>
	</div>

	<!-- control buttons -->
	<div class="mt-3 flex items-center justify-between">
		<button
			onclick={prev}
			class="inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-[#2f2f2f] bg-white px-3 py-1 text-sm font-bold text-[#2f2f2f] disabled:cursor-auto disabled:opacity-50"
			disabled={page === 0}
		>
			Prev
		</button>

		<div class="text-xs text-[#5E5F7D]">Page {page + 1} / {notes.length}</div>

		<button
			onclick={next}
			class="inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-[#2f2f2f] bg-white px-3 py-1 text-sm font-bold text-[#2f2f2f] disabled:cursor-auto disabled:opacity-50"
			disabled={page === notes.length - 1}
		>
			Next
		</button>
	</div>
</div>

<style>
	/* subtle ruled paper lines, match the line-height (1.5rem) */
	.lined {
		background-image: linear-gradient(to bottom, rgba(47, 47, 47, 0.12) 1px, transparent 1px);
		background-size: 100% 1.5rem;
		background-position: 100.5rem 0.5rem; /* align with p-2 padding */ /* aligns the repeating lines with the text baseline inside p-2 */
		/* ensure text sits exactly on the lines */
		line-height: 1.5rem;
	}

	.lined p {
		margin: 0 0 0.25rem 0;
	}
</style>
