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
  slug: string;        // German slug, used under /fahrzeuge/
  slugEn: string;      // English slug, used under /en/vehicles/
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
  seo: { eyebrow: string; title: string; paragraphs: string[] };
  faq: { q: string; a: string }[];
}

const KAB_BG = '/images/fahrzeuge/kabine-bg.jpg';

export const VEHICLES_DATA: Vehicle[] = [
  {
    slug: 'e-klasse',
    slugEn: 'e-class',
    name: 'E-Klasse',
    heroTitle: 'Mercedes E-Klasse',
    klass: 'Business Class',
    group: 'Business Class Limousine',
    cardKlass: 'Business Class · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Business & Transfer',
    metaTitle: 'Mercedes E-Klasse mit Chauffeur Wien mieten',
    metaDescription: 'Mercedes E-Klasse mit Chauffeur in Wien: komfortable Business-Limousine für Termine und Transfers. Fixpreis, zuverlässig, online buchbar.',
    heroSub: 'Die Business-Limousine mit Chauffeur. Komfortabel und zuverlässig für Termine, Transfers und den geschäftlichen Alltag in Wien. Zuverlässig und stets',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Karosserie', value: 'Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/e-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-e-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-e-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/e-klasse-gal-1.jpg', '/images/fahrzeuge/e-klasse-gal-2.jpg', '/images/fahrzeuge/e-klasse-gal-3.jpg', '/images/fahrzeuge/e-klasse-gal-4.jpg', '/images/fahrzeuge/e-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-e-klasse.jpg' },
    vover: { titleLead: 'Komfort für', titleAccent: 'den Businessalltag', body: 'Wer die E-Klasse mieten Wien und Umgebung möchte, erhält die ideale Business-Limousine: komfortabel, elegant und sparsam zugleich. Sie bietet bis zu drei Passagieren viel Platz und eignet sich perfekt für Geschäftstermine, Flughafentransfers und den täglichen Bedarf. Ein bewährtes, gepflegtes' },
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
    seo: {
      eyebrow: 'Mercedes E-Klasse Wien',
      title: 'Ihre Mercedes E-Klasse mit Chauffeur für Wien und Umgebung und Ihren',
      paragraphs: [
        'Die Mercedes E-Klasse mit Fahrer Wien ist der Klassiker unter den Business-Limousinen und unser vielseitigstes Fahrzeug.',
        'Sie verbindet Komfort, elegantes Design und Zuverlässigkeit und passt zu fast jedem Anlass, vom Geschäftstermin über den Flughafentransfer bis zur Fahrt am Abend.',
        'Bis zu drei Passagiere reisen bequem, der Innenraum ist ruhig und gepflegt. Wasser steht bereit, auf Wunsch ein Kindersitz.',
        'Sie buchen die E-Klasse direkt über unser Online Buchungssystem, sehen den Fixpreis vorab und zahlen bequem per Kreditkarte, Apple Pay oder Google Pay.',
        'Gerade für Firmen ist die E-Klasse die wirtschaftliche Wahl für den Alltag, mit festen Konditionen für regelmäßige Fahrten und Kundenbesuche.',
        'So verbinden Sie zuverlässigen Business-Komfort mit einem fairen Preis und einem Fahrer, der Wien kennt und vorausschauend ans Ziel bringt.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist die E-Klasse geeignet?', a: 'Für bis zu drei Passagiere mit Gepäck. Für mehr Platz bieten sich V-Klasse oder VIP Minibus an.' },
      { q: 'Wofür eignet sich die E-Klasse?', a: 'Für Geschäftstermine, Flughafentransfers und den täglichen Bedarf. Ein komfortables, zuverlässiges Fahrzeug für fast jeden Anlass.' },
      { q: 'Wie buche ich die E-Klasse?', a: 'Über unser Online Buchungssystem mit sofortiger Bestätigung. Für individuelle Wünsche erreichen Sie uns per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'vito',
    slugEn: 'vito',
    name: 'Vito',
    heroTitle: 'Mercedes Vito',
    klass: 'Minivan',
    group: 'Minivan',
    cardKlass: 'Minivan · Shuttle',
    cardSpecs: '7 Gäste · 7 Koffer · Gruppen & Gepäck',
    metaTitle: 'Mercedes Vito mit Chauffeur in Wien mieten',
    metaDescription: 'Mercedes Vito mit Chauffeur in Wien: praktischer Van für Gruppen bis 8 Personen und viel Gepäck. Zuverlässig, geräumig, online buchbar.',
    heroSub: 'Der praktische Van mit Chauffeur. Viel Platz für Gruppen bis zu acht Personen und reichlich Gepäck in Wien. Viel Raum für Gruppe und Gepäck.',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 7', accent: 'Max.' },
      { label: 'Gepäck', value: 'Bis 7 Koffer' },
      { label: 'Karosserie', value: 'Minivan' },
    ],
    img: { hero: '/images/fahrzeuge/vito-gal-1.webp', ueberblick: '/images/fahrzeuge/vito-gal-3.webp', vorteil: '/images/fahrzeuge/vorteil-vito.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vito-gal-1.webp', '/images/fahrzeuge/vito-gal-2.webp', '/images/fahrzeuge/vito-gal-3.webp', '/images/fahrzeuge/vito-gal-4.webp', '/images/fahrzeuge/vito-gal-5.webp'], card: '/images/fahrzeuge/card-vito.webp' },
    vover: { titleLead: 'Praktisch und', titleAccent: 'geräumig', body: 'Wer den Vito mieten Wien und Umgebung möchte, erhält den praktischen Allrounder unter unseren Vans. Er bietet Platz für bis zu acht Passagiere und viel Gepäck, ideal für Gruppen, Transfers und Ausflüge. Robust, zuverlässig und geräumig bringt er alle gemeinsam und entspannt ans Ziel, ohne dass es' },
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
    seo: {
      eyebrow: 'Mercedes Vito Wien',
      title: 'Ihr Mercedes Vito mit Chauffeur für Wien und Umgebung und Ihre Gruppe',
      paragraphs: [
        'Der Vito mit Fahrer Wien ist unser praktischer Van für alle, die viel Platz brauchen.',
        'Mit Raum für bis zu acht Passagiere und reichlich Gepäck eignet er sich hervorragend für Gruppen, Vereinsausflüge oder Transfers mit viel Reisegepäck.',
        'Er ist robust, zuverlässig und wirtschaftlich, ohne dass Ihre Gäste auf Komfort verzichten müssen. Alle reisen gemeinsam, entspannt und koordiniert. Wasser steht bereit, auf Wunsch Kindersitze.',
        'Sie buchen den Vito direkt über unser Online Buchungssystem oder per Anfrage, sehen den Fixpreis vorab und zahlen bequem per Kreditkarte, Apple Pay oder Google Pay.',
        'Für Vereinsausflüge, Firmenfahrten oder Transfers mit viel Gepäck ist der Vito die praktische und wirtschaftliche Lösung für größere Gruppen.',
        'Für regelmäßige Fahrten richten wir feste Konditionen ein, für besondere Wünsche erreichen Sie uns jederzeit per WhatsApp oder E-Mail.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist der Vito geeignet?', a: 'Für bis zu acht Passagiere samt Gepäck. Für noch größere Gruppen empfehlen wir VIP Minibus oder Sprinter.' },
      { q: 'Worin unterscheidet sich der Vito von der V-Klasse?', a: 'Der Vito ist etwas schlichter ausgestattet und besonders wirtschaftlich, während die V-Klasse mehr Komfort im Detail bietet.' },
      { q: 'Wie buche ich den Vito?', a: 'Über unser Online Buchungssystem oder per Anfrage. Für Gruppen und Sonderwünsche erreichen Sie uns per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'v-klasse',
    slugEn: 'v-class',
    name: 'V-Klasse',
    heroTitle: 'Mercedes V-Klasse',
    klass: 'Business Minivan',
    group: 'Business Minivan',
    cardKlass: 'Business Minivan · Shuttle',
    cardSpecs: '7 Gäste · 7 Koffer · Gruppen & Gepäck',
    metaTitle: 'Mercedes V-Klasse mit Chauffeur Wien mieten',
    metaDescription: 'Mercedes V-Klasse mit Chauffeur in Wien: geräumiger Van für Familien und kleine Gruppen bis 7 Personen. Komfortabel, flexibel, online buchbar.',
    heroSub: 'Der geräumige Van mit Chauffeur. Viel Platz für Familien und kleine Gruppen bis zu sieben Personen in Wien. Alle reisen bequem zusammen.',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 7', accent: 'Max.' },
      { label: 'Gepäck', value: 'Bis 7 Koffer' },
      { label: 'Karosserie', value: 'Minivan' },
    ],
    img: { hero: '/images/fahrzeuge/v-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-v-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-v-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/v-klasse-gal-1.jpg', '/images/fahrzeuge/v-klasse-gal-2.jpg', '/images/fahrzeuge/v-klasse-gal-3.jpg', '/images/fahrzeuge/v-klasse-gal-4.jpg', '/images/fahrzeuge/v-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-v-klasse.jpg' },
    vover: { titleLead: 'Platz für', titleAccent: 'die ganze Gruppe', body: 'Wer die V-Klasse mieten Wien und Umgebung möchte, erhält Raum für bis zu sieben Passagiere samt Gepäck. Ideal für Familien, kleine Gruppen oder Geschäftsteams, die gemeinsam reisen möchten. Bequeme Einzelsitze, viel Kopffreiheit und ein flexibler Innenraum machen auch längere Fahrten angenehm.' },
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
    seo: {
      eyebrow: 'Mercedes V-Klasse Wien',
      title: 'Ihre Mercedes V-Klasse mit Chauffeur für Wien und Umgebung und Ihre',
      paragraphs: [
        'Wenn mehrere Personen gemeinsam reisen, ist der Minivan mit Fahrer Wien die komfortable Lösung. Die Mercedes V-Klasse bietet Platz für bis zu sieben Passagiere und deren Gepäck, ohne dass es eng wird.',
        'Bequeme Sitze und ein flexibler Innenraum machen sie ideal für Familien, kleine Reisegruppen oder Geschäftsteams.',
        'Ob Flughafentransfer mit viel Gepäck, Ausflug oder gemeinsame Fahrt zum Termin: Alle reisen zusammen und entspannt.',
        'In der V-Klasse steht Wasser bereit, auf Wunsch stellen wir mehrere Kindersitze, sodass auch Familien entspannt gemeinsam unterwegs sind.',
        'Sie buchen den Van direkt über unser Online Buchungssystem, sehen den Fixpreis vorab und zahlen bequem per Kreditkarte, Apple Pay oder Google Pay.',
        'So kommt Ihre Gruppe zusammen und ohne Umsteigen ans Ziel, während sich Ihr Chauffeur um Route, Gepäck und Parken kümmert.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist die V-Klasse geeignet?', a: 'Für bis zu sieben Passagiere samt Gepäck. Für größere Gruppen bieten sich VIP Minibus oder Sprinter an.' },
      { q: 'Wofür eignet sich die V-Klasse?', a: 'Für Familien, kleine Gruppen und Teams, für Flughafentransfers mit viel Gepäck sowie gemeinsame Ausflüge und Termine.' },
      { q: 'Sind Kindersitze möglich?', a: 'Ja, auf Wunsch stellen wir mehrere Kindersitze bereit. Geben Sie den Wunsch bei der Buchung oder per WhatsApp an.' },
    ],
  },

  {
    slug: 's-klasse',
    slugEn: 's-class',
    name: 'S-Klasse',
    heroTitle: 'Mercedes S-Klasse',
    klass: 'First Class',
    group: 'First Class Limousine',
    cardKlass: 'First Class · Limousine',
    cardSpecs: '3 Gäste · 2–4 Koffer · VIP & Repräsentation',
    metaTitle: 'Mercedes S-Klasse mit Chauffeur Wien mieten',
    metaDescription: 'Mercedes S-Klasse mit Chauffeur in Wien: First-Class-Limousine für Geschäftstermine und besondere Anlässe. Fixpreis, diskret, online buchbar.',
    heroSub: 'Die First-Class-Limousine mit Chauffeur. Höchster Komfort und Diskretion für Geschäftstermine und besondere Anlässe in Wien. Den Fixpreis sehen Sie',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–4 Koffer' },
      { label: 'Karosserie', value: 'Luxus-Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/s-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-s-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-s-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/s-klasse-gal-1.jpg', '/images/fahrzeuge/s-klasse-gal-2.jpg', '/images/fahrzeuge/s-klasse-gal-3.jpg', '/images/fahrzeuge/s-klasse-gal-4.jpg', '/images/fahrzeuge/s-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-s-klasse.jpg' },
    vover: { titleLead: 'First Class auf', titleAccent: 'jeder Fahrt', body: 'Wer die S-Klasse mieten Wien und Umgebung möchte, wählt unsere repräsentativste Limousine. Viel Beinfreiheit, ruhiger Lauf und eine Ausstattung, die auch lange Fahrten angenehm macht. Ideal für Geschäftskunden, die Wert auf Komfort und ein souveränes Auftreten legen. Bis zu drei Passagiere reisen' },
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
    seo: {
      eyebrow: 'Mercedes S-Klasse Wien',
      title: 'Ihre Mercedes S-Klasse mit Chauffeur für Wien und Umgebung und',
      paragraphs: [
        'Wenn es auf einen souveränen Auftritt ankommt, ist die Mercedes S-Klasse mit Fahrer Wien die richtige Wahl.',
        'Als Oberklasse-Limousine verbindet sie ruhigen Lauf, großzügigen Platz und eine hochwertige Ausstattung, die jede Fahrt angenehm macht.',
        'Ob Fahrt zum Geschäftstermin, zum Flughafen oder zu einem festlichen Anlass: Sie reisen komfortabel und werden diskret und pünktlich ans Ziel gebracht. In der S-Klasse steht Wasser für Sie bereit, auf Wunsch auch ein Kindersitz.',
        'Sie buchen die S-Klasse direkt über unser Online Buchungssystem, sehen den Fixpreis sofort und bezahlen bequem per Kreditkarte, Apple Pay oder Google Pay.',
        'Für regelmäßige Geschäftsfahrten richten wir feste Firmenkonditionen ein, sodass wiederkehrende Termine reibungslos und planbar bleiben.',
        'Ob einzelne Fahrt oder ganztägige Begleitung, Ihr Chauffeur bringt Sie souverän ans Ziel, während Sie die Zeit im Fond für sich nutzen.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist die S-Klasse geeignet?', a: 'Für bis zu drei Passagiere mit Gepäck. Für größere Gruppen empfehlen wir V-Klasse, VIP Minibus oder Sprinter.' },
      { q: 'Wofür eignet sich die S-Klasse besonders?', a: 'Für Geschäftstermine, Flughafentransfers und besondere Anlässe, bei denen Komfort und ein repräsentatives Auftreten zählen.' },
      { q: 'Wie buche ich die S-Klasse mit Chauffeur?', a: 'Über unser Online Buchungssystem: Fahrzeug wählen, Fixpreis sehen, sofort bestätigt. Für Sonderwünsche per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'maybach',
    slugEn: 'maybach',
    name: 'Maybach',
    heroTitle: 'Mercedes-Maybach',
    klass: 'Luxury Class',
    group: 'Luxury Class Limousine',
    cardKlass: 'Luxury Class · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Ultimativer Luxus',
    metaTitle: 'Mercedes-Maybach mit Chauffeur in Wien mieten',
    metaDescription: 'Mercedes-Maybach mit Chauffeur in Wien: das Flaggschiff für exklusive Fahrten und höchste Ansprüche. Diskret, luxuriös, auf Anfrage buchbar.',
    heroSub: 'Das Flaggschiff mit Chauffeur. Für exklusive Anlässe und höchste Ansprüche an Komfort, Ausstattung und Diskretion in Wien. Für Anlässe, die Eindruck',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Karosserie', value: 'Luxus-Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/maybach-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-maybach.jpg', vorteil: '/images/fahrzeuge/vorteil-maybach.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/maybach-gal-1.jpg', '/images/fahrzeuge/maybach-gal-2.jpg', '/images/fahrzeuge/maybach-gal-3.jpg', '/images/fahrzeuge/maybach-gal-4.jpg', '/images/fahrzeuge/maybach-gal-5.jpg'], card: '/images/fahrzeuge/card-maybach.jpg' },
    vover: { titleLead: 'Luxus in seiner', titleAccent: 'reinsten Form', body: 'Wer einen Maybach mieten Wien und Umgebung möchte, wählt unser exklusivstes Fahrzeug. Er bietet ein Höchstmaß an Komfort, edle Materialien und eine Ausstattung, die auch anspruchsvollste Gäste überzeugt. Ideal für besondere Anlässe, VIP-Gäste und Fahrten, bei denen jedes Detail zählt.' },
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
    seo: {
      eyebrow: 'Mercedes-Maybach Wien',
      title: 'Ihr Mercedes-Maybach mit Chauffeur für Wien und Umgebung und exklusive',
      paragraphs: [
        'Der Maybach mit Fahrer Wien steht für Luxus ohne Kompromisse. Wer für besondere Anlässe, wichtige Gäste oder einen unvergesslichen Abend das Beste sucht, findet in diesem Flaggschiff die richtige Wahl.',
        'Edelste Materialien, außergewöhnlicher Komfort und eine ruhige, souveräne Fahrweise machen jede Strecke zu einem Erlebnis. Ihr Chauffeur ist besonders diskret und auf höchste Ansprüche eingestellt.',
        'Da der Maybach ein exklusives Fahrzeug ist, planen wir Ihre Fahrt gern persönlich mit Ihnen, erreichbar per WhatsApp oder E-Mail.',
        'Da der Maybach ein exklusives Fahrzeug ist, planen wir jede Fahrt persönlich mit Ihnen und stimmen Ablauf, Route und Wünsche im Vorfeld ab.',
        'Für Empfänge, Hochzeiten oder die Betreuung wichtiger Gäste ist der Maybach die erste Wahl, wenn Diskretion und ein besonderer Auftritt zählen.',
        'Erreichen Sie uns einfach per WhatsApp oder E-Mail, und wir stellen Ihnen ein individuelles Angebot für Ihren Anlass zusammen.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist der Maybach geeignet?', a: 'Für bis zu drei Passagiere. Der Maybach ist auf höchsten Komfort für wenige Gäste ausgelegt.' },
      { q: 'Wofür eignet sich der Maybach?', a: 'Für VIP-Gäste, besondere Anlässe und Fahrten, bei denen Exklusivität, Komfort und Diskretion an erster Stelle stehen.' },
      { q: 'Wie buche ich den Maybach?', a: 'Da es ein exklusives Fahrzeug ist, planen wir Ihre Fahrt persönlich. Erreichen Sie uns per WhatsApp oder E-Mail für ein Angebot.' },
    ],
  },

  {
    slug: 'eqe',
    slugEn: 'eqe',
    name: 'Mercedes EQE',
    heroTitle: 'Mercedes EQE',
    klass: 'Elektro',
    group: 'Elektrofahrzeuge',
    cardKlass: 'Elektro · Limousine',
    cardSpecs: '3 Gäste · 2–3 Koffer · Emissionsfrei',
    metaTitle: 'Mercedes EQE elektrisch mit Chauffeur Wien',
    metaDescription: 'Mercedes EQE mit Chauffeur in Wien: vollelektrische Business-Limousine, leise und emissionsfrei. Komfortabel, nachhaltig, online buchbar.',
    heroSub: 'Die vollelektrische Business-Limousine mit Chauffeur. Leise, emissionsfrei und komfortabel für nachhaltige Fahrten in Wien. Leise, sauber und',
    heroStats: [
      { label: 'Passagiere', value: 'Max. 3', accent: 'Max.' },
      { label: 'Gepäck', value: '2–3 Koffer' },
      { label: 'Antrieb', value: 'Elektro' },
    ],
    img: { hero: '/images/fahrzeuge/mercedes-eqe-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-mercedes-eqe.jpg', vorteil: '/images/fahrzeuge/vorteil-mercedes-eqe.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/mercedes-eqe-gal-1.jpg', '/images/fahrzeuge/mercedes-eqe-gal-2.jpg', '/images/fahrzeuge/mercedes-eqe-gal-3.jpg', '/images/fahrzeuge/mercedes-eqe-gal-4.jpg', '/images/fahrzeuge/mercedes-eqe-gal-5.jpg'], card: '/images/fahrzeuge/card-mercedes-eqe.jpg' },
    vover: { titleLead: 'Elektrisch und', titleAccent: 'komfortabel', body: 'Wer die EQE mieten Wien und Umgebung möchte, erhält unsere vollelektrische Business-Limousine. Sie fährt nahezu geräuschlos, lokal emissionsfrei und bietet dabei den gewohnten Komfort der Oberklasse. Ideal für Gäste, die Wert auf Nachhaltigkeit legen, ohne auf Platz zu verzichten.' },
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
    seo: {
      eyebrow: 'Mercedes EQE Wien',
      title: 'Ihre vollelektrische Mercedes EQE mit Chauffeur für Wien und Umgebung',
      paragraphs: [
        'Mit der Elektro Limousine mit Fahrer Wien verbinden Sie Komfort und Verantwortung.',
        'Die vollelektrische Mercedes EQE fährt nahezu lautlos und lokal emissionsfrei, was jede Fahrt besonders ruhig und angenehm macht.',
        'Trotz Elektroantrieb müssen Sie auf nichts verzichten: Der Innenraum ist großzügig, hochwertig und leise. Für Unternehmen mit Nachhaltigkeitszielen ist die EQE die ideale Wahl für Termine und Transfers.',
        'Sie buchen die EQE direkt über unser Online Buchungssystem, sehen den Fixpreis sofort und bezahlen bequem und papierlos per Kreditkarte, Apple Pay oder Google Pay.',
        'In der EQE steht Wasser für Sie bereit, auf Wunsch auch ein Kindersitz, und der leise Innenraum macht Telefonate und konzentriertes Arbeiten unterwegs angenehm.',
        'So reisen Sie klimafreundlich und komfortabel zugleich, mit einem Fahrer, der Wien kennt und Sie zuverlässig ans Ziel bringt.',
      ],
    },
    faq: [
      { q: 'Ist die EQE wirklich vollelektrisch?', a: 'Ja. Die Mercedes EQE fährt rein elektrisch, lokal emissionsfrei und besonders leise, ohne Komforteinbußen gegenüber der Oberklasse.' },
      { q: 'Für wen eignet sich die EQE?', a: 'Für Gäste und Unternehmen, die Wert auf Nachhaltigkeit legen und dennoch komfortabel und repräsentativ unterwegs sein möchten.' },
      { q: 'Wie buche ich die EQE?', a: 'Über unser Online Buchungssystem mit sofortiger Bestätigung. Für Firmenkonditionen erreichen Sie uns per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'vip-minibus',
    slugEn: 'vip-minibus',
    name: 'VIP Sprinter',
    heroTitle: 'VIP Minibus',
    klass: 'VIP Class',
    group: 'VIP Class Minibus',
    cardKlass: 'VIP Class · Minibus',
    cardSpecs: 'Bis 12 Gäste · Lounge-Interieur · VIP-Gruppen',
    metaTitle: 'VIP Minibus mit Chauffeur in Wien mieten',
    metaDescription: 'VIP Minibus mit Chauffeur in Wien: komfortabler Kleinbus für Gruppen bis 12 Personen. Ideal für Events und Ausflüge. Jetzt anfragen.',
    heroSub: 'Der komfortable Kleinbus mit Chauffeur. Viel Platz und Komfort für Gruppen bis zu zwölf Personen in Wien. Alle bleiben komfortabel zusammen.',
    heroStats: [
      { label: 'Passagiere', value: 'Bis 12', accent: 'Bis' },
      { label: 'Interieur', value: 'VIP-Lounge' },
      { label: 'Karosserie', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/vip-minibus-hero.webp', ueberblick: '/images/fahrzeuge/ueberblick-vip-minibus.webp', vorteil: '/images/fahrzeuge/vorteil-vip-minibus.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vip-minibus-gal-1.jpg', '/images/fahrzeuge/vip-minibus-gal-2.jpg', '/images/fahrzeuge/vip-minibus-gal-3.jpg', '/images/fahrzeuge/vip-minibus-gal-4.jpg', '/images/fahrzeuge/vip-minibus-gal-5.jpg'], card: '/images/fahrzeuge/card-vip-minibus.webp' },
    vover: { titleLead: 'Komfort für', titleAccent: 'größere Gruppen', body: 'Wer einen Kleinbus mieten Wien und Umgebung möchte, findet im VIP Minibus die komfortable Lösung. Bis zu zwölf Passagiere reisen bequem und gemeinsam, mit angenehmen Sitzen und viel Platz für Gepäck. Ideal für Firmenausflüge, Hochzeitsgesellschaften oder Reisegruppen, die zusammenbleiben möchten.' },
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
    seo: {
      eyebrow: 'VIP Minibus Wien',
      title: 'Ihr VIP Minibus mit Chauffeur für Wien und Umgebung und Ihre',
      paragraphs: [
        'Wenn eine größere Gruppe gemeinsam und komfortabel reisen möchte, ist der Minibus mit Fahrer Wien die richtige Wahl.',
        'Mit Platz für bis zu zwölf Passagiere verbindet er die Gemeinschaft einer Gruppenfahrt mit dem Komfort eines gehobenen Fahrzeugs.',
        'Bequeme Sitze, Klimatisierung und viel Stauraum machen ihn ideal für Firmenausflüge, Hochzeiten oder Reisegruppen. Alle bleiben zusammen, niemand verfährt sich, und Ihr Chauffeur kümmert sich um die Strecke.',
        'Da Gruppenfahrten oft individuelle Planung brauchen, stimmen wir Route, Abholzeiten und Zwischenstopps im Vorfeld persönlich mit Ihnen ab.',
        'Sie erreichen uns dazu jederzeit per WhatsApp oder E-Mail und erhalten zügig ein transparentes Angebot mit Fixpreis für die gesamte Gruppe.',
        'So wird der VIP Minibus zur entspannten Lösung für alle, die zusammen ankommen möchten, ohne sich um Organisation oder Parkplätze zu kümmern.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist der VIP Minibus geeignet?', a: 'Für bis zu zwölf Passagiere samt Gepäck. Für noch größere Gruppen steht der 20-Sitzer Sprinter bereit.' },
      { q: 'Wofür eignet sich der VIP Minibus?', a: 'Für Firmenausflüge, Hochzeitsgesellschaften, Vereins- und Reisegruppen, die gemeinsam und komfortabel unterwegs sein möchten.' },
      { q: 'Wie buche ich den VIP Minibus?', a: 'Am besten per Anfrage mit Details zu Gruppe und Anlass. Sie erhalten zügig ein Angebot, erreichbar per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'business-sprinter',
    slugEn: 'business-sprinter',
    name: 'Sprinter',
    heroTitle: 'Business Sprinter',
    klass: 'Sprinter',
    group: 'Business Sprinter',
    cardKlass: 'Business · Sprinter',
    cardSpecs: 'Bis 20 Gäste · viel Gepäck · Gruppen & Events',
    metaTitle: 'Business Sprinter mit Chauffeur Wien mieten',
    metaDescription: 'Business Sprinter mit Chauffeur in Wien: 20-Sitzer für große Gruppen, Events und Delegationen. Viel Platz, ein Fahrer. Jetzt anfragen.',
    heroSub: 'Der 20-Sitzer mit Chauffeur. Maximaler Platz für große Gruppen, Events und Delegationen in Wien und darüber hinaus. Eine Gruppe, ein Fahrzeug, ein',
    heroStats: [
      { label: 'Passagiere', value: 'Bis 20', accent: 'Bis' },
      { label: 'Gepäck', value: 'Sehr viel' },
      { label: 'Karosserie', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/business-sprinter-gal-1.webp', ueberblick: '/images/fahrzeuge/ueberblick-business-sprinter.webp', vorteil: '/images/fahrzeuge/vorteil-business-sprinter.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/business-sprinter-gal-1.webp', '/images/fahrzeuge/business-sprinter-gal-2.webp', '/images/fahrzeuge/business-sprinter-gal-3.webp', '/images/fahrzeuge/business-sprinter-gal-4.webp', '/images/fahrzeuge/business-sprinter-gal-5.webp'], card: '/images/fahrzeuge/card-business-sprinter.jpg' },
    vover: { titleLead: 'Die ganze Gruppe', titleAccent: 'an Bord', body: 'Wer den Sprinter mieten Wien und Umgebung möchte, erhält unser größtes Fahrzeug mit Platz für bis zu zwanzig Passagiere. Ideal für große Gruppen, Firmenevents, Delegationen und Reisegesellschaften. Statt mehrerer Fahrzeuge reisen alle gemeinsam in einem, koordiniert und pünktlich.' },
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
    seo: {
      eyebrow: 'Business Sprinter Wien',
      title: 'Ihr Business Sprinter mit Chauffeur für Wien und Umgebung und große',
      paragraphs: [
        'Der 20-Sitzer mit Fahrer Wien ist die Lösung, wenn wirklich viele Menschen gemeinsam ans Ziel müssen.',
        'Mit bis zu zwanzig Sitzplätzen bringt der Business Sprinter ganze Gruppen, Firmenteams oder Delegationen in einem einzigen Fahrzeug unter, statt sie auf mehrere Wagen zu verteilen.',
        'Das spart Koordination, hält alle zusammen und sorgt für einen pünktlichen, gemeinsamen Ablauf. Reichlich Stauraum nimmt auch viel Gepäck auf, und der erfahrene Chauffeur kennt die besten Wege.',
        'Da große Gruppenfahrten individuelle Planung brauchen, stimmen wir Route, Abholpunkte und Zeitplan im Vorfeld persönlich mit Ihnen ab.',
        'Für Firmenevents, Delegationen oder Reisegruppen erstellen wir Ihnen ein transparentes Angebot mit Fixpreis für das gesamte Fahrzeug.',
        'Erreichen Sie uns einfach per WhatsApp oder E-Mail, und Ihre ganze Gruppe reist gemeinsam, koordiniert und pünktlich ans Ziel.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist der Sprinter geeignet?', a: 'Für bis zu zwanzig Passagiere samt Gepäck. Damit ist er unser größtes Fahrzeug für Gruppentransfers.' },
      { q: 'Wofür eignet sich der Business Sprinter?', a: 'Für große Gruppen, Firmenevents, Delegationen und Reisegesellschaften, die gemeinsam in einem Fahrzeug reisen möchten.' },
      { q: 'Wie buche ich den Sprinter?', a: 'Am besten per Anfrage mit Details zu Gruppe, Strecke und Anlass. Sie erhalten zügig ein Angebot per WhatsApp oder E-Mail.' },
    ],
  },
];

// ── English fleet ───────────────────────────────────────────────────────────

export const VEHICLES_DATA_EN: Vehicle[] = [
  {
    slug: 'e-klasse',
    slugEn: 'e-class',
    name: 'E-Class',
    heroTitle: 'Mercedes E-Class',
    klass: 'Business Class',
    group: 'Business Class Sedan',
    cardKlass: 'Business Class · Sedan',
    cardSpecs: '3 guests · 2–3 cases · Business & Transfer',
    metaTitle: 'Mercedes E-Class with Chauffeur Vienna | Hire',
    metaDescription: 'Mercedes E-Class with chauffeur in Vienna: comfortable business limousine for meetings and transfers. Fixed price, reliable, book online.',
    heroSub: 'The business limousine with chauffeur. Comfortable and reliable for meetings, transfers and the business day in Vienna. Reliable and always on time.',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Body', value: 'Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/e-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-e-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-e-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/e-klasse-gal-1.jpg', '/images/fahrzeuge/e-klasse-gal-2.jpg', '/images/fahrzeuge/e-klasse-gal-3.jpg', '/images/fahrzeuge/e-klasse-gal-4.jpg', '/images/fahrzeuge/e-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-e-klasse.jpg' },
    vover: { titleLead: 'Comfort for', titleAccent: 'the business day', body: 'Anyone looking for E-Class hire Vienna and beyond gets the ideal business limousine: comfortable, elegant and efficient at once. It offers up to three passengers plenty of room and is perfect for meetings, airport transfers and daily needs. A proven, well-kept vehicle.' },
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
    seo: {
      eyebrow: 'Mercedes E-Class Vienna',
      title: 'Your Mercedes E-Class with chauffeur for Vienna and the region and',
      paragraphs: [
        'The Mercedes E-Class with driver Vienna is the classic business limousine and our most versatile vehicle. It combines comfort, elegant design and reliability and suits almost any occasion, from a meeting to an airport transfer.',
        'Up to three passengers travel comfortably, and the interior is quiet and well kept.',
        ' see the fixed price when booking and pay conveniently by credit card, Apple Pay or Google Pay, with confirmation right away.',
        'You book the E-Class directly through our online booking system, see the fixed price in advance and pay by credit card, Apple Pay or Google Pay.',
        'For companies in particular the E-Class is the economical everyday choice, with fixed terms for regular rides and client visits.',
        'That way you combine reliable business comfort with a fair price and a driver who knows Vienna and drives with foresight.',
      ],
    },
    faq: [
      { q: 'How many people fit in the E-Class?', a: 'Up to three passengers with luggage. For more room the V-Class or VIP minibus are a good choice.' },
      { q: 'What is the E-Class suited for?', a: 'For business meetings, airport transfers and everyday needs. A comfortable, reliable vehicle for almost any occasion.' },
      { q: 'How do I book the E-Class?', a: 'Through our online booking system with instant confirmation. For individual wishes reach us by WhatsApp or email.' },
    ],
  },

  {
    slug: 'vito',
    slugEn: 'vito',
    name: 'Vito',
    heroTitle: 'Mercedes Vito',
    klass: 'Minivan',
    group: 'Minivan',
    cardKlass: 'Minivan · Shuttle',
    cardSpecs: '7 guests · 7 cases · Groups & Luggage',
    metaTitle: 'Mercedes Vito with Chauffeur in Vienna | Hire',
    metaDescription: 'Mercedes Vito with chauffeur in Vienna: practical van for groups up to 8 people and plenty of luggage. Reliable, spacious, book online.',
    heroSub: 'The practical van with chauffeur. Plenty of room for groups of up to eight people and generous luggage in Vienna. Plenty of room for group and',
    heroStats: [
      { label: 'Passengers', value: 'Max. 7', accent: 'Max.' },
      { label: 'Luggage', value: 'Up to 7 cases' },
      { label: 'Body', value: 'Minivan' },
    ],
    img: { hero: '/images/fahrzeuge/vito-gal-1.webp', ueberblick: '/images/fahrzeuge/vito-gal-3.webp', vorteil: '/images/fahrzeuge/vorteil-vito.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vito-gal-1.webp', '/images/fahrzeuge/vito-gal-2.webp', '/images/fahrzeuge/vito-gal-3.webp', '/images/fahrzeuge/vito-gal-4.webp', '/images/fahrzeuge/vito-gal-5.webp'], card: '/images/fahrzeuge/card-vito.webp' },
    vover: { titleLead: 'Practical and', titleAccent: 'spacious', body: 'Anyone looking for Vito hire Vienna and beyond gets the practical all-rounder among our vans. It offers room for up to eight passengers and plenty of luggage, ideal for groups, transfers and excursions. Robust, reliable and spacious.' },
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
    seo: {
      eyebrow: 'Mercedes Vito Vienna',
      title: 'Your Mercedes Vito with chauffeur for Vienna and the region and your',
      paragraphs: [
        'The Vito with driver Vienna is our practical van for everyone who needs plenty of room. With space for up to eight passengers and generous luggage, it suits groups, club outings or transfers with a lot of baggage.',
        'With space for up to eight passengers and generous luggage, it is ideal for groups, club outings or transfers with a lot of travel luggage. It is robust, reliable and economical, without your guests having to give up comfort.',
        'Everyone travels together, relaxed and coordinated. Water is on board, child seats on request. You see your fixed price when booking and pay conveniently online.',
        'You book the Vito directly through our online booking system or by request, see the fixed price in advance and pay by credit card, Apple Pay or Google Pay.',
        'For club outings, company trips or transfers with a lot of luggage, the Vito is the practical and economical choice for larger groups.',
        'For regular rides we set up fixed terms, and for special wishes you can reach us any time by WhatsApp or email.',
      ],
    },
    faq: [
      { q: 'How many people fit in the Vito?', a: 'Up to eight passengers with luggage. For even larger groups we recommend the VIP minibus or Sprinter.' },
      { q: 'How does the Vito differ from the V-Class?', a: 'The Vito is a little simpler in equipment and especially economical, while the V-Class offers more comfort in the details.' },
      { q: 'How do I book the Vito?', a: 'Through our online booking system or by request. For groups and special wishes reach us by WhatsApp or email.' },
    ],
  },

  {
    slug: 'v-klasse',
    slugEn: 'v-class',
    name: 'V-Class',
    heroTitle: 'Mercedes V-Class',
    klass: 'Business Minivan',
    group: 'Business Minivan',
    cardKlass: 'Business Minivan · Shuttle',
    cardSpecs: '7 guests · 7 cases · Groups & Luggage',
    metaTitle: 'Mercedes V-Class with Chauffeur Vienna | Hire',
    metaDescription: 'Mercedes V-Class with chauffeur in Vienna: spacious van for families and small groups up to 7 people. Comfortable, flexible, book online.',
    heroSub: 'The spacious van with chauffeur. Plenty of room for families and small groups of up to seven people in Vienna. Everyone travels comfortably together.',
    heroStats: [
      { label: 'Passengers', value: 'Max. 7', accent: 'Max.' },
      { label: 'Luggage', value: 'Up to 7 cases' },
      { label: 'Body', value: 'Minivan' },
    ],
    img: { hero: '/images/fahrzeuge/v-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-v-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-v-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/v-klasse-gal-1.jpg', '/images/fahrzeuge/v-klasse-gal-2.jpg', '/images/fahrzeuge/v-klasse-gal-3.jpg', '/images/fahrzeuge/v-klasse-gal-4.jpg', '/images/fahrzeuge/v-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-v-klasse.jpg' },
    vover: { titleLead: 'Room for', titleAccent: 'the whole group', body: 'Anyone looking for V-Class hire Vienna and beyond gets room for up to seven passengers with luggage. Ideal for families, small groups or business teams who want to travel together. Comfortable single seats and a flexible interior make even longer rides pleasant.' },
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
    seo: {
      eyebrow: 'Mercedes V-Class Vienna',
      title: 'Your Mercedes V-Class with chauffeur for Vienna and the region and',
      paragraphs: [
        'When several people travel together, the minivan with driver Vienna is the comfortable solution. The Mercedes V-Class offers room for up to seven passengers and their luggage without feeling cramped.',
        'Comfortable seats and a flexible interior make it ideal for families, small travel groups or business teams.',
        'Whether an airport transfer with plenty of luggage, an excursion or a shared ride to a meeting, everyone travels together and relaxed. Water is on board, child seats on request.',
        'You book the van directly through our online booking system, see the fixed price in advance and pay by credit card, Apple Pay or Google Pay.',
        'For airport runs with plenty of luggage, family trips or team outings, the V-Class keeps everyone together in comfort.',
        'That way your group arrives together and without changing vehicles, while your chauffeur takes care of the route, the luggage and parking.',
      ],
    },
    faq: [
      { q: 'How many people fit in the V-Class?', a: 'Up to seven passengers with luggage. For larger groups the VIP minibus or Sprinter are a good fit.' },
      { q: 'What is the V-Class suited for?', a: 'For families, small groups and teams, for airport transfers with plenty of luggage and shared excursions and meetings.' },
      { q: 'Are child seats possible?', a: 'Yes, on request we provide several child seats. State the wish when booking or by WhatsApp.' },
    ],
  },

  {
    slug: 's-klasse',
    slugEn: 's-class',
    name: 'S-Class',
    heroTitle: 'Mercedes S-Class',
    klass: 'First Class',
    group: 'First Class Sedan',
    cardKlass: 'First Class · Sedan',
    cardSpecs: '3 guests · 2–4 cases · VIP & Representation',
    metaTitle: 'Mercedes S-Class with Chauffeur Vienna | Hire',
    metaDescription: 'Mercedes S-Class with chauffeur in Vienna: first-class limousine for business meetings and special occasions. Fixed price, discreet, book online.',
    heroSub: 'The first-class limousine with chauffeur. Top comfort and discretion for business meetings and special occasions in Vienna. You see the fixed price',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–4 cases' },
      { label: 'Body', value: 'Luxury Sedan' },
    ],
    img: { hero: '/images/fahrzeuge/s-klasse-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-s-klasse.jpg', vorteil: '/images/fahrzeuge/vorteil-s-klasse.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/s-klasse-gal-1.jpg', '/images/fahrzeuge/s-klasse-gal-2.jpg', '/images/fahrzeuge/s-klasse-gal-3.jpg', '/images/fahrzeuge/s-klasse-gal-4.jpg', '/images/fahrzeuge/s-klasse-gal-5.jpg'], card: '/images/fahrzeuge/card-s-klasse.jpg' },
    vover: { titleLead: 'First class on', titleAccent: 'every ride', body: 'Anyone looking for S-Class hire Vienna and beyond will choose our most representative limousine. Plenty of legroom, a quiet ride and equipment that makes even long journeys pleasant. Ideal for business clients who value comfort and a composed presence. Up to three passengers travel with ease.' },
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
    seo: {
      eyebrow: 'Mercedes S-Class Vienna',
      title: 'Your Mercedes S-Class with chauffeur for Vienna and the region and',
      paragraphs: [
        'When a confident arrival matters, the Mercedes S-Class with driver Vienna is the right choice. As an upper-class limousine it combines a quiet ride, generous space and high-quality equipment that makes every journey pleasant.',
        'Whether a ride to a business meeting, to the airport or to a formal occasion, you travel in comfort and are brought discreetly and punctually to your destination.',
        'In the S-Class water is on board for you, and a child seat is available on request. You see your fixed price when booking and pay conveniently by credit card, Apple Pay or Google Pay.',
        'You book the S-Class directly through our online booking system, see the fixed price at once and pay by credit card, Apple Pay or Google Pay.',
        'For regular business travel we set up fixed corporate terms, so recurring appointments stay smooth and easy to plan.',
        'Whether a single ride or a full day of accompaniment, your chauffeur brings you there with composure while you use the time in the back for yourself.',
      ],
    },
    faq: [
      { q: 'How many people fit in the S-Class?', a: 'Up to three passengers with luggage. For larger groups we recommend the V-Class, VIP minibus or Sprinter.' },
      { q: 'What is the S-Class especially suited for?', a: 'For business meetings, airport transfers and special occasions where comfort and a representative presence matter.' },
      { q: 'How do I book the S-Class with chauffeur?', a: 'Through our online booking system: choose the vehicle, see the fixed price, confirmed at once. For special wishes by WhatsApp or email.' },
    ],
  },

  {
    slug: 'maybach',
    slugEn: 'maybach',
    name: 'Maybach',
    heroTitle: 'Mercedes-Maybach',
    klass: 'Luxury Class',
    group: 'Luxury Class Limousine',
    cardKlass: 'Luxury Class · Limousine',
    cardSpecs: '3 guests · 2–3 cases · Ultimate luxury',
    metaTitle: 'Mercedes-Maybach with Chauffeur Vienna | Hire',
    metaDescription: 'Mercedes-Maybach with chauffeur in Vienna: the flagship for exclusive rides and the highest expectations. Discreet, luxurious, on request.',
    heroSub: 'The flagship with chauffeur. For exclusive occasions and the highest expectations of comfort, equipment and discretion in Vienna. For occasions that',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Body', value: 'Luxury sedan' },
    ],
    img: { hero: '/images/fahrzeuge/maybach-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-maybach.jpg', vorteil: '/images/fahrzeuge/vorteil-maybach.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/maybach-gal-1.jpg', '/images/fahrzeuge/maybach-gal-2.jpg', '/images/fahrzeuge/maybach-gal-3.jpg', '/images/fahrzeuge/maybach-gal-4.jpg', '/images/fahrzeuge/maybach-gal-5.jpg'], card: '/images/fahrzeuge/card-maybach.jpg' },
    vover: { titleLead: 'Luxury in its', titleAccent: 'purest form', body: 'Anyone looking for Maybach hire Vienna and beyond chooses our most exclusive vehicle. It offers the highest level of comfort, fine materials and equipment that satisfies even the most demanding guests. Ideal for special occasions and VIP guests.' },
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
    seo: {
      eyebrow: 'Mercedes-Maybach Vienna',
      title: 'Your Mercedes-Maybach with chauffeur for Vienna and the region and',
      paragraphs: [
        'The Maybach with driver Vienna stands for luxury without compromise. Anyone seeking the very best for special occasions, important guests or an unforgettable evening finds the right choice in this flagship.',
        'The finest materials, exceptional comfort and a calm, confident ride make every journey an experience.',
        'Your chauffeur is especially discreet and prepared for the highest expectations. As the Maybach is an exclusive vehicle, we are glad to plan your ride personally with you, reachable by WhatsApp or email.',
        'As the Maybach is an exclusive vehicle, we plan every ride personally with you and agree the schedule, route and wishes in advance.',
        'For receptions, weddings or looking after important guests, the Maybach is the first choice when discretion and a special presence matter.',
        'Simply reach us by WhatsApp or email, and we put together an individual quote for your occasion.',
      ],
    },
    faq: [
      { q: 'How many people fit in the Maybach?', a: 'Up to three passengers. The Maybach is designed for the highest comfort for a small number of guests.' },
      { q: 'What is the Maybach suited for?', a: 'For VIP guests, special occasions and rides where exclusivity, comfort and discretion come first.' },
      { q: 'How do I book the Maybach?', a: 'As it is an exclusive vehicle, we plan your ride personally. Reach us by WhatsApp or email for a quote.' },
    ],
  },

  {
    slug: 'eqe',
    slugEn: 'eqe',
    name: 'Mercedes EQE',
    heroTitle: 'Mercedes EQE',
    klass: 'Electric',
    group: 'Electric Vehicles',
    cardKlass: 'Electric · Sedan',
    cardSpecs: '3 guests · 2–3 cases · Emission-free',
    metaTitle: 'Mercedes EQE Electric with Chauffeur Vienna',
    metaDescription: 'Mercedes EQE with chauffeur in Vienna: all-electric business limousine, quiet and emission-free. Comfortable, sustainable, book online.',
    heroSub: 'The all-electric business limousine with chauffeur. Quiet, emission-free and comfortable for sustainable rides in Vienna. Quiet, clean and',
    heroStats: [
      { label: 'Passengers', value: 'Max. 3', accent: 'Max.' },
      { label: 'Luggage', value: '2–3 cases' },
      { label: 'Drive', value: 'Electric' },
    ],
    img: { hero: '/images/fahrzeuge/mercedes-eqe-gal-1.jpg', ueberblick: '/images/fahrzeuge/ueberblick-mercedes-eqe.jpg', vorteil: '/images/fahrzeuge/vorteil-mercedes-eqe.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/mercedes-eqe-gal-1.jpg', '/images/fahrzeuge/mercedes-eqe-gal-2.jpg', '/images/fahrzeuge/mercedes-eqe-gal-3.jpg', '/images/fahrzeuge/mercedes-eqe-gal-4.jpg', '/images/fahrzeuge/mercedes-eqe-gal-5.jpg'], card: '/images/fahrzeuge/card-mercedes-eqe.jpg' },
    vover: { titleLead: 'Electric and', titleAccent: 'comfortable', body: 'Anyone looking for EQE hire Vienna and beyond gets our all-electric business limousine. It runs almost silently and locally emission-free, while offering the familiar comfort of the upper class. Ideal for guests who value sustainability without giving up space.' },
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
    seo: {
      eyebrow: 'Mercedes EQE Vienna',
      title: 'Your all-electric Mercedes EQE with chauffeur for Vienna and',
      paragraphs: [
        'With the electric limousine with driver Vienna you combine comfort and responsibility. The all-electric Mercedes EQE runs almost silently and locally emission-free, which makes every ride especially calm and pleasant.',
        'Despite the electric drive you give up nothing: the interior is spacious, high-quality and quiet.',
        'For companies with sustainability goals the EQE is the ideal choice for meetings and transfers. Water is on board, a child seat on request.',
        'You book the EQE directly through our online booking system, see the fixed price at once and pay conveniently and paperlessly by credit card, Apple Pay or Google Pay.',
        'In the EQE water is on board for you, a child seat on request, and the quiet interior makes calls and focused work along the way comfortable.',
        'That way you travel in a climate-friendly and comfortable way at once, with a driver who knows Vienna and brings you reliably to your destination.',
      ],
    },
    faq: [
      { q: 'Is the EQE really all-electric?', a: 'Yes. The Mercedes EQE runs purely on electricity, locally emission-free and especially quiet, with no loss of comfort versus the upper class.' },
      { q: 'Who is the EQE suited for?', a: 'For guests and companies who value sustainability and still want to travel comfortably and representatively.' },
      { q: 'How do I book the EQE?', a: 'Through our online booking system with instant confirmation. For corporate terms reach us by WhatsApp or email.' },
    ],
  },

  {
    slug: 'vip-minibus',
    slugEn: 'vip-minibus',
    name: 'VIP Sprinter',
    heroTitle: 'VIP Minibus',
    klass: 'VIP Class',
    group: 'VIP Class Minibus',
    cardKlass: 'VIP Class · Minibus',
    cardSpecs: 'Up to 12 guests · Lounge interior · VIP groups',
    metaTitle: 'VIP Minibus with Chauffeur in Vienna | Hire',
    metaDescription: 'VIP minibus with chauffeur in Vienna: comfortable minibus for groups up to 12 people. Ideal for events and excursions. Request now.',
    heroSub: 'The comfortable minibus with chauffeur. Plenty of room and comfort for groups of up to twelve people in Vienna. Everyone stays comfortably together.',
    heroStats: [
      { label: 'Passengers', value: 'Up to 12', accent: 'Up to' },
      { label: 'Interior', value: 'VIP lounge' },
      { label: 'Body', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/vip-minibus-hero.webp', ueberblick: '/images/fahrzeuge/ueberblick-vip-minibus.webp', vorteil: '/images/fahrzeuge/vorteil-vip-minibus.jpg', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/vip-minibus-gal-1.jpg', '/images/fahrzeuge/vip-minibus-gal-2.jpg', '/images/fahrzeuge/vip-minibus-gal-3.jpg', '/images/fahrzeuge/vip-minibus-gal-4.jpg', '/images/fahrzeuge/vip-minibus-gal-5.jpg'], card: '/images/fahrzeuge/card-vip-minibus.webp' },
    vover: { titleLead: 'Comfort for', titleAccent: 'larger groups', body: 'Anyone looking for minibus hire Vienna and beyond will find the comfortable solution in the VIP minibus. Up to twelve passengers travel comfortably and together, with pleasant seats and plenty of room for luggage. Ideal for company outings, weddings or travel groups.' },
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
    seo: {
      eyebrow: 'VIP Minibus Vienna',
      title: 'Your VIP minibus with chauffeur for Vienna and the region and your',
      paragraphs: [
        'When a larger group wants to travel together and in comfort, the minibus with driver Vienna is the right choice. With room for up to twelve passengers it combines the togetherness of a group ride with the comfort of a refined vehicle.',
        'Pleasant seats, generous headroom and a bright cabin keep even longer journeys relaxed, so the whole group arrives fresh and in good spirits.',
        'Comfortable seats, air conditioning and plenty of storage make it ideal for company outings, weddings or travel groups. Everyone stays together, no one gets lost, and your chauffeur takes care of the route.',
        'As group rides often need individual planning, we agree the route, pickup times and any stops with you personally in advance.',
        'You can reach us any time by WhatsApp or email and receive a clear quote with a fixed price for the whole group without delay.',
        'That way the VIP minibus becomes the relaxed way for everyone to arrive together, with no worry about logistics or parking.',
      ],
    },
    faq: [
      { q: 'How many people fit in the VIP minibus?', a: 'Up to twelve passengers with luggage. For even larger groups the 20-seater Sprinter is ready.' },
      { q: 'What is the VIP minibus suited for?', a: 'For company outings, wedding parties, club and travel groups who want to travel together and in comfort.' },
      { q: 'How do I book the VIP minibus?', a: 'Best by request with details on group and occasion. You receive a quote quickly, reachable by WhatsApp or email.' },
    ],
  },

  {
    slug: 'business-sprinter',
    slugEn: 'business-sprinter',
    name: 'Sprinter',
    heroTitle: 'Business Sprinter',
    klass: 'Sprinter',
    group: 'Business Sprinter',
    cardKlass: 'Business · Sprinter',
    cardSpecs: 'Up to 20 guests · lots of luggage · Groups & Events',
    metaTitle: 'Business Sprinter with Chauffeur Vienna | Hire',
    metaDescription: 'Business Sprinter with chauffeur in Vienna: 20-seater for large groups, events and delegations. Plenty of room, one driver. Request now.',
    heroSub: 'The 20-seater with chauffeur. Maximum room for large groups, events and delegations in Vienna and beyond. One group, one vehicle, one driver.',
    heroStats: [
      { label: 'Passengers', value: 'Up to 19', accent: 'Up to' },
      { label: 'Luggage', value: 'Very much' },
      { label: 'Body', value: 'Sprinter' },
    ],
    img: { hero: '/images/fahrzeuge/business-sprinter-gal-1.webp', ueberblick: '/images/fahrzeuge/ueberblick-business-sprinter.webp', vorteil: '/images/fahrzeuge/vorteil-business-sprinter.webp', kabineBg: KAB_BG, gallery: ['/images/fahrzeuge/business-sprinter-gal-1.webp', '/images/fahrzeuge/business-sprinter-gal-2.webp', '/images/fahrzeuge/business-sprinter-gal-3.webp', '/images/fahrzeuge/business-sprinter-gal-4.webp', '/images/fahrzeuge/business-sprinter-gal-5.webp'], card: '/images/fahrzeuge/card-business-sprinter.jpg' },
    vover: { titleLead: 'The whole group', titleAccent: 'on board', body: 'Anyone looking for Sprinter hire Vienna and beyond gets our largest vehicle with room for up to twenty passengers. Ideal for large groups, company events, delegations and travel parties. Instead of several vehicles, everyone travels together in one, coordinated and on time.' },
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
    seo: {
      eyebrow: 'Business Sprinter Vienna',
      title: 'Your Business Sprinter with chauffeur for Vienna and the region and',
      paragraphs: [
        'The 20-seater with driver Vienna is the solution when truly many people need to reach the destination together. With up to twenty seats, the Business Sprinter carries whole groups, company teams or delegations in a single vehicle.',
        'With up to twenty seats it brings whole groups, company teams or delegations together in a single vehicle, instead of splitting them across several cars.',
        'That saves coordination, keeps everyone together and ensures a punctual, shared arrival. Generous storage takes plenty of luggage, and the experienced chauffeur knows the best routes.',
        'As large group rides need individual planning, we agree the route, pickup points and schedule with you personally in advance.',
        'For company events, delegations or travel groups we prepare a transparent quote with a fixed price for the whole vehicle.',
        'Simply reach us by WhatsApp or email, and your entire group travels together, coordinated and on time.',
      ],
    },
    faq: [
      { q: 'How many people fit in the Sprinter?', a: 'Up to twenty passengers with luggage. This makes it our largest vehicle for group transfers.' },
      { q: 'What is the Business Sprinter suited for?', a: 'For large groups, company events, delegations and travel parties who want to travel together in one vehicle.' },
      { q: 'How do I book the Sprinter?', a: 'Best by request with details on group, route and occasion. You receive a quote quickly by WhatsApp or email.' },
    ],
  },
];

import type { Lang } from './i18n';
export const getVehicles = (lang: Lang): Vehicle[] => (lang === 'en' ? VEHICLES_DATA_EN : VEHICLES_DATA);
