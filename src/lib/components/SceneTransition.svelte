<script lang="ts">
	type TransitionRequest = {
		id: number;
		scene: string;
	};

	type TransitionPhase = 'idle' | 'covering' | 'uncovering';

	type Props = {
		image: string;
		request: TransitionRequest | null;
		maxSize?: string;
		coverMs?: number;
		uncoverMs?: number;
		onCovered?: (scene: string) => void;
		onDone?: () => void;
	};

	let {
		image,
		request,
		maxSize = '180vmax',
		coverMs = 900,
		uncoverMs = 900,
		onCovered,
		onDone
	}: Props = $props();

	let phase = $state<TransitionPhase>('idle');
	let isPlaying = $state(false);
	let playedRequestId = $state<number | null>(null);

	const imageClass = $derived(phase === 'covering' ? 'scale-100' : 'scale-0');
	const imageStyle = $derived(`
		width: ${maxSize};
		transition-duration: ${phase === 'covering' ? coverMs : uncoverMs}ms;
	`);

	function wait(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	async function playTransition(nextScene: string) {
		isPlaying = true;
		phase = 'covering';

		await wait(coverMs);
		onCovered?.(nextScene);

		phase = 'uncovering';

		await wait(uncoverMs);
		phase = 'idle';
		isPlaying = false;
		onDone?.();
	}

	$effect(() => {
		if (!request || isPlaying || request.id === playedRequestId) return;

		playedRequestId = request.id;
		playTransition(request.scene);
	});
</script>

<img
	src={image}
	alt=""
	aria-hidden="true"
	class={`pointer-events-none fixed top-1/2 left-1/2 z-50 h-auto max-w-none -translate-x-1/2 -translate-y-1/2 transition-transform ease-in-out ${imageClass}`}
	style={imageStyle}
/>
