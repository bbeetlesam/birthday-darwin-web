<script lang="ts">
	import MovingBg from '$lib/components/MovingPatternBackground.svelte';
	import flowerBgImg from '$lib/assets/images/flower-rg.png';
	import Intro from '$lib/pages/Intro.svelte';
</script>

<MovingBg
	image={flowerBgImg}
	backgroundColor="#FDFBF7"
	size="48px"
	opacity={0.12}
	angle="-20deg"
	speed="18s"
	distance="280px"
/>

<main class="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
	<h1 class="text-3xl font-bold">Welcome to Kamil's Secret Birthday Party</h1>
	<p class="text-lg">Visit her party room to see the documentation</p>
</main>
<Intro />
