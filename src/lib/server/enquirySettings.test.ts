import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEnquirySettings } from './enquirySettings';

const completeConfiguration = {
	PUBLIC_SITE_MODE: 'server',
	PUBLIC_TURNSTILE_SITE_KEY: 'public-test-key',
	TURNSTILE_SECRET_KEY: 'secret-test-key',
	SMTP_USER: 'local-test',
	SMTP_PASSWORD: 'local-test-password',
	SMTP_PORT: '465',
	SMTP_SECURE: 'true',
	CONSULTATION_TO_EMAIL: 'owner@example.test',
	CONSULTATION_FROM_EMAIL: 'website@example.test',
	FORM_ALLOW_INSECURE_LOCAL: 'false'
};

function configure(overrides: Record<string, string>) {
	for (const [name, value] of Object.entries({ ...completeConfiguration, ...overrides })) vi.stubEnv(name, value);
}

describe('getEnquirySettings', () => {
	afterEach(() => vi.unstubAllEnvs());

	it('enables direct delivery only with valid SMTP and both Turnstile keys', () => {
		configure({});
		expect(getEnquirySettings()).toMatchObject({
			consultationMode: 'server',
			turnstileSiteKey: 'public-test-key',
			hasServerDeliveryConfiguration: true
		});
	});

	it.each([
		['missing Turnstile secret', { TURNSTILE_SECRET_KEY: '' }],
		['placeholder SMTP password', { SMTP_PASSWORD: 'replace-with-password' }],
		['malformed SMTP port', { SMTP_PORT: 'not-a-port' }],
		['malformed recipient', { CONSULTATION_TO_EMAIL: 'not-an-email' }]
	])('uses the email fallback for %s', (_label, overrides) => {
		configure(overrides);
		expect(getEnquirySettings()).toMatchObject({
			consultationMode: 'email',
			turnstileSiteKey: ''
		});
	});
});
