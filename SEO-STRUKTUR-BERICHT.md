# SEO-Struktur-Bericht — Vienna Grand Chauffeurs

Analyse-Stand: 2026-08-03 · Branch `main` · reiner Lesezugriff, keine Änderungen am Projekt.

---

## 1. Technischer Überblick

### Framework

**Astro 7** (statischer Site-Generator, kein CMS, keine Datenbank).

```json
// package.json
"dependencies": {
  "@astrojs/sitemap": "^3.7.3",
  "astro": "^7.0.6",
  "@tailwindcss/vite": "^4.3.2",
  "tailwindcss": "^4.3.2",
  "gsap": "^3.15.0",
  "lenis": "^1.3.25"
}
```

```js
// astro.config.mjs
export default defineConfig({
  site: 'https://vienna-grand-chauffeurs.pages.dev',   // Domain noch Platzhalter
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
  experimental: { clientPrerender: true },
});
```

> ✅ **Behoben am 10.08.2026 (Commit `d960668`):** `site` zeigt inzwischen auf `https://viennagrandchauffeurs.at`. Der oben zitierte Platzhalter ist damit historisch; Canonical, hreflang, og:url, Schema und Sitemap ziehen aus `Astro.site` korrekt nach.

Kein Output-Adapter → **vollständig statischer Build** (`astro build` → `dist/`). Deployment offensichtlich Cloudflare Pages (`functions/api/`, Turnstile, `.pages.dev`).

### Wie Seiten erzeugt werden

Es gibt **kein** Markdown, **kein** MDX, **keine** Content Collections, **kein** CMS.
Der gesamte Content liegt als **TypeScript-Objektliteral** in drei Dateien unter `src/lib/` bzw. als `pick(lang, {…DE}, {…EN})`-Objekt direkt im Frontmatter der jeweiligen Seiten-Komponente.

Drei Content-Muster im Projekt:

| Muster | Wo | Betrifft |
|---|---|---|
| **A — zentrale Datendatei** (ideal) | `src/lib/services-data.ts`, `src/lib/vehicles-data.ts` | Leistungsseiten, Fahrzeugseiten |
| **B — `L`-Objekt im Komponenten-Frontmatter** | `src/components/HomePage.astro`, `PricesPage.astro`, `FleetIndexPage.astro`, `ContactPage.astro`, `BookingPage.astro`, `BookingDonePage.astro` | Startseite, Preise, Fahrzeug-Übersicht, Kontakt, Buchung |
| **C — hartkodiert in Template/Wörterbuch** | `src/lib/i18n.ts` (`UI`), Komponenten-interne Konstanten | Nav, Footer, CTA-Band, Werte-Strip, Kabinen-Features, Chips |

### Verzeichnisstruktur

```
src/
├── pages/          Routing (Astro File-Based-Routing). Fast alle Dateien sind
│                   4-Zeilen-Wrapper, die eine Komponente aus /components rendern.
│   └── en/         Spiegelbild der DE-Routen — SELBE Ordner-/Dateinamen auf Deutsch.
├── components/     Die eigentlichen Seiten-Komponenten (HomePage, ServicePage,
│                   VehiclePage, PricesPage …) plus geteilte Blöcke (Nav, Footer,
│                   Faq, CtaBand, FleetShowcase, ServicesCarousel, PageHero).
├── layouts/        Layout.astro (<head>, Meta, Canonical, GTM, Preloader),
│                   LegalLayout.astro (Rechtsseiten-Wrapper).
├── lib/            i18n.ts (Sprachlogik + Chrome-Wörterbuch),
│                   site.ts (Kontakt, Nav-Struktur, Slug-Listen),
│                   services-data.ts (8 Leistungen × DE + EN),
│                   vehicles-data.ts (8 Fahrzeuge × DE + EN).
└── styles/         global.css
public/images/      Alle Bilder (statisch, unoptimiert ausgeliefert).
functions/api/      Cloudflare-Functions für Formular-Versand.
scripts/            Einmalige Node-Skripte zur Bild-Generierung (nicht im Build).
```

### Zweisprachigkeit (DE/EN)

DE liegt im Root, EN unter `/en/`. Die Sprache wird **aus der URL abgeleitet**, es gibt keine i18n-Integration und keine Astro-`i18n`-Config.

```ts
// src/lib/i18n.ts
export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'de';
}

export function hrefFor(path: string, lang: Lang): string {
  if (lang === 'de') return path;
  if (path === '/') return '/en/';
  return '/en' + path;                       // '/preise' → '/en/preise'
}

export function pick<T>(lang: Lang, de: T, en: T): T {
  return lang === 'en' ? en : de;
}
```

**Wo der englische Content herkommt — drei Quellen:**

1. **Leistungen/Fahrzeuge:** zwei parallele Arrays in derselben Datei.
   ```ts
   // src/lib/services-data.ts
   export const SERVICES_DATA: Service[] = [ … ];      // Zeilen 48–529 (DE)
   export const SERVICES_DATA_EN: Service[] = [ … ];   // Zeilen 531–1013 (EN)
   export const getServices = (lang: Lang): Service[] =>
     (lang === 'en' ? SERVICES_DATA_EN : SERVICES_DATA);
   ```
   Analog `VEHICLES_DATA` / `VEHICLES_DATA_EN` / `getVehicles(lang)` in `src/lib/vehicles-data.ts`.

2. **Alle übrigen Seiten:** ein `pick()`-Aufruf mit zwei Objektliteralen im Frontmatter.
   ```astro
   // src/components/PricesPage.astro (gekürzt)
   const L = pick(lang,
     { title: 'Preise — Vienna Grand Chauffeurs', eyebrow: 'Preise', … },
     { title: 'Rates — Vienna Grand Chauffeurs',  eyebrow: 'Rates',  … });
   ```

3. **Geteilte Chrome-Texte** (Nav, Footer, CTA-Überschrift, FAQ-Eyebrow): Wörterbuch `UI` in `src/lib/i18n.ts`, abgerufen über `t(lang)`.

**Wichtig:** Die **Slugs sind sprachübergreifend identisch und deutsch**. `SERVICES_DATA_EN[0].slug === 'flughafen-transfer-wien'`. Die EN-Routen liegen unter `src/pages/en/leistungen/[slug].astro` und `src/pages/en/fahrzeuge/[slug].astro` — also mit deutschen Pfadsegmenten.

Der Sprachumschalter in `src/components/Nav.astro` verlässt sich genau darauf:

```ts
// src/lib/i18n.ts
export function altLang(url: URL) {
  const cur = getLang(url);
  if (cur === 'en') {
    const de = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';   // nur '/en' abschneiden
    return { lang: 'de', label: 'DE', href: de };
  }
  return { lang: 'en', label: 'EN', href: hrefFor(url.pathname || '/', 'en') };
}
```

---

## 2. Seiten-Inventar

Alle 50 gebauten Routen (verifiziert gegen `dist/`). Astro erzeugt Ordner + `index.html`, es werden also **überall Trailing Slashes** ausgeliefert (`/preise/`).

