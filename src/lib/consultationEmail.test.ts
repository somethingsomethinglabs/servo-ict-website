import { describe, expect, it } from 'vitest';
import { buildConsultationEmailDraft, parseConsultationResponse, resolveConsultationMode, resolveConsultationService } from './consultationEmail';

function consultationForm() {
	const form = new FormData();
	for (const [name, value] of Object.entries({
		name: ' Alex Example ',
		email: 'alex@example.com',
		organisation: 'Example & Co',
		service: 'website',
		message: 'We need a website refresh.\nThe current site is difficult to update.'
	})) {
		form.set(name, value);
	}
	return form;
}

describe('buildConsultationEmailDraft', () => {
	it('uses the same recipient, subject and body for the mailto and copy fallback', () => {
		const draft = buildConsultationEmailDraft(consultationForm());
		const mailto = new URL(draft.mailto);

		expect(draft.recipient).toBe('support@servoict.com');
		expect(mailto.protocol).toBe('mailto:');
		expect(mailto.pathname).toBe(draft.recipient);
		expect(mailto.searchParams.get('subject')).toBe('Project enquiry from Alex Example');
		expect(mailto.searchParams.get('subject')).toBe(draft.subject);
		expect(mailto.searchParams.get('body')).toBe(draft.body);
		expect(draft.body).toContain('Organisation: Example & Co');
		expect(draft.body).toContain('Project type: Website design or development');
		expect(draft.body).toContain(
			'We need a website refresh.\nThe current site is difficult to update.'
		);
		expect(draft.plainText).toBe(
			[`To: ${draft.recipient}`, `Subject: ${draft.subject}`, '', draft.body].join('\n')
		);
	});

	it('omits the optional organisation without adding extra blank lines', () => {
		const form = consultationForm();
		form.set('organisation', '   ');

		const draft = buildConsultationEmailDraft(form);

		expect(draft.body).not.toContain('Organisation:');
		expect(draft.body).not.toContain('\n\n\n');
	});

	it('prepares a useful phone-only draft for the static fallback', () => {
		const form = new FormData();
		form.set('name', 'Jamie');
		form.set('contact', '0412 345 678');
		form.set('message', 'I am opening a bookkeeping business.');

		const draft = buildConsultationEmailDraft(form);

		expect(draft.body).toContain('Email or phone: 0412 345 678');
		expect(draft.body).toContain('Project type: New business essentials');
		expect(draft.plainText).toContain('To: support@servoict.com');
	});
});

describe('enquiry client helpers', () => {
	it('preserves known service context and rejects inherited object keys', () => {
		expect(resolveConsultationService('security')).toBe('security');
		expect(resolveConsultationService('toString')).toBe('starter');
		expect(resolveConsultationService(null)).toBe('starter');
	});

	it('rejects malformed endpoint responses', () => {
		expect(parseConsultationResponse({ ok: true, message: 'Sent' })).toEqual({ ok: true, message: 'Sent' });
		expect(parseConsultationResponse({ ok: true })).toBeNull();
		expect(parseConsultationResponse({ ok: 'yes', message: 'Sent' })).toBeNull();
		expect(parseConsultationResponse('<html>error</html>')).toBeNull();
	});

	it('uses direct delivery only when the spam check can be shown or explicitly bypassed in development', () => {
		expect(resolveConsultationMode({ staticSite: false, hasTurnstileSiteKey: true, allowInsecureLocal: false, isDevelopment: false })).toBe('server');
		expect(resolveConsultationMode({ staticSite: false, hasTurnstileSiteKey: false, allowInsecureLocal: true, isDevelopment: true })).toBe('server');
		expect(resolveConsultationMode({ staticSite: false, hasTurnstileSiteKey: false, allowInsecureLocal: true, isDevelopment: false })).toBe('email');
		expect(resolveConsultationMode({ staticSite: true, hasTurnstileSiteKey: true, allowInsecureLocal: true, isDevelopment: true })).toBe('email');
	});

	it('uses a help-focused heading in nonstarter drafts', () => {
		const form = consultationForm();
		const draft = buildConsultationEmailDraft(form);
		expect(draft.body).toContain('What I would like help with:');
		expect(draft.body).not.toContain('What I am starting:');
	});
});
