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
					<h1 id="hero-title"><span>Starting a</span> <span>business?</span> <em>Let's get the</em> <span>basics sorted.</span></h1>
					<p class="hero-intro">Your website, business email and essential account setup, handled together. We show you the few things you need to know.</p>
					<div class="hero-actions">
						<a class="button" href="#consultation-form">Help me get started <Icon name="arrowRight" size={22} /></a>
						<a class="text-link" href="#included">See what's included</a>
					</div>
					<p class="local-note">One point of contact. Remote setup, local visits by arrangement.</p>
				</div>
				<figure class="hero-visual">
					<img src={sitePath('/images/illustrations/connected-setup.webp')} width="1200" height="1080" alt="Illustration of a business website with an enquiry arriving in its inbox." fetchpriority="high" />
					<figcaption>A website enquiry, straight to your business inbox. Illustrative example.</figcaption>
				</figure>
			</div>
		</section>

		<section id="included" class="outcomes-section" aria-label="Your business essentials, connected">
			<span id="services" class="anchor-alias" aria-hidden="true"></span>
			<div class="outcomes page-width">
				<div class="outcome">
					<span class="step-number">01</span>
					<span class="outcome-icon"><Icon name="search" size={48} /></span>
					<div><h2>Customers <br />find you</h2><p>Your services, hours, menu or service area, with a clear way to call, enquire or book.</p></div>
					<span class="outcome-next"><Icon name="arrowRight" size={28} /></span>
				</div>
				<div class="outcome">
					<span class="step-number">02</span>
					<span class="outcome-icon"><Icon name="envelope" size={48} /></span>
					<div><h2>Enquiries <br />reach you</h2><p>Email with your business name. Website enquiries arrive in your inbox, ready for you to answer.</p></div>
					<span class="outcome-next"><Icon name="arrowRight" size={28} /></span>
				</div>
				<div class="outcome">
					<span class="step-number">03</span>
					<span class="outcome-icon"><Icon name="user" size={48} /></span>
					<div><h2>You keep <br />control</h2><p>Your website and email accounts stay in your business name. We set up access and recovery.</p></div>
				</div>
			</div>
		</section>

		<section id="costs" class="costs-section page-width" aria-labelledby="costs-title">
			<div class="costs-copy">
				<h2 id="costs-title">Clear costs<br />before we start.</h2>
				<p>One written quote for the setup, website and email costs, and any ongoing help.</p>
				<p class="detail-copy">Tell us who needs to receive enquiries. Your quote lists the pages, email addresses, people with access and devices, plus the timing. You approve it before work starts.</p>
			</div>
			<dl class="cost-list">
				<div class="cost-row">
					<dt><span class="cost-icon"><Icon name="gear" size={32} /></span>Setup</dt>
					<dd>Your website, business email and the accounts for your website address, with help on wording and a short walkthrough.</dd>
				</div>
				<div class="cost-row">
					<dt><span class="cost-icon"><Icon name="envelope" size={32} /></span>Ongoing costs</dt>
					<dd>Your website address, keeping the site online and email subscriptions, with who pays each bill clearly listed.</dd>
				</div>
				<div class="cost-row">
					<dt><span class="cost-icon"><Icon name="plus" size={32} /></span>Optional help</dt>
					<dd>Changes, extra email users or additional features, quoted before they're added.</dd>
				</div>
			</dl>
		</section>

		<section id="work" class="proof-section" aria-label="A recent Servo ICT project">
			<div class="page-width"><WorkExample {baseUrl} compact /></div>
			<div id="about" class="owner-note page-width">
				<p><strong>Local work, one point of contact.</strong> Servo ICT is owned and operated by Rowan Paterson in Gippsland.</p>
				<details>
					<summary>Experience behind the setup</summary>
					<p>Cybersecurity experience, Microsoft Fundamentals training and Microsoft Azure consulting experience inform the practical setups and guidance we provide.</p>
				</details>
			</div>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner page-width">
				<div class="process-heading">
					<h2 id="process-title">We handle the setup.<br />You know what to do next.</h2>
					<p>Need your hours, menu or photos changed later? Send us what's new. We confirm the timing and any cost before making changes.</p>
				</div>
				<ol class="process-steps">
					<li><span class="process-number">01</span><span class="process-next"><Icon name="arrowRight" size={26} /></span><h3>Tell us about your business</h3><p>A conversation and rough notes are enough. We'll help with the wording and use the photos you have.</p></li>
					<li><span class="process-number">02</span><span class="process-next"><Icon name="arrowRight" size={26} /></span><h3>Check the draft</h3><p>You approve the quote and timing before we start. Then you check the website details before it goes live.</p></li>
					<li><span class="process-number">03</span><h3>Get set up and shown how</h3><p>We check everything and show you how to use your email, access your accounts and ask for a change.</p></li>
				</ol>
			</div>
			<details class="process-details page-width">
				<summary>Booking links and extra features</summary>
				<div class="process-note">
				<p><strong>Already have a booking service?</strong> Your website can link to it. Appointments stay with your booking provider.</p>
				<p><strong>Need more than the basics?</strong> Tell us about extra email users, an online shop or other features so we can include the right work in your quote.</p>
				</div>
			</details>
		</section>

		<section id="contact" class="contact-section" aria-labelledby="contact-title">
			<div class="contact-inner page-width">
				<div class="contact-copy">
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
		<div class="footer-bottom"><a href="mailto:support@servoict.com">support@servoict.com</a><span>© {new Date().getFullYear()} Servo ICT</span></div>
	</footer>
