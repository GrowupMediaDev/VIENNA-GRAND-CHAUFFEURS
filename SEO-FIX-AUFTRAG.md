# SEO-Fix-Auftrag (technisch, ohne Textarbeit)

Grundlage ist ein Audit über den fertigen Build (`dist/`, 51 Seiten). Jeder
Befund unten wurde im ausgelieferten HTML nachgeprüft, nicht aus dem Quellcode
geraten. Das Prüfskript liegt im Repo: `scripts/seo-audit.mjs`.

**Auftrag:** die vier Punkte unter „Aufgaben" umsetzen. Textinhalte werden
dabei **nicht** bewertet oder umgeschrieben – es geht ausschließlich um
Technik: Schema, Head-Tags, Indexierungssteuerung, robots.

---

## Zuerst: Ausgangslage reproduzieren

```
npm run build
node scripts/seo-audit.mjs dist
```

Erwarteter Stand vor der Arbeit: **9 Fehler, 361 Warnungen, 100 Hinweise.**

Praktisch: `"seo": "node scripts/seo-audit.mjs dist"` in `package.json` unter
`scripts` eintragen, dann genügt später `npm run seo`.

---

## Nicht anfassen

Diese Punkte meldet das Skript, sie sind aber **korrekt so**. Bitte nicht
„reparieren":

- **`canonical-not-self` auf `/leistungen/chauffeurservice/` und
  `/en/services/chauffeur-service-vienna/`.** Beide zeigen bewusst per Canonical
  auf die Startseite und sind per Filter aus der Sitemap genommen (siehe
  Kommentar in `astro.config.mjs`). Gewollte Konsolidierung.
- **`sitemap-gap` für dieselben zwei Seiten.** Gleiche Ursache, ebenfalls
  gewollt.
- **`anchor-empty` (102×).** Das sind Logo-Links mit korrektem
  `aria-label`. Sauber gelöst.
- **`img-eager` (51×).** Betrifft die Logos in Header/Footer – die sollen
  eager laden.
- **`img-alt-empty`.** `<img … alt loading="lazy">` ist gültiges HTML für
  dekorative Bilder.
- **`link-dead` auf `/en/404/`.** Steht nur auf der 404-Seite selbst, die nicht
  indexiert wird. Kosmetisch, ignorieren.

Ebenfalls in Ordnung und **nicht** umzubauen: hreflang ist auf allen 50 Seiten
reziprok, mit Selbstreferenz und `x-default`. Canonicals sind absolut und
selbstreferenzierend. Titles und Descriptions sind eindeutig. Keine
Waisenseite, keine Klicktiefe über 3.

---

## Aufgabe 1 — Schema.org aufbauen (größter Hebel)

**Befund:** Im gesamten Build existieren exakt drei JSON-LD-Typen: `FAQPage`,
`Question`, `Answer` (erzeugt in `src/components/Faq.astro`). Es gibt **kein**
`LocalBusiness`, **kein** `Service`, **kein** `Vehicle`, **kein**
`BreadcrumbList`. Für einen lokalen Chauffeurdienst fehlt damit die Grundlage
für das Local Pack.

**Umsetzung:**

1. Neue Komponente `src/components/Schema.astro`, eingehängt über den
   bestehenden `<slot name="head" />` in `src/layouts/Layout.astro`.
2. **`LocalBusiness` genau einmal voll definieren**, mit fester
   `@id: "https://viennagrandchauffeurs.at/#business"`, auf der DE-Startseite.
   Alle anderen Seiten definieren es **nicht** erneut, sondern referenzieren es
   über `provider: { "@id": "…/#business" }`.
3. **`Service`** auf den 8 Leistungsseiten. Quelle für Namen und Slugs ist
   `SERVICES` in `src/lib/site.ts` – keine Literale im Markup.
