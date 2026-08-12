#!/usr/bin/env node
/**
 * seo-audit.mjs — technischer SEO-Audit ueber das GEBAUTE HTML (dist/).
 *
 * Bewusst NICHT der Quellcode-Linter (das ist seo-check.mjs). Dieses Skript
 * liest das ausgelieferte HTML und prueft nur Mechanisches:
 * Indexierung, Canonical, hreflang, Meta/Head, Schema, interne Linkstruktur.
 *
 * Textqualitaet wird hier NICHT bewertet (siehe SEO-REVIEW.md).
 *
 * Aufruf:  node seo-audit.mjs [distDir] [--json]
 * Default: ./dist
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, extname, relative, sep } from 'node:path';

const DIST = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist';
const AS_JSON = process.argv.includes('--json');

if (!existsSync(DIST)) {
  console.error(`Kein Build gefunden unter "${DIST}". Erst "npm run build" laufen lassen.`);
  process.exit(2);
}

// ─────────────────────────────────────────────────────────── Helpers

const findings = [];
const add = (level, id, page, msg) => findings.push({ level, id, page, msg });
const err = (id, page, msg) => add('error', id, page, msg);
const warn = (id, page, msg) => add('warning', id, page, msg);
const info = (id, page, msg) => add('info', id, page, msg);

function walk(dir) {
  let out = [];
  for (const it of readdirSync(dir)) {
    const p = join(dir, it);
    if (statSync(p).isDirectory()) out = out.concat(walk(p));
    else out.push(p);
  }
  return out;
}

/** dist/en/foo/index.html -> /en/foo/ ; dist/foo.html -> /foo/ ; dist/index.html -> / */
function fileToUrl(file) {
  let p = '/' + relative(DIST, file).split(sep).join('/');
  p = p.replace(/index\.html$/, '').replace(/\.html$/, '/');
  if (!p.endsWith('/')) p += '/';
  return p.replace(/\/{2,}/g, '/');
}

/** Href -> interner Pfad, oder null wenn extern/nicht-navigierbar. */
function toInternalPath(href, siteOrigin) {
  if (!href) return null;
  const h = href.trim();
  if (/^(mailto:|tel:|javascript:|data:|#|sms:|whatsapp:)/i.test(h)) return null;
  let path;
  if (/^https?:\/\//i.test(h)) {
    let u;
    try { u = new URL(h); } catch { return null; }
    if (!siteOrigin || u.origin !== siteOrigin) return null;
    path = u.pathname;
  } else if (h.startsWith('//')) {
    return null;
  } else if (h.startsWith('/')) {
    path = h.split('#')[0].split('?')[0];
  } else {
    return null; // relative Links sind im Astro-Output unueblich
  }
  if (!path) return null;
  // Assets nicht als Seite werten
  if (/\.(png|jpe?g|webp|avif|svg|gif|ico|pdf|css|js|xml|txt|json|woff2?|mp4|webm)$/i.test(path)) return null;
  if (!path.endsWith('/')) path += '/';
  return path.replace(/\/{2,}/g, '/');
}

/**
 * Attribute eines Tags einlesen. Beachtet auch wertlose Attribute:
 * <img alt loading="lazy"> — "alt" allein ist gueltiges HTML und bedeutet
 * alt="" (dekoratives Bild), nicht "Attribut fehlt".
 */
function attrs(tag) {
  const out = {};
  const inner = tag.replace(/^<[a-zA-Z0-9-]+/, '').replace(/\/?>$/, '');
  const re = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>=]+)))?/g;
  let m;
  while ((m = re.exec(inner))) {
    if (!m[1]) continue;
    out[m[1].toLowerCase()] = m[2] ?? m[3] ?? m[4] ?? '';
  }
  return out;
}

