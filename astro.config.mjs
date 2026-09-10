// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import node from '@astrojs/node';

const staticBuild = process.env.PUBLIC_SITE_MODE === 'static';
const githubPagesBase = '/servo-ict-website';

/** @type {import('astro').AstroIntegration} */
const consultationApi = {
	name: 'servo-consultation-api',
	hooks: {
		'astro:config:setup': ({ injectRoute }) => {
			injectRoute({
				pattern: '/api/consultation',
				entrypoint: './src/endpoints/consultation.ts',
				prerender: false
			});
		}
	}
};

// https://astro.build/config
export default defineConfig({
	site: staticBuild ? 'https://somethingsomethinglabs.github.io' : 'https://servoict.com',
	base: staticBuild ? githubPagesBase : undefined,
	output: staticBuild ? 'static' : 'server',
	adapter: staticBuild
		? undefined
		: node({
				mode: 'standalone'
			}),
	integrations: [svelte(), ...(staticBuild ? [] : [consultationApi])]
});
