import { DateTime } from 'luxon';
import { describe, expect, it } from 'vitest';
import {
	buildCalendarInvitation,
	FormValidationError,
	parseConsultationRequest
} from './consultation';

function validForm(overrides: Record<string, string> = {}): FormData {
	const values = {
		name: 'Alex Example',
		email: 'alex@example.com',
		organisation: 'Example & Co',
		phone: '0400 000 000',
		service: 'assessment',
		contactPreference: 'video',
		preferredDate: '2026-09-12',
		preferredTime: '10:00',
		alternateDate: '',
		alternateTime: '',
		message: 'We need help reviewing account security and device access.',
		timezone: 'Australia/Melbourne',
		privacy: 'on',
		...overrides
	};
	const form = new FormData();
	for (const [name, value] of Object.entries(values)) form.set(name, value);
	return form;
}

const options = {
	minimumNoticeHours: 24,
	fallbackTimezone: 'Australia/Melbourne',
	now: DateTime.fromISO('2026-09-10T00:00:00Z')
};

describe('parseConsultationRequest', () => {
	it('parses a valid local consultation time', () => {
		const request = parseConsultationRequest(validForm(), options);

		expect(request.name).toBe('Alex Example');
		expect(request.preferredStart.zoneName).toBe('Australia/Melbourne');
		expect(request.preferredStart.toUTC().toISO()).toBe('2026-09-12T00:00:00.000Z');
	});

	it('requires the full alternate time pair', () => {
		expect(() =>
			parseConsultationRequest(validForm({ alternateDate: '2026-09-13' }), options)
		).toThrow(FormValidationError);

		try {
			parseConsultationRequest(validForm({ alternateDate: '2026-09-13' }), options);
		} catch (error) {
			expect((error as FormValidationError).fieldErrors.alternateDate).toMatch(/both/i);
		}
	});

	it('rejects a requested time inside the minimum notice period', () => {
		expect(() =>
			parseConsultationRequest(
				validForm({ preferredDate: '2026-09-10', preferredTime: '18:00' }),
				options
			)
		).toThrow(/check the highlighted details/i);
	});
});

describe('buildCalendarInvitation', () => {
	it('creates a tentative UTC calendar request and escapes visitor text', () => {
		const request = parseConsultationRequest(
			validForm({ message: 'Review accounts, backups; and access\\rules.' }),
			options
		);
		const calendar = buildCalendarInvitation(request, {
			durationMinutes: 30,
			organizerEmail: 'website@servoict.com',
			organizerName: 'Servo ICT Website',
			attendeeEmail: 'support@servoict.com',
			uid: 'test-request@servoict.com',
			now: DateTime.fromISO('2026-09-10T00:00:00Z')
		});
		const unfolded = calendar.replace(/\r\n /g, '');

		expect(unfolded).toContain('METHOD:REQUEST');
		expect(unfolded).toContain('STATUS:TENTATIVE');
		expect(unfolded).toContain('DTSTART:20260912T000000Z');
		expect(unfolded).toContain('DTEND:20260912T003000Z');
		expect(unfolded).toContain('accounts\\, backups\\; and access\\\\rules');
		expect(unfolded).toContain(
			'ATTENDEE;CN=Servo ICT;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:support@servoict.com'
		);
	});
});
