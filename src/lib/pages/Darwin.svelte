<script lang="ts">
	import Window from '$lib/components/Window.svelte';
</script>

<Window
	title="Who is Darwin?"
	initialX={window.innerWidth / 2 - 200}
	initialY={window.innerHeight / 2 - 150}
	width="400px"
	height="300px"
	style={{
		borderRadius: '0.5rem',
		borderColor: '#2f2f2f',
		borderWidth: '2px',
		statusbarColor: '#f2d3dd',
		statusbarSeparatorColor: '#2f2f2f',
		statusbarSeparatorWidth: '2px',
		contentPadding: '1rem'
	}}
>
	<p>just a placeholder window</p>
</Window>
