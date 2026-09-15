import { resolveConsultationMode } from '../consultationEmail';

export function getEnquirySettings() {
	const siteKey = (process.env.PUBLIC_TURNSTILE_SITE_KEY ?? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '').trim();
	const consultationMode = resolveConsultationMode({
		staticSite: import.meta.env.PUBLIC_SITE_MODE === 'static',
		hasTurnstileSiteKey: Boolean(siteKey),
		allowInsecureLocal: (process.env.FORM_ALLOW_INSECURE_LOCAL ?? import.meta.env.FORM_ALLOW_INSECURE_LOCAL) === 'true',
		isDevelopment: import.meta.env.DEV
	});
	return { consultationMode, turnstileSiteKey: consultationMode === 'server' ? siteKey : '' };
}
