<script lang="ts">
	import arrowRight from '@phosphor-icons/core/assets/regular/arrow-right.svg?raw';
	import arrowUpRight from '@phosphor-icons/core/assets/regular/arrow-up-right.svg?raw';
	import envelope from '@phosphor-icons/core/assets/regular/envelope.svg?raw';
	import gear from '@phosphor-icons/core/assets/regular/gear.svg?raw';
	import plus from '@phosphor-icons/core/assets/regular/plus.svg?raw';
	import search from '@phosphor-icons/core/assets/regular/magnifying-glass.svg?raw';
	import user from '@phosphor-icons/core/assets/regular/user-circle.svg?raw';
	import list from '@phosphor-icons/core/assets/regular/list.svg?raw';
	import close from '@phosphor-icons/core/assets/regular/x.svg?raw';

	const icons = { arrowRight, arrowUpRight, envelope, gear, plus, search, user, list, close };
	let { name, size = 24 }: { name: keyof typeof icons; size?: number } = $props();
</script>

<span class="icon" style:width={`${size}px`} style:height={`${size}px`} aria-hidden="true">
	{@html icons[name]}
</span>

<style>
	.icon { display: inline-flex; flex-shrink: 0; vertical-align: middle; }
	.icon :global(svg) { display: block; width: 100%; height: 100%; fill: currentColor; }
</style>