4. **`Vehicle`** auf den 8 Fahrzeugseiten, aber **nur mit echten Daten** aus
   `src/lib/vehicles-data.ts` (Marke, Modell, Sitzplätze). Wo diese Daten
   fehlen, stattdessen `Service` verwenden oder den Typ weglassen. Kein
   `Vehicle`-Schema ohne konkrete Fahrzeugdaten.
5. **`BreadcrumbList`** auf den Leistungsseiten – es gibt dort einen sichtbaren
   Breadcrumb in `src/components/ServicePage.astro`. Das Schema muss **exakt
   dieselben Strings** verwenden wie der sichtbare Breadcrumb (gleiche
   Variable, nicht zweite Quelle). Es darf nicht auf die beiden
   `chauffeurservice`-Seiten zeigen, die auf die Startseite kanonisieren.

**Harte Regeln:**

- Kontaktdaten kommen aus `CONTACT` in `src/lib/site.ts`. Telefonnummer,
  E-Mail und URLs werden **nirgends** als Literal ins Schema geschrieben.
- Das Schema darf nie mehr behaupten, als die Seite zeigt. `areaServed` ist
  das tatsächlich beworbene Gebiet – nicht werblich auf „ganz Europa"
  aufblasen.
- Interne URLs im Schema über die bestehenden Helfer aus `src/lib/routes.ts`
  bilden, nicht roh zusammenstringen.

### ⚠️ Vorher klären (blockiert Teil 2 dieser Aufgabe)

`src/lib/site.ts` enthält **keine Postadresse**, und `CONTACT.email` ist im
Code ausdrücklich als `PLACEHOLDER` markiert. Google verlangt für
`LocalBusiness`-Rich-Results eine `address` (`PostalAddress` mit Straße, PLZ,
Ort, Land).

**Erfinde keine Adresse und übernimm keinen Platzhalter ins Schema.** Frage
zuerst nach:

- Gibt es eine Geschäftsadresse, die veröffentlicht werden darf?
- Falls nein: Ist der Dienst rein mobil (kein Ladenlokal)? Dann ist
  `LocalBusiness` mit `areaServed` statt `address` die ehrlichere Modellierung
   – oder alternativ `Organization` plus `Service`. Diese Entscheidung trifft
  der Auftraggeber, nicht du.
- Ist `office@viennagrandchauffeurs.at` inzwischen echt oder weiterhin
  Platzhalter?

Alles andere in Aufgabe 1 (Service, Vehicle, BreadcrumbList) lässt sich
unabhängig davon schon umsetzen.

---

## Aufgabe 2 — `og:image` und Twitter-Card

**Befund:** `og:image` kommt im **gesamten Build null Mal** vor, `twitter:card`
ebenfalls nicht (0 von 51 Seiten). `og:title`, `og:description`, `og:url` und
`og:locale` sind vorhanden und korrekt. Jeder Share auf WhatsApp, LinkedIn
oder Facebook zeigt aktuell einen leeren Kasten.

**Umsetzung in `src/layouts/Layout.astro`:**

1. Neue optionale Prop `image?: string` mit sinnvollem Default für die ganze
   Site.
2. Ausgeben: `og:image` (**absolute URL**, über `new URL(…, Astro.site)` – eine
   relative URL wird von Facebook und LinkedIn ignoriert), dazu
   `og:image:width`, `og:image:height` und `og:image:alt`.
3. Twitter: `twitter:card` = `summary_large_image`, plus `twitter:title`,
   `twitter:description`, `twitter:image`.
4. Das Bild selbst: 1200×630 px. In `public/images/` liegt noch kein passendes
   OG-Bild; `hero-home.jpg` ist ein brauchbarer Ausgangspunkt für einen
   Zuschnitt. Wenn du es nicht selbst zuschneiden kannst, lege den Pfad an und
   sag Bescheid, welches Bild in welcher Größe fehlt.
5. Sinnvoll: Leistungs- und Fahrzeugseiten übergeben ihr jeweiliges Hero-Bild
   als `image`, damit der Share zur Seite passt. Der Default greift überall
   sonst.

---