| URL / Route | Quelldatei (Pfad) | Sprache | Seitentyp |
|---|---|---|---|
| `/` | `src/pages/index.astro` → `src/components/HomePage.astro` | DE | Startseite |
| `/leistungen/flughafen-transfer-wien/` | `src/pages/leistungen/[slug].astro` + `src/lib/services-data.ts` | DE | Leistungsseite |
| `/leistungen/chauffeurservice/` | dito | DE | Leistungsseite |
| `/leistungen/chauffeur-pro-stunde/` | dito | DE | Leistungsseite |
| `/leistungen/limousinen-service-wien/` | dito | DE | Leistungsseite |
| `/leistungen/fahrdienst-diplomaten/` | dito | DE | Leistungsseite |
| `/leistungen/privatchauffeur-wien/` | dito | DE | Leistungsseite |
| `/leistungen/shuttle-service-wien/` | dito | DE | Leistungsseite |
| `/leistungen/langstreckenfahrten/` | dito | DE | Leistungsseite |
| `/fahrzeuge/` | `src/pages/fahrzeuge/index.astro` → `FleetIndexPage.astro` | DE | Fahrzeug-Übersicht |
| `/fahrzeuge/e-klasse/` | `src/pages/fahrzeuge/[slug].astro` + `src/lib/vehicles-data.ts` | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/s-klasse/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/maybach/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/mercedes-eqe/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/vito/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/v-klasse/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/vip-minibus/` | dito | DE | Fahrzeug-Modellseite |
| `/fahrzeuge/business-sprinter/` | dito | DE | Fahrzeug-Modellseite |
| `/preise/` | `src/pages/preise.astro` → `PricesPage.astro` | DE | Preise |
| `/online-buchung/` | `src/pages/online-buchung.astro` → `BookingPage.astro` | DE | Buchung |
| `/buchung-abschluss/` | `src/pages/buchung-abschluss.astro` → `BookingDonePage.astro` | DE | Buchungs-Danke |
| `/kontakt/` | `src/pages/kontakt.astro` → `ContactPage.astro` | DE | Kontakt |
| `/impressum/` | `src/pages/impressum.astro` → `LegalLayout.astro` | DE | Rechtstext |
| `/datenschutz/` | `src/pages/datenschutz.astro` | DE | Rechtstext |
| `/agb/` | `src/pages/agb.astro` | DE | Rechtstext |
| `/en/` | `src/pages/en/index.astro` → `HomePage.astro` | EN | Startseite |
| `/en/leistungen/flughafen-transfer-wien/` | `src/pages/en/leistungen/[slug].astro` | EN | Leistungsseite |
| `/en/leistungen/chauffeurservice/` | dito | EN | Leistungsseite |
| `/en/leistungen/chauffeur-pro-stunde/` | dito | EN | Leistungsseite |
| `/en/leistungen/limousinen-service-wien/` | dito | EN | Leistungsseite |
| `/en/leistungen/fahrdienst-diplomaten/` | dito | EN | Leistungsseite |
| `/en/leistungen/privatchauffeur-wien/` | dito | EN | Leistungsseite |
| `/en/leistungen/shuttle-service-wien/` | dito | EN | Leistungsseite |
| `/en/leistungen/langstreckenfahrten/` | dito | EN | Leistungsseite |
| `/en/fahrzeuge/` | `src/pages/en/fahrzeuge/index.astro` | EN | Fahrzeug-Übersicht |
| `/en/fahrzeuge/e-klasse/` … `/business-sprinter/` (8 Stück) | `src/pages/en/fahrzeuge/[slug].astro` | EN | Fahrzeug-Modellseite |
| `/en/preise/` | `src/pages/en/preise.astro` | EN | Preise |
| `/en/online-buchung/` | `src/pages/en/online-buchung.astro` | EN | Buchung |
| `/en/buchung-abschluss/` | `src/pages/en/buchung-abschluss.astro` | EN | Buchungs-Danke |
| `/en/kontakt/` | `src/pages/en/kontakt.astro` | EN | Kontakt |
| `/en/impressum/`, `/en/datenschutz/`, `/en/agb/` | `src/pages/en/*.astro` | EN | Rechtstexte |

### Abgleich mit den Ziel-URLs

#### DE — 15 von 20 stimmen, 5 Slugs weichen ab

| Ziel-URL | Status | Tatsächlicher Slug im Projekt |
|---|---|---|
| `/` | ✅ existiert | — |
| `/leistungen/flughafen-transfer-wien/` | ✅ existiert | — |
| `/leistungen/limousinenservice/` | ⚠️ **abweichend** | `/leistungen/limousinen-service-wien/` |
| `/leistungen/chauffeur-pro-stunde/` | ✅ existiert | — |
| `/leistungen/langstreckenfahrten/` | ✅ existiert | — |
| `/leistungen/privatchauffeur/` | ⚠️ **abweichend** | `/leistungen/privatchauffeur-wien/` |
| `/leistungen/shuttle-service/` | ⚠️ **abweichend** | `/leistungen/shuttle-service-wien/` |
| `/leistungen/fahrdienst-diplomaten/` | ✅ existiert | — |
| `/preise/` | ✅ existiert | — |
| `/online-buchung/` | ✅ existiert | — |
| `/kontakt/` | ✅ existiert | — |
| `/fahrzeuge/` | ✅ existiert | — |
| `/fahrzeuge/s-klasse/` | ✅ existiert | — |
| `/fahrzeuge/e-klasse/` | ✅ existiert | — |
| `/fahrzeuge/maybach/` | ✅ existiert | — |
| `/fahrzeuge/eqe/` | ⚠️ **abweichend** | `/fahrzeuge/mercedes-eqe/` |
| `/fahrzeuge/v-klasse/` | ✅ existiert | — |
| `/fahrzeuge/vito/` | ✅ existiert | — |
| `/fahrzeuge/vip-minibus/` | ✅ existiert | — |
| `/fahrzeuge/business-sprinter/` | ✅ existiert | — |

Zusätzlich vorhanden und in der Ziel-Liste nicht enthalten (= die Canonical-Seite): **`/leistungen/chauffeurservice/`** ✅ existiert bereits.

#### EN — 1 von 20 stimmt, 19 weichen ab

Die EN-Routen verwenden durchgehend die **deutschen** Pfadsegmente. Keine der geplanten englischen URLs existiert.

| Ziel-URL | Status | Tatsächliche URL im Projekt |
|---|---|---|
| `/en/` | ✅ existiert | — |
| `/en/services/airport-transfer-vienna/` | ❌ | `/en/leistungen/flughafen-transfer-wien/` |
| `/en/services/limousine-service-vienna/` | ❌ | `/en/leistungen/limousinen-service-wien/` |
| `/en/services/private-chauffeur-vienna/` | ❌ | `/en/leistungen/privatchauffeur-wien/` |
| `/en/services/chauffeur-by-the-hour-vienna/` | ❌ | `/en/leistungen/chauffeur-pro-stunde/` |
| `/en/services/day-trips-from-vienna/` | ❌ | `/en/leistungen/langstreckenfahrten/` |
| `/en/services/shuttle-service-vienna/` | ❌ | `/en/leistungen/shuttle-service-wien/` |
| `/en/services/diplomatic-chauffeur-vienna/` | ❌ | `/en/leistungen/fahrdienst-diplomaten/` |
| `/en/services/chauffeur-service-vienna/` (Canonical-Seite) | ❌ | `/en/leistungen/chauffeurservice/` |
| `/en/prices/` | ❌ | `/en/preise/` |
| `/en/online-booking/` | ❌ | `/en/online-buchung/` |
| `/en/contact/` | ❌ | `/en/kontakt/` |
| `/en/vehicles/` | ❌ | `/en/fahrzeuge/` |
| `/en/vehicles/s-class/` | ❌ | `/en/fahrzeuge/s-klasse/` |
| `/en/vehicles/e-class/` | ❌ | `/en/fahrzeuge/e-klasse/` |
| `/en/vehicles/maybach/` | ❌ | `/en/fahrzeuge/maybach/` |
| `/en/vehicles/eqe/` | ❌ | `/en/fahrzeuge/mercedes-eqe/` |
| `/en/vehicles/v-class/` | ❌ | `/en/fahrzeuge/v-klasse/` |
| `/en/vehicles/vito/` | ❌ | `/en/fahrzeuge/vito/` |
| `/en/vehicles/vip-minibus/` | ❌ | `/en/fahrzeuge/vip-minibus/` |
| `/en/vehicles/business-sprinter/` | ❌ | `/en/fahrzeuge/business-sprinter/` |

**Konsequenz:** Die Ziel-EN-URLs sind mit der heutigen Architektur nicht erreichbar. Slug wird aktuell als *einziger* Schlüssel für beide Sprachen benutzt (`getStaticPaths` + `hrefFor` + `altLang`). Ein Umbau auf lokalisierte Slugs betrifft mindestens: `src/lib/i18n.ts` (`hrefFor`, `altLang`), `src/lib/site.ts` (`getNav`), die vier `[slug].astro`-Routen, `ServicesCarousel.astro`, `FleetShowcase.astro`, `VehiclePage.astro` (Flotten-Karussell), `PricesPage.astro`, `FleetIndexPage.astro`, `Footer.astro`, `Nav.astro`. Details in Abschnitt 6.

**Es gibt keine `/leistungen/`-Übersichtsseite.** Die Nav verlinkt „Leistungen" auf die erste Leistungsseite, der Footer auf den Anker `/#leistungen`.

---

## 3. Block-Anatomie pro Seitentyp

### 3.1 Leistungsseite

Beispieldatei: `src/components/ServicePage.astro`, Datenquelle `src/lib/services-data.ts` (Beispieleintrag `flughafen-transfer-wien`, Zeilen 49–108).

Das Datenschema definiert **exakt**, welche Textfelder existieren:

```ts
// src/lib/services-data.ts, Zeilen 12–36
export interface Service {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroImg: string;
  hero: { title: string; sub: string };
  heroFeatures: { icon: string; label: string }[];
  marquee: string[];
  intro: {
    eyebrow: string;
    title: string;
    body: string;
    cards: [ServiceCard, ServiceCard];        // ServiceCard = { icon, title, text }
    image: { src: string; alt: string };
  };
  benefit: {
    title: string;
    body: string;
    items: string[];
    image: { src: string; alt: string };
    badge: { big: string; sm: string };
  };
  seo: { eyebrow: string; title: string; paragraphs: string[] };
  faq: { q: string; a: string }[];
}
```

#### Block-Reihenfolge von oben nach unten

| # | Raster | Komponente / CSS-Klasse | Textfelder | Befüllung |
|---|---|---|---|---|
| 1 | **Block 01 Hero** | `<section class="shero">` | Breadcrumb, H1, Fließtext, 4 Feature-Labels, 2 Buttons | H1 `service.hero.title`, Text `service.hero.sub`; Breadcrumb-Label **hartkodiert** (`L.services`), Breadcrumb-Endglied = `service.hero.title`; Features `service.heroFeatures[].label`; Buttons hartkodiert |
| — | *(nicht im Raster)* | `<div class="marquee">` | 5 Laufband-Begriffe | `service.marquee[]` (String-Array) |
| 2 | **Block 02 Intro** | `<section class="sintro">` | Eyebrow, H2, Fließtext, **2 Karten (H3 + Text)**, Bild + Alt | `service.intro.eyebrow`, `.title`, `.body`, `.cards[].title/.text`, `.image.src/.alt` |
| — | *(nicht im Raster)* | `<section class="vals">` Werte-Strip | 4× Label + Sub | **hartkodiert** in `ServicePage.astro`, Zeilen 25–37 |
| 3 | **Block 03 fix** | `<FleetShowcase />` | — | Eigene Datenliste in `FleetShowcase.astro` |
| 4 | **Block 04 fix** | `<ServicesCarousel />` | — | Liest `getServices(lang)` |
| 5 | **Block 05 Vorteil** | `<section class="sben">` | Badge groß, Badge klein, Eyebrow, H2, Text, 4 Bullets, Bild + Alt | `service.benefit.badge.big/.sm`, `.title`, `.body`, `.items[]`, `.image.src/.alt`. **Eyebrow ist hartkodiert** (`L.yourAdvantage` = „Ihr Vorteil"/„Your advantage") |
| 6 | **Block 06 Content** | `<section class="sseo">` | Eyebrow, H2, langer Fließtext | `service.seo.eyebrow`, `.title`, `.paragraphs[]` |
| 7 | **Block 07 FAQ** | `<Faq faqs={service.faq} />` | H2 + n × (Frage, Antwort) | `service.faq[].q/.a`; **H2 hat einen Default** („Häufige Fragen zum Transfer.") und wird von `ServicePage` nicht überschrieben. **Kein FAQ-Schema.** |
| 8 | **Block 08 CTA** | `<CtaBand />` | H2, Button, Telefonnummer | **global** aus `src/lib/i18n.ts` → `UI[lang].cta.heading` — **nicht pro Seite setzbar** |
| — | | `<Footer />` | | `UI[lang].footer` |

#### Code-Ausschnitt (Block 05 + 06 + 07 + 08)

```astro
<!-- src/components/ServicePage.astro, Zeilen 140–188 (gekürzt) -->
<section class="sben" aria-labelledby="sben-title">
  <img src={service.benefit.image.src} alt={service.benefit.image.alt} … />
  <span class="sben__badge-big">{service.benefit.badge.big}</span>
  <span class="sben__badge-sm">{service.benefit.badge.sm}</span>
  <div class="sben__eyebrow"><span class="sben__line"/><span>{L.yourAdvantage}</span></div>
  <h2 class="sben__title" id="sben-title">{service.benefit.title}</h2>
  <p class="sben__body">{service.benefit.body}</p>
  <ul class="sben__list">
    {service.benefit.items.map((it) => <li class="sben__item"><span>{it}</span></li>)}
  </ul>
</section>

<section class="sseo" aria-labelledby="sseo-title">
  <div class="sseo__eyebrow"><span class="sseo__line"/><span>{service.seo.eyebrow}</span></div>
  <h2 class="sseo__title" id="sseo-title">{service.seo.title}</h2>
  <div class="sseo__cols">
    <div class="sseo__col">{seoLeft.map((p) => <p>{p}</p>)}</div>
    <div class="sseo__col">{seoRight.map((p) => <p>{p}</p>)}</div>
  </div>
</section>

<Faq faqs={service.faq} />
<CtaBand />
```

Wichtig für die Textlieferung: die SEO-Absätze werden **automatisch in zwei Spalten aufgeteilt**:

```astro
<!-- src/components/ServicePage.astro, Zeilen 39–43 -->
const seoParas = service.seo.paragraphs;
const seoHalf  = Math.ceil(seoParas.length / 2);
const seoLeft  = seoParas.slice(0, seoHalf);
const seoRight = seoParas.slice(seoHalf);
```

→ **gerade Absatzanzahl (idealerweise 6)** liefern, sonst ist die rechte Spalte kürzer.

---

### 3.2 Startseite

Beispieldatei: `src/components/HomePage.astro`. Der Content liegt **nicht** in `src/lib/`, sondern im `L`-Objekt im Frontmatter (Zeilen 26–130).

| # | Raster | Sektion / CSS-Klasse | Textfelder | Feldname im `L`-Objekt |
|---|---|---|---|---|
| 1 | **Hero** | `.hero` | H1 (HTML erlaubt), Subtext (HTML erlaubt), 2 Buttons, Scroll-Link | `L.heroTitle`, `L.heroSub` (beide via `set:html`), `L.book`, `L.discover` |
| — | *(nicht im Raster)* | `.hbook` Schnellbuchungs-Leiste | ~25 Formular-Labels/Placeholder | `L.hbook*`, `L.cal*` |
| — | *(nicht im Raster)* | `.about` Über uns | Eyebrow, H2, Fließtext, 3 Karten (Label + Text) | `L.aboutEyebrow`, `L.aboutTitle`, `L.aboutBody`, `L.features[]` |
| 2 | **fixe Elemente** | `<FleetShowcase />`, `<ServicesCarousel />` | — | eigene Daten |
| 3 | **Block 05** | `.benefits` | Eyebrow, H2 (HTML), Intro-Text, 4 Items (H3 + Text), Button | `L.benefitsEyebrow`, `L.benefitsTitle`, `L.benefitsIntro`, `L.benefits[]`, `L.benefitsCta` |
| 4 | **Block 06 Content** | `.htext` | Eyebrow, H2, langer Fließtext | Eyebrow **hartkodiert** im Template, H2 `L.htextTitle`, Text `L.htextCol1[]` + `L.htextCol2[]` (**zwei getrennte Arrays**, je 3 Absätze) |
| 5 | **FAQ** | `<Faq faqs={L.faqs} />` | 6 Fragen | `L.faqs[].q/.a` |
| 6 | **CTA** | `<CtaBand />` | H2, Button | global aus `i18n.ts` |

```astro
<!-- src/components/HomePage.astro, Zeilen 720–734 -->
<section class="htext" aria-labelledby="htext-title">
  <div class="container-x">
    <div class="htext__head" data-reveal>
      <div class="htext__eyebrow">
        <span class="htext__line" aria-hidden="true"></span>
        <span>Vienna Grand Chauffeurs</span>          <!-- ⚠️ hartkodiert, kein Feld -->
      </div>
      <h2 class="htext__title" id="htext-title">{L.htextTitle}</h2>
    </div>
    <div class="htext__cols" data-reveal style="--reveal-delay:0.08s">
      <div class="htext__col">{L.htextCol1.map((p) => <p>{p}</p>)}</div>
      <div class="htext__col">{L.htextCol2.map((p) => <p>{p}</p>)}</div>
    </div>
  </div>
</section>

<Faq faqs={L.faqs} />
<CtaBand />
```

**Abweichung vom Raster:** Der Content-Block hat keinen Eyebrow-Feldnamen (Literal im Markup), und der Fließtext ist auf zwei feste Arrays verteilt statt auf ein `paragraphs[]`, das automatisch gesplittet wird.

---

### 3.3 Fahrzeug-Modellseite

Beispieldatei: `src/components/VehiclePage.astro`, Datenquelle `src/lib/vehicles-data.ts` (Beispiel `e-klasse`, Zeilen 47–87).

```ts
// src/lib/vehicles-data.ts, Zeilen 16–35
export interface Vehicle {
  slug: string;
  name: string;        // kurz, z.B. 'E-Klasse' — auf Fleet-Karten
  heroTitle: string;   // z.B. 'Mercedes-Benz E-Klasse'  → H1
  klass: string;       // Hero-Pill-Kategorie
  group: string;
  cardKlass: string;   // Fleet-Card-Label
  cardSpecs: string;   // Fleet-Card-Spec-Zeile
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  heroStats: { label: string; value: string; accent?: string }[];
  img: { hero; ueberblick; vorteil; kabineBg; gallery: string[]; card };
  vover: { titleLead: string; titleAccent: string; body: string };
  galTitle: string;
  kab: { title: string; lead: string };
  vben: { title: string; body: string; items: string[]; badge: { big; sm } };
  vprice: { title: string; sub: string; cards: [PriceCard, PriceCard, PriceCard] };
  faq: { q: string; a: string }[];
}
```

| # | Raster | Sektion | Textfelder | Befüllung |
|---|---|---|---|---|
| 1 | **Hero** | `.vhero` | Pill, H1, Text, 3 Stats | Pill = `L.fleet + ' / ' + vehicle.klass` — **kein echter Breadcrumb**, kein Link. H1 `vehicle.heroTitle`, Text `vehicle.heroSub`, Stats `vehicle.heroStats[].label/.value` |
| 2 | **Intro** | `.vover` Überblick | Eyebrow, H2 (**zweiteilig**), Fließtext, 4 Chips | Eyebrow **hartkodiert** (`L.overview`); H2 = `vover.titleLead` + `<span>{vover.titleAccent}</span>`; Text `vover.body`; Chips **hartkodiert** (Zeilen 30–42) |
| 3 | **Galerie (fix)** | `.vgal` | Eyebrow, H2, 5 Bilder | Eyebrow hartkodiert (`L.gallery`), H2 `vehicle.galTitle`, Bilder `vehicle.img.gallery[]` |
| 4 | **Specs / Kabine (fix)** | `.vkab` | Eyebrow, H2, Lead, 6 Karten (H3 + Text) | Eyebrow hartkodiert; H2 `vehicle.kab.title`, Lead `vehicle.kab.lead`; **die 6 Karten sind hartkodiert** (Zeilen 44–60) und auf allen 8 Fahrzeugseiten identisch |
| 5 | *(nicht im Raster)* | `.vben` Ihr Vorteil | Badge groß/klein, Eyebrow, H2, Text, 4 Bullets | `vben.badge.big/.sm`, `vben.title`, `vben.body`, `vben.items[]`; Eyebrow hartkodiert (`L.advantage`) |
| 6 | *(nicht im Raster)* | `.vprice` Preise | Eyebrow, H2, Sub, 3 Preiskarten (Titel, Sub, Preis, Einheit, Beschreibung, CTA) | `vprice.title`, `.sub`, `.cards[]`; Eyebrow hartkodiert |
| 7 | *(nicht im Raster)* | `.vflotte` Die Flotte | Eyebrow, H2, Lead, Karten | **komplett hartkodiert** (`L.theFleet`, `L.flotteTitle`, `L.flotteLead`) |
| — | **SEO-Block** | ❌ **EXISTIERT NICHT** | — | siehe Risiken |
| 8 | **FAQ** | `<Faq faqs={vehicle.faq} />` | 6 Fragen | `vehicle.faq[]` — davon 4 aus dem geteilten Generator `INCLUDED_FAQ(name)` + 2 fahrzeugspezifische |
| 9 | **CTA** | `<CtaBand />` | | global |

```ts
// src/lib/vehicles-data.ts, Zeilen 39–44 + 82–86 — die 4 geteilten FAQ pro Fahrzeug
const INCLUDED_FAQ = (name: string) => [
  { q: `Wie buche ich die ${name}?`, a: 'Ganz einfach online über unser Anfrageformular …' },
  { q: 'Was passiert, wenn mein Flug Verspätung hat?', a: '…' },
  { q: 'Wo wartet mein Chauffeur bei der Ankunft?', a: '…' },
  { q: 'Ist der Preis festgelegt oder variabel?', a: '…' },
];
// …
faq: [
  ...INCLUDED_FAQ('E-Klasse'),
  { q: 'Wie viele Gäste passen in die E-Klasse?', a: '…' },
  { q: 'Brauche ich mehr Platz?', a: '…' },
],
```

```astro
<!-- src/components/VehiclePage.astro, Zeilen 101–119 — Intro-Block „Überblick" -->
<section class="vover" aria-labelledby="vover-title">
  <div class="vover__eyebrow"><span class="vover__line"/><span>{L.overview}</span></div>
  <h2 class="vover__title" id="vover-title">
    {vehicle.vover.titleLead} <span>{vehicle.vover.titleAccent}</span>
  </h2>
  <p class="vover__body">{vehicle.vover.body}</p>
  <ul class="vover__chips">{chips.map((c) => <li>…{c.label}</li>)}</ul>
  <img src={vehicle.img.ueberblick} alt={`${vehicle.heroTitle} — ${vehicle.klass}`} … />
</section>
```

**Abweichungen vom Raster:** kein Breadcrumb (nur ein Pill ohne Link), **kein SEO-Fließtext-Block**, und die H2 des Intros ist in zwei Felder gesplittet (`titleLead` + farbig hervorgehobener `titleAccent`).

---

### 3.4 Preise

Beispieldatei: `src/components/PricesPage.astro`. Content im `L`-Objekt (Zeilen 14–40).

| # | Sektion | Textfelder | Feldname |
|---|---|---|---|
| 1 | `<PageHero />` | Eyebrow, H1 (HTML, `<span>` wird terracotta), Subtext | `L.eyebrow`, `L.heroTitle`, `L.heroSub` |
| 2 | `.prices` Preisübersicht | 4 Inklusiv-Punkte, 8 Fahrzeugkarten (aus `getVehicles(lang)`), Hinweis, Langstrecken-Hinweis | `L.included[]`, `L.hourlyNote`, `L.note`, `L.longDistance`, `L.book`; Karten aus `vehicles-data.ts` (`v.name`, `v.cardKlass`, `v.vprice.cards[]`) |
| 3 | `.sseo` SEO-Block | Eyebrow, H2, 6 Absätze | `L.seo.eyebrow`, `L.seo.title`, `L.seo.paragraphs[]` |
| 4 | `<CtaBand />` | | global |

**Kein FAQ-Block** auf der Preisseite.

```astro
<!-- src/components/PricesPage.astro, Zeilen 15–27 (gekürzt) — Content-Struktur -->
const L = pick(lang,
  { title: 'Preise — Vienna Grand Chauffeurs', desc: '…', eyebrow: 'Preise',
    heroTitle: 'Transparente <span>Festpreise.</span>', heroSub: '…',
    note: '…', included: ['Wartezeit inklusive', …], longDistance: '…', book: 'Jetzt buchen',
    seo: {
      eyebrow: 'Preise & Konditionen',
      title: 'Transparente Chauffeur-Preise in Wien — fair, planbar und ohne versteckte Kosten.',
      paragraphs: [ '…', '…', '…', '…', '…', '…' ],   // 6 Absätze → 3/3 Split
    } },
  { /* EN gleiche Struktur */ });
