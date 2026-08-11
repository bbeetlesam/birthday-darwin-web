<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		children?: import('svelte').Snippet;
	};

	let { children }: Props = $props();

	const imageModules = import.meta.glob('../assets/images/**/*', {
		eager: true,
		import: 'default'
	});
	const fontModules = import.meta.glob('../assets/fonts/**/*', {
		eager: true,
		import: 'default'
	});

	const imageUrls = Object.values(imageModules) as string[];
	const fontUrls = Object.values(fontModules) as string[];
	const otherUrls: string[] = [];

	let ready = $state(false);
	let loaded = $state(0);
	let total = $state(0);
	let error = $state<string | null>(null);

	function preloadImage(src: string) {
		return new Promise<void>((resolve, reject) => {
			const img = new Image();
			img.onload = () => resolve();
			img.onerror = () => reject(new Error(`Failed image: ${src}`));
			img.src = src;
		});
	}

	async function preloadFont(src: string) {
		const res = await fetch(src, { cache: 'force-cache' });
		if (!res.ok) throw new Error(`Failed font: ${src}`);
	}

	async function preloadAll() {
		const tasks: Array<() => Promise<void>> = [
			...imageUrls.map((src) => () => preloadImage(src)),
			...fontUrls.map((src) => () => preloadFont(src)),
			...otherUrls.map((url) => async () => {
				const res = await fetch(url, { cache: 'force-cache' });
				if (!res.ok) throw new Error(`Failed fetch: ${url}`);
			})
		];

		total = tasks.length;
		loaded = 0;

		for (const task of tasks) {
			await task();
			loaded += 1;
		}
	}

	onMount(async () => {
		try {
			await preloadAll();
			ready = true;
		} catch (e) {
			error = e instanceof Error ? e.message : 'Preload failed';
		}
	});
</script>

{#if !ready}
	<div class="fixed inset-0 grid place-items-center bg-[#FDFBF7] text-[#2f2f2f]">
		<div class="w-80">
			<div class="flex justify-between">
				<p class="mb-2 text-sm font-bold">Wait a minute, love…</p>
				<p class="mb-2 text-sm font-bold">{loaded}/{total}</p>
			</div>
			<div class="h-3 overflow-hidden rounded border-2 border-[#2f2f2f] bg-white">
				<div
					class="h-full bg-[#f2d3dd] transition-all"
					style={`width: ${total ? (loaded / total) * 100 : 0}%`}
				></div>
			</div>
			{#if error}
				<p class="mt-2 text-xs text-red-700">{error}</p>
			{/if}
		</div>
	</div>
{:else}
	{@render children?.()}
{/if}
