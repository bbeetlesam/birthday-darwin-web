<script lang="ts">
	import MovingBg from '$lib/components/MovingPatternBackground.svelte';
	import SceneManager from '$lib/components/SceneManager.svelte';
	import flowerBgImg from '$lib/assets/images/flower-rg.png';
	import type { Scene } from '$lib/components/SceneManager.svelte';

	let scene = $state<Scene>('intro');
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
<!-- <p class="fixed top-0 left-0 z-9999">${scene}</p> -->

<!-- scene manager goes hard here -->
<SceneManager bind:scene />
