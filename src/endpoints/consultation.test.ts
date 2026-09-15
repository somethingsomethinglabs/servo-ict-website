import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mail = vi.hoisted(() => ({ sendMail: vi.fn(), createTransport: vi.fn() }));
vi.mock('nodemailer', () => ({ default: { createTransport: mail.createTransport } }));

import { POST } from './consultation';

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
	beforeEach(() => {
		Object.assign(process.env, {
			SMTP_USER: 'local-test', SMTP_PASSWORD: 'local-test', CONSULTATION_TO_EMAIL: 'owner@example.test',
			CONSULTATION_FROM_EMAIL: 'website@example.test', TURNSTILE_SECRET_KEY: 'test-secret'
		});
		mail.sendMail.mockReset();
		mail.createTransport.mockReset().mockReturnValue({ sendMail: mail.sendMail });
		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ success: true, action: 'consultation' }), { status: 200 })));
	});

	afterEach(() => vi.unstubAllGlobals());

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
