export const baseUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
export const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;
export const enquiryPath = (service?: string) => `${sitePath('/contact/')}${service ? `?service=${encodeURIComponent(service)}` : ''}#consultation-form`;
export const services = [
	{ label: 'Websites', path: '/websites/' },
	{ label: 'Business IT', path: '/business-it/' },
	{ label: 'Security', path: '/security/' }
];
