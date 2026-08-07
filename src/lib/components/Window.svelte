<script lang="ts">
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
		title?: string;
		initialX?: number;
		initialY?: number;
		width?: string;
		height?: string;
		style?: WindowStyle;
		showCloseButton?: boolean;
		onClose?: () => void;
		children?: import('svelte').Snippet;
	};

	let {
		title = 'Window',
		initialX,
		initialY,
		width = '320px',
		height = '260px',
		style = {},
		showCloseButton = false,
		onClose,
		children
	}: Props = $props();

	const windowStyle = $derived({
		borderRadius: style.borderRadius ?? '0.75rem',
		borderColor: style.borderColor ?? '#2f2f2f',
		borderWidth: style.borderWidth ?? '2px',
		statusbarColor: style.statusbarColor ?? '#f2d3dd',
		statusbarSeparatorColor: style.statusbarSeparatorColor ?? style.borderColor ?? '#2f2f2f',
		statusbarSeparatorWidth: style.statusbarSeparatorWidth ?? style.borderWidth ?? '2px',
		contentPadding: style.contentPadding ?? '1rem',
		boxShadow: style.boxShadow ?? '0 1.25rem 3rem rgb(0 0 0 / 0.2)'
	});

	let windowElement: HTMLElement;
	let x = $state(0);
	let y = $state(0);
	let isDragging = $state(false);
	let dragOffsetX = 0;
	let dragOffsetY = 0;
	let hasSetInitialPosition = $state(false);

	const frameStyle = $derived(`
		translate: ${x}px ${y}px;
		width: ${width};
		height: ${height};
		visibility: ${hasSetInitialPosition ? 'visible' : 'hidden'};
		border-color: ${windowStyle.borderColor};
		border-width: ${windowStyle.borderWidth};
		border-radius: ${windowStyle.borderRadius};
		box-shadow: ${windowStyle.boxShadow};
	`);

	const statusbarStyle = $derived(`
		background-color: ${windowStyle.statusbarColor};
		border-bottom-color: ${windowStyle.statusbarSeparatorColor};
		border-bottom-width: ${windowStyle.statusbarSeparatorWidth};
	`);

	const closeButtonStyle = $derived(`
		border-color: ${windowStyle.borderColor};
		border-width: ${windowStyle.borderWidth};
	`);

	const contentStyle = $derived(`padding: ${windowStyle.contentPadding};`);

	$effect(() => {
		if (hasSetInitialPosition || !windowElement) return;

		const { width: windowWidth, height: windowHeight } = windowElement.getBoundingClientRect();
		const centeredX = (globalThis.innerWidth - windowWidth) / 2;
		const centeredY = (globalThis.innerHeight - windowHeight) / 2;
		const clampedPosition = clampPosition(initialX ?? centeredX, initialY ?? centeredY);

		x = clampedPosition.x;
		y = clampedPosition.y;
		hasSetInitialPosition = true;
	});

	function clamp(value: number, min: number, max: number) {
		return Math.min(Math.max(value, min), max);
	}

	function clampPosition(nextX: number, nextY: number) {
		const { width: windowWidth, height: windowHeight } = windowElement.getBoundingClientRect();
		const maxX = Math.max(globalThis.innerWidth - windowWidth, 0);
		const maxY = Math.max(globalThis.innerHeight - windowHeight, 0);

		return {
			x: clamp(nextX, 0, maxX),
			y: clamp(nextY, 0, maxY)
		};
	}

	function keepInsideViewport() {
		if (!windowElement) return;

		const clampedPosition = clampPosition(x, y);
		x = clampedPosition.x;
		y = clampedPosition.y;
	}

	function startDragging(event: PointerEvent) {
		isDragging = true;
		dragOffsetX = event.clientX - x;
		dragOffsetY = event.clientY - y;

		const target = event.currentTarget as HTMLElement;
		target.setPointerCapture(event.pointerId);
	}

	function drag(event: PointerEvent) {
		if (!isDragging) return;

		const clampedPosition = clampPosition(event.clientX - dragOffsetX, event.clientY - dragOffsetY);
		x = clampedPosition.x;
		y = clampedPosition.y;
	}

	function stopDragging(event: PointerEvent) {
		isDragging = false;

		const target = event.currentTarget as HTMLElement;
		if (target.hasPointerCapture(event.pointerId)) {
			target.releasePointerCapture(event.pointerId);
		}
	}

	function closeWindow(event: MouseEvent) {
		event.stopPropagation();
		onClose?.();
	}
</script>

<svelte:window onresize={keepInsideViewport} />

<section
	bind:this={windowElement}
	class="fixed top-0 left-0 z-10 flex flex-col overflow-hidden border-solid bg-white"
	style={frameStyle}
>
	<header class="flex min-h-9 items-center border-0 border-solid text-[#2f2f2f]" style={statusbarStyle}>
		<button
			type="button"
			class={`flex min-h-9 flex-1 touch-none items-center px-3.5 text-left font-bold select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
			onpointerdown={startDragging}
			onpointermove={drag}
			onpointerup={stopDragging}
			onpointercancel={stopDragging}
			aria-label={`Move ${title}`}
		>
			<span>{title}</span>
		</button>

		{#if showCloseButton}
			<button
				type="button"
				class="mr-[0.3rem] flex h-6 w-6 cursor-pointer rounded items-center justify-center border-solid bg-red-400 text-sm leading-none font-bold hover:bg-red-600"
				style={closeButtonStyle}
				onclick={closeWindow}
				aria-label={`Close ${title}`}
			>
			<span class="translate-x-[0.1px] translate-y-[0.3px]">
					X
			</span>
			</button>
		{/if}
	</header>

	<div class="flex-1 overflow-hidden" style={contentStyle}>
		{@render children?.()}
	</div>
</section>
