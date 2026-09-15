<script lang="ts">
	import EnquiryForm from './EnquiryForm.svelte';
	import Icon from './Icon.svelte';
	import WorkExample from './WorkExample.svelte';

	let {
		baseUrl = '/',
		turnstileSiteKey = '',
		consultationMode = 'server'
	}: { baseUrl?: string; turnstileSiteKey?: string; consultationMode?: 'server' | 'email' } = $props();
	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement;
	const sitePath = (path: string) => baseUrl + path.replace(/^\//, '');
	const closeMenu = () => { menuOpen = false; };
	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !menuOpen) return;
		event.preventDefault();
		closeMenu();
		menuButton.focus();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="page-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>
	<header class="site-header page-width">
		<a class="brand" href="#top" aria-label="Servo ICT home" onclick={closeMenu}>
			<img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>
		<button bind:this={menuButton} class="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="site-navigation" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
			<Icon name={menuOpen ? 'close' : 'list'} size={26} />
		</button>
		<nav id="site-navigation" class:open={menuOpen} aria-label="Main navigation">
			<a href="#included" onclick={closeMenu}>What's included</a>
			<a href="#process" onclick={closeMenu}>How it works</a>
			<a href="#work" onclick={closeMenu}>Our work</a>
			<a href="#other-services" onclick={closeMenu}>Other help</a>
		</nav>
		<a class="header-cta" href="#consultation-form" onclick={closeMenu}>Help me get started</a>
	</header>

	<main id="main-content">
		<section id="top" class="hero" aria-labelledby="hero-title">
			<div class="hero-inner page-width">
				<div class="hero-copy">
					<p class="eyebrow">For new businesses in Gippsland</p>
					<h1 id="hero-title"><span>Starting a business?</span> <span>Let's get the</span> <span>basics sorted.</span></h1>
					<p class="hero-intro">Your website, business email and essential account setup, handled together. We show you the few things you need to know.</p>
					<div class="hero-actions">
						<a class="button" href="#consultation-form">Help me get started <Icon name="arrowRight" size={22} /></a>
						<a class="text-link" href="#included">See what's included</a>
					</div>
					<p class="local-note"><Icon name="shieldCheck" size={28} /><span>One point of contact. Remote setup, local visits by arrangement.</span></p>
				</div>
					<div class="hero-visual">
						<img class="hero-annotation" src={sitePath('/images/illustrations/ideas-to-customers-slate-signal.webp')} width="768" height="750" alt="From ideas to customers" />
						<img class="storefront" src={sitePath('/images/illustrations/new-business-storefront.webp')} width="1122" height="1402" alt="A New Business sign hanging in a shop window." fetchpriority="high" />
					</div>
			</div>
		</section>

		<section id="included" class="included-section" aria-labelledby="included-title">
			<span id="services" class="anchor-alias" aria-hidden="true"></span>
			<div class="page-width">
				<div class="included-heading">
					<div>
						<p class="eyebrow">Your website and email, connected</p>
						<h2 id="included-title">One setup.<br /><span class="underline">Ready</span> for customers.</h2>
					</div>
					<p>People find your business online, check your services and hours, and get in touch. Enquiries come to your business email, ready for you to answer.</p>
				</div>
				<p class="illustration-label">Illustrative example of a website enquiry</p>
				<div class="connected-example">
					<figure class="example-frame website-example">
						<div class="example-image"><img src={sitePath('/images/work/12grapes-website.jpg')} width="1425" height="891" alt="12Grapes website explaining its vineyard services." loading="lazy" /></div>
						<figcaption><Icon name="search" size={28} /><div><strong>Customers find you</strong><span>Your services, hours, menu or service area, with a clear way to get in touch.</span></div></figcaption>
					</figure>
					<span class="connection-arrow" aria-hidden="true"><Icon name="arrowRight" size={32} /></span>
					<figure class="example-frame email-example">
						<div class="example-image"><img src={sitePath('/images/illustrations/business-email-example-slate-signal.webp')} width="1315" height="1196" alt="Illustrative business inbox with a sample enquiry asking about your services." loading="lazy" /></div>
						<figcaption><Icon name="envelope" size={28} /><div><strong>Enquiries reach you</strong><span>Reply using email with your business name.</span></div></figcaption>
					</figure>
				</div>
				<p class="ownership-note"><Icon name="shieldCheck" size={32} /><span>You keep the website and email accounts in your business name. We set up access and recovery.</span></p>
			</div>
		</section>

		<section id="costs" class="costs-section page-width" aria-labelledby="costs-title">
			<div class="costs-copy">
				<p class="eyebrow">Pricing</p>
				<h2 id="costs-title">Clear costs<br />before <span class="underline">we start.</span></h2>
				<p>Your quote lists the setup fee, website and email costs, and any ongoing help.</p>
				<p class="detail-copy">You approve the work, costs and timing before we start.</p>
			</div>
			<div class="costs-breakdown">
				<dl class="cost-list">
					<div class="cost-row">
						<dt><Icon name="gear" size={32} />Setup</dt>
						<dd>Website and business email setup, help with the wording, and a short walkthrough.</dd>
					</div>
					<div class="cost-row">
						<dt><Icon name="creditCard" size={32} />Ongoing costs</dt>
						<dd>Your website address, keeping the site online and email subscriptions. Your quote shows who bills you.</dd>
					</div>
					<div class="cost-row">
						<dt><Icon name="plus" size={32} />Optional extras</dt>
						<dd>Changes, extra email users or additional features, quoted before they're added.</dd>
					</div>
				</dl>
				<details class="quote-details">
					<summary>What will my quote cover?</summary>
					<p>Your quote lists the website pages, email addresses, who needs access and where you'll use email, plus any ongoing help and terms. We agree what you need to provide before work starts.</p>
				</details>
			</div>
		</section>

		<section id="work" class="proof-section" aria-label="A recent Servo ICT project">
			<div class="page-width"><WorkExample {baseUrl} compact /></div>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner page-width">
				<div class="process-heading">
					<p class="eyebrow">How it works</p>
					<h2 id="process-title">We handle the setup.<br /><span>You know what to do next.</span></h2>
				</div>
				<div class="process-content">
					<ol class="process-steps">
						<li><span class="process-number">1</span><h3>Tell us about<br /> your business</h3><p>A conversation and rough notes are enough. We'll help with wording and use the photos you have.</p></li>
						<li><span class="process-number">2</span><h3>Check the draft</h3><p>You check the website details and ask for changes before it goes live.</p></li>
						<li><span class="process-number">3</span><h3>Get set up<br /> and shown how</h3><p>We test everything, then show you how to use your email and access your accounts.</p></li>
					</ol>
					<p class="later-help">Need your hours, menu or photos changed later? Send us what's new. We'll confirm the timing and any cost first.</p>
					<details class="process-details">
						<summary>Booking links and extra features</summary>
						<div class="process-note">
							<p><strong>Already have a booking service?</strong> Your website can link to it. Appointments stay with your booking provider.</p>
							<p><strong>Need more than the basics?</strong> Tell us about extra email users, an online shop or other features so we can include the right work in your quote.</p>
						</div>
					</details>
				</div>
			</div>
		</section>

		<section id="contact" class="contact-section" aria-labelledby="contact-title">
			<div class="contact-inner page-width">
				<div class="contact-copy">
					<p class="eyebrow">Get in touch</p>
					<h2 id="contact-title">Tell us what<br />you're starting.</h2>
					<p class="contact-intro">A rough description is enough.</p>
					<p class="next-step">We'll confirm whether we can help and arrange a conversation. We aim to reply within two business days.</p>
					<a class="phone-link" href="tel:0341488665">Prefer a call? <strong>(03) 4148 8665</strong></a>
					<p class="phone-hours">Monday, Tuesday and Friday, 9am to 4pm.</p>
				</div>
				<EnquiryForm {baseUrl} {turnstileSiteKey} {consultationMode} />
			</div>
		</section>
	</main>

	<footer class="page-width">
		<div class="footer-top">
			<a class="brand" href="#top" aria-label="Servo ICT home"><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="40" height="40" /><span>Servo ICT</span></a>
			<div class="footer-contact"><span>Servo ICT · Gippsland</span><a href="tel:0341488665">(03) 4148 8665</a></div>
		</div>
		<nav id="other-services" class="footer-nav" aria-label="Other services and information">
			<strong>Other help</strong>
			<a href={sitePath('/websites/')}>Websites</a>
			<a href={sitePath('/business-it/')}>Business IT</a>
			<a href={sitePath('/security/')}>Account security</a>
			<a href={sitePath('/blog/')}>Advice</a>
			<a href="#about">About Servo</a>
			<a href={sitePath('/privacy/')}>Privacy</a>
		</nav>
		<div id="about" class="owner-note">
			<p>Servo ICT is owned and operated by Rowan Paterson in Gippsland.</p>
			<details>
				<summary>Experience behind the setup</summary>
				<p>Cybersecurity experience, Microsoft Fundamentals training and Microsoft Azure consulting experience inform the practical setups and guidance we provide.</p>
			</details>
		</div>
		<div class="footer-bottom"><a href="mailto:support@servoict.com">support@servoict.com</a><span>© {new Date().getFullYear()} Servo ICT</span></div>
	</footer>
