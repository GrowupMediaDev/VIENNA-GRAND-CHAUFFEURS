// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import sitemapSingleFile from './src/integrations/sitemap-single-file.mjs';

// Produktivdomain ohne www — daraus leiten sich Canonicals, hreflang, og:url
// und die Sitemap ab (Astro.site). www ist nicht aufgesetzt.
export default defineConfig({
  site: 'https://viennagrandchauffeurs.at',
  integrations: [
    sitemap({
      // Rein visuell: der Browser rendert die Sitemap damit als Tabelle
      // (public/sitemap.xsl). Der XML-Inhalt bleibt unveraendert, Googlebot
      // ignoriert das Stylesheet. sitemapSingleFile() kuerzt die daraus
      // entstehende absolute href anschliessend auf diesen Pfad zurueck.
      xslURL: '/sitemap.xsl',
      // Beide Chauffeurservice-Seiten zeigen per Canonical auf die Startseite
      // und sollen deshalb nicht eigenstaendig indexiert werden; die
      // 404-Seite gehoert ebenfalls nicht in die Sitemap. Die beiden
      // Buchungs-Abschlussseiten stehen auf noindex — stuenden sie trotzdem in
      // der Sitemap, widerspraechen sich die beiden Signale.
      filter: (page) =>
        !/\/(leistungen\/chauffeurservice|en\/services\/chauffeur-service-vienna)\/$/.test(page) &&
        !/\/(buchung-abschluss|en\/booking-complete)\/$/.test(page) &&
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
