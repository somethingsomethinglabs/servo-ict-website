<script lang="ts">
	let { baseUrl = '/', compact = false }: { baseUrl?: string; compact?: boolean } = $props();
	const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;
</script>

<section id="work-example" class="work-example" class:compact aria-labelledby="work-example-title">
	<div class="example-copy">
		<p class="example-kicker">Selected work</p>
		<h2 id="work-example-title">12Grapes Vineyard Services</h2>
		<p class="example-intro">A website that explains year-round vineyard services and helps growers estimate ground-management costs before making an enquiry.</p>
		{#if !compact}
		<dl>
			<div><dt>The business need</dt><dd>Help Gippsland growers understand the services available and prepare a useful conversation about their vineyard.</dd></div>
			<div><dt>What was built</dt><dd>A service website with an interactive estimator. Growers choose their vineyard area and the work required to see an indicative planning range.</dd></div>
			<div><dt>The next step</dt><dd>The estimate explains the factors that can change the price and directs growers to confirm the job with the operator.</dd></div>
		</dl>
		{/if}
		<a href={compact ? sitePath('/websites/#work-example') : 'https://somethingsomethinglabs.com/website-12Grapes/'}>{compact ? 'Explore the vineyard website project' : 'View the 12Grapes website'} <span aria-hidden="true">→</span></a>
	</div>
	<figure>
		<img src={sitePath('/images/work/12grapes-website.jpg')} alt="12Grapes Vineyard Services website presenting vineyard support and a ground-management estimate." width="1425" height="891" loading="lazy" />
		<figcaption>12Grapes Vineyard Services · Website and planning estimator.</figcaption>
	</figure>
</section>

<style>
	.work-example { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); align-items: center; gap: clamp(2rem, 5vw, 4rem); width: min(100% - 3rem, 1120px); margin-inline: auto; padding-block: clamp(3rem, 6vw, 5rem); border-top: 1px solid #d5d2c8; }
	.work-example.compact { grid-template-columns: minmax(0, 1fr) minmax(0, .55fr); padding-block: clamp(2rem, 4vw, 3rem); }
	.compact h2 { font-size: clamp(1.8rem, 3vw, 2.6rem); }
	.example-kicker { margin: 0 0 1rem; color: #4a4ab9; font-size: .75rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
	h2 { margin: 0; color: #10103f; font-size: clamp(2rem, 3.8vw, 3.4rem); line-height: 1.08; letter-spacing: -.045em; }
	.example-intro { margin: 1.25rem 0; color: #595970; line-height: 1.7; }
	dl { margin: 1.5rem 0; }
	dl > div { padding-block: .85rem; border-top: 1px solid #d5d2c8; }
	dt { color: #10103f; font-weight: 750; font-size: .9rem; }
	dd { margin: .35rem 0 0; color: #595970; font-size: .9rem; line-height: 1.65; }
	a { display: inline-flex; align-items: center; gap: .75rem; min-height: 2.75rem; color: #10105a; font-size: .9rem; font-weight: 750; text-underline-offset: .25em; }
	figure { min-width: 0; margin: 0; }
	img { display: block; width: 100%; height: auto; border: 1px solid #d5d2c8; border-radius: .85rem; }
	figcaption { margin-top: .75rem; color: #595970; font-size: .8rem; line-height: 1.5; }
	@media (max-width: 760px) { .work-example, .work-example.compact { width: calc(100% - 2rem); grid-template-columns: 1fr; } }
</style>
