import { resolveConsultationMode } from '../consultationEmail';
import { getConsultationConfig } from './config';

export function getEnquirySettings() {
	const siteKey = (process.env.PUBLIC_TURNSTILE_SITE_KEY ?? import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '').trim();
	let hasServerDeliveryConfiguration = false;
	let hasTurnstileSecretKey = false;
	try {
		const config = getConsultationConfig();
		hasServerDeliveryConfiguration = true;
		hasTurnstileSecretKey = Boolean(config.turnstileSecret && !config.turnstileSecret.startsWith('replace-with-'));
	} catch {
		// Incomplete or malformed delivery settings keep the truthful email-draft fallback active.
	}
	const consultationMode = resolveConsultationMode({
		staticSite: import.meta.env.PUBLIC_SITE_MODE === 'static',
		hasTurnstileSiteKey: Boolean(siteKey),
		hasTurnstileSecretKey,
		hasServerDeliveryConfiguration,
		allowInsecureLocal: (process.env.FORM_ALLOW_INSECURE_LOCAL ?? import.meta.env.FORM_ALLOW_INSECURE_LOCAL) === 'true',
		isDevelopment: import.meta.env.DEV
	});
	return { consultationMode, turnstileSiteKey: consultationMode === 'server' ? siteKey : '', hasServerDeliveryConfiguration };
}
