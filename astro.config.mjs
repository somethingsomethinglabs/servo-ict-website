// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const staticBuild = process.env.PUBLIC_SITE_MODE === 'static';
const githubPagesBase = '/servo-ict-website';

/** @type {import('astro').AstroIntegration} */
const styleGuide = {
	name: 'servo-development-style-guide',
	hooks: {
		'astro:config:setup': ({ command, injectRoute }) => {
			if (command === 'dev') {
				injectRoute({ pattern: '/style-guide', entrypoint: './src/dev/StyleGuide.astro' });
				injectRoute({ pattern: '/style-guide/article', entrypoint: './src/dev/ArticleExample.astro' });
				injectRoute({ pattern: '/style-guide/case-study', entrypoint: './src/dev/CaseStudyExample.astro' });
			}
		}
	}
};

/** @type {import('astro').AstroIntegration} */
const consultationApi = {
	name: 'servo-consultation-api',
	hooks: {
		'astro:config:setup': ({ injectRoute }) => {
			injectRoute({ pattern: '/api/enquiry-events', entrypoint: './src/endpoints/enquiry-events.ts', prerender: false });
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
	devToolbar: { enabled: false },
	site: staticBuild ? 'https://somethingsomethinglabs.com' : 'https://servoict.com',
	base: staticBuild ? githubPagesBase : undefined,
	output: staticBuild ? 'static' : 'server',
	adapter: staticBuild
		? undefined
		: node({
				mode: 'standalone'
			}),
	integrations: [sitemap(), svelte(), styleGuide, ...(staticBuild ? [] : [consultationApi])]
});