const decode = (s) =>
  (s || '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .trim();

// ─────────────────────────────────────────────────────────── Parsen

const htmlFiles = walk(DIST).filter((f) => extname(f) === '.html');
if (!htmlFiles.length) {
  console.error(`Keine HTML-Dateien in "${DIST}".`);
  process.exit(2);
}

const pages = new Map(); // url -> pageObj

for (const file of htmlFiles) {
  const url = fileToUrl(file);
  const html = readFileSync(file, 'utf8');
  const head = (html.match(/<head[^>]*>([\s\S]*?)<\/head>/i) || [, html])[1];
  const body = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i) || [, html])[1];

  const metas = (head.match(/<meta\s[^>]*>/gi) || []).map(attrs);
  const links = (head.match(/<link\s[^>]*>/gi) || []).map(attrs);

  const metaBy = (key, val) =>
    decode((metas.find((m) => (m[key] || '').toLowerCase() === val) || {}).content);

  const jsonld = [];
  const ldRe = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let lm;
  while ((lm = ldRe.exec(html))) {
    try { jsonld.push(JSON.parse(lm[1].trim())); }
    catch { err('jsonld-invalid', url, 'JSON-LD ist kein valides JSON, Google ignoriert den Block komplett.'); }
  }

  const hrefs = [];
  const aRe = /<a\s[^>]*>/gi;
  let am;
  while ((am = aRe.exec(body))) {
    const a = attrs(am[0]);
    // Ankertext grob mitnehmen (nur fuer die generic-anchor-Pruefung)
    const after = body.slice(am.index + am[0].length, am.index + am[0].length + 300);
    const text = decode(after.split('</a>')[0].replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ');
    hrefs.push({ href: a.href, rel: a.rel || '', text });
  }

  pages.set(url, {
    url,
    file,
    title: decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1]),
    description: metaBy('name', 'description'),
    robots: (metaBy('name', 'robots') || '').toLowerCase(),
    canonical: (links.find((l) => (l.rel || '').toLowerCase() === 'canonical') || {}).href || '',
    alternates: links
      .filter((l) => (l.rel || '').toLowerCase() === 'alternate' && l.hreflang)
      .map((l) => ({ lang: l.hreflang.toLowerCase(), href: l.href || '' })),
    og: Object.fromEntries(
      metas.filter((m) => (m.property || '').startsWith('og:')).map((m) => [m.property, decode(m.content)])
    ),
    twitter: Object.fromEntries(
      metas.filter((m) => (m.name || '').startsWith('twitter:')).map((m) => [m.name, decode(m.content)])
    ),
    h1: (body.match(/<h1[\s>]/gi) || []).length,
    rawImgs: (body.match(/<img\s[^>]*>/gi) || []).map(attrs),
    jsonld,
    hrefs,
  });
}

