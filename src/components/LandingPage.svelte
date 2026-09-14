<script lang="ts">
	import { buildConsultationEmailDraft, consultationRecipient } from '../lib/consultationEmail';
	import WorkExample from './WorkExample.svelte';

	let {
		turnstileSiteKey = '',
		consultationMode = 'server',
		baseUrl = '/'
	}: { turnstileSiteKey?: string; consultationMode?: 'server' | 'email'; baseUrl?: string } = $props();
	let menuOpen = $state(false);
	let menuButton: HTMLButtonElement;
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let formMessage = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let copyState = $state<'idle' | 'success' | 'error'>('idle');
	let copyMessage = $state('');
	let manualCopyText = $state('');
	let activeCopyRequest: symbol | null = null;
	let serviceSelect: HTMLSelectElement | undefined;
	const knownServiceQueries = new Set(['website', 'technology', 'security']);

	interface ConsultationResponse {
		ok: boolean;
		message: string;
		fieldErrors?: Record<string, string>;
	}

	const closeMenu = () => {
		menuOpen = false;
	};

	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape' || !menuOpen) return;
		event.preventDefault();
		closeMenu();
		menuButton.focus();
	}

	function clearCopyFeedback() {
		activeCopyRequest = null;
		copyState = 'idle';
		copyMessage = '';
		manualCopyText = '';
	}

	function serverFailureMessage(message: string) {
		return `${message} Your details are still in the form. You can copy the enquiry and send it from your email app.`;
	}

	const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;

	$effect(() => {
		const searchParams = new URLSearchParams(window.location.search);
		const requestedService = searchParams.get('service');
		if (requestedService && knownServiceQueries.has(requestedService) && serviceSelect) {
			// Set only the current value so a successful submission still resets the form to blank.
			serviceSelect.value = requestedService;
		}

		const requestState = searchParams.get('request');
		if (requestState === 'sent') {
			formState = 'success';
			formMessage = 'Thanks, your enquiry has been sent. We\'ll reply by email.';
		} else if (requestState === 'error') {
			formState = 'error';
			formMessage = 'Your enquiry could not be sent. Please email support@servoict.com.';
		}
	});

	async function submitConsultation(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		clearCopyFeedback();

		if (consultationMode === 'email') {
			fieldErrors = {};
			formState = 'idle';
			formMessage = 'Your email app is opening. Review the draft, then press send.';
			window.location.href = buildConsultationEmailDraft(new FormData(form)).mailto;
			return;
		}

		formState = 'submitting';
		formMessage = 'Sending your enquiry…';
		fieldErrors = {};

		try {
			const request = await fetch(form.action, {
				method: 'POST',
				headers: { Accept: 'application/json' },
				body: new FormData(form)
			});
			const result = (await request.json()) as ConsultationResponse;
			formState = result.ok ? 'success' : 'error';
			formMessage = result.message;
			fieldErrors = result.fieldErrors || {};

			if (result.ok) {
				form.reset();
				clearCopyFeedback();
			} else {
				const firstInvalidField = Object.keys(fieldErrors)[0];
				if (firstInvalidField) {
					(form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
				} else {
					formMessage = serverFailureMessage(formMessage);
				}
			}
		} catch {
			formState = 'error';
			formMessage = serverFailureMessage('Your enquiry could not be sent.');
		} finally {
			const turnstile = (window as typeof window & { turnstile?: { reset: () => void } }).turnstile;
			turnstile?.reset();
		}
	}

	async function copyConsultation(event: MouseEvent) {
		const form = (event.currentTarget as HTMLButtonElement).form;
		clearCopyFeedback();
		if (!form || !form.reportValidity()) return;

		fieldErrors = {};
		const draft = buildConsultationEmailDraft(new FormData(form));
		const request = Symbol('copy request');
		activeCopyRequest = request;
		manualCopyText = draft.plainText;

		try {
			if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
			await navigator.clipboard.writeText(draft.plainText);
			if (activeCopyRequest !== request) return;
			copyState = 'success';
			copyMessage = `Enquiry copied. Paste it into an email to ${draft.recipient} and press send there.`;
		} catch {
			if (activeCopyRequest !== request) return;
			copyState = 'error';
			copyMessage = 'Automatic copying was unavailable. Select and copy the prepared enquiry below.';
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class="page-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>

	<header class="site-header">
		<a class="brand" href="#top" aria-label="Servo ICT home" onclick={closeMenu}>
			<img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>

		<button bind:this={menuButton} class="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="site-navigation" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
			<span></span><span></span>
		</button>

		<nav id="site-navigation" class:open={menuOpen} aria-label="Main navigation">
			<a href="#services" onclick={closeMenu}>What we help with</a>
			<a href="#process" onclick={closeMenu}>How it works</a>
			<a href="#contact" onclick={closeMenu}>Contact</a>
		</nav>

		<a class="header-cta" href="#consultation-form" onclick={closeMenu}>Start an enquiry</a>
	</header>

	<main id="main-content">
		<section id="top" class="hero" aria-labelledby="hero-title">
			<div class="hero-inner">
				<div class="hero-copy">
					<p class="eyebrow">Small business setup / Gippsland</p>
					<h1 id="hero-title">Your business basics, <em>set up properly.</em></h1>
					<p class="hero-intro">
						A clear website, business email and essential accounts for new and small businesses.
						We handle the setup and show you the few things you need to know.
					</p>

					<div class="hero-actions">
						<a class="button button-primary" href="#services">See what we can help with <span aria-hidden="true">→</span></a>
						<a class="text-link hero-link" href="tel:0341488665">Call (03) 4148 8665</a>
					</div>
				</div>

				<aside class="starter-panel" aria-labelledby="starter-title">
					<p class="starter-kicker">Starting a business?</p>
					<h2 id="starter-title">Start with the essentials.</h2>
					<ul>
						<li><span>01</span><strong>A clear website</strong></li>
						<li><span>02</span><strong>Business email</strong></li>
						<li><span>03</span><strong>Essential accounts</strong></li>
					</ul>
					<p>We agree on what is included, what it costs and what you need to provide before work begins.</p>
					<a href="#consultation-form">Tell us what you are starting <span aria-hidden="true">→</span></a>
				</aside>
			</div>
		</section>

		<section id="services" class="services-section section-wrap" aria-labelledby="services-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">What we help with</p>
					<h2 id="services-title">Start with the closest problem.</h2>
				</div>
				<p>You do not need to know the technical name. Choose what sounds most like the problem in front of you.</p>
			</div>

			<div class="services-grid">
				<a class="service-card" href={sitePath('/websites/')}>
					<div class="service-topline"><span>01</span><small>New or outdated website</small></div>
					<div>
						<h3>I need a website</h3>
						<p>A clear website that works on phones and helps customers understand what you do and contact you.</p>
					</div>
					<strong>See website options <span aria-hidden="true">→</span></strong>
				</a>

				<a class="service-card" href={sitePath('/business-it/')}>
					<div class="service-topline"><span>02</span><small>Email, devices and Wi-Fi</small></div>
					<div>
						<h3>Computers, email or Wi-Fi</h3>
						<p>Business email, Windows computers, accounts and Wi-Fi set up so your team can get on with work.</p>
					</div>
					<strong>See business IT help <span aria-hidden="true">→</span></strong>
				</a>

				<a class="service-card" href={sitePath('/security/')}>
					<div class="service-topline"><span>03</span><small>Accounts and recovery</small></div>
					<div>
						<h3>I want to protect the business</h3>
						<p>Stronger sign-in, safer staff access, automatic updates and checks that you can recover important accounts.</p>
					</div>
					<strong>See security help <span aria-hidden="true">→</span></strong>
				</a>
			</div>
		</section>

		<section class="trust-strip" aria-label="What to expect from Servo ICT">
			<div><span>Based in</span><strong>Gippsland</strong></div>
			<div><span>How we work</span><strong>Remote, with local visits</strong></div>
			<div><span>Before work starts</span><strong>Scope and cost agreed</strong></div>
			<div><span>After setup</span><strong>Clear handover</strong></div>
		</section>

		<section class="proof-section section-wrap" aria-label="A recent Servo ICT project">
			<WorkExample {baseUrl} compact />
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner">
				<div class="process-heading"><p class="section-kicker section-kicker-light">How it works</p><h2 id="process-title">We handle the technical parts.</h2></div>
				<ol class="process-steps">
					<li><span>01</span><div><h3>Tell us what is getting in the way</h3><p>A rough description is enough. You do not need to diagnose the problem first.</p></div></li>
					<li><span>02</span><div><h3>Agree on the work and cost</h3><p>You receive a clear scope, price and timing before any work begins.</p></div></li>
					<li><span>03</span><div><h3>We set it up and show you what matters</h3><p>We complete the agreed work, test it and leave you with clear next steps.</p></div></li>
				</ol>
			</div>
		</section>

		<section id="about" class="about-section section-wrap" aria-labelledby="about-title">
			<div class="about-card">
				<div class="about-mark"><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="82" height="82" /></div>
				<div><span>Rowan Paterson</span><strong>Owner and operator</strong></div>
			</div>
			<div class="about-copy">
				<p class="section-kicker">About Servo ICT</p>
				<h2 id="about-title">Clear advice. Accountable delivery.</h2>
				<p>Servo ICT is a Gippsland business owned and operated by Rowan Paterson, delivering websites and practical technology projects for small businesses across Victoria.</p>
				<details class="about-experience"><summary>Experience behind the work</summary><p>Rowan brings cybersecurity experience, Microsoft Fundamentals training and Microsoft Azure consulting experience. That background informs practical setups, with documentation and optional check-ins after handover.</p></details>
				<ul class="about-points"><li>One point of contact</li><li>Scope agreed before work starts</li><li>Clear handover and next steps</li></ul>
			</div>
		</section>

		<section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title">
			<div class="contact-intro">
				<p class="section-kicker">Start here</p>
				<h2 id="contact-title">Tell us what needs to work.</h2>
				<p class="contact-copy">Share a rough description of the problem or what you are starting. You do not need to know the technical name. We'll reply by email to confirm whether we can help and arrange a conversation.</p>
				<div class="contact-details"><a href="mailto:support@servoict.com">support@servoict.com</a><a href="tel:0341488665">(03) 4148 8665</a></div>
				<p class="response-note">We aim to reply within two business days. Phone hours are Monday, Tuesday and Friday, 9am to 4pm. Work is usually remote, with local visits by arrangement.</p>
			</div>

			<form id="consultation-form" class="consultation-form" method="post" action={consultationMode === 'email' ? `mailto:${consultationRecipient}?subject=Project%20enquiry` : sitePath('/api/consultation')} onsubmit={submitConsultation} oninput={clearCopyFeedback}>
				<div class="form-heading"><div><p>A rough description is enough</p><span>Four short fields and one optional field</span></div><span>Fields marked * are required</span></div>
				<p class="form-delivery-note">{consultationMode === 'email' ? 'The button opens a ready-to-send email. Review it, then press Send in your email app.' : 'Send your details here. We\'ll reply by email to confirm whether we can help.'}</p>
				<noscript><p class="no-js-note">If this form cannot prepare your enquiry, email <a href="mailto:support@servoict.com">support@servoict.com</a> or call <a href="tel:0341488665">(03) 4148 8665</a>.</p></noscript>
				<div class="form-grid">
					<label><span>Your name *</span><input type="text" name="name" autocomplete="name" maxlength="100" aria-invalid={fieldErrors.name ? 'true' : undefined} required />{#if fieldErrors.name}<small class="field-error">{fieldErrors.name}</small>{/if}</label>
					<label><span>Email *</span><input type="email" name="email" autocomplete="email" maxlength="254" aria-invalid={fieldErrors.email ? 'true' : undefined} required />{#if fieldErrors.email}<small class="field-error">{fieldErrors.email}</small>{/if}</label>
					<label><span>Organisation <small>Optional</small></span><input type="text" name="organisation" autocomplete="organization" maxlength="120" aria-invalid={fieldErrors.organisation ? 'true' : undefined} />{#if fieldErrors.organisation}<small class="field-error">{fieldErrors.organisation}</small>{/if}</label>
					<label><span>What do you need help with? *</span><select bind:this={serviceSelect} name="service" aria-invalid={fieldErrors.service ? 'true' : undefined} required><option value="">Choose the closest option</option><option value="website">A new or better website</option><option value="technology">Computers, email, accounts or Wi-Fi</option><option value="security">Account security or recovery</option><option value="consulting">Advice on a technology decision</option><option value="other">I am not sure yet</option></select>{#if fieldErrors.service}<small class="field-error">{fieldErrors.service}</small>{/if}</label>
					<label class="full-field"><span>What would you like us to sort out? *</span><textarea name="message" rows="5" minlength="20" maxlength="2000" aria-invalid={fieldErrors.message ? 'true' : undefined} placeholder="For example: We are opening next month and need a website and business email." required></textarea>{#if fieldErrors.message}<small class="field-error">{fieldErrors.message}</small>{/if}</label>
				</div>
				<label class="honeypot" aria-hidden="true">Company website<input type="text" name="companyWebsite" tabindex="-1" autocomplete="off" /></label>
				{#if consultationMode === 'server' && turnstileSiteKey}<div class="cf-turnstile" data-sitekey={turnstileSiteKey} data-action="consultation" data-theme="light"></div>{/if}
				<div class="form-submit-row">
					<div class="form-buttons">
						<button class="button button-primary contact-button" type="submit" disabled={formState === 'submitting'}>{formState === 'submitting' ? 'Sending…' : consultationMode === 'email' ? 'Open ready-to-send email' : 'Send enquiry'}<span aria-hidden="true">→</span></button>
						<button class="button button-secondary copy-button" type="button" disabled={formState === 'submitting'} onclick={copyConsultation}>Copy instead</button>
					</div>
					<p class="copy-help">{consultationMode === 'email' ? 'Use Copy instead if no email app opens.' : 'If sending fails, copy your enquiry and paste it into your email service.'}</p>
					<p class:form-success={formState === 'success'} class:form-error={formState === 'error'} class="form-status" role="status" aria-live="polite">{formMessage}</p>
				</div>
				<p class:form-success={copyState === 'success'} class:form-error={copyState === 'error'} class="copy-status" role="status" aria-live="polite">{copyMessage}</p>
				{#if copyState === 'error'}
					<label class="manual-copy"><span>Prepared enquiry</span><textarea rows="10" readonly value={manualCopyText} aria-describedby="manual-copy-help" onfocus={(event) => event.currentTarget.select()}></textarea></label>
					<p id="manual-copy-help" class="manual-copy-help">Select all, copy, and paste this into an email. The recipient and subject are included.</p>
				{/if}
				<p class="confirmation-note"><span>Do not include passwords or sensitive customer information.</span><a href={sitePath('/privacy/')}>Read the privacy notice</a></p>
			</form>
		</section>
	</main>

	<footer>
		<div class="footer-brand-block"><a class="brand footer-brand" href="#top" aria-label="Servo ICT home"><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" /><span>Servo ICT</span></a><p>Websites and technology projects for small business.</p></div>
		<nav class="footer-nav" aria-label="Footer navigation"><a href="#about">About</a><a href={sitePath('/websites/')}>Websites</a><a href={sitePath('/business-it/')}>Business IT</a><a href={sitePath('/security/')}>Security</a><a href={sitePath('/blog/')}>Blog</a><a href={sitePath('/privacy/')}>Privacy</a></nav>
		<div class="footer-contact"><a href="mailto:support@servoict.com">support@servoict.com</a><a href="tel:0341488665">(03) 4148 8665</a><span>© {new Date().getFullYear()} Servo ICT</span></div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		font-family: "Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		font-synthesis: none;
	}
	:global(body) {
		background: #f7f3ec;
		color: #242126;
		font-family: inherit;
		line-height: 1.5;
		text-rendering: optimizeLegibility;
	}
	:global(button), :global(input), :global(select), :global(textarea) { font: inherit; }
	:global(a) { color: inherit; }
	:global(button), :global(a) { -webkit-tap-highlight-color: transparent; }
	:global(:focus-visible) { outline: 3px solid #a82461; outline-offset: 4px; }

	.page-shell {
		--ink: #242126;
		--paper: #f7f3ec;
		--white: #fffdfa;
		--coral: #f27ab5;
		--coral-dark: #a82461;
		--mint: #c5eddc;
		--muted: #625e66;
		--line: #cbc5bc;
		min-height: 100vh;
		overflow: hidden;
		background: var(--paper);
		color: var(--ink);
	}
	.skip-link {
		position: fixed;
		z-index: 100;
		top: 0.75rem;
		left: 0.75rem;
		padding: 0.75rem 1rem;
		transform: translateY(-200%);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--white);
		box-shadow: 4px 4px 0 var(--ink);
		font-weight: 800;
	}
	.skip-link:focus { transform: translateY(0); }

	.site-header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		width: min(100% - 5rem, 1450px);
		margin: 0 auto;
		padding: 1.15rem 0;
	}
	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.02rem;
		font-weight: 780;
		letter-spacing: -0.02em;
		text-decoration: none;
	}
	.brand img {
		width: 2.4rem;
		height: 2.4rem;
		filter: grayscale(1) contrast(1.3);
	}
	.site-header nav {
		display: flex;
		justify-content: center;
		gap: clamp(1.25rem, 3vw, 2.5rem);
	}
	.site-header nav a {
		display: inline-flex;
		align-items: center;
		min-height: 2.75rem;
		font-size: 0.84rem;
		font-weight: 700;
		text-decoration: none;
	}
	.site-header nav a:hover { text-decoration: underline 3px var(--coral); text-underline-offset: 0.35rem; }
	.header-cta, .button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.2rem;
		font-weight: 780;
		text-decoration: none;
		transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease;
	}
	.header-cta {
		min-height: 2.75rem;
		padding: 0.7rem 1.15rem;
		border: 2px solid var(--ink);
		background: var(--white);
		box-shadow: 4px 4px 0 var(--ink);
		font-size: 0.8rem;
	}
	.header-cta:hover {
		transform: translate(-2px, -2px);
		background: var(--coral);
		box-shadow: 6px 6px 0 var(--ink);
	}
	.header-cta:active { transform: translate(2px, 2px); box-shadow: 2px 2px 0 var(--ink); }
	.menu-button { display: none; }

	.hero {
		border-block: 2px solid var(--ink);
		background: var(--white);
	}
	.hero-inner {
		display: grid;
		grid-template-columns: minmax(0, 1.06fr) minmax(22rem, 0.94fr);
		align-items: stretch;
		gap: clamp(2rem, 4vw, 4.5rem);
		width: min(100% - 5rem, 1450px);
		margin-inline: auto;
		padding-block: clamp(3.5rem, 6vw, 6rem);
	}
	.hero-copy {
		align-self: center;
		min-width: 0;
	}
	.eyebrow, .section-kicker {
		margin: 0 0 1.15rem;
		color: var(--coral-dark);
		font-size: 0.72rem;
		font-weight: 850;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	h1 {
		max-width: 11.5ch;
		margin: 0;
		font-size: clamp(3.5rem, 6.2vw, 6rem);
		font-weight: 820;
		line-height: 0.97;
		letter-spacing: -0.062em;
	}
	h1 em {
		color: inherit;
		font: inherit;
		text-decoration: underline;
		text-decoration-color: var(--coral);
		text-decoration-thickness: 0.11em;
		text-underline-offset: 0.08em;
	}
	.hero-intro {
		max-width: 35rem;
		margin: 1.75rem 0 0;
		color: var(--muted);
		font-size: clamp(1.02rem, 1.5vw, 1.18rem);
		line-height: 1.65;
	}
	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem 1.75rem;
		margin-top: 2rem;
	}
	.button {
		min-height: 3.45rem;
		padding: 0.9rem 1.4rem;
		font-size: 0.86rem;
	}
	.button-primary {
		gap: 1.2rem;
		border: 2px solid var(--ink);
		background: var(--ink);
		color: var(--white);
		box-shadow: 5px 5px 0 var(--coral);
	}
	.button-primary:hover {
		transform: translate(-2px, -2px);
		box-shadow: 7px 7px 0 var(--coral);
	}
	.button-primary:active { transform: translate(3px, 3px); box-shadow: 2px 2px 0 var(--coral); }
	.text-link {
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		min-height: 2.75rem;
		border-bottom: 2px solid currentColor;
		font-size: 0.8rem;
		font-weight: 800;
		text-decoration: none;
	}
	.text-link:hover { border-bottom-width: 4px; }

	.starter-panel {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: clamp(2rem, 4vw, 4rem);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--coral);
		box-shadow: 9px 9px 0 var(--ink);
	}
	.starter-kicker {
		margin: 0 0 1rem;
		font-size: 0.72rem;
		font-weight: 850;
		letter-spacing: 0.13em;
		text-transform: uppercase;
	}
	.starter-panel h2 {
		max-width: 9ch;
		margin: 0;
		font-size: clamp(2.4rem, 4vw, 4.1rem);
		line-height: 0.98;
		letter-spacing: -0.052em;
	}
	.starter-panel ul {
		margin: 2rem 0 0;
		padding: 0;
		border-top: 2px solid var(--ink);
		list-style: none;
	}
	.starter-panel li {
		display: grid;
		grid-template-columns: 2rem 1fr;
		gap: 1rem;
		padding: 0.85rem 0;
		border-bottom: 1px solid rgb(36 33 38 / 48%);
	}
	.starter-panel li span {
		padding-top: 0.14rem;
		font-size: 0.68rem;
		font-weight: 850;
	}
	.starter-panel li strong {
		font-size: clamp(1rem, 1.7vw, 1.3rem);
		letter-spacing: -0.02em;
	}
	.starter-panel > p:not(.starter-kicker) {
		margin: 1.5rem 0 0;
		font-size: 0.86rem;
		line-height: 1.65;
	}
	.starter-panel > a {
		align-self: flex-start;
		display: inline-flex;
		gap: 1rem;
		margin-top: 1.15rem;
		padding-bottom: 0.2rem;
		border-bottom: 2px solid currentColor;
		font-size: 0.8rem;
		font-weight: 850;
		text-decoration: none;
	}
	.starter-panel > a:hover { border-bottom-width: 4px; }

	.section-wrap { width: min(100% - 3rem, 1220px); margin-inline: auto; }
	.services-section { padding-block: clamp(5.5rem, 9vw, 8rem); }
	.section-heading {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
		align-items: end;
		gap: clamp(2rem, 8vw, 7rem);
		margin-bottom: clamp(3rem, 6vw, 4.5rem);
	}
	.section-heading h2, .about-copy h2, .contact-section h2 {
		margin: 0;
		font-size: clamp(2.3rem, 4.6vw, 4.25rem);
		line-height: 1.02;
		letter-spacing: -0.048em;
	}
	.section-heading > p {
		margin: 0;
		color: var(--muted);
		font-size: 1rem;
		line-height: 1.75;
	}
	.services-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.5rem;
	}
	.service-card {
		display: flex;
		min-height: 22rem;
		flex-direction: column;
		padding: clamp(1.5rem, 2.6vw, 2rem);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--white);
		box-shadow: 6px 6px 0 var(--ink);
		text-decoration: none;
		transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
	}
	.service-card:hover {
		transform: translate(-3px, -3px);
		background: #fff5fa;
		box-shadow: 9px 9px 0 var(--ink);
	}
	.service-card:active { transform: translate(4px, 4px); box-shadow: 2px 2px 0 var(--ink); }
	.service-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.66rem;
		font-weight: 850;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}
	.service-topline > span {
		display: grid;
		width: 2.25rem;
		height: 2.25rem;
		place-items: center;
		border: 2px solid var(--ink);
		background: var(--coral);
		font-size: 0.72rem;
		letter-spacing: 0;
	}
	.service-topline small { max-width: 14rem; font: inherit; text-align: right; }
	.service-card > div:nth-child(2) { margin-top: auto; padding-top: 3.5rem; }
	.service-card h3 {
		margin: 0;
		font-size: clamp(1.75rem, 2.8vw, 2.6rem);
		line-height: 1.03;
		letter-spacing: -0.045em;
	}
	.service-card p { margin: 1.25rem 0 0; color: var(--muted); font-size: 0.92rem; line-height: 1.65; }
	.service-card > strong {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 1.75rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--ink);
		font-size: 0.8rem;
	}
	.service-card > strong span { font-size: 1.4rem; line-height: 1; }

	.trust-strip {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		padding-inline: max(1.5rem, calc((100vw - 1220px) / 2));
		background: var(--ink);
		color: var(--white);
	}
	.trust-strip div {
		display: grid;
		align-content: center;
		min-height: 6.5rem;
		padding: 1.25rem clamp(1rem, 2vw, 2rem);
		border-right: 1px solid rgb(255 255 255 / 22%);
	}
	.trust-strip div:first-child { padding-left: 0; }
	.trust-strip div:last-child { border-right: 0; }
	.trust-strip span {
		color: var(--mint);
		font-size: 0.66rem;
		font-weight: 850;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}
	.trust-strip strong {
		margin-top: 0.25rem;
		font-size: clamp(1.05rem, 1.8vw, 1.45rem);
		line-height: 1.15;
		letter-spacing: -0.025em;
	}

	.proof-section { padding-block: clamp(5rem, 8vw, 7rem); }

	.process-section {
		padding: clamp(5.5rem, 9vw, 8rem) max(1.5rem, calc((100vw - 1220px) / 2));
		background: var(--ink);
		color: var(--white);
	}
	.process-inner {
		display: grid;
		grid-template-columns: minmax(0, 0.82fr) minmax(24rem, 1.18fr);
		gap: clamp(3rem, 9vw, 8rem);
	}
	.section-kicker-light { color: var(--coral); }
	.process-heading h2 {
		max-width: 10ch;
		margin: 0;
		font-size: clamp(2.5rem, 5vw, 4.5rem);
		line-height: 1.02;
		letter-spacing: -0.048em;
	}
	.process-steps { margin: 0; padding: 0; list-style: none; }
	.process-steps li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		padding: 0 0 2rem;
		border-bottom: 1px solid rgb(255 255 255 / 18%);
	}
	.process-steps li + li { padding-top: 2rem; }
	.process-steps > li > span { color: var(--coral); font-size: 0.7rem; font-weight: 850; }
	.process-steps h3 { margin: 0; font-size: 1.15rem; letter-spacing: -0.02em; }
	.process-steps p {
		max-width: 34rem;
		margin: 0.65rem 0 0;
		color: rgb(255 253 250 / 72%);
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.about-section {
		display: grid;
		grid-template-columns: minmax(19rem, 0.8fr) minmax(0, 1.2fr);
		align-items: center;
		gap: clamp(3rem, 8vw, 7rem);
		padding-block: clamp(5.5rem, 9vw, 8rem);
	}
	.about-card {
		display: flex;
		min-height: 19rem;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(2rem, 4vw, 3.25rem);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--mint);
		box-shadow: 8px 8px 0 var(--ink);
	}
	.about-mark {
		display: grid;
		width: 5.5rem;
		height: 5.5rem;
		place-items: center;
		border: 2px solid var(--ink);
		border-radius: 50%;
		background: var(--white);
	}
	.about-mark img { width: 3.8rem; height: 3.8rem; }
	.about-card > div:last-child { display: grid; gap: 0.3rem; }
	.about-card span {
		font-size: 0.7rem;
		font-weight: 850;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.about-card strong {
		max-width: 8ch;
		font-size: clamp(2rem, 4vw, 3.35rem);
		line-height: 1.02;
		letter-spacing: -0.045em;
	}
	.about-copy > p:not(.section-kicker) {
		max-width: 43rem;
		margin: 1.4rem 0 0;
		color: var(--muted);
		font-size: 0.98rem;
		line-height: 1.75;
	}
	.about-experience { margin-top: 1.5rem; border-block: 1px solid var(--line); }
	.about-experience summary { padding: 1rem 0; cursor: pointer; font-weight: 750; }
	.about-experience p { margin: 0 0 1rem; color: var(--muted); line-height: 1.7; }
	.about-points {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0;
		margin: 2rem 0 0;
		padding: 1.2rem 0 0;
		border-top: 1px solid var(--line);
		list-style: none;
	}
	.about-points li { padding-right: 1rem; font-size: 0.74rem; font-weight: 760; line-height: 1.45; }

	.contact-section {
		display: grid;
		grid-template-columns: minmax(17rem, 0.72fr) minmax(0, 1.28fr);
		gap: clamp(2.5rem, 6vw, 5rem);
		margin-bottom: clamp(4rem, 8vw, 7rem);
		padding: clamp(1.75rem, 4vw, 3.5rem);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--mint);
		box-shadow: 8px 8px 0 var(--ink);
	}
	.contact-section .section-kicker { color: var(--ink); }
	.contact-intro { align-self: start; padding: clamp(0.5rem, 2vw, 1.25rem) 0; }
	.contact-copy { margin: 1.8rem 0 0; line-height: 1.7; }
	.contact-details { display: flex; flex-wrap: wrap; gap: 0.65rem 1.25rem; margin-top: 2rem; }
	.contact-details a {
		display: inline-flex;
		align-items: center;
		min-height: 2.5rem;
		font-size: 0.78rem;
		font-weight: 780;
		text-underline-offset: 0.2rem;
	}
	.response-note { margin: 1.5rem 0 0; font-size: 0.74rem; font-weight: 700; line-height: 1.55; }
	.consultation-form {
		padding: clamp(1.4rem, 3vw, 2.4rem);
		border: 2px solid var(--ink);
		border-radius: 0.2rem;
		background: var(--white);
		box-shadow: 6px 6px 0 var(--ink);
	}
	.form-heading {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.7rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--line);
	}
	.form-heading > div { display: grid; gap: 0.25rem; }
	.form-heading p { margin: 0; font-size: 1.05rem; font-weight: 850; }
	.form-heading span { color: var(--muted); font-size: 0.7rem; }
	.form-delivery-note, .no-js-note {
		margin: -0.35rem 0 1.5rem;
		padding: 0.8rem 0.9rem;
		border-left: 4px solid var(--coral);
		background: #fff2f8;
		color: #504b52;
		font-size: 0.76rem;
		line-height: 1.55;
	}
	.no-js-note { margin-top: 0; border-left-color: var(--ink); background: var(--paper); }
	.no-js-note a { font-weight: 760; text-underline-offset: 0.18rem; }
	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.15rem 1rem;
	}
	.form-grid > label { display: grid; align-content: start; gap: 0.45rem; }
	.form-grid label > span { font-size: 0.72rem; font-weight: 800; }
	.form-grid label > span small { color: var(--muted); font: inherit; font-weight: 600; }
	.consultation-form input, .consultation-form select, .consultation-form textarea {
		width: 100%;
		min-width: 0;
		min-height: 3rem;
		padding: 0.75rem 0.85rem;
		border: 1px solid #a9a39b;
		border-radius: 0.2rem;
		outline: none;
		background: var(--paper);
		color: var(--ink);
		font-size: 0.86rem;
		transition: border-color 140ms ease, box-shadow 140ms ease;
	}
	.consultation-form textarea { min-height: 8rem; resize: vertical; line-height: 1.5; }
	.consultation-form input:focus, .consultation-form select:focus, .consultation-form textarea:focus {
		border-color: var(--ink);
		box-shadow: 0 0 0 3px rgb(242 122 181 / 35%);
	}
	.consultation-form [aria-invalid="true"] { border-color: #a32626; }
	.full-field { grid-column: 1 / -1; }
	.field-error { color: #982626; font-size: 0.72rem; line-height: 1.4; }
	.honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
	.cf-turnstile { margin-top: 1rem; }
	.form-submit-row { display: grid; gap: 0.75rem; margin-top: 1.3rem; }
	.form-buttons { display: flex; flex-wrap: wrap; gap: 0.7rem; }
	.contact-button { flex: 0 0 auto; min-width: 14rem; cursor: pointer; }
	.button-secondary {
		border: 1px solid var(--ink);
		background: transparent;
		color: var(--ink);
		box-shadow: none;
		cursor: pointer;
	}
	.button-secondary:hover { transform: none; background: var(--paper); }
	.form-buttons button:disabled { cursor: wait; opacity: 0.65; transform: none; }
	.copy-help { margin: 0; color: var(--muted); font-size: 0.72rem; line-height: 1.45; }
	.form-status { margin: 0; color: var(--muted); font-size: 0.73rem; font-weight: 700; line-height: 1.4; }
	.form-success { color: #1e6d42; }
	.form-error { color: #982626; }
	.copy-status { margin: 0.75rem 0 0; font-size: 0.73rem; font-weight: 700; line-height: 1.45; }
	.form-status:empty, .copy-status:empty { display: none; }
	.manual-copy { display: grid; gap: 0.45rem; margin-top: 1rem; }
	.manual-copy > span { font-size: 0.72rem; font-weight: 800; }
	.manual-copy textarea { min-height: 12rem; font-family: ui-monospace, SFMono-Regular, Consolas, monospace; font-size: 0.75rem; }
	.manual-copy-help { margin: 0.5rem 0 0; color: var(--muted); font-size: 0.7rem; line-height: 1.45; }
	.confirmation-note {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem 0.75rem;
		margin: 1rem 0 0;
		padding-top: 0.9rem;
		border-top: 1px solid var(--line);
		color: var(--muted);
		font-size: 0.72rem;
		line-height: 1.45;
	}
	.confirmation-note a { font-weight: 800; text-underline-offset: 0.18rem; }

	footer {
		display: grid;
		grid-template-columns: minmax(15rem, 1fr) auto minmax(15rem, 1fr);
		align-items: start;
		gap: clamp(2rem, 5vw, 5rem);
		width: min(100% - 3rem, 1220px);
		margin: 0 auto;
		padding: 2.5rem 0 3rem;
		border-top: 2px solid var(--ink);
		color: var(--muted);
		font-size: 0.75rem;
	}
	.footer-brand { color: var(--ink); }
	.footer-brand-block p { max-width: 20rem; margin: 1rem 0 0; }
	.footer-nav { display: grid; grid-template-columns: repeat(2, auto); gap: 0.75rem 2rem; }
	.footer-nav a, .footer-contact a { min-height: 1.75rem; font-weight: 720; text-decoration: none; }
	.footer-nav a:hover, .footer-contact a:hover { color: var(--ink); text-decoration: underline 2px var(--coral); }
	.footer-contact { display: grid; justify-items: end; gap: 0.5rem; }
	.footer-contact span { margin-top: 0.5rem; }

	@media (max-width: 1100px) {
		.site-header { grid-template-columns: auto auto 1fr; }
		.site-header nav {
			position: absolute;
			z-index: 10;
			top: 5.1rem;
			left: 1.5rem;
			display: none;
			width: calc(100% - 3rem);
			flex-direction: column;
			gap: 0;
			padding: 0.8rem;
			border: 2px solid var(--ink);
			border-radius: 0.2rem;
			background: var(--paper);
			box-shadow: 6px 6px 0 var(--ink);
		}
		.site-header nav.open { display: flex; }
		.site-header nav a { padding: 0.85rem; }
		.menu-button {
			display: grid;
			width: 2.75rem;
			height: 2.75rem;
			place-content: center;
			gap: 0.35rem;
			border: 2px solid var(--ink);
			border-radius: 0.2rem;
			background: transparent;
			cursor: pointer;
		}
		.menu-button span { display: block; width: 1rem; height: 1.5px; background: var(--ink); }
		.header-cta { justify-self: end; }
		.section-heading, .process-inner, .about-section, .contact-section { grid-template-columns: 1fr; }
		.trust-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.trust-strip div:nth-child(2) { border-right: 0; }
		.trust-strip div:nth-child(-n + 2) { border-bottom: 1px solid rgb(255 255 255 / 22%); }
		.trust-strip div:first-child, .trust-strip div:nth-child(3) { padding-left: 0; }
		.services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.service-card:last-child { grid-column: 1 / -1; }
		.contact-intro { max-width: 42rem; }
		footer { grid-template-columns: 1fr 1fr; }
		.footer-contact { grid-column: 2; justify-items: end; }
	}
	@media (max-width: 900px) {
		.hero-inner { grid-template-columns: minmax(0, 1fr); gap: 3rem; }
		h1 { max-width: 12ch; font-size: clamp(3.5rem, 8.5vw, 5.5rem); }
		.hero-intro { max-width: 38rem; }
		.starter-panel h2 { max-width: 13ch; }
	}
	@media (max-width: 620px) {
		.site-header, .hero-inner, .section-wrap, footer { width: min(100% - 2rem, 1220px); }
		.site-header { gap: 0.6rem; }
		.brand span { display: none; }
		.header-cta { padding-inline: 0.8rem; font-size: 0.7rem; }
		.site-header nav { left: 1rem; width: calc(100% - 2rem); }
		.hero-inner { gap: 2.5rem; padding-block: 2.75rem 3.25rem; }
		h1 { max-width: 12ch; font-size: clamp(2.65rem, 12.2vw, 4rem); }
		.hero-actions { align-items: stretch; flex-direction: column; }
		.button { width: 100%; }
		.hero-link { align-self: flex-start; }
		.starter-panel { padding: 1.5rem; box-shadow: 6px 6px 0 var(--ink); }
		.starter-panel h2 { font-size: clamp(2.25rem, 11vw, 3.2rem); }
		.trust-strip { padding-inline: 1rem; }
		.trust-strip div { min-height: 7rem; padding: 1.1rem; }
		.trust-strip strong { font-size: 1.02rem; }
		.services-section { padding-block: 5rem; }
		.services-grid, .about-points { grid-template-columns: 1fr; }
		.form-grid { grid-template-columns: minmax(0, 1fr); }
		.service-card, .service-card:last-child { grid-column: auto; min-height: 0; padding: 1.5rem; }
		.service-card > div:nth-child(2) { margin-top: 2.5rem; padding-top: 0; }
		.proof-section { padding-block: 4.5rem; }
		.process-section { padding: 5rem 1rem; }
		.process-steps li { gap: 1rem; }
		.about-section { padding-block: 5rem; }
		.about-card { min-height: 20rem; }
		.about-points { gap: 0.75rem; }
		.about-points li { padding: 0 0 0.75rem; border-bottom: 1px solid var(--line); }
		.contact-section { padding: 2rem 1.25rem; box-shadow: 6px 6px 0 var(--ink); }
		.consultation-form, .form-grid > label { min-width: 0; }
		.form-heading { align-items: stretch; flex-direction: column; }
		.form-buttons { flex-direction: column; }
		.form-buttons button { min-width: 0; max-width: 100%; white-space: normal; }
		.full-field { grid-column: auto; }
		footer { grid-template-columns: 1fr; }
		.footer-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.footer-contact { grid-column: auto; justify-items: start; }
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html) { scroll-behavior: auto; }
		.header-cta, .button, .service-card { transition: none; }
		.header-cta:hover, .header-cta:active, .button:hover, .button:active, .service-card:hover, .service-card:active { transform: none; }
	}
</style>
