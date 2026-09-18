import { normaliseEnquirySource } from '../enquiryEvents';

export const serviceLabels = {
	unsure: "I'm not sure yet",
	starter: 'New business essentials',
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
} as const;

type Service = keyof typeof serviceLabels;

export interface ConsultationRequest {
	name: string;
	email?: string;
	phone?: string;
	organisation?: string;
	timing?: string;
	service: Service;
	source?: string;
	originPath?: string;
	message: string;
}

export class FormValidationError extends Error {
	constructor(message: string, public readonly fieldErrors: Record<string, string> = {}) {
		super(message);
		this.name = 'FormValidationError';
	}
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s().-]{6,29}$/;

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

function checkLength(fieldErrors: Record<string, string>, name: string, label: string, input: string, maximum: number, minimum = 0) {
	if (input.length < minimum) fieldErrors[name] = `${label} must be at least ${minimum} characters.`;
	if (input.length > maximum) fieldErrors[name] = `${label} must be no more than ${maximum} characters.`;
}

function optionalContext(form: FormData, name: 'source' | 'originPath', maximum: number): string | undefined {
	const input = value(form, name);
	if (!input) return undefined;
	if (input.length > maximum || /[\r\n?#]/.test(input)) return undefined;
	if (name === 'source') return normaliseEnquirySource(input);
	if (name === 'originPath' && (!input.startsWith('/') || input.startsWith('//'))) return undefined;
	return input;
}

function parseContact(form: FormData, fieldErrors: Record<string, string>): { email?: string; phone?: string } {
	const contact = value(form, 'contact');
	const legacyEmail = value(form, 'email');
	const legacyPhone = value(form, 'phone');
	const fieldName = contact ? 'contact' : legacyEmail ? 'email' : legacyPhone ? 'phone' : 'contact';
	const input = contact || legacyEmail || legacyPhone;
	const method = value(form, 'contactMethod');
	if (method && method !== 'email' && method !== 'phone') fieldErrors.contactMethod = 'Choose email or phone.';
	if (!input) {
		fieldErrors[fieldName] = method === 'email' ? 'Enter your email address.' : method === 'phone' ? 'Enter your phone number.' : 'Enter an email address or phone number.';
		return {};
	}
	if (method === 'email' || (!method && input.includes('@'))) {
		const email = input.toLowerCase();
		if (!emailPattern.test(email) || email.length > 254) fieldErrors[fieldName] = method === 'email' ? 'Enter a valid email address.' : 'Enter a valid email address or phone number.';
		return { email };
	}
	if (!phonePattern.test(input) || input.replace(/\D/g, '').length < 8) fieldErrors[fieldName] = method === 'phone' ? 'Enter a valid phone number.' : 'Enter a valid email address or phone number.';
	return { phone: input };
}

export function parseConsultationRequest(form: FormData): ConsultationRequest {
	const fieldErrors: Record<string, string> = {};
	const name = value(form, 'name');
	const organisation = value(form, 'organisation');
	const timing = value(form, 'timing');
	const service = value(form, 'service') || 'unsure';
	const source = optionalContext(form, 'source', 80);
	const originPath = optionalContext(form, 'originPath', 240);
	const message = value(form, 'message');
	const contact = parseContact(form, fieldErrors);
	if (!name) fieldErrors.name = 'Enter your name.';
	checkLength(fieldErrors, 'name', 'Name', name, 100);
	if (/\r|\n/.test(name)) fieldErrors.name = 'Enter your name on one line.';
	checkLength(fieldErrors, 'organisation', 'Organisation', organisation, 120);
	if (/\r|\n/.test(organisation)) fieldErrors.organisation = 'Enter the organisation on one line.';
	checkLength(fieldErrors, 'timing', 'Timing', timing, 160);
	if (/\r|\n/.test(timing)) fieldErrors.timing = 'Enter the timing on one line.';
	if (!Object.prototype.hasOwnProperty.call(serviceLabels, service)) fieldErrors.service = 'Choose what you would like help with.';
	if (!message) fieldErrors.message = 'Tell us a little about what you are starting.';
	checkLength(fieldErrors, 'message', 'Description', message, 2000, 10);
	if (Object.keys(fieldErrors).length > 0) throw new FormValidationError('Please check the highlighted details and try again.', fieldErrors);
	return { name, ...contact, organisation: organisation || undefined, timing: timing || undefined, service: service as Service, source, originPath, message };
}

export function escapeHtml(input: string): string {
	return input.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]!);
}
