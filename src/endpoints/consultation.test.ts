import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mail = vi.hoisted(() => ({ sendMail: vi.fn(), createTransport: vi.fn() }));
vi.mock('nodemailer', () => ({ default: { createTransport: mail.createTransport } }));

import { POST } from './consultation';
import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

function request(values: Record<string, string>, json = true) {
	const form = new FormData();
	for (const [key, value] of Object.entries(values)) form.set(key, value);
	return new Request('https://servoict.com/api/consultation', {
		method: 'POST', headers: json ? { Accept: 'application/json' } : undefined, body: form
	});
}

async function post(req: Request) {
	return POST({ request: req, clientAddress: '127.0.0.1' } as Parameters<typeof POST>[0]);
}

describe('consultation endpoint', () => {
	it('counts owner SMTP acceptance once even if acknowledgement fails, but never counts a failed owner send', async () => {
		const directory = await mkdtemp(join(tmpdir(), 'servo-delivered-'));
		vi.stubEnv('ENQUIRY_METRICS_DIR', directory);
		try {
			mail.sendMail.mockResolvedValueOnce({ messageId: 'owner' }).mockRejectedValue(new Error('SMTP failure'));
			const fields = { name: 'Alex', contact: 'alex@example.test', message: 'Starting a new shop', source: 'home', service: 'starter', originPath: '/', 'cf-turnstile-response': 'valid' };
			expect((await post(request(fields))).status).toBe(200);
			expect((await post(request(fields))).status).toBe(500);
			const files = await readdir(directory);
			expect(files).toHaveLength(1);
			const counts = JSON.parse(await readFile(join(directory, files[0]), 'utf8'));
			expect(counts).toEqual({ '["submission_confirmed","starter","home","/","server",""]': 1 });
		} finally { await rm(directory, { recursive: true, force: true }); }
	});

	beforeEach(() => {
		Object.assign(process.env, {
			SMTP_USER: 'local-test', SMTP_PASSWORD: 'local-test', CONSULTATION_TO_EMAIL: 'owner@example.test',
			CONSULTATION_FROM_EMAIL: 'website@example.test', TURNSTILE_SECRET_KEY: 'test-secret'
		});
		vi.stubEnv('ENQUIRY_METRICS_DIR', '');
		mail.sendMail.mockReset();
		mail.createTransport.mockReset().mockReturnValue({ sendMail: mail.sendMail });
		vi.stubGlobal('fetch', vi.fn().mockImplementation(async () => new Response(JSON.stringify({ success: true, action: 'consultation' }), { status: 200 })));
	});

	afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

	it('delivers a phone-only enquiry without sending an acknowledgement', async () => {
		mail.sendMail.mockResolvedValue({ messageId: 'owner' });
		const result = await post(request({ name: 'Alex', contact: '0412 345 678', message: 'Opening a small cafe', 'cf-turnstile-response': 'valid' }));

		expect(result.status).toBe(200);
		expect(await result.json()).toMatchObject({ ok: true });
		expect(mail.sendMail).toHaveBeenCalledTimes(1);
		expect(mail.sendMail.mock.calls[0][0].text).toContain('Phone: 0412 345 678');
	});

	it('reports transport failure without claiming success', async () => {
		mail.sendMail.mockRejectedValue(new Error('local SMTP unavailable'));
		const result = await post(request({ name: 'Alex', contact: 'alex@gmail.com', message: 'Starting a new shop', 'cf-turnstile-response': 'valid' }));
		expect(result.status).toBe(500);
		expect(await result.json()).toMatchObject({ ok: false });
	});

	it('includes optional contact-page details in both owner email formats', async () => {
		mail.sendMail.mockResolvedValue({messageId:'owner'});
		const result = await post(request({name:'Alex',contactMethod:'phone',contact:'0412 345 678',organisation:'Example & Co',timing:'Before November <opening>',message:'Please help with our shop website.',returnPath:'/servo-ict-website/contact/','cf-turnstile-response':'valid'},false));
		expect(result.status).toBe(200);
		const email = mail.sendMail.mock.calls[0][0];
		expect(email.text).toContain('Organisation: Example & Co');
		expect(email.text).toContain('Timing: Before November <opening>');
		expect(email.html).toContain('Before November &lt;opening&gt;');
		expect(await result.text()).toContain('href="/servo-ict-website/contact/#consultation-form"');
	});

	it('delivers topic and safe source context to the owner', async () => {
		mail.sendMail.mockResolvedValue({ messageId: 'owner' });
		const result = await post(request({
			name: 'Alex', contact: 'alex@example.com', service: 'security', message: 'Please help secure our accounts.',
			source: '/security/', originPath: '/security/', 'cf-turnstile-response': 'valid'
		}));
		expect(result.status).toBe(200);
		const email = mail.sendMail.mock.calls[0][0];
		expect(email.text).toContain('Project type: Secure setup or tidy-up');
		expect(email.text).toContain('Source: security');
		expect(email.text).toContain('Page: /security/');
		expect(email.html).toContain('<strong>Source:</strong> security');
	});

	it('keeps success when only the visitor acknowledgement fails', async () => {
		mail.sendMail.mockResolvedValueOnce({ messageId: 'owner' }).mockRejectedValueOnce(new Error('ack failed'));
		const result = await post(request({ name: 'Alex', contact: 'alex@gmail.com', message: 'Starting a new shop', 'cf-turnstile-response': 'valid' }));
		expect(result.status).toBe(200);
		expect(await result.json()).toMatchObject({ ok: true });
		expect(mail.sendMail).toHaveBeenCalledTimes(2);
	});

	it('returns field errors without calling the mail transport', async () => {
		const result = await post(request({ name: '', contact: 'bad', message: 'tiny', 'cf-turnstile-response': 'valid' }));
		expect(result.status).toBe(400);
		expect(await result.json()).toMatchObject({ ok: false, fieldErrors: { name: expect.any(String), contact: expect.any(String) } });
		expect(mail.sendMail).not.toHaveBeenCalled();
	});

	it('renders a server-confirmed result with a safe Astro base return link', async () => {
		mail.sendMail.mockResolvedValue({ messageId: 'owner' });
		const result = await post(request({ name: 'Alex', contact: '0412 345 678', message: 'Opening a small cafe', returnPath: '/servo-ict-website/', 'cf-turnstile-response': 'valid' }, false));
		const html = await result.text();
		expect(result.status).toBe(200);
		expect(result.headers.get('content-type')).toContain('text/html');
		expect(html).toContain('<h1>Enquiry sent</h1>');
		expect(html).toContain('href="/servo-ict-website/#consultation-form"');
		expect(html).not.toContain('request=sent');
	});

	it('does not allow an external no-JavaScript return link', async () => {
		mail.sendMail.mockRejectedValue(new Error('local SMTP unavailable'));
		const result = await post(request({ name: 'Alex', contact: '0412 345 678', message: 'Opening a small cafe', returnPath: '//attacker.example/', 'cf-turnstile-response': 'valid' }, false));
		const html = await result.text();
		expect(result.status).toBe(500);
		expect(html).toContain('<h1>Enquiry not sent</h1>');
		expect(html).toContain('href="/#consultation-form"');
		expect(html).not.toContain('attacker.example');
	});
});
