<script lang="ts">
	import Window from '$lib/components/Window.svelte';

	type WindowStyle = {
		borderRadius?: string;
		borderColor?: string;
		borderWidth?: string;
		statusbarColor?: string;
		statusbarSeparatorColor?: string;
		statusbarSeparatorWidth?: string;
		contentPadding?: string;
		boxShadow?: string;
	};

	type Props = {
		icon: string;
		title: string;
		x?: number;
		y?: number;
		windowTitle?: string;
		windowWidth?: string;
		windowHeight?: string;
		windowInitialX?: number;
		windowInitialY?: number;
		windowStyle?: WindowStyle;
		windowShowCloseButton?: boolean;
		initiallyOpen?: boolean;
		children?: import('svelte').Snippet;
	};

	let {
		icon,
		title,
		x = 0,
		y = 0,
		windowTitle = title,
		windowWidth = '360px',
		windowHeight = '260px',
		windowInitialX,
		windowInitialY,
		windowStyle = {},
		windowShowCloseButton = true,
		initiallyOpen = false,
		children
	}: Props = $props();

	const SELECT_SHORTCUT_EVENT = 'desktop-shortcut-select';

	let shortcutElement: HTMLButtonElement;
	let isOpen = $state(false);
	let isSelected = $state(false);
	let hasSetInitialOpen = false;

	const shortcutStyle = $derived(`translate: ${x}px ${y}px;`);

	function clearSelection() {
		isSelected = false;
	}

	function selectShortcut(event: MouseEvent) {
		event.stopPropagation();
		window.dispatchEvent(
			new CustomEvent(SELECT_SHORTCUT_EVENT, {
				detail: shortcutElement
			})
		);
		isSelected = true;
	}

	function handleShortcutSelect(event: Event) {
		const selectedShortcut = (event as CustomEvent<HTMLButtonElement>).detail;
		isSelected = selectedShortcut === shortcutElement;
	}

	function openWindow(event: MouseEvent) {
		event.stopPropagation();
		isOpen = true;
		isSelected = true;
	}

	function closeWindow() {
		isOpen = false;
	}

	$effect(() => {
		if (hasSetInitialOpen) return;

		isOpen = initiallyOpen;
		hasSetInitialOpen = true;
	});

	$effect(() => {
		window.addEventListener(SELECT_SHORTCUT_EVENT, handleShortcutSelect);

		return () => {
			window.removeEventListener(SELECT_SHORTCUT_EVENT, handleShortcutSelect);
		};
	});
</script>

<svelte:window onclick={clearSelection} />

<button
	bind:this={shortcutElement}
	type="button"
	class={`fixed top-0 left-0 flex h-20 w-20 flex-col items-center gap-2 rounded-xs px-0 py-0 text-center outline-2 outline-offset-2 select-none ${isSelected ? 'outline outline-sky-300/80' : 'outline-none'}`}
	style={shortcutStyle}
	onclick={selectShortcut}
	ondblclick={openWindow}
	aria-label={`Open ${title}`}
>
	<img
		src={icon}
		alt=""
		class="h-14 w-14 object-contain drop-shadow-[0_0.35rem_0.25rem_rgb(0_0_0/0.22)]"
	/>
	<span class="-mt-1 w-full rounded px-1 text-sm leading-none wrap-break-word text-black">
		{title}
	</span>
</button>

{#if isOpen}
	<Window
		title={windowTitle}
		initialX={windowInitialX}
		initialY={windowInitialY}
		width={windowWidth}
		height={windowHeight}
		style={windowStyle}
		showCloseButton={windowShowCloseButton}
		onClose={closeWindow}
	>
		{@render children?.()}
	</Window>
{/if}
