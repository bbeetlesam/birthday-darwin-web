<script lang="ts">
	import MovingBg from '$lib/components/MovingPatternBackground.svelte';
	import flowerBgImg from '$lib/assets/images/flower-rg.png';
	import Intro from '$lib/pages/Intro.svelte';
	import WhosDarwin from '$lib/pages/Darwin.svelte';

	const pages = ['intro', 'darwin'] as const;
	type Scene = (typeof pages)[number];

	let scene = $state<Scene>(pages[0]);

	function goToScene(nextScene: Scene) {
		scene = nextScene;
	}
</script>

<!-- the lovely flowery background -->
<MovingBg
	image={flowerBgImg}
	backgroundColor="#FDFBF7"
	size="48px"
	opacity={0.12}
	angle="-20deg"
	speed="20s"
	distance="280px"
/>

<!-- REMOVE IN PROD -->
<!-- only for debugging -->
<p>${scene}</p>

<!-- scene manager goes hard here -->
{#if scene === 'intro'}
	<Intro onComplete={goToScene} />
{:else if scene === 'darwin'}
	<WhosDarwin />
{/if}
