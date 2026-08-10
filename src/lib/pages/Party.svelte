<script lang="ts">
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	// import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';
	import { desktopApps } from '$lib/pages/party/desktop-apps';
</script>

{#each desktopApps as app (app.id)}
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
		<!-- {#if app.id === 'gallery'}
			<GalleryWindow
				unlockedEntryIds={unlockedGalleryEntryIds}
				onEntryOpen={recordGalleryEntryOpen}
			/>
		{:else if app.id === 'rsvp'}
			<RSVPWindow {guestsList} {onComplete} />
		{:else}
			<WindowContent />
		{/if} -->
		<WindowContent />
	</Desktop>
{/each}
