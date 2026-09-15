<script lang="ts">
	import Icon from './Icon.svelte';
	let { baseUrl = '/', compact = false }: { baseUrl?: string; compact?: boolean } = $props();
	const sitePath = (path: string) => baseUrl + path.replace(/^\//, '');
</script>

<section id="work-example" class="work-example" class:compact aria-labelledby="work-example-title">
	<div class="example-copy">
		<p class="example-kicker">Client work / Gippsland</p>
		<h2 id="work-example-title">{compact ? 'A local business, ready to be found.' : '12Grapes Vineyard Services'}</h2>
		{#if !compact}
			<p class="example-intro">A clearer service website and a simple estimator help growers prepare a useful enquiry before making contact.</p>
			<details>
				<summary>Inside the project</summary>
				<dl>
					<div><dt>The business need</dt><dd>Help Gippsland growers understand the services available and prepare a useful conversation about their vineyard.</dd></div>
					<div><dt>What was built</dt><dd>A service website with an interactive estimator. Growers choose their vineyard area and the work required to see an indicative planning range.</dd></div>
					<div><dt>The next step</dt><dd>The estimate explains the factors that can change the price and directs growers to confirm the job with the operator.</dd></div>
				</dl>
			</details>
		{/if}
		<a class="project-link" href={compact ? sitePath('/work/12grapes/') : 'https://somethingsomethinglabs.com/website-12Grapes/'}>{compact ? 'See what was built' : 'View the 12Grapes website'} <Icon name={compact ? 'arrowRight' : 'arrowUpRight'} size={22} /></a>
	</div>
	<figure>
		<div class="project-preview">
			<img src={sitePath('/images/work/12grapes-website.jpg')} alt="12Grapes website showing vineyard services and a ground-management cost estimator." width="1425" height="891" loading="lazy" />
		</div>
		<figcaption><strong>12Grapes Vineyard Services</strong><span>Website and cost estimator</span>{#if compact}<p>Services explained clearly, with an estimator to help growers start an enquiry.</p>{/if}</figcaption>
	</figure>
</section>

<style>
	.work-example { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); align-items: center; gap: clamp(2rem, 5vw, 5rem); width: 100%; margin-inline: auto; padding: clamp(2rem, 4vw, 3.5rem); background: var(--mint, #c5eddc); color: var(--ink, #242126); }
	.work-example.compact { grid-template-columns: minmax(0, .9fr) minmax(0, 1.15fr); gap: 3rem; padding: 0; background: none; }
	.example-kicker { margin: 0 0 1rem; font-size: .8rem; font-weight: 850; letter-spacing: .12em; text-transform: uppercase; }
	h2 { max-width: 15ch; margin: 0; font-size: clamp(2.2rem, 3.9vw, 3.8rem); font-weight: 820; line-height: 1.04; letter-spacing: -.06em; }
	.example-intro { max-width: 31rem; margin: 1.3rem 0; font-size: 1.2rem; line-height: 1.6; }
	details { margin: 1.5rem 0; border-block: 1px solid #86b9a3; }
	summary { padding-block: 1rem; cursor: pointer; font-size: .9rem; font-weight: 750; }
	dl { margin: 0 0 1rem; }
	dl > div { padding-block: .65rem; }
	dt { font-weight: 750; font-size: .85rem; }
	dd { margin: .35rem 0 0; font-size: .9rem; line-height: 1.65; }
	.project-link { display: inline-flex; align-items: center; gap: 1.5rem; min-height: 48px; margin-top: .4rem; font-size: 1rem; font-weight: 800; text-decoration-thickness: 2px; text-underline-offset: .3em; }
	.project-link:hover { text-underline-offset: .45em; }
	.project-link:focus-visible { outline: 3px solid var(--ink, #242126); outline-offset: 4px; }
	figure { min-width: 0; margin: 0; }
	.project-preview { border: 2px solid var(--ink, #242126); border-radius: 3px; box-shadow: 8px 8px 0 var(--ink, #242126); background: var(--white, #fffdfa); overflow: hidden; }
	img { display: block; width: 100%; height: auto; }
	.compact h2 { font-size: clamp(1.9rem, 3.25vw, 3rem); }
	.compact figure { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .95fr); align-items: center; gap: 2rem; }
	.compact .project-preview { border-top: 8px solid var(--ink, #242126); box-shadow: 6px 6px 0 var(--ink, #242126); }
	.compact img { aspect-ratio: 1.6; object-fit: cover; object-position: top; }
	figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .25rem 1rem; margin-top: 1.2rem; font-size: .875rem; line-height: 1.5; }
	.compact figcaption { display: block; margin: 0; font-size: .95rem; }
	.compact figcaption strong { display: block; font-size: 1.4rem; font-weight: 800; line-height: 1.15; letter-spacing: -.04em; }
	.compact figcaption span { display: block; margin-top: .65rem; }
	.compact figcaption p { margin: .65rem 0 0; font-size: .9rem; line-height: 1.5; }
	@media (min-width: 761px) and (max-width: 1050px) {
		.work-example.compact { gap: 2rem; }
		.compact figure { grid-template-columns: 1fr; gap: 1rem; }
		.compact .project-preview { max-width: 19rem; }
		.compact figcaption strong { font-size: 1.2rem; }
	}
	@media (max-width: 760px) {
		.work-example, .work-example.compact { grid-template-columns: 1fr; gap: 1.8rem; }
		.work-example:not(.compact) { padding: 1.5rem; }
		h2 { font-size: clamp(2.3rem, 8.5vw, 3.4rem); }
		.example-intro { font-size: 1rem; }
		.project-preview { box-shadow: 5px 5px 0 var(--ink, #242126); }
		figcaption { font-size: .875rem; line-height: 1.6; }
		.compact figure { grid-template-columns: 1fr; gap: 1.25rem; }
		.compact h2 { max-width: 16ch; font-size: clamp(2.1rem, 8vw, 3rem); }
		.compact figcaption p { font-size: 1rem; }
	}
</style>