</div>

<style>
	.page-shell { overflow: clip; }
	.page-width { width: min(100% - 8rem, 1440px); margin-inline: auto; }
	.skip-link { position: absolute; z-index: 30; left: 1rem; top: 1rem; transform: translateY(-200%); padding: .9rem 1.2rem; background: var(--ink); color: var(--white); font-weight: 750; }
	.skip-link:focus { transform: translateY(0); }
	.site-header { display: flex; align-items: center; justify-content: space-between; gap: 2rem; min-height: 100px; }
	.brand { display: inline-flex; align-items: center; flex-shrink: 0; gap: .65rem; color: var(--ink); font-size: 1.1rem; font-weight: 850; text-decoration: none; letter-spacing: -.045em; }
	.brand img { display: block; object-fit: contain; filter: grayscale(1) brightness(.35); }
	.site-header nav { display: flex; align-items: center; gap: clamp(1rem, 2.2vw, 2rem); }
	.site-header nav a { display: flex; align-items: center; min-height: 44px; font-size: .84rem; font-weight: 700; text-decoration: none; }
	.site-header nav a:hover { text-decoration: underline; text-decoration-thickness: 2px; }
	.header-cta { display: inline-flex; align-items: center; justify-content: center; min-height: 48px; padding: .75rem 1.15rem; border: 2px solid var(--ink); border-radius: 3px; box-shadow: 4px 4px 0 var(--ink); background: var(--white); font-size: .8rem; font-weight: 800; text-decoration: none; }
	.menu-button { display: none; }
	.hero { background: var(--white); border-block: 1px solid var(--line); }
	.hero-inner { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.06fr); align-items: center; gap: 2.5rem; padding-block: clamp(3.5rem, 5vw, 5rem); }
	.eyebrow { margin: 0 0 1.4rem; color: var(--pink-dark); font-size: .76rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
	h1 { margin: 0; font-size: clamp(3rem, 6.1vw, 6rem); font-weight: 830; letter-spacing: -.063em; line-height: .99; }
	h1 span, h1 em { display: block; }
	h1 em { font-style: normal; text-decoration: underline; text-decoration-color: var(--pink); text-decoration-thickness: .11em; text-underline-offset: .065em; text-decoration-skip-ink: none; }
	.hero-intro { max-width: 34rem; margin: 1.45rem 0 0; color: var(--muted); font-size: clamp(1.02rem, 1.65vw, 1.45rem); line-height: 1.55; }
	.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.5rem 2rem; margin-top: 2rem; }
	.button { display: inline-flex; align-items: center; justify-content: center; gap: 1.5rem; min-height: 58px; padding: 1rem 1.4rem; border: 2px solid var(--ink); border-radius: 3px; background: var(--ink); color: var(--white); box-shadow: 5px 5px 0 var(--pink); text-decoration: none; font-size: .95rem; font-weight: 800; transition: transform .15s, box-shadow .15s; }
	.button:hover { transform: translate(-2px, -2px); box-shadow: 7px 7px 0 var(--pink); }
	.button:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--pink); }
	.text-link { display: inline-flex; align-items: center; min-height: 44px; font-size: .9rem; font-weight: 750; text-decoration-thickness: 2px; }
	.local-note { max-width: 32rem; margin: 1.7rem 0 0; color: var(--muted); font-size: 1rem; line-height: 1.5; }
	.hero-visual { min-width: 0; margin: 0 -1rem 0 0; }
	.hero-visual img { display: block; width: calc(100% + 3rem); max-width: none; height: auto; margin-left: -1.5rem; }
	.hero-visual figcaption { max-width: 32rem; margin: .3rem auto 0; color: var(--muted); text-align: center; font-size: .875rem; line-height: 1.5; }
	.outcomes-section { position: relative; padding-block: 3.4rem; background: var(--ink); color: var(--white); }
	.anchor-alias { position: absolute; top: 0; }
	.outcomes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 3rem; }
	.outcome { position: relative; display: grid; grid-template-columns: auto auto minmax(0, 1fr); gap: .9rem; align-items: start; }
	.outcome > div { display: contents; }
	.outcome-next { position: absolute; top: 3.5rem; right: -2.3rem; }
	.step-number { display: flex; justify-content: center; align-items: center; width: 48px; height: 48px; border-radius: 50%; background: var(--mint); color: var(--ink); font-size: 1.1rem; font-weight: 850; }
	.outcome h2 { grid-column: 3; margin: 0; font-size: 1.75rem; font-weight: 800; line-height: 1.12; letter-spacing: -.025em; }
	.outcome p { grid-column: 2 / -1; margin: 0; color: #e8e4e9; font-size: 1.125rem; line-height: 1.55; }
	.costs-section { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); align-items: center; gap: 4rem; padding-block: 3rem; }
	.costs-copy h2 { margin: 0; font-size: clamp(2.25rem, 3.9vw, 3.8rem); font-weight: 820; line-height: 1.04; letter-spacing: -.06em; }
	.costs-copy p { max-width: 30rem; margin: 1.4rem 0 0; color: var(--ink); font-size: 1.25rem; line-height: 1.55; }
	.costs-copy .detail-copy { color: var(--muted); font-size: 1rem; }
	.cost-list { margin: 0; padding: .5rem 1.35rem; border: 2px solid var(--ink); border-radius: 3px; background: var(--white); box-shadow: 7px 7px 0 var(--ink); }
	.cost-row { position: relative; padding: 1.35rem 0 1.35rem 86px; }
	.cost-row + .cost-row { border-top: 1px solid var(--line); }
	.cost-row dt { font-size: 1.3rem; font-weight: 800; }
	.cost-row dd { margin: .35rem 0 0; color: var(--muted); font-size: 1.06rem; line-height: 1.55; }
	.cost-icon { display: flex; align-items: center; justify-content: center; position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 66px; height: 66px; border-radius: 50%; background: #f9c5df; }
	.proof-section { padding-block: 2.5rem 1rem; background: var(--pink); border-block: 1px solid var(--ink); }
	.owner-note { display: flex; justify-content: space-between; align-items: baseline; gap: 1rem 3rem; padding-top: 1.25rem; margin-top: 1.25rem; border-top: 1px solid #a04774; font-size: .875rem; line-height: 1.5; }
	.owner-note p { margin: 0; }
	.owner-note details { max-width: 29rem; }
	.owner-note summary { cursor: pointer; font-weight: 750; min-height: 44px; }
	.owner-note details p { margin-bottom: 1rem; }
	.owner-note summary:focus-visible { outline-color: var(--ink); }
	.process-section { padding-block: 3.8rem 2rem; background: var(--ink); color: var(--white); }
	.process-inner { display: grid; grid-template-columns: minmax(0, .94fr) minmax(0, 1.26fr); gap: 4.5rem; }
	.process-heading h2 { margin: 0; font-size: clamp(1.8rem, 3.05vw, 3rem); font-weight: 820; letter-spacing: -.05em; line-height: 1.08; }
	.process-heading p { max-width: 30rem; margin: 1.2rem 0 0; color: #e8e4e9; font-size: 1.06rem; line-height: 1.6; }
	.process-steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 2rem; margin: 0; padding: 0; list-style: none; }
	.process-steps li { position: relative; }
	.process-number { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; margin-bottom: 1.1rem; border-radius: 50%; background: var(--pink); color: var(--ink); font-size: 1.1rem; font-weight: 850; }
	.process-next { position: absolute; top: .65rem; right: -.3rem; }
	.process-steps h3 { margin: 0; font-size: 1.08rem; line-height: 1.35; }
	.process-steps p { margin: .7rem 0 0; color: #e8e4e9; font-size: 1rem; line-height: 1.6; }
	.process-details { margin-top: 1.8rem; border-top: 1px solid #59545b; }
	.process-details summary { min-height: 44px; padding-top: 1rem; cursor: pointer; font-size: .95rem; font-weight: 750; }
	.process-details summary:focus-visible { outline-color: var(--mint); }
	.process-note { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3rem; padding-block: 1rem .5rem; }
	.process-note p { margin: 0; color: #e8e4e9; font-size: 1rem; line-height: 1.6; }
	.process-note strong { color: var(--white); }
	.contact-section { padding-block: 3.75rem; background: var(--mint); border-block: 1px solid var(--ink); }
	.contact-inner { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.25fr); align-items: start; gap: 4.5rem; }
	.contact-copy h2 { margin: 0; font-size: clamp(2.5rem, 4.2vw, 4.2rem); font-weight: 820; line-height: 1.04; letter-spacing: -.06em; }
	.contact-intro { margin: 1.4rem 0 0; font-size: 1.1rem; line-height: 1.6; }
	.next-step { max-width: 27rem; margin: 1rem 0 1.8rem; font-size: 1rem; line-height: 1.6; }
	.phone-link { display: inline-flex; flex-wrap: wrap; align-items: center; gap: .4em; min-height: 44px; font-size: 1rem; }
	.phone-hours { margin: .2rem 0 0; font-size: .9rem; line-height: 1.6; }
	footer { padding-block: 2rem 1.75rem; }
	.footer-top { display: flex; align-items: center; justify-content: space-between; gap: 2rem; }
	.footer-contact { display: flex; gap: 2rem; font-size: .85rem; }
	.footer-contact a { display: inline-flex; align-items: center; min-height: 44px; }
	.footer-contact span { align-self: center; }
	.footer-nav { display: flex; flex-wrap: wrap; align-items: center; gap: .25rem 2rem; margin-top: 1.4rem; padding-block: .7rem; border-block: 1px solid var(--line); font-size: .8rem; }
	.footer-nav a { display: inline-flex; align-items: center; min-height: 44px; }
	.footer-bottom { display: flex; justify-content: space-between; gap: .5rem 2rem; margin-top: 1.2rem; color: var(--muted); font-size: .75rem; }
	@media (max-width: 1200px) {
		.page-width { width: calc(100% - 5rem); }
		.site-header { gap: 1.2rem; }
		.outcome { grid-template-columns: auto minmax(0, 1fr); }
		.outcome-icon { display: none; }
		.outcome h2 { grid-column: 2; }
		.outcome-next { right: -1.7rem; }
		.outcomes { gap: 2rem; }
		.costs-section, .process-inner, .contact-inner { gap: 3rem; }
		.hero-actions { gap: 1rem; }
	}
	@media (max-width: 960px) {
		.site-header { flex-wrap: wrap; gap: 1rem; padding-block: 1.1rem; min-height: 84px; }
		.menu-button { display: inline-flex; align-items: center; justify-content: center; margin-left: auto; width: 46px; height: 46px; border: 2px solid var(--ink); border-radius: 3px; background: var(--white); cursor: pointer; }
		.site-header nav { display: none; order: 4; width: 100%; border-top: 1px solid var(--line); padding-top: .7rem; }
		.site-header nav.open { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .25rem 1rem; }
		.hero-inner { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 1.5rem; }
		.hero-intro { font-size: 1rem; }
		.hero-actions { align-items: flex-start; flex-direction: column; gap: .8rem; }
		.hero-visual { margin: 0; }
		.hero-visual img { width: 100%; max-width: 100%; margin-left: 0; }
		.outcome { grid-template-columns: 1fr; }
		.outcome h2, .outcome p { grid-column: 1; }
		.outcome-next { display: none; }
		.outcome h2 { font-size: 1.45rem; }
		.outcome p { font-size: .9rem; }
		.costs-section { gap: 2rem; }
		.cost-row { padding-left: 0; }
		.cost-icon { display: none; }
		.owner-note { flex-direction: column; gap: .7rem; }
		.owner-note details { max-width: 100%; }
		.process-inner { grid-template-columns: 1fr; gap: 2rem; }
		.process-heading { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 2rem; }
		.process-heading p { margin: 0; }
		.contact-inner { gap: 2rem; }
		.contact-copy h2 { font-size: 2.5rem; }
	}
	@media (max-width: 700px) {
		.page-width { width: calc(100% - 2.5rem); }
		.site-header { min-height: 80px; padding-block: .9rem; }
		.brand { font-size: 1rem; }
		.header-cta { display: none; }
		.hero-inner { grid-template-columns: 1fr; gap: 2rem; padding-block: 2.5rem 2rem; }
		.eyebrow { margin-bottom: 1.25rem; font-size: .65rem; letter-spacing: .1em; }
		h1 { font-size: clamp(2.6rem, 11.5vw, 4.8rem); }
		.hero-intro { max-width: 32rem; margin-top: 1.35rem; font-size: 1.06rem; }
		.hero-actions { flex-direction: row; flex-wrap: wrap; gap: 1rem; margin-top: 1.5rem; }
		.button { width: 100%; justify-content: space-between; }
		.text-link { font-size: .9rem; }
		.local-note { margin-top: 1rem; font-size: .9rem; }
		.hero-visual { max-width: 32rem; margin-inline: auto; }
		.hero-visual figcaption { font-size: .8rem; }
		.outcomes-section { padding-block: 2.2rem; }
		.outcomes { grid-template-columns: 1fr; gap: 1.6rem; }
		.outcome { grid-template-columns: auto minmax(0, 1fr); gap: 1rem; }
		.outcome > div { display: block; }
		.outcome h2, .outcome p { grid-column: 2; }
		.outcome + .outcome { border-top: 1px solid #59545b; padding-top: 1.6rem; }
		.step-number { width: 42px; height: 42px; font-size: 1rem; }
		.outcome h2 { font-size: 1.45rem; }
		.outcome h2 br { display: none; }
		.outcome p { margin-top: .7rem; font-size: .98rem; }
		.costs-section { grid-template-columns: 1fr; gap: 2rem; padding-block: 3rem; }
		.costs-copy h2 { font-size: clamp(2.3rem, 8.3vw, 3.4rem); }
		.costs-copy p { font-size: 1.05rem; }
		.costs-copy .detail-copy { color: var(--muted); font-size: 1rem; }
		.cost-list { padding-inline: 1rem; box-shadow: 5px 5px 0 var(--ink); }
		.cost-row { padding: 1.1rem 0 1.1rem 63px; }
		.cost-row dt { font-size: 1.03rem; }
		.cost-row dd { font-size: .9rem; }
		.cost-icon { display: flex; width: 48px; height: 48px; }
		.proof-section { padding-block: 2.5rem 1rem; }
		.owner-note { font-size: 1rem; margin-top: 1.5rem; padding-top: 1.5rem; }
		.process-section { padding-block: 2.75rem 1.75rem; }
		.process-heading { display: block; }
		.process-heading h2 { font-size: 2rem; }
		.process-heading p { margin-top: 1.2rem; font-size: .96rem; }
		.process-steps { grid-template-columns: 1fr; gap: 1.8rem; }
		.process-steps li { display: grid; grid-template-columns: 42px minmax(0, 1fr); gap: .5rem 1rem; }
		.process-number { grid-row: span 2; margin: 0; width: 42px; height: 42px; }
		.process-next { display: none; }
		.process-steps h3 { font-size: 1.03rem; }
		.process-steps p { margin: 0; font-size: .94rem; }
		.process-note { grid-template-columns: 1fr; gap: 1rem; }
		.process-note p { font-size: .95rem; }
		.contact-section { padding-block: 2.75rem; }
		.contact-inner { grid-template-columns: 1fr; gap: 2rem; }
		.contact-copy h2 { font-size: clamp(2.7rem, 9vw, 3.5rem); }
		.contact-intro { margin-top: 1.2rem; }
		.next-step { margin-bottom: 1rem; }
		.footer-top { gap: .75rem; }
		.footer-contact { flex-direction: column; align-items: flex-end; gap: 0; font-size: .75rem; }
		.footer-contact span { align-self: flex-end; }
		.footer-nav { gap: .1rem 1.5rem; }
		.footer-nav strong { width: 100%; margin-bottom: .4rem; }
		.footer-bottom { flex-wrap: wrap; }
	}
	@media (prefers-reduced-motion: reduce) {
		.button { transition: none; }
		.button:hover, .button:active { transform: none; }
	}
</style>
