import type { Component } from 'svelte';
import type { WindowStyle } from '$lib/types/window';

export type DesktopApp = {
	id: string;
	icon: string;
	title: string;
	x: number;
	y: number;
	windowTitle: string;
	windowWidth?: string;
	windowHeight?: string;
	initiallyOpen?: boolean;
	windowShowCloseButton?: boolean;
	windowStyle?: WindowStyle;
	WindowContent: Component;
};