// Site-Origin aus dem haeufigsten Canonical ableiten
let siteOrigin = null;
{
  const counts = new Map();
  for (const p of pages.values()) {
    if (!/^https?:\/\//i.test(p.canonical)) continue;
    try { const o = new URL(p.canonical).origin; counts.set(o, (counts.get(o) || 0) + 1); } catch {}
  }
  siteOrigin = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}

const isNoindex = (p) => /\bnoindex\b/.test(p.robots);
const indexable = [...pages.values()].filter((p) => !isNoindex(p));

// ─────────────────────────────────────────────────────────── 1. Meta / Head

const titleMap = new Map();
const descMap = new Map();

for (const p of indexable) {
  if (!p.title) err('title-missing', p.url, 'Kein <title>.');
  else {
    if (p.title.length < 30) warn('title-short', p.url, `Title nur ${p.title.length} Zeichen ("${p.title}").`);
    if (p.title.length > 65) warn('title-long', p.url, `Title ${p.title.length} Zeichen, wird in der SERP abgeschnitten.`);
    const k = p.title.toLowerCase();
    titleMap.set(k, [...(titleMap.get(k) || []), p.url]);
  }

  if (!p.description) err('desc-missing', p.url, 'Keine meta description.');
  else {
    if (p.description.length < 110) warn('desc-short', p.url, `Description nur ${p.description.length} Zeichen.`);
    if (p.description.length > 170) warn('desc-long', p.url, `Description ${p.description.length} Zeichen, wird abgeschnitten.`);
    const k = p.description.toLowerCase();
    descMap.set(k, [...(descMap.get(k) || []), p.url]);
  }

  if (p.h1 === 0) err('h1-missing', p.url, 'Keine H1.');
  else if (p.h1 > 1) warn('h1-multiple', p.url, `${p.h1} H1-Elemente. Genau eine ist die Regel.`);

  for (const k of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type']) {
    if (!p.og[k]) warn('og-missing', p.url, `${k} fehlt.`);
  }
  if (p.og['og:image'] && !/^https?:\/\//i.test(p.og['og:image']))
    err('og-image-relative', p.url, 'og:image ist relativ. Facebook/LinkedIn brauchen eine absolute URL.');
  if (p.og['og:url'] && p.canonical && p.og['og:url'].replace(/\/$/, '') !== p.canonical.replace(/\/$/, ''))
    warn('og-url-mismatch', p.url, 'og:url weicht vom Canonical ab.');

  if (!p.twitter['twitter:card']) warn('twitter-missing', p.url, 'twitter:card fehlt.');
}

for (const [t, urls] of titleMap) if (urls.length > 1)
  err('title-duplicate', urls[0], `Title auf ${urls.length} Seiten identisch: ${urls.join(', ')}`);
for (const [d, urls] of descMap) if (urls.length > 1)
  warn('desc-duplicate', urls[0], `Description auf ${urls.length} Seiten identisch: ${urls.join(', ')}`);

// noindex-Seiten brauchen trotzdem Title/Description (falls sie spaeter live gehen)
for (const p of pages.values()) {
  if (!isNoindex(p)) continue;
  if (!p.title) warn('title-missing-noindex', p.url, 'noindex-Seite ohne Title.');
}

// ─────────────────────────────────────────────────────────── 2. Canonical

for (const p of pages.values()) {
  if (isNoindex(p)) {
    if (p.canonical) warn('canonical-on-noindex', p.url, 'noindex-Seite gibt ein Canonical aus. Signal verpufft, weglassen.');
    if (p.alternates.length) err('hreflang-on-noindex', p.url, 'noindex-Seite gibt hreflang aus. Verwirrt das Sprach-Clustering.');
    continue;
  }
  if (!p.canonical) { err('canonical-missing', p.url, 'Kein Canonical.'); continue; }
  if (!/^https?:\/\//i.test(p.canonical)) { err('canonical-relative', p.url, 'Canonical ist relativ, muss absolut sein.'); continue; }
  const cPath = (() => { try { return new URL(p.canonical).pathname.replace(/\/?$/, '/'); } catch { return null; } })();
  if (cPath && cPath !== p.url)
    err('canonical-not-self', p.url, `Canonical zeigt auf ${cPath} statt auf sich selbst.`);
  if (siteOrigin && !p.canonical.startsWith(siteOrigin))
    warn('canonical-origin', p.url, `Canonical-Origin weicht ab (${p.canonical}).`);
}

// ─────────────────────────────────────────────────────────── 3. hreflang

const byPath = new Map([...pages.keys()].map((u) => [u, u]));

/**
 * Href -> normalisierter Pfad. Seiten-URLs bekommen einen Trailing Slash,
 * damit /a und /a/ vergleichbar sind. Dateien mit Endung (sitemap-0.xml,
 * feed.rss) NICHT — sonst wird aus /sitemap-0.xml ein /sitemap-0.xml/ und
 * greift kein Datei-Filter mehr.
 */
const pathOf = (href) => {
  try {
    const p = new URL(href, siteOrigin || 'https://x.invalid').pathname;
    return /\.[a-z0-9]{2,5}$/i.test(p) ? p : p.replace(/\/?$/, '/');
  } catch { return null; }
};

for (const p of indexable) {
  if (!p.alternates.length) continue;

  const langs = p.alternates.map((a) => a.lang);
  if (!langs.includes('x-default'))
    err('hreflang-no-xdefault', p.url, 'hreflang-Set ohne x-default.');

  const dupes = langs.filter((l, i) => langs.indexOf(l) !== i);
  if (dupes.length) err('hreflang-duplicate-lang', p.url, `hreflang mehrfach vergeben: ${[...new Set(dupes)].join(', ')}`);

  // Selbstreferenz
  const selfRef = p.alternates.some((a) => pathOf(a.href) === p.url);
  if (!selfRef) err('hreflang-no-self', p.url, 'hreflang-Set enthaelt keine Selbstreferenz.');

  for (const alt of p.alternates) {
    if (alt.lang === 'x-default') continue;
    if (!/^https?:\/\//i.test(alt.href)) { err('hreflang-relative', p.url, `hreflang "${alt.lang}" ist relativ, muss absolut sein.`); continue; }
    const target = pathOf(alt.href);
    if (!target || !byPath.has(target)) {
      err('hreflang-dead', p.url, `hreflang "${alt.lang}" zeigt auf ${target || alt.href} — Seite existiert im Build nicht.`);
      continue;
    }
    const other = pages.get(target);
    if (isNoindex(other)) {
      err('hreflang-to-noindex', p.url, `hreflang "${alt.lang}" zeigt auf die noindex-Seite ${target}.`);
      continue;
    }
    const backRef = other.alternates.some((a) => pathOf(a.href) === p.url && a.lang !== 'x-default');
    if (!backRef)
      err('hreflang-not-reciprocal', p.url, `${target} verlinkt nicht zurueck. Ohne Reziprozitaet ignoriert Google das ganze Set.`);
  }
}

// ─────────────────────────────────────────────────────────── 4. Schema.org

function flattenLd(node, out = []) {
  if (Array.isArray(node)) { node.forEach((n) => flattenLd(n, out)); return out; }
  if (node && typeof node === 'object') {
    out.push(node);
    if (node['@graph']) flattenLd(node['@graph'], out);
  }
  return out;
}

/**
 * Typen, die als "der Betrieb" zaehlen. Bewusst inklusive der
 * LocalBusiness-Unterklassen: MovingCompany, LimousineService usw. SIND
 * LocalBusiness. Wer den semantisch praeziseren Typ waehlt, soll ihn nicht
 * verbiegen muessen, nur damit dieser Check anschlaegt. Liste bei Bedarf
 * ergaenzen — schema.org hat rund 100 solcher Unterklassen.
 */
const BUSINESS_TYPE = new Set([
  'Organization', 'LocalBusiness', 'Corporation',
  'MovingCompany', 'HomeAndConstructionBusiness', 'GeneralContractor',
  'ProfessionalService', 'Store', 'SelfStorage', 'DryCleaningOrLaundry',
  'LimousineService', 'TaxiService', 'AutoRental', 'AutomotiveBusiness',
  'TravelAgency', 'LodgingBusiness', 'FoodEstablishment',
  'Plumber', 'Electrician', 'HousePainter', 'Locksmith', 'RoofingContractor',
  'HVACBusiness', 'PestControlService', 'CleaningService',
  'LegalService', 'FinancialService', 'InsuranceAgency', 'AccountingService',
  'RealEstateAgent', 'MedicalBusiness', 'Dentist', 'HealthAndBeautyBusiness',
  'EmergencyService', 'ChildCare', 'EntertainmentBusiness',
  'SportsActivityLocation', 'TouristInformationCenter',
]);

const businessIds = new Set();
let businessFull = 0;

for (const p of pages.values()) {
  const nodes = flattenLd(p.jsonld);
  if (!nodes.length && !isNoindex(p)) {
    warn('schema-missing', p.url, 'Kein JSON-LD auf der Seite.');
    continue;
  }
  for (const n of nodes) {
    const typeList = (Array.isArray(n['@type']) ? n['@type'] : [n['@type']])
      .filter(Boolean).map(String);
    if (!typeList.length) continue;
    const type = typeList.join(',');

    if (typeList.some((t) => BUSINESS_TYPE.has(t))) {
      // "voll" = hat mehr als nur @id/@type (also keine reine Referenz)
      const keys = Object.keys(n).filter((k) => !['@type', '@id', '@context'].includes(k));
      if (keys.length > 2) { businessFull++; businessIds.add(n['@id'] || '(ohne @id)'); }
      if (!n['@id']) warn('business-no-id', p.url, `${type} ohne feste @id. Ohne @id kann keine andere Seite darauf referenzieren.`);
    }

    if (/BreadcrumbList/.test(type)) {
      const items = n.itemListElement || [];
      for (const it of items) {
        const target = pathOf(typeof it.item === 'string' ? it.item : it.item?.['@id'] || '');
        if (target && byPath.has(target) && isNoindex(pages.get(target)))
          err('breadcrumb-to-noindex', p.url, `Breadcrumb-Schema zeigt auf die noindex-Seite ${target}. Das Ranking-Signal verpufft.`);
        if (target && !byPath.has(target) && target !== '/')
          warn('breadcrumb-dead', p.url, `Breadcrumb-Schema zeigt auf ${target}, existiert nicht im Build.`);
      }
    }

    if (/^Vehicle$/.test(type)) {
      const keys = Object.keys(n);
      if (!keys.some((k) => /model|brand|vehicleSeatingCapacity|manufacturer/i.test(k)))
        warn('vehicle-thin', p.url, 'Vehicle-Schema ohne konkrete Fahrzeugdaten. Schema-Reichweite > Content-Reichweite.');
    }

    if (/FAQPage/.test(type)) {
      const qs = (n.mainEntity || []).length;
      const visible = readFileSync(p.file, 'utf8');
      const shown = (n.mainEntity || []).filter((q) => q.name && visible.includes(q.name.slice(0, 25))).length;
      if (qs && shown < qs)
        err('faq-not-visible', p.url, `${qs - shown} von ${qs} FAQ-Fragen stehen nur im Schema, nicht im sichtbaren Text. Das ist ein Rich-Result-Verstoss.`);
    }
  }
}

if (businessFull > 1)
  err('business-duplicate', '(global)', `LocalBusiness/Organization ist ${businessFull}x voll definiert (@id: ${[...businessIds].join(', ')}). Genau einmal voll, sonst nur per @id referenzieren.`);
if (businessFull === 0)
  warn('business-missing', '(global)', 'Nirgends ein voll definiertes LocalBusiness/Organization gefunden.');

// ─────────────────────────────────────────────────────────── 5. Interne Linkstruktur

const graph = new Map(); // url -> Set(url)
const inbound = new Map();
const GENERIC = /^(hier|hier klicken|klick|mehr|mehr erfahren|weiterlesen|read more|link|click here|more|details|weiter)$/i;

for (const p of pages.values()) {
  const targets = new Set();
  const seenTarget = new Map();
  for (const a of p.hrefs) {
    const t = toInternalPath(a.href, siteOrigin);
    if (!t) continue;
    if (!byPath.has(t)) {
      err('link-dead', p.url, `Interner Link auf ${t} — existiert im Build nicht (404).`);
      continue;
    }
    if (isNoindex(pages.get(t)) && !/nofollow/i.test(a.rel))
      info('link-to-noindex', p.url, `Link auf die noindex-Seite ${t}.`);
    if (GENERIC.test(a.text))
      warn('anchor-generic', p.url, `Ankertext "${a.text}" auf ${t} beschreibt das Ziel nicht.`);
    if (!a.text) warn('anchor-empty', p.url, `Link auf ${t} ohne Ankertext (nur Bild/Icon?).`);
    targets.add(t);
    seenTarget.set(t, (seenTarget.get(t) || 0) + 1);
    inbound.set(t, (inbound.get(t) || 0) + 1);
  }
  graph.set(p.url, targets);
}

const home = byPath.has('/') ? '/' : [...pages.keys()][0];
const depth = new Map([[home, 0]]);
const queue = [home];
while (queue.length) {
  const cur = queue.shift();
  for (const nx of graph.get(cur) || []) {
    if (!depth.has(nx)) { depth.set(nx, depth.get(cur) + 1); queue.push(nx); }
  }
}

for (const p of indexable) {
  if (p.url === home) continue;
  if (!inbound.get(p.url)) err('orphan', p.url, 'Waisenseite: kein einziger interner Link zeigt hierher.');
  const d = depth.get(p.url);
  if (d === undefined) err('unreachable', p.url, 'Von der Startseite aus ueber interne Links nicht erreichbar.');
  else if (d > 3) warn('depth', p.url, `Klicktiefe ${d} (Richtwert: max. 3).`);
}

// ─────────────────────────────────────────────────────────── 6. Sitemap & robots

const sitemapFiles = walk(DIST).filter((f) => /sitemap.*\.xml$/i.test(f));
const inSitemap = new Set();
if (!sitemapFiles.length) {
  err('sitemap-missing', '(global)', 'Keine sitemap*.xml im Build.');
} else {
  for (const f of sitemapFiles) {
    const xml = readFileSync(f, 'utf8');
    for (const m of xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) {
      const t = pathOf(m[1]);
      if (t) inSitemap.add(t);
    }
  }
  // Sitemap-Index-Eintraege (zeigen auf andere .xml) rausfiltern
  for (const p of indexable) {
    if (!inSitemap.has(p.url)) err('sitemap-gap', p.url, 'Indexierbare Seite fehlt in der Sitemap.');
  }
  for (const u of inSitemap) {
    if (/\.xml$/i.test(u)) continue;
    if (!byPath.has(u)) { err('sitemap-dead', '(sitemap)', `Sitemap listet ${u} — existiert im Build nicht.`); continue; }
    if (isNoindex(pages.get(u))) err('sitemap-noindex', '(sitemap)', `Sitemap listet die noindex-Seite ${u}. Widerspruechliches Signal.`);
  }
}

/**
 * robots.txt nach Googles Regeln auswerten:
 * laengstes passendes Pattern gewinnt, bei Gleichstand gewinnt Allow.
 * Wildcards: * (beliebig) und $ (Zeilenende).
 */
function parseRobots(text) {
  const groups = [];
  const sitemaps = [];
  const unsupported = [];
  let cur = null;

  text.split(/\r?\n/).forEach((raw, i) => {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) return;
    const c = line.indexOf(':');
    if (c < 0) return;
    const field = line.slice(0, c).trim().toLowerCase();
    const value = line.slice(c + 1).trim();

    if (field === 'user-agent') {
      // Aufeinanderfolgende User-agent-Zeilen bilden EINE Gruppe
      if (!cur || cur.rules.length) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(value.toLowerCase());
    } else if (field === 'allow' || field === 'disallow') {
      if (cur) cur.rules.push({ type: field, path: value, line: i + 1 });
    } else if (field === 'sitemap') {
      sitemaps.push({ value, line: i + 1 });
    } else if (['noindex', 'nofollow', 'crawl-delay', 'host'].includes(field)) {
      unsupported.push({ field, value, line: i + 1 });
    }
  });

  return { groups, sitemaps, unsupported };
}

function ruleMatches(pattern, path) {
  if (pattern === '') return false; // leeres Disallow bedeutet "alles erlaubt"
  let p = pattern;
  const anchored = p.endsWith('$');
  if (anchored) p = p.slice(0, -1);
  const rx =
    '^' +
    p.split('*').map((s) => s.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('.*') +
    (anchored ? '$' : '');
  try { return new RegExp(rx).test(path); } catch { return false; }
}

/** Gibt die greifende Disallow-Regel zurueck, oder null wenn erlaubt. */
function blockedBy(rules, path) {
  let best = null;
  for (const r of rules) {
    if (!ruleMatches(r.path, path)) continue;
    const len = r.path.replace(/\$$/, '').length;
    // laenger schlaegt kuerzer; bei gleicher Laenge schlaegt Allow das Disallow
    if (!best || len > best.len || (len === best.len && r.type === 'allow')) {
      best = { len, type: r.type, path: r.path, line: r.line };
    }
  }
  return best && best.type === 'disallow' ? best : null;
}

const robotsPath = join(DIST, 'robots.txt');
if (!existsSync(robotsPath)) {
  err('robots-missing', '(global)', 'Keine robots.txt im Build. Google crawlt zwar trotzdem, aber die Sitemap wird nicht angekuendigt.');
} else {
  const raw = readFileSync(robotsPath, 'utf8');
  const { groups, sitemaps, unsupported } = parseRobots(raw);

  if (!groups.length)
    warn('robots-empty', '(robots.txt)', 'Keine einzige User-agent-Gruppe. Die Datei ist wirkungslos.');

  // Regeln fuer den Standard-Crawler (User-agent: *)
  const starGroups = groups.filter((g) => g.agents.includes('*'));
  const rules = starGroups.flatMap((g) => g.rules);

  if (starGroups.length > 1)
    warn('robots-split-group', '(robots.txt)', `"User-agent: *" ist ${starGroups.length}x definiert. Google wertet nur die zusammengefassten Regeln, andere Crawler oft nur die erste — zusammenlegen.`);
  if (!starGroups.length && groups.length)
    warn('robots-no-star', '(robots.txt)', 'Keine Gruppe fuer "User-agent: *". Alle nicht namentlich genannten Crawler haben damit keinerlei Regeln.');

  if (rules.some((r) => r.type === 'disallow' && (r.path === '/' || r.path === '/*')))
    err('robots-disallow-all', '(robots.txt)', 'Disallow: / fuer alle Crawler — die komplette Site ist gesperrt. Klassischer Ueberbleibsel vom Staging-Server.');

  // ── Der eigentliche Punkt: sperrt robots.txt Seiten, die live sollen?
  for (const p of indexable) {
    const hit = blockedBy(rules, p.url);
    if (hit)
      err('robots-blocks-indexable', p.url, `Indexierbare Seite durch "Disallow: ${hit.path}" (robots.txt Zeile ${hit.line}) gesperrt. Google darf sie nie crawlen — Canonical, Schema und interne Links laufen ins Leere.`);
  }

  for (const u of inSitemap) {
    if (/\.xml$/i.test(u) || !byPath.has(u)) continue;
    const hit = blockedBy(rules, u);
    if (hit)
      err('robots-blocks-sitemap-url', '(sitemap)', `${u} steht in der Sitemap, ist aber durch "Disallow: ${hit.path}" gesperrt. Direkter Widerspruch, erzeugt Fehler in der Search Console.`);
  }

  // noindex + Disallow ist die haeufigste stille Fehlkonfiguration
  for (const p of pages.values()) {
    if (!isNoindex(p)) continue;
    const hit = blockedBy(rules, p.url);
    if (hit)
      err('robots-blocks-noindex', p.url, `Seite ist noindex UND durch "Disallow: ${hit.path}" gesperrt. Google kann das noindex nie lesen und indexiert die URL trotzdem (ohne Snippet). Eins von beidem entfernen — bei noindex gehoert das Disallow weg.`);
  }

  // ── Sitemap-Verweis
  if (!sitemaps.length) {
    warn('robots-no-sitemap', '(robots.txt)', 'Kein "Sitemap:"-Eintrag. Der ist der einzige Weg, die Sitemap ohne Search Console anzukuendigen.');
  } else {
    for (const s of sitemaps) {
      if (!/^https?:\/\//i.test(s.value)) {
        err('robots-sitemap-relative', '(robots.txt)', `"Sitemap: ${s.value}" (Zeile ${s.line}) ist relativ. Der Eintrag muss eine absolute URL sein, sonst wird er ignoriert.`);
        continue;
      }
      const sPath = (() => { try { return new URL(s.value).pathname; } catch { return null; } })();
      if (sPath && !existsSync(join(DIST, sPath.replace(/^\//, '')))) {
        err('robots-sitemap-dead', '(robots.txt)', `"Sitemap: ${s.value}" zeigt auf ${sPath}, existiert im Build aber nicht.`);
      }
      if (siteOrigin && !s.value.startsWith(siteOrigin))
        warn('robots-sitemap-origin', '(robots.txt)', `"Sitemap: ${s.value}" nutzt eine andere Domain als die Canonicals (${siteOrigin}). Oft ein vergessener Staging-Host.`);
    }
    const known = new Set(sitemapFiles.map((f) => '/' + relative(DIST, f).split(sep).join('/')));
    const referenced = new Set(sitemaps.map((s) => { try { return new URL(s.value).pathname; } catch { return null; } }).filter(Boolean));
    for (const k of known) {
      if (!referenced.has(k) && !/sitemap-\d/.test(k)) // Teil-Sitemaps eines Index nicht bemaengeln
        info('robots-sitemap-unlisted', '(robots.txt)', `${k} liegt im Build, wird in der robots.txt aber nicht genannt.`);
    }
  }

  // ── Direktiven, die in einer robots.txt nichts bewirken
  for (const u of unsupported) {
    if (u.field === 'noindex')
      err('robots-noindex-directive', '(robots.txt)', `"noindex: ${u.value}" (Zeile ${u.line}) — Google unterstuetzt das seit September 2019 nicht mehr. Wirkungslos. noindex gehoert als <meta name="robots"> in die Seite.`);
    else if (u.field === 'crawl-delay')
      info('robots-crawl-delay', '(robots.txt)', `"crawl-delay" (Zeile ${u.line}) wird von Google ignoriert (Bing wertet es aus).`);
    else if (u.field === 'host')
      info('robots-host', '(robots.txt)', `"host" (Zeile ${u.line}) wird von Google ignoriert.`);
  }

  // ── Sperrt die robots.txt Assets, die zum Rendern gebraucht werden?
  for (const asset of ['/_astro/', '/assets/', '/images/', '/fonts/']) {
    const hit = blockedBy(rules, asset);
    if (hit)
      err('robots-blocks-assets', '(robots.txt)', `"Disallow: ${hit.path}" sperrt ${asset}. Google kann die Seite dann nicht rendern und bewertet Layout und Core Web Vitals falsch.`);
  }
}

// ─────────────────────────────────────────────────────────── 7. Bilder / Performance

for (const p of pages.values()) {
  let noAlt = 0, emptyAlt = 0, noDims = 0, eager = 0, unoptimized = 0;
  for (const img of p.rawImgs) {
    if (img.alt === undefined) noAlt++;
    else if (img.alt === '') emptyAlt++;
    if (!img.width || !img.height) noDims++;
    if (!img.loading || img.loading === 'eager') eager++;
    // astro:assets liefert gehashte /_astro/-Pfade bzw. srcset. Fehlt beides,
    // ist das Bild unoptimiert (kein WebP/AVIF, keine responsive Groessen).
    if (!img.srcset && img.src && !/^\/_astro\//.test(img.src) && /\.(jpe?g|png)$/i.test(img.src)) unoptimized++;
  }
  if (noAlt) warn('img-alt', p.url, `${noAlt} <img> ohne alt-Attribut.`);
  if (emptyAlt) info('img-alt-empty', p.url, `${emptyAlt} <img> mit leerem alt (alt=""). Korrekt fuer reine Deko — bei Inhalts-/Hero-Bildern verschenkter Bilder-SEO.`);
  if (unoptimized) warn('img-unoptimized', p.url, `${unoptimized} Bilder als rohes JPG/PNG ohne srcset. Kein WebP/AVIF, keine responsive Groessen — laeuft nicht ueber astro:assets.`);
  if (noDims) warn('img-dims', p.url, `${noDims} <img> ohne width/height. Verursacht Layout-Shift (CLS).`);
  if (eager > 1) warn('img-eager', p.url, `${eager} Bilder ohne loading="lazy". Nur das Hero-Bild sollte eager laden.`);
  const hero = p.rawImgs.find((i) => i.fetchpriority === 'high');
  if (p.rawImgs.length > 2 && !hero) info('img-no-hero', p.url, 'Kein Bild mit fetchpriority="high" (LCP-Kandidat).');
}

// ─────────────────────────────────────────────────────────── Ausgabe

if (AS_JSON) {
  console.log(JSON.stringify({ pages: pages.size, indexable: indexable.length, siteOrigin, findings }, null, 2));
  process.exit(0);
}

const byLevel = { error: [], warning: [], info: [] };
for (const f of findings) byLevel[f.level].push(f);

const LABEL = { error: 'FEHLER', warning: 'WARNUNG', info: 'HINWEIS' };

console.log(`\nseo-audit — ${pages.size} Seiten im Build, davon ${indexable.length} indexierbar`);
console.log(`Origin: ${siteOrigin || '(nicht ermittelbar — fehlt das Canonical?)'}\n`);

for (const level of ['error', 'warning', 'info']) {
  const list = byLevel[level];
  if (!list.length) continue;
  console.log(`\n${'─'.repeat(70)}\n${LABEL[level]} (${list.length})\n${'─'.repeat(70)}`);
  const grouped = new Map();
  for (const f of list) grouped.set(f.id, [...(grouped.get(f.id) || []), f]);
  for (const [id, items] of [...grouped].sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  [${id}] — ${items.length}x`);
    for (const it of items.slice(0, 15)) console.log(`    ${it.page}\n      ${it.msg}`);
    if (items.length > 15) console.log(`    … und ${items.length - 15} weitere`);
  }
}

console.log(
  `\n${'═'.repeat(70)}\n` +
  `Ergebnis: ${byLevel.error.length} Fehler, ${byLevel.warning.length} Warnungen, ${byLevel.info.length} Hinweise\n`
);

process.exit(byLevel.error.length ? 1 : 0);