```

Dieser SEO-Block ist der **jüngste Zuwachs** (Commit `4a39802`, „Preise: SEO-Textblock vor der CTA-Section ergaenzt") und damit die Referenz-Implementierung für alle weiteren Seiten, die noch keinen haben.

---

### 3.5 Fahrzeug-Übersicht

Beispieldatei: `src/components/FleetIndexPage.astro`.

| # | Sektion | Textfelder | Feldname |
|---|---|---|---|
| 1 | `<PageHero />` | Eyebrow, H1 (HTML), Subtext | `L.eyebrow`, `L.heroTitle`, `L.heroSub` |
| 2 | `.flist` Grid | Eyebrow, Zähler, 8 Karten (H2 = `v.name`, Badge = `v.cardKlass`, Specs = `v.cardSpecs`) | `L.ourFleet`, `L.count`; Karten aus `vehicles-data.ts` |
| 3 | `<CtaBand />` | | global |

**Kein SEO-Block, kein FAQ.** Beide müssten neu angelegt werden.

---

## 4. Meta-Tags & SEO-Technik

### Title / Description

Zentral in `src/layouts/Layout.astro` über zwei Props mit DE-Defaults:

```astro
<!-- src/layouts/Layout.astro, Zeilen 6–18 + 46–55 -->
interface Props { title?: string; description?: string }
const {
  title = 'Vienna Grand Chauffeurs — Chauffeurservice der Extraklasse',
  description = 'Premium Chauffeurservice in Wien: …',
} = Astro.props;

