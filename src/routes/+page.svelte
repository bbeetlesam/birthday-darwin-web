<script lang="ts">
	import SceneManager from '$lib/components/SceneManager.svelte';
	import type { Scene } from '$lib/components/SceneManager.svelte';

	let scene = $state<Scene>('intro');
</script>

<!-- REMOVE IN PROD -->
<!-- only for debugging -->
<!-- <p class="fixed top-0 left-0 z-9999">${scene}</p> -->

<!-- scene manager goes hard here -->
<SceneManager bind:scene />
