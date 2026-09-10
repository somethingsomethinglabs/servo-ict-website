import { describe, expect, it } from 'vitest';
import { buildConsultationMailto } from './consultationEmail';

describe('buildConsultationMailto', () => {
	it('packages the consultation details into an encoded email draft', () => {
		const form = new FormData();
		for (const [name, value] of Object.entries({
			name: 'Alex Example',
			email: 'alex@example.com',
			organisation: 'Example & Co',
			service: 'website',
			message: 'We need a website refresh.\nThe current site is difficult to update.'
		})) {
			form.set(name, value);
		}

		const mailto = new URL(buildConsultationMailto(form));
		const body = mailto.searchParams.get('body');

		expect(mailto.protocol).toBe('mailto:');
		expect(mailto.pathname).toBe('support@servoict.com');
		expect(mailto.searchParams.get('subject')).toBe('Project enquiry from Alex Example');
		expect(body).toContain('Organisation: Example & Co');
		expect(body).toContain('Project type: Website design or development');
		expect(body).toContain('We need a website refresh.\nThe current site is difficult to update.');
	});
});
