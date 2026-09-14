const serviceLabels: Record<string, string> = {
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
};

export const consultationRecipient = 'support@servoict.com';

export interface ConsultationEmailDraft {
	recipient: string;
	subject: string;
	body: string;
	mailto: string;
	plainText: string;
}

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

export function buildConsultationEmailDraft(
	form: FormData,
	recipient = consultationRecipient
): ConsultationEmailDraft {
	const name = value(form, 'name');
	const service = value(form, 'service');
	const body = [
		'Project enquiry',
		'',
		`Name: ${name}`,
		`Email: ${value(form, 'email')}`,
		value(form, 'organisation') ? `Organisation: ${value(form, 'organisation')}` : '',
		`Project type: ${serviceLabels[service] || service}`,
		'',
		'What I would like to build, change, or fix:',
		value(form, 'message')
	]
		.filter((line, index, lines) => line || index === 1 || lines[index - 1] !== '')
		.join('\n');

	const subject = `Project enquiry from ${name}`;
	const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
	const plainText = [`To: ${recipient}`, `Subject: ${subject}`, '', body].join('\n');

	return { recipient, subject, body, mailto, plainText };
}
