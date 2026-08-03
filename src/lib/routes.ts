// Vienna Grand Chauffeurs — URL mapping between the German (root) and the
// English (/en/) route tree. Both trees use localised path segments AND
// localised slugs, so a link cannot simply be prefixed with /en — every
// segment has to be translated.
//
// Single source of truth for the slug pairs are the data arrays (slug/slugEn);
// the static page segments live in the table below.

import { SERVICES_DATA } from './services-data';
import { VEHICLES_DATA } from './vehicles-data';

export type Lang = 'de' | 'en';

// First path segment, German -> English. Segments that are not listed (the
// legal pages) keep their German name in both trees.
const SEGMENT: Record<string, string> = {
  leistungen: 'services',
  fahrzeuge: 'vehicles',
  preise: 'prices',
  kontakt: 'contact',
  'online-buchung': 'online-booking',
  'buchung-abschluss': 'booking-complete',
};
const SEGMENT_BACK: Record<string, string> = Object.fromEntries(
  Object.entries(SEGMENT).map(([de, en]) => [en, de]),
);

const SERVICE_SLUGS = SERVICES_DATA.map((s) => ({ de: s.slug, en: s.slugEn }));
const VEHICLE_SLUGS = VEHICLES_DATA.map((v) => ({ de: v.slug, en: v.slugEn }));

// The slug pairs that belong under a given section, addressed by its German or
// English segment name.
function slugsFor(segment: string): { de: string; en: string }[] | null {
  if (segment === 'leistungen' || segment === 'services') return SERVICE_SLUGS;
  if (segment === 'fahrzeuge' || segment === 'vehicles') return VEHICLE_SLUGS;
  return null;
}

// Trailing slash and hash are preserved verbatim so callers keep control over
// the exact shape of the href they asked for.
function parse(path: string) {
  const hashAt = path.indexOf('#');
  const hash = hashAt === -1 ? '' : path.slice(hashAt);
  const clean = hashAt === -1 ? path : path.slice(0, hashAt);
  return {
    segments: clean.split('/').filter(Boolean),
    trailing: clean.length > 1 && clean.endsWith('/'),
    hash,
  };
}

function build(segments: string[], trailing: boolean, hash: string, lang: Lang): string {
  const all = lang === 'en' ? ['en', ...segments] : segments;
  if (!all.length) return '/' + hash;
  const slash = trailing || (lang === 'en' && !segments.length) ? '/' : '';
  return '/' + all.join('/') + slash + hash;
}

// Locale-independent segment form: /en prefix removed, segments and slug
// translated back to German.
function toGerman(segments: string[]): string[] {
  const out = segments[0] === 'en' ? segments.slice(1) : segments.slice();
  if (!out.length) return out;
  const pairs = slugsFor(out[0]);
  if (pairs && out[1]) {
    const hit = pairs.find((p) => p.en === out[1] || p.de === out[1]);
    if (hit) out[1] = hit.de;
  }
  out[0] = SEGMENT_BACK[out[0]] ?? out[0];
  return out;
}

function toEnglish(segments: string[]): string[] {
  const out = segments.slice();
  if (!out.length) return out;
  const pairs = slugsFor(out[0]);
  if (pairs && out[1]) {
    const hit = pairs.find((p) => p.de === out[1]);
    if (hit) out[1] = hit.en;
  }
  out[0] = SEGMENT[out[0]] ?? out[0];
  return out;
}

// Translate any in-site path into the given language. Accepts German or
// English input, so it works both for building links from German-rooted paths
// and for finding the counterpart of the page currently being rendered.
export function localizePath(path: string, lang: Lang): string {
  const { segments, trailing, hash } = parse(path);
  const de = toGerman(segments);
  return build(lang === 'en' ? toEnglish(de) : de, trailing, hash, lang);
}

// German form of a path, used to compare the current URL against nav links
// regardless of which language tree the visitor is in.
export function canonicalPath(path: string): string {
  const { segments, trailing, hash } = parse(path);
  return build(toGerman(segments), trailing, hash, 'de');
}