</div>

<style>
	.page-shell { overflow: clip; }
	.page-width { width: min(89%, 1280px); margin-inline: auto; }
	.skip-link { position: absolute; z-index: 30; left: 1rem; top: 1rem; transform: translateY(-200%); padding: .9rem 1.2rem; background: var(--colour-text); color: var(--colour-inverse); font-weight: 750; }
	.skip-link:focus { transform: translateY(0); }
	.site-header { display: flex; align-items: center; justify-content: space-between; gap: 2rem; min-height: 88px; }
	.brand { display: inline-flex; align-items: center; flex-shrink: 0; gap: .65rem; color: var(--colour-text); font-size: 1.1rem; font-weight: 850; text-decoration: none; letter-spacing: -.045em; }
	.brand img { display: block; object-fit: contain; filter: grayscale(1) brightness(.35); }
	.site-header nav { display: flex; align-items: center; gap: clamp(1rem, 2vw, 2rem); }
	.site-header nav a { display: flex; align-items: center; min-height: 44px; font-size: .84rem; font-weight: 700; text-decoration: none; }
	.site-header nav a:hover { text-decoration: underline; text-decoration-thickness: 2px; }
	.header-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: .75rem 1.15rem; border: 2px solid var(--colour-text); border-radius: 2px; box-shadow: 4px 4px 0 var(--colour-text); background: var(--colour-accent); color: var(--colour-text); font-size: .8rem; font-weight: 800; text-decoration: none; }
	.menu-button { display: none; }
	.hero { background: var(--colour-canvas); border-bottom: 1px solid var(--colour-line); }
	.hero-inner { display: grid; grid-template-columns: minmax(0, 1.48fr) minmax(0, 1fr); align-items: center; gap: 1.5rem; padding-block: 2.1rem 2.75rem; }
	.eyebrow { margin: 0 0 1.2rem; color: var(--colour-feature); font-size: .76rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
	h1 { margin: 0; font-size: clamp(2.75rem, 5.4vw, 4.9rem); font-weight: 830; letter-spacing: -.063em; line-height: .99; }
	h1 span { display: block; }
	.hero-intro { max-width: 37rem; margin: 1.4rem 0 0; color: var(--colour-text-muted); font-size: clamp(1rem, 1.48vw, 1.25rem); line-height: 1.55; }
	.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem 1.8rem; margin-top: 1.5rem; }
	.button { display: inline-flex; align-items: center; justify-content: center; gap: 1.5rem; min-height: 56px; padding: .9rem 1.4rem; border: 2px solid var(--colour-text); border-radius: 2px; background: var(--colour-accent); color: var(--colour-text); box-shadow: 5px 5px 0 var(--colour-text); text-decoration: none; font-size: .95rem; font-weight: 800; transition: transform .15s, box-shadow .15s; }
	.button:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--colour-text); }
	.button:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--colour-text); }
	.text-link { display: inline-flex; align-items: center; min-height: 44px; font-size: .9rem; font-weight: 750; text-decoration-thickness: 2px; }
	.local-note { display: flex; align-items: center; gap: .75rem; max-width: 38rem; margin: 1.7rem 0 0; font-size: .9rem; line-height: 1.5; }
	.hero-visual { display: grid; grid-template-columns: minmax(0, .38fr) minmax(0, 1fr); align-items: center; gap: 1rem; padding: 0 1rem 1rem 0; }
	.hero-annotation { display: block; width: 100%; height: auto; mix-blend-mode: multiply; }
	.storefront { display: block; width: 100%; height: auto; aspect-ratio: 4 / 5; object-fit: cover; border: 2px solid var(--colour-text); border-radius: 2px; box-shadow: 12px 12px 0 var(--colour-support), 12px 12px 0 2px var(--colour-text); }
	.included-section { position: relative; padding-block: 2.5rem 1.75rem; background: var(--colour-canvas); border-bottom: 1px solid var(--colour-line); }
	.anchor-alias { position: absolute; top: 0; }
	.included-heading { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, .9fr); align-items: center; gap: 3.5rem; }
	.included-heading h2 { margin: 0; font-size: clamp(2.35rem, 4.6vw, 4.25rem); font-weight: 830; letter-spacing: -.065em; line-height: 1.02; }
	.underline { text-decoration: underline; text-decoration-color: var(--colour-accent); text-decoration-thickness: .11em; text-underline-offset: .085em; text-decoration-skip-ink: none; }
	.included-heading > p { margin: 0; color: var(--colour-text-muted); font-size: clamp(1rem, 1.48vw, 1.25rem); line-height: 1.55; }
	.illustration-label { margin: 1.75rem 0 .65rem; color: var(--colour-text-muted); font-size: .8rem; }
	.connected-example { display: grid; grid-template-columns: minmax(0, 1.67fr) 40px minmax(0, 1fr); align-items: stretch; gap: .65rem; }
	.example-frame { min-width: 0; margin: 0; border: 2px solid var(--colour-text); border-top: 12px solid var(--colour-support); border-radius: 2px; background: var(--colour-background); box-shadow: 6px 6px 0 var(--colour-support); }
	.example-image { height: clamp(15rem, 29vw, 25rem); overflow: hidden; }
	.example-image img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
	.email-example img { object-fit: contain; object-position: center; }
	.example-frame figcaption { display: flex; align-items: flex-start; gap: .85rem; padding: 1.15rem 1.2rem; border-top: 1px solid var(--colour-line); }
	.example-frame figcaption strong, .example-frame figcaption span { display: block; }
	.example-frame figcaption strong { font-size: 1rem; font-weight: 800; }
	.example-frame figcaption span { max-width: 31rem; margin-top: .4rem; color: var(--colour-text-muted); font-size: .95rem; line-height: 1.5; }
	.connection-arrow { display: flex; align-items: center; justify-content: center; }
	.ownership-note { display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 1.75rem 0 0; padding: 1rem 1.5rem; border: 1px solid var(--colour-text); background: var(--colour-support); color: var(--colour-text); font-size: .98rem; font-weight: 700; line-height: 1.5; }
	.costs-section { display: grid; grid-template-columns: minmax(0, .8fr) minmax(0, 1.4fr); align-items: start; gap: 3.75rem; padding-block: 2.5rem; }
	.costs-copy h2 { margin: 0; font-size: clamp(2.2rem, 3.65vw, 3.45rem); font-weight: 820; line-height: 1.04; letter-spacing: -.06em; }
	.costs-copy > p:not(.eyebrow) { max-width: 30rem; margin: 1.2rem 0 0; color: var(--colour-text-muted); font-size: 1.1rem; line-height: 1.55; }
	.costs-copy > p.detail-copy { font-size: .9rem; }
	.costs-breakdown { padding-left: 3rem; border-left: 1px solid var(--colour-line); }
	.cost-list { margin: 0; }
	.cost-row { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.15fr); align-items: start; gap: 1.5rem; padding-block: 1.2rem; }
	.cost-row:first-child { padding-top: 0; }
	.cost-row + .cost-row { border-top: 1px solid var(--colour-line); }
	.cost-row dt { display: flex; align-items: center; gap: 1.15rem; min-height: 32px; font-size: 1.08rem; font-weight: 800; }
	.cost-row dd { margin: 0; color: var(--colour-text-muted); font-size: .95rem; line-height: 1.55; }
	.quote-details { border-top: 1px solid var(--colour-line); }
	.quote-details summary { display: list-item; min-height: 44px; padding-top: .9rem; cursor: pointer; font-size: .9rem; font-weight: 700; }
	.quote-details p { margin: .5rem 0 0; color: var(--colour-text-muted); font-size: .95rem; line-height: 1.6; }
	.proof-section { padding-block: 2rem; background: var(--colour-support); color: var(--colour-text); border-block: 1px solid var(--colour-text); }
	.process-section { padding-block: 2.75rem 1.8rem; background: var(--colour-text); color: var(--colour-inverse); }
	.process-inner { display: grid; grid-template-columns: minmax(0, .98fr) minmax(0, 1.25fr); gap: 3rem; }
	.process-heading .eyebrow { color: var(--colour-accent); }
	.process-heading h2 { margin: 0; font-size: clamp(1.9rem, 2.9vw, 2.65rem); font-weight: 820; letter-spacing: -.055em; line-height: 1.08; }
	.process-heading h2 span { color: var(--colour-accent); }
	.process-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
	.process-steps li { padding-inline: 1.4rem; border-left: 1px solid var(--colour-support); }
	.process-steps li:first-child { border-left: none; padding-left: 0; }
	.process-steps li:last-child { padding-right: 0; }
	.process-number { display: flex; align-items: center; justify-content: center; width: 42px; height: 42px; margin-bottom: .8rem; border-radius: 50%; background: var(--colour-accent); color: var(--colour-text); font-size: 1.1rem; font-weight: 850; }
	.process-steps h3 { margin: 0; font-size: 1.05rem; line-height: 1.3; }
	.process-steps p { margin: .65rem 0 0; color: var(--colour-inverse); font-size: .95rem; line-height: 1.55; }
	.later-help { margin: 1.2rem 0 0; padding-top: .8rem; border-top: 1px solid var(--colour-support); font-size: .9rem; line-height: 1.55; }
	.process-details { margin-top: .6rem; }
	.process-details summary { min-height: 44px; padding-top: .7rem; cursor: pointer; font-size: .9rem; font-weight: 750; }
	.process-details summary:focus-visible { outline-color: var(--colour-accent); }
	.process-section :focus-visible, footer :focus-visible { outline-color: var(--colour-accent); }
	.process-note { display: grid; gap: 1rem; padding-block: .75rem .5rem; }
	.process-note p { margin: 0; color: var(--colour-inverse); font-size: .95rem; line-height: 1.6; }
	.process-note strong { color: var(--colour-inverse); }
	.contact-section { padding-block: 2.75rem; background: var(--colour-canvas); border-block: 1px solid var(--colour-support); }
	.contact-inner { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.65fr); align-items: start; gap: 3.5rem; }
	.contact-copy .eyebrow { color: var(--colour-feature); }
	.contact-copy h2 { margin: 0; font-size: clamp(2.25rem, 3.65vw, 3.4rem); font-weight: 820; line-height: 1.04; letter-spacing: -.06em; }
	.contact-intro { margin: 1rem 0 0; font-size: 1.1rem; line-height: 1.6; }
	.next-step { max-width: 27rem; margin: 1rem 0 1.3rem; font-size: .95rem; line-height: 1.6; }
	.phone-link { display: inline-flex; flex-wrap: wrap; align-items: center; gap: .4em; min-height: 44px; font-size: .95rem; }
	.phone-hours { margin: .2rem 0 0; font-size: .85rem; line-height: 1.6; }
	footer { padding-block: 1.75rem 1.5rem; background: var(--colour-feature); color: var(--colour-inverse); box-shadow: 0 0 0 100vmax var(--colour-feature); clip-path: inset(0 -100vmax); }
	footer .brand { color: var(--colour-inverse); }
	footer .brand img { filter: grayscale(1) brightness(0) invert(.86); }
	.footer-top { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
	.footer-contact { display: flex; gap: 2rem; font-size: .85rem; }
	.footer-contact a { display: inline-flex; align-items: center; min-height: 44px; }
	.footer-contact span { align-self: center; }
	.footer-nav { display: flex; flex-wrap: wrap; align-items: center; gap: .25rem 2rem; margin-top: 1.25rem; padding-block: .7rem; border-block: 1px solid color-mix(in srgb, var(--colour-inverse) 40%, var(--colour-feature)); font-size: .85rem; }
	.footer-nav a { display: inline-flex; align-items: center; min-height: 44px; }
	.owner-note { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem 3rem; margin-top: 1rem; color: var(--colour-inverse); font-size: .875rem; line-height: 1.5; }
	.owner-note p { margin: 0; }
	.owner-note details { max-width: 29rem; }
	.owner-note summary { min-height: 44px; color: var(--colour-inverse); cursor: pointer; font-weight: 700; }
	.owner-note details p { margin-bottom: 1rem; }
	.footer-bottom { display: flex; justify-content: space-between; gap: .5rem 2rem; margin-top: .75rem; color: var(--colour-inverse); font-size: .8rem; }
	@media (max-width: 1100px) {
		.site-header { gap: 1rem; }
		.site-header nav { gap: 1rem; }
		.site-header nav a, .header-cta { font-size: .78rem; }
		.costs-section { gap: 2.5rem; }
		.costs-breakdown { padding-left: 2rem; }
		.cost-row { gap: 1rem; }
		.cost-row dt { gap: .7rem; font-size: 1rem; }
		.process-inner { grid-template-columns: minmax(0, .85fr) minmax(0, 1.3fr); gap: 2rem; }
		.process-steps li { padding-inline: 1rem; }
		.contact-inner { gap: 2.5rem; }
	}
	@media (max-width: 960px) {
		.site-header { flex-wrap: wrap; gap: 1rem; padding-block: 1rem; min-height: 84px; }
		.menu-button { display: inline-flex; align-items: center; justify-content: center; margin-left: auto; width: 46px; height: 46px; border: 2px solid var(--colour-text); border-radius: 2px; background: var(--colour-background); cursor: pointer; }
		.site-header nav { display: none; order: 4; width: 100%; border-top: 1px solid var(--colour-line); padding-top: .7rem; }
		.site-header nav.open { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .25rem 1rem; }
		.site-header nav a, .header-cta { font-size: .85rem; }
		.hero-inner { grid-template-columns: minmax(0, 1.5fr) minmax(0, .9fr); }
		.hero-visual { grid-template-columns: 1fr; }
		.hero-annotation { width: 95px; margin: 0 auto .4rem; }
		.hero-intro { font-size: 1rem; }
		.hero-actions { gap: 1rem; }
		.local-note { align-items: flex-start; }
		.included-heading { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 2rem; }
		.connected-example { grid-template-columns: minmax(0, 1.4fr) 28px minmax(0, 1fr); gap: .5rem; }
		.example-image { height: 17rem; }
		.example-frame figcaption { padding: 1rem; gap: .7rem; }
		.example-frame figcaption span { font-size: .9rem; }
		.costs-section { grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr); }
		.cost-row { grid-template-columns: 1fr; gap: .6rem; }
		.costs-copy h2 { font-size: 2.25rem; }
		.process-inner { grid-template-columns: 1fr; gap: 2rem; }
		.process-heading h2 { max-width: 22ch; font-size: 2.5rem; }
		.process-steps li { padding-inline: 1.5rem; }
		.process-steps p { font-size: 1rem; }
		.contact-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr); gap: 2rem; }
		.owner-note { flex-direction: column; gap: .75rem; }
		.owner-note details { max-width: 100%; }
	}
	@media (max-width: 700px) {
		.page-width { width: calc(100% - 2.5rem); }
		.site-header { min-height: 80px; padding-block: .9rem; }
		.brand { font-size: 1rem; }
		.header-cta { display: none; }
		.hero-inner { grid-template-columns: 1fr; gap: 2rem; padding-block: 2rem; }
		.eyebrow { margin-bottom: 1.1rem; font-size: .7rem; letter-spacing: .1em; }
		h1 { font-size: clamp(2.3rem, 8.6vw, 3.7rem); }
		.hero-intro { margin-top: 1.25rem; font-size: 1.06rem; }
		.hero-actions { margin-top: 1.5rem; }
		.button { width: 100%; justify-content: space-between; }
		.local-note { margin-top: 1rem; font-size: .9rem; }
		.hero-visual { grid-template-columns: minmax(0, .45fr) minmax(0, 1fr); gap: 1.3rem; max-width: 27rem; width: 100%; margin-inline: auto; padding-right: .85rem; }
		.hero-annotation { width: 100%; margin: 0; }
		.storefront { box-shadow: 9px 9px 0 var(--colour-support), 9px 9px 0 2px var(--colour-text); }
		.included-section { padding-block: 2.25rem 1.75rem; }
		.included-heading { grid-template-columns: 1fr; gap: 1.4rem; }
		.included-heading h2 { font-size: clamp(2.25rem, 8.1vw, 3.25rem); }
		.included-heading > p { font-size: 1.06rem; }
		.illustration-label { margin-top: 1.5rem; font-size: .85rem; }
		.connected-example { grid-template-columns: 1fr; gap: .75rem; padding-right: 5px; }
		.example-image { height: auto; }
		.website-example img { aspect-ratio: 1.6; height: auto; }
		.email-example img { aspect-ratio: 1.35; height: auto; max-height: 23rem; }
		.connection-arrow { padding-block: .5rem; transform: rotate(90deg); }
		.example-frame figcaption { padding: 1rem; }
		.example-frame figcaption span { font-size: .95rem; }
		.ownership-note { align-items: flex-start; margin-top: 1.5rem; padding: 1rem; gap: .75rem; font-size: .95rem; }
		.costs-section { grid-template-columns: 1fr; gap: 1.8rem; padding-block: 2.5rem; }
		.costs-copy h2 { font-size: clamp(2.35rem, 8.5vw, 3.2rem); }
		.costs-copy > p:not(.eyebrow) { font-size: 1.05rem; }
		.costs-breakdown { padding-left: 0; border-left: 0; }
		.cost-row { grid-template-columns: 1fr; gap: .6rem; padding-block: 1.2rem; }
		.cost-row dt { gap: 1rem; font-size: 1.08rem; }
		.cost-row dd { padding-left: 3rem; font-size: 1rem; }
		.quote-details summary { font-size: .95rem; }
		.proof-section { padding-block: 2.25rem; }
		.process-section { padding-block: 2.5rem 1.75rem; }
		.process-heading h2 { font-size: clamp(2rem, 7.7vw, 2.7rem); }
		.process-steps { grid-template-columns: 1fr; gap: 1.5rem; }
		.process-steps li { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: .5rem 1rem; padding: 0; border-left: 0; }
		.process-number { grid-row: span 2; margin: 0; }
		.process-steps h3 { font-size: 1.1rem; }
		.process-steps h3 br { display: none; }
		.process-steps p { margin: 0; }
		.later-help { margin-top: 1.5rem; font-size: .95rem; }
		.contact-section { padding-block: 2.5rem; }
		.contact-inner { grid-template-columns: 1fr; gap: 2rem; }
		.contact-copy h2 { font-size: clamp(2.5rem, 9vw, 3.5rem); }
		.next-step { margin-bottom: .8rem; font-size: 1rem; }
		.phone-link { font-size: 1rem; }
		.phone-hours { font-size: .9rem; }
		.footer-top { gap: .75rem; }
		.footer-contact { flex-direction: column; align-items: flex-end; gap: 0; font-size: .8rem; }
		.footer-contact span { align-self: flex-end; }
		.footer-nav { gap: .1rem 1.5rem; font-size: .9rem; }
		.footer-nav strong { width: 100%; margin-bottom: .4rem; }
		.owner-note { font-size: .95rem; }
		.footer-bottom { flex-wrap: wrap; font-size: .85rem; }
	}
	@media (prefers-reduced-motion: reduce) {
		.button { transition: none; }
		.button:hover, .button:active { transform: none; }
	}
</style>
