import { DateTime, IANAZone } from 'luxon';

export const serviceLabels = {
	website: 'Website design or development',
	technology: 'Business technology project',
	security: 'Secure setup or tidy-up',
	consulting: 'Technology consulting',
	other: 'Something else'
} as const;

export const contactPreferenceLabels = {
	phone: 'Phone call',
	video: 'Video call',
	either: 'Either phone or video'
} as const;

type Service = keyof typeof serviceLabels;
type ContactPreference = keyof typeof contactPreferenceLabels;

export interface ConsultationRequest {
	name: string;
	email: string;
	organisation?: string;
	phone?: string;
	service: Service;
	contactPreference: ContactPreference;
	message: string;
	timezone: string;
	preferredStart: DateTime<true>;
	alternateStart?: DateTime<true>;
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
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const timePattern = /^([01]\d|2[0-3]):[0-5]\d$/;

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

function parseLocalDateTime(
	date: string,
	time: string,
	timezone: string,
	label: string,
	fieldErrors: Record<string, string>,
	fieldName: string
): DateTime<true> | undefined {
	if (!datePattern.test(date) || !timePattern.test(time)) {
		fieldErrors[fieldName] = `Enter a valid ${label.toLowerCase()} date and time.`;
		return undefined;
	}

	const parsed = DateTime.fromISO(`${date}T${time}`, { zone: timezone });
	if (!parsed.isValid) {
		fieldErrors[fieldName] = `Enter a valid ${label.toLowerCase()} date and time.`;
		return undefined;
	}
	return parsed;
}

export function parseConsultationRequest(
	form: FormData,
	options: { minimumNoticeHours: number; fallbackTimezone: string; now?: DateTime }
): ConsultationRequest {
	const fieldErrors: Record<string, string> = {};
	const name = value(form, 'name');
	const email = value(form, 'email').toLowerCase();
	const organisation = value(form, 'organisation');
	const phone = value(form, 'phone');
	const service = value(form, 'service');
	const contactPreference = value(form, 'contactPreference');
	const message = value(form, 'message');
	const timezoneCandidate = value(form, 'timezone');
	const timezone = IANAZone.isValidZone(timezoneCandidate)
		? timezoneCandidate
		: options.fallbackTimezone;

	if (!name) fieldErrors.name = 'Enter your name.';
	checkLength(fieldErrors, 'name', 'Name', name, 100);
	if (/[\r\n]/.test(name)) fieldErrors.name = 'Enter your name on one line.';
	if (!emailPattern.test(email) || email.length > 254) fieldErrors.email = 'Enter a valid email address.';
	checkLength(fieldErrors, 'organisation', 'Organisation', organisation, 120);
	if (/[\r\n]/.test(organisation)) fieldErrors.organisation = 'Enter the organisation on one line.';
	checkLength(fieldErrors, 'phone', 'Phone number', phone, 50);
	if (/[\r\n]/.test(phone)) fieldErrors.phone = 'Enter the phone number on one line.';
	if (!(service in serviceLabels)) fieldErrors.service = 'Choose what you would like help with.';
	if (!(contactPreference in contactPreferenceLabels)) {
		fieldErrors.contactPreference = 'Choose how you would prefer to talk.';
	}
	if (!message) fieldErrors.message = 'Tell us a little about what you need help with.';
	checkLength(fieldErrors, 'message', 'Message', message, 2000, 20);
	if (value(form, 'privacy') !== 'on') fieldErrors.privacy = 'Please agree before sending your request.';

	const preferredDate = value(form, 'preferredDate');
	const preferredTime = value(form, 'preferredTime');
	const preferredStart = parseLocalDateTime(
		preferredDate,
		preferredTime,
		timezone,
		'Preferred',
		fieldErrors,
		'preferredDate'
	);

	const alternateDate = value(form, 'alternateDate');
	const alternateTime = value(form, 'alternateTime');
	let alternateStart: DateTime<true> | undefined;
	if (alternateDate || alternateTime) {
		if (!alternateDate || !alternateTime) {
			fieldErrors.alternateDate = 'Enter both an alternate date and time, or leave both blank.';
		} else {
			alternateStart = parseLocalDateTime(
				alternateDate,
				alternateTime,
				timezone,
				'Alternate',
				fieldErrors,
				'alternateDate'
			);
		}
	}

	const now = options.now ?? DateTime.utc();
	const earliest = now.plus({ hours: options.minimumNoticeHours });
	if (preferredStart && preferredStart.toUTC() < earliest) {
		fieldErrors.preferredDate = `Choose a time at least ${options.minimumNoticeHours} hours from now.`;
	}
	if (alternateStart && alternateStart.toUTC() < earliest) {
		fieldErrors.alternateDate = `Choose a time at least ${options.minimumNoticeHours} hours from now.`;
	}

	if (Object.keys(fieldErrors).length > 0 || !preferredStart) {
		throw new FormValidationError('Please check the highlighted details and try again.', fieldErrors);
	}

	return {
		name,
		email,
		organisation: organisation || undefined,
		phone: phone || undefined,
		service: service as Service,
		contactPreference: contactPreference as ContactPreference,
		message,
		timezone,
		preferredStart,
		alternateStart
	};
}

export function formatRequestedTime(dateTime: DateTime<true>): string {
	return dateTime.toLocaleString({
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		timeZoneName: 'short'
	});
}

function escapeCalendarText(input: string): string {
	return input
		.replace(/\\/g, '\\\\')
		.replace(/\r?\n/g, '\\n')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,');
}

function foldCalendarLine(line: string): string {
	const chunks: string[] = [];
	let remaining = line;
	while (remaining.length > 73) {
		chunks.push(remaining.slice(0, 73));
		remaining = remaining.slice(73);
	}
	chunks.push(remaining);
	return chunks.join('\r\n ');
}

function calendarTimestamp(dateTime: DateTime): string {
	return dateTime.toUTC().toFormat("yyyyMMdd'T'HHmmss'Z'");
}

export function buildCalendarInvitation(
	request: ConsultationRequest,
	options: {
		durationMinutes: number;
		organizerEmail: string;
		organizerName: string;
		attendeeEmail: string;
		siteUrl?: string;
		uid?: string;
		now?: DateTime;
	}
): string {
	const description = [
		`Requested by: ${request.name}`,
		`Email: ${request.email}`,
		request.phone ? `Phone: ${request.phone}` : '',
		request.organisation ? `Organisation: ${request.organisation}` : '',
		`Service: ${serviceLabels[request.service]}`,
		`Preferred contact: ${contactPreferenceLabels[request.contactPreference]}`,
		request.alternateStart ? `Alternate time: ${formatRequestedTime(request.alternateStart)}` : '',
		'',
		request.message,
		'',
		'This is a requested time and has not yet been confirmed.'
	]
		.filter((line, index, lines) => line || (index > 0 && lines[index - 1]))
		.join('\n');

	const uid = options.uid || `${crypto.randomUUID()}@servoict.com`;
	const now = options.now || DateTime.utc();
	const end = request.preferredStart.plus({ minutes: options.durationMinutes });
	const lines = [
		'BEGIN:VCALENDAR',
		'PRODID:-//Servo ICT//Consultation Requests//EN',
		'VERSION:2.0',
		'CALSCALE:GREGORIAN',
		'METHOD:REQUEST',
		'BEGIN:VEVENT',
		`UID:${escapeCalendarText(uid)}`,
		`DTSTAMP:${calendarTimestamp(now)}`,
		`DTSTART:${calendarTimestamp(request.preferredStart)}`,
		`DTEND:${calendarTimestamp(end)}`,
		`SUMMARY:${escapeCalendarText(`Tentative consultation request: ${request.name}`)}`,
		`DESCRIPTION:${escapeCalendarText(description)}`,
		`ORGANIZER;CN=${escapeCalendarText(options.organizerName)}:MAILTO:${options.organizerEmail}`,
		`ATTENDEE;CN=Servo ICT;ROLE=REQ-PARTICIPANT;RSVP=TRUE:MAILTO:${options.attendeeEmail}`,
		...(options.siteUrl ? [`URL:${escapeCalendarText(options.siteUrl)}`] : []),
		'STATUS:TENTATIVE',
		'TRANSP:OPAQUE',
		'END:VEVENT',
		'END:VCALENDAR'
	];

	return `${lines.map(foldCalendarLine).join('\r\n')}\r\n`;
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
