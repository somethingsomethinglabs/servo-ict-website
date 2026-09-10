import { describe, expect, it } from 'vitest';
import { buildConsultationMailto } from './consultationEmail';

describe('buildConsultationMailto', () => {
	it('packages the consultation details into an encoded email draft', () => {
		const form = new FormData();
		for (const [name, value] of Object.entries({
			name: 'Alex Example',
			email: 'alex@example.com',
			organisation: 'Example & Co',
			phone: '0400 000 000',
			service: 'website',
			contactPreference: 'video',
			preferredDate: '2026-09-12',
			preferredTime: '10:00',
			alternateDate: '2026-09-15',
			alternateTime: '14:30',
			timezone: 'Australia/Melbourne',
			message: 'We need a website refresh.\nThe current site is difficult to update.'
		})) {
			form.set(name, value);
		}

		const mailto = new URL(buildConsultationMailto(form));
		const body = mailto.searchParams.get('body');

		expect(mailto.protocol).toBe('mailto:');
		expect(mailto.pathname).toBe('support@servoict.com');
		expect(mailto.searchParams.get('subject')).toBe('Project consultation request from Alex Example');
		expect(body).toContain('Organisation: Example & Co');
		expect(body).toContain('Service: Website design or development');
		expect(body).toContain('Preferred time: Saturday 12 September 2026 at 10:00 (Australia/Melbourne)');
		expect(body).toContain('Alternate time: Tuesday 15 September 2026 at 14:30 (Australia/Melbourne)');
		expect(body).toContain('We need a website refresh.\nThe current site is difficult to update.');
	});
});
