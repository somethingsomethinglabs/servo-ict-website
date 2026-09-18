export const baseUrl = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
export const sitePath = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;
export const enquiryPath = (service?: string, source?: string) => {
	const query = new URLSearchParams({ ...(service ? { service } : {}), ...(source ? { source } : {}) });
	return `${sitePath('/contact/')}${query.size ? `?${query}` : ''}#consultation-form`;
};
export const services = [
	{ label: 'Websites', path: '/websites/' },
	{ label: 'Business IT', path: '/business-it/' },
	{ label: 'Account security', path: '/security/' }
];
