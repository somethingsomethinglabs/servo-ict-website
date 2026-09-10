const serviceLabels: Record<string, string> = {
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
};

const contactPreferenceLabels: Record<string, string> = {
	phone: 'Phone call',
	video: 'Video call',
	either: 'Either works'
};

function value(form: FormData, name: string): string {
	const raw = form.get(name);
	return typeof raw === 'string' ? raw.trim() : '';
}

function formatLocalDateTime(date: string, time: string, timezone: string): string {
	if (!date || !time) return '';

	const [year, month, day] = date.split('-').map(Number);
	const parsedDate = new Date(Date.UTC(year, month - 1, day));
	const formattedDate = Number.isNaN(parsedDate.valueOf())
		? date
		: new Intl.DateTimeFormat('en-AU', {
				weekday: 'long',
				day: 'numeric',
				month: 'long',
				year: 'numeric',
				timeZone: 'UTC'
			}).format(parsedDate);

	return `${formattedDate} at ${time} (${timezone.replaceAll('_', ' ')})`;
}

export function buildConsultationMailto(
	form: FormData,
	recipient = 'support@servoict.com'
): string {
	const name = value(form, 'name');
	const timezone = value(form, 'timezone') || 'Australia/Melbourne';
	const preferredTime = formatLocalDateTime(
		value(form, 'preferredDate'),
		value(form, 'preferredTime'),
		timezone
	);
	const alternateTime = formatLocalDateTime(
		value(form, 'alternateDate'),
		value(form, 'alternateTime'),
		timezone
	);
	const service = value(form, 'service');
	const contactPreference = value(form, 'contactPreference');

	const body = [
		'Project consultation request',
		'',
		`Name: ${name}`,
		`Email: ${value(form, 'email')}`,
		value(form, 'organisation') ? `Organisation: ${value(form, 'organisation')}` : '',
		value(form, 'phone') ? `Phone: ${value(form, 'phone')}` : '',
		`Service: ${serviceLabels[service] || service}`,
		`Preferred contact: ${contactPreferenceLabels[contactPreference] || contactPreference}`,
		`Preferred time: ${preferredTime}`,
		alternateTime ? `Alternate time: ${alternateTime}` : '',
		'',
		'What I would like to build, change, or fix:',
		value(form, 'message')
	]
		.filter((line, index, lines) => line || index === 1 || lines[index - 1] !== '')
		.join('\n');

	const subject = `Project consultation request from ${name}`;
	return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
