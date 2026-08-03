# Umsetzungs-Report — SEO-Texte und Struktur-Anpassungen

Stand: 2026-08-03 · Branch `seo-texte-und-slugs` (5 Commits, abgezweigt von `main` @ `4a39802`)

Build: **fehlerfrei**, 50 Seiten. Nach jeder Phase geprüft.

---

## Zusammenfassung der Prüfungen

| Prüfung | Umfang | Ergebnis |
|---|---|---|
| Datendateien gegen `content.json` (Feld für Feld, per Modul-Import) | 294 Felder | 0 Abweichungen |
| Gerendertes `dist/` gegen `content.json` (Titles, Descriptions, Fließtext, FAQ) | 854 Prüfungen | 0 Fehler |
| Canonical, hreflang, FAQ-Schema, Sitemap | 459 Prüfungen | 0 Fehler |
| Interne Links im `dist/` | 50 Seiten | keine toten Links |
| Bildreferenzen gegen `public/` | 123 Pfade | alle vorhanden |

---

## Vorab geklärte Rückfragen

Zwei Punkte kollidierten mit dem Auftrag, beide wurden vor Beginn entschieden:

1. **Fahrzeug-FAQ:** `content.json` liefert pro Modellseite **3** statt der im Prompt genannten 6 Fragen (alle 16 Einträge). Entscheidung: nur die 3 gelieferten übernehmen, `INCLUDED_FAQ()` entfällt. Die Modellseiten haben dadurch 3 statt bisher 6 FAQ-Items.
2. **`intro` und `benefit` auf Preise und Fahrzeug-Übersicht:** Beide `full`-Seiten liefern zusätzlich vollständige Intro- und Vorteil-Blöcke (Eyebrow, H2, Fließtext, Badge, 4 Bullets), für die es im Code keine Sektion gibt und die das Prompt-Mapping nicht erwähnt. Entscheidung: **ignorieren**, strikt beim Prompt-Mapping bleiben. Diese Texte liegen ungenutzt in `content.json` (siehe offene Punkte).

---

## Phase 1 — EN-Routen auf lokalisierte Slugs (`a051a85`)

Die englischen Seiten liegen jetzt unter echten englischen Pfaden.

**Neu:** `src/lib/routes.ts` — übersetzt Pfade in beide Richtungen. Einzige Quelle für die Slug-Paare sind die Datenarrays (`slug` / `slugEn`), die statischen Segmente stehen in einer Tabelle (`leistungen`↔`services`, `fahrzeuge`↔`vehicles`, `preise`↔`prices`, `kontakt`↔`contact`, `online-buchung`↔`online-booking`, `buchung-abschluss`↔`booking-complete`). Rechtsseiten behalten in beiden Bäumen ihre deutschen Namen. Trailing Slash und Hash bleiben erhalten, damit die bestehende Link-Konvention unverändert bleibt.

`hrefFor()` und `altLang()` in `i18n.ts` bauen darauf auf; `altLang()` braucht dadurch keine Regex mehr, sondern löst den Gegenpart über das Mapping auf.

**Geänderte Dateien:**
- neu: `src/lib/routes.ts`
- `src/lib/i18n.ts`, `src/lib/services-data.ts` (+`slugEn`), `src/lib/vehicles-data.ts` (+`slugEn`)
- umbenannt: `src/pages/en/leistungen/` → `en/services/`, `en/fahrzeuge/` → `en/vehicles/`, `preise.astro` → `prices.astro`, `kontakt.astro` → `contact.astro`, `online-buchung.astro` → `online-booking.astro`, `buchung-abschluss.astro` → `booking-complete.astro`
- `src/components/`: `ServicesCarousel`, `FleetShowcase`, `VehiclePage`, `PricesPage`, `FleetIndexPage`, `Nav`

**Anmerkung zu `FleetShowcase`:** Dort wurden Links im Client-JS aus `viewBase + slug` zusammengesetzt. Da der Slug dort gleichzeitig die Bilddateinamen adressiert, wird jetzt statt `data-slug` ein fertiges `data-href` ausgegeben; `data-view-base` entfällt.

**Anmerkung zu `Nav`:** Das Highlighting verglich locale-bereinigte Pfade per Regex. Da EN-Segmente jetzt abweichen, läuft der Vergleich über `canonicalPath()` aus `routes.ts`.

---

## Phase 2 — DE-Slugs (`9a59a5c`)

`limousinen-service-wien` → `limousinenservice`, `privatchauffeur-wien` → `privatchauffeur`, `shuttle-service-wien` → `shuttle-service`, `mercedes-eqe` → `eqe`.

