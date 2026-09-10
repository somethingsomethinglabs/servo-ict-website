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
		const requestState = new URLSearchParams(window.location.search).get('request');
		if (requestState === 'sent') {
			formState = 'success';
			formMessage = 'Thanks, your enquiry has been sent. Rowan will reply by email.';
		} else if (requestState === 'error') {
			formState = 'error';
			formMessage = 'Your enquiry could not be sent. Please email support@servoict.com.';
		}
	});

	async function submitConsultation(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;

		if (consultationMode === 'email') {
			fieldErrors = {};
			formState = 'idle';
			formMessage = 'Your email app is opening. Review the draft, then press send.';
			window.location.href = buildConsultationMailto(new FormData(form));
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
			} else {
				const firstInvalidField = Object.keys(fieldErrors)[0];
				if (firstInvalidField) {
					(form.elements.namedItem(firstInvalidField) as HTMLElement | null)?.focus();
				}
			}
		} catch {
			formState = 'error';
			formMessage = 'Your enquiry could not be sent. Please email support@servoict.com.';
		} finally {
			const turnstile = (window as typeof window & { turnstile?: { reset: () => void } }).turnstile;
			turnstile?.reset();
		}
	}
</script>

<div class="page-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>

	<header class="site-header">
		<a class="brand" href="#top" aria-label="Servo ICT home" onclick={closeMenu}>
			<img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>

		<button class="menu-button" type="button" aria-label="Toggle navigation" aria-controls="site-navigation" aria-expanded={menuOpen} onclick={() => (menuOpen = !menuOpen)}>
			<span></span><span></span>
		</button>

		<nav id="site-navigation" class:open={menuOpen} aria-label="Main navigation">
			<a href="#services" onclick={closeMenu}>Project work</a>
			<a href="#process" onclick={closeMenu}>How it works</a>
			<a href="#about" onclick={closeMenu}>About</a>
			<a href="#blog" onclick={closeMenu}>Blog</a>
			<a href="#contact" onclick={closeMenu}>Contact</a>
		</nav>

		<a class="header-cta" href="#consultation-form">Talk to Rowan</a>
	</header>

	<main id="main-content">
		<section id="top" class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow">Gippsland websites and business IT</p>
				<h1 id="hero-title">One person to make your technology <em>work.</em></h1>
				<p class="hero-intro">
					Servo ICT plans and delivers websites, business systems and practical security projects
					for small businesses. You deal directly with Rowan from the first call to handover.
				</p>

				<div class="hero-actions">
					<a class="button button-primary" href="#consultation-form">Start with a 30-minute call <span aria-hidden="true">→</span></a>
					<a class="text-link hero-link" href="#services">See project types</a>
				</div>
			</div>

			<figure class="hero-visual">
				<img
					src={sitePath('/images/servo-business-technology-960.webp')}
					srcset={`${sitePath('/images/servo-business-technology-480.webp')} 480w, ${sitePath('/images/servo-business-technology-960.webp')} 960w, ${sitePath('/images/servo-business-technology.webp')} 1448w`}
					sizes="(max-width: 920px) calc(100vw - 2rem), 52vw"
					alt="Two small-business owners reviewing their website on a laptop in their workshop"
					width="1448"
					height="1086"
					fetchpriority="high"
				/>
			</figure>
		</section>

		<section class="trust-strip" aria-label="Servo ICT at a glance">
			<div><span>Based in</span><strong>Gippsland</strong></div>
			<div><span>Working across</span><strong>Victoria</strong></div>
			<div><span>You deal with</span><strong>Rowan</strong></div>
			<div><span>Start with</span><strong>A 30-minute call</strong></div>
		</section>

		<section id="services" class="services-section section-wrap" aria-labelledby="services-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">Project work</p>
					<h2 id="services-title">What needs to work better?</h2>
				</div>
				<p>Bring the outcome you need, even if the technical path is unclear. Rowan will scope the work, explain the trade-offs and see the project through.</p>
			</div>

			<div class="services-grid">
				<a class="service-card" href={sitePath('/websites/')}>
					<div class="service-topline"><span>01</span><small>Defined project</small></div>
					<div>
						<h3>Websites</h3>
						<p>New sites, rebuilds and focused improvements that make the business easier to understand.</p>
						<ul aria-label="Typical website work"><li>New websites</li><li>Rebuilds</li><li>Care and improvements</li></ul>
					</div>
					<strong>Explore website work <span aria-hidden="true">→</span></strong>
				</a>

				<a class="service-card" href={sitePath('/business-it/')}>
					<div class="service-topline"><span>02</span><small>Defined project</small></div>
					<div>
						<h3>Business IT</h3>
						<p>Clean setups and careful migrations for the systems your team uses every day.</p>
						<ul aria-label="Typical business IT work"><li>Email and accounts</li><li>Devices and tools</li><li>Domains and migrations</li></ul>
					</div>
					<strong>Explore business IT <span aria-hidden="true">→</span></strong>
				</a>

				<a class="service-card" href={sitePath('/security/')}>
					<div class="service-topline"><span>03</span><small>Practical fixes</small></div>
					<div>
						<h3>Security</h3>
						<p>Focused work on exposed accounts, neglected updates and backups you cannot trust.</p>
						<ul aria-label="Typical security work"><li>Account protection</li><li>Updates and access</li><li>Backups and recovery</li></ul>
					</div>
					<strong>Explore security work <span aria-hidden="true">→</span></strong>
				</a>
			</div>
		</section>

		<section class="fit-section section-wrap" aria-labelledby="fit-title">
			<div class="fit-heading">
				<p class="section-kicker">A good fit</p>
				<h2 id="fit-title">Defined work, owned from start to finish.</h2>
			</div>
			<div class="fit-copy">
				<p>Servo ICT is best suited to small businesses that need a website or technology project completed properly, without coordinating several suppliers.</p>
				<div class="engagement-grid">
					<div><span>Project work</span><strong>A clear outcome, scope and handover.</strong></div>
					<div><span>After the project</span><strong>Ongoing care can be agreed where it helps.</strong></div>
				</div>
			</div>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner">
				<div class="process-heading"><p class="section-kicker section-kicker-light">How it works</p><h2 id="process-title">No mystery in the middle.</h2></div>
				<ol class="process-steps">
					<li><span>01</span><div><h3>Scope the result</h3><p>Agree on the outcome, boundaries, budget and timing before work starts.</p></div></li>
					<li><span>02</span><div><h3>Build and review</h3><p>Rowan does the work, tests it and keeps you informed as decisions come up.</p></div></li>
					<li><span>03</span><div><h3>Handover and next steps</h3><p>You receive the working result, clear notes and an agreed support plan.</p></div></li>
				</ol>
			</div>
		</section>

		<section id="about" class="about-section section-wrap" aria-labelledby="about-title">
			<div class="about-card">
				<div class="about-mark"><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="82" height="82" /></div>
				<div><span>Rowan Paterson</span><strong>Founder and consultant</strong></div>
			</div>
			<div class="about-copy">
				<p class="section-kicker">About Servo ICT</p>
				<h2 id="about-title">The person you meet is the person doing the work.</h2>
				<p>Rowan founded Servo ICT so small businesses could plan, build and look after their technology without juggling suppliers. Servo ICT is based in Gippsland and works across Victoria.</p>
				<ul class="about-points"><li>One point of contact</li><li>Scope agreed before work starts</li><li>Clear handover and next steps</li></ul>
			</div>
		</section>

		<section id="blog" class="guides-section section-wrap" aria-labelledby="blog-title">
			<div class="guides-heading">
				<div><p class="section-kicker">From the blog</p><h2 id="blog-title">Straight answers for common technology problems.</h2></div>
				<div class="guides-intro"><p>Practical notes on accounts, devices and the systems your business relies on.</p><a class="text-link" href={sitePath('/blog/')}>Browse all posts <span aria-hidden="true">→</span></a></div>
			</div>

			<div class="guides-grid">
				<a class="guide-featured" href={sitePath('/simplifying-cyber-security-for-small-businesses/')}>
					<div class="guide-image"><img src={sitePath('/images/blog/cyber-security-basics.webp')} alt="Simplify your cyber security" width="1200" height="675" loading="lazy" /></div>
					<div class="guide-copy"><span>Cyber security basics</span><h3>Simplifying cyber security for small businesses</h3><p>A plain-English way to decide what to protect first and which steps matter.</p><strong>Read the post <span aria-hidden="true">→</span></strong></div>
				</a>
				<div class="guide-list">
					<a href={sitePath('/3-key-steps-to-protect-your-business-accounts/')}><span>Account security</span><h3>Three steps to protect your business accounts</h3><strong>Read <span aria-hidden="true">→</span></strong></a>
					<a href={sitePath('/use-cyber-security-to-grow-your-business/')}><span>Business resilience</span><h3>Use cyber security practices to grow your business</h3><strong>Read <span aria-hidden="true">→</span></strong></a>
				</div>
			</div>
		</section>

		<section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title">
			<div class="contact-intro">
				<p class="section-kicker">Start with a 30-minute conversation</p>
				<h2 id="contact-title">Tell Rowan what needs to work better.</h2>
				<p class="contact-copy">A rough description is enough. Rowan will reply to arrange a time and confirm whether the project is a good fit.</p>
				<div class="contact-details"><a href="mailto:support@servoict.com">support@servoict.com</a><a href="tel:0341488665">(03) 4148 8665</a></div>
				<p class="response-note">Phone hours: Monday, Tuesday and Friday, 9am to 4pm.</p>
			</div>

			<form id="consultation-form" class="consultation-form" method="post" action={consultationMode === 'email' ? 'mailto:support@servoict.com' : sitePath('/api/consultation')} onsubmit={submitConsultation}>
				<div class="form-heading"><div><p>Project enquiry</p><span>Four short fields and one optional field</span></div><span>Fields marked * are required</span></div>
				<div class="form-grid">
					<label><span>Your name *</span><input type="text" name="name" autocomplete="name" maxlength="100" aria-invalid={fieldErrors.name ? 'true' : undefined} required />{#if fieldErrors.name}<small class="field-error">{fieldErrors.name}</small>{/if}</label>
					<label><span>Email *</span><input type="email" name="email" autocomplete="email" maxlength="254" aria-invalid={fieldErrors.email ? 'true' : undefined} required />{#if fieldErrors.email}<small class="field-error">{fieldErrors.email}</small>{/if}</label>
					<label><span>Organisation <small>Optional</small></span><input type="text" name="organisation" autocomplete="organization" maxlength="120" aria-invalid={fieldErrors.organisation ? 'true' : undefined} />{#if fieldErrors.organisation}<small class="field-error">{fieldErrors.organisation}</small>{/if}</label>
					<label><span>What can we help with? *</span><select name="service" aria-invalid={fieldErrors.service ? 'true' : undefined} required><option value="">Choose a project type</option><option value="website">Website design or development</option><option value="technology">Business technology project</option><option value="security">Secure setup or tidy-up</option><option value="consulting">Technology consulting</option><option value="other">Something else</option></select>{#if fieldErrors.service}<small class="field-error">{fieldErrors.service}</small>{/if}</label>
					<label class="full-field"><span>What would you like to build, change, or fix? *</span><textarea name="message" rows="5" minlength="20" maxlength="2000" aria-invalid={fieldErrors.message ? 'true' : undefined} placeholder="A rough description is plenty. Tell us what needs to work and what is getting in the way." required></textarea>{#if fieldErrors.message}<small class="field-error">{fieldErrors.message}</small>{/if}</label>
				</div>
				<label class="honeypot" aria-hidden="true">Company website<input type="text" name="companyWebsite" tabindex="-1" autocomplete="off" /></label>
				{#if consultationMode === 'server' && turnstileSiteKey}<div class="cf-turnstile" data-sitekey={turnstileSiteKey} data-action="consultation" data-theme="light"></div>{/if}
				<div class="form-submit-row">
					<button class="button button-primary contact-button" type="submit" disabled={formState === 'submitting'}>{formState === 'submitting' ? 'Sending…' : consultationMode === 'email' ? 'Open email to send' : 'Send project enquiry'}<span aria-hidden="true">→</span></button>
					<p class:form-success={formState === 'success'} class:form-error={formState === 'error'} class="form-status" role="status" aria-live="polite">{formMessage}</p>
				</div>
				<p class="confirmation-note">{consultationMode === 'email' ? 'This opens a prepared draft in your email app. Nothing is sent until you press send.' : 'Servo ICT uses these details only to respond to your enquiry.'}<a href={sitePath('/privacy/')}>Privacy</a></p>
			</form>
		</section>
	</main>

	<footer>
		<div class="footer-brand-block"><a class="brand footer-brand" href="#top" aria-label="Servo ICT home"><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="44" height="44" /><span>Servo ICT</span></a><p>Websites and technology projects for small business.</p></div>
		<nav class="footer-nav" aria-label="Footer navigation"><a href={sitePath('/websites/')}>Websites</a><a href={sitePath('/business-it/')}>Business IT</a><a href={sitePath('/security/')}>Security</a><a href={sitePath('/blog/')}>Blog</a><a href={sitePath('/privacy/')}>Privacy</a></nav>
		<div class="footer-contact"><a href="mailto:support@servoict.com">support@servoict.com</a><a href="tel:0341488665">(03) 4148 8665</a><span>© {new Date().getFullYear()} Servo ICT</span></div>
	</footer>
</div>

<style>
	:global(html) { scroll-behavior: smooth; font-family: "Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; font-synthesis: none; }
	:global(body) { background: #f4f2ec; color: #10103f; font-family: inherit; line-height: 1.5; text-rendering: optimizeLegibility; }
	:global(button), :global(input), :global(select), :global(textarea) { font: inherit; }
	:global(a) { color: inherit; }
	:global(button), :global(a) { -webkit-tap-highlight-color: transparent; }
	:global(:focus-visible) { outline: 3px solid #5c5ce0; outline-offset: 4px; }
	.page-shell { min-height: 100vh; overflow: hidden; }
	.skip-link { position: fixed; z-index: 100; top: 0.75rem; left: 0.75rem; padding: 0.75rem 1rem; transform: translateY(-200%); border-radius: 0.5rem; background: #fff; font-weight: 800; }
	.skip-link:focus { transform: translateY(0); }
	.site-header { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 2rem; width: min(100% - 3rem, 1220px); margin: 0 auto; padding: 1.25rem 0; }
	.brand { display: inline-flex; align-items: center; gap: 0.75rem; font-size: 1.02rem; font-weight: 760; letter-spacing: -0.02em; text-decoration: none; }
	.brand img { width: 2.4rem; height: 2.4rem; }
	.site-header nav { display: flex; justify-content: center; gap: clamp(1.25rem, 3vw, 2.5rem); }
	.site-header nav a { min-height: 2.75rem; display: inline-flex; align-items: center; font-size: 0.84rem; font-weight: 680; text-decoration: none; }
	.site-header nav a:hover { color: #4d4dc4; }
	.header-cta, .button { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; font-weight: 760; text-decoration: none; transition: transform 160ms ease, background 160ms ease, color 160ms ease; }
	.header-cta { min-height: 2.75rem; padding: 0.75rem 1.15rem; background: #10105a; color: white; font-size: 0.8rem; }
	.header-cta:hover, .button:hover { transform: translateY(-2px); }
	.menu-button { display: none; }
	.hero { display: grid; grid-template-columns: minmax(0, 0.92fr) minmax(25rem, 1.08fr); min-height: min(760px, calc(100vh - 88px)); width: min(100% - 3rem, 1220px); margin: 0 auto; padding: clamp(3.5rem, 7vw, 6rem) 0 clamp(4rem, 7vw, 6rem); gap: clamp(3rem, 6vw, 5.5rem); align-items: center; }
	.eyebrow, .section-kicker { margin: 0 0 1.25rem; color: #4a4ab9; font-size: 0.74rem; font-weight: 850; letter-spacing: 0.14em; text-transform: uppercase; }
	h1 { max-width: 10ch; margin: 0; font-size: clamp(3.35rem, 5.8vw, 5.7rem); line-height: 0.98; letter-spacing: -0.052em; }
	h1 em { color: #4a4ab9; font: inherit; }
	.hero-intro { max-width: 38rem; margin: 2rem 0 0; color: #57576f; font-size: clamp(1.02rem, 1.5vw, 1.18rem); line-height: 1.7; }
	.hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 1.1rem; margin-top: 2.25rem; }
	.button { min-height: 3.45rem; padding: 0.9rem 1.4rem; font-size: 0.86rem; }
	.button-primary { gap: 1.2rem; border: 0; background: #10105a; color: white; }
	.button-primary:hover { background: #282887; }
	.text-link { display: inline-flex; align-items: center; gap: 0.7rem; min-height: 2.75rem; border-bottom: 1px solid currentColor; font-size: 0.8rem; font-weight: 800; text-decoration: none; }
	.text-link:hover { color: #4d4dc4; }
	.hero-visual { position: relative; margin: 0; overflow: hidden; border: 1px solid rgb(16 16 63 / 12%); border-radius: 1.25rem; background: #d7d1c7; box-shadow: 0 1.75rem 4rem rgb(16 16 90 / 14%); }
	.hero-visual img { display: block; width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; }
	.section-wrap { width: min(100% - 3rem, 1220px); margin-inline: auto; }
	.trust-strip { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); padding-inline: max(1.5rem, calc((100vw - 1220px) / 2)); background: #f8a51b; color: #10103f; }
	.trust-strip div { display: grid; align-content: center; min-height: 8.5rem; padding: 1.5rem clamp(1rem, 2vw, 2rem); border-right: 1px solid rgb(16 16 63 / 18%); }
	.trust-strip div:first-child { padding-left: 0; }
	.trust-strip div:last-child { border-right: 0; }
	.trust-strip span { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
	.trust-strip strong { margin-top: 0.25rem; font-size: clamp(1.1rem, 2vw, 1.6rem); line-height: 1.12; letter-spacing: -0.025em; }
	.services-section, .guides-section { padding-block: clamp(5.5rem, 9vw, 8rem); }
	.section-heading, .guides-heading { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr); align-items: end; gap: clamp(2rem, 8vw, 7rem); margin-bottom: clamp(3rem, 6vw, 4.5rem); }
	.section-heading h2, .fit-heading h2, .about-copy h2, .guides-heading h2, .contact-section h2 { margin: 0; font-size: clamp(2.3rem, 4.6vw, 4.25rem); line-height: 1.02; letter-spacing: -0.048em; }
	.section-heading > p, .guides-intro > p { margin: 0; color: #616176; font-size: 1rem; line-height: 1.75; }
	.services-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
	.service-card { display: flex; min-height: 26rem; flex-direction: column; padding: clamp(1.7rem, 3vw, 2.5rem); border: 1px solid #d5d2c8; border-radius: 1.25rem; background: #fff; text-decoration: none; transition: transform 160ms ease, box-shadow 160ms ease, border-color 160ms ease; }
	.service-card:nth-child(2) { background: #dedcf6; }
	.service-card:nth-child(3) { background: #f8a51b; }
	.service-card:hover { transform: translateY(-4px); border-color: #aaa7d8; box-shadow: 0 1.25rem 3rem rgb(16 16 90 / 10%); }
	.service-topline { display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: #4a4ab9; font-size: 0.68rem; font-weight: 850; letter-spacing: 0.08em; text-transform: uppercase; }
	.service-card:nth-child(3) .service-topline { color: #10103f; }
	.service-topline small { font: inherit; }
	.service-card > div:nth-child(2) { margin-top: auto; padding-top: 3.5rem; }
	.service-card h3 { margin: 0; font-size: clamp(1.8rem, 3vw, 2.7rem); line-height: 1.03; letter-spacing: -0.045em; }
	.service-card p { margin: 1.25rem 0 0; color: #55556c; font-size: 0.92rem; line-height: 1.65; }
	.service-card:nth-child(3) p { color: #2d2940; }
	.service-card ul { display: flex; flex-wrap: wrap; gap: 0.4rem; margin: 1.4rem 0 0; padding: 0; list-style: none; }
	.service-card li { padding: 0.35rem 0.55rem; border: 1px solid rgb(16 16 63 / 14%); border-radius: 999px; font-size: 0.67rem; font-weight: 720; }
	.service-card > strong { margin-top: 1.5rem; font-size: 0.76rem; }
	.fit-section { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(24rem, 1.15fr); gap: clamp(3rem, 8vw, 7rem); padding-block: clamp(1rem, 2vw, 2rem) clamp(5.5rem, 9vw, 8rem); }
	.fit-heading h2 { max-width: 10ch; }
	.fit-copy > p { max-width: 43rem; margin: 0; color: #57576f; font-size: 1.05rem; line-height: 1.75; }
	.engagement-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin-top: 2rem; }
	.engagement-grid div { display: grid; min-height: 10rem; align-content: space-between; padding: 1.4rem; border: 1px solid #d5d2c8; border-radius: 1rem; background: #fff; }
	.engagement-grid span { color: #4a4ab9; font-size: 0.68rem; font-weight: 850; letter-spacing: 0.09em; text-transform: uppercase; }
	.engagement-grid strong { font-size: 1.08rem; line-height: 1.35; }
	.process-section { padding: clamp(5.5rem, 9vw, 8rem) max(1.5rem, calc((100vw - 1220px) / 2)); background: #10103f; color: white; }
	.process-inner { display: grid; grid-template-columns: minmax(0, 0.82fr) minmax(24rem, 1.18fr); gap: clamp(3rem, 9vw, 8rem); }
	.section-kicker-light { color: #f8a51b; }
	.process-heading h2 { max-width: 10ch; margin: 0; font-size: clamp(2.5rem, 5vw, 4.5rem); line-height: 1.02; letter-spacing: -0.048em; }
	.process-steps { margin: 0; padding: 0; list-style: none; }
	.process-steps li { display: grid; grid-template-columns: auto 1fr; gap: 1.5rem; padding: 0 0 2rem; border-bottom: 1px solid rgb(255 255 255 / 15%); }
	.process-steps li + li { padding-top: 2rem; }
	.process-steps > li > span { color: #f8a51b; font-size: 0.7rem; font-weight: 850; }
	.process-steps h3 { margin: 0; font-size: 1.15rem; letter-spacing: -0.02em; }
	.process-steps p { max-width: 34rem; margin: 0.65rem 0 0; color: rgb(255 255 255 / 68%); font-size: 0.9rem; line-height: 1.65; }
	.about-section { display: grid; grid-template-columns: minmax(19rem, 0.8fr) minmax(0, 1.2fr); align-items: center; gap: clamp(3rem, 8vw, 7rem); padding-block: clamp(5.5rem, 9vw, 8rem); }
	.about-card { display: flex; min-height: 25rem; flex-direction: column; justify-content: space-between; padding: clamp(2rem, 4vw, 3.25rem); border-radius: 1.25rem; background: #10105a; color: white; }
	.about-mark { display: grid; width: 5.5rem; height: 5.5rem; place-items: center; border-radius: 50%; background: #fff; }
	.about-mark img { width: 3.8rem; height: 3.8rem; }
	.about-card > div:last-child { display: grid; gap: 0.3rem; }
	.about-card span { color: #f8a51b; font-size: 0.7rem; font-weight: 850; letter-spacing: 0.12em; text-transform: uppercase; }
	.about-card strong { max-width: 8ch; font-size: clamp(2rem, 4vw, 3.35rem); line-height: 1.02; letter-spacing: -0.045em; }
	.about-copy > p:not(.section-kicker) { max-width: 43rem; margin: 1.4rem 0 0; color: #616176; font-size: 0.98rem; line-height: 1.75; }
	.about-points { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; margin: 2rem 0 0; padding: 1.2rem 0 0; border-top: 1px solid #d5d2c8; list-style: none; }
	.about-points li { padding-right: 1rem; font-size: 0.74rem; font-weight: 760; line-height: 1.45; }
	.guides-section { border-top: 1px solid #d5d2c8; }
	.guides-heading h2 { max-width: 13ch; }
	.guides-intro .text-link { margin-top: 1rem; }
	.guides-grid { display: grid; grid-template-columns: minmax(0, 1.45fr) minmax(18rem, 0.55fr); gap: 1rem; }
	.guide-featured { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(17rem, 0.85fr); min-height: 25rem; overflow: hidden; border: 1px solid #d5d2c8; border-radius: 1.15rem; background: #fff; text-decoration: none; transition: transform 160ms ease, box-shadow 160ms ease; }
	.guide-featured:hover, .guide-list a:hover { transform: translateY(-3px); box-shadow: 0 1.2rem 3rem rgb(16 16 90 / 10%); }
	.guide-image { overflow: hidden; background: #10105a; }
	.guide-image img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform 300ms ease; }
	.guide-featured:hover .guide-image img { transform: scale(1.025); }
	.guide-copy { display: flex; align-items: flex-start; flex-direction: column; padding: clamp(1.5rem, 3vw, 2.5rem); }
	.guide-copy > span, .guide-list span { color: #4a4ab9; font-size: 0.68rem; font-weight: 850; letter-spacing: 0.1em; text-transform: uppercase; }
	.guide-copy h3 { margin: 0.85rem 0 0; font-size: clamp(1.6rem, 2.7vw, 2.45rem); line-height: 1.06; letter-spacing: -0.04em; }
	.guide-copy p { margin: 1rem 0 0; color: #626277; font-size: 0.9rem; line-height: 1.65; }
	.guide-copy strong, .guide-list strong { margin-top: auto; padding-top: 1.5rem; font-size: 0.76rem; }
	.guide-list { display: grid; grid-template-rows: repeat(2, minmax(0, 1fr)); gap: 1rem; }
	.guide-list a { display: flex; align-items: flex-start; flex-direction: column; padding: 1.5rem; border: 1px solid #d5d2c8; border-radius: 1.15rem; background: #fff; text-decoration: none; transition: transform 160ms ease, box-shadow 160ms ease; }
	.guide-list h3 { margin: 0.75rem 0 0; font-size: 1.25rem; line-height: 1.12; letter-spacing: -0.03em; }
	.contact-section { display: grid; grid-template-columns: minmax(17rem, 0.72fr) minmax(0, 1.28fr); gap: clamp(2.5rem, 6vw, 5rem); margin-bottom: clamp(4rem, 8vw, 7rem); padding: clamp(1.5rem, 4vw, 3.5rem); border-radius: 1.5rem; background: #f8a51b; }
	.contact-section .section-kicker { color: #10103f; }
	.contact-intro { align-self: start; padding: clamp(0.5rem, 2vw, 1.25rem) 0; }
	.contact-copy { margin: 1.8rem 0 0; line-height: 1.7; }
	.contact-details { display: flex; flex-wrap: wrap; gap: 0.65rem 1.25rem; margin-top: 2rem; }
	.contact-details a { min-height: 2.5rem; display: inline-flex; align-items: center; font-size: 0.78rem; font-weight: 760; text-underline-offset: 0.2rem; }
	.response-note { margin: 1.5rem 0 0; font-size: 0.74rem; font-weight: 700; }
	.consultation-form { padding: clamp(1.4rem, 3vw, 2.4rem); border: 1px solid rgb(16 16 63 / 10%); border-radius: 1.25rem; background: #fff; box-shadow: 0 1.5rem 4rem rgb(45 31 4 / 14%); }
	.form-heading { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; margin-bottom: 1.7rem; padding-bottom: 1rem; border-bottom: 1px solid #dfddd5; }
	.form-heading > div { display: grid; gap: 0.25rem; }
	.form-heading p { margin: 0; font-size: 1.05rem; font-weight: 850; }
	.form-heading span { color: #626277; font-size: 0.7rem; }
	.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.15rem 1rem; }
	.form-grid > label { display: grid; align-content: start; gap: 0.45rem; }
	.form-grid label > span { font-size: 0.72rem; font-weight: 800; }
	.form-grid label > span small { color: #626277; font: inherit; font-weight: 600; }
	.consultation-form input, .consultation-form select, .consultation-form textarea { width: 100%; min-width: 0; min-height: 3rem; padding: 0.75rem 0.85rem; border: 1px solid #c9c6bc; border-radius: 0.65rem; outline: none; background: #fbfaf7; color: #10103f; font-size: 0.86rem; transition: border-color 140ms ease, box-shadow 140ms ease; }
	.consultation-form textarea { min-height: 8rem; resize: vertical; line-height: 1.5; }
	.consultation-form input:focus, .consultation-form select:focus, .consultation-form textarea:focus { border-color: #4a4ab9; box-shadow: 0 0 0 3px rgb(74 74 185 / 14%); }
	.consultation-form [aria-invalid="true"] { border-color: #a32626; }
	.full-field { grid-column: 1 / -1; }
	.field-error { color: #982626; font-size: 0.72rem; line-height: 1.4; }
	.honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
	.cf-turnstile { margin-top: 1rem; }
	.form-submit-row { display: flex; align-items: center; gap: 1rem; margin-top: 1.3rem; }
	.contact-button { flex: 0 0 auto; min-width: 14rem; cursor: pointer; }
	.contact-button:disabled { cursor: wait; opacity: 0.65; transform: none; }
	.form-status { margin: 0; color: #666679; font-size: 0.73rem; font-weight: 700; line-height: 1.4; }
	.form-success { color: #1e6d42; }
	.form-error { color: #982626; }
	.confirmation-note { margin: 0.9rem 0 0; color: #626277; font-size: 0.72rem; line-height: 1.45; }
	.confirmation-note a { margin-left: 0.5rem; font-weight: 800; }
	footer { display: grid; grid-template-columns: minmax(15rem, 1fr) auto minmax(15rem, 1fr); align-items: start; gap: clamp(2rem, 5vw, 5rem); width: min(100% - 3rem, 1220px); margin: 0 auto; padding: 2.5rem 0 3rem; border-top: 1px solid #d0cdc3; color: #626277; font-size: 0.75rem; }
	.footer-brand { color: #10103f; }
	.footer-brand-block p { max-width: 20rem; margin: 1rem 0 0; }
	.footer-nav { display: grid; grid-template-columns: repeat(2, auto); gap: 0.75rem 2rem; }
	.footer-nav a, .footer-contact a { min-height: 1.75rem; font-weight: 720; text-decoration: none; }
	.footer-nav a:hover, .footer-contact a:hover { color: #4a4ab9; }
	.footer-contact { display: grid; justify-items: end; gap: 0.5rem; }
	.footer-contact span { margin-top: 0.5rem; }
	@media (max-width: 920px) {
		.site-header { grid-template-columns: auto auto 1fr; }
		.site-header nav { position: absolute; z-index: 10; top: 4.6rem; left: 1.5rem; display: none; width: calc(100% - 3rem); flex-direction: column; gap: 0; padding: 0.8rem; border: 1px solid #d8d5cb; border-radius: 1rem; background: #fff; box-shadow: 0 1rem 2.5rem rgb(16 16 63 / 15%); }
		.site-header nav.open { display: flex; }
		.site-header nav a { padding: 0.85rem; }
		.menu-button { display: grid; width: 2.75rem; height: 2.75rem; place-content: center; gap: 0.35rem; border: 1px solid #cbc8be; border-radius: 50%; background: transparent; cursor: pointer; }
		.menu-button span { display: block; width: 1rem; height: 1.5px; background: #10103f; }
		.header-cta { justify-self: end; }
		.hero, .section-heading, .fit-section, .process-inner, .about-section, .guides-heading, .contact-section { grid-template-columns: 1fr; }
		.hero { padding-top: 4rem; }
		.trust-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.trust-strip div:nth-child(2) { border-right: 0; }
		.trust-strip div:nth-child(-n + 2) { border-bottom: 1px solid rgb(16 16 63 / 18%); }
		.trust-strip div:first-child, .trust-strip div:nth-child(3) { padding-left: 0; }
		.services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.service-card:last-child { grid-column: 1 / -1; }
		.fit-heading h2 { max-width: 14ch; }
		.guides-grid { grid-template-columns: 1fr; }
		.guide-list { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: none; }
		.contact-intro { max-width: 42rem; }
		footer { grid-template-columns: 1fr 1fr; }
		.footer-contact { grid-column: 2; justify-items: end; }
	}
	@media (max-width: 620px) {
		.site-header, .hero, .section-wrap, footer { width: min(100% - 2rem, 1220px); }
		.site-header { gap: 0.6rem; }
		.brand span { display: none; }
		.header-cta { padding-inline: 0.9rem; font-size: 0.72rem; }
		.site-header nav { left: 1rem; width: calc(100% - 2rem); }
		.hero { gap: 3rem; padding-top: 3rem; }
		h1 { font-size: clamp(2.85rem, 13.6vw, 4.1rem); }
		.hero-actions { align-items: stretch; flex-direction: column; }
		.button { width: 100%; }
		.hero-link { align-self: flex-start; }
		.trust-strip { padding-inline: 1rem; }
		.trust-strip div { min-height: 7rem; padding: 1.1rem; }
		.trust-strip strong { font-size: 1.05rem; }
		.services-section, .guides-section { padding-block: 5rem; }
		.services-grid, .engagement-grid, .about-points, .guide-list, .form-grid { grid-template-columns: 1fr; }
		.service-card, .service-card:last-child { grid-column: auto; min-height: 0; padding: 1.5rem; }
		.service-card > div:nth-child(2) { margin-top: 2.5rem; padding-top: 0; }
		.fit-section { padding-bottom: 5rem; }
		.engagement-grid div { min-height: 8rem; }
		.process-section { padding: 5rem 1rem; }
		.process-steps li { gap: 1rem; }
		.about-section { padding-block: 5rem; }
		.about-card { min-height: 20rem; }
		.about-points { gap: 0.75rem; }
		.about-points li { padding: 0 0 0.75rem; border-bottom: 1px solid #d5d2c8; }
		.guide-featured { grid-template-columns: 1fr; min-height: 0; }
		.guide-image { aspect-ratio: 16 / 9; }
		.guide-copy { min-height: 17rem; }
		.guide-list { grid-template-rows: none; }
		.guide-list a { min-height: 12rem; }
		.contact-section { padding: 2rem 1.25rem; border-radius: 1.25rem; }
		.form-heading, .form-submit-row { align-items: stretch; flex-direction: column; }
		.full-field { grid-column: auto; }
		.confirmation-note a { display: inline-block; margin: 0.35rem 0 0; }
		footer { grid-template-columns: 1fr; }
		.footer-nav { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		.footer-contact { grid-column: auto; justify-items: start; }
	}
	@media (prefers-reduced-motion: reduce) {
		:global(html) { scroll-behavior: auto; }
		.header-cta, .button, .service-card, .guide-featured, .guide-list a, .guide-image img { transition: none; }
		.header-cta:hover, .button:hover, .service-card:hover, .guide-featured:hover, .guide-list a:hover, .guide-featured:hover .guide-image img { transform: none; }
	}
</style>
