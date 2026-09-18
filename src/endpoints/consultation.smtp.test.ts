import { createServer, type Server, type Socket } from 'node:net';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from './consultation';

interface DeliveredMessage {
	recipients: string[];
	data: string;
}

const smtpEnvironment = [
	'SMTP_HOST',
	'SMTP_PORT',
	'SMTP_SECURE',
	'SMTP_USER',
	'SMTP_PASSWORD',
	'CONSULTATION_TO_EMAIL',
	'CONSULTATION_FROM_EMAIL',
	'CONSULTATION_FROM_NAME',
	'TURNSTILE_SECRET_KEY',
	'FORM_ALLOW_INSECURE_LOCAL',
	'ENQUIRY_METRICS_DIR'
] as const;

function formRequest(values: Record<string, string>) {
	const form = new FormData();
	for (const [key, value] of Object.entries(values)) form.set(key, value);
	return new Request('https://servoict.com/api/consultation', {
		method: 'POST',
		headers: { Accept: 'application/json' },
		body: form
	});
}

function post(request: Request) {
	return POST({ request, clientAddress: '127.0.0.1' } as Parameters<typeof POST>[0]);
}

function startSmtpSink(messages: DeliveredMessage[]): Promise<{ server: Server; port: number }> {
	const server = createServer((socket: Socket) => {
		let buffered = '';
		let readingData = false;
		let dataLines: string[] = [];
		let recipients: string[] = [];

		const reply = (line: string) => socket.write(`${line}\r\n`);
		reply('220 localhost test SMTP');

		socket.setEncoding('utf8');
		socket.on('data', (chunk: string) => {
			buffered += chunk;
			let lineEnd = buffered.indexOf('\r\n');
			while (lineEnd >= 0) {
				const line = buffered.slice(0, lineEnd);
				buffered = buffered.slice(lineEnd + 2);

				if (readingData) {
					if (line === '.') {
						messages.push({ recipients: [...recipients], data: dataLines.join('\r\n') });
						readingData = false;
						dataLines = [];
						reply('250 2.0.0 accepted');
					} else {
						dataLines.push(line.startsWith('..') ? line.slice(1) : line);
					}
				} else if (/^(EHLO|HELO)\b/i.test(line)) {
					socket.write('250-localhost\r\n250 AUTH PLAIN\r\n');
				} else if (/^AUTH PLAIN(?:\s|$)/i.test(line)) {
					reply('235 2.7.0 authenticated');
				} else if (/^MAIL FROM:/i.test(line)) {
					recipients = [];
					reply('250 2.1.0 sender accepted');
				} else if (/^RCPT TO:/i.test(line)) {
					const match = line.match(/^RCPT TO:\s*<([^>]+)>/i);
					if (match) recipients.push(match[1].toLowerCase());
					reply('250 2.1.5 recipient accepted');
				} else if (/^DATA$/i.test(line)) {
					readingData = true;
					reply('354 end with <CRLF>.<CRLF>');
				} else if (/^RSET$/i.test(line)) {
					recipients = [];
					reply('250 2.0.0 reset');
				} else if (/^QUIT$/i.test(line)) {
					reply('221 2.0.0 bye');
					socket.end();
				} else if (/^NOOP$/i.test(line)) {
					reply('250 2.0.0 ok');
				} else {
					reply('502 5.5.2 command not implemented');
				}

				lineEnd = buffered.indexOf('\r\n');
			}
		});
	});

	return new Promise((resolve, reject) => {
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			server.off('error', reject);
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close();
				reject(new Error('SMTP test server did not bind a TCP port.'));
				return;
			}
			resolve({ server, port: address.port });
		});
	});
}

function closeServer(server: Server | undefined): Promise<void> {
	if (!server) return Promise.resolve();
	return new Promise((resolve, reject) => {
		server.close((error) => error ? reject(error) : resolve());
	});
}

describe('consultation endpoint SMTP integration', () => {
	const originalEnvironment = new Map<string, string | undefined>();
	const messages: DeliveredMessage[] = [];
	let smtpServer: Server | undefined;

	beforeEach(async () => {
		messages.length = 0;
		for (const name of smtpEnvironment) originalEnvironment.set(name, process.env[name]);

		const sink = await startSmtpSink(messages);
		smtpServer = sink.server;
		Object.assign(process.env, {
			SMTP_HOST: '127.0.0.1',
			SMTP_PORT: String(sink.port),
			SMTP_SECURE: 'false',
			SMTP_USER: 'local-test',
			SMTP_PASSWORD: 'local-test-password',
			CONSULTATION_TO_EMAIL: 'owner@example.test',
			CONSULTATION_FROM_EMAIL: 'website@example.test',
			CONSULTATION_FROM_NAME: 'Servo ICT Website',
			TURNSTILE_SECRET_KEY: 'test-secret',
			FORM_ALLOW_INSECURE_LOCAL: 'false'
		});
		delete process.env.ENQUIRY_METRICS_DIR;

		vi.stubGlobal('fetch', vi.fn().mockResolvedValue(
			new Response(JSON.stringify({ success: true, action: 'consultation' }), { status: 200 })
		));
	});

	afterEach(async () => {
		vi.unstubAllGlobals();
		await closeServer(smtpServer);
		smtpServer = undefined;
		for (const [name, value] of originalEnvironment) {
			if (value === undefined) delete process.env[name];
			else process.env[name] = value;
		}
		originalEnvironment.clear();
	});

	it('sends the owner notification and visitor acknowledgement through SMTP', async () => {
		const result = await post(formRequest({
			name: 'Alex',
			contactMethod: 'email',
			contact: 'alex@example.test',
			service: 'starter',
			source: '/start-a-business/',
			originPath: '/start-a-business/',
			message: 'I need a website and email for a new cafe.',
			'cf-turnstile-response': 'valid'
		}));

		expect(result.status).toBe(200);
		expect(await result.json()).toMatchObject({ ok: true });
		expect(messages).toHaveLength(2);

		const owner = messages.find((message) => message.recipients.includes('owner@example.test'));
		const acknowledgement = messages.find((message) => message.recipients.includes('alex@example.test'));
		expect(owner?.data).toContain('Project type: New business essentials');
		expect(owner?.data).toContain('Source: start_business');
		expect(owner?.data).toContain('Page: /start-a-business/');
		expect(acknowledgement?.data).toContain('We received your Servo ICT project enquiry');
		expect(acknowledgement?.data).not.toContain('Project type:');
		expect(acknowledgement?.data).not.toContain('Source:');
	});

	it('sends a phone-only enquiry to the owner without an acknowledgement', async () => {
		const result = await post(formRequest({
			name: 'Sam',
			contactMethod: 'phone',
			contact: '0412 345 678',
			service: 'website',
			source: '/websites/',
			originPath: '/websites/',
			message: 'I need a small website for my trade business.',
			'cf-turnstile-response': 'valid'
		}));

		expect(result.status).toBe(200);
		expect(await result.json()).toMatchObject({ ok: true });
		expect(messages).toHaveLength(1);
		expect(messages[0].recipients).toEqual(['owner@example.test']);
		expect(messages[0].data).toContain('Phone: 0412 345 678');
		expect(messages[0].data).toContain('Project type: Website design or development');
		expect(messages[0].data).toContain('Source: websites');
	});
});
