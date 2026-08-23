<script lang="ts">
	import SceneManager from '$lib/components/SceneManager.svelte';
	import type { Scene } from '$lib/components/SceneManager.svelte';

	let scene: Scene = 'party';
</script>

<!-- Party scene goes hard here! -->
<SceneManager scene={scene} />
