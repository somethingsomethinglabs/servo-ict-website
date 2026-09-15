import { describe, expect, it } from 'vitest';
import { FormValidationError, escapeHtml, parseConsultationRequest } from './consultation';

function form(values: Record<string, string>) {
	const data = new FormData();
	for (const [key, value] of Object.entries(values)) data.set(key, value);
	return data;
}

describe('parseConsultationRequest', () => {
	it('accepts a phone-only short enquiry and supplies the starter service', () => {
		expect(parseConsultationRequest(form({ name: 'Alex', contact: '0412 345 678', message: 'Opening a new cafe' }))).toEqual({
			name: 'Alex', phone: '0412 345 678', service: 'starter', message: 'Opening a new cafe'
		});
	});

	it('accepts and normalises a personal email address', () => {
		expect(parseConsultationRequest(form({ name: 'Alex', contact: ' ALEX@GMAIL.COM ', message: 'Starting my own business' })).email).toBe('alex@gmail.com');
	});

	it('rejects invalid fields and inherited service keys', () => {
		expect(() => parseConsultationRequest(form({ name: '', contact: 'nope', service: 'toString', message: 'short' }))).toThrow(FormValidationError);
		try {
			parseConsultationRequest(form({ name: '', contact: 'nope', service: 'toString', message: 'short' }));
		} catch (error) {
			expect((error as FormValidationError).fieldErrors).toMatchObject({ name: expect.any(String), contact: expect.any(String), service: expect.any(String), message: expect.any(String) });
		}
	});

	it('escapes visitor content used in HTML email', () => {
		expect(escapeHtml(`<script>"x" & 'y'</script>`)).toBe('&lt;script&gt;&quot;x&quot; &amp; &#39;y&#39;&lt;/script&gt;');
	});

	it('preserves optional business and timing details from the expanded form', () => {
		const submission = parseConsultationRequest(form({ name:'Alex', contactMethod:'phone', contact:'0412 345 678', organisation:' Example & Co ', timing:' Before our November opening ', service:'website', message:'We need a website for our new shop.' }));
		expect(submission).toMatchObject({ phone:'0412 345 678', organisation:'Example & Co', timing:'Before our November opening', service:'website' });
		expect(submission.email).toBeUndefined();
	});

	it.each([['email','0412 345 678'],['phone','alex@example.com']])('validates the chosen %s reply method', (contactMethod, contact) => {
		expect(() => parseConsultationRequest(form({name:'Alex',contactMethod,contact,message:'Please help with our computers.'}))).toThrow(FormValidationError);
	});

	it.each(['x'.repeat(161),'Next month\nAnother line'])('rejects an invalid timing note', (timing) => {
		try {
			parseConsultationRequest(form({name:'Alex',contact:'alex@example.com',message:'Please help with our computers.',timing}));
			throw new Error('Expected timing validation to fail');
		} catch (error) {
			expect(error).toBeInstanceOf(FormValidationError);
			expect((error as FormValidationError).fieldErrors.timing).toBeTruthy();
		}
	});
});
