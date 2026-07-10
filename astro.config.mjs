// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// Domain is not finalized yet — placeholder until go-live.
export default defineConfig({
  site: 'https://vienna-grand-chauffeurs.pages.dev',
  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    clientPrerender: true,
  },

  adapter: cloudflare(),
});