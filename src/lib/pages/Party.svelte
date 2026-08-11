<script lang="ts">
	import { onMount } from 'svelte';
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	import kuberiImg from '$lib/assets/favicon.svg';

	import WishWindow from '$lib/pages/party/Wish.svelte';
	import { desktopApps } from '$lib/pages/party/desktop-apps';

	const clockFormatter = new Intl.DateTimeFormat([], {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});

	let currentTime = $state(clockFormatter.format(new Date()));
	let wishCanClose = $state(false);

	const visibleDesktopApps = $derived(
		desktopApps.map((app) =>
			app.id === 'greet' ? { ...app, windowShowCloseButton: wishCanClose } : app
		)
	);

	function unlockWishCloseButton() {
		wishCanClose = true;
	}

	onMount(() => {
		const tick = () => {
			currentTime = clockFormatter.format(new Date());
		};

		tick();
		const intervalId = globalThis.setInterval(tick, 1000);

		return () => globalThis.clearInterval(intervalId);
	});
</script>

{#each visibleDesktopApps as app (app.id)}
	{@const WindowContent = app.WindowContent}

	<Desktop
		id={app.id}
		icon={app.icon}
		title={app.title}
		x={app.x}
		y={app.y}
		windowTitle={app.windowTitle}
		windowWidth={app.windowWidth}
		windowHeight={app.windowHeight}
		windowStyle={app.windowStyle}
		windowShowCloseButton={app.windowShowCloseButton}
		initiallyOpen={app.initiallyOpen}
	>
		{#if app.id === 'greet'}
			<WishWindow onAllPagesViewed={unlockWishCloseButton} />
		{:else}
			<WindowContent />
		{/if}
	</Desktop>
{/each}

<footer
	class="fixed right-0 bottom-0 left-0 z-50 flex h-8 items-center justify-between border-t-2 border-[#2f2f2f] bg-[#f2d3dd] px-2 text-[#2f2f2f]"
>
	<div class="inline-flex items-center gap-2">
		<img src={kuberiImg} alt="Status icon" class="h-5 w-5" />
		<span class="text-sm font-bold">For lovely Kamil!</span>
	</div>

	<div class="text-sm font-bold tabular-nums">
		{currentTime}
	</div>
</footer>
