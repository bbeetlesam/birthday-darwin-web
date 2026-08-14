<script lang="ts">
	import { tracksPlaylistUrl } from '$lib/pages/party/tracks';
	import placeholderImg from '$lib/assets/images/gumball-mesmerised.png';

	const SPOTIFY_PLAYLIST_URL = tracksPlaylistUrl;
	const ASSETS_DRIVE_URL =
		'https://drive.google.com/drive/folders/1ExzYeaP-ojIU_QK_3HCzS5zKP_G51sPD';
	const GITHUB_URL = 'https://github.com/bbeetlesam/birthday-darwin-web';

	type giftEntry = {
		name: string;
		description: string;
		image: string;
		link: string;
	};

	const giftEntries: giftEntry[] = [
		{
			name: "Robert's Simple Album",
			description: 'A collection of special tracks he hopefully find interesting for you.',
			image: placeholderImg,
			link: SPOTIFY_PLAYLIST_URL
		},
		{
			name: "Immanuella's Doodles",
			description: 'She loves doodles, and here are her special creations to her bestie! :3',
			image: placeholderImg,
			link: ASSETS_DRIVE_URL
		},
		{
			name: "Samudra's Messy Codes",
			description: 'A nerd like him can only shares his <b>valuable source codes</b>..',
			image: placeholderImg,
			link: GITHUB_URL
		}
	];
</script>

<div class="flex flex-col items-center gap-4 overflow-hidden">
	<div class="flex flex-col items-center">
		<h2 class="text-3xl font-extrabold text-[#2f2f2f]">Gifts From People!</h2>
		<p class="text-base">Not many, but hope you love them!</p>
	</div>

	<div class="flex flex-col gap-2">
		{#each giftEntries as giftEntry (giftEntry)}
			<a
				href={giftEntry.link}
				class="flex cursor-pointer gap-2 rounded-lg border-2 border-[#2f2f2f] bg-[#e8d7ff] p-2 transition-all duration-300 hover:bg-[#E3CBFF]"
			>
				<img src={giftEntry.image} alt={giftEntry.name} class="h-14 w-auto" />
				<div class="flex flex-col">
					<h3 class="text-base font-bold">{giftEntry.name}</h3>
					<p class="text-sm">{giftEntry.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
