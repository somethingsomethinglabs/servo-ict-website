<script lang="ts">
	let { turnstileSiteKey = '' }: { turnstileSiteKey?: string } = $props();
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

	$effect(() => {
		visitorTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Australia/Melbourne';
		const now = new Date();
		const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
		minimumDate = localDate.toISOString().slice(0, 10);

		const requestState = new URLSearchParams(window.location.search).get('request');
		if (requestState === 'sent') {
			formState = 'success';
			formMessage = 'Thanks — your consultation request has been sent.';
		} else if (requestState === 'error') {
			formState = 'error';
			formMessage = 'Your request could not be sent. Please email support@servoict.com.';
		}
	});

	async function submitConsultation(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
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
			<img src="/images/servo-ict-logo.png" alt="" width="44" height="44" />
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
			<a href="#about" onclick={closeMenu}>About</a>
			<a href="#contact" onclick={closeMenu}>Contact</a>
		</nav>

		<a
			class="header-cta"
			href="#consultation-form"
		>
			Talk about your project
		</a>
	</header>

	<main id="top">
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow"><span aria-hidden="true"></span> Websites and technology for small business</p>
				<h1 id="hero-title">Get the project done.<br /><em>Get it done properly.</em></h1>
				<p class="hero-intro">
					Servo ICT builds websites and sets up the technology small businesses rely on. You get
					clear advice, careful implementation, and a secure setup from the start.
				</p>

				<div class="hero-actions">
					<a
						class="button button-primary"
						href="#consultation-form"
					>
						Talk about your project <span aria-hidden="true">→</span>
					</a>
					<a class="button button-secondary" href="#services">See the work we take on</a>
				</div>

				<div class="hero-notes" aria-label="Service highlights">
					<span>Based in Gippsland</span>
					<span>Built for small business</span>
					<span>Built and handed over properly</span>
				</div>
			</div>

			<div class="hero-visual" aria-label="Servo ICT website and technology project planning">
				<div class="visual-grid" aria-hidden="true"></div>
				<img
					src="/images/startup-support.webp"
					alt="Planning a small business website and technology project"
					width="1600"
					height="900"
				/>
				<div class="visual-card">
					<span class="visual-card-mark">01</span>
					<p>Useful work. Finished properly.</p>
				</div>
			</div>
		</section>

		<section class="statement-band" aria-label="Our approach">
			<p>Technology should earn its place in the business.</p>
			<div>
				<span>Useful by design</span>
				<span>Secure by default</span>
				<span>Support after launch</span>
			</div>
		</section>

		<section id="services" class="services-section section-wrap" aria-labelledby="services-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Project work</p>
					<h2 id="services-title">Projects that leave your business in better shape.</h2>
				</div>
				<p>
					Bring us a new website, a technology change, or a setup that needs attention. We can
					plan the work, do it, and make sure it is safe to run once it is yours.
				</p>
			</div>

			<div class="services-grid">
				<article class="service-card service-card-featured">
					<div class="service-topline">
						<span class="service-number">01</span>
						<span class="service-label">New sites, rebuilds and improvements</span>
					</div>
					<h3>Websites and web development</h3>
					<p>
						Get a site that explains the business clearly, works well on every screen, and does the
						job you need it to do. We handle the technical decisions, deployment, security, and
						handover.
					</p>
					<ul class="project-inclusions" aria-label="Website project services">
						<li>New business websites</li>
						<li>Rebuilds and upgrades</li>
						<li>Forms and integrations</li>
						<li>Hosting and deployment</li>
						<li>Updates and maintenance</li>
					</ul>
					<a
						class="text-link"
						href="#consultation-form"
					>
						Talk about a website <span aria-hidden="true">↗</span>
					</a>
				</article>

				<article class="service-card service-card-light">
					<div class="service-topline">
						<span class="service-number">02</span>
						<span class="service-label">Setup, migration and improvement</span>
					</div>
					<h3>Business technology projects</h3>
					<p>
						Set up or improve the accounts, devices, email, domains, networks, and online tools your
						team depends on. We can untangle an existing setup or build a cleaner one.
					</p>
					<a href="#consultation-form" class="text-link">Plan a technology project <span aria-hidden="true">→</span></a>
				</article>

				<article class="service-card service-card-secure">
					<div class="service-topline">
						<span class="service-number">03</span>
						<span class="service-label">Fixes you can see and use</span>
					</div>
					<h3>Secure setup and tidy-ups</h3>
					<p>
						If a website, laptop, account, or backup setup is exposed or out of date, we can fix it.
						That can include updates, safer access, reliable backups, and a routine your business can
						keep up with.
					</p>
					<a href="#consultation-form" class="text-link">Fix a weak setup <span aria-hidden="true">→</span></a>
				</article>
			</div>

			<div class="coming-soon">
				<span>One project, one scope</span>
				<p><strong>Most work crosses a few categories.</strong> A website project might also need domain, email, hosting, backup, and account security work. We can handle the pieces together.</p>
			</div>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner">
				<div class="process-heading">
					<p class="section-kicker section-kicker-light">A project you can follow</p>
					<h2 id="process-title">A clear scope.<br />A working result.</h2>
					<p>You stay informed without having to manage every technical detail.</p>
				</div>

				<ol class="process-steps">
					<li>
						<span>01</span>
						<div>
							<h3>Define what needs to work</h3>
							<p>We agree on the result, the people involved, the budget, and any deadlines.</p>
						</div>
					</li>
					<li>
						<span>02</span>
						<div>
							<h3>Build it and secure it</h3>
							<p>We do the work, test it as we go, and include updates, backups, and access controls where they matter.</p>
						</div>
					</li>
					<li>
						<span>03</span>
						<div>
							<h3>Launch and hand it over</h3>
							<p>You get a working result, useful documentation, and a clear path for maintenance or follow-up support.</p>
						</div>
					</li>
				</ol>
			</div>
		</section>

		<section id="about" class="about-section section-wrap" aria-labelledby="about-title">
			<div class="about-mark" aria-hidden="true">
				<img src="/images/servo-ict-logo.png" alt="" width="500" height="500" loading="lazy" />
			</div>
			<div class="about-copy">
				<p class="section-kicker">Practical help from start to finish</p>
				<h2 id="about-title">One person who can see the whole project through.</h2>
				<p>
					Rowan Paterson founded Servo ICT to help small businesses plan, build, and look after
					their technology without juggling several suppliers. We are based in Gippsland and work
					with businesses across Victoria.
				</p>
				<p>
					Security is part of the build, not a report added at the end. The aim is a useful result
					that your business can operate, update, and understand.
				</p>
				<div class="about-facts" aria-label="About Servo ICT">
					<div><strong>Gippsland</strong><span>Based locally</span></div>
					<div><strong>Web + IT</strong><span>One project partner</span></div>
					<div><strong>Free</strong><span>Initial consultation</span></div>
				</div>
			</div>
		</section>

		<section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title">
			<div class="contact-intro">
				<p class="section-kicker">Start with a free consultation</p>
				<h2 id="contact-title">What are you trying to build, fix, or move?</h2>
				<p class="contact-copy">
					Share the rough idea, even if the scope is not clear yet. Suggest a time for a short call
					and Rowan will reply to confirm it or arrange another time.
				</p>
				<div class="request-notes" aria-label="What happens after you submit">
					<span>30-minute first call</span>
					<span>No finished brief required</span>
					<span>Time confirmed by reply</span>
				</div>
				<div class="contact-details">
					<a href="mailto:support@servoict.com">support@servoict.com</a>
					<a href="tel:0341488665">(03) 4148 8665</a>
				</div>
			</div>

			<form
				id="consultation-form"
				class="consultation-form"
				method="post"
				action="/api/consultation"
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

				{#if turnstileSiteKey}
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
						{formState === 'submitting' ? 'Sending…' : 'Send consultation request'}
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
				<p class="confirmation-note">Your requested time is not booked until Servo ICT confirms it by reply.</p>
			</form>
		</section>
	</main>

	<footer>
		<a class="brand footer-brand" href="#top" aria-label="Servo ICT home">
			<img src="/images/servo-ict-logo.png" alt="" width="44" height="44" />
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
		grid-template-columns: minmax(0, 1.04fr) minmax(24rem, 0.96fr);
		min-height: min(760px, calc(100vh - 88px));
		width: min(100% - 3rem, 1220px);
		margin: 0 auto;
		padding: clamp(3.5rem, 8vw, 7rem) 0 clamp(4rem, 8vw, 7rem);
		gap: clamp(3rem, 7vw, 6.5rem);
		align-items: center;
	}

	.eyebrow {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		margin: 0 0 1.5rem;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.eyebrow span {
		position: relative;
		flex: 0 0 auto;
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: #f8a51b;
		box-shadow: 0 0 0 0.35rem rgb(248 165 27 / 15%);
	}

	.eyebrow span::after {
		position: absolute;
		inset: -0.35rem;
		border: 1px solid rgb(248 165 27 / 80%);
		border-radius: inherit;
		content: "";
		animation: status-ping 2.2s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
	}

	@keyframes status-ping {
		0% {
			opacity: 0.8;
			transform: scale(0.45);
		}

		70%,
		100% {
			opacity: 0;
			transform: scale(1.35);
		}
	}

	h1 {
		max-width: 12ch;
		margin: 0;
		font-size: clamp(3.15rem, 6vw, 5.8rem);
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

	.button-secondary {
		border: 1px solid #c9c6bc;
		background: rgb(255 255 255 / 55%);
	}

	.button-secondary:hover {
		border-color: #10105a;
		background: white;
	}

	.hero-notes {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem 1.5rem;
		margin-top: 2.4rem;
		color: #626277;
		font-size: 0.76rem;
		font-weight: 650;
	}

	.hero-notes span {
		position: relative;
		padding-left: 0.85rem;
	}

	.hero-notes span::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 0.3rem;
		height: 0.3rem;
		border-radius: 50%;
		background: #4a4ab9;
		content: "";
		transform: translateY(-50%);
	}

	.hero-visual {
		position: relative;
		isolation: isolate;
		min-height: 35rem;
		border-radius: 1.5rem;
		background: #10105a;
		box-shadow: 0 2rem 5rem rgb(16 16 90 / 16%);
	}

	.hero-visual::before {
		position: absolute;
		z-index: -1;
		top: -2rem;
		right: -2rem;
		width: 8rem;
		height: 8rem;
		border: 1px solid #d0cdc3;
		border-radius: 50%;
		content: "";
	}

	.visual-grid {
		position: absolute;
		inset: 0;
		opacity: 0.13;
		background-image:
			linear-gradient(rgb(255 255 255 / 60%) 1px, transparent 1px),
			linear-gradient(90deg, rgb(255 255 255 / 60%) 1px, transparent 1px);
		background-size: 3rem 3rem;
		mask-image: linear-gradient(to bottom right, black, transparent 75%);
	}

	.hero-visual img {
		position: absolute;
		inset: 3.25rem 2rem auto;
		width: calc(100% - 4rem);
		height: calc(100% - 6.5rem);
		border-radius: 1rem;
		object-fit: cover;
		object-position: 58% center;
	}

	.visual-card {
		position: absolute;
		right: -1.5rem;
		bottom: 2.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		max-width: 15rem;
		padding: 1rem 1.25rem;
		border: 1px solid rgb(255 255 255 / 65%);
		border-radius: 1rem;
		background: rgb(255 255 255 / 92%);
		box-shadow: 0 1rem 2.5rem rgb(2 2 39 / 24%);
		backdrop-filter: blur(12px);
	}

	.visual-card-mark {
		display: grid;
		flex: 0 0 auto;
		width: 2.5rem;
		height: 2.5rem;
		place-items: center;
		border-radius: 50%;
		background: #f8a51b;
		color: #10103f;
		font-size: 0.72rem;
		font-weight: 850;
	}

	.visual-card p {
		margin: 0;
		font-size: 0.9rem;
		font-weight: 800;
		line-height: 1.35;
	}

	.section-wrap {
		width: min(100% - 3rem, 1220px);
		margin-inline: auto;
	}

	.statement-band {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 1.5rem max(1.5rem, calc((100vw - 1220px) / 2));
		background: #f8a51b;
		color: #10103f;
	}

	.statement-band p {
		max-width: 30rem;
		margin: 0;
		font-size: clamp(1.25rem, 2vw, 1.65rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.025em;
	}

	.statement-band div {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 0.75rem 1.5rem;
		font-size: 0.72rem;
		font-weight: 850;
		letter-spacing: 0.07em;
		text-transform: uppercase;
	}

	.statement-band span {
		position: relative;
		padding-left: 0.8rem;
	}

	.statement-band span::before {
		position: absolute;
		top: 50%;
		left: 0;
		width: 0.28rem;
		height: 0.28rem;
		border-radius: 50%;
		background: #10103f;
		content: "";
		transform: translateY(-50%);
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
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}

	.service-card {
		position: relative;
		display: flex;
		min-height: 27rem;
		flex-direction: column;
		padding: clamp(1.7rem, 4vw, 2.7rem);
		border-radius: 1.25rem;
	}

	.service-card-featured {
		grid-row: span 2;
		min-height: 55rem;
		background: #10105a;
		color: white;
	}

	.service-card-featured::after {
		position: absolute;
		right: 3rem;
		bottom: 3rem;
		width: 9rem;
		height: 9rem;
		border: 1px solid rgb(255 255 255 / 18%);
		border-radius: 50%;
		box-shadow:
			0 0 0 2.5rem rgb(255 255 255 / 4%),
			0 0 0 5rem rgb(255 255 255 / 3%);
		content: "";
	}

	.service-card-light {
		border: 1px solid #d5d2c8;
		background: #fff;
	}

	.service-card-secure {
		border: 1px solid #cfcaee;
		background: #dedcf6;
	}

	.service-topline {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.service-number {
		display: grid;
		width: 2.55rem;
		height: 2.55rem;
		place-items: center;
		border: 1px solid currentColor;
		border-radius: 50%;
		font-size: 0.7rem;
		font-weight: 850;
	}

	.service-label {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-align: right;
		text-transform: uppercase;
	}

	.service-card h3 {
		max-width: 13ch;
		margin: 0;
		font-size: clamp(1.8rem, 3.4vw, 3.2rem);
		line-height: 1.03;
		letter-spacing: -0.045em;
	}

	.service-card > p {
		max-width: 32rem;
		margin: 1.5rem 0 0;
		font-size: 0.96rem;
		line-height: 1.7;
	}

	.service-card-featured > p {
		color: rgb(255 255 255 / 72%);
	}

	.service-card-light > p,
	.service-card-secure > p {
		color: #626277;
	}

	.project-inclusions {
		display: grid;
		margin: auto 0 2rem;
		padding: 0;
		list-style: none;
	}

	.project-inclusions li {
		padding: 0.9rem 0;
		border-bottom: 1px solid rgb(255 255 255 / 17%);
		font-size: 0.85rem;
		font-weight: 700;
	}

	.project-inclusions li::before {
		margin-right: 0.75rem;
		color: #f8a51b;
		content: "+";
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

	.service-card-featured .text-link:hover,
	.service-card-featured .text-link:focus-visible {
		color: #f8a51b;
	}

	.coming-soon {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1.5rem;
		margin-top: 1rem;
		padding: 1.4rem 1.7rem;
		border: 1px dashed #b8b4a9;
		border-radius: 1.1rem;
	}

	.coming-soon > span {
		padding: 0.45rem 0.65rem;
		border-radius: 999px;
		background: #e5e2d8;
		font-size: 0.7rem;
		font-weight: 850;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.coming-soon p {
		margin: 0;
		color: #666678;
		font-size: 0.86rem;
		line-height: 1.55;
	}

	.coming-soon strong {
		color: #10103f;
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

	.process-heading > p:last-child {
		max-width: 27rem;
		margin: 2rem 0 0;
		color: rgb(255 255 255 / 62%);
		line-height: 1.7;
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

	.about-section {
		display: grid;
		grid-template-columns: minmax(20rem, 0.78fr) minmax(0, 1.22fr);
		align-items: center;
		gap: clamp(3rem, 10vw, 9rem);
		padding-block: clamp(5rem, 11vw, 10rem);
	}

	.about-mark {
		position: relative;
		display: grid;
		aspect-ratio: 1;
		place-items: center;
		border: 1px solid #d3d0c6;
		border-radius: 50%;
	}

	.about-mark::before,
	.about-mark::after {
		position: absolute;
		border: 1px solid #d3d0c6;
		border-radius: 50%;
		content: "";
	}

	.about-mark::before {
		inset: 12%;
	}

	.about-mark::after {
		inset: 24%;
	}

	.about-mark img {
		z-index: 1;
		width: 42%;
		height: 42%;
		object-fit: contain;
	}

	.about-copy > p:not(.section-kicker) {
		max-width: 43rem;
		margin: 1.4rem 0 0;
		color: #616176;
		font-size: 0.98rem;
		line-height: 1.75;
	}

	.about-facts {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.75rem;
		margin-top: 2.4rem;
	}

	.about-facts div {
		display: grid;
		gap: 0.35rem;
		padding: 1rem;
		border-top: 1px solid #c9c6bc;
	}

	.about-facts strong {
		font-size: 1rem;
	}

	.about-facts span {
		color: #626277;
		font-size: 0.72rem;
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

	.request-notes {
		display: grid;
		gap: 0.7rem;
		margin-top: 1.8rem;
		font-size: 0.76rem;
		font-weight: 800;
	}

	.request-notes span {
		position: relative;
		padding-left: 1rem;
	}

	.request-notes span::before {
		position: absolute;
		top: 0.42rem;
		left: 0;
		width: 0.35rem;
		height: 0.35rem;
		border-radius: 50%;
		background: #10105a;
		content: "";
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

		.hero-visual {
			min-height: 31rem;
		}

		.section-heading,
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

		.about-mark {
			width: min(25rem, 70vw);
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

		.hero-notes {
			display: grid;
		}

		.hero-visual {
			min-height: 24rem;
			border-radius: 1.4rem;
		}

		.hero-visual img {
			inset: 1rem;
			width: calc(100% - 2rem);
			height: calc(100% - 2rem);
		}

		.visual-card {
			right: 0.8rem;
			bottom: 0.8rem;
		}

		.section-wrap {
			width: min(100% - 2rem, 1220px);
		}

		.statement-band {
			align-items: flex-start;
			flex-direction: column;
			padding: 1.5rem 1rem;
		}

		.statement-band div {
			justify-content: flex-start;
		}

		.section-heading {
			grid-template-columns: 1fr;
		}

		.services-grid {
			grid-template-columns: 1fr;
		}

		.service-card,
		.service-card-featured {
			min-height: 32rem;
		}

		.service-card-featured {
			grid-row: auto;
		}

		.coming-soon {
			grid-template-columns: 1fr;
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

		.about-mark {
			width: min(22rem, 88vw);
		}

		.about-facts {
			grid-template-columns: 1fr;
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

		.eyebrow span::after {
			animation: none;
			opacity: 0;
		}
	}
</style>
