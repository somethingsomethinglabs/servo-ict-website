import { mkdir, readFile, readdir, rename, unlink, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createEnquiryEvent, type EnquiryEventDetail } from '../enquiryEvents';

const browserEvents = new Set(['page_view', 'form_start', 'enquiry_clicked', 'submission_failed', 'email_draft_opened', 'phone_clicked', 'email_clicked']);
export type Metric = Omit<EnquiryEventDetail, 'event'> & { event: string };
export function metricsDirectory(): string | undefined {
	return process.env.ENQUIRY_METRICS_DIR?.trim() || undefined;
}

// Keep only known categories. Never persist arbitrary request values or identifiers.
export function parseMetric(value: unknown): Metric | undefined {
	if (!value || typeof value !== 'object') return;
	const input = value as Record<string, unknown>;
	if (typeof input.event !== 'string' || !browserEvents.has(input.event)) return;
	const detail = createEnquiryEvent('form_start', {
		service: typeof input.service === 'string' ? input.service : undefined,
		source: typeof input.source === 'string' ? input.source : undefined,
		pagePath: typeof input.pagePath === 'string' ? input.pagePath : undefined,
		deliveryMode: input.deliveryMode === 'server' || input.deliveryMode === 'email' ? input.deliveryMode : undefined,
		reason: input.reason === 'validation' || input.reason === 'delivery' || input.reason === 'response' ? input.reason : undefined
	});
	return { ...detail, event: input.event };
}

let pending: Promise<void> = Promise.resolve();
// One Node process, daily aggregate counts, no visitor/session records.
export function storeMetric(metric: Metric, directory = metricsDirectory(), now = new Date()): Promise<void> {
	if (!directory) return Promise.resolve();
	const work = pending.catch(() => {}).then(async () => {
		await mkdir(directory, { recursive: true, mode: 0o700 });
		const day = now.toISOString().slice(0, 10);
		const path = join(directory, `${day}.json`);
		let counts: Record<string, number> = {};
		try { counts = JSON.parse(await readFile(path, 'utf8')); }
		catch (error) { if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error; }
		const key = JSON.stringify([metric.event, metric.service, metric.source, metric.pagePath, metric.deliveryMode ?? '', metric.reason ?? '']);
		counts[key] = (counts[key] ?? 0) + 1;
		const temporary = `${path}.${process.pid}.tmp`;
		await writeFile(temporary, JSON.stringify(counts), { mode: 0o600 });
		await rename(temporary, path);
		const cutoff = new Date(now.getTime() - 89 * 86400000).toISOString().slice(0, 10);
		for (const file of await readdir(directory)) {
			if (/^\d{4}-\d{2}-\d{2}\.json$/.test(file) && file.slice(0, 10) < cutoff) await unlink(join(directory, file));
		}
	});
	pending = work;
	return work;
}

export async function recordDeliveredEnquiry(context: Parameters<typeof createEnquiryEvent>[1]): Promise<void> {
	try { await storeMetric(createEnquiryEvent('submission_confirmed', { ...context, deliveryMode: 'server' })); }
	catch { console.error('Enquiry measurement could not be stored.'); }
}
