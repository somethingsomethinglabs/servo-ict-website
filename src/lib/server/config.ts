export class ConfigurationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ConfigurationError';
	}
}

export interface ConsultationConfig {
	smtp: {
		host: string;
		port: number;
		secure: boolean;
		user: string;
		password: string;
	};
	toEmail: string;
	fromEmail: string;
	fromName: string;
	turnstileSecret?: string;
	allowInsecureLocal: boolean;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function env(name: keyof ImportMetaEnv): string | undefined {
	const runtimeValue = process.env[name];
	if (runtimeValue !== undefined && runtimeValue !== '') return runtimeValue;

	const buildTimeValue = (import.meta.env as Record<string, string | undefined>)[name];
	return buildTimeValue || undefined;
}

function required(name: keyof ImportMetaEnv): string {
	const value = env(name)?.trim();
	if (!value || value.startsWith('replace-with-')) {
		throw new ConfigurationError(`Missing required environment variable: ${name}`);
	}
	return value;
}

function email(name: keyof ImportMetaEnv, fallback?: string): string {
	const value = env(name)?.trim() || fallback;
	if (!value || !emailPattern.test(value)) {
		throw new ConfigurationError(`Environment variable ${name} must be a valid email address.`);
	}
	return value;
}

function positiveInteger(name: keyof ImportMetaEnv, fallback: number): number {
	const raw = env(name);
	const value = raw === undefined ? fallback : Number(raw);
	if (!Number.isInteger(value) || value <= 0) {
		throw new ConfigurationError(`Environment variable ${name} must be a positive integer.`);
	}
	return value;
}

function boolean(name: keyof ImportMetaEnv, fallback: boolean): boolean {
	const raw = env(name)?.toLowerCase();
	if (raw === undefined) return fallback;
	if (raw === 'true') return true;
	if (raw === 'false') return false;
	throw new ConfigurationError(`Environment variable ${name} must be true or false.`);
}

export function getConsultationConfig(): ConsultationConfig {
	const toEmail = email('CONSULTATION_TO_EMAIL');

	return {
		smtp: {
			host: env('SMTP_HOST')?.trim() || 'smtp.fastmail.com',
			port: positiveInteger('SMTP_PORT', 465),
			secure: boolean('SMTP_SECURE', true),
			user: required('SMTP_USER'),
			password: required('SMTP_PASSWORD')
		},
		toEmail,
		fromEmail: email('CONSULTATION_FROM_EMAIL'),
		fromName: env('CONSULTATION_FROM_NAME')?.trim() || 'Servo ICT Website',
		turnstileSecret: env('TURNSTILE_SECRET_KEY')?.trim(),
		allowInsecureLocal: boolean('FORM_ALLOW_INSECURE_LOCAL', false)
	};
}
