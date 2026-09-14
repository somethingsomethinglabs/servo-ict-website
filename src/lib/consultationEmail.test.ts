import { describe, expect, it } from 'vitest';
import { buildConsultationEmailDraft } from './consultationEmail';

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
});
