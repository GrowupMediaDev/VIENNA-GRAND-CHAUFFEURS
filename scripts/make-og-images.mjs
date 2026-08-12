#!/usr/bin/env node
/**
 * make-og-images.mjs — erzeugt die Share-Bilder unter public/images/og/.
 *
 * Facebook, LinkedIn und WhatsApp erwarten 1200x630. Die Quellbilder der Site
 * haben andere Seitenverhaeltnisse (1376x768, 2000x1493, ...), deshalb wird
 * hier einmalig zugeschnitten statt zur Laufzeit. Ergebnis: jede Seite liefert
 * ein og:image, dessen og:image:width/height garantiert stimmen.
 *
 * Quelle fuer Slug und Hero sind dieselben Datendateien, aus denen die Seiten
 * gebaut werden — hier wird nichts doppelt gepflegt.
 *
 * Aufruf:  node scripts/make-og-images.mjs
 * Die erzeugten Bilder gehoeren ins Repo; das Skript laeuft nur, wenn sich ein
 * Hero-Bild aendert oder eine Leistung/ein Fahrzeug dazukommt.
 *
 * sharp kommt als Abhaengigkeit von Astro mit (astro:assets) und steht
 * deshalb ohne separate Installation zur Verfuegung.
 */

import { mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { SERVICES_DATA } from '../src/lib/services-data.ts';
import { VEHICLES_DATA } from '../src/lib/vehicles-data.ts';

const OUT_DIR = join('public', 'images', 'og');
const WIDTH = 1200;
const HEIGHT = 630;

/** [Quellbild unter public/, Zieldatei ohne Endung] */
const JOBS = [
  ['/images/hero-home.jpg', 'default'],
  ...SERVICES_DATA.map((s) => [s.heroImg, `leistungen-${s.slug}`]),
  ...VEHICLES_DATA.map((v) => [v.img.hero, `fahrzeuge-${v.slug}`]),
];

mkdirSync(OUT_DIR, { recursive: true });

let written = 0;
for (const [src, name] of JOBS) {
  const from = join('public', src.replace(/^\//, ''));
  if (!existsSync(from)) {
    console.error(`  fehlt: ${from} — uebersprungen`);
    continue;
  }
  const to = join(OUT_DIR, `${name}.jpg`);
  // "attention" schneidet auf den bildwichtigsten Bereich zu (Fahrzeug/Person)
  // statt stumpf auf die Mitte.
  const info = await sharp(from)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(to);
  written++;
  console.log(`  ${to}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} KB`);
}

console.log(`\n${written} von ${JOBS.length} OG-Bildern geschrieben (${WIDTH}x${HEIGHT}).`);
