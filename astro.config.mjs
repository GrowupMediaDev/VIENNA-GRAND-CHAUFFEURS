// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sitemapSingleFile from './src/integrations/sitemap-single-file.mjs';

// Domain is not finalized yet — placeholder until go-live.
export default defineConfig({
  site: 'https://vienna-grand-chauffeurs.pages.dev',
  integrations: [
    sitemap({
      // Rein visuell: der Browser rendert die Sitemap damit als Tabelle
      // (public/sitemap.xsl). Der XML-Inhalt bleibt unveraendert, Googlebot
      // ignoriert das Stylesheet. sitemapSingleFile() kuerzt die daraus
      // entstehende absolute href anschliessend auf diesen Pfad zurueck.
      xslURL: '/sitemap.xsl',
      // Beide Chauffeurservice-Seiten zeigen per Canonical auf die Startseite
      // und sollen deshalb nicht eigenstaendig indexiert werden; die
      // 404-Seite gehoert ebenfalls nicht in die Sitemap.
      filter: (page) =>
        !/\/(leistungen\/chauffeurservice|en\/services\/chauffeur-service-vienna)\/$/.test(page) &&
        !/\/404\/?$/.test(page),
    }),
    // Muss nach sitemap() stehen — legt deren Ausgabe unter /sitemap.xml ab.
    sitemapSingleFile(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
});
