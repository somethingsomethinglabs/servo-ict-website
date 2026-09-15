<script lang="ts">
	import { buildConsultationEmailDraft, consultationRecipient, parseConsultationResponse, resolveConsultationService } from '../lib/consultationEmail';
	import { FormValidationError, parseConsultationRequest, serviceLabels } from '../lib/server/consultation';
	import Icon from './Icon.svelte';

	let { baseUrl = '/', turnstileSiteKey = '', consultationMode = 'server', expanded = false, defaultService, returnPath }: { baseUrl?: string; turnstileSiteKey?: string; consultationMode?: 'server' | 'email'; expanded?: boolean; defaultService?: keyof typeof serviceLabels; returnPath?: string } = $props();
	let contactMethod = $state<'email' | 'phone'>('email');
	let state = $state<'idle' | 'sending' | 'success' | 'error'>('idle');
	let message = $state('');
	let fieldErrors = $state<Record<string, string>>({});
	let copyText = $state('');
	let showCopy = $state(false);
	let requestedService = $state<string | null>(null);
	let service = $derived<keyof typeof serviceLabels>(requestedService ? resolveConsultationService(requestedService) as keyof typeof serviceLabels : defaultService ?? (expanded ? 'other' : 'starter'));
	let editVersion = 0;
	const sitePath = (path: string) => `${baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`}${path.replace(/^\//, '')}`;

	$effect(() => {
		requestedService = new URLSearchParams(window.location.search).get('service');
	});

	function clearFeedback() {
		editVersion += 1;
		fieldErrors = {};
		message = '';
		copyText = '';
		showCopy = false;
		if (state !== 'sending') state = 'idle';
	}

	function validate(form: HTMLFormElement): boolean {
		fieldErrors = {};
		try {
			parseConsultationRequest(new FormData(form));
			return true;
		} catch (error) {
			if (!(error instanceof FormValidationError)) throw error;
			fieldErrors = error.fieldErrors;
			state = 'error';
			message = error.message;
			const first = ['name', 'contact', 'organisation', 'message', 'timing'].find((name) => fieldErrors[name]) ?? Object.keys(fieldErrors)[0];
			if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
			return false;
		}
	}

	function prepareFallback(form: HTMLFormElement) {
		copyText = buildConsultationEmailDraft(new FormData(form)).plainText;
		showCopy = true;
	}

	async function copyDraft(form: HTMLFormElement) {
		if (state === 'sending' || !validate(form)) return;
		const version = editVersion;
		prepareFallback(form);
		try {
			await navigator.clipboard.writeText(copyText);
			if (version !== editVersion) return;
			message = 'Enquiry copied. Paste it into an email and send it to support@servoict.com.';
			state = 'idle';
			showCopy = false;
		} catch {
			if (version !== editVersion) return;
			message = 'Copy is unavailable here. Select the prepared enquiry below and copy it.';
			state = 'error';
		}
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		const form = event.currentTarget as HTMLFormElement;
		if (state === 'sending' || !validate(form)) return;
		showCopy = false;
		if (consultationMode === 'email') {
			const draft = buildConsultationEmailDraft(new FormData(form));
			message = 'Your email app should open with a draft. Review it, then press Send.';
			state = 'idle';
			window.location.href = draft.mailto;
			return;
		}

		state = 'sending';
		message = 'Sending your enquiry...';
		try {
			const response = await fetch(form.action, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
			const body = parseConsultationResponse(await response.json());
			if (!body) throw new Error('Malformed response');
			const sent = response.ok && body.ok;
			state = sent ? 'success' : 'error';
			message = sent ? body.message : body.ok ? 'Your enquiry could not be sent. Copy it below, then email it to support@servoict.com.' : body.message;
			fieldErrors = body.fieldErrors || {};
			if (sent) form.reset();
			else {
				const first = ['name', 'contact', 'organisation', 'message', 'timing'].find((name) => fieldErrors[name]) ?? Object.keys(fieldErrors)[0];
				if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
				else prepareFallback(form);
			}
		} catch {
			state = 'error';
			message = 'Your enquiry could not be sent. Copy it below, then email it to support@servoict.com.';
			prepareFallback(form);
		} finally {
			(window as typeof window & { turnstile?: { reset: () => void } }).turnstile?.reset();
		}
	}
</script>

<form id="consultation-form" class:expanded method="post" action={consultationMode === 'email' ? `mailto:${consultationRecipient}?subject=Project%20enquiry` : sitePath('/api/consultation')} onsubmit={submit} oninput={clearFeedback}>
	<input type="hidden" name="service" value={service} />
	<input type="hidden" name="returnPath" value={returnPath ?? (expanded ? sitePath('/contact/') : baseUrl)} />
	<div class="fields">
		<label><span id="name-label">Your name</span><input aria-labelledby="name-label" name="name" autocomplete="name" maxlength="100" placeholder="Jane Smith" required readonly={state === 'sending'} aria-invalid={fieldErrors.name ? 'true' : undefined} aria-describedby={fieldErrors.name ? 'name-error' : undefined} />{#if fieldErrors.name}<small id="name-error">{fieldErrors.name}</small>{/if}</label>
		{#if expanded}<fieldset disabled={state === 'sending'}><legend>How would you like us to reply?</legend><div class="reply-options"><label><input type="radio" name="contactMethod" value="email" bind:group={contactMethod} />Email</label><label><input type="radio" name="contactMethod" value="phone" bind:group={contactMethod} />Phone</label></div></fieldset>{/if}
		<label><span id="contact-label">{expanded ? contactMethod === 'email' ? 'Email address' : 'Phone number' : 'Email or phone'}</span><input name="contact" type={expanded ? contactMethod === 'email' ? 'email' : 'tel' : 'text'} autocomplete={expanded ? contactMethod === 'email' ? 'email' : 'tel' : undefined} maxlength="254" placeholder={expanded ? contactMethod === 'email' ? 'jane@example.com' : '0412 345 678' : 'jane@gmail.com or 0412 345 678'} required readonly={state === 'sending'} aria-labelledby="contact-label" aria-invalid={fieldErrors.contact ? 'true' : undefined} aria-describedby={fieldErrors.contact ? 'contact-help contact-error' : 'contact-help'} /><small id="contact-help" class="help">{expanded && contactMethod === 'phone' ? 'The best number to reach you on.' : 'A personal email address is fine.'}</small>{#if fieldErrors.contact}<small id="contact-error">{fieldErrors.contact}</small>{/if}</label>
		{#if expanded}<label><span id="organisation-label">Business name, if you have one <em>(optional)</em></span><input aria-labelledby="organisation-label" name="organisation" autocomplete="organization" maxlength="120" placeholder="e.g. Gippsland Garden Care" readonly={state === 'sending'} aria-invalid={fieldErrors.organisation ? 'true' : undefined} aria-describedby={fieldErrors.organisation ? 'organisation-error' : undefined}/>{#if fieldErrors.organisation}<small id="organisation-error">{fieldErrors.organisation}</small>{/if}</label>{/if}
		<label class="wide"><span id="message-label">{expanded ? 'What are you starting or trying to sort out?' : service === 'starter' ? 'What are you starting?' : 'What would you like help with?'}</span><textarea aria-labelledby="message-label" name="message" rows={expanded ? 4 : 3} minlength="10" maxlength="2000" placeholder={service === 'starter' ? 'e.g. cafe, trade business, local service...' : 'A rough description is enough...'} required readonly={state === 'sending'} aria-invalid={fieldErrors.message ? 'true' : undefined} aria-describedby={fieldErrors.message ? 'message-error' : undefined}></textarea>{#if fieldErrors.message}<small id="message-error">{fieldErrors.message}</small>{/if}</label>
		{#if expanded}<label><span id="timing-label">Any date we should know about? <em>(optional)</em></span><input aria-labelledby="timing-label" name="timing" maxlength="160" placeholder="e.g. in the next few months" readonly={state === 'sending'} aria-invalid={fieldErrors.timing ? 'true' : undefined} aria-describedby={fieldErrors.timing ? 'timing-error' : undefined}/>{#if fieldErrors.timing}<small id="timing-error">{fieldErrors.timing}</small>{/if}</label>{/if}
	</div>
	<label class="honeypot" aria-hidden="true">Company website<input name="companyWebsite" tabindex="-1" autocomplete="off" /></label>
	{#if consultationMode === 'server' && turnstileSiteKey}<div class="cf-turnstile" data-sitekey={turnstileSiteKey} data-action="consultation" data-theme="light"></div>{/if}
	{#if consultationMode === 'email'}<p class="delivery-note">This opens a prepared draft. Review it, then press Send in your email app.</p>{/if}
	<button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending...' : consultationMode === 'email' ? 'Open email draft' : 'Send enquiry'} <Icon name="arrowRight" size={20} /></button>
	<p class:success={state === 'success'} class:error={state === 'error'} class="status" role="status" aria-live="polite">{message}</p>
	{#if state === 'error' || consultationMode === 'email'}<button class="copy" type="button" disabled={state === 'sending'} onclick={(event) => copyDraft(event.currentTarget.form!)}>Copy enquiry instead</button>{/if}
	{#if showCopy}<label class="prepared"><span>Prepared enquiry</span><textarea readonly rows="9" value={copyText} onfocus={(event) => event.currentTarget.select()}></textarea></label>{/if}
	<p class="privacy">Do not include passwords or sensitive customer information. <a href={sitePath('/privacy/')}>Read the privacy notice</a>.</p>
	<noscript><p class="no-script">If the form or spam check does not work, email <a href="mailto:support@servoict.com">support@servoict.com</a> or call <a href="tel:0341488665">(03) 4148 8665</a>.</p></noscript>
</form>

<style>
	form { container-type:inline-size; position: relative; min-width: 0; color: #242126; }
	.expanded .fields { grid-template-columns:1fr; gap:1.5rem; }
	em { color:var(--muted); font-style:normal; font-weight:450; }
	fieldset { margin:0; padding:0; border:0; min-width:0; }legend { margin-bottom:.45rem; padding:0; font-size:.9rem; font-weight:800; }
	.reply-options { display:flex; gap:1.5rem; }.reply-options label{display:flex;align-items:center;gap:.6rem;min-height:44px;cursor:pointer}
	.reply-options input{width:20px;height:20px;min-height:20px;margin:0;accent-color:#a82461;cursor:pointer}
	.fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 1rem 1.5rem; }
	label { display: grid; gap: .38rem; min-width: 0; } label > span { font-size: .9rem; font-weight: 800; } .wide { grid-column: 1 / -1; }
	input, textarea { width: 100%; min-width: 0; box-sizing: border-box; border: 1px solid #908b91; border-radius: 2px; background: #fffdfa; color: #242126; font: inherit; font-size: 1rem; padding: .75rem .8rem; outline: none; }
	input { min-height: 3rem; } textarea { min-height: 5.5rem; resize: vertical; line-height: 1.45; }
	input:focus, textarea:focus { border-color: #242126; outline: 3px solid #a82461; outline-offset: 2px; } [aria-invalid='true'] { border-color: #9f2020; }
	small, .error { color: #8b1919; font-size: .85rem; } .help { color: #625c64; }
	button[type='submit'] { display: flex; justify-content: center; align-items: center; gap: 1.5rem; min-width: 14rem; min-height: 3.5rem; margin-top: 1rem; padding: .8rem 1.5rem; border: 2px solid #242126; border-radius: 2px; background: #242126; color: #fffdfa; box-shadow: 5px 5px 0 #f27ab5; font: inherit; font-weight: 800; cursor: pointer; }
	button[type='submit']:focus-visible, .copy:focus-visible { outline: 3px solid #a82461; outline-offset: 3px; } button:disabled { cursor: wait; opacity: .7; }
	.status { min-height: 1.2em; margin: .9rem 0 0; font-size: .9rem; line-height: 1.45; } .success { color: #126044; font-weight: 750; }
	.copy { min-height: 44px; margin-top: .4rem; padding: .65rem .2rem; border: 0; background: transparent; color: #242126; font: inherit; font-size: .85rem; font-weight: 750; text-decoration: underline; cursor: pointer; }
	.prepared { margin-top: .8rem; } .honeypot { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; } .cf-turnstile { margin-top: 1rem; }
	.delivery-note, .privacy, .no-script { margin: .9rem 0 0; color: #625c64; font-size: .85rem; line-height: 1.5; } .privacy a { color: #242126; font-weight: 700; }
	@container (max-width: 420px) { .fields { grid-template-columns: 1fr; } .wide { grid-column: auto; } }
	@media (max-width: 36rem) { input, textarea { font-size: 16px; } button[type='submit'] { width: 100%; min-width: 0; } }
</style>