const lang = getLang(Astro.url);
const canonical = new URL(Astro.url.pathname, Astro.site).href;
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:locale" content={lang === 'en' ? 'en_GB' : 'de_AT'} />
<slot name="head" />
```

Übergabe je Seitentyp:

| Seitentyp | Aufruf | Feldnamen |
|---|---|---|
| Leistungsseite | `<Layout title={service.metaTitle} description={service.metaDescription}>` | `metaTitle`, `metaDescription` in `services-data.ts` |
| Fahrzeugseite | `<Layout title={vehicle.metaTitle} description={vehicle.metaDescription}>` | `metaTitle`, `metaDescription` in `vehicles-data.ts` |
| Startseite / Preise / Fahrzeuge / Kontakt / Buchung | `<Layout title={L.metaTitle …} description={L.metaDesc …}>` | `L.metaTitle`/`L.metaDesc` (HomePage) bzw. `L.title`/`L.desc` (alle übrigen) — **uneinheitliche Feldnamen** |
| Rechtsseiten | `<LegalLayout metaTitle=… description=…>` | Props direkt in der `.astro`-Datei |

`<slot name="head" />` ist vorhanden und wird bereits genutzt (`<Fragment slot="head">` in `HomePage.astro` für Preload, in `ContactPage`/`BookingPage` für Turnstile). **Das ist der vorgesehene Einstiegspunkt für JSON-LD und hreflang.**

### Strukturierte Daten / Schema.org

**Keine vorhanden.** Grep über `src/` findet weder `application/ld+json` noch `schema.org` noch `itemtype`. Insbesondere:

- **kein FAQ-Schema** — obwohl `src/components/Faq.astro` auf 11 Routen-Typen läuft und die Daten (`faqs[].q/.a`) sauber strukturiert vorliegen
- kein `LocalBusiness` / `Organization`
- kein `BreadcrumbList` (die Leistungsseiten haben visuelle Breadcrumbs, aber ohne Markup)
- kein `Service` / `Product` / `Offer` (obwohl Preisdaten strukturiert vorliegen)

Der günstigste Ort für FAQ-Schema: `src/components/Faq.astro`, dort liegt `faqs` bereits als Array vor — ein einziger eingefügter `<script type="application/ld+json">`-Block würde alle Seiten auf einmal abdecken. Achtung: `<script>` in einer Astro-Komponente außerhalb des `<head>` wird von Astro gebündelt; für JSON-LD ist `is:inline` nötig, oder die Ausgabe über den `head`-Slot der jeweiligen Seite.

### Canonical

Wird in `Layout.astro` **automatisch** aus `Astro.url.pathname` + `Astro.site` erzeugt und ist **nicht überschreibbar** — es gibt keine `canonical`-Prop.

Verifiziert im Build:

```
dist/leistungen/flughafen-transfer-wien/index.html
  → <link rel="canonical" href="https://vienna-grand-chauffeurs.pages.dev/leistungen/flughafen-transfer-wien/">
