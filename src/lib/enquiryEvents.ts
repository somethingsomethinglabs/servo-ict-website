export const enquiryEventName = 'servo:enquiry';

export type EnquiryEventType =
	| 'form_start'
	| 'enquiry_clicked'
	| 'submission_confirmed'
	| 'submission_failed'
	| 'email_draft_opened'
	| 'phone_clicked'
	| 'email_clicked';

export interface EnquiryEventDetail {
	event: EnquiryEventType;
	service: string;
	source: string;
	pagePath: string;
	deliveryMode?: 'server' | 'email';
	reason?: 'validation' | 'delivery' | 'response';
}

const knownServices = new Set(['unsure', 'starter', 'website', 'technology', 'security', 'consulting', 'other']);
const knownSourceTokens = new Set([
	'website', 'home', 'contact', 'start_business', 'websites', 'business_it', 'security', 'about',
	'work', 'case_study', 'advice', 'global_nav', 'footer', 'service_page'
]);

function safeService(value: string | undefined): string {
	return value && knownServices.has(value) ? value : 'unsure';
}

const knownSourcePaths: Record<string, string> = {
	'/': 'home',
	'/contact/': 'contact',
	'/start-a-business/': 'start_business',
	'/websites/': 'websites',
	'/business-it/': 'business_it',
	'/security/': 'security',
	'/about/': 'about',
	'/work/': 'work',
	'/work/12grapes/': 'case_study',
	'/blog/': 'advice'
};

const knownAdvicePaths = new Set([
	'/3-key-steps-to-protect-your-business-accounts/',
	'/simplifying-cyber-security-for-small-businesses/',
	'/use-cyber-security-to-grow-your-business/',
	'/navigating-windows-10s-end-of-life-a-guide-for-small-businesses/',
	'/what-to-prepare-for-your-business-website-and-email/',
	'/what-does-a-small-business-website-and-email-cost-each-year/',
	'/can-you-start-a-website-before-your-content-is-ready/'
]);

function isKnownAdvicePath(path: string): boolean {
	return knownAdvicePaths.has(path);
}

export function normaliseEnquirySource(value: string | undefined): string {
	if (!value) return 'website';
	if (knownSourceTokens.has(value)) return value;
	const path = extractPath(value);
	if (knownSourcePaths[path]) return knownSourcePaths[path];
	if (isKnownAdvicePath(path)) return 'advice';
	return 'website';
}

function extractPath(value: string | undefined): string {
	if (!value) return '/';
	if (value.startsWith('//')) return '/';
	try {
		const rawPath = new URL(value, 'https://servoict.invalid').pathname;
		const path = rawPath.replace(/^\/servo-ict-website(?=\/|$)/, '') || '/';
		return path.startsWith('/') && !path.startsWith('//') ? path.slice(0, 240) : '/';
	} catch {
		return '/';
	}
}

export function safePagePath(value: string | undefined): string {
	const path = extractPath(value);
	if (knownSourcePaths[path] || path === '/privacy/') return path;
	if (isKnownAdvicePath(path)) return '/advice/';
	return '/other/';
}

export function createEnquiryEvent(
	event: EnquiryEventType,
	context: Omit<EnquiryEventDetail, 'event' | 'service' | 'source' | 'pagePath'> & {
		service?: string;
		source?: string;
		pagePath?: string;
	} = {}
): EnquiryEventDetail {
	return {
		event,
		service: safeService(context.service),
		source: normaliseEnquirySource(context.source),
		pagePath: safePagePath(context.pagePath),
		...(context.deliveryMode ? { deliveryMode: context.deliveryMode } : {}),
		...(context.reason ? { reason: context.reason } : {})
	};
}

export function initializeEnquiryLinkTracking(root: ParentNode = document): () => void {
	const onClick = (event: Event) => {
		const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
		if (!link) return;
		const href = link.getAttribute('href') ?? '';
		const common = {
			service: inferService(link),
			source: link.dataset.source || window.location.pathname,
			pagePath: window.location.pathname
		};
		if (href.startsWith('tel:')) recordEnquiryEvent('phone_clicked', common);
		else if (href.startsWith('mailto:')) recordEnquiryEvent('email_clicked', common);
		else if (link.hasAttribute('data-enquiry-link') || href.includes('/contact/') || href.includes('#consultation-form')) recordEnquiryEvent('enquiry_clicked', common);
	};
	root.addEventListener('click', onClick);
	return () => root.removeEventListener('click', onClick);
}

function inferService(link: HTMLAnchorElement): string {
	if (link.dataset.service && knownServices.has(link.dataset.service)) return link.dataset.service;
	try {
		const requested = new URL(link.href, window.location.href).searchParams.get('service') ?? undefined;
		if (requested && knownServices.has(requested)) return requested;
		const current = new URL(window.location.href).searchParams.get('service') ?? undefined;
		if (current && knownServices.has(current)) return current;
	} catch {
		// Fall through to page context.
	}
	const source = normaliseEnquirySource(window.location.pathname);
	return ({ home: 'starter', websites: 'website', business_it: 'technology', security: 'security', start_business: 'starter', case_study: 'website' } as Record<string, string>)[source] ?? 'unsure';
}

export function recordEnquiryEvent(
	event: EnquiryEventType,
	context: Parameters<typeof createEnquiryEvent>[1] = {}
): EnquiryEventDetail {
	const detail = createEnquiryEvent(event, context);
	if (typeof window !== 'undefined') {
		window.dispatchEvent(new CustomEvent<EnquiryEventDetail>(enquiryEventName, { detail }));
	}
	return detail;
}
