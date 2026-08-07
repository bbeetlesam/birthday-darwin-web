<script lang="ts">
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	import { desktopApps } from '$lib/pages/darwin/desktop-apps';
</script>

{#each desktopApps as app (app.id)}
	{@const WindowContent = app.WindowContent}

	<Desktop
		icon={app.icon}
		title={app.title}
		x={app.x}
		y={app.y}
		windowTitle={app.windowTitle}
		windowWidth={app.windowWidth}
		windowHeight={app.windowHeight}
		windowStyle={app.windowStyle}
		initiallyOpen={app.initiallyOpen}
	>
		<WindowContent />
	</Desktop>
{/each}
