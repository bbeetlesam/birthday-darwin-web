import type { DesktopApp } from '$lib/types';
import darwinGalleryImg from '$lib/assets/images/darwin-curious.png';
import darwinWhoImg from '$lib/assets/images/darwin-happy.png';
import darwinHiImg from '$lib/assets/images/darwin-think.png';
import GreetWindow from '$lib/pages/darwin/GreetWindow.svelte';
import DarwinWhoWindow from '$lib/pages/darwin/WhoWindow.svelte';
import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';

export const desktopApps: DesktopApp[] = [
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
		windowWidth: '600px',
		windowHeight: '500px',
    WindowContent: GalleryWindow,
    windowStyle: {
      contentBackgroundColor: '#f3f3f3'
    }
	},
	{
		id: 'greet',
		icon: darwinHiImg,
		title: 'Greetings',
		x: 5,
		y: 5,
		initiallyOpen: true,
		windowTitle: 'Bienvenue!',
		windowWidth: '420px',
		windowHeight: '330px',
		windowStyle: {
			contentBackgroundColor: '#d9ecff',
			contentPadding: '0rem'
		},
		WindowContent: GreetWindow
	}
];
