import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Legt die Sitemap unter /sitemap.xml ab statt unter /sitemap-index.xml.
 *
 * @astrojs/sitemap schreibt immer ein Index-Paar (`sitemap-index.xml` +
 * `sitemap-0.xml`, siehe write-sitemap.js); die Dateinamen sind fest verdrahtet
 * und ueber keine Option steuerbar. Diese Integration raeumt deshalb nach dem
 * Build auf:
 *
 * - Ein Chunk (unser Fall, 48 URLs bei einem Limit von 45.000): der Chunk wird
 *   zu `sitemap.xml`, der ueberfluessige Index entfaellt. Ergebnis ist eine
 *   einzelne Sitemap unter /sitemap.xml.
 * - Mehrere Chunks: der Index wird zu `sitemap.xml`, die Chunks bleiben liegen
 *   und werden von dort referenziert.
 *
 * Nebenbei wird die <?xml-stylesheet?>-Zeile auf einen relativen Pfad gekuerzt.
 * Die xslURL-Option der Integration schreibt sie absolut gegen `site`, was in
 * der lokalen Vorschau cross-origin waere - Browser wenden das Stylesheet dann
 * nicht an.
 *
 * Muss in `integrations` NACH sitemap() stehen: Astro ruft astro:build:done in
 * der Reihenfolge des Arrays auf.
 */
export default function sitemapSingleFile() {
  return {
    name: 'sitemap-single-file',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const indexPath = resolve(outDir, 'sitemap-index.xml');

        const chunks = (await readdir(outDir))
          .filter((name) => /^sitemap-\d+\.xml$/.test(name))
          .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

        if (!chunks.length) {
          logger.warn('Keine Sitemap-Chunks gefunden — /sitemap.xml nicht erzeugt.');
          return;
        }

        const single = chunks.length === 1;
        const sourcePath = single ? resolve(outDir, chunks[0]) : indexPath;
        const xml = relativiseStylesheet(await readFile(sourcePath, 'utf8'));

        await writeFile(resolve(outDir, 'sitemap.xml'), xml, 'utf8');
        await rm(indexPath, { force: true });
        if (single) await rm(sourcePath, { force: true });

        logger.info(
          single
            ? '`sitemap.xml` erzeugt (eine Sitemap, Index entfaellt)'
            : `\`sitemap.xml\` erzeugt (Index ueber ${chunks.length} Chunks)`,
        );
      },
    },
  };
}

/** href des <?xml-stylesheet?> auf seinen Pfad kuerzen, falls es absolut ist. */
function relativiseStylesheet(xml) {
  return xml.replace(
    /(<\?xml-stylesheet[^?]*href=")([^"]+)(")/,
    (match, head, href, tail) => {
      if (href.startsWith('/')) return match;
      try {
        return head + new URL(href).pathname + tail;
      } catch {
        return match;
      }
    },
  );
}