## Aufgabe 3 — Buchungs-Abschlussseiten auf `noindex`

**Befund:** `/buchung-abschluss/` und `/en/booking-complete/` sind
indexierbar **und** stehen in der Sitemap, obwohl keine einzige Seite auf sie
verlinkt (Danke-Seiten nach der Buchung). Im gesamten Build hat nur eine
einzige Seite überhaupt ein `robots`-Meta.

**Umsetzung:**

1. In `src/pages/buchung-abschluss.astro` und
   `src/pages/en/booking-complete.astro` die bereits vorhandene Layout-Prop
   `noindex` setzen. Das Layout unterdrückt dann automatisch Canonical und
   hreflang und setzt `robots: noindex, follow` – genau das gewünschte
   Verhalten, keine neue Mechanik nötig.
2. Beide Seiten zusätzlich im `filter` der Sitemap-Integration in
   `astro.config.mjs` ausschließen, analog zu den bestehenden Einträgen.
   Andernfalls widersprechen sich Sitemap und Meta-Tag.

---

## Aufgabe 4 — `robots.txt` anlegen

**Befund:** Es gibt keine `robots.txt` – weder in `dist/`, noch in `public/`,
noch als Route. Die Sitemap wird damit nirgends angekündigt.

**Umsetzung:** `src/pages/robots.txt.ts` als statische Route (Astro läuft hier
mit `output: 'static'`, also über `GET` mit `Astro.site`).

Inhalt:

```
User-agent: *
Allow: /

Sitemap: https://viennagrandchauffeurs.at/sitemap.xml
```

**Fallstricke, die das Prüfskript abfängt:**

- Der `Sitemap:`-Eintrag muss eine **absolute** URL sein, sonst ignoriert
  Google ihn kommentarlos. Domain aus `Astro.site` ableiten, nicht hartkodieren.
- **Niemals `/_astro/`, `/images/` oder `/fonts/` sperren.** Google kann die
  Seite sonst nicht rendern und bewertet Layout und Core Web Vitals falsch.
- Kein `noindex:` in der robots.txt – das unterstützt Google seit September
  2019 nicht mehr, es ist wirkungslos.
- Nichts sperren, was in der Sitemap steht.

---

## Abschluss

```
npm run build
npm run seo
```

**Zielbild nach den vier Aufgaben:**

| Meldung | vorher | nachher |
|---|---|---|
| `robots-missing` | 1 | 0 |
| `og-missing` | 50 | 0 |
| `twitter-missing` | 50 | 0 |
| `business-missing` | 1 | 0 |
| `schema-missing` | 12 | deutlich niedriger |
| `unreachable` | 2 | 0 (Seiten sind dann noindex) |

Übrig bleiben dürfen: die zwei `canonical-not-self` und zwei `sitemap-gap` der
`chauffeurservice`-Seiten (gewollt), der tote `/en/404/`-Link (kosmetisch)
sowie die Bild-Warnungen – die gehören zum separaten Thema unten.

Zum Schluss die Änderungen zusammenfassen und **fragen, bevor committet wird**.
Der Branch ist `main`; für die Änderungen vorher einen eigenen Branch anlegen.

---

## Ausdrücklich NICHT Teil dieses Auftrags

**Bilder auf `astro:assets` umstellen.** Das Audit zeigt: kein einziger Import
von `astro:assets` im Projekt, dafür 25 rohe `<img>`-Tags; auf einer
Leistungsseite liegen 48 Bilder als unkomprimiertes JPG/PNG ohne `srcset`, auf
40 Seiten fehlen `width`/`height` (Layout-Shift). Das ist der größte
Performance-Hebel, aber ein eigener, umfangreicher Umbau – **hier nicht
anfangen**, sondern separat beauftragen.

Ebenfalls nicht Teil des Auftrags: Titles, Descriptions, Fließtexte, FAQ-Inhalte
oder interne Verlinkung inhaltlich zu bewerten oder umzuschreiben.
