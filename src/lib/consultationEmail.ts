const serviceLabels: Record<string, string> = {
	starter: 'New business essentials', website: 'Website design or development', technology: 'Business technology project',
	security: 'Secure setup or tidy-up', consulting: 'Technology consulting', other: 'Something else'
};

export function resolveConsultationService(value: string | null): string {
	return value && Object.prototype.hasOwnProperty.call(serviceLabels, value) ? value : 'starter';
}

export function resolveConsultationMode(options: {
	staticSite: boolean;
	hasTurnstileSiteKey: boolean;
	allowInsecureLocal: boolean;
	isDevelopment: boolean;
}): 'server' | 'email' {
	if (options.staticSite) return 'email';
	if (options.hasTurnstileSiteKey) return 'server';
	return options.isDevelopment && options.allowInsecureLocal ? 'server' : 'email';
}

export interface ConsultationResponse {
	ok: boolean;
	message: string;
	fieldErrors?: Record<string, string>;
}

export function parseConsultationResponse(value: unknown): ConsultationResponse | null {
	if (!value || typeof value !== 'object') return null;
	const candidate = value as Record<string, unknown>;
	if (typeof candidate.ok !== 'boolean' || typeof candidate.message !== 'string') return null;
	if (candidate.fieldErrors !== undefined && (!candidate.fieldErrors || typeof candidate.fieldErrors !== 'object' || Array.isArray(candidate.fieldErrors))) return null;
	return candidate as unknown as ConsultationResponse;
}

export const consultationRecipient = 'support@servoict.com';
export interface ConsultationEmailDraft { recipient: string; subject: string; body: string; mailto: string; plainText: string; }

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

export function buildConsultationEmailDraft(form: FormData, recipient = consultationRecipient): ConsultationEmailDraft {
	const name = value(form, 'name');
	const service = value(form, 'service') || 'starter';
	const contact = value(form, 'contact') || value(form, 'email') || value(form, 'phone');
	const messageHeading = service === 'starter' ? 'What I am starting:' : 'What I would like help with:';
	const body = [
		'Project enquiry', '', `Name: ${name}`, `Email or phone: ${contact}`,
		value(form, 'organisation') ? `Organisation: ${value(form, 'organisation')}` : '',
		`Project type: ${serviceLabels[service] || service}`, '', messageHeading, value(form, 'message')
	].filter((line, index, lines) => line || index === 1 || lines[index - 1] !== '').join('\n');
	const subject = `Project enquiry from ${name}`;
	const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	return { recipient, subject, body, mailto, plainText: [`To: ${recipient}`, `Subject: ${subject}`, '', body].join('\n') };
}
