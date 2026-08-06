<script lang="ts">
	import darwinOpenImg from '$lib/assets/images/darwin-smileopen.png';
	import darwinShutImg from '$lib/assets/images/darwin-smileshut.png';
	import nextKeyImg from '$lib/assets/images/key-blue.png';
	import Window from '$lib/components/Window.svelte';

	type WindowConfig = {
		id: number;
		title: string;
		initialX: number;
		initialY: number;
		smiled: boolean;
	};

	const NEXT_SCENE = 'darwin';
	type Props = {
		onComplete?: (nextScene: typeof NEXT_SCENE) => void;
	};

	let { onComplete }: Props = $props();

	const WINDOW_COUNT = 10;
	const WINDOW_SIZE = 340;
	const WINDOW_NAME = 'annoyingdarwin.exe';

	const windowStyle = {
		borderRadius: '0.5rem',
		borderColor: '#2f2f2f',
		borderWidth: '2px',
		statusbarColor: '#f2d3dd',
		statusbarSeparatorColor: '#2f2f2f',
		statusbarSeparatorWidth: '2px',
		contentPadding: '0rem'
	};

	let windows = $state<WindowConfig[]>([]);
	let hasCompleted = $state(false);

	const allWindowsSmiled = $derived(
		windows.length === WINDOW_COUNT && windows.every((windowConfig) => windowConfig.smiled)
	);

	$effect(() => {
		if (windows.length > 0) return;

		windows = Array.from({ length: WINDOW_COUNT }, (_, index) => ({
			id: index,
			title: WINDOW_NAME,
			initialX: Math.random() * Math.max(window.innerWidth - WINDOW_SIZE, 0),
			initialY: Math.random() * Math.max(window.innerHeight - WINDOW_SIZE, 0),
			smiled: false
		}));
	});

	function completeIntro() {
		if (!allWindowsSmiled || hasCompleted) return;

		hasCompleted = true;
		onComplete?.(NEXT_SCENE);
	}

	function smileWindow(id: number) {
		windows = windows.map((windowConfig) =>
			windowConfig.id === id ? { ...windowConfig, smiled: true } : windowConfig
		);
	}
</script>

{#if allWindowsSmiled && !hasCompleted}
	<button
		type="button"
		class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer bg-transparent p-0"
		onclick={completeIntro}
		aria-label="Continue to the next scene"
	>
		<img
			src={nextKeyImg}
			alt="Continue"
			class="floating-key box-shadow-[0 1.25rem 3rem rgb(0 0 0 / 0.2)] h-auto w-16 rotate-20"
		/>
	</button>
{/if}

<!-- randomly placed windows -->
{#each windows as windowConfig (windowConfig.id)}
	<Window
		title={windowConfig.title}
		initialX={windowConfig.initialX}
		initialY={windowConfig.initialY}
		width={`${WINDOW_SIZE}px`}
		height={`${WINDOW_SIZE}px`}
		style={windowStyle}
	>
		<div class="relative flex h-full w-full items-center justify-center">
			<img
				src={windowConfig.smiled ? darwinOpenImg : darwinShutImg}
				alt="Darwin"
				class="h-full w-full object-cover"
			/>

			<button
				type="button"
				class={`absolute top-1/2 left-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 bg-transparent ${windowConfig.smiled ? 'cursor-default' : 'cursor-pointer'}`}
				disabled={windowConfig.smiled}
				onclick={() => smileWindow(windowConfig.id)}
				aria-label={`Make ${windowConfig.title} smile`}
			></button>
		</div>
	</Window>
{/each}

<style>
	.floating-key {
		animation: float-key 2.4s ease-in-out infinite;
	}

	@keyframes float-key {
		0%,
		100% {
			transform: translateY(0) rotate(25deg);
		}

		50% {
			transform: translateY(-0.75rem) rotate(25deg);
		}
	}
</style>
