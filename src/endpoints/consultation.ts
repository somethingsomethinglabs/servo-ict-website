import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';
import { recordDeliveredEnquiry } from '../lib/server/enquiryMetrics';
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
	status: number,
	returnPath = '/'
): Response {
	if (wantsJson(request)) {
		return Response.json(body, { status });
	}

	const safePath = returnPath.startsWith('/') && !returnPath.startsWith('//') ? returnPath : '/';
	const returnUrl = new URL(safePath, request.url);
	returnUrl.search = '';
	returnUrl.hash = 'consultation-form';
	const title = body.ok ? 'Enquiry sent' : 'Enquiry not sent';
	const linkText = body.ok ? 'Return to Servo ICT' : 'Return to your enquiry';
	const html = `<!doctype html>
	<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">
	<title>${title} | Servo ICT</title><style>
	*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:1.5rem;background:#c5eddc;color:#242126;font-family:system-ui,sans-serif}
	main{width:min(100%,38rem);padding:clamp(1.5rem,5vw,3rem);border:2px solid #242126;background:#fffdfa;box-shadow:7px 7px 0 #242126}h1{margin:0 0 1rem;font-size:clamp(2rem,8vw,3.5rem);line-height:1}p{line-height:1.6}a{display:inline-block;min-height:44px;margin-top:1rem;padding:.75rem 1rem;border:2px solid #242126;background:#242126;color:#fffdfa;box-shadow:5px 5px 0 #f27ab5;font-weight:800}
	</style></head><body><main><p>Servo ICT</p><h1>${title}</h1><p>${escapeHtml(body.message)}</p><a href="${escapeHtml(returnUrl.pathname + returnUrl.hash)}">${linkText}</a></main></body></html>`;
	return new Response(html, { status, headers: { 'content-type': 'text/html; charset=utf-8' } });
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

export function ownerEmailHtml(submission: ConsultationRequest): string {
	return `
		<h1>New project enquiry</h1>
		<p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
		${submission.email ? `<p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>` : ''}
		${submission.phone ? `<p><strong>Phone:</strong> ${escapeHtml(submission.phone)}</p>` : ''}
		${submission.organisation ? `<p><strong>Organisation:</strong> ${escapeHtml(submission.organisation)}</p>` : ''}
		${submission.timing ? `<p><strong>Timing:</strong> ${escapeHtml(submission.timing)}</p>` : ''}
		<p><strong>Project type:</strong> ${escapeHtml(serviceLabels[submission.service])}</p>
		${submission.source ? `<p><strong>Source:</strong> ${escapeHtml(submission.source)}</p>` : ''}
		${submission.originPath ? `<p><strong>Page:</strong> ${escapeHtml(submission.originPath)}</p>` : ''}
		<h2>What they would like to build, change, or fix</h2>
		<p>${escapeHtml(submission.message).replace(/\r?\n/g, '<br>')}</p>
	`;
}

export function ownerEmailText(submission: ConsultationRequest): string {
	return [
		'New project enquiry',
		'',
		`Name: ${submission.name}`,
		submission.email ? `Email: ${submission.email}` : '',
		submission.phone ? `Phone: ${submission.phone}` : '',
		submission.organisation ? `Organisation: ${submission.organisation}` : '',
		submission.timing ? `Timing: ${submission.timing}` : '',
		`Project type: ${serviceLabels[submission.service]}`,
		submission.source ? `Source: ${submission.source}` : '',
		submission.originPath ? `Page: ${submission.originPath}` : '',
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
	const returnPath = String(form.get('returnPath') || '/');

	// Bots commonly fill hidden fields. Return an ordinary success so the trap is not advertised.
	if (String(form.get('companyWebsite') || '').trim()) {
		return response(
			request,
			{ ok: true, message: 'Thanks, your enquiry has been sent. We aim to reply within two business days.' },
			200,
			returnPath
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
					400,
					returnPath
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
			replyTo: submission.email ? { name: submission.name, address: submission.email } : config.toEmail,
			subject: `Project enquiry from ${submission.name}`,
			text: ownerEmailText(submission),
			html: ownerEmailHtml(submission)
		});

		await recordDeliveredEnquiry({ service: submission.service, source: submission.source, pagePath: submission.originPath });

		// The owner notification is the critical delivery. A failed acknowledgement should not
		// make the visitor resubmit and create a duplicate enquiry.
		if (submission.email) try {
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
					'We aim to reply within two business days to confirm whether the project is a good fit and arrange a time.',
					'',
					'Servo ICT'
				].join('\n')
			});
		} catch {
			console.error('Consultation acknowledgement email could not be sent.');
		}

		return response(
			request,
			{ ok: true, message: 'Thanks, your enquiry has been sent. We aim to reply within two business days.' },
			200,
			returnPath
		);
	} catch (error) {
		if (error instanceof FormValidationError) {
			return response(
				request,
				{ ok: false, message: error.message, fieldErrors: error.fieldErrors },
				400,
				returnPath
			);
		}
		if (error instanceof ConfigurationError) {
			console.error(`Consultation form configuration error: ${error.message}`);
			return response(
				request,
				{ ok: false, message: 'The form is temporarily unavailable. Try again, call (03) 4148 8665, or email support@servoict.com.' },
				503,
				returnPath
			);
		}

		console.error('Consultation request could not be delivered.');
		return response(
			request,
			{ ok: false, message: 'Your enquiry could not be sent. Try again, call (03) 4148 8665, or email support@servoict.com.' },
			500,
			returnPath
		);
	}
};