Geändert wurden nur die Routing-Slugs in `services-data.ts`, `vehicles-data.ts` und `site.ts`. **Die Bilddateinamen bleiben unverändert** (`limousinen-service-wien-hero.jpg`, `card-mercedes-eqe.jpg` usw.).

In `FleetShowcase.astro` leiteten sich Bild- und Galeriepfade bisher aus dem Slug ab; für den EQE sind sie deshalb jetzt explizit gesetzt, damit die Umbenennung die Bilder nicht bricht.

---

## Phase 3 — Fahrzeug-SEO-Block (`71e268b`)

- `interface Vehicle` um `seo: { eyebrow, title, paragraphs[] }` als **Pflichtfeld** erweitert.
- Der `.sseo`-Block aus `PricesPage.astro` (Markup + CSS + Zwei-Spalten-Split) liegt jetzt auch auf `VehiclePage.astro` (nach „Die Flotte", vor der FAQ) und auf `FleetIndexPage.astro`.
- `FleetIndexPage` bekam zusätzlich den bisher fehlenden FAQ-Block.

**Abweichung vom Phasenschnitt:** Die Texte für diese neuen Blöcke stammen zwangsläufig aus `content.json` und wurden deshalb schon hier eingetragen, nicht erst in Phase 4 — sonst hätte der Phase-3-Checkpoint („Block rendert") nicht erfüllt werden können. Betroffen: `vehicles-data.ts` (`seo`) und `FleetIndexPage.astro` (`seo`, `faqs`).

---

## Phase 4 — Texte (`35dd6b3`)

Alle Texte zeichengenau aus `content.json` übernommen, nichts umformuliert oder gekürzt.

| Ziel | Umfang |
|---|---|
| `src/lib/services-data.ts` | 7 Leistungen × 2 Sprachen × 13 Felder = 182 Felder |
| `src/lib/vehicles-data.ts` | 8 Modelle × 2 Sprachen × 6 Felder = 96 Felder |
| `src/components/HomePage.astro` | Meta, Hero, Benefits, Langtext-Spalten, 6 FAQ |
| `src/components/PricesPage.astro` | Meta, Hero, SEO-Block ersetzt, FAQ-Block neu |
| `src/components/FleetIndexPage.astro` | Meta, Hero |
| `src/components/BookingPage.astro`, `ContactPage.astro` | nur Meta |

**Unangetastet geblieben** (wie beauftragt): Bildpfade und alt-Texte, `marquee`, `heroFeatures`, `intro.cards`, `heroStats`, `galTitle`, `kab`, `vben`, `vprice`, die Preis-Felder (`note`, `included`, `longDistance`) sowie die Canonical-Seite `/leistungen/chauffeurservice/` samt EN-Pendant.

`INCLUDED_FAQ()` und `INCLUDED_FAQ_EN()` wurden entfernt, da nach dem FAQ-Austausch nicht mehr referenziert.

**Vorgehen:** Die Ersetzungen liefen über ein Skript, das die Datendateien zeilenweise pro Eintrag patcht. Anschließend wurden beide Module in Node importiert und Feld für Feld gegen `content.json` verglichen (294 Felder, 0 Abweichungen) — inklusive Kontrolle, dass die zu bewahrenden Felder unbeschädigt sind.

---

## Phase 5 — SEO-Technik (`8080fe9`)

- **Canonical:** `Layout.astro` hat eine optionale `canonical`-Prop; `Service` ein optionales `canonical`-Feld. `/leistungen/chauffeurservice/` zeigt auf `/`, `/en/services/chauffeur-service-vienna/` auf `/en/`. Beide werden aus `Astro.site` gebaut, ein späterer Domainwechsel greift also automatisch.
- **Sitemap:** Diese beiden URLs sind per `filter` in `astro.config.mjs` ausgeschlossen (48 statt 50 URLs).
- **hreflang:** `de-AT`, `en` und `x-default` (auf DE) in `Layout.astro`, Gegenpart über das Routen-Mapping. Auf den beiden kanonisierten Seiten werden **keine** hreflang-Tags ausgegeben, da sie nicht das Canonical ihres Sprachpaars sind.
- **FAQ-Schema:** `Faq.astro` gibt `FAQPage`-JSON-LD aus denselben Daten aus, die das Akkordeon rendert (`is:inline`). Damit sind alle 38 Seiten mit FAQ-Block abgedeckt.

Außerdem wurden 32 Leerzeilen bereinigt, die beim Einfügen von `slugEn` in Phase 1 durch gemischte Zeilenenden entstanden waren.

---

## Getroffene Annahmen

1. **DE↔EN-Zuordnung über die Schlüssel:** Die Keys in `content.json` stimmen zwischen `de` und `en` nicht überall überein (`de.stunde`↔`en.hourly`, `de.priv`↔`en.private`, `de.lang`↔`en.daytrips`, `de.preise`↔`en.prices`, `de.buchung`↔`en.booking`, `de.kontakt`↔`en.contact`, `m_s-klasse`↔`m_s-class` usw.). Die Zuordnung ist inhaltlich jeweils eindeutig und wurde entsprechend gesetzt. Beachtenswert: `de.lang` ist „Langstreckenfahrten", das englische Gegenstück `en.daytrips` heißt „Day Trips from Vienna" — thematisch nicht deckungsgleich, aber auf beiden Seiten bleibt genau dieser eine Eintrag übrig, und die Route ist `/leistungen/langstreckenfahrten/` ↔ `/en/services/day-trips-from-vienna/`.
2. **`slugEn` für die Canonical-Seite:** `chauffeurservice` steht nicht in `content.json`. Als englischer Slug wurde `chauffeur-service-vienna` gesetzt, entsprechend der im Prompt (Phase 5.1) genannten URL.
3. **Kein HTML in den Hero-Feldern:** Die gelieferten Texte enthalten keinerlei Markup. Die bisherigen `<span>`-Akzente in den H1 von Preise und Fahrzeug-Übersicht (`Transparente <span>Festpreise.</span>`) sind damit entfallen, die Überschriften sind jetzt einfarbig. Es wurde kein `<span>` erfunden, wie im Prompt vorgegeben.
4. **`buchung-abschluss` heißt auf EN `booking-complete`** (im Prompt als „sinnvolle EN-Entsprechung" freigestellt).
5. **Zeilenenden:** Die Datendateien nutzen CRLF; alle Skripte schreiben in derselben Konvention zurück, damit die Diffs klein bleiben.

---

## Offene Punkte

1. **Ungenutzte Texte in `content.json`:** Für `de.preise`/`en.prices` und `de.hub`/`en.hub` liegen vollständige `intro`- und `benefit`-Blöcke vor (je Eyebrow, H2, Fließtext, Badge, 4 Bullets), die laut Entscheidung nicht eingebaut wurden. Falls diese Seiten die Blöcke doch bekommen sollen, wäre das ein eigener, überschaubarer Schritt (Markup analog `ServicePage.astro`).
2. **Auffälligkeiten in den gelieferten Texten** — unverändert übernommen, aber einen Blick wert:
   - `de.hub.metaDescription` endet mitten im Satz: „… Für jede Fahrt das passende Modell mit".
   - Der jeweils letzte SEO-Absatz von `de.hub` und `en.hub` wiederholt seine eigenen Sätze wörtlich („Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. … Den Fixpreis sehen Sie vorab. Sie buchen bequem online. …"). Ähnliches in `en.hub` P6.
   - `de.hub.seo.eyebrow` lautet „Fahrzeuge mit" (EN: „Vehicles with") — wirkt abgeschnitten.
   - `de.m_vip-minibus`: `metaDescription` und `heroSub` sprechen von „bis 16 Personen", die unveränderten Specs der Seite nennen 12 Gäste.
3. **Primärkeyword nicht als exakte Phrase im Text:** Auf 23 von 40 Seiten taucht das Primärkeyword nicht wörtlich im gerenderten HTML auf. Bei `/kontakt/` und `/online-buchung/` ist das systembedingt (reine Meta-Seiten ohne Fließtext). Bei den 16 Fahrzeug-Modellseiten liegt es an der Wortstellung — die Texte schreiben z. B. „S-Klasse mit Fahrer Wien", das Keyword lautet „Mercedes S-Klasse Chauffeur Wien". Da Keywords laut Prompt reine Referenz sind und Texte nicht verändert werden dürfen, wurde nichts angepasst. Der im Prompt genannte Stichproben-Checkpoint („Limousinen Service Wien" auf `/leistungen/limousinenservice/`) ist erfüllt.
4. **Weiterhin hartkodiert** (laut Prompt bewusst außerhalb des Auftrags): die Eyebrows „Ihr Vorteil", „Überblick", „Galerie", „Innenraum", „Preise", „Die Flotte", der Eyebrow des Startseiten-Langtexts sowie die CTA-Band-Überschrift, die weiterhin global aus `src/lib/i18n.ts` kommt.
5. **Domain:** `astro.config.mjs` trägt weiter den Platzhalter `https://vienna-grand-chauffeurs.pages.dev`. Canonicals, hreflang und Sitemap ziehen ihn aus `Astro.site` und stellen sich beim Wechsel automatisch um.
6. **Bild-Alt-Texte** sind unverändert und laut Prompt Gegenstand eines separaten Durchgangs (`ALT_TEXT_OPTIMIERUNG.md`).
7. **Branch:** Die Arbeit liegt auf `seo-texte-und-slugs`, nicht auf `main`. Merge nach Sichtung.
