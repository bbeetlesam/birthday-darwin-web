<script lang="ts">
	import type { Component } from 'svelte';
	import Desktop from '$lib/components/DesktopShortcut.svelte';
	import darwinGalleryImg from '$lib/assets/images/darwin-curious.png';
	import darwinWhoImg from '$lib/assets/images/darwin-happy.png';
	import darwinHiImg from '$lib/assets/images/darwin-think.png';
	import GreetWindow from '$lib/pages/darwin/GreetWindow.svelte';
	import DarwinWhoWindow from '$lib/pages/darwin/WhoWindow.svelte';
	import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';

	type DesktopApp = {
		id: string;
		icon: string;
		title: string;
		x: number;
		y: number;
		windowTitle: string;
		windowWidth?: string;
		windowHeight?: string;
		initiallyOpen?: boolean;
		WindowContent: Component;
	};

	const defaultWindowStyle = {
		borderRadius: '0.5rem',
		borderColor: '#2f2f2f',
		borderWidth: '2px',
		statusbarColor: '#f2d3dd',
		statusbarSeparatorColor: '#2f2f2f',
		statusbarSeparatorWidth: '2px',
		contentPadding: '1rem'
	};

	const desktopApps: DesktopApp[] = [
		{
			id: 'who',
			icon: darwinWhoImg,
			title: 'Darwin?',
			x: 5,
			y: 90,
			windowTitle: 'Who is Darwin?',
			windowWidth: '400px',
      windowHeight: '300px',
			WindowContent: DarwinWhoWindow
		},
		{
			id: 'gallery',
			icon: darwinGalleryImg,
			title: 'Gallery',
			x: 5,
			y: 175,
			windowTitle: 'Gallery',
			windowWidth: '650px',
      windowHeight: '500px',
			WindowContent: GalleryWindow
		},
		{
			id: 'greet',
			icon: darwinHiImg,
			title: 'Greetings',
			x: 5,
			y: 5,
			initiallyOpen: true,
			windowTitle: 'Bienvenue!',
			windowWidth: '400px',
			windowHeight: '300px',
			WindowContent: GreetWindow
		}
	];
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
		windowStyle={defaultWindowStyle}
		initiallyOpen={app.initiallyOpen}
	>
		<WindowContent />
	</Desktop>
{/each}
