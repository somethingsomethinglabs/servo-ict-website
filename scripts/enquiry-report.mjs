import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
const directory = process.env.ENQUIRY_METRICS_DIR;
if (!directory) throw new Error('Set ENQUIRY_METRICS_DIR to the persistent metrics directory.');
const since = process.argv[2] ?? new Date(Date.now() - 29 * 86400000).toISOString().slice(0, 10);
const through = process.argv[3] ?? new Date().toISOString().slice(0, 10);
if (![since, through].every(date => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date) || since > through) throw new Error('Expected an ordered date range YYYY-MM-DD YYYY-MM-DD.');
const totals = new Map();
for (const file of await readdir(directory)) {
	if (!/^\d{4}-\d{2}-\d{2}\.json$/.test(file) || file.slice(0, 10) < since || file.slice(0, 10) > through) continue;
	const counts = JSON.parse(await readFile(join(directory, file), 'utf8'));
	for (const [key, count] of Object.entries(counts)) totals.set(key, (totals.get(key) ?? 0) + count);
}
console.log('Aggregate event counts', since, 'through', through, '(inclusive UTC dates). Counts are not unique visitors or a conversion rate.');
console.table([...totals].map(([key, count]) => {
	const [event, service, source, page, mode, reason] = JSON.parse(key);
	return { event, service, source, page, mode, reason, count };
}));
if (!totals.size) console.log('No measurements in this period.');
