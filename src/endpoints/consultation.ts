import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { ConfigurationError, getConsultationConfig } from '../lib/server/config';
import {
	escapeHtml,
	FormValidationError,
	parseConsultationRequest,
	serviceLabels,
	type ConsultationRequest
} from '../lib/server/consultation';

interface TurnstileResult {
	success: boolean;
	action?: string;
	'error-codes'?: string[];
}

function wantsJson(request: Request): boolean {
	return request.headers.get('accept')?.includes('application/json') ?? false;
}

function response(
	request: Request,
	body: { ok: boolean; message: string; fieldErrors?: Record<string, string> },
	status: number
): Response {
	if (wantsJson(request)) {
		return Response.json(body, { status });
	}

	const state = body.ok ? 'sent' : 'error';
	return Response.redirect(new URL(`/?request=${state}#consultation-form`, request.url), 303);
}

async function verifyTurnstile(token: string, secret: string, remoteIp?: string): Promise<boolean> {
	if (!token) return false;

	const body = new URLSearchParams({ secret, response: token });
	if (remoteIp) body.set('remoteip', remoteIp);

	const turnstileResponse = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body,
			signal: AbortSignal.timeout(8000)
		}
	);
	if (!turnstileResponse.ok) return false;

	const result = (await turnstileResponse.json()) as TurnstileResult;
	return result.success && (!result.action || result.action === 'consultation');
}

function ownerEmailHtml(submission: ConsultationRequest): string {
	return `
		<h1>New project enquiry</h1>
		<p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
		<p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
		${submission.organisation ? `<p><strong>Organisation:</strong> ${escapeHtml(submission.organisation)}</p>` : ''}
		<p><strong>Project type:</strong> ${escapeHtml(serviceLabels[submission.service])}</p>
		<h2>What they would like to build, change, or fix</h2>
		<p>${escapeHtml(submission.message).replace(/\r?\n/g, '<br>')}</p>
	`;
}

function ownerEmailText(submission: ConsultationRequest): string {
	return [
		'New project enquiry',
		'',
		`Name: ${submission.name}`,
		`Email: ${submission.email}`,
		submission.organisation ? `Organisation: ${submission.organisation}` : '',
		`Project type: ${serviceLabels[submission.service]}`,
		'',
		'What they would like to build, change, or fix:',
		submission.message
	]
		.filter(Boolean)
		.join('\n');
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
	let form: FormData;
	try {
		form = await request.formData();
	} catch {
		return response(request, { ok: false, message: 'The submitted form could not be read.' }, 400);
	}

	// Bots commonly fill hidden fields. Return an ordinary success so the trap is not advertised.
	if (String(form.get('companyWebsite') || '').trim()) {
		return response(
			request,
			{ ok: true, message: 'Thanks — your consultation request has been sent.' },
			200
		);
	}

	try {
		const config = getConsultationConfig();
		const submission = parseConsultationRequest(form);

		const insecureLocalBypass = import.meta.env.DEV && config.allowInsecureLocal;
		if (!insecureLocalBypass) {
			if (!config.turnstileSecret || config.turnstileSecret.startsWith('replace-with-')) {
				throw new ConfigurationError('TURNSTILE_SECRET_KEY is not configured.');
			}

			let turnstileValid = false;
			try {
				turnstileValid = await verifyTurnstile(
					String(form.get('cf-turnstile-response') || ''),
					config.turnstileSecret,
					clientAddress
				);
			} catch {
				turnstileValid = false;
			}

			if (!turnstileValid) {
				return response(
					request,
					{ ok: false, message: 'Please complete the spam check and try again.' },
					400
				);
			}
		}

		const mailer = nodemailer.createTransport({
			host: config.smtp.host,
			port: config.smtp.port,
			secure: config.smtp.secure,
			auth: { user: config.smtp.user, pass: config.smtp.password },
			connectionTimeout: 10_000,
			socketTimeout: 15_000
		});
		const from = { name: config.fromName, address: config.fromEmail };

		await mailer.sendMail({
			from,
			to: config.toEmail,
			replyTo: { name: submission.name, address: submission.email },
			subject: `Project enquiry from ${submission.name}`,
			text: ownerEmailText(submission),
			html: ownerEmailHtml(submission)
		});

		// The owner notification is the critical delivery. A failed acknowledgement should not
		// make the visitor resubmit and create a duplicate enquiry.
		try {
			await mailer.sendMail({
				from,
				to: { name: submission.name, address: submission.email },
				replyTo: config.toEmail,
				subject: 'We received your Servo ICT project enquiry',
				text: [
					`Hi ${submission.name},`,
					'',
					'Thanks for getting in touch. We received your project enquiry.',
					'',
					'Rowan will reply by email to arrange a time and confirm whether the project is a good fit.',
					'',
					'Servo ICT'
				].join('\n')
			});
		} catch {
			console.error('Consultation acknowledgement email could not be sent.');
		}

		return response(
			request,
			{ ok: true, message: 'Thanks — your consultation request has been sent.' },
			200
		);
	} catch (error) {
		if (error instanceof FormValidationError) {
			return response(
				request,
				{ ok: false, message: error.message, fieldErrors: error.fieldErrors },
				400
			);
		}
		if (error instanceof ConfigurationError) {
			console.error(`Consultation form configuration error: ${error.message}`);
			return response(
				request,
				{ ok: false, message: 'The form is temporarily unavailable. Please email support@servoict.com.' },
				503
			);
		}

		console.error('Consultation request could not be delivered.');
		return response(
			request,
			{ ok: false, message: 'Your request could not be sent. Please email support@servoict.com.' },
			500
		);
	}
};
