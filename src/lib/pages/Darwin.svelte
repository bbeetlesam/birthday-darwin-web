<script lang="ts">
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';
	import RSVPWindow from '$lib/pages/darwin/RSVPWindow.svelte';
	import { desktopApps, rsvpDesktopApp } from '$lib/pages/darwin/desktop-apps';
	import { onMount } from 'svelte';

	type Props = {
		onComplete?: (nextScene: 'party') => void;
	};

	let { onComplete }: Props = $props();

	const galleryUnlockSequence = [
		'normal-darwin',
		'think-darwin',
		'full-darwin',
		'party-darwin',
		'cutethink-darwin'
	];

	const guestsList = ['kamil', 'kamila', 'mila', 'samudra', 'sam'];

	let openedGalleryEntryIds = $state<string[]>([]);
	let forceOpenRSVP = $state(false); // debug bypass flag

	const unlockedGalleryEntryIds = $derived(
		galleryUnlockSequence.slice(
			0,
			Math.min(openedGalleryEntryIds.length + 1, galleryUnlockSequence.length)
		)
	);

	const hasCompletedGallerySequence = $derived(
		galleryUnlockSequence.every((entryId) => openedGalleryEntryIds.includes(entryId))
	);

	// include RSVP app if gallery sequence completed OR debug flag is present
	const visibleDesktopApps = $derived(
		hasCompletedGallerySequence || forceOpenRSVP
			? [
					...desktopApps,
					forceOpenRSVP ? { ...rsvpDesktopApp, initiallyOpen: true } : rsvpDesktopApp
				]
			: desktopApps
	);

	function recordGalleryEntryOpen(entryId: string) {
		if (!galleryUnlockSequence.includes(entryId) || openedGalleryEntryIds.includes(entryId)) return;

		openedGalleryEntryIds = [...openedGalleryEntryIds, entryId];
	}

	onMount(() => {
		try {
			const params = new URL(globalThis.location.href).searchParams;
			if (params.get('rsvp') === '1' || params.get('rsvp') === 'true') {
				forceOpenRSVP = true;
			}
		} catch {
			// ignore
		}
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
		{#if app.id === 'gallery'}
			<GalleryWindow
				unlockedEntryIds={unlockedGalleryEntryIds}
				onEntryOpen={recordGalleryEntryOpen}
				maxEntries={12}
			/>
		{:else if app.id === 'rsvp'}
			<RSVPWindow {guestsList} {onComplete} />
		{:else}
			<WindowContent />
		{/if}
	</Desktop>
{/each}
