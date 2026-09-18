import { describe, expect, it } from 'vitest';
import { createEnquiryEvent, normaliseEnquirySource, safePagePath } from './enquiryEvents';

describe('enquiry event data', () => {
	it('keeps only coarse journey context', () => {
		expect(createEnquiryEvent('submission_confirmed', {
			service: 'website',
			source: 'service_page',
			pagePath: 'https://servoict.com/contact/?email=alex@example.com#form',
			deliveryMode: 'server'
		})).toEqual({
			event: 'submission_confirmed',
			service: 'website',
			source: 'service_page',
			pagePath: '/contact/',
			deliveryMode: 'server'
		});
	});

	it('does not pass arbitrary source values or query strings', () => {
		expect(createEnquiryEvent('form_start', {
			source: 'alex@example.com',
			pagePath: '/contact/?message=private'
		})).toMatchObject({ source: 'website', pagePath: '/contact/' });
		expect(safePagePath('//attacker.example/private?value=secret')).toBe('/');
		expect(safePagePath('/customers/alex@example.com/')).toBe('/other/');
	});

	it('classifies known route sources without retaining arbitrary paths', () => {
		expect(normaliseEnquirySource('/websites/?campaign=private')).toBe('websites');
		expect(normaliseEnquirySource('/servo-ict-website/websites/?campaign=private')).toBe('websites');
		expect(normaliseEnquirySource('/3-key-steps-to-protect-your-business-accounts/')).toBe('advice');
		expect(normaliseEnquirySource('/what-to-prepare-for-your-business-website-and-email/')).toBe('advice');
		expect(normaliseEnquirySource('/what-does-a-small-business-website-and-email-cost-each-year/')).toBe('advice');
		expect(normaliseEnquirySource('/can-you-start-a-website-before-your-content-is-ready/')).toBe('advice');
		expect(safePagePath('/what-does-a-small-business-website-and-email-cost-each-year/')).toBe('/advice/');
		expect(normaliseEnquirySource('alex_example')).toBe('website');
		expect(normaliseEnquirySource('/customers/alex@example.com/')).toBe('website');
	});

	it('normalises the canonical case-study route used by enquiry links', () => {
		expect(normaliseEnquirySource('/work/12grapes/')).toBe('case_study');
		expect(normaliseEnquirySource('/servo-ict-website/work/12grapes/')).toBe('case_study');
		expect(safePagePath('/servo-ict-website/work/12grapes/?service=website')).toBe('/work/12grapes/');
	});
});
