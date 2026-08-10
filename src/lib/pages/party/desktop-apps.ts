import type { DesktopApp } from '$lib/types';
import darwinGalleryImg from '$lib/assets/images/darwin-curious.png';
import darwinMusicImg from '$lib/assets/images/darwin-listening.png';
import darwinWishImg from '$lib/assets/images/darwin-mesmerised.png';
import DevNotesWindow from '$lib/pages/party/DevNotes.svelte';
import PlaylistWindow from '$lib/pages/party/Playlist.svelte';
import GalleryWindow from '$lib/pages/darwin/GalleryWindow.svelte';
import butterflyImg from '$lib/assets/images/butterfly.png';

export const desktopApps: DesktopApp[] = [
	{
		id: 'greet',
		icon: darwinWishImg,
		title: 'Wish',
		x: 5,
		y: 5,
		initiallyOpen: true,
		windowTitle: 'Make A Wish!',
		windowWidth: '420px',
		windowHeight: '330px',
		windowStyle: {
			contentBackgroundColor: '#d9ecff',
			contentPadding: '0rem'
		},
		WindowContent: DevNotesWindow
	},
	{
		id: 'music',
		icon: darwinMusicImg,
		title: 'Playlist',
		x: 5,
		y: 90,
		windowTitle: 'Steal These Tracks!',
		windowWidth: '470px',
		windowHeight: '550px',
		WindowContent: PlaylistWindow,
		windowStyle: {
			contentBackgroundColor: '#f3f3f3'
			// contentPadding: '0rem',
		}
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
		id: 'notes',
		icon: butterflyImg,
		title: 'notes',
		x: 5,
		y: 260,
		initiallyOpen: true,
		windowTitle: 'Liner Notes',
		windowWidth: '415px',
		windowHeight: '320px',
		windowStyle: {
			contentBackgroundColor: '#d9ecff'
		},
		WindowContent: DevNotesWindow
	}
];

// export const rsvpDesktopApp: DesktopApp = {
// 	id: 'rsvp',
// 	icon: darwinPartyImg,
// 	title: "Let's Join",
// 	x: 5,
// 	y: 260,
// 	windowTitle: 'Prepare to Join!',
// 	windowWidth: '420px',
// 	windowHeight: '310px',
// 	windowShowCloseButton: false,
// 	WindowContent: RSVPWindow,
// 	windowStyle: {
// 		contentBackgroundColor: '#f5f5f5'
// 	}
// };
