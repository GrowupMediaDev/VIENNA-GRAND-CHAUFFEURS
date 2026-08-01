// Vienna Grand Chauffeurs — content for every Fahrzeuge (vehicle) page.
// One entry per vehicle drives the shared /fahrzeuge/[slug].astro template.
// German placeholder copy; images reuse existing assets until the real
// (nano-banana-regenerated) vehicle photos land.

export interface PriceCard {
  title: string;
  sub: string;
  price: string;
  unit: string;
  desc: string;
  cta: string;
  featured?: boolean;
}

export interface Vehicle {
  slug: string;
  name: string;        // short, e.g. 'E-Klasse' — used on fleet cards
  heroTitle: string;   // e.g. 'Mercedes-Benz E-Klasse'
  klass: string;       // hero pill category, e.g. 'Business Class'
  group: string;       // overview grouping, e.g. 'Business Class Limousine'
  cardKlass: string;   // fleet-card label, e.g. 'Business Class · Limousine'
  cardSpecs: string;   // fleet-card spec line
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  heroStats: { label: string; value: string; accent?: string }[];
  img: { hero: string; ueberblick: string; vorteil: string; kabineBg: string; gallery: string[]; card: string };
  vover: { titleLead: string; titleAccent: string; body: string };
  galTitle: string;
  kab: { title: string; lead: string };
  vben: { title: string; body: string; items: string[]; badge: { big: string; sm: string } };
  vprice: { title: string; sub: string; cards: [PriceCard, PriceCard, PriceCard] };
  faq: { q: string; a: string }[];
}

const KAB_BG = '/images/fahrzeuge/kabine-bg.jpg';

const INCLUDED_FAQ = (name: string) => [
  { q: `Wie buche ich die ${name}?`, a: 'Ganz einfach online über unser Anfrageformular oder telefonisch. Nennen Sie uns Datum, Uhrzeit und Adresse — Sie erhalten umgehend eine Bestätigung mit Fixpreis.' },
  { q: 'Was passiert, wenn mein Flug Verspätung hat?', a: 'Wir überwachen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an. Auch bei Verspätungen entstehen Ihnen keine zusätzlichen Kosten.' },
  { q: 'Wo wartet mein Chauffeur bei der Ankunft?', a: 'Ihr Chauffeur erwartet Sie mit Namensschild direkt in der Ankunftshalle und begleitet Sie mit Ihrem Gepäck bis zum Fahrzeug.' },
  { q: 'Ist der Preis festgelegt oder variabel?', a: 'Sie erhalten einen transparenten Fixpreis bereits bei der Buchung — inklusive Maut, Wartezeit und MwSt., ganz ohne versteckte Kosten.' },
];

