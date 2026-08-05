<script lang="ts">
	type Props = {
		image: string;
		backgroundColor?: string;
		size?: string;
		opacity?: number;
		angle?: string;
		speed?: string;
		distance?: string;
	};

	let {
		image,
		backgroundColor = '#FDFBF7',
		size = '48px',
		opacity = 0.12,
		angle = '-20deg',
		speed = '18s',
		distance = '280px'
	}: Props = $props();

	const backgroundStyle = $derived(`background-color: ${backgroundColor};`);

	const patternStyle = $derived(`
		--pattern-speed: ${speed};
		--pattern-distance: ${distance};
		background-image: url("${image}");
		background-size: ${size} ${size};
		transform: rotate(${angle});
		opacity: ${opacity};
	`);
</script>

<div
	class="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
	style={backgroundStyle}
	aria-hidden="true"
>
	<div class="moving-pattern absolute inset-[-50%] bg-repeat" style={patternStyle}></div>
</div>

<style>
	.moving-pattern {
		animation: move-diagonal var(--pattern-speed) linear infinite;
	}

	@keyframes move-diagonal {
		from {
			background-position: 0 0;
		}

		to {
			background-position: var(--pattern-distance) calc(var(--pattern-distance) * -1);
		}
	}
</style>
