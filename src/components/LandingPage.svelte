<script lang="ts">
	import { buildConsultationMailto } from '../lib/consultationEmail';

	let {
		turnstileSiteKey = '',
		consultationMode = 'server',
		baseUrl = '/'
	}: { turnstileSiteKey?: string; consultationMode?: 'server' | 'email'; baseUrl?: string } = $props();
	let menuOpen = $state(false);
	let formState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let formMessage = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let visitorTimezone = $state('Australia/Melbourne');
	let minimumDate = $state('');

	interface ConsultationResponse {
		ok: boolean;
		message: string;
		fieldErrors?: Record<string, string>;
	}

	const closeMenu = () => {
		menuOpen = false;
	};

	const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;

	$effect(() => {
		visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Australia/Melbourne';
		const now = new Date();
		const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
		minimumDate = localDate.toISOString().slice(0, 10);

		const requestState = new URLSearchParams(window.location.search).get('request');
		if (requestState === 'sent') {
			formState = 'success';
			formMessage = 'Thanks, your consultation request has been sent.';
		} else if (requestState === 'error') {
			formState = 'error';
			formMessage = 'Your request could not be sent. Please email support@servoict.com.';
		}
	});

	async function submitConsultation(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;

		if (consultationMode === 'email') {
			fieldErrors = {};
			formState = 'idle';
			formMessage = 'Opening an email draft. Review it, then press send in your email app.';
			window.location.href = buildConsultationMailto(new FormData(form));
			return;
		}

		formState = 'submitting';
		formMessage = 'Sending your request…';
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
				visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Australia/Melbourne';
			} else {
				const firstInvalidField = Object.keys(fieldErrors)[0];
				if (firstInvalidField) {
					(form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
				}
			}
		} catch {
			formState = 'error';
			formMessage = 'Your request could not be sent. Please email support@servoict.com.';
		} finally {
			const turnstile = (
				window as typeof window & { turnstile?: { reset: () => void } }
			).turnstile;
			turnstile?.reset();
		}
	}
</script>

