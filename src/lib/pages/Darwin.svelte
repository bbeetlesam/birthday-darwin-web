<script lang="ts">
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';
	import { desktopApps, rsvpDesktopApp } from '$lib/pages/darwin/desktop-apps';

	const galleryUnlockSequence = [
		'normal-darwin',
		'think-darwin',
		'full-darwin',
		'party-darwin',
		'cutethink-darwin'
	];

	let openedGalleryEntryIds = $state<string[]>([]);

	const unlockedGalleryEntryIds = $derived(
		galleryUnlockSequence.slice(
			0,
			Math.min(openedGalleryEntryIds.length + 1, galleryUnlockSequence.length)
		)
	);

	const hasCompletedGallerySequence = $derived(
		galleryUnlockSequence.every((entryId) => openedGalleryEntryIds.includes(entryId))
	);

	const visibleDesktopApps = $derived(
		hasCompletedGallerySequence ? [...desktopApps, rsvpDesktopApp] : desktopApps
	);

	function recordGalleryEntryOpen(entryId: string) {
		if (!galleryUnlockSequence.includes(entryId) || openedGalleryEntryIds.includes(entryId)) return;

		openedGalleryEntryIds = [...openedGalleryEntryIds, entryId];
	}
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
		{#if app.id === 'gallery'}
			<GalleryWindow
				unlockedEntryIds={unlockedGalleryEntryIds}
				onEntryOpen={recordGalleryEntryOpen}
			/>
		{:else}
			<WindowContent />
		{/if}
	</Desktop>
{/each}
