# Adressen im Repo — Befund

Im Projekt stehen **zwei verschiedene Anschriften** für dasselbe Unternehmen.
Beide sind veröffentlicht, beide erscheinen im ausgelieferten HTML. Dieses
Dokument hält nur fest, **wo** sie stehen und **was daran hängt** — es trifft
keine Entscheidung und schlägt keine Änderung vor.

Stand: Build mit 51 Seiten, geprüft am ausgelieferten HTML.

---

## Adresse A — Daponetegasse 7/6, 1030 Wien

Erscheint unter dem Label „Standort" / „Location".

| Datei | Zeile | Wirkung |
|---|---|---|
| `src/lib/i18n.ts` | 43 (DE), 58 (EN) | Footer — steht auf **allen 51 Seiten** |
| `src/components/ContactPage.astro` | 20 (DE), 33 (EN) | Kontaktblock auf `/kontakt/` und `/en/contact/` |
| `src/lib/site.ts` | `ADDRESS`, ab Zeile 28 | speist `PostalAddress` im **LocalBusiness-Schema** |

Die EN-Varianten schreiben „1030 Vienna, Austria", die DE-Varianten „1030 Wien".

`ADDRESS` in `site.ts` ist im Zuge des SEO-Auftrags neu hinzugekommen; die
beiden anderen Fundstellen bestanden vorher schon und wurden nicht angefasst.
Die drei Stellen sind **nicht** miteinander verdrahtet — `i18n.ts` und
`ContactPage.astro` halten je einen fertigen Satz, `site.ts` die Einzelfelder.

## Adresse B — Grellgasse 14/4/12, 1210 Wien

Erscheint als Anschrift der **VT-Limousinen Service GmbH**.

| Datei | Zeile | Kontext |
|---|---|---|
| `src/pages/impressum.astro` | 14, 45 | „Angaben gemäß § 5 TMG" und „Verantwortlich für den Inhalt" |
| `src/pages/en/impressum.astro` | 14, 45 | dieselben zwei Blöcke, EN |
| `src/pages/datenschutz.astro` | 15 | Verantwortlicher im Sinne der DSGVO |
| `src/pages/en/datenschutz.astro` | 15 | dto., EN |

Die Impressen nennen zusätzlich Firmenbuchnummer (FN 421497 z), UID
(ATU 69478479) und das Firmenbuchgericht Wien.

Randnotiz, unabhängig von der eigentlichen Frage: auch die **deutschen**
Rechtsseiten schreiben „1210 Vienna, Austria" statt „1210 Wien".

`src/pages/agb.astro` und `src/pages/en/agb.astro` nennen die
VT-Limousinen Service GmbH namentlich, aber ohne Anschrift.

---

## Was daran hängt

**Das LocalBusiness-Schema führt aktuell Adresse A.** Es steht genau einmal im
Build, auf der deutschen Startseite, unter der festen
`@id: https://viennagrandchauffeurs.at/#business`, und trägt:

- `name`: Vienna Grand Chauffeurs
- `legalName`: VT-Limousinen Service GmbH
- `address`: Daponetegasse 7/6, 1030 Wien, AT

Damit beschreibt **ein** Schema-Knoten eine Firma, deren Rechtsseiten auf
derselben Domain eine **andere** Anschrift ausweisen.

Relevant ist das aus drei Richtungen:

1. **NAP-Konsistenz.** Google gleicht Name, Adresse und Telefonnummer aus dem
   Schema mit dem ab, was sonst auf der Domain und in externen Quellen
   (Google-Unternehmensprofil, Branchenverzeichnisse) steht. Zwei Anschriften
   unter einem Firmennamen sind ein uneindeutiges Signal — besonders, weil das
   Impressum als vertrauenswürdige Quelle gilt.

2. **Local Pack / Unternehmensprofil.** Für die Aufnahme ins Local Pack zählt
   die Adresse im Google-Unternehmensprofil. Weicht die Schema-Adresse davon
   ab, stützt das Schema den Eintrag nicht, sondern widerspricht ihm.

3. **Rechtlich.** Die Impressumsangabe (§ 5 ECG, § 25 MedienG) ist die
   verbindliche Anschrift des Medieninhabers. Was im Schema steht, ändert daran
   nichts — die beiden Angaben stehen aber unverbunden nebeneinander.

Ein Wechsel der Schema-Adresse wäre technisch folgenlos: `ADDRESS` in
`src/lib/site.ts` ist die einzige Quelle, aus der das Schema liest.

---

## Was der Kunde beantworten muss

Die eigentliche Frage ist nicht „welche Adresse ins Schema", sondern **was die
beiden Adressen jeweils sind**:

1. **Ist die Daponetegasse 7/6 ein Betriebsstandort** — also ein Ort, an dem
   das Unternehmen tatsächlich tätig ist, Kunden empfängt oder Personal sitzt?
   Oder ist es eine reine Korrespondenz-/Zustelladresse?

2. **Ist die Grellgasse 14/4/12 ausschließlich der Firmensitz** laut
   Firmenbuch, oder wird von dort auch operativ gearbeitet?

3. **Welche Adresse ist im Google-Unternehmensprofil hinterlegt?** Die
   Schema-Adresse sollte mit dieser übereinstimmen, sonst arbeiten beide
   Signale gegeneinander.

4. **Sind es zwei reale, getrennte Standorte?** Dann ist die saubere
   Modellierung eine andere als bei „eine Firma, zwei Schreibweisen derselben
   Sache" — im ersten Fall braucht es zwei Einträge, im zweiten muss eine der
   beiden Angaben im Code korrigiert werden.

Solange das nicht geklärt ist, bleibt der Widerspruch bewusst im Code stehen.
Er wurde im Rahmen des SEO-Auftrags **nicht** aufgelöst.
