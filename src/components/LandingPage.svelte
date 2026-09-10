<script lang="ts">
	let menuOpen = $state(false);

	const closeMenu = () => {
		menuOpen = false;
	};
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
			<a href="#services" onclick={closeMenu}>Services</a>
			<a href="#process" onclick={closeMenu}>How it works</a>
			<a href="#about" onclick={closeMenu}>About</a>
			<a href="#contact" onclick={closeMenu}>Contact</a>
		</nav>

		<a
			class="header-cta"
			href="https://cloud.servoict.com/index.php/apps/appointments/pub/v3VC7MCBGac7N8vb/form?ref=servoict.com"
		>
			Book a free consultation
		</a>
	</header>

	<main id="top">
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-copy">
				<p class="eyebrow"><span></span> Cyber security for small business</p>
				<h1 id="hero-title">Clear security advice.<br /><em>A practical way forward.</em></h1>
				<p class="hero-intro">
					Servo ICT helps small businesses find their biggest digital risks, make a sensible plan,
					and put the right protections in place.
				</p>

				<div class="hero-actions">
					<a
						class="button button-primary"
						href="https://cloud.servoict.com/index.php/apps/appointments/pub/v3VC7MCBGac7N8vb/form?ref=servoict.com"
					>
						Book a free consultation <span aria-hidden="true">→</span>
					</a>
					<a class="button button-secondary" href="#services">Explore our services</a>
				</div>

				<div class="hero-notes" aria-label="Service highlights">
					<span>Based in Gippsland</span>
					<span>Built for small business</span>
					<span>Clear next steps</span>
				</div>
			</div>

			<div class="hero-visual" aria-label="Servo ICT cyber security risk assessment">
				<div class="visual-grid" aria-hidden="true"></div>
				<img
					src="/images/cyber-security-report.webp"
					alt="Servo ICT business cyber security report and next steps"
					width="1600"
					height="900"
				/>
				<div class="visual-card">
					<span class="visual-card-mark">01</span>
					<p>Know what matters first.</p>
				</div>
			</div>
		</section>

		<section class="statement-band" aria-label="Our approach">
			<p>Good security advice should leave you knowing what to do next.</p>
			<div>
				<span>Plain language</span>
				<span>Prioritised actions</span>
				<span>Support when you need it</span>
			</div>
		</section>

		<section id="services" class="services-section section-wrap" aria-labelledby="services-title">
			<div class="section-heading">
				<div>
					<p class="section-kicker">What we do</p>
					<h2 id="services-title">Security that fits the way small businesses work.</h2>
				</div>
				<p>
					Start with a clear view of your risks, get advice on a specific problem, or bring us in
					to help set up the systems your business relies on.
				</p>
			</div>

			<div class="services-grid">
				<article class="service-card service-card-featured">
					<div class="service-topline">
						<span class="service-number">01</span>
						<span class="service-label">For established businesses</span>
					</div>
					<h3>Cyber security risk assessment</h3>
					<p>
						Find the issues most likely to interrupt your work or expose your data. You receive a
						clear report with priorities, practical fixes, and a sensible follow-up plan.
					</p>
					<ul class="assessment-areas" aria-label="Assessment areas">
						<li>Networks</li>
						<li>Online accounts</li>
						<li>Devices</li>
						<li>Threat awareness</li>
						<li>Documents</li>
					</ul>
					<a
						class="text-link"
						href="https://cloud.servoict.com/index.php/apps/appointments/pub/v3VC7MCBGac7N8vb/form?ref=servoict.com"
					>
						Discuss an assessment <span aria-hidden="true">↗</span>
					</a>
				</article>

				<article class="service-card service-card-light">
					<div class="service-topline">
						<span class="service-number">02</span>
						<span class="service-label">Advice for a specific challenge</span>
					</div>
					<h3>Cyber security consulting</h3>
					<p>
						Get direct, tailored advice on security decisions, risk, and the protections that make
						sense for your size and budget.
					</p>
					<a href="#contact" class="text-link">Talk through a problem <span aria-hidden="true">→</span></a>
				</article>

				<article class="service-card service-card-image">
					<img
						src="/images/startup-support.webp"
						alt="Illustration of digital tools and infrastructure being built"
						width="1400"
						height="788"
						loading="lazy"
					/>
					<div class="service-image-copy">
						<div class="service-topline">
							<span class="service-number">03</span>
							<span class="service-label">For new and changing businesses</span>
						</div>
						<h3>Startup and project support</h3>
						<p>
							Build on a secure base with help planning networks, websites, accounts, and business
							devices.
						</p>
						<a href="#contact" class="text-link">Plan your project <span aria-hidden="true">→</span></a>
					</div>
				</article>
			</div>

			<div class="coming-soon">
				<span>In development</span>
				<p><strong>Self-managed cyber security support</strong> for businesses that want useful intelligence without a full managed-service contract.</p>
			</div>
		</section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="process-inner">
				<div class="process-heading">
					<p class="section-kicker section-kicker-light">A straightforward process</p>
					<h2 id="process-title">No scare tactics.<br />No mystery report.</h2>
					<p>We focus on the decisions that reduce risk and keep your business running.</p>
				</div>

				<ol class="process-steps">
					<li>
						<span>01</span>
						<div>
							<h3>Start with a conversation</h3>
							<p>Tell us how the business works, what is changing, and what is worrying you.</p>
						</div>
					</li>
					<li>
						<span>02</span>
						<div>
							<h3>Review or plan</h3>
							<p>We examine the relevant systems and accounts, or map the setup your project needs.</p>
						</div>
					</li>
					<li>
						<span>03</span>
						<div>
							<h3>Act on clear priorities</h3>
							<p>You get practical next steps, ordered by what matters most, with support available to carry them out.</p>
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
				<p class="section-kicker">Local, practical support</p>
				<h2 id="about-title">Advice made for small business, not an enterprise IT department.</h2>
				<p>
					Servo ICT was founded by Rowan Paterson to make cyber security useful and affordable
					for small businesses. We are based in Gippsland and support clients across Victoria.
				</p>
				<p>
					That means listening first, cutting out what you do not need, and giving you a plan you
					can understand and use.
				</p>
				<div class="about-facts" aria-label="About Servo ICT">
					<div><strong>Gippsland</strong><span>Based locally</span></div>
					<div><strong>Victoria</strong><span>Supporting small business</span></div>
					<div><strong>Free</strong><span>Initial consultation</span></div>
				</div>
			</div>
		</section>

		<section id="contact" class="contact-section section-wrap" aria-labelledby="contact-title">
			<div>
				<p class="section-kicker">Start with a free consultation</p>
				<h2 id="contact-title">What is the one security problem you keep putting off?</h2>
			</div>
			<div class="contact-actions">
				<p>Bring it to a short, no-obligation conversation. We will help you work out the next sensible step.</p>
				<a
					class="button button-primary contact-button"
					href="https://cloud.servoict.com/index.php/apps/appointments/pub/v3VC7MCBGac7N8vb/form?ref=servoict.com"
				>
					Find a time <span aria-hidden="true">→</span>
				</a>
				<div class="contact-details">
					<a href="mailto:support@servoict.com">support@servoict.com</a>
					<a href="tel:0341488665">(03) 4148 8665</a>
				</div>
			</div>
		</section>
	</main>

	<footer>
		<a class="brand footer-brand" href="#top" aria-label="Servo ICT home">
			<img src="/images/servo-ict-logo.png" alt="" width="44" height="44" />
			<span>Servo ICT</span>
		</a>
		<p>Practical cyber security for small business.</p>
		<p class="footer-hours">Phone hours: Monday, Tuesday and Friday, 9am to 4pm.</p>
		<span>© {new Date().getFullYear()} Servo ICT</span>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}

	:global(body) {
		background: #f4f2ec;
		color: #10103f;
		font-family:
			Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
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
		width: 0.6rem;
		height: 0.6rem;
		border-radius: 50%;
		background: #f8a51b;
		box-shadow: 0 0 0 0.35rem rgb(248 165 27 / 15%);
	}

	h1 {
		max-width: 12ch;
		margin: 0;
		font-size: clamp(3.15rem, 6vw, 5.8rem);
		line-height: 0.98;
		letter-spacing: -0.065em;
	}

	h1 em {
		color: #4a4ab9;
		font-family: Georgia, "Times New Roman", serif;
		font-weight: 500;
		letter-spacing: -0.055em;
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
		color: #707083;
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
		border-radius: 2rem;
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
		border-radius: 1.25rem;
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
		font-family: Georgia, "Times New Roman", serif;
		font-size: clamp(1.25rem, 2vw, 1.65rem);
		font-weight: 650;
		line-height: 1.2;
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
		letter-spacing: -0.055em;
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
		border-radius: 1.5rem;
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

	.service-card-image {
		display: grid;
		grid-template-columns: minmax(10rem, 0.75fr) minmax(0, 1.25fr);
		align-items: stretch;
		padding: 0;
		overflow: hidden;
		background: #dedcf6;
	}

	.service-card-image > img {
		width: 100%;
		height: 100%;
		min-height: 27rem;
		object-fit: cover;
		object-position: 59% center;
	}

	.service-image-copy {
		display: flex;
		flex-direction: column;
		padding: clamp(1.6rem, 3vw, 2.4rem);
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
		font-size: 0.68rem;
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

	.service-card > p,
	.service-image-copy > p {
		max-width: 32rem;
		margin: 1.5rem 0 0;
		font-size: 0.96rem;
		line-height: 1.7;
	}

	.service-card-featured > p {
		color: rgb(255 255 255 / 72%);
	}

	.service-card-light > p,
	.service-image-copy > p {
		color: #626277;
	}

	.assessment-areas {
		display: grid;
		margin: auto 0 2rem;
		padding: 0;
		list-style: none;
	}

	.assessment-areas li {
		padding: 0.9rem 0;
		border-bottom: 1px solid rgb(255 255 255 / 17%);
		font-size: 0.85rem;
		font-weight: 700;
	}

	.assessment-areas li::before {
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
		font-size: 0.64rem;
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
		font-family: Georgia, "Times New Roman", serif;
		font-size: clamp(2.5rem, 5vw, 4.6rem);
		font-weight: 500;
		line-height: 1.02;
		letter-spacing: -0.05em;
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
		color: #777789;
		font-size: 0.7rem;
	}

	.contact-section {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(19rem, 0.9fr);
		gap: clamp(3rem, 9vw, 8rem);
		margin-bottom: clamp(4rem, 8vw, 7rem);
		padding: clamp(2rem, 6vw, 5rem);
		border-radius: 2rem;
		background: #f8a51b;
	}

	.contact-section .section-kicker {
		color: #10103f;
	}

	.contact-actions {
		display: flex;
		align-items: flex-start;
		flex-direction: column;
	}

	.contact-actions > p {
		margin: 0 0 1.8rem;
		line-height: 1.7;
	}

	.contact-button {
		min-width: 12rem;
	}

	.contact-details {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem 1.25rem;
		margin-top: 1.5rem;
	}

	.contact-details a {
		font-size: 0.78rem;
		font-weight: 750;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.2rem;
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
		color: #737386;
		font-size: 0.72rem;
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

		.section-heading {
			align-items: start;
		}

		.service-card-image {
			grid-template-columns: 0.9fr 1.1fr;
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

		.service-card-image {
			display: flex;
		}

		.service-card-image > img {
			height: 14rem;
			min-height: 14rem;
		}

		.service-image-copy {
			min-height: 25rem;
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
