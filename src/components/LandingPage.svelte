<script lang="ts">
	import EnquiryForm from './EnquiryForm.svelte';
	import Icon from './Icon.svelte';
	import SiteHeader from './SiteHeader.svelte';
	import WorkExample from './WorkExample.svelte';
	import { starterOffer, starterSetupPrice } from '../lib/starterOffer';

	let { baseUrl = '/', turnstileSiteKey = '', consultationMode = 'server' }: { baseUrl?: string; turnstileSiteKey?: string; consultationMode?: 'server' | 'email' } = $props();
	const sitePath = (path: string) => baseUrl + path.replace(/^\//, '');
	const enquiryPath = (service: string, source: string) => `${sitePath('/contact/')}?${new URLSearchParams({ service, source })}#consultation-form`;
</script>

<div class="page-shell">
	<a class="skip-link" href="#main-content">Skip to content</a>
	<SiteHeader {baseUrl} active="home" service="starter" source="home" />
	<main id="main-content">
		<span id="top" aria-hidden="true"></span>
		<section class="hero" aria-labelledby="hero-title">
			<div class="hero-inner page-width">
				<div>
					<p class="eyebrow">For new businesses in Gippsland</p>
					<h1 id="hero-title">Your business, ready online.</h1>
					<p class="lead">Website, business email and essential accounts, set up together with one person to guide you.</p>
					<p class="hero-price"><strong>{starterSetupPrice} setup.</strong> Domain, hosting and email subscriptions cost extra.</p>
					<div class="actions"><a class="button" href={sitePath('/start-a-business/')}>See the starter offer <Icon name="arrowRight" size={22} /></a></div>
				</div>
				<div class="hero-art"><img class="photo" src={sitePath('/images/illustrations/new-business-storefront.webp')} width="1122" height="1402" alt="A New Business sign hanging in a shop window." fetchpriority="high" /></div>
			</div>
		</section>

		<section id="services" class="existing page-width" aria-labelledby="existing-title">
			<div id="other-services"><h2 id="existing-title">Already trading?</h2></div>
			<nav aria-label="Services for existing businesses"><a href={sitePath('/websites/')}>Websites</a><a href={sitePath('/business-it/')}>Business IT</a><a href={sitePath('/security/')}>Account security</a></nav>
		</section>

		<section id="included" class="offer-section" aria-labelledby="included-title">
			<div class="page-width offer-grid">
				<div>
					<h2 id="included-title">What's included</h2>
					<ul class="inclusions">
						<li>A mobile-friendly website, up to {starterOffer.pageLimit} pages</li>
						<li>One business email mailbox for one user</li>
						<li>Your domain connected to the website and email</li>
						<li>Sign-in protection and recovery for those accounts</li>
					</ul>
					<p class="fine-print scope-note">Online stores and ongoing support are not included.</p>
				</div>
				<div id="costs" class="offer-card">
					<p class="price"><span>Setup fee</span><strong>{starterSetupPrice}</strong></p>
					<div class="annual-budget">
						<p><strong>{starterOffer.annualBudgetNote.display}</strong> for domain, hosting and email.</p>
						<p class="fine-print">Planning estimate, billed separately by your suppliers. Actual costs depend on the services chosen.</p>
					</div>
					<a class="text-link" href={sitePath('/start-a-business/')}>Full scope and costs <Icon name="arrowRight" size={22} /></a>
				</div>
			</div>
		</section>

		<section id="work" class="proof-section"><div class="page-width"><WorkExample {baseUrl} compact /></div></section>

		<section id="process" class="process-section" aria-labelledby="process-title">
			<div class="page-width process-grid">
				<div><h2 id="process-title">How it works</h2></div>
				<ol>
					<li><span>1</span><div><h3>Tell us what you need</h3><p>A rough description is enough to start.</p></div></li>
					<li><span>2</span><div><h3>Approve your written quote</h3><p>Agree on scope, costs, responsibilities and timing before work begins.</p></div></li>
					<li><span>3</span><div><h3>Review and take over</h3><p>One round of feedback, then your account access and a walkthrough.</p></div></li>
				</ol>
			</div>
		</section>

		<section id="contact" class="contact-section" aria-labelledby="contact-title">
			<div class="page-width contact-grid">
				<div>
					<h2 id="contact-title">Tell us what you're starting.</h2>
					<p class="lead">We aim to reply within two business days.</p>
					<a class="phone-link" href="tel:0341488665">Prefer a call? (03) 4148 8665</a>
					<p class="fine-print">Monday, Tuesday and Friday, 9am to 4pm.</p>
				</div>
				<EnquiryForm {baseUrl} {turnstileSiteKey} {consultationMode} defaultService="starter" source="home" returnPath={baseUrl} />
			</div>
		</section>
	</main>
	<footer id="about"><a class="footer-brand" href={baseUrl}><img src={sitePath('/images/servo-ict-logo.png')} alt="" width="42" height="42" />Servo ICT · Gippsland</a><nav aria-label="Footer navigation"><a href={sitePath('/start-a-business/')}>Start a business</a><a href={sitePath('/about/')}>About</a><a href={sitePath('/blog/')}>Advice</a><a href={enquiryPath('starter', 'home')}>Contact</a><a href={sitePath('/privacy/')}>Privacy</a><a href="mailto:support@servoict.com">support@servoict.com</a></nav><span>© {new Date().getFullYear()} Servo ICT</span></footer>
</div>

<style>
	.page-shell{overflow:clip}.page-width{width:var(--content-width);margin-inline:auto}.skip-link{position:fixed;z-index:30;left:1rem;top:1rem;transform:translateY(-200%);padding:.8rem 1.2rem;background:var(--plastic);color:var(--ink);font-weight:700}.skip-link:focus{transform:translateY(0)}
	.hero,.offer-section,.proof-section{background-color:var(--plastic);border-bottom:1px solid var(--seam);box-shadow:inset 0 -1px 0 var(--edge)}.hero-inner{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,.85fr);gap:clamp(2rem,5vw,5rem);align-items:center;padding-block:var(--home-section-space)}
	.eyebrow{margin:0 0 1rem;color:var(--ink);font-size:.76rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase}h1,h2,h3{margin:0}h1{font-size:clamp(2.75rem,5.4vw,5rem);line-height:1.05;letter-spacing:-.045em}h2{font-size:clamp(2rem,4vw,3.4rem);line-height:1.1;letter-spacing:-.04em}h3{font-size:1.12rem}.lead{max-width:38rem;margin:1.2rem 0 0;color:var(--muted);font-size:clamp(1.08rem,1.5vw,1.25rem);line-height:1.6}.actions{display:flex;flex-wrap:wrap;align-items:center;gap:1.2rem 1.8rem;margin-top:1.6rem}.button{display:inline-flex;align-items:center;justify-content:center;gap:1.2rem;min-height:54px;padding:.8rem 1.2rem;font-weight:700;text-decoration:none}.text-link,.phone-link{display:inline-flex;align-items:center;min-height:44px;font-weight:700}.hero-art{width:100%;max-width:23rem;justify-self:center}.photo{display:block;width:100%;height:auto;aspect-ratio:4/5;object-fit:cover;border:1px solid var(--seam);border-radius:8px;box-shadow:var(--image-recess)}
	.hero-price{max-width:var(--reading-measure);margin:1.25rem 0 0;font-size:1rem;line-height:1.6}.hero-price strong{color:var(--ink)}
	.existing{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:3rem;padding-block:clamp(2.25rem,4vw,3.5rem)}.existing h2{font-size:clamp(1.6rem,3vw,2.4rem)}.existing nav{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:.5rem 2rem}.existing a{min-height:44px;display:inline-flex;align-items:center;font-weight:700}
	.offer-section{padding-block:var(--section-space);border-top:1px solid var(--seam)}
	.offer-grid{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,.9fr);gap:clamp(3rem,7vw,7rem);align-items:start}
	.offer-card{padding-left:clamp(1.5rem,4vw,4rem);border-left:1px solid var(--line)}
	.inclusions{display:grid;gap:1rem;margin:2rem 0 0;padding-left:1.2rem;line-height:1.6}
	.inclusions li{padding-left:.35rem}
	.scope-note{margin:1.5rem 0 0;max-width:38rem}
	.price{display:flex;flex-wrap:wrap;gap:.5rem 1rem;justify-content:space-between;align-items:baseline;margin:0;padding-bottom:1.5rem;border-bottom:1px solid var(--line)}
	.price span{font-weight:700}.price strong{font-size:clamp(2rem,4vw,3.2rem);letter-spacing:-.04em}
	.annual-budget{display:grid;gap:.75rem;margin:1.5rem 0;line-height:1.6}.annual-budget p{margin:0}.annual-budget strong{font-size:1.1rem}
	.fine-print{color:var(--muted);font-size:.9rem;line-height:1.6}
	.offer-card .text-link{gap:1rem}
	.proof-section{padding-block:var(--section-space)}
	.process-section,.contact-section{padding-block:var(--home-section-space)}
	.process-grid{display:grid;grid-template-columns:minmax(0,.75fr) minmax(0,1.25fr);gap:4rem}
	.process-grid ol{display:grid;gap:2rem;margin:0;padding:0;list-style:none}
	.process-grid li{display:grid;grid-template-columns:2ch 1fr;gap:1rem}
	.process-grid li>span{font-weight:700;line-height:1.3}
	.process-grid p{margin:.5rem 0 0;color:var(--muted);line-height:1.6}
	.contact-grid{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:clamp(3rem,7vw,7rem);padding-top:var(--home-section-space);border-top:1px solid var(--line)}
	.contact-section{padding-top:0}.phone-link{margin-top:1.5rem}

	footer{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:2rem;padding-block:3rem;font-size:.9rem}.footer-brand{display:flex;align-items:center;gap:.7rem;font-weight:700;text-decoration:none}.footer-brand img{filter:grayscale(1) brightness(0) invert(.79)}footer nav{display:flex;justify-content:center;flex-wrap:wrap;gap:.5rem 1.5rem}footer nav a{display:inline-flex;align-items:center;min-height:44px}
	@media(max-width:760px){.hero-inner,.existing,.offer-grid,.process-grid,.contact-grid{grid-template-columns:1fr}.hero-art{max-width:20rem}.existing{gap:1.5rem}.existing nav{justify-content:flex-start}.offer-grid{gap:2.5rem}.offer-card{padding:2rem 0 0;border-left:0;border-top:1px solid var(--line)}.button{width:100%;justify-content:space-between}.process-grid{gap:2.5rem}footer{grid-template-columns:1fr;align-items:start}footer nav{justify-content:flex-start}}
</style>
