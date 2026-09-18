import type { APIRoute } from 'astro';
import { metricsDirectory, parseMetric, storeMetric } from '../lib/server/enquiryMetrics';

export const POST: APIRoute = async ({ request }) => {
	if (!metricsDirectory()) return new Response(null, { status: 204 });
	if (request.headers.get('origin') !== new URL(request.url).origin) return new Response(null, { status: 403 });
	if (!request.headers.get('content-type')?.startsWith('application/json')) return new Response(null, { status: 415 });
	if (request.headers.get('dnt') === '1' || request.headers.get('sec-gpc') === '1') return new Response(null, { status: 204 });
	const reader = request.body?.getReader();
	if (!reader) return new Response(null, { status: 400 });
	let data = '';
	let length = 0;
	const decoder = new TextDecoder();
	while (true) {
		const { done, value } = await reader.read();
		if (done) break;
		length += value.byteLength;
		if (length > 1024) { await reader.cancel(); return new Response(null, { status: 413 }); }
		data += decoder.decode(value, { stream: true });
	}
	let metric;
	try { metric = parseMetric(JSON.parse(data + decoder.decode())); }
	catch { return new Response(null, { status: 400 }); }
	if (!metric) return new Response(null, { status: 400 });
	try { await storeMetric(metric); }
	catch { return new Response(null, { status: 503 }); }
	return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } });
};
