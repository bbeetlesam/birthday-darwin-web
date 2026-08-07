<script lang="ts">
	import darwinImg from '$lib/assets/images/darwin-hat.png';
	import circleImg from '$lib/assets/images/roughcircleblue.png';
</script>

<div class="relative h-full overflow-hidden">
	<div class="relative z-10 flex h-full min-h-0 flex-col gap-0 p-6">
		<!-- header title -->
		<h1 class="shrink-0 text-center text-3xl font-extrabold text-[#5E5F7D]">
			All Things Must Pass!
		</h1>

		<!-- image and texts -->
		<div class="flex min-h-0 flex-1 items-center gap-4">
			<!-- image -->
			<div class="relative w-36 shrink-0">
				<div
					class="absolute top-1/2 left-1/2 z-0 grid w-42 -translate-x-1/2 -translate-y-1/2 place-items-center"
				>
					<img
						src={circleImg}
						alt=""
						class="rotating-bg pointer-events-none h-full w-full object-contain"
						aria-hidden="true"
					/>
				</div>

				<img src={darwinImg} alt="Darwin" class="relative z-10 max-h-full w-36 object-contain" />
			</div>

			<!-- texts -->
			<div class="relative z-10 space-y-2 text-left">
				<p>Welcome back my friends to the show that never ends!</p>
				<p>
					For while you're here, enjoy the trip while it
					<span class="text-xl font-bold text-[#200a2d]">blasts!</span>
				</p>
			</div>
		</div>

		<!-- buttons -->
		<div class="z-10 flex shrink-0 justify-center gap-6">
			<button
				type="button"
				class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 hover:bg-amber-200"
			>
				Try to see Darwin?
			</button>
			<button
				type="button"
				class="cursor-pointer rounded-lg border-2 bg-amber-100 px-3 py-1 hover:bg-amber-200"
			>
				Try to know Darwin?
			</button>
		</div>
	</div>
</div>

<style>
	.rotating-bg {
		animation: rotate-bg 60s linear infinite;
	}

	@keyframes rotate-bg {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}
</style>
