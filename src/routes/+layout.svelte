<script lang="ts">
	import './layout.css';
	import Boot from '$lib/components/Boot.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Rahasia Y.</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<Boot>
	{@render children()}
</Boot>
