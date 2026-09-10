/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
	readonly SMTP_HOST?: string;
	readonly SMTP_PORT?: string;
	readonly SMTP_SECURE?: string;
	readonly SMTP_USER?: string;
	readonly SMTP_PASSWORD?: string;
	readonly CONSULTATION_TO_EMAIL?: string;
	readonly CONSULTATION_CALENDAR_EMAIL?: string;
	readonly CONSULTATION_FROM_EMAIL?: string;
	readonly CONSULTATION_FROM_NAME?: string;
	readonly CONSULTATION_TIMEZONE?: string;
	readonly CONSULTATION_DURATION_MINUTES?: string;
	readonly CONSULTATION_MIN_NOTICE_HOURS?: string;
	readonly TURNSTILE_SECRET_KEY?: string;
	readonly SITE_URL?: string;
	readonly FORM_ALLOW_INSECURE_LOCAL?: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
