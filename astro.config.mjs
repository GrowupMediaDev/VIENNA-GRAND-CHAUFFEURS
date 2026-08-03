// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// Domain is not finalized yet — placeholder until go-live.
export default defineConfig({
  site: 'https://vienna-grand-chauffeurs.pages.dev',
  integrations: [
    sitemap({
      // Beide Chauffeurservice-Seiten zeigen per Canonical auf die Startseite
      // und sollen deshalb nicht eigenstaendig indexiert werden.
      filter: (page) =>
        !/\/(leistungen\/chauffeurservice|en\/services\/chauffeur-service-vienna)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
});
