import { describe, expect, it } from 'vitest';
import { FormValidationError, parseConsultationRequest } from './consultation';

function validForm(overrides: Record<string, string> = {}): FormData {
	const values = {
		name: 'Alex Example',
		email: 'alex@example.com',
		organisation: 'Example & Co',
		service: 'website',
		message: 'We need a clearer website that is easier to update.',
		...overrides
	};
	const form = new FormData();
	for (const [name, value] of Object.entries(values)) form.set(name, value);
	return form;
}

describe('parseConsultationRequest', () => {
	it('parses and normalises a valid project enquiry', () => {
		const request = parseConsultationRequest(validForm({ email: ' ALEX@EXAMPLE.COM ' }));

		expect(request).toEqual({
			name: 'Alex Example',
			email: 'alex@example.com',
			organisation: 'Example & Co',
			service: 'website',
			message: 'We need a clearer website that is easier to update.'
		});
	});

	it('allows an enquiry without an organisation', () => {
		expect(parseConsultationRequest(validForm({ organisation: '' })).organisation).toBeUndefined();
	});

	it('returns field-level errors for incomplete submissions', () => {
		expect(() =>
			parseConsultationRequest(validForm({ email: 'not-an-email', service: '', message: 'Too short' }))
		).toThrow(FormValidationError);

		try {
			parseConsultationRequest(validForm({ email: 'not-an-email', service: '', message: 'Too short' }));
		} catch (error) {
			const validationError = error as FormValidationError;
			expect(validationError.fieldErrors.email).toMatch(/valid email/i);
			expect(validationError.fieldErrors.service).toMatch(/choose/i);
			expect(validationError.fieldErrors.message).toMatch(/20 characters/i);
		}
	});
});