<div class="page-shell">
	<header class="site-header">
		<a class="brand" href="#top" aria-label="Servo ICT home" onclick={closeMenu}>
			<img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>

		<button
			class="menu-button"
			type="button"
			aria-label="Toggle navigation"
			aria-controls="site-navigation"
			aria-expanded={menuOpen}
			onclick={() => (menuOpen = !menuOpen)}
		>
			<span></span>
			<span></span>
		</button>

		<nav id="site-navigation" class:open={menuOpen} aria-label="Main navigation">
			<a href="#services" onclick={closeMenu}>Project work</a>
			<a href="#process" onclick={closeMenu}>How it works</a>
			<a href="#blog" onclick={closeMenu}>Blog</a>
			<a href="#about" onclick={closeMenu}>About</a>
			<a href="#contact" onclick={closeMenu}>Contact</a>
		</nav>

		<a
			class="header-cta"
			href="#consultation-form"
		>
			Start a project
		</a>
	</header>

	<main id="top">
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow">Websites and IT for small business</p>
				<h1 id="hero-title">Technology that <em>just works.</em></h1>
				<p class="hero-intro">
					Servo ICT plans, builds and looks after the websites and systems behind small businesses
					across Gippsland and Victoria.
				</p>

				<div class="hero-actions">
					<a
						class="button button-primary"
						href="#consultation-form"
					>
						Start a project <span aria-hidden="true">→</span>
					</a>
					<a class="hero-link" href="#services">See what we do</a>
				</div>
			</div>

			<figure class="hero-visual">
				<img
					src={sitePath('/images/servo-business-technology.webp')}
					alt="Two small-business owners reviewing their website on a laptop in their workshop"
					width="1448"
					height="1086"
					fetchpriority="high"
				/>
			</figure>
		</section>

		<section class="statement-band" aria-label="Our approach">
			<p>Useful technology. One person accountable.</p>
		</section>

		<section id="services" class="services-section section-wrap" aria-labelledby="services-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">What we do</p>
					<h2 id="services-title">What needs to work better?</h2>
				</div>
				<p>
					Bring us the outcome you need. We will work out the technical details and see the project
					through.
				</p>
			</div>

			<div class="services-grid">
				<article class="service-card">
					<div class="service-topline">
						<span class="service-number">01</span>
					</div>
					<h3>Websites</h3>
					<p>
						New sites, rebuilds and improvements that explain your business and make it easier for
						customers to act.
					</p>
				</article>

				<article class="service-card">
					<div class="service-topline">
						<span class="service-number">02</span>
					</div>
					<h3>Business IT</h3>
					<p>
						Clean setups and careful migrations for email, accounts, devices, domains and the tools
						your team uses each day.
					</p>
				</article>

				<article class="service-card">
					<div class="service-topline">
						<span class="service-number">03</span>
					</div>
					<h3>Security</h3>
					<p>
						Practical fixes for exposed accounts, neglected updates and backups you cannot trust.
					</p>
				</article>
			</div>

			<a class="text-link services-link" href="#consultation-form">Talk about your project <span aria-hidden="true">→</span></a>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner">
				<div class="process-heading">
					<p class="section-kicker section-kicker-light">How it works</p>
					<h2 id="process-title">Clear from start to finish.</h2>
				</div>

				<ol class="process-steps">
					<li>
						<span>01</span>
						<div>
							<h3>Agree on the result</h3>
							<p>We set the scope, budget and timing.</p>
						</div>
					</li>
					<li>
						<span>02</span>
						<div>
							<h3>Do the work</h3>
							<p>We build, test and keep you informed.</p>
						</div>
					</li>
					<li>
						<span>03</span>
						<div>
							<h3>Hand it over</h3>
							<p>You get a working result and a clear support plan.</p>
						</div>
					</li>
				</ol>
			</div>
		</section>

		<section id="blog" class="guides-section section-wrap" aria-labelledby="blog-title">
			<div class="guides-heading">
				<div>
					<p class="section-kicker">From the blog</p>
					<h2 id="blog-title">Straight answers for common technology problems.</h2>
				</div>
				<div class="guides-intro">
					<p>
						Practical notes on accounts, devices and the systems your business relies on.
					</p>
					<a class="text-link" href={sitePath('/blog/')}>Browse all posts <span aria-hidden="true">→</span></a>
				</div>
			</div>

			<div class="guides-grid">
				<a
					class="guide-card guide-card-featured"
					href={sitePath('/simplifying-cyber-security-for-small-businesses/')}
				>
					<div class="guide-image">
						<img
							src={sitePath('/images/blog/cyber-security-basics.webp')}
							alt="Simplify your cyber security"
							width="1200"
							height="675"
							loading="lazy"
						/>
					</div>
					<div class="guide-copy">
						<span>Cyber security basics</span>
						<h3>Simplifying cyber security for small businesses</h3>
						<p>A plain-English way to decide what to protect first and which steps matter.</p>
						<strong>Read the post <span aria-hidden="true">→</span></strong>
					</div>
				</a>

				<a
					class="guide-card"
					href={sitePath('/3-key-steps-to-protect-your-business-accounts/')}
				>
					<div class="guide-image">
						<img
							src={sitePath('/images/blog/protect-business-accounts.webp')}
							alt="Business account security shown on a laptop"
							width="1200"
							height="675"
							loading="lazy"
						/>
					</div>
					<div class="guide-copy">
						<span>Account security</span>
						<h3>Three steps to protect your business accounts</h3>
						<strong>Read the post <span aria-hidden="true">→</span></strong>
					</div>
				</a>

				<a
					class="guide-card"
					href={sitePath('/use-cyber-security-to-grow-your-business/')}
				>
					<div class="guide-image">
						<img
							src={sitePath('/images/blog/business-resilience.webp')}
							alt="A laptop recovering from a system problem"
							width="1200"
							height="675"
							loading="lazy"
						/>
					</div>
					<div class="guide-copy">
						<span>Business resilience</span>
						<h3>Use cyber security practices to grow your business</h3>
						<strong>Read the post <span aria-hidden="true">→</span></strong>
					</div>
				</a>
			</div>
		</section>

		<section id="about" class="about-section section-wrap" aria-labelledby="about-title">
			<div class="about-statement">
				<span>You deal with the person doing the work.</span>
			</div>
			<div class="about-copy">
				<p class="section-kicker">About Servo ICT</p>
				<h2 id="about-title">One person. The whole project.</h2>
				<p>
					Rowan Paterson founded Servo ICT so small businesses could plan, build and look after
					their technology without juggling suppliers. Servo ICT is based in Gippsland and works
					across Victoria.
				</p>
			</div>
		</section>

		<section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title">
			<div class="contact-intro">
				<p class="section-kicker">Start with a free consultation</p>
				<h2 id="contact-title">What are you trying to build, fix, or move?</h2>
				<p class="contact-copy">
					Send the rough idea and suggest a time for a 30-minute call. Rowan will reply to confirm.
				</p>
				<div class="contact-details">
					<a href="mailto:support@servoict.com">support@servoict.com</a>
					<a href="tel:0341488665">(03) 4148 8665</a>
				</div>
			</div>

			<form
				id="consultation-form"
				class="consultation-form"
				method="post"
				action={consultationMode === 'email' ? 'mailto:support@servoict.com' : sitePath('/api/consultation')}
				onsubmit={submitConsultation}
			>
				<div class="form-heading">
					<p>Project consultation</p>
					<span>Fields marked * are required</span>
				</div>

				<div class="form-grid">
					<label>
						<span>Your name *</span>
						<input
							type="text"
							name="name"
							autocomplete="name"
							maxlength="100"
							aria-invalid={fieldErrors.name ? 'true' : undefined}
							required
						/>
						{#if fieldErrors.name}<small class="field-error">{fieldErrors.name}</small>{/if}
					</label>

					<label>
						<span>Email *</span>
						<input
							type="email"
							name="email"
							autocomplete="email"
							maxlength="254"
							aria-invalid={fieldErrors.email ? 'true' : undefined}
							required
						/>
						{#if fieldErrors.email}<small class="field-error">{fieldErrors.email}</small>{/if}
					</label>

					<label>
						<span>Organisation</span>
						<input
							type="text"
							name="organisation"
							autocomplete="organization"
							maxlength="120"
							aria-invalid={fieldErrors.organisation ? 'true' : undefined}
						/>
						{#if fieldErrors.organisation}<small class="field-error">{fieldErrors.organisation}</small>{/if}
					</label>

					<label>
						<span>Phone</span>
						<input
							type="tel"
							name="phone"
							autocomplete="tel"
							maxlength="50"
							aria-invalid={fieldErrors.phone ? 'true' : undefined}
						/>
						{#if fieldErrors.phone}<small class="field-error">{fieldErrors.phone}</small>{/if}
					</label>

					<label>
						<span>What can we help with? *</span>
						<select
							name="service"
							aria-invalid={fieldErrors.service ? 'true' : undefined}
							required
						>
							<option value="">Choose a service</option>
							<option value="website">Website design or development</option>
							<option value="technology">Business technology project</option>
							<option value="security">Secure setup or tidy-up</option>
							<option value="consulting">Technology consulting</option>
							<option value="other">Something else</option>
						</select>
						{#if fieldErrors.service}<small class="field-error">{fieldErrors.service}</small>{/if}
					</label>

					<label>
						<span>How would you like to talk? *</span>
						<select
							name="contactPreference"
							aria-invalid={fieldErrors.contactPreference ? 'true' : undefined}
							required
						>
							<option value="">Choose an option</option>
							<option value="phone">Phone call</option>
							<option value="video">Video call</option>
							<option value="either">Either works</option>
						</select>
						{#if fieldErrors.contactPreference}<small class="field-error">{fieldErrors.contactPreference}</small>{/if}
					</label>

					<fieldset class="time-fields">
						<legend>Preferred time *</legend>
						<label>
							<span>Date</span>
							<input
								type="date"
								name="preferredDate"
								min={minimumDate}
								aria-invalid={fieldErrors.preferredDate ? 'true' : undefined}
								required
							/>
						</label>
						<label>
							<span>Time</span>
							<input type="time" name="preferredTime" step="900" required />
						</label>
						{#if fieldErrors.preferredDate}<small class="field-error field-error-wide">{fieldErrors.preferredDate}</small>{/if}
					</fieldset>

					<fieldset class="time-fields">
						<legend>Alternate time <span>(optional)</span></legend>
						<label>
							<span>Date</span>
							<input
								type="date"
								name="alternateDate"
								min={minimumDate}
								aria-invalid={fieldErrors.alternateDate ? 'true' : undefined}
							/>
						</label>
						<label>
							<span>Time</span>
							<input type="time" name="alternateTime" step="900" />
						</label>
						{#if fieldErrors.alternateDate}<small class="field-error field-error-wide">{fieldErrors.alternateDate}</small>{/if}
					</fieldset>
					<p class="timezone-note full-field">
						Times are interpreted in {visitorTimezone.replaceAll('_', ' ')}.
					</p>

					<label class="full-field">
						<span>What would you like to build, change, or fix? *</span>
						<textarea
							name="message"
							rows="5"
							minlength="20"
							maxlength="2000"
							aria-invalid={fieldErrors.message ? 'true' : undefined}
							placeholder="A rough description is plenty. Tell us what needs to work and what is getting in the way."
							required
						></textarea>
						{#if fieldErrors.message}<small class="field-error">{fieldErrors.message}</small>{/if}
					</label>
				</div>

				<input type="hidden" name="timezone" value={visitorTimezone} />
				<label class="honeypot" aria-hidden="true">
					Company website
					<input type="text" name="companyWebsite" tabindex="-1" autocomplete="off" />
				</label>

				<label class="privacy-check">
					<input type="checkbox" name="privacy" required />
					<span>I agree that Servo ICT may use these details to respond to my request. *</span>
				</label>
				{#if fieldErrors.privacy}<small class="field-error">{fieldErrors.privacy}</small>{/if}

				{#if consultationMode === 'server' && turnstileSiteKey}
					<div
						class="cf-turnstile"
						data-sitekey={turnstileSiteKey}
						data-action="consultation"
						data-theme="light"
					></div>
				{/if}

				<div class="form-submit-row">
					<button
						class="button button-primary contact-button"
						type="submit"
						disabled={formState === 'submitting'}
					>
						{formState === 'submitting'
							? 'Sending…'
							: consultationMode === 'email'
								? 'Open email draft'
								: 'Send consultation request'}
						<span aria-hidden="true">→</span>
					</button>
					<p
						class:form-success={formState === 'success'}
						class:form-error={formState === 'error'}
						class="form-status"
						role="status"
						aria-live="polite"
					>
						{formMessage}
					</p>
				</div>
				<p class="confirmation-note">
					{consultationMode === 'email'
						? 'The form opens a draft in your email app. Your request is not sent until you send that email.'
						: 'Your requested time is not booked until Servo ICT confirms it by reply.'}
				</p>
			</form>
		</section>
	</main>

	<footer>
		<a class="brand footer-brand" href="#top" aria-label="Servo ICT home">
			<img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>
		<p>Websites and technology projects for small business.</p>
		<p class="footer-hours">Phone hours: Monday, Tuesday and Friday, 9am to 4pm.</p>
		<span>© {new Date().getFullYear()} Servo ICT</span>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
		font-family:
			"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
			"Segoe UI", sans-serif;
		font-synthesis: none;
	}

	:global(body) {
		background: #f4f2ec;
		color: #10103f;
		font-family: inherit;
		line-height: 1.5;
		text-rendering: optimizeLegibility;
	}

	:global(button),
	:global(input),
	:global(select),
	:global(textarea) {
		font: inherit;
	}

	:global(a) {
		color: inherit;
	}

	:global(button),
	:global(a) {
		-webkit-tap-highlight-color: transparent;
	}

	.page-shell {
		min-height: 100vh;
		overflow: hidden;
	}

	.site-header {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		width: min(100% - 3rem, 1220px);
		margin: 0 auto;
		padding: 1.25rem 0;
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		font-size: 1.02rem;
		font-weight: 750;
		letter-spacing: -0.02em;
		text-decoration: none;
	}

	.brand img {
		width: 2.4rem;
		height: 2.4rem;
	}

	nav {
		display: flex;
		justify-content: center;
		gap: clamp(1.25rem, 3vw, 2.5rem);
	}

	nav a {
		font-size: 0.86rem;
		font-weight: 650;
		text-decoration: none;
	}

	nav a:hover,
	nav a:focus-visible {
		color: #4d4dc4;
	}

	.header-cta,
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 999px;
		font-weight: 700;
		text-decoration: none;
		transition:
			transform 160ms ease,
			background 160ms ease,
			color 160ms ease;
	}

	.header-cta {
		min-height: 2.75rem;
		padding: 0.75rem 1.15rem;
		background: #10105a;
		color: white;
		font-size: 0.8rem;
	}

	.header-cta:hover,
	.button:hover {
		transform: translateY(-2px);
	}

	.menu-button {
		display: none;
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 0.88fr) minmax(25rem, 1.12fr);
		min-height: min(760px, calc(100vh - 88px));
		width: min(100% - 3rem, 1220px);
		margin: 0 auto;
		padding: clamp(3.5rem, 7vw, 6rem) 0 clamp(4rem, 7vw, 6rem);
		gap: clamp(3rem, 6vw, 5.5rem);
		align-items: center;
	}

	.eyebrow {
		margin: 0 0 1.5rem;
		color: #4a4ab9;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	h1 {
		max-width: 9ch;
		margin: 0;
		font-size: clamp(3.4rem, 6vw, 5.8rem);
		line-height: 0.98;
		letter-spacing: -0.045em;
	}

	h1 em {
		color: #4a4ab9;
		font-family: inherit;
		font-style: normal;
		font-weight: 700;
		letter-spacing: inherit;
	}

	.hero-intro {
		max-width: 37rem;
		margin: 2rem 0 0;
		color: #57576f;
		font-size: clamp(1.02rem, 1.5vw, 1.2rem);
		line-height: 1.7;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.8rem;
		margin-top: 2.25rem;
	}

	.button {
		min-height: 3.45rem;
		padding: 0.9rem 1.4rem;
		font-size: 0.88rem;
	}

	.button-primary {
		gap: 1.2rem;
		background: #10105a;
		color: white;
	}

	.button-primary:hover {
		background: #282887;
	}

	.hero-link {
		padding: 0.7rem 0.35rem;
		font-size: 0.86rem;
		font-weight: 750;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.3rem;
	}

	.hero-visual {
		position: relative;
		margin: 0;
		overflow: hidden;
		border: 1px solid rgb(16 16 63 / 12%);
		border-radius: 1.25rem;
		background: #d7d1c7;
		box-shadow: 0 1.75rem 4rem rgb(16 16 90 / 15%);
	}

	.hero-visual img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.section-wrap {
		width: min(100% - 3rem, 1220px);
		margin-inline: auto;
	}

	.statement-band {
		padding: clamp(2rem, 4vw, 3rem) max(1.5rem, calc((100vw - 1220px) / 2));
		background: #f8a51b;
		color: #10103f;
	}

	.statement-band p {
		max-width: none;
		margin: 0;
		font-size: clamp(1.65rem, 3.5vw, 3.25rem);
		font-weight: 760;
		line-height: 1.05;
		letter-spacing: -0.025em;
	}

	.services-section {
		padding-block: clamp(5rem, 10vw, 9rem);
	}

	.section-heading {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
		align-items: end;
		gap: clamp(2rem, 8vw, 7rem);
		margin-bottom: clamp(3rem, 6vw, 5rem);
	}

	.section-kicker {
		margin: 0 0 1.2rem;
		color: #4a4ab9;
		font-size: 0.74rem;
		font-weight: 850;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.section-heading h2,
	.about-copy h2,
	.contact-section h2 {
		margin: 0;
		font-size: clamp(2.3rem, 4.8vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.045em;
	}

	.section-heading > p {
		margin: 0;
		color: #616176;
		font-size: 1rem;
		line-height: 1.75;
	}

	.services-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.service-card {
		display: flex;
		min-height: 22rem;
		flex-direction: column;
		padding: clamp(1.7rem, 4vw, 2.7rem);
		border: 1px solid #d5d2c8;
		border-radius: 1.25rem;
		background: #fff;
	}

	.service-card:nth-child(2) {
		background: #dedcf6;
	}

	.service-card:nth-child(3) {
		background: #f8a51b;
	}

	.service-topline {
		display: flex;
		align-items: center;
		margin-bottom: auto;
		padding-bottom: 3rem;
	}

	.service-number {
		color: #4a4ab9;
		font-size: 0.7rem;
		font-weight: 850;
		letter-spacing: 0.08em;
	}

	.service-card:nth-child(3) .service-number {
		color: #10103f;
	}

	.service-card h3 {
		margin: 0;
		font-size: clamp(1.8rem, 3vw, 2.8rem);
		line-height: 1.03;
		letter-spacing: -0.045em;
	}

	.service-card > p {
		margin: 1.5rem 0 0;
		color: #55556c;
		font-size: 0.96rem;
		line-height: 1.7;
	}

	.text-link {
		display: inline-flex;
		align-items: center;
		align-self: flex-start;
		gap: 0.7rem;
		margin-top: auto;
		padding-bottom: 0.25rem;
		border-bottom: 1px solid currentColor;
		font-size: 0.8rem;
		font-weight: 800;
		text-decoration: none;
	}

	.text-link:hover,
	.text-link:focus-visible {
		color: #5a5ac8;
	}

	.services-link {
		margin-top: 2rem;
	}

	.process-section {
		padding: clamp(5rem, 10vw, 9rem) max(1.5rem, calc((100vw - 1220px) / 2));
		background: #10103f;
		color: white;
	}

	.process-inner {
		display: grid;
		grid-template-columns: minmax(0, 0.82fr) minmax(24rem, 1.18fr);
		gap: clamp(3rem, 9vw, 8rem);
	}

	.section-kicker-light {
		color: #f8a51b;
	}

	.process-heading h2 {
		margin: 0;
		font-size: clamp(2.5rem, 5vw, 4.6rem);
		font-weight: 700;
		line-height: 1.02;
		letter-spacing: -0.045em;
	}

	.process-steps {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.process-steps li {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 1.5rem;
		padding: 0 0 2rem;
		border-bottom: 1px solid rgb(255 255 255 / 15%);
	}

	.process-steps li + li {
		padding-top: 2rem;
	}

	.process-steps > li > span {
		color: #f8a51b;
		font-size: 0.7rem;
		font-weight: 850;
	}

	.process-steps h3 {
		margin: 0;
		font-size: 1.15rem;
		letter-spacing: -0.02em;
	}

	.process-steps p {
		margin: 0.7rem 0 0;
		color: rgb(255 255 255 / 62%);
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.guides-section {
		padding-block: clamp(5rem, 10vw, 9rem);
	}

	.guides-heading {
		display: grid;
		grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.85fr);
		align-items: end;
		gap: clamp(2rem, 8vw, 7rem);
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.guides-heading h2 {
		max-width: 13ch;
		margin: 0;
		font-size: clamp(2.3rem, 4.8vw, 4.4rem);
		line-height: 1.02;
		letter-spacing: -0.045em;
	}

	.guides-intro > p {
		margin: 0;
		color: #616176;
		font-size: 1rem;
		line-height: 1.75;
	}

	.guides-intro .text-link {
		margin-top: 1.2rem;
	}

	.guides-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	.guide-card {
		display: grid;
		grid-template-columns: minmax(10rem, 0.92fr) minmax(0, 1.08fr);
		min-height: 15rem;
		overflow: hidden;
		border: 1px solid #d5d2c8;
		border-radius: 1.15rem;
		background: #fff;
		text-decoration: none;
		transition:
			border-color 160ms ease,
			box-shadow 160ms ease,
			transform 160ms ease;
	}

	.guide-card-featured {
		grid-column: 1 / -1;
		grid-template-columns: minmax(0, 1.2fr) minmax(19rem, 0.8fr);
		min-height: 25rem;
	}

	.guide-card:hover,
	.guide-card:focus-visible {
		border-color: #aaa7d8;
		box-shadow: 0 1.2rem 3rem rgb(16 16 90 / 10%);
		transform: translateY(-3px);
	}

	.guide-image {
		overflow: hidden;
		background: #10105a;
	}

	.guide-image img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 300ms ease;
	}

	.guide-card:hover .guide-image img,
	.guide-card:focus-visible .guide-image img {
		transform: scale(1.025);
	}

	.guide-copy {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		padding: clamp(1.35rem, 3vw, 2.5rem);
	}

	.guide-copy > span {
		color: #4a4ab9;
		font-size: 0.68rem;
		font-weight: 850;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.guide-copy h3 {
		margin: 0.85rem 0 0;
		font-size: clamp(1.35rem, 2.5vw, 2.15rem);
		line-height: 1.08;
		letter-spacing: -0.035em;
	}

	.guide-card:not(.guide-card-featured) .guide-copy h3 {
		font-size: clamp(1.15rem, 1.8vw, 1.55rem);
	}

	.guide-copy p {
		max-width: 31rem;
		margin: 1rem 0 0;
		color: #626277;
		font-size: 0.9rem;
		line-height: 1.65;
	}

	.guide-copy strong {
		margin-top: auto;
		padding-top: 1.5rem;
		font-size: 0.76rem;
		font-weight: 800;
	}

	.about-section {
		display: grid;
		grid-template-columns: minmax(20rem, 0.9fr) minmax(0, 1.1fr);
		align-items: center;
		gap: clamp(3rem, 8vw, 7rem);
		padding-block: clamp(5rem, 10vw, 8rem);
	}

	.about-statement {
		display: flex;
		min-height: 24rem;
		align-items: flex-end;
		padding: clamp(2rem, 5vw, 4rem);
		border-radius: 1.25rem;
		background: #10105a;
		color: white;
	}

	.about-statement span {
		max-width: 10ch;
		font-size: clamp(2rem, 4vw, 3.6rem);
		font-weight: 750;
		line-height: 1.02;
		letter-spacing: -0.04em;
	}

	.about-copy > p:not(.section-kicker) {
		max-width: 43rem;
		margin: 1.4rem 0 0;
		color: #616176;
		font-size: 0.98rem;
		line-height: 1.75;
	}

	.contact-section {
		display: grid;
		grid-template-columns: minmax(17rem, 0.72fr) minmax(0, 1.28fr);
		gap: clamp(2.5rem, 6vw, 5rem);
		margin-bottom: clamp(4rem, 8vw, 7rem);
		padding: clamp(1.5rem, 4vw, 3.5rem);
		border-radius: 1.5rem;
		background: #f8a51b;
	}

	.contact-section .section-kicker {
		color: #10103f;
	}

	.contact-intro {
		align-self: start;
		padding: clamp(0.5rem, 2vw, 1.25rem) 0;
	}

	.contact-copy {
		margin: 1.8rem 0 0;
		line-height: 1.7;
	}

	.contact-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem 1.25rem;
		margin-top: 2rem;
	}

	.contact-details a {
		font-size: 0.78rem;
		font-weight: 750;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2rem;
	}

	.consultation-form {
		container: consultation-form / inline-size;
		padding: clamp(1.4rem, 3vw, 2.4rem);
		border: 1px solid rgb(16 16 63 / 10%);
		border-radius: 1.25rem;
		background: #fff;
		box-shadow: 0 1.5rem 4rem rgb(45 31 4 / 14%);
	}

	.form-heading {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1.7rem;
		padding-bottom: 1rem;
		border-bottom: 1px solid #dfddd5;
	}

	.form-heading p {
		margin: 0;
		font-size: 1.05rem;
		font-weight: 850;
	}

	.form-heading span {
		color: #626277;
		font-size: 0.72rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1.15rem 1rem;
	}

	.form-grid > label,
	.time-fields label {
		display: grid;
		align-content: start;
		gap: 0.45rem;
	}

	.form-grid label > span,
	.time-fields legend {
		font-size: 0.72rem;
		font-weight: 800;
	}

	.consultation-form input,
	.consultation-form select,
	.consultation-form textarea {
		width: 100%;
		min-width: 0;
		min-height: 3rem;
		padding: 0.75rem 0.85rem;
		border: 1px solid #c9c6bc;
		border-radius: 0.65rem;
		outline: none;
		background: #fbfaf7;
		color: #10103f;
		font: inherit;
		font-size: 0.86rem;
		transition:
			border-color 140ms ease,
			box-shadow 140ms ease;
	}

	.consultation-form textarea {
		min-height: 8rem;
		resize: vertical;
		line-height: 1.5;
	}

	.consultation-form input:focus,
	.consultation-form select:focus,
	.consultation-form textarea:focus {
		border-color: #4a4ab9;
		box-shadow: 0 0 0 3px rgb(74 74 185 / 14%);
	}

	.consultation-form [aria-invalid="true"] {
		border-color: #a32626;
	}

	.full-field {
		grid-column: 1 / -1;
	}

	.time-fields {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.45rem 0.7rem;
		min-width: 0;
		margin: 0;
		padding: 0;
		border: 0;
	}

	.time-fields legend {
		grid-column: 1 / -1;
		margin-bottom: 0.05rem;
		padding: 0;
	}

	.time-fields legend span {
		color: #626277;
		font-weight: 600;
	}

	.time-fields label > span {
		color: #626277;
		font-size: 0.7rem;
	}

	.field-error {
		color: #982626;
		font-size: 0.72rem;
		line-height: 1.4;
	}

	.field-error-wide {
		grid-column: 1 / -1;
	}

	.timezone-note {
		margin: -0.45rem 0 0;
		color: #626277;
		font-size: 0.72rem;
	}

	.honeypot {
		position: absolute;
		left: -10000px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}

	.privacy-check {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		margin-top: 1.2rem;
		color: #555568;
		font-size: 0.72rem;
		line-height: 1.45;
	}

	.privacy-check input {
		width: 1rem;
		height: 1rem;
		min-height: 0;
		margin: 0.1rem 0 0;
		padding: 0;
		accent-color: #4a4ab9;
	}

	.cf-turnstile {
		margin-top: 1rem;
	}

	.form-submit-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-top: 1.3rem;
	}

	.contact-button {
		flex: 0 0 auto;
		min-width: 14rem;
		border: 0;
		cursor: pointer;
	}

	.contact-button:disabled {
		cursor: wait;
		opacity: 0.65;
		transform: none;
	}

	.form-status {
		margin: 0;
		color: #666679;
		font-size: 0.73rem;
		font-weight: 700;
		line-height: 1.4;
	}

	.form-success {
		color: #1e6d42;
	}

	.form-error {
		color: #982626;
	}

	.confirmation-note {
		margin: 0.9rem 0 0;
		color: #626277;
		font-size: 0.72rem;
		line-height: 1.45;
	}

	@container consultation-form (max-width: 36rem) {
		.form-grid {
			grid-template-columns: 1fr;
		}

		.full-field {
			grid-column: auto;
		}
	}

	@container consultation-form (max-width: 24rem) {
		.time-fields {
			grid-template-columns: 1fr;
		}

		.field-error-wide {
			grid-column: auto;
		}
	}

	footer {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 2rem;
		width: min(100% - 3rem, 1220px);
		margin: 0 auto;
		padding: 1.5rem 0 2.5rem;
		border-top: 1px solid #d0cdc3;
		color: #626277;
		font-size: 0.75rem;
	}

	.footer-brand {
		color: #10103f;
	}

	footer p {
		margin: 0;
	}

	.footer-hours {
		text-align: center;
	}

	@media (max-width: 920px) {
		.site-header {
			grid-template-columns: auto auto 1fr;
		}

		nav {
			position: absolute;
			z-index: 10;
			top: 4.6rem;
			left: 1.5rem;
			display: none;
			width: calc(100% - 3rem);
			flex-direction: column;
			gap: 0;
			padding: 0.8rem;
			border: 1px solid #d8d5cb;
			border-radius: 1rem;
			background: #fff;
			box-shadow: 0 1rem 2.5rem rgb(16 16 63 / 15%);
		}

		nav.open {
			display: flex;
		}

		nav a {
			padding: 0.85rem;
		}

		.menu-button {
			display: grid;
			width: 2.75rem;
			height: 2.75rem;
			place-content: center;
			gap: 0.35rem;
			border: 1px solid #cbc8be;
			border-radius: 50%;
			background: transparent;
			cursor: pointer;
		}

		.menu-button span {
			display: block;
			width: 1rem;
			height: 1.5px;
			background: #10103f;
		}

		.header-cta {
			justify-self: end;
		}

		.hero {
			grid-template-columns: 1fr;
			padding-top: 4rem;
		}

		.hero-copy {
			max-width: 44rem;
		}

		.section-heading,
		.guides-heading,
		.process-inner,
		.about-section,
		.contact-section {
			grid-template-columns: 1fr;
		}

		.contact-intro {
			max-width: 42rem;
		}

		.section-heading {
			align-items: start;
		}

		.services-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.service-card:last-child {
			grid-column: 1 / -1;
		}

		footer {
			grid-template-columns: auto 1fr;
		}

		.footer-hours {
			display: none;
		}

		footer > span:last-child {
			text-align: right;
		}
	}

	@media (max-width: 620px) {
		.site-header,
		.hero {
			width: min(100% - 2rem, 1220px);
		}

		.site-header {
			gap: 0.6rem;
		}

		.brand span {
			display: none;
		}

		.header-cta {
			padding-inline: 0.9rem;
			font-size: 0.72rem;
		}

		nav {
			left: 1rem;
			width: calc(100% - 2rem);
		}

		.hero {
			gap: 3.5rem;
			padding-top: 3rem;
		}

		h1 {
			font-size: clamp(2.9rem, 14vw, 4.2rem);
		}

		.button {
			width: 100%;
		}

		.section-wrap {
			width: min(100% - 2rem, 1220px);
		}

		.statement-band {
			padding-inline: 1rem;
		}

		.section-heading {
			grid-template-columns: 1fr;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.service-card:last-child {
			grid-column: auto;
		}

		.guides-grid {
			grid-template-columns: 1fr;
		}

		.guide-card,
		.guide-card-featured {
			grid-column: auto;
			grid-template-columns: 1fr;
			min-height: 0;
		}

		.guide-image {
			aspect-ratio: 16 / 9;
		}

		.guide-copy {
			min-height: 13rem;
		}

		.service-card {
			min-height: 20rem;
		}

		.process-section {
			padding-inline: 1rem;
		}

		.process-inner {
			grid-template-columns: 1fr;
		}

		.process-steps li {
			gap: 1rem;
		}

		.about-section {
			grid-template-columns: 1fr;
		}

		.about-statement {
			min-height: 18rem;
		}

		.contact-section {
			grid-template-columns: 1fr;
			padding: 2rem 1.4rem;
			border-radius: 1.3rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}

		.full-field {
			grid-column: auto;
		}

		.form-submit-row {
			align-items: stretch;
			flex-direction: column;
		}

		.contact-button {
			width: 100%;
		}

		footer {
			grid-template-columns: 1fr;
			width: min(100% - 2rem, 1220px);
		}

		footer > span:last-child {
			text-align: left;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html) {
			scroll-behavior: auto;
		}

		.header-cta,
		.button {
			transition: none;
		}
	}
</style>
