<script lang="ts">
	import MovingBg from '$lib/components/MovingPatternBackground.svelte';
	import SceneTransition from '$lib/components/SceneTransition.svelte';

	// scenes
	import Intro from '$lib/pages/Intro.svelte';
	import WhosDarwin from '$lib/pages/Darwin.svelte';

	import flowerBgImg from '$lib/assets/images/flower-rg.png';
	import transitionImg from '$lib/assets/images/flowerbluebig.png';

	const pages = ['intro', 'darwin'] as const;
	type Scene = (typeof pages)[number];
	type TransitionRequest = {
		id: number;
		scene: Scene;
	};

	// initial scene
	let scene = $state<Scene>('intro');
	let transitionRequest = $state<TransitionRequest | null>(null);
	let transitionRequestId = 0;

	function goToScene(nextScene: Scene) {
		if (transitionRequest || nextScene === scene) return;

		transitionRequest = {
			id: ++transitionRequestId,
			scene: nextScene
		};
	}

	function setScene(nextScene: string) {
		if (pages.includes(nextScene as Scene)) {
			scene = nextScene as Scene;
		}
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
<p class="fixed top-0 left-0 z-9999">${scene}</p>

<!-- scene manager goes hard here -->
{#if scene === 'intro'}
	<Intro onComplete={goToScene} />
{:else if scene === 'darwin'}
	<WhosDarwin />
{/if}

<SceneTransition
	image={transitionImg}
	request={transitionRequest}
	maxSize="140vmax"
	coverMs={1000}
	uncoverMs={1000}
	onCovered={setScene}
	onDone={() => (transitionRequest = null)}
/>
