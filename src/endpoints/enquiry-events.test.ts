import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { POST } from './enquiry-events';
let directory: string;
beforeEach(async () => { directory = await mkdtemp(join(tmpdir(), 'servo-events-')); vi.stubEnv('ENQUIRY_METRICS_DIR', directory); });
afterEach(async () => { vi.unstubAllEnvs(); await rm(directory, { recursive: true, force: true }); });
const post = (body: object, headers: Record<string, string> = {}) => POST({ request: new Request('https://servoict.com/api/enquiry-events', {
	method: 'POST', headers: { origin: 'https://servoict.com', 'content-type': 'application/json', ...headers }, body: JSON.stringify(body)
}) } as Parameters<typeof POST>[0]);
it('accepts a bounded event and refuses forged delivery confirmations', async () => {
	expect((await post({ event: 'page_view', pagePath: '/' })).status).toBe(204);
	expect((await readdir(directory)).length).toBe(1);
	expect((await post({ event: 'submission_confirmed' })).status).toBe(400);
});
it('rejects cross-site and oversized requests without writing measurements', async () => {
	expect((await post({ event: 'form_start' }, { origin: 'https://other.test' })).status).toBe(403);
	expect((await post({ event: 'form_start', message: 'x'.repeat(2000) })).status).toBe(413);
	expect(await readdir(directory)).toEqual([]);
});
it('honours browser privacy preferences', async () => {
	expect((await post({ event: 'form_start' }, { dnt: '1' })).status).toBe(204);
	expect((await post({ event: 'form_start' }, { 'sec-gpc': '1' })).status).toBe(204);
	expect(await readdir(directory)).toEqual([]);
});
