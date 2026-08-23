<script lang="ts">
	import './layout.css';
	import Boot from '$lib/components/Boot.svelte';
	import MovingBg from '$lib/components/MovingPatternBackground.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import flowerBgImg from '$lib/assets/images/flower-rg.png';

	let { children } = $props();
</script>

<svelte:head>
	<title>Rahasia Y.</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Boot>
  <!-- Delicate moving flower background -->
  <MovingBg
	image={flowerBgImg}
	backgroundColor="#FDFBF7"
	size="48px"
	opacity={0.12}
	angle="-20deg"
	speed="20s"
	distance="280px"
  />

	{@render children()}
</Boot>
