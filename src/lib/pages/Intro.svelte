<script lang="ts">
	import darwinShutImg from '$lib/assets/images/darwin-smileshut.png';
	import Window from '$lib/components/Window.svelte';
</script>

<Window
	title="hello-darwin.exe"
	width="360px"
	height="360px"
	style={{
		borderRadius: '0.5rem',
		borderColor: '#2f2f2f',
		borderWidth: '2px',
		statusbarColor: '#f2d3dd',
		statusbarSeparatorColor: '#2f2f2f',
		statusbarSeparatorWidth: '2px',
		contentPadding: '0rem'
	}}
>
	<div class="flex h-full w-full items-center justify-center">
		<img src={darwinShutImg} alt="Darwin" class="h-full w-full object-cover" />
	</div>
</Window>
