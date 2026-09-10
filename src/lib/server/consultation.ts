export const serviceLabels = {
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
} as const;

type Service = keyof typeof serviceLabels;

export interface ConsultationRequest {
	name: string;
	email: string;
	organisation?: string;
	service: Service;
	message: string;
}

export class FormValidationError extends Error {
	constructor(
		message: string,
		public readonly fieldErrors: Record<string, string> = {}
	) {
		super(message);
		this.name = 'FormValidationError';
	}
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

function checkLength(
	fieldErrors: Record<string, string>,
	name: string,
	label: string,
	input: string,
	maximum: number,
	minimum = 0
) {
	if (input.length < minimum) fieldErrors[name] = `${label} must be at least ${minimum} characters.`;
	if (input.length > maximum) fieldErrors[name] = `${label} must be no more than ${maximum} characters.`;
}

export function parseConsultationRequest(form: FormData): ConsultationRequest {
	const fieldErrors: Record<string, string> = {};
	const name = value(form, 'name');
	const email = value(form, 'email').toLowerCase();
	const organisation = value(form, 'organisation');
	const service = value(form, 'service');
	const message = value(form, 'message');

	if (!name) fieldErrors.name = 'Enter your name.';
	checkLength(fieldErrors, 'name', 'Name', name, 100);
	if (/\r|\n/.test(name)) fieldErrors.name = 'Enter your name on one line.';
	if (!emailPattern.test(email) || email.length > 254) fieldErrors.email = 'Enter a valid email address.';
	checkLength(fieldErrors, 'organisation', 'Organisation', organisation, 120);
	if (/\r|\n/.test(organisation)) fieldErrors.organisation = 'Enter the organisation on one line.';
	if (!(service in serviceLabels)) fieldErrors.service = 'Choose what you would like help with.';
	if (!message) fieldErrors.message = 'Tell us a little about what you need help with.';
	checkLength(fieldErrors, 'message', 'Message', message, 2000, 20);

	if (Object.keys(fieldErrors).length > 0) {
		throw new FormValidationError('Please check the highlighted details and try again.', fieldErrors);
	}

	return {
		name,
		email,
		organisation: organisation || undefined,
		service: service as Service,
		message
	};
}

export function escapeHtml(input: string): string {
	return input.replace(/[&<>'"]/g, (character) => {
		const entities: Record<string, string> = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			"'": '&#39;',
			'"': '&quot;'
		};
		return entities[character];
	});
}