dist/en/preise/index.html
  → <link rel="canonical" href="https://vienna-grand-chauffeurs.pages.dev/en/preise/">
```

**Anmerkung:** `astro.config.mjs` trägt noch die Platzhalter-Domain `vienna-grand-chauffeurs.pages.dev`. Alle Canonicals und die Sitemap zeigen darauf. Vor dem Go-Live muss `site` auf die echte Domain umgestellt werden.

> ✅ **Behoben am 10.08.2026 (Commit `d960668`):** `site` in `astro.config.mjs` zeigt jetzt auf `https://viennagrandchauffeurs.at`; Canonical, hreflang, og:url, Schema und Sitemap ziehen korrekt nach. Die oben zitierten Build-Ausgaben geben den Stand vor dem Fix wieder.

### hreflang

**Nicht vorhanden.** Es gibt kein `<link rel="alternate" hreflang="…">` und kein `x-default`. Das einzige `hreflang`-Attribut im Projekt sitzt am Sprachumschalter-Link:

```astro
<!-- src/components/Nav.astro, Zeile 54 -->
<a class="nav__lang" href={alt.href} aria-label={nt.langAria} hreflang={alt.lang}>{alt.label}</a>
```

Solange DE und EN identische Slugs teilen, ließe sich hreflang zentral in `Layout.astro` generieren (aus `Astro.url.pathname` + `altLang()`) — das würde alle 50 Routen auf einen Schlag abdecken. Bei lokalisierten Slugs bräuchte es eine explizite Slug-Mapping-Tabelle.

