import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { parseMetric, storeMetric } from './enquiryMetrics';

const directories: string[] = [];
afterEach(async () => { await Promise.all(directories.splice(0).map(path => rm(path, { recursive: true, force: true }))); });

describe('enquiry measurements', () => {
	it('rejects browser success claims and drops personal/freeform values', () => {
		expect(parseMetric({ event: 'submission_confirmed' })).toBeUndefined();
		const metric = parseMetric({ event: 'form_start', service: 'alex@example.com', source: '/contact/?email=alex@example.com', pagePath: '/private/alex@example.com', name: 'Alex', reason: 'my password', deliveryMode: 'secret' });
		expect(metric).toEqual({ event: 'form_start', service: 'unsure', source: 'contact', pagePath: '/other/' });
	});
	it('serialises concurrent increments and removes expired daily counts', async () => {
		const directory = await mkdtemp(join(tmpdir(), 'servo-metrics-')); directories.push(directory);
		await writeFile(join(directory, '2025-01-01.json'), '{}');
		const metric = parseMetric({ event: 'enquiry_clicked', service: 'starter', source: 'home', pagePath: '/' })!;
		await Promise.all(Array.from({ length: 8 }, () => storeMetric(metric, directory, new Date('2026-09-19T12:00:00Z'))));
		const counts = JSON.parse(await readFile(join(directory, '2026-09-19.json'), 'utf8'));
		expect(Object.values(counts)).toEqual([8]);
		expect(await readdir(directory)).toEqual(['2026-09-19.json']);
	});
});
