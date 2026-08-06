<script lang="ts" module>
	const pages = ['intro', 'darwin'] as const;
	export type Scene = (typeof pages)[number];
</script>

<script lang="ts">
	import SceneTransition from '$lib/components/SceneTransition.svelte';
	import transitionImg from '$lib/assets/images/flowerbluebig.png';

	// scenes
	import Intro from '$lib/pages/Intro.svelte';
	import WhosDarwin from '$lib/pages/Darwin.svelte';

	type TransitionRequest = {
		id: number;
		scene: Scene;
	};

	type Props = {
		scene?: Scene;
	};

	// set fallback scene
	let { scene = $bindable<Scene>('intro') }: Props = $props();
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

<!-- the REAL scene manager -->
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
