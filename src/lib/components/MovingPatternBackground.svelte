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

	const patternStyle = $derived(`
		--pattern-image: url("${image}");
		--pattern-background-color: ${backgroundColor};
		--pattern-size: ${size};
		--pattern-opacity: ${opacity};
		--pattern-angle: ${angle};
		--pattern-speed: ${speed};
		--pattern-distance: ${distance};
	`);
</script>

<div class="pattern-background" style={patternStyle} aria-hidden="true">
	<div class="moving-pattern"></div>
</div>

<style>
	.pattern-background {
		pointer-events: none;
		position: fixed;
		inset: 0;
		z-index: -10;
		overflow: hidden;
		background-color: var(--pattern-background-color);
	}

	.moving-pattern {
		position: absolute;
		inset: -50%;
		background-image: var(--pattern-image);
		background-repeat: repeat;
		background-size: var(--pattern-size) var(--pattern-size);
		transform: rotate(var(--pattern-angle));
		opacity: var(--pattern-opacity);
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