### Die beiden Canonical-auf-Startseite-Seiten

Beide Seiten **existieren bereits**:

- `/leistungen/chauffeurservice/` → `dist/leistungen/chauffeurservice/index.html` ✅
- `/en/leistungen/chauffeurservice/` → `dist/en/leistungen/chauffeurservice/index.html` ✅
  (die Ziel-URL `/en/services/chauffeur-service-vienna/` existiert **nicht**, siehe Abschnitt 2)

Beide werden aus `SERVICES_DATA` / `SERVICES_DATA_EN` (Eintrag `slug: 'chauffeurservice'`, Zeilen 111 bzw. 594) erzeugt.

**Um dort ein abweichendes Canonical zu setzen, ist ein Eingriff nötig** — heute geht das nicht. Die zwei praktikablen Wege:

1. **Layout-Prop ergänzen** (sauberste Lösung, minimaler Eingriff):
   ```astro
   // src/layouts/Layout.astro
   interface Props { title?: string; description?: string; canonical?: string }
   const { title = …, description = …, canonical: canonicalOverride } = Astro.props;
   const canonical = canonicalOverride
     ? new URL(canonicalOverride, Astro.site).href
     : new URL(Astro.url.pathname, Astro.site).href;
   ```
   Dann in `ServicePage.astro` ein optionales Feld `service.canonical` durchreichen und in `services-data.ts` beim Eintrag `chauffeurservice` auf `'/'` (DE) bzw. `'/en/'` (EN) setzen.

2. **Über den `head`-Slot** — geht **nicht**, weil `Layout.astro` das eigene `<link rel="canonical">` bereits vor dem Slot ausgibt; zwei Canonicals im `<head>` ignoriert Google.

**Zusätzlich zu bedenken:** Beide Seiten sind aktuell **prominent intern verlinkt** — im Nav-Dropdown „Leistungen" (`src/lib/site.ts`, `getNav()` mappt alle 8 `SERVICES`) und im `ServicesCarousel` (alle 8 Leistungen). Ein Canonical auf die Startseite bei gleichzeitig starker interner Verlinkung ist ein widersprüchliches Signal. Außerdem stehen beide URLs in der Sitemap (`@astrojs/sitemap` nimmt automatisch jede gebaute Route auf); sie sollten dort per `filter`-Option in `astro.config.mjs` ausgeschlossen werden.

---

## 5. Bilder & Alt-Texte

### Einbindung

Alle Bilder sind **statische Dateien unter `public/images/`**, referenziert per absolutem Pfad-String. Es wird **kein** `astro:assets` / `<Image>` / `getImage()` und kein Cloudinary o.ä. benutzt — nur natives `<img src="/images/…">` bzw. CSS-`background-image` per Inline-Custom-Property.

```astro
<!-- Muster A: normales <img> mit Alt aus den Daten -->
<img src={service.intro.image.src} alt={service.intro.image.alt} width="1792" height="2400" loading="lazy" />

<!-- Muster B: Hintergrundbild ohne Alt (dekorativ, Text liegt darüber) -->
<div class="shero__bg" style={`--shero-bg: url('${service.heroImg}')`} aria-hidden="true"></div>
```

Formate gemischt: `.jpg` (Altbestand), `.webp` (neuere Fahrzeuge: Vito, VIP-Minibus, Business Sprinter), `.svg` (Icons), `.png` (Logo, Werte-Icons).

### Wo Alt-Texte gepflegt werden — drei Kategorien

| Kategorie | Beispiel | Pflegeort | Pro Seite überschreibbar? |
|---|---|---|---|
| **Datengetrieben** (ideal) | Leistungsseite Intro-/Vorteil-Bild | `services-data.ts` → `intro.image.alt`, `benefit.image.alt` | ✅ ja, pro Leistung + pro Sprache |
| **Aus anderen Feldern generiert** | Fahrzeug-Galerie, Überblick, Vorteil | Template-Ausdruck in `VehiclePage.astro` | ❌ nein — es gibt **kein** Alt-Feld im `Vehicle`-Interface |
| **Hartkodiert im Template** | Logo, Werte-Icons, Feature-Cards, Kabinen-Icons | direkt im `.astro` | teils über die `L`-Objekte, teils gar nicht |

Die generierten Alts der Fahrzeugseite sind heute generisch:

```astro
<!-- src/components/VehiclePage.astro -->
<img src={vehicle.img.ueberblick} alt={`${vehicle.heroTitle} — ${vehicle.klass}`} … />     <!-- Z. 116 -->
<img src={src} alt={`${vehicle.name} — ${L.altView} ${i + 1}`} loading="lazy" />           <!-- Z. 139: "E-Klasse — Ansicht 3" -->
<img src={vehicle.img.vorteil} alt={`${L.interior} ${vehicle.heroTitle}`} … />             <!-- Z. 180 -->
<img src={… v.img.card} alt={v.heroTitle} loading="lazy" />                                <!-- Z. 261 -->
```

→ Für individuelle Alt-Texte pro Bild müsste das `Vehicle`-Interface um Alt-Felder erweitert werden (z.B. `img.galleryAlt: string[]`).

### Bild-Slots pro Seitentyp

**Startseite** (`HomePage.astro`)
| Slot | Datei(en) | Alt heute |
|---|---|---|
| Hero-Slider, 3 Bilder | `hero-home.jpg`, `hero-slide-2.jpg`, `hero-slide-3.jpg` | `alt=""` (alle drei, geteilt) |
| Über-uns-Karten, 3 Bilder | `card-1.jpg`, `card-2.jpg`, `card-3.jpg` | `L.features[].label` |
| Benefit-Icons, 4 SVG | `why-1.svg` … `why-4.svg` | `alt=""` |
| Benefit-Bild | `why-image.jpg` | `L.benefitsAlt` ✅ eigenes Feld |
| Preloader-Logo | `logo-stacked-white.png` | `alt=""` |
| CTA-Hintergrund | `cta-bg.jpg` | CSS-Background |

**Leistungsseite** (`ServicePage.astro`, 8×)
| Slot | Datei-Muster | Alt heute |
|---|---|---|
| Hero-Hintergrund | `services/{slug}-hero.jpg` (`hero-flughafen.jpg` beim Flughafentransfer) | CSS-Background, kein Alt |
| Hero-Feature-Icons, 4 SVG | `services/feat-*.svg` | `alt=""` |
| Intro-Bild | `services/{slug}-intro.jpg` (`intro-airport.jpg`) | ✅ `intro.image.alt` |
| Intro-Karten-Icons, 2 SVG | `services/icon-plane.svg`, `icon-user.svg` | `alt=""` |
| Werte-Strip, 4 PNG | `services/val-*.png` | `alt=""` |
| Vorteil-Bild | `services/{slug}-benefit.jpg` (`benefit-interior.jpg`) | ✅ `benefit.image.alt` |