export const VEHICLES_DATA: Vehicle[] = [
  {
    slug: 'e-klasse',
    name: 'E-Klasse',
    heroTitle: 'Mercedes-Benz E-Klasse',
    klass: 'Business Class',
    group: 'Business Class Limousine',
    cardKlass: 'Business Class · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Business & Transfer',
    metaTitle: 'Mercedes-Benz E-Klasse — Vienna Grand Chauffeurs',
    metaDescription: 'Die Mercedes-Benz E-Klasse: Business-Class-Limousine für Chauffeurfahrten in Wien und ganz Österreich. Bis zu 3 Gäste, Nappa-Leder, transparente Fixpreise.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Karosserie', value: 'Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/e-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-e-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-e-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/e-klasse-gal-1.jpg', '/images/fahrzeuge/e-klasse-gal-2.jpg', '/images/fahrzeuge/e-klasse-gal-3.jpg', '/images/fahrzeuge/e-klasse-gal-4.jpg', '/images/fahrzeuge/e-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-e-klasse.jpg' },
    vover: { titleLead: 'Die meistgewählte Klasse für', titleAccent: 'Business & Transfer.', body: 'Die Mercedes-Benz E-Klasse ist unser Allrounder — souverän genug für den repräsentativen Geschäftstermin, komfortabel genug für die entspannte Fahrt vom Flughafen ins Hotel. Drei Gäste reisen mit Gepäck, in einer Kabine, die zur Ruhe kommt.' },
    galTitle: 'Die E-Klasse in Wien.',
    kab: { title: 'Eine Kabine, die zur Ruhe kommt.', lead: 'Vom Moment des Einsteigens an: gedämpfte Geräusche, kühle Luft, ein Glas Wasser in Reichweite. Alles ist vorbereitet, damit Sie sich um nichts kümmern müssen.' },
    vben: {
      title: 'Mehr Komfort, weniger Kompromiss.',
      body: 'Die E-Klasse ist die kluge Wahl für alle, die souverän reisen, ohne zu viel des Guten. Premium-Komfort, diskrete Eleganz und ein ruhiger Innenraum, der zum Geschäftstermin genauso passt wie zur entspannten Fahrt vom Flughafen nach Hause.',
      items: ['Nappa-Leder und ruhiger Innenraum', 'Bis zu 3 Gäste mit Gepäck, ideal für Business und Transfer', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: '24/7', sm: 'Für Sie bereit' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€60', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — vom Gate bis zur Haustür.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 2 Stunden', price: '€60', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für Termine, Shopping oder Events in der Stadt. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€480', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Ganztagestermine, Ausflüge und Roadshows.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('E-Klasse'),
      { q: 'Wie viele Gäste passen in die E-Klasse?', a: 'Die E-Klasse bietet Platz für bis zu 3 Gäste mit 2–3 Koffern — ideal für Business und Flughafentransfer.' },
      { q: 'Brauche ich mehr Platz?', a: 'Für Gruppen oder viel Gepäck steht Ihnen unsere Mercedes V-Klasse mit bis zu sieben Sitzplätzen zur Verfügung.' },
    ],
  },


  {
    slug: 'vito',
    name: 'Vito',
    heroTitle: 'Mercedes-Benz Vito',
    klass: 'Van',
    group: 'Van',
    cardKlass: 'Van · Shuttle',
    cardSpecs: '7 Gäste · 7 Koffer · Gruppen & Gepäck',
    metaTitle: 'Mercedes-Benz Vito — Vienna Grand Chauffeurs',
    metaDescription: 'Der Mercedes-Benz Vito: praktischer Van für bis zu 7 Gäste in Wien und ganz Österreich. Ideal für Gruppen, Gepäck und Shuttle-Fahrten zum günstigen Fixpreis.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 7', accent: 'Max.' },
      { label: 'Gepäck', value: 'Bis 7 Koffer' },
      { label: 'Karosserie', value: 'Van' },
    ],
    img: { hero: '/images/fahrzeuge/vito-gal-1.webp', ueberblick: '/images/fahrzeuge/vito-gal-3.webp', vorteil: '/images/fahrzeuge/vorteil-vito.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vito-gal-1.webp', '/images/fahrzeuge/vito-gal-2.webp', '/images/fahrzeuge/vito-gal-3.webp', '/images/fahrzeuge/vito-gal-4.webp', '/images/fahrzeuge/vito-gal-5.webp'], card: '/images/fahrzeuge/card-vito.webp' },
    vover: { titleLead: 'Der praktische Van für', titleAccent: 'Gruppen & Gepäck.', body: 'Der Mercedes-Benz Vito ist unser vielseitiger Van: bis zu sieben Gäste reisen bequem und mit reichlich Gepäck. Die kluge Wahl, wenn eine Gruppe zusammenbleiben soll — vom Flughafentransfer über den Firmenausflug bis zur Fahrt mit der ganzen Familie.' },
    galTitle: 'Der Vito in Wien.',
    kab: { title: 'Raum für alle, die mitfahren.', lead: 'Bequeme Einzelsitze, gute Übersicht und ein klimatisierter Innenraum — im Vito reist die Gruppe entspannt und gemeinsam, mit Platz für Koffer und Handgepäck.' },
    vben: {
      title: 'Gemeinsam ankommen, ohne Aufpreis.',
      body: 'Der Vito ist die preisbewusste Alternative zur V-Klasse: derselbe Platz für sieben Gäste und ihr Gepäck, dieselbe sorgfältige Betreuung durch unsere Chauffeure — zum günstigeren Fixpreis.',
      items: ['Bis zu 7 Gäste plus großzügiger Gepäckraum', 'Ideal für Gruppen, Familien und Firmentransfers', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: '7', sm: 'Sitzplätze' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€70', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — für die ganze Gruppe.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 3 Stunden', price: '€70', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für Gruppen, Events und Stadtfahrten. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€510', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Ausflüge, Roadshows und Gruppenprogramme.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('Vito'),
      { q: 'Wie viele Gäste passen in den Vito?', a: 'Der Vito bietet Platz für bis zu 7 Gäste mit reichlich Gepäck — ideal für Gruppen und Familien.' },
      { q: 'Worin unterscheidet sich der Vito von der V-Klasse?', a: 'Beide bieten Platz für bis zu 7 Gäste. Die V-Klasse ist die luxuriösere Ausstattungslinie mit hochwertigerem Interieur; der Vito bringt dieselbe Gruppe zum günstigeren Fixpreis ans Ziel.' },
    ],
  },

  {
    slug: 'v-klasse',
    name: 'V-Klasse',
    heroTitle: 'Mercedes-Benz V-Klasse',
    klass: 'Business Van',
    group: 'Business Minivan',
    cardKlass: 'Business Van · Shuttle',
    cardSpecs: '7 Gäste · 7 Koffer · Gruppen & Gepäck',
    metaTitle: 'Mercedes-Benz V-Klasse — Vienna Grand Chauffeurs',
    metaDescription: 'Die Mercedes-Benz V-Klasse: geräumiger Business-Van für bis zu 7 Gäste in Wien und ganz Österreich. Ideal für Gruppen, Gepäck und Shuttle-Service.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 7', accent: 'Max.' },
      { label: 'Gepäck', value: 'Bis 7 Koffer' },
      { label: 'Karosserie', value: 'Van' },
    ],
    img: { hero: '/images/fahrzeuge/v-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-v-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-v-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/v-klasse-gal-1.jpg', '/images/fahrzeuge/v-klasse-gal-2.jpg', '/images/fahrzeuge/v-klasse-gal-3.jpg', '/images/fahrzeuge/v-klasse-gal-4.jpg', '/images/fahrzeuge/v-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-v-klasse.jpg' },
    vover: { titleLead: 'Viel Platz für', titleAccent: 'Gruppen & Gepäck.', body: 'Die Mercedes-Benz V-Klasse ist unser geräumiger Business-Van: bis zu sieben Gäste reisen komfortabel und mit reichlich Gepäck. Ideal für Familien, Delegationen, Firmengruppen oder den Flughafentransfer, wenn es etwas mehr Raum sein darf.' },
    galTitle: 'Die V-Klasse in Wien.',
    kab: { title: 'Raum, der zusammenbringt.', lead: 'Großzügige Sitze, viel Beinfreiheit und ein ruhiger Innenraum — in der V-Klasse reist die ganze Gruppe entspannt und gemeinsam. Klimatisiert, gepflegt und auf Komfort ausgelegt.' },
    vben: {
      title: 'Gemeinsam reisen, ohne Kompromisse.',
      body: 'Die V-Klasse ist die richtige Wahl, wenn Platz und Komfort zusammenkommen sollen. Ob Gruppentransfer, Firmenausflug oder Fahrt mit viel Gepäck — hier reist niemand beengt.',
      items: ['Bis zu 7 Gäste plus großzügiger Gepäckraum', 'Ideal für Gruppen, Familien und Firmentransfers', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: '7', sm: 'Sitzplätze' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€80', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — für die ganze Gruppe.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 2 Stunden', price: '€80', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für Gruppen, Events und Stadtfahrten. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€640', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Ausflüge, Roadshows und Gruppenprogramme.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('V-Klasse'),
      { q: 'Wie viele Gäste passen in die V-Klasse?', a: 'Die V-Klasse bietet Platz für bis zu 7 Gäste mit reichlich Gepäck — ideal für Gruppen und Familien.' },
      { q: 'Eignet sich die V-Klasse für den Flughafentransfer mit viel Gepäck?', a: 'Ja. Dank des großzügigen Gepäckraums ist die V-Klasse ideal, wenn mehrere Personen mit viel Gepäck reisen.' },
    ],
  },

  {
    slug: 's-klasse',
    name: 'S-Klasse',
    heroTitle: 'Mercedes-Benz S-Klasse',
    klass: 'First Class',
    group: 'First Class Limousine',
    cardKlass: 'First Class · Limousine',
    cardSpecs: '3 Gäste · 2–4 Koffer · VIP & Repräsentation',
    metaTitle: 'Mercedes-Benz S-Klasse — Vienna Grand Chauffeurs',
    metaDescription: 'Die Mercedes-Benz S-Klasse: First-Class-Limousine für repräsentative Chauffeurfahrten in Wien und ganz Österreich. Höchster Komfort, VIP-Service, Fixpreise.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–4 Koffer' },
      { label: 'Karosserie', value: 'Luxus-Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/s-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-s-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-s-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/s-klasse-gal-1.jpg', '/images/fahrzeuge/s-klasse-gal-2.jpg', '/images/fahrzeuge/s-klasse-gal-3.jpg', '/images/fahrzeuge/s-klasse-gal-4.jpg', '/images/fahrzeuge/s-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-s-klasse.jpg' },
    vover: { titleLead: 'Erste Klasse für', titleAccent: 'VIP & Repräsentation.', body: 'Die Mercedes-Benz S-Klasse ist unser Flaggschiff — die erste Wahl, wenn Repräsentation und höchster Komfort zusammenkommen. Ein ruhiger, großzügiger Innenraum, edle Materialien und ein souveränes Auftreten für Ihren wichtigsten Auftritt.' },
    galTitle: 'Die S-Klasse in Wien.',
    kab: { title: 'Der Gipfel der Ruhe.', lead: 'Weiche Nappa-Ledersitze, feinste Verarbeitung und eine Stille, die den Alltag draußen lässt. In der S-Klasse wird jede Fahrt zum Rückzugsort erster Klasse.' },
    vben: {
      title: 'Wenn nur das Beste zählt.',
      body: 'Die S-Klasse ist die kompromisslose Wahl für repräsentative Anlässe, VIP-Gäste und Momente, in denen der erste Eindruck entscheidet. Höchster Komfort, absolute Diskretion und ein Auftritt, der in Erinnerung bleibt.',
      items: ['Feinste Nappa-Lederausstattung und maximale Ruhe', 'Bis zu 3 Gäste mit Gepäck, ideal für VIP und Repräsentation', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: 'VIP', sm: 'Erste Klasse' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€120', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — First-Class-Komfort.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 2 Stunden', price: '€90', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für VIP-Termine, Events und Repräsentation. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€720', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Staatsbesuche, Roadshows und wichtige Anlässe.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('S-Klasse'),
      { q: 'Wofür eignet sich die S-Klasse besonders?', a: 'Die S-Klasse ist unsere First-Class-Limousine für repräsentative Anlässe, VIP-Gäste und wichtige Geschäftstermine.' },
      { q: 'Wie viele Gäste passen in die S-Klasse?', a: 'Die S-Klasse bietet Platz für bis zu 3 Gäste mit 2–4 Koffern in höchstem Komfort.' },
    ],
  },

  {
    slug: 'maybach',
    name: 'Maybach',
    heroTitle: 'Mercedes-Maybach S-Klasse',
    klass: 'Luxury Class',
    group: 'Luxury Class Limousine',
    cardKlass: 'Luxury Class · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Ultimativer Luxus',
    metaTitle: 'Mercedes-Maybach S-Klasse — Vienna Grand Chauffeurs',
    metaDescription: 'Die Mercedes-Maybach S-Klasse: das Flaggschiff für höchste Ansprüche. Chauffeurservice der Luxusklasse in Wien und ganz Österreich — für Staatsgäste, VIP und exklusive Anlässe.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Karosserie', value: 'Luxus-Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/maybach-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-maybach.jpg', vorteil: '/images/fahrzeuge/vorteil-maybach.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/maybach-gal-1.jpg', '/images/fahrzeuge/maybach-gal-2.jpg', '/images/fahrzeuge/maybach-gal-3.jpg', '/images/fahrzeuge/maybach-gal-4.jpg', '/images/fahrzeuge/maybach-gal-5.jpg'], card: '/images/fahrzeuge/card-maybach.jpg' },
    vover: { titleLead: 'Das Flaggschiff für', titleAccent: 'höchste Ansprüche.', body: 'Die Mercedes-Maybach S-Klasse ist die Krönung unserer Flotte — dort, wo die S-Klasse aufhört, beginnt der Maybach. Handverlesene Materialien, ein Fond mit Liegesitz-Komfort und eine Präsenz, die jeden Auftritt zum Staatsempfang macht.' },
    galTitle: 'Der Maybach in Wien.',
    kab: { title: 'Erste Reihe im Fond.', lead: 'Elektrisch verstellbare Executive-Sitze mit Wadenauflage und Massagefunktion, Maybach-Nackenkissen und eine fast vollständige Stille. Im Fond des Maybach reisen Sie wie in einer privaten Lounge.' },
    vben: {
      title: 'Wenn nur das Allerbeste genügt.',
      body: 'Der Mercedes-Maybach S-Klasse ist die kompromissloseste Wahl für Staatsgäste, Vorstände und Anlässe, bei denen jede Geste zählt. Maximale Diskretion, chauffeurgeführter Luxus und ein Auftritt, der Maßstäbe setzt.',
      items: ['Handverarbeitetes Maybach-Interieur mit Executive-Fondsitzen', 'Bis zu 3 Gäste mit Gepäck — konzipiert für das Reisen im Fond', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: 'S', sm: 'Maybach' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€220', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — Ankunft im Luxusklasse-Fond.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 3 Stunden', price: '€190', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — für Staatsgäste, VIP-Programme und exklusive Anlässe. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€1.520', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Staatsbesuche, Roadshows und repräsentative Termine.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('Mercedes-Maybach S-Klasse'),
      { q: 'Worin unterscheidet sich der Maybach von der S-Klasse?', a: 'Der Maybach ist die Luxusklasse-Variante der S-Klasse: mehr Beinraum im Fond, Executive-Sitze mit Massage- und Liegefunktion, handverarbeitete Materialien und maximale Ruhe — konzipiert für das Reisen im Fond.' },
      { q: 'Für welche Anlässe eignet sich der Maybach?', a: 'Der Maybach ist die erste Wahl für Staatsgäste, Vorstände, Hochzeiten und Anlässe, bei denen höchste Repräsentation gefragt ist.' },
    ],
  },

  {
    slug: 'mercedes-eqe',
    name: 'Mercedes EQE',
    heroTitle: 'Mercedes-Benz EQE',
    klass: 'Elektro',
    group: 'Elektrofahrzeuge',
    cardKlass: 'Elektro · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Emissionsfrei',
    metaTitle: 'Mercedes-Benz EQE — Vienna Grand Chauffeurs',
    metaDescription: 'Der vollelektrische Mercedes-Benz EQE: emissionsfreier Chauffeurservice in Wien und ganz Österreich. Bis zu 3 Gäste, leise, komfortabel, transparente Fixpreise.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Antrieb', value: 'Elektro' },
    ],
    img: { hero: '/images/fahrzeuge/mercedes-eqe-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-mercedes-eqe.jpg', vorteil: '/images/fahrzeuge/vorteil-mercedes-eqe.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/mercedes-eqe-gal-1.jpg', '/images/fahrzeuge/mercedes-eqe-gal-2.jpg', '/images/fahrzeuge/mercedes-eqe-gal-3.jpg', '/images/fahrzeuge/mercedes-eqe-gal-4.jpg', '/images/fahrzeuge/mercedes-eqe-gal-5.jpg'], card: '/images/fahrzeuge/card-mercedes-eqe.jpg' },
    vover: { titleLead: 'Emissionsfrei und', titleAccent: 'flüsterleise.', body: 'Der vollelektrische Mercedes-Benz EQE verbindet nachhaltige Mobilität mit dem Komfort der Oberklasse. Ein flüsterleiser Antrieb, ein ruhiger Innenraum und emissionsfreies Fahren — ideal für umweltbewusste Reisende, die auf nichts verzichten möchten.' },
    galTitle: 'Der EQE in Wien.',
    kab: { title: 'Stille in neuer Dimension.', lead: 'Ohne Motorengeräusch wird der Innenraum des EQE noch ruhiger. Sanftes Anfahren, kühle Luft und feinste Materialien machen jede Fahrt zu einem entspannten, nachhaltigen Erlebnis.' },
    vben: {
      title: 'Nachhaltig reisen, ohne Kompromiss.',
      body: 'Der EQE ist die Wahl für alle, die Wert auf Nachhaltigkeit legen, ohne beim Komfort Abstriche zu machen. Emissionsfrei, flüsterleise und mit dem gewohnten Premium-Anspruch von Vienna Grand Chauffeurs.',
      items: ['Vollelektrisch und emissionsfrei unterwegs', 'Flüsterleiser Antrieb und besonders ruhiger Innenraum', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: '0', sm: 'Emissionen' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€90', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit, Meet & Greet und Gepäckservice — emissionsfrei ans Ziel.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 2 Stunden', price: '€80', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — nachhaltig unterwegs bei Terminen und Events. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€640', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — emissionsfrei für Ausflüge und Roadshows.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('EQE'),
      { q: 'Ist der EQE wirklich vollelektrisch?', a: 'Ja. Der Mercedes-Benz EQE fährt rein elektrisch und damit lokal emissionsfrei und besonders leise.' },
      { q: 'Muss ich mit Ladepausen rechnen?', a: 'Nein. Wir planen jede Fahrt so, dass der EQE einsatzbereit ist — Ladepausen fallen für Sie nicht ins Gewicht.' },
    ],
  },

  {
    slug: 'vip-minibus',
    name: 'VIP Sprinter',
    heroTitle: 'Mercedes-Benz VIP Sprinter',
    klass: 'VIP Class',
    group: 'VIP Class Minibus',
    cardKlass: 'VIP Class · Minibus',
    cardSpecs: 'Bis 12 Gäste · Lounge-Interieur · VIP-Gruppen',
    metaTitle: 'VIP Sprinter Minibus — Vienna Grand Chauffeurs',
    metaDescription: 'Der VIP Sprinter Minibus: handveredelter Luxus-Van mit Lounge-Interieur, Captain-Sitzen und Ambientelicht für bis zu 12 Gäste. Exklusiver Gruppentransport in Wien und ganz Österreich.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Bis 12', accent: 'Bis' },
      { label: 'Interieur', value: 'VIP-Lounge' },
      { label: 'Karosserie', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/vip-minibus-hero.webp', ueberblick: '/images/fahrzeuge/ueberblick-vip-minibus.webp', vorteil: '/images/fahrzeuge/vorteil-vip-minibus.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vip-minibus-gal-1.jpg', '/images/fahrzeuge/vip-minibus-gal-2.jpg', '/images/fahrzeuge/vip-minibus-gal-3.jpg', '/images/fahrzeuge/vip-minibus-gal-4.jpg', '/images/fahrzeuge/vip-minibus-gal-5.jpg'], card: '/images/fahrzeuge/card-vip-minibus.webp' },
    vover: { titleLead: 'Die Luxus-Lounge für', titleAccent: 'VIP-Gruppen.', body: 'Der VIP Sprinter Minibus ist unser exklusiver Van für Gruppen, die gemeinsam und trotzdem erste Klasse reisen wollen. Ein handveredeltes Lounge-Interieur mit Captain-Sitzen, Ambientelicht und Entertainment macht jede Fahrt zum Erlebnis — weit mehr als ein reiner Transfer.' },
    galTitle: 'Der VIP Sprinter in Wien.',
    kab: { title: 'Eine Lounge auf Rädern.', lead: 'Einzelne Captain-Sitze in Zweifarb-Leder, ausklappbare Tische, stimmungsvolles Ambientelicht und ein großer Entertainment-Bildschirm. Im VIP Sprinter reist die ganze Gruppe wie in einer privaten First-Class-Lounge.' },
    vben: {
      title: 'Gemeinsam reisen, in erster Klasse.',
      body: 'Der VIP Sprinter Minibus verbindet den Platz eines Vans mit dem Komfort einer Luxuslimousine. Ideal für Delegationen, Roadshows, Firmenevents und exklusive Gruppen, die unterwegs arbeiten, entspannen oder feiern möchten — ohne auf Stil zu verzichten.',
      items: ['Handveredeltes Lounge-Interieur mit einzelnen Captain-Sitzen', 'Bis zu 12 Gäste mit Ambientelicht, Tischen und Entertainment', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: 'VIP', sm: 'Lounge' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€220', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit und Gepäckservice — die ganze Gruppe im VIP-Lounge-Interieur.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 3 Stunden', price: '€90', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für Roadshows, Firmenevents und VIP-Programme. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€650', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Delegationen, Touren und exklusive Gruppenanlässe.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('VIP Sprinter Minibus'),
      { q: 'Worin unterscheidet sich der VIP Sprinter vom Business Sprinter?', a: 'Der Business Sprinter ist unser geräumiges Gruppenfahrzeug für bis zu 20 Gäste. Der VIP Sprinter Minibus hat dagegen ein handveredeltes Lounge-Interieur mit einzelnen Captain-Sitzen, Ambientelicht und Entertainment für bis zu 12 Gäste — Luxus statt reiner Kapazität.' },
      { q: 'Für welche Anlässe eignet sich der VIP Sprinter?', a: 'Ideal für Delegationen, Roadshows, Firmenevents, Hochzeiten und exklusive Gruppen, die gemeinsam in First-Class-Komfort unterwegs sein möchten.' },
    ],
  },

  {
    slug: 'business-sprinter',
    name: 'Sprinter',
    heroTitle: 'Mercedes-Benz Sprinter',
    klass: 'Sprinter',
    group: 'Business Sprinter',
    cardKlass: 'Business · Sprinter',
    cardSpecs: 'Bis 20 Gäste · viel Gepäck · Gruppen & Events',
    metaTitle: 'Mercedes-Benz Sprinter — Vienna Grand Chauffeurs',
    metaDescription: 'Der Mercedes-Benz Sprinter: geräumiges Gruppenfahrzeug für bis zu 20 Gäste in Wien und ganz Österreich. Ideal für Events, Delegationen und Transfers.',
    heroSub: 'Premium Chauffeurservice in Wien & Österreich, ganz nach Ihren Wünschen',
    heroStats: [
      { label: 'Passagiere', value: 'Bis 20', accent: 'Bis' },
      { label: 'Gepäck', value: 'Sehr viel' },
      { label: 'Karosserie', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/business-sprinter-gal-1.webp', ueberblick: '/images/fahrzeuge/ueberblick-business-sprinter.webp', vorteil: '/images/fahrzeuge/vorteil-business-sprinter.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/business-sprinter-gal-1.webp', '/images/fahrzeuge/business-sprinter-gal-2.webp', '/images/fahrzeuge/business-sprinter-gal-3.webp', '/images/fahrzeuge/business-sprinter-gal-4.webp', '/images/fahrzeuge/business-sprinter-gal-5.webp'], card: '/images/fahrzeuge/card-business-sprinter.jpg' },
    vover: { titleLead: 'Das große Fahrzeug für', titleAccent: 'Gruppen & Events.', body: 'Der Mercedes-Benz Sprinter bringt große Gruppen komfortabel und gemeinsam ans Ziel. Mit Platz für bis zu 20 Gäste und reichlich Gepäck ist er die ideale Lösung für Events, Delegationen, Betriebsausflüge und größere Transfers.' },
    galTitle: 'Der Sprinter in Wien.',
    kab: { title: 'Platz für die ganze Gruppe.', lead: 'Bequeme Sitze, großzügige Stehhöhe und viel Raum für Gepäck — der Business Sprinter bringt große Gruppen entspannt und gemeinsam ans Ziel, ohne dass jemand beengt sitzt.' },
    vben: {
      title: 'Große Gruppen, ein Fahrzeug.',
      body: 'Der Mercedes-Benz Sprinter ist die Antwort, wenn viele Personen gemeinsam reisen sollen. Statt mehrerer Fahrzeuge bleibt die Gruppe zusammen — koordiniert, komfortabel und mit einem erfahrenen Chauffeur am Steuer.',
      items: ['Platz für bis zu 20 Gäste plus viel Gepäck', 'Ideal für Events, Delegationen und Betriebsausflüge', 'Erfahrene Chauffeure, diskret, pünktlich, mit Flugüberwachung', 'Fixpreise ohne versteckte Kosten'],
      badge: { big: '20', sm: 'Sitzplätze' },
    },
    vprice: {
      title: 'Transparente Festpreise.',
      sub: 'Keine versteckten Kosten — Wartezeit, Maut und Parkgebühren sind immer inklusive. Bei Buchung garantiert.',
      cards: [
        { title: 'Flughafentransfer', sub: 'Festpreis pro Strecke', price: '€170', unit: '/ Strecke', desc: 'Inkl. 60 Min. Wartezeit und Gepäckservice — die ganze Gruppe in einem Fahrzeug.', cta: 'Transfer buchen', featured: true },
        { title: 'Stundensatz', sub: 'Mindestens 3 Stunden', price: '€80', unit: '/ Stunde', desc: 'Chauffeur zur freien Verfügung — ideal für Events, Ausflüge und Gruppenprogramme. Inkl. max. 20 km pro Stunde.', cta: 'Stunden buchen' },
        { title: 'Tagessatz', sub: '8 Stunden inklusive', price: '€590', unit: '/ Tag', desc: 'Ein Chauffeur für den ganzen Tag — für Betriebsausflüge, Touren und Events.', cta: 'Tag buchen' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ('Mercedes-Benz Sprinter'),
      { q: 'Wie viele Gäste passen in den Mercedes-Benz Sprinter?', a: 'Je nach Ausführung bietet der Sprinter Platz für bis zu 20 Gäste plus Gepäck — ideal für große Gruppen.' },
      { q: 'Eignet sich der Sprinter für mehrtägige Events?', a: 'Ja. Wir koordinieren einzelne Transfers ebenso wie mehrtägige Programme für Gruppen und Firmen.' },
    ],
  },
];

// ── English fleet ───────────────────────────────────────────────────────────
const INCLUDED_FAQ_EN = (name: string) => [
  { q: `How do I book the ${name}?`, a: 'Very easily online via our enquiry form or by phone. Give us the date, time and address — you will receive an immediate confirmation with a fixed price.' },
  { q: 'What happens if my flight is delayed?', a: 'We monitor your flight in real time and adjust the pickup time automatically. Even in the event of delays, no additional costs arise for you.' },
  { q: 'Where does my chauffeur wait on arrival?', a: 'Your chauffeur awaits you with a name sign right in the arrivals hall and accompanies you and your luggage to the vehicle.' },
  { q: 'Is the price fixed or variable?', a: 'You receive a transparent fixed price already at the time of booking — including tolls, waiting time and VAT, with no hidden costs whatsoever.' },
];

export const VEHICLES_DATA_EN: Vehicle[] = [
  {
    slug: 'e-klasse',
    name: 'E-Class',
    heroTitle: 'Mercedes-Benz E-Class',
    klass: 'Business Class',
    group: 'Business Class Sedan',
    cardKlass: 'Business Class · Sedan',
    cardSpecs: '3 guests · 2–3 cases · Business & Transfer',
    metaTitle: 'E-Class — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Benz E-Class: a business-class sedan for chauffeur journeys in Vienna and throughout Austria. Up to 3 guests, Nappa leather, transparent fixed prices.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Body', value: 'Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/e-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-e-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-e-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/e-klasse-gal-1.jpg', '/images/fahrzeuge/e-klasse-gal-2.jpg', '/images/fahrzeuge/e-klasse-gal-3.jpg', '/images/fahrzeuge/e-klasse-gal-4.jpg', '/images/fahrzeuge/e-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-e-klasse.jpg' },
    vover: { titleLead: 'The most chosen class for', titleAccent: 'Business & Transfer.', body: 'The Mercedes-Benz E-Class is our all-rounder — commanding enough for the prestigious business appointment, comfortable enough for the relaxed ride from the airport to your hotel. Three guests travel with luggage, in a cabin that settles into calm.' },
    galTitle: 'The E-Class in Vienna.',
    kab: { title: 'A cabin that settles into calm.', lead: 'From the moment you step in: muted sounds, cool air, a glass of water within reach. Everything is prepared so that you need not worry about a thing.' },
    vben: {
      title: 'More comfort, fewer compromises.',
      body: 'The E-Class is the smart choice for everyone who travels with composure, without overdoing it. Premium comfort, discreet elegance and a quiet interior that suits the business appointment just as well as the relaxed ride home from the airport.',
      items: ['Nappa leather and a quiet interior', 'Up to 3 guests with luggage, ideal for business and transfer', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: '24/7', sm: 'Ready for you' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€60', unit: '/ trip', desc: 'Incl. 60 min. waiting time, meet & greet and luggage service — from the gate to your front door.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 2 hours', price: '€60', unit: '/ hour', desc: 'A chauffeur at your disposal — ideal for appointments, shopping or events in the city. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€480', unit: '/ day', desc: 'A chauffeur for the whole day — for full-day appointments, excursions and roadshows.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('E-Class'),
      { q: 'How many guests fit in the E-Class?', a: 'The E-Class offers room for up to 3 guests with 2–3 cases — ideal for business and airport transfers.' },
      { q: 'Do I need more space?', a: 'For groups or a lot of luggage, our Mercedes V-Class with up to seven seats is available to you.' },
    ],
  },


  {
    slug: 'vito',
    name: 'Vito',
    heroTitle: 'Mercedes-Benz Vito',
    klass: 'Van',
    group: 'Van',
    cardKlass: 'Van · Shuttle',
    cardSpecs: '7 guests · 7 cases · Groups & Luggage',
    metaTitle: 'Mercedes-Benz Vito — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Benz Vito: a practical van for up to 7 guests in Vienna and throughout Austria. Ideal for groups, luggage and shuttle journeys at a favourable fixed price.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 7', accent: 'Max.' },
      { label: 'Luggage', value: 'Up to 7 cases' },
      { label: 'Body', value: 'Van' },
    ],
    img: { hero: '/images/fahrzeuge/vito-gal-1.webp', ueberblick: '/images/fahrzeuge/vito-gal-3.webp', vorteil: '/images/fahrzeuge/vorteil-vito.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vito-gal-1.webp', '/images/fahrzeuge/vito-gal-2.webp', '/images/fahrzeuge/vito-gal-3.webp', '/images/fahrzeuge/vito-gal-4.webp', '/images/fahrzeuge/vito-gal-5.webp'], card: '/images/fahrzeuge/card-vito.webp' },
    vover: { titleLead: 'The practical van for', titleAccent: 'Groups & Luggage.', body: 'The Mercedes-Benz Vito is our versatile van: up to seven guests travel comfortably and with ample luggage. The sensible choice when a group should stay together — from the airport transfer and the corporate outing to the journey with the whole family.' },
    galTitle: 'The Vito in Vienna.',
    kab: { title: 'Room for everyone on board.', lead: 'Comfortable individual seats, a clear view and an air-conditioned interior — in the Vito the group travels relaxed and together, with space for cases and hand luggage.' },
    vben: {
      title: 'Arrive together, without the surcharge.',
      body: 'The Vito is the cost-conscious alternative to the V-Class: the same room for seven guests and their luggage, the same attentive care from our chauffeurs — at a more favourable fixed price.',
      items: ['Up to 7 guests plus a generous luggage compartment', 'Ideal for groups, families and corporate transfers', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: '7', sm: 'Seats' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€70', unit: '/ trip', desc: 'Incl. 60 min. waiting time, meet & greet and luggage service — for the whole group.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 3 hours', price: '€70', unit: '/ hour', desc: 'A chauffeur at your disposal — ideal for groups, events and city journeys. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€510', unit: '/ day', desc: 'A chauffeur for the whole day — for excursions, roadshows and group programmes.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('Vito'),
      { q: 'How many guests fit in the Vito?', a: 'The Vito offers room for up to 7 guests with ample luggage — ideal for groups and families.' },
      { q: 'How does the Vito differ from the V-Class?', a: 'Both offer room for up to 7 guests. The V-Class is the more luxurious trim line with a higher-grade interior; the Vito takes the same group to their destination at a more favourable fixed price.' },
    ],
  },

  {
    slug: 'v-klasse',
    name: 'V-Class',
    heroTitle: 'Mercedes-Benz V-Class',
    klass: 'Business Van',
    group: 'Business Minivan',
    cardKlass: 'Business Van · Shuttle',
    cardSpecs: '7 guests · 7 cases · Groups & Luggage',
    metaTitle: 'V-Class — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Benz V-Class: a spacious business van for up to 7 guests in Vienna and throughout Austria. Ideal for groups, luggage and shuttle service.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 7', accent: 'Max.' },
      { label: 'Luggage', value: 'Up to 7 cases' },
      { label: 'Body', value: 'Van' },
    ],
    img: { hero: '/images/fahrzeuge/v-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-v-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-v-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/v-klasse-gal-1.jpg', '/images/fahrzeuge/v-klasse-gal-2.jpg', '/images/fahrzeuge/v-klasse-gal-3.jpg', '/images/fahrzeuge/v-klasse-gal-4.jpg', '/images/fahrzeuge/v-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-v-klasse.jpg' },
    vover: { titleLead: 'Plenty of room for', titleAccent: 'Groups & Luggage.', body: 'The Mercedes-Benz V-Class is our spacious business van: up to seven guests travel comfortably and with ample luggage. Ideal for families, delegations, corporate groups or the airport transfer, when a little more room is called for.' },
    galTitle: 'The V-Class in Vienna.',
    kab: { title: 'Room that brings people together.', lead: 'Generous seats, plenty of legroom and a quiet interior — in the V-Class the whole group travels relaxed and together. Air-conditioned, immaculately kept and designed for comfort.' },
    vben: {
      title: 'Travel together, without compromise.',
      body: 'The V-Class is the right choice when space and comfort should come together. Whether a group transfer, corporate outing or a journey with lots of luggage — here no one travels cramped.',
      items: ['Up to 7 guests plus a generous luggage compartment', 'Ideal for groups, families and corporate transfers', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: '7', sm: 'Seats' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€80', unit: '/ trip', desc: 'Incl. 60 min. waiting time, meet & greet and luggage service — for the whole group.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 2 hours', price: '€80', unit: '/ hour', desc: 'A chauffeur at your disposal — ideal for groups, events and city journeys. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€640', unit: '/ day', desc: 'A chauffeur for the whole day — for excursions, roadshows and group programmes.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('V-Class'),
      { q: 'How many guests fit in the V-Class?', a: 'The V-Class offers room for up to 7 guests with ample luggage — ideal for groups and families.' },
      { q: 'Is the V-Class suitable for the airport transfer with a lot of luggage?', a: 'Yes. Thanks to its generous luggage compartment, the V-Class is ideal when several people travel with a lot of luggage.' },
    ],
  },

  {
    slug: 's-klasse',
    name: 'S-Class',
    heroTitle: 'Mercedes-Benz S-Class',
    klass: 'First Class',
    group: 'First Class Sedan',
    cardKlass: 'First Class · Sedan',
    cardSpecs: '3 guests · 2–4 cases · VIP & Representation',
    metaTitle: 'S-Class — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Benz S-Class: a first-class sedan for prestigious chauffeur journeys in Vienna and throughout Austria. Ultimate comfort, VIP service, fixed prices.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–4 cases' },
      { label: 'Body', value: 'Luxury Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/s-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-s-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-s-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/s-klasse-gal-1.jpg', '/images/fahrzeuge/s-klasse-gal-2.jpg', '/images/fahrzeuge/s-klasse-gal-3.jpg', '/images/fahrzeuge/s-klasse-gal-4.jpg', '/images/fahrzeuge/s-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-s-klasse.jpg' },
    vover: { titleLead: 'First class for', titleAccent: 'VIP & Representation.', body: 'The Mercedes-Benz S-Class is our flagship — the first choice when representation and the ultimate in comfort come together. A quiet, generous interior, fine materials and a commanding presence for your most important appearance.' },
    galTitle: 'The S-Class in Vienna.',
    kab: { title: 'The pinnacle of calm.', lead: 'Soft Nappa leather seats, the finest craftsmanship and a silence that leaves everyday life outside. In the S-Class, every journey becomes a first-class retreat.' },
    vben: {
      title: 'When only the best will do.',
      body: 'The S-Class is the uncompromising choice for prestigious occasions, VIP guests and moments where the first impression is decisive. Ultimate comfort, absolute discretion and an appearance that stays in the memory.',
      items: ['The finest Nappa leather appointments and maximum calm', 'Up to 3 guests with luggage, ideal for VIP and representation', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: 'VIP', sm: 'First class' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€120', unit: '/ trip', desc: 'Incl. 60 min. waiting time, meet & greet and luggage service — first-class comfort.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 2 hours', price: '€90', unit: '/ hour', desc: 'A chauffeur at your disposal — ideal for VIP appointments, events and representation. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€720', unit: '/ day', desc: 'A chauffeur for the whole day — for state visits, roadshows and important occasions.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('S-Class'),
      { q: 'What is the S-Class especially suited for?', a: 'The S-Class is our first-class sedan for prestigious occasions, VIP guests and important business appointments.' },
      { q: 'How many guests fit in the S-Class?', a: 'The S-Class offers room for up to 3 guests with 2–4 cases in the ultimate comfort.' },
    ],
  },

  {
    slug: 'maybach',
    name: 'Maybach',
    heroTitle: 'Mercedes-Maybach S-Class',
    klass: 'Luxury Class',
    group: 'Luxury Class Limousine',
    cardKlass: 'Luxury Class · Limousine',
    cardSpecs: '3 guests · 2–3 cases · Ultimate luxury',
    metaTitle: 'Mercedes-Maybach S-Class — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Maybach S-Class: the flagship for the highest expectations. Luxury-class chauffeur service in Vienna and across Austria — for state guests, VIPs and exclusive occasions.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, tailored entirely to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Body', value: 'Luxury sedan' },
    ],
    img: { hero: '/images/fahrzeuge/maybach-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-maybach.jpg', vorteil: '/images/fahrzeuge/vorteil-maybach.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/maybach-gal-1.jpg', '/images/fahrzeuge/maybach-gal-2.jpg', '/images/fahrzeuge/maybach-gal-3.jpg', '/images/fahrzeuge/maybach-gal-4.jpg', '/images/fahrzeuge/maybach-gal-5.jpg'], card: '/images/fahrzeuge/card-maybach.jpg' },
    vover: { titleLead: 'The flagship for', titleAccent: 'the highest expectations.', body: 'The Mercedes-Maybach S-Class is the crown of our fleet — where the S-Class ends, the Maybach begins. Hand-selected materials, a rear cabin with reclining-seat comfort and a presence that turns every arrival into a state reception.' },
    galTitle: 'The Maybach in Vienna.',
    kab: { title: 'Front row in the rear.', lead: 'Power-adjustable executive seats with calf rests and massage function, Maybach neck cushions and near-complete silence. In the rear of the Maybach you travel as if in a private lounge.' },
    vben: {
      title: 'When only the very best will do.',
      body: 'The Mercedes-Maybach S-Class is the most uncompromising choice for state guests, board members and occasions where every gesture counts. Maximum discretion, chauffeur-driven luxury and a presence that sets the standard.',
      items: ['Hand-finished Maybach interior with executive rear seats', 'Up to 3 guests with luggage — designed for travelling in the rear', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: 'S', sm: 'Maybach' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking are always included. Guaranteed at booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€220', unit: '/ trip', desc: 'Incl. 60 min waiting time, meet & greet and luggage service — arrive in the luxury-class rear.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 3 hours', price: '€190', unit: '/ hour', desc: 'Chauffeur at your disposal — for state guests, VIP programmes and exclusive occasions. Incl. max. 20 km per hour.', cta: 'Book by the hour' },
        { title: 'Daily rate', sub: '8 hours included', price: '€1.520', unit: '/ day', desc: 'A chauffeur for the whole day — for state visits, roadshows and prestigious appointments.', cta: 'Book a day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('Mercedes-Maybach S-Class'),
      { q: 'How does the Maybach differ from the S-Class?', a: 'The Maybach is the luxury-class version of the S-Class: more rear legroom, executive seats with massage and reclining functions, hand-finished materials and maximum quiet — designed for travelling in the rear.' },
      { q: 'What occasions is the Maybach suited for?', a: 'The Maybach is the first choice for state guests, board members, weddings and occasions that call for the highest level of representation.' },
    ],
  },

  {
    slug: 'mercedes-eqe',
    name: 'Mercedes EQE',
    heroTitle: 'Mercedes-Benz EQE',
    klass: 'Electric',
    group: 'Electric Vehicles',
    cardKlass: 'Electric · Sedan',
    cardSpecs: '3 guests · 2–3 cases · Emission-free',
    metaTitle: 'Mercedes EQE — Vienna Grand Chauffeurs',
    metaDescription: 'The all-electric Mercedes-Benz EQE: emission-free chauffeur service in Vienna and throughout Austria. Up to 3 guests, quiet, comfortable, transparent fixed prices.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Drive', value: 'Electric' },
    ],
    img: { hero: '/images/fahrzeuge/mercedes-eqe-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-mercedes-eqe.jpg', vorteil: '/images/fahrzeuge/vorteil-mercedes-eqe.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/mercedes-eqe-gal-1.jpg', '/images/fahrzeuge/mercedes-eqe-gal-2.jpg', '/images/fahrzeuge/mercedes-eqe-gal-3.jpg', '/images/fahrzeuge/mercedes-eqe-gal-4.jpg', '/images/fahrzeuge/mercedes-eqe-gal-5.jpg'], card: '/images/fahrzeuge/card-mercedes-eqe.jpg' },
    vover: { titleLead: 'Emission-free and', titleAccent: 'whisper-quiet.', body: 'The all-electric Mercedes-Benz EQE combines sustainable mobility with the comfort of the luxury class. A whisper-quiet drive, a calm interior and emission-free travel — ideal for environmentally conscious travellers who do not wish to go without anything.' },
    galTitle: 'The EQE in Vienna.',
    kab: { title: 'Silence in a new dimension.', lead: 'Without engine noise, the interior of the EQE becomes even calmer. Gentle acceleration, cool air and the finest materials make every journey a relaxed, sustainable experience.' },
    vben: {
      title: 'Travel sustainably, without compromise.',
      body: 'The EQE is the choice for everyone who values sustainability without making compromises on comfort. Emission-free, whisper-quiet and with the familiar premium standard of Vienna Grand Chauffeurs.',
      items: ['Fully electric and travelling emission-free', 'Whisper-quiet drive and a particularly calm interior', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: '0', sm: 'Emissions' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€90', unit: '/ trip', desc: 'Incl. 60 min. waiting time, meet & greet and luggage service — emission-free to your destination.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 2 hours', price: '€80', unit: '/ hour', desc: 'A chauffeur at your disposal — travelling sustainably for appointments and events. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€640', unit: '/ day', desc: 'A chauffeur for the whole day — emission-free for excursions and roadshows.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('EQE'),
      { q: 'Is the EQE really fully electric?', a: 'Yes. The Mercedes-Benz EQE runs purely on electricity and is therefore locally emission-free and particularly quiet.' },
      { q: 'Do I need to expect charging stops?', a: 'No. We plan every journey so that the EQE is ready to go — charging stops are of no concern to you.' },
    ],
  },

  {
    slug: 'vip-minibus',
    name: 'VIP Sprinter',
    heroTitle: 'Mercedes-Benz VIP Sprinter',
    klass: 'VIP Class',
    group: 'VIP Class Minibus',
    cardKlass: 'VIP Class · Minibus',
    cardSpecs: 'Up to 12 guests · Lounge interior · VIP groups',
    metaTitle: 'VIP Sprinter Minibus — Vienna Grand Chauffeurs',
    metaDescription: 'The VIP Sprinter Minibus: a hand-finished luxury van with lounge interior, captain seats and ambient lighting for up to 12 guests. Exclusive group travel in Vienna and across Austria.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, tailored entirely to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Up to 12', accent: 'Up to' },
      { label: 'Interior', value: 'VIP lounge' },
      { label: 'Body', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/vip-minibus-hero.webp', ueberblick: '/images/fahrzeuge/ueberblick-vip-minibus.webp', vorteil: '/images/fahrzeuge/vorteil-vip-minibus.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vip-minibus-gal-1.jpg', '/images/fahrzeuge/vip-minibus-gal-2.jpg', '/images/fahrzeuge/vip-minibus-gal-3.jpg', '/images/fahrzeuge/vip-minibus-gal-4.jpg', '/images/fahrzeuge/vip-minibus-gal-5.jpg'], card: '/images/fahrzeuge/card-vip-minibus.webp' },
    vover: { titleLead: 'The luxury lounge for', titleAccent: 'VIP groups.', body: 'The VIP Sprinter Minibus is our exclusive van for groups who want to travel together and still in first class. A hand-finished lounge interior with captain seats, ambient lighting and entertainment turns every journey into an experience — far more than a simple transfer.' },
    galTitle: 'The VIP Sprinter in Vienna.',
    kab: { title: 'A lounge on wheels.', lead: 'Individual captain seats in two-tone leather, fold-out tables, atmospheric ambient lighting and a large entertainment screen. In the VIP Sprinter the whole group travels as if in a private first-class lounge.' },
    vben: {
      title: 'Travel together, in first class.',
      body: 'The VIP Sprinter Minibus combines the space of a van with the comfort of a luxury limousine. Ideal for delegations, roadshows, corporate events and exclusive groups who want to work, relax or celebrate on the move — without compromising on style.',
      items: ['Hand-finished lounge interior with individual captain seats', 'Up to 12 guests with ambient lighting, tables and entertainment', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: 'VIP', sm: 'Lounge' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking are always included. Guaranteed at booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€220', unit: '/ trip', desc: 'Incl. 60 min waiting time and luggage service — the whole group in the VIP lounge interior.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 3 hours', price: '€90', unit: '/ hour', desc: 'Chauffeur at your disposal — ideal for roadshows, corporate events and VIP programmes. Incl. max. 20 km per hour.', cta: 'Book by the hour' },
        { title: 'Daily rate', sub: '8 hours included', price: '€650', unit: '/ day', desc: 'A chauffeur for the whole day — for delegations, tours and exclusive group occasions.', cta: 'Book a day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('VIP Sprinter Minibus'),
      { q: 'How does the VIP Sprinter differ from the Business Sprinter?', a: 'The Business Sprinter is our spacious group vehicle for up to 20 guests. The VIP Sprinter Minibus, by contrast, has a hand-finished lounge interior with individual captain seats, ambient lighting and entertainment for up to 12 guests — luxury rather than pure capacity.' },
      { q: 'What occasions is the VIP Sprinter suited for?', a: 'Ideal for delegations, roadshows, corporate events, weddings and exclusive groups who want to travel together in first-class comfort.' },
    ],
  },

  {
    slug: 'business-sprinter',
    name: 'Sprinter',
    heroTitle: 'Mercedes-Benz Sprinter',
    klass: 'Sprinter',
    group: 'Business Sprinter',
    cardKlass: 'Business · Sprinter',
    cardSpecs: 'Up to 20 guests · lots of luggage · Groups & Events',
    metaTitle: 'Sprinter — Vienna Grand Chauffeurs',
    metaDescription: 'The Mercedes-Benz Sprinter: a spacious group vehicle for up to 20 guests in Vienna and throughout Austria. Ideal for events, delegations and transfers.',
    heroSub: 'Premium chauffeur service in Vienna & Austria, entirely tailored to your wishes',
    heroStats: [
      { label: 'Passengers', value: 'Up to 19', accent: 'Up to' },
      { label: 'Luggage', value: 'Very much' },
      { label: 'Body', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/business-sprinter-gal-1.webp', ueberblick: '/images/fahrzeuge/ueberblick-business-sprinter.webp', vorteil: '/images/fahrzeuge/vorteil-business-sprinter.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/business-sprinter-gal-1.webp', '/images/fahrzeuge/business-sprinter-gal-2.webp', '/images/fahrzeuge/business-sprinter-gal-3.webp', '/images/fahrzeuge/business-sprinter-gal-4.webp', '/images/fahrzeuge/business-sprinter-gal-5.webp'], card: '/images/fahrzeuge/card-business-sprinter.jpg' },
    vover: { titleLead: 'The large vehicle for', titleAccent: 'Groups & Events.', body: 'The Mercedes-Benz Sprinter brings large groups to their destination comfortably and together. With room for up to 20 guests and ample luggage, it is the ideal solution for events, delegations, corporate outings and larger transfers.' },
    galTitle: 'The Sprinter in Vienna.',
    kab: { title: 'Room for the whole group.', lead: 'Comfortable seats, generous standing height and plenty of space for luggage — the Business Sprinter brings large groups to their destination relaxed and together, without anyone sitting cramped.' },
    vben: {
      title: 'Large groups, one vehicle.',
      body: 'The Mercedes-Benz Sprinter is the answer when many people should travel together. Instead of several vehicles, the group stays together — coordinated, comfortable and with an experienced chauffeur at the wheel.',
      items: ['Room for up to 20 guests plus lots of luggage', 'Ideal for events, delegations and corporate outings', 'Experienced chauffeurs, discreet, punctual, with flight monitoring', 'Fixed prices with no hidden costs'],
      badge: { big: '20', sm: 'Seats' },
    },
    vprice: {
      title: 'Transparent fixed prices.',
      sub: 'No hidden costs — waiting time, tolls and parking fees are always included. Guaranteed at the time of booking.',
      cards: [
        { title: 'Airport transfer', sub: 'Fixed price per trip', price: '€170', unit: '/ trip', desc: 'Incl. 60 min. waiting time and luggage service — the whole group in one vehicle.', cta: 'Book transfer', featured: true },
        { title: 'Hourly rate', sub: 'Minimum 3 hours', price: '€80', unit: '/ hour', desc: 'A chauffeur at your disposal — ideal for events, excursions and group programmes. Incl. max. 20 km per hour.', cta: 'Book hours' },
        { title: 'Daily rate', sub: '8 hours included', price: '€590', unit: '/ day', desc: 'A chauffeur for the whole day — for corporate outings, tours and events.', cta: 'Book day' },
      ],
    },
    faq: [
      ...INCLUDED_FAQ_EN('Mercedes-Benz Sprinter'),
      { q: 'How many guests fit in the Mercedes-Benz Sprinter?', a: 'Depending on the configuration, the Sprinter offers room for up to 20 guests plus luggage — ideal for large groups.' },
      { q: 'Is the Sprinter suitable for multi-day events?', a: 'Yes. We coordinate individual transfers as well as multi-day programmes for groups and companies.' },
    ],
  },
];

import type { Lang } from './i18n';
export const getVehicles = (lang: Lang): Vehicle[] => (lang === 'en' ? VEHICLES_DATA_EN : VEHICLES_DATA);
