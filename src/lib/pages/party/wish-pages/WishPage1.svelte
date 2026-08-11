<script lang="ts">
	import unicornHamsterImg from '$lib/assets/images/unicorn-hamster.png';
	import gumballMesmerisedImg from '$lib/assets/images/gumball-mesmerised.png';
	import gumballAnimeImg from '$lib/assets/images/gumball-anime.png';
	import rainbowImg from '$lib/assets/images/rainbow.png';
</script>

<div
	class="relative flex h-full min-h-0 items-center justify-center overflow-hidden bg-[#d9ecff] p-4 text-center"
>
	<img
		src={rainbowImg}
		alt=""
		aria-hidden="true"
		class="object-fill pointer-events-none absolute top-10 h-[95%] w-full"
	/>

	<h2 class="absolute bottom-68 left-12 z-10 text-4xl font-extrabold text-[#2f2f2f]">Happiest</h2>
	<img
		src={gumballMesmerisedImg}
		alt="Mesmerised Gumball"
		class="absolute bottom-0 left-6 z-10 h-30 w-auto object-contain"
	/>

	<img
		src={unicornHamsterImg}
		alt="Unicorn hamster"
		class="relative z-10 h-90 w-auto object-contain"
	/>

	<img
		src={gumballAnimeImg}
		alt="Anime Gumball"
		class="absolute top-60 right-4 z-10 h-30 w-auto scale-x-[-1] object-contain"
	/>
	<h2 class="absolute right-12 bottom-68 z-10 text-4xl font-extrabold text-[#2f2f2f]">Birthday!</h2>
</div>
