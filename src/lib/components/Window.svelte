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
		children?: import('svelte').Snippet;
	};

	let {
		title = 'Window',
		initialX,
		initialY,
		width = '320px',
		height = '260px',
		style = {},
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

	const contentStyle = $derived(`padding: ${windowStyle.contentPadding};`);

	$effect(() => {
		if (hasSetInitialPosition || !windowElement) return;

		const { width: windowWidth, height: windowHeight } = windowElement.getBoundingClientRect();

		x = initialX ?? (globalThis.innerWidth - windowWidth) / 2;
		y = initialY ?? (globalThis.innerHeight - windowHeight) / 2;
		hasSetInitialPosition = true;
	});

	function startDragging(event: PointerEvent) {
		isDragging = true;
		dragOffsetX = event.clientX - x;
		dragOffsetY = event.clientY - y;

		const target = event.currentTarget as HTMLElement;
		target.setPointerCapture(event.pointerId);
	}

	function drag(event: PointerEvent) {
		if (!isDragging) return;

		x = event.clientX - dragOffsetX;
		y = event.clientY - dragOffsetY;
	}

	function stopDragging(event: PointerEvent) {
		isDragging = false;

		const target = event.currentTarget as HTMLElement;
		if (target.hasPointerCapture(event.pointerId)) {
			target.releasePointerCapture(event.pointerId);
		}
	}
</script>

<section
	bind:this={windowElement}
	class="fixed top-0 left-0 z-10 flex flex-col overflow-hidden border-solid bg-white"
	style={frameStyle}
>
	<button
		type="button"
		class={`flex min-h-9 touch-none items-center border-0 border-solid px-3.5 text-left font-bold text-[#2f2f2f] select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
		style={statusbarStyle}
		onpointerdown={startDragging}
		onpointermove={drag}
		onpointerup={stopDragging}
		onpointercancel={stopDragging}
		aria-label={`Move ${title}`}
	>
		<span>{title}</span>
	</button>

	<div class="flex-1 overflow-hidden" style={contentStyle}>
		{@render children?.()}
	</div>
</section>
