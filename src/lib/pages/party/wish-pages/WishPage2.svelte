<script lang="ts">
	import { onMount } from 'svelte';
	import { cubicOut } from 'svelte/easing';
	import gumballSittingImg from '$lib/assets/images/gumball-sitting.png';
	import darwinLaughImg from '$lib/assets/images/darwin-laugh.png';
	import gumballGiveImg from '$lib/assets/images/gumball-give.png';
	import darwinMesmerisedImg from '$lib/assets/images/darwin-mesmerised.png';

	const TARGET_AGE = 20;
	const numberOptions = Array.from({ length: TARGET_AGE }, (_, index) => index + 1);
	const NUMBER_HEIGHT_REM = 3.5;
	const ANIMATION_DURATION_MS = 2000;

	let animatedValue = $state(1);

	onMount(() => {
		let frameId = 0;
		const startTime = performance.now();

		const animate = (now: number) => {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / ANIMATION_DURATION_MS, 1);
			const easedProgress = cubicOut(progress);

			animatedValue = 1 + (TARGET_AGE - 1) * easedProgress;

			if (progress < 1) {
				frameId = requestAnimationFrame(animate);
			}
		};

		frameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(frameId);
		};
	});
</script>

<div
	class="relative flex h-full min-h-0 flex-col items-center justify-center gap-1 overflow-hidden px-6 text-center"
>
	<div class="pointer-events-none absolute inset-0" aria-hidden="true">
		<div class="absolute -top-14 -left-8 h-45 w-45 rounded-full bg-[#c6e4ff]/85"></div>
		<div class="absolute top-16 right-14 h-36 w-36 rounded-full bg-[#f2d3dd]/75"></div>
		<div class="absolute top-10 right-82 h-12 w-12 rounded-full bg-[#f2d3dd]/75"></div>
		<div class="absolute top-52 right-70 h-14 w-14 rounded-full bg-[#c6e4ff]/85"></div>
		<div class="absolute bottom-12 left-16 h-24 w-24 rounded-full bg-[#fff0b8]/80"></div>
		<div class="absolute right-40 bottom-3 h-17 w-17 rounded-full bg-[#d9f7d6]"></div>
		<div class="absolute bottom-20 left-140 h-17 w-17 rounded-full bg-[#fff0b8]/80"></div>
	</div>

	<img
		src={gumballGiveImg}
		alt="Gumball giving"
		class="absolute right-5 bottom-1 z-10 h-36 w-auto scale-x-[-1] rotate-20 object-contain"
	/>
	<img
		src={gumballSittingImg}
		alt="Gumball sitting"
		class="absolute right-110 bottom-55 z-10 h-32 w-auto rotate-30 object-contain"
	/>
	<img
		src={darwinLaughImg}
		alt="Darwin laughing"
		class="absolute right-115 bottom-4 z-10 h-26 w-auto scale-x-[-1] -rotate-25 object-contain"
	/>
	<img
		src={darwinMesmerisedImg}
		alt="Darwin mesmerised"
		class="absolute right-8 bottom-55 z-10 h-30 w-auto scale-x-[1] -rotate-30 object-contain"
	/>

	<div class="z-10 flex flex-col items-center gap-4">
		<h2 class="text-5xl font-extrabold text-[#2f2f2f]">You are now</h2>

		<div class="flex items-center justify-center gap-3">
			<div
				class="h-14 overflow-hidden rounded-lg border-2 border-[#2f2f2f] px-3 py-[0.2rem] shadow-sm"
				aria-label={`Age ${Math.round(animatedValue)}`}
			>
				<div
					class="flex flex-col items-center"
					style={`transform: translateY(-${(animatedValue - 1) * NUMBER_HEIGHT_REM}rem); will-change: transform;`}
				>
					{#each numberOptions as value (value)}
						<div
							class="flex h-14 items-center justify-center text-4xl font-extrabold text-[#2f2f2f] tabular-nums"
						>
							{value}
						</div>
					{/each}
				</div>
			</div>

			<p class="text-2xl font-bold text-[#2f2f2f]">years old!</p>
		</div>
		<p class="w-[80%]">Maybe it is time for you to forget all the problems for a while!</p>
	</div>
	<p class="text-xs text-[#2f2f2f]/50">(and would think much more later)</p>
</div>
