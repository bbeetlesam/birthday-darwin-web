<script lang="ts">
	type Props = {
		title?: string;
		initialX?: number;
		initialY?: number;
		width?: string;
		height?: string;
		children?: import('svelte').Snippet;
	};

	let {
		title = 'Window',
		initialX,
		initialY,
		width = '320px',
		height = '240px',
		children
	}: Props = $props();

	let windowElement: HTMLElement;
	let x = $state(0);
	let y = $state(0);
	let isDragging = $state(false);
	let dragOffsetX = 0;
	let dragOffsetY = 0;
	let hasSetInitialPosition = $state(false);

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
	class="fixed left-0 top-0 z-10 flex flex-col overflow-hidden rounded-xl border-2 border-[#2f2f2f] bg-white shadow-[0_1.25rem_3rem_rgb(0_0_0/0.18)]"
	style={`translate: ${x}px ${y}px; width: ${width}; height: ${height}; visibility: ${hasSetInitialPosition ? 'visible' : 'hidden'};`}
>
	<button
		type="button"
		class={`flex min-h-9 touch-none select-none items-center border-0 border-b-2 border-[#2f2f2f] bg-[#f2d3dd] px-3.5 text-left font-bold text-[#2f2f2f] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
		onpointerdown={startDragging}
		onpointermove={drag}
		onpointerup={stopDragging}
		onpointercancel={stopDragging}
		aria-label={`Move ${title}`}
	>
		<span>{title}</span>
	</button>

	<div class="flex-1 overflow-hidden p-4">
		{@render children?.()}
	</div>
</section>
