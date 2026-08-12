// robots.txt als statische Route. Das Projekt laeuft mit output: 'static',
// GET wird also einmal beim Build ausgewertet und das Ergebnis nach
// dist/robots.txt geschrieben.
//
// Bewusst nichts gesperrt: die Site hat keine Bereiche, die aus dem Index
// gehalten werden muessen. Was nicht indexiert werden soll (404, die beiden
// Buchungs-Abschlussseiten), traegt <meta name="robots" content="noindex"> —
// und genau deshalb darf es hier NICHT zusaetzlich per Disallow gesperrt
// werden: Google muss die Seite abrufen koennen, um das noindex ueberhaupt zu
// lesen. Auch /_astro/, /images/ und /fonts/ bleiben offen, sonst kann Google
// die Seiten nicht rendern und bewertet Layout und Core Web Vitals falsch.
//
// "noindex:" in der robots.txt gibt es hier nicht — Google unterstuetzt die
// Direktive seit September 2019 nicht mehr, sie waere wirkungslos.

import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) {
    // Ohne `site` in astro.config.mjs liesse sich nur eine relative Sitemap-URL
    // bilden, und die ignoriert Google kommentarlos. Dann lieber der Build-Fehler.
    throw new Error('robots.txt braucht `site` in astro.config.mjs für die absolute Sitemap-URL.');
  }

  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${new URL('sitemap.xml', site).href}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
