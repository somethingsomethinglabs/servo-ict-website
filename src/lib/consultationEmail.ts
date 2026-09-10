const serviceLabels: Record<string, string> = {
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
};

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

export function buildConsultationMailto(
	form: FormData,
	recipient = 'support@servoict.com'
): string {
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
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
