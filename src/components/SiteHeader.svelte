<script lang="ts">
	import Icon from './Icon.svelte';
	let { baseUrl = '/', active = '' }: { baseUrl?: string; active?: string } = $props();
	let menuOpen = $state(false);
	let servicesOpen = $state(false);
	let menuButton: HTMLButtonElement;
	let serviceSummary: HTMLElement;
	const path = (value: string) => baseUrl + value.replace(/^\//, '');
	const close = () => { menuOpen = false; servicesOpen = false; };
	function onKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') return;
		if (servicesOpen) { servicesOpen = false; serviceSummary?.focus(); }
		else if (menuOpen) { menuOpen = false; menuButton?.focus(); }
	}
</script>
<svelte:window onkeydown={onKeydown} />
<header class="site-header">
	<a class="brand" href={baseUrl} aria-label="Servo ICT home"><img src={path('/images/servo-ict-logo.png')} alt="" width="44" height="44" /><span>Servo ICT</span></a>
	<button class="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="site-navigation" bind:this={menuButton} onclick={() => { menuOpen = !menuOpen; servicesOpen = false; }}><Icon name={menuOpen ? 'close' : 'list'} /></button>
	<nav id="site-navigation" class:open={menuOpen} aria-label="Main navigation">
		<a href={baseUrl} onclick={close}>Start a business</a>
		<details bind:open={servicesOpen}>
			<summary bind:this={serviceSummary} class:active={active === 'services'} onclick={(event) => { event.preventDefault(); servicesOpen = !servicesOpen; }}>Services</summary>
			<div class="service-menu"><a href={path('/websites/')} onclick={close}>Websites</a><a href={path('/business-it/')} onclick={close}>Business IT</a><a href={path('/security/')} onclick={close}>Security</a></div>
		</details>
		<a href={path('/work/12grapes/')} aria-current={active === 'work' ? 'page' : undefined} onclick={close}>Our work</a>
		<a href={path('/blog/')} aria-current={active === 'advice' ? 'page' : undefined} onclick={close}>Advice</a>
		<a class="header-cta" href={active === 'contact' ? '#consultation-form' : path('/contact/')} aria-current={active === 'contact' ? 'page' : undefined} onclick={close}>Get in touch</a>
	</nav>
</header>
<style>
	.site-header{width:100%;margin-inline:auto;display:flex;justify-content:space-between;align-items:center;gap:2rem;min-height:clamp(80px,7.2vw,104px);position:relative;z-index:10}
	.brand{display:inline-flex;align-items:center;gap:.75rem;font-weight:700;letter-spacing:-.04em;font-size:1.5rem;text-decoration:none;flex-shrink:0}.brand img{filter:grayscale(1) brightness(0) invert(.79);display:block}
	nav{display:flex;align-items:center;gap:clamp(1.25rem,2.5vw,2.5rem)}nav a,summary{display:flex;align-items:center;min-height:44px;font-size:1rem;font-weight:700;text-decoration:none;cursor:pointer}summary{display:list-item;align-content:center}.header-cta[aria-current='page']{border-color:var(--ink-muted);box-shadow:var(--button-pressed-shadow)}
	details{position:relative}.service-menu{position:absolute;top:calc(100% + .5rem);left:-1rem;width:14rem;padding:.7rem 1.2rem;border:1px solid var(--seam);background-color:var(--plastic);border-radius:8px;box-shadow:var(--panel-shadow)}.service-menu a{padding:.4rem 0}
	.header-cta{justify-content:center;padding:.7rem 1.5rem;}.menu-toggle{display:none}
	@media(max-width:960px){.site-header{flex-wrap:wrap;gap:0;min-height:88px;padding-block:1.25rem}.menu-toggle{display:inline-flex;align-items:center;justify-content:center;width:46px;height:46px;cursor:pointer}nav{display:none;width:100%;padding-top:1.25rem;margin-top:1.25rem;border-top:1px solid var(--line)}nav.open{display:grid;grid-template-columns:1fr 1fr;gap:1rem 1.5rem;align-items:start}.service-menu{position:static;width:100%;border:0;padding:.4rem 0;box-shadow:none;background:transparent}.header-cta{grid-column:1/-1;max-width:17rem}summary{min-height:44px}.brand{font-size:1.08rem}}
	@media(max-width:700px){.site-header{width:100%}}
</style>
