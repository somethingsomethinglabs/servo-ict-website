<script lang="ts">
	let { baseUrl = '/', compact = false }: { baseUrl?: string; compact?: boolean } = $props();
	const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;
</script>

<section id="work-example" class="work-example" class:compact aria-labelledby="work-example-title">
	<figure>
		<div class="project-preview">
			<img src={sitePath('/images/work/12grapes-website.jpg')} alt="12Grapes website with vineyard services and a ground-management estimator." width="1425" height="891" loading={compact ? 'eager' : 'lazy'} />
		</div>
		<figcaption>Website design & development <span>Built with Astro</span></figcaption>
	</figure>
	<div class="example-copy">
		<p class="example-kicker">Selected work / Gippsland</p>
		<h2 id="work-example-title">12Grapes Vineyard Services</h2>
		{#if !compact}
		<p class="example-intro">Year-round vineyard services. A practical cost estimator. A clearer starting point for grower enquiries.</p>
		<details>
			<summary>Inside the project</summary>
			<dl>
				<div><dt>The business need</dt><dd>Help Gippsland growers understand the services available and prepare a useful conversation about their vineyard.</dd></div>
				<div><dt>What was built</dt><dd>A service website with an interactive estimator. Growers choose their vineyard area and the work required to see an indicative planning range.</dd></div>
				<div><dt>The next step</dt><dd>The estimate explains the factors that can change the price and directs growers to confirm the job with the operator.</dd></div>
			</dl>
		</details>
		{/if}
		<a class="project-link" href={compact ? sitePath('/websites/#work-example') : 'https://somethingsomethinglabs.com/website-12Grapes/'}>{compact ? 'Explore the project' : 'View the 12Grapes website'} <span aria-hidden="true">↗</span></a>
	</div>
</section>

<style>
	.work-example { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, .75fr); align-items: center; gap: clamp(2rem, 4vw, 4rem); width: 100%; margin-inline: auto; padding: clamp(2rem, 4vw, 3.5rem); background: #dedcf6; color: #10103f; }
	.work-example.compact { display: flex; flex-direction: column; align-items: stretch; gap: 1.75rem; padding: clamp(1.25rem, 2.4vw, 2.25rem); border: 2px solid #10103f; border-radius: 0.2rem; background: #5c5ce0; color: #fff; box-shadow: 8px 8px 0 #10103f; }
	.example-kicker { margin: 0 0 1rem; color: #4a4ab9; font-size: .7rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
	h2 { margin: 0; color: #10103f; font-size: clamp(2rem, 3.8vw, 3.4rem); line-height: 1.08; letter-spacing: -.045em; }
	.compact .example-kicker { margin-bottom: 0.75rem; color: #fff; }
	.compact h2 { max-width: 16ch; color: #fff; font-size: clamp(1.6rem, 2.6vw, 2.5rem); }
	.example-intro { margin: 1.25rem 0; color: #45455c; line-height: 1.7; }
	details { margin: 1.5rem 0; border-block: 1px solid #b9b7d1; }
	summary { padding-block: 1rem; cursor: pointer; font-size: .9rem; font-weight: 750; }
	dl { margin: 0 0 1rem; }
	dl > div { padding-block: .65rem; }
	dt { font-weight: 750; font-size: .85rem; }
	dd { margin: .35rem 0 0; color: #45455c; font-size: .9rem; line-height: 1.65; }
	.project-link { display: inline-flex; align-items: center; gap: 1.5rem; min-height: 2.75rem; margin-top: .75rem; color: #10105a; font-size: .85rem; font-weight: 750; text-underline-offset: .25em; }
	.compact .project-link { color: #fff; text-decoration-thickness: 2px; }
	.compact .project-link:hover { text-underline-offset: 0.4em; }
	.compact .project-link:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }
	figure { min-width: 0; margin: 0; }
	.project-preview { display: block; box-shadow: .7rem .7rem 0 #c1bde7; }
	.compact .project-preview { box-shadow: 4px 4px 0 #10103f; }
	img { display: block; width: 100%; height: auto; border: 1px solid #aaa6cb; }
	.compact img { border: 2px solid #10103f; }
	figcaption { display: flex; flex-wrap: wrap; justify-content: space-between; gap: .25rem 1rem; margin-top: 1.5rem; color: #45455c; font-size: .7rem; line-height: 1.5; }
	.compact figcaption { margin-top: 1rem; color: #fff; }
	@media (min-width: 621px) and (max-width: 900px) { .work-example.compact { display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); align-items: center; } }
	@media (max-width: 760px) { .work-example { grid-template-columns: 1fr; } .work-example:not(.compact) figure { grid-row: 1; } }
</style>