**Fahrzeug-Modellseite** (`VehiclePage.astro`, 8×)
| Slot | Datei-Muster | Alt heute |
|---|---|---|
| Hero-Hintergrund | `img.hero` = i.d.R. `fahrzeuge/{slug}-gal-1.*` | CSS-Background |
| Überblick-Bild | `fahrzeuge/ueberblick-{slug}.*` | generiert |
| Galerie, 5 Bilder | `fahrzeuge/{slug}-gal-1..5.*` | generiert, durchnummeriert |
| Kabinen-Hintergrund | `gallery[3]` (4. Galeriebild) | CSS-Background |
| Kabinen-Icons, 6 SVG | `fahrzeuge/kab-1..6.svg` | `alt=""` |
| Chip-Icons, 4 SVG | `fahrzeuge/chip-*.svg` | `alt=""` |
| Vorteil-Bild | `fahrzeuge/vorteil-{slug}.*` | generiert |
| Flotten-Karussell, 7 Karten | `fahrzeuge/card-{slug}.*` | `v.heroTitle` |

**Preise** — 8× `fahrzeuge/card-{slug}.*`, Alt = `v.heroTitle`.
**Fahrzeug-Übersicht** — 8× `fahrzeuge/card-{slug}.*`, Alt = `v.heroTitle`.
**Global (Nav/Footer)** — `logo-stacked-white.png` (Alt „Vienna Grand Chauffeurs"), `logo-footer.svg` (Alt „Vienna Grand Chauffeurs").
**FleetShowcase / ServicesCarousel** (auf Startseite + allen Leistungsseiten) — 8 Fahrzeug-Cards (Alt = Fahrzeugname) + 8 Leistungs-Hero-Bilder (Alt = Leistungstitel, Klone `alt=""`).

Nicht referenzierte Altbestände in `public/images/fahrzeuge/`: alle `bmw-5er-*` (5 Galerie + Card + Überblick + Vorteil), `vip-minibus-hero.webp`, `ueberblick-vito.webp` (durch `vito-gal-3.webp` ersetzt, Commit `6dfc3ec`) sowie die vier ungetrackten `DGM_*.webp`. Ebenso ungenutzt: `public/images/vito/` (ungetrackt) und `maybach/` im Projekt-Root.

Ergänzend liegt bereits eine Task-Vorlage `ALT_TEXT_OPTIMIERUNG.md` im Root (ungetrackt), die einen eigenen Alt-Text-Durchlauf beschreibt.

---

## 6. Risiken & Auffälligkeiten

### 🔴 Blocker — vor dem Umsetzungs-Prompt zu entscheiden

**1. Die englischen Ziel-URLs existieren nicht und erfordern einen Architektur-Umbau.**
EN-Routen laufen heute über deutsche Pfadsegmente (`/en/leistungen/flughafen-transfer-wien/`). Der Slug ist gleichzeitig Routing-Schlüssel für beide Sprachen. Betroffen bei einer Umstellung:

- `src/pages/en/leistungen/[slug].astro` → `src/pages/en/services/[slug].astro` (Ordner umbenennen)
- `src/pages/en/fahrzeuge/` → `src/pages/en/vehicles/`
- `src/pages/en/preise.astro` → `prices.astro`, `kontakt.astro` → `contact.astro`, `online-buchung.astro` → `online-booking.astro`
- `Service`/`Vehicle`-Interface um `slugEn` erweitern, `getStaticPaths` in den EN-Routen darauf umstellen
- `hrefFor()` in `src/lib/i18n.ts` muss Pfadsegmente übersetzen statt nur `/en` voranzustellen
- `altLang()` kann den Gegenpart nicht mehr per Regex ableiten → braucht eine Mapping-Tabelle
- `getNav()` in `src/lib/site.ts` baut Links aus `SERVICES[].slug` / `FAHRZEUGE[].slug` — braucht Sprachvariante
- Alle Komponenten, die URLs zusammensetzen: `ServicesCarousel.astro` (`leistungenBase + s.slug`), `FleetShowcase.astro` (`viewBase + slug`), `VehiclePage.astro` (`fahrzeugeBase + v.slug`), `PricesPage.astro`, `FleetIndexPage.astro`, `Footer.astro`
- Der Nav-Highlighting-Code in `Nav.astro` (`strip()` + `sectionActive()`) vergleicht locale-bereinigte Pfade und würde bei unterschiedlichen Segmenten still brechen

**Entscheidung nötig:** englische Slugs umsetzen (größerer Eingriff, SEO-korrekt) oder bei deutschen EN-Slugs bleiben und die Zielliste anpassen.

**2. Fünf DE-Slugs weichen ab** (`limousinen-service-wien`, `privatchauffeur-wien`, `shuttle-service-wien`, `mercedes-eqe` und die Zielform `limousinenservice`). Eine Umbenennung ist im DE-Fall unkritisch (nur `slug`-Feld in den Datendateien + `SERVICES`/`FAHRZEUGE` in `src/lib/site.ts`), erzeugt aber neue URLs → Redirects einplanen, falls schon indexiert.

**3. Auf Fahrzeug-Modellseiten fehlt der SEO-Textblock komplett.** `VehiclePage.astro` hat keinen `.sseo`-Abschnitt. Für die geplanten Fahrzeug-SEO-Texte müssen (a) das `Vehicle`-Interface um `seo: { eyebrow, title, paragraphs[] }` erweitert und (b) ein Block in `VehiclePage.astro` ergänzt werden. Das CSS lässt sich 1:1 aus `PricesPage.astro` (Zeilen 168–186) übernehmen — dort ist es schon in der finalen Form.

**4. Canonical ist nicht überschreibbar.** Für `/leistungen/chauffeurservice/` → `/` und das EN-Pendant muss `Layout.astro` eine `canonical`-Prop bekommen (Vorschlag in Abschnitt 4). Zusätzlich: beide URLs aus der Sitemap filtern und die interne Verlinkung im Nav-Dropdown/Karussell überdenken.

**5. Kein FAQ-Schema, kein hreflang.** Beides muss neu gebaut werden. Beides ist zentral machbar (`Faq.astro` bzw. `Layout.astro`) und deckt dann alle Seiten ab.

### 🟡 Beim Einpflegen zu beachten

**6. Content ist in zwei Welten getrennt.** Leistungen und Fahrzeuge liegen sauber in `src/lib/*-data.ts` (ideal — reines Daten-Editing, kein Markup-Kontakt). Startseite, Preise, Fahrzeug-Übersicht, Kontakt und Buchung haben ihren Text dagegen **im Frontmatter der jeweiligen Komponente**. Beim Einpflegen dort also im `L = pick(lang, {…}, {…})`-Block arbeiten, nicht im Markup.

**7. Hartkodierte Texte, die das Raster als Content-Felder vorsieht:**

| Text | Ort | Konsequenz |
|---|---|---|
| Eyebrow „Ihr Vorteil" (Block 05, Leistungsseite) | `ServicePage.astro`, Z. 21–22 (`L.yourAdvantage`) | pro Seite nicht änderbar |
| Eyebrow „Vienna Grand Chauffeurs" (Block 06, Startseite) | `HomePage.astro`, Z. 724 — Literal im Markup | kein Feldname vorhanden |
| Eyebrows „Überblick", „Galerie", „Innenraum", „Ihr Vorteil", „Preise", „Die Flotte" | `VehiclePage.astro`, Z. 27–28 | auf allen 8 Fahrzeugseiten identisch |
| CTA-Band-Überschrift (Block 08) | `src/lib/i18n.ts`, `UI[lang].cta.heading` | **global für die gesamte Site**, nicht pro Seite |
| FAQ-H2 („Häufige Fragen zum Transfer.") | `Faq.astro`, Z. 12 als Default | überschreibbar per `heading`-Prop, wird aber nirgends genutzt |
| Werte-Strip (4 Labels), Kabinen-Features (6 Karten), Chips (4), Flotten-Block | `ServicePage.astro` Z. 25–37, `VehiclePage.astro` Z. 30–60 | auf allen Seiten des Typs identisch |

Wenn die Texte pro Seite variieren sollen, müssen diese Felder erst in die Datenstruktur gehoben werden.

**8. SEO-Absätze werden automatisch halbiert.** `Math.ceil(n/2)` → bei 5 Absätzen steht 3 links / 2 rechts. **Gerade Anzahl liefern, idealerweise 6.** Gilt für `ServicePage.astro` und `PricesPage.astro`.

**9. Der Startseiten-Langtext hat ein abweichendes Format:** zwei getrennte Arrays `L.htextCol1` (3 Absätze) und `L.htextCol2` (3 Absätze) statt eines `paragraphs[]` mit Auto-Split. Der Text muss also **schon beim Liefern** auf zwei Spalten aufgeteilt sein — oder man vereinheitlicht die Komponente auf das `sseo`-Muster.

**10. Uneinheitliche Anzahl FAQ-Items.** Leistungsseiten haben heute 5 Fragen (nur `flughafen-transfer-wien` hat 6), Fahrzeugseiten 6, Startseite 6. Das Raster verlangt 6 → auf allen Leistungsseiten je eine Frage ergänzen.

**11. Uneinheitliche Meta-Feldnamen.** `metaTitle`/`metaDescription` in den Datendateien, `L.metaTitle`/`L.metaDesc` in `HomePage.astro`, `L.title`/`L.desc` in allen übrigen Komponenten. Beim automatisierten Einpflegen leicht zu verwechseln.

**12. Kein Feld für HTML-Auszeichnung in den meisten Textfeldern.** Astro escapet `{…}` standardmäßig. HTML ist nur dort möglich, wo explizit `set:html` steht — konkret: `HomePage.heroTitle`, `heroSub`, `benefitsTitle`, `Footer.tagline`, `ServicesCarousel.titleHtml`, `PageHero.title` (also H1 von Preise/Fahrzeuge/Kontakt/Buchung; dort färbt `<span>` den Text terracotta). Überall sonst würden `<br>` oder `<strong>` als Text erscheinen.

**13. Zweiteilige H2 auf Fahrzeugseiten.** `vover.titleLead` + `vover.titleAccent` — der Accent-Teil wird farbig hervorgehoben. Texte müssen entsprechend gesplittet geliefert werden („Die meistgewählte Klasse für" / „Business & Transfer.").

**14. Der EN-Content ist eine vollständige Kopie der DE-Struktur.** Jede Änderung am `Service`/`Vehicle`-Interface muss in **beiden** Arrays nachgezogen werden (`SERVICES_DATA` + `SERVICES_DATA_EN`, `VEHICLES_DATA` + `VEHICLES_DATA_EN`). TypeScript fängt fehlende Pflichtfelder ab — neue Felder deshalb als Pflichtfelder anlegen, dann kann kein Eintrag vergessen werden.

**15. `astro.config.mjs` trägt noch die Platzhalter-Domain.** Alle Canonicals + Sitemap zeigen auf `vienna-grand-chauffeurs.pages.dev`.

> ✅ **Behoben am 10.08.2026 (Commit `d960668`):** `site` in `astro.config.mjs` zeigt jetzt auf `https://viennagrandchauffeurs.at`; Canonical, hreflang, og:url, Schema und Sitemap ziehen korrekt nach.

**16. Keine `robots.txt`, kein `noindex`-Mechanismus.** `public/` enthält nur Favicons und Bilder.

### 🟢 Positiv

- Für Leistungen und Fahrzeuge ist Content sauber von Layout getrennt — 16 von 50 Routen sind reines Daten-Editing in zwei Dateien.
- Alle Textfelder sind typisiert (`interface Service`, `interface Vehicle`) → Vertipper und fehlende Felder fallen beim Build auf.
- `PricesPage.astro` enthält die fertige Referenz-Implementierung des SEO-Blocks (Markup + CSS), die sich auf Fahrzeug- und Übersichtsseiten kopieren lässt.
- `Layout.astro` hat einen `head`-Slot → JSON-LD und hreflang sind ohne Layout-Umbau injizierbar.
- Alle Routen sind statisch vorgerendert, Sitemap wird automatisch generiert.

---

## Offene Fragen

1. **EN-URL-Strategie:** Sollen die englischen Ziel-URLs (`/en/services/airport-transfer-vienna/`) umgesetzt werden — mit dem in Punkt 1 beschriebenen Umbau von Routing, `hrefFor()`, `altLang()` und allen URL-bauenden Komponenten? Oder bleibt es bei den heutigen deutschen EN-Slugs?
2. **DE-Slug-Umbenennungen:** Sollen `limousinen-service-wien` → `limousinenservice`, `privatchauffeur-wien` → `privatchauffeur`, `shuttle-service-wien` → `shuttle-service` und `mercedes-eqe` → `eqe` umgestellt werden? Ist die Seite bereits live/indexiert (Redirects nötig) oder noch im Pre-Launch?
3. **Fahrzeug-SEO-Block:** Soll ich `VehiclePage.astro` um einen `.sseo`-Block plus `seo`-Feld im `Vehicle`-Interface erweitern? Wo genau — vor der FAQ (analog Leistungsseite) oder nach dem Flotten-Karussell?
4. **`/leistungen/`-Übersichtsseite:** Nicht in der Zielliste, existiert auch nicht. Bewusst so, oder soll eine angelegt werden? (Die Nav verlinkt „Leistungen" derzeit auf die erste Leistungsseite.)
5. **SEO-Block auf `/fahrzeuge/` und `/en/fahrzeuge/`:** In der Zielliste enthalten, aber die Seite hat weder SEO-Text noch FAQ. Kommen dafür Texte, und soll ich die Blöcke ergänzen?
6. **FAQ auf Preise und Fahrzeug-Übersicht:** Beide haben heute keinen FAQ-Block. Ergänzen?
7. **Hartkodierte Eyebrows:** Sollen „Ihr Vorteil", die Fahrzeug-Eyebrows und die CTA-Band-Überschrift zu pflegbaren Content-Feldern werden, oder bleiben sie global?
8. **Canonical-Seiten und interne Verlinkung:** Sollen `/leistungen/chauffeurservice/` und das EN-Pendant zusätzlich aus der Sitemap gefiltert werden? Und sollen sie im Nav-Dropdown bzw. Leistungs-Karussell verlinkt bleiben?
9. **Startseiten-Langtext:** Soll ich `L.htextCol1`/`L.htextCol2` auf ein einzelnes `paragraphs[]` mit Auto-Split umstellen (einheitlich mit allen anderen Seiten), oder liefern die Texte die Spaltenaufteilung selbst mit?
10. **Domain:** Steht die finale Domain für `astro.config.mjs` inzwischen fest?
