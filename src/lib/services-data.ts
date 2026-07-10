// Vienna Grand Chauffeurs — content for every Leistungen (service) page.
// One entry per service drives the shared /leistungen/[slug].astro template.
// Copy is production-ready German placeholder; swap freely when the final
// SEO texts land. Images reuse existing assets until the real photos arrive.

export interface ServiceCard {
  icon: string;
  title: string;
  text: string;
}

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
    cards: [ServiceCard, ServiceCard];
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

// Shared icon assets (placeholders reused across services until final icons land).
const IC = {
  flug: '/images/services/feat-flug.svg',
  around: '/images/services/feat-247.svg',
  meet: '/images/services/feat-meet.svg',
  preis: '/images/services/feat-preis.svg',
  plane: '/images/services/icon-plane.svg',
  user: '/images/services/icon-user.svg',
};

export const SERVICES_DATA: Service[] = [
  {
    slug: 'flughafen-transfer-wien',
    metaTitle: 'Flughafentransfer Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Chauffeurservice zum Wiener Flughafen: diskret, pünktlich und komfortabel. Echtzeit-Flugüberwachung, Meet & Greet am Gate und transparente Fixpreise.',
    heroImg: '/images/services/hero-flughafen.jpg',
    hero: {
      title: 'Flughafen Transfer Wien',
      sub: 'Pünktlich und entspannt zum oder vom Flughafen Wien. Wir behalten Ihren Flug im Blick, holen Sie zuverlässig ab und bringen Sie ohne Stress ans Ziel.',
    },
    heroFeatures: [
      { icon: IC.flug, label: 'Flugüberwachung inklusive' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.meet, label: 'Meet & Greet am Gate' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Flughafentransfer Wien', '24/7 verfügbar', 'Meet & Greet am Gate', 'Transparente Fixpreise', 'VIE Innere Stadt'],
    intro: {
      eyebrow: 'Flughafen Transfer',
      title: 'Pünktlich. Diskret. Komfortabel.',
      body: 'Unser Flughafentransfer bringt Sie stressfrei zum Wiener Flughafen und wieder zurück. Wir verfolgen Ihren Flug in Echtzeit, passen die Abholzeit flexibel an und empfangen Sie persönlich am Gate. Kein Suchen, kein Warten — nur eine ruhige, komfortable Fahrt in einem gepflegten Premiumfahrzeug mit einem erfahrenen Chauffeur an Ihrer Seite.',
      cards: [
        { icon: IC.plane, title: 'Echtzeit-Flugüberwachung', text: 'Wir behalten Ihren Flug im Blick und passen die Abholzeit bei Verspätungen automatisch an.' },
        { icon: IC.user, title: 'Meet & Greet am Gate', text: 'Ihr Chauffeur erwartet Sie persönlich mit Namensschild direkt nach der Ankunft im Terminal.' },
      ],
      image: { src: '/images/services/intro-airport.jpg', alt: 'Chauffeur mit Mercedes E-Klasse vor dem Flughafenterminal' },
    },
    benefit: {
      title: 'Mehr als eine Fahrt von A nach B.',
      body: 'Ob früher Abflug oder späte Ankunft, unser Chauffeurservice bringt Sie stressfrei zum Wiener Flughafen und wieder nach Hause. Kein Warten, keine Überraschungen, nur eine entspannte Fahrt.',
      items: [
        'Echtzeit-Flugüberwachung & flexible Abholzeiten',
        'Persönlicher Meet & Greet Service am Gate',
        'Gepflegte Premiumfahrzeuge mit erfahrenen Chauffeuren',
        'Transparente Fixpreise, keine versteckten Kosten',
      ],
      image: { src: '/images/services/benefit-interior.jpg', alt: 'Beige Ledersitze im Fond einer Mercedes S-Klasse' },
      badge: { big: '24/7', sm: 'Für Sie bereit' },
    },
    seo: {
      eyebrow: 'Flughafen Transfer Wien',
      title: 'Chauffeurservice zum Wiener Flughafen — diskret, pünktlich und komfortabel.',
      paragraphs: [
        'Wer einen zuverlässigen Flughafentransfer in Wien sucht, erwartet mehr als nur eine Fahrt von A nach B. Vienna Grand Chauffeurs bietet einen professionellen Chauffeurservice, der Sie pünktlich, sicher und entspannt zum Flughafen Wien-Schwechat bringt und ebenso zuverlässig wieder abholt. Vom ersten Kontakt bis zur Ankunft am Ziel steht ein durchdachter Ablauf im Mittelpunkt, damit Ihre Reise ohne Stress beginnt und endet.',
        'Pünktlichkeit ist beim Flughafentransfer entscheidend. Unser erfahrenes Team verfolgt Ihren Flug in Echtzeit und passt die Abholzeit flexibel an — auch bei kurzfristigen Verspätungen oder früheren Landungen. So stehen wir immer genau dann bereit, wenn Sie uns brauchen, ob früher Morgenflug oder späte Nachtankunft. Unser Service ist 24 Stunden am Tag, 7 Tage die Woche für Sie verfügbar.',
        'Bei der Ankunft empfängt Sie Ihr Chauffeur persönlich mit einem Meet & Greet Service direkt am Gate beziehungsweise in der Ankunftshalle. Er begleitet Sie mit Ihrem Gepäck bis zum Fahrzeug, sodass kein Suchen und kein Warten nötig ist. Diskretion, Aufmerksamkeit und ein souveränes Auftreten sind für unsere Chauffeure selbstverständlich.',
        'Alle Fahrzeuge unserer Premiumflotte sind gepflegt, klimatisiert und auf höchsten Komfort ausgelegt. Für Einzelreisende und Paare empfehlen wir die Mercedes E-Klasse oder S-Klasse, für Gruppen und viel Gepäck die geräumige V-Klasse mit bis zu sieben Sitzplätzen. So finden wir für jede Reisesituation das passende Fahrzeug.',
        'Transparente Fixpreise ohne versteckte Kosten sind bei uns von Anfang an selbstverständlich. Sie erhalten Ihren Endpreis bereits bei der Buchung — inklusive Maut, Wartezeit und Mehrwertsteuer. Bei Flugverspätungen entstehen keine zusätzlichen Gebühren, sodass Sie Ihren Transfer sicher und ohne Überraschungen kalkulieren können.',
        'Unser Flughafentransfer steht Ihnen für Privatreisen, Geschäftsflüge und Gruppenfahrten zur Verfügung — in Wien und ganz Österreich. Ob Transfer zum Hotel, ins Büro oder nach Hause, wir bringen Sie zuverlässig ans Ziel. Buchen Sie Ihren Flughafentransfer bequem online oder kontaktieren Sie uns direkt — wir antworten schnell, unkompliziert und beraten Sie gerne persönlich.',
      ],
    },
    faq: [
      { q: 'Wie buche ich einen Flughafentransfer?', a: 'Ganz einfach online über unser Anfrageformular oder telefonisch. Nennen Sie uns Flugnummer, Datum und Adresse, Sie erhalten umgehend eine Bestätigung mit Fixpreis und allen Details.' },
      { q: 'Was passiert, wenn mein Flug Verspätung hat?', a: 'Wir überwachen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an. Auch bei Verspätungen entstehen Ihnen keine zusätzlichen Kosten — Ihr Chauffeur ist da, wenn Sie landen.' },
      { q: 'Wo wartet mein Chauffeur bei der Ankunft?', a: 'Ihr Chauffeur erwartet Sie mit Namensschild direkt in der Ankunftshalle und begleitet Sie mit Ihrem Gepäck bis zum Fahrzeug.' },
      { q: 'Ist der Preis für den Transfer festgelegt oder variabel?', a: 'Sie erhalten einen transparenten Fixpreis bereits bei der Buchung — inklusive Maut, Wartezeit und MwSt., ganz ohne versteckte Kosten.' },
      { q: 'Kann ich auch für Gruppenreisen oder viel Gepäck buchen?', a: 'Selbstverständlich. Für Gruppen und viel Gepäck steht Ihnen unsere Mercedes V-Klasse mit bis zu sieben Sitzplätzen zur Verfügung.' },
      { q: 'Welche Fahrzeuge stehen für den Flughafentransfer zur Verfügung?', a: 'Zur Wahl stehen die Mercedes E-Klasse und S-Klasse für Limousinen-Komfort sowie die V-Klasse für Gruppen und mehr Gepäck.' },
    ],
  },

  {
    slug: 'chauffeurservice',
    metaTitle: 'Chauffeurservice Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Persönlicher Chauffeurservice in Wien für Business, Events und private Anlässe. Diskret, flexibel und stilvoll in gepflegten Mercedes-Benz Fahrzeugen.',
    heroImg: '/images/services/chauffeurservice-hero.jpg',
    hero: {
      title: 'Chauffeurservice Wien',
      sub: 'Ihr persönlicher Chauffeur für Geschäftstermine, Events oder private Anlässe — diskret, flexibel und immer auf Ihre Wünsche abgestimmt.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Persönlicher Chauffeur' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.meet, label: 'Diskret & professionell' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Chauffeurservice Wien', 'Business & Events', 'Diskret & flexibel', 'Premium-Oberklasse', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Chauffeurservice',
      title: 'Ihr Chauffeur. Ganz nach Ihren Wünschen.',
      body: 'Ob wichtiger Geschäftstermin, Abendveranstaltung oder ein Tag voller Erledigungen — unser Chauffeurservice stellt sich flexibel auf Ihren Ablauf ein. Ihr fester Chauffeur bringt Sie diskret und pünktlich ans Ziel, wartet auf Sie und denkt mit. So bleibt Ihnen der Kopf frei für das, was zählt.',
      cards: [
        { icon: IC.user, title: 'Persönliche Betreuung', text: 'Ein fester Ansprechpartner, der Ihren Ablauf kennt und sich auf Ihre Wünsche einstellt.' },
        { icon: IC.meet, title: 'Absolute Diskretion', text: 'Vertrauliche Gespräche bleiben im Fahrzeug — Diskretion ist für uns selbstverständlich.' },
      ],
      image: { src: '/images/services/chauffeurservice-intro.jpg', alt: 'Chauffeur in dunklem Anzug neben einer schwarzen Mercedes S-Klasse in Wien' },
    },
    benefit: {
      title: 'Souverän unterwegs, an jedem Termin.',
      body: 'Unser Chauffeurservice ist mehr als ein Fahrdienst. Er ist Ihre ruhige Basis an einem vollen Tag — flexibel planbar, diskret und immer pünktlich.',
      items: [
        'Fester, persönlicher Chauffeur für Ihren Tag',
        'Flexible Routen und spontane Stopps möglich',
        'Diskretion und Etikette bei jedem Anlass',
        'Transparente Fixpreise ohne versteckte Kosten',
      ],
      image: { src: '/images/services/chauffeurservice-benefit.jpg', alt: 'Fahrgast entspannt im Fond einer Mercedes-Benz mit cognacfarbenem Leder' },
      badge: { big: '100%', sm: 'Diskret' },
    },
    seo: {
      eyebrow: 'Chauffeurservice Wien',
      title: 'Persönlicher Chauffeurservice in Wien — für Business, Events und private Anlässe.',
      paragraphs: [
        'Ein professioneller Chauffeurservice in Wien bedeutet mehr als eine komfortable Fahrt: Er schenkt Ihnen Zeit, Ruhe und die Gewissheit, überall pünktlich und entspannt anzukommen. Vienna Grand Chauffeurs stellt Ihnen einen erfahrenen, diskreten Chauffeur zur Seite, der sich ganz auf Ihren Ablauf einstellt — ob für Geschäftstermine, Messen, Abendveranstaltungen oder private Fahrten.',
        'Gerade im geschäftlichen Umfeld zählt jeder Moment. Während Ihr Chauffeur sich um Verkehr, Route und Parkplatz kümmert, bleibt Ihnen die Zeit im Fond, um Termine vorzubereiten, Anrufe zu erledigen oder einfach durchzuatmen. Diskretion und Etikette sind dabei für unsere Chauffeure eine Selbstverständlichkeit.',
        'Unsere gepflegte Mercedes-Benz Oberklasse steht für ruhigen Komfort und ein souveränes Auftreten. Vom repräsentativen Geschäftstermin bis zur eleganten Abendveranstaltung finden wir das passende Fahrzeug — von der E-Klasse über die S-Klasse bis zur geräumigen V-Klasse für kleinere Gruppen.',
        'Sie bestimmen Route und Tempo, wir kümmern uns um den Rest. Spontane Stopps, kurzfristige Planänderungen oder Wartezeiten zwischen Terminen sind für uns kein Problem, sondern Teil eines flexiblen Services, der sich Ihrem Tag anpasst — und nicht umgekehrt.',
        'Transparente Fixpreise sorgen für volle Kostenkontrolle. Sie erhalten Ihren Preis im Voraus, ohne versteckte Zuschläge, sodass Sie Ihren Chauffeurservice sicher und planbar buchen können — für einzelne Fahrten ebenso wie für regelmäßige Termine.',
        'Ob für Unternehmen, Privatpersonen oder internationale Gäste — unser Chauffeurservice ist in Wien und ganz Österreich für Sie im Einsatz. Kontaktieren Sie uns telefonisch oder über das Anfrageformular und lassen Sie sich ein individuelles Angebot erstellen. Wir beraten Sie gerne persönlich und diskret.',
      ],
    },
    faq: [
      { q: 'Kann ich einen Chauffeur für mehrere Stunden buchen?', a: 'Ja. Sie können Ihren Chauffeur stundenweise oder für den ganzen Tag buchen — ideal für mehrere Termine, Events oder Stadtfahrten.' },
      { q: 'Ist der Chauffeur auch für Geschäftstermine geeignet?', a: 'Selbstverständlich. Unsere Chauffeure sind auf Diskretion, Etikette und pünktliche Business-Fahrten geschult.' },
      { q: 'Kann ich spontane Stopps oder Routenänderungen vornehmen?', a: 'Ja, Ihr Chauffeur richtet sich flexibel nach Ihren Wünschen — auch kurzfristige Änderungen sind kein Problem.' },
      { q: 'Welche Fahrzeuge stehen zur Verfügung?', a: 'Zur Wahl stehen die Mercedes E-Klasse und S-Klasse sowie die V-Klasse für Gruppen und mehr Gepäck.' },
      { q: 'Wie erhalte ich ein Angebot?', a: 'Kontaktieren Sie uns telefonisch oder über das Anfrageformular. Sie erhalten umgehend einen transparenten Fixpreis.' },
    ],
  },

  {
    slug: 'chauffeur-pro-stunde',
    metaTitle: 'Chauffeur pro Stunde Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Buchen Sie Ihren Chauffeur stundenweise in Wien. Maximale Flexibilität für mehrere Termine, Stadtfahrten und spontane Stopps — mit Fixpreis pro Stunde.',
    heroImg: '/images/services/chauffeur-pro-stunde-hero.jpg',
    hero: {
      title: 'Chauffeur pro Stunde',
      sub: 'Buchen Sie Ihren Chauffeur stundenweise und bleiben Sie völlig flexibel — ideal für mehrere Termine, Stadtfahrten oder spontane Stopps an einem Tag.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Flexible Stundenbuchung' },
      { icon: IC.user, label: 'Chauffeur wartet auf Sie' },
      { icon: IC.meet, label: 'Mehrere Stopps möglich' },
      { icon: IC.preis, label: 'Fixpreis pro Stunde' },
    ],
    marquee: ['Chauffeur pro Stunde', 'Stundenweise buchen', 'Mehrere Termine', 'Volle Flexibilität', 'Ganz Wien'],
    intro: {
      eyebrow: 'Chauffeur pro Stunde',
      title: 'Ihre Zeit. Ihr Tempo. Ihr Chauffeur.',
      body: 'Mit unserer stundenweisen Buchung haben Sie Ihren Chauffeur genau so lange, wie Sie ihn brauchen. Er wartet zwischen Ihren Terminen, bringt Sie zum nächsten Ziel und bleibt den ganzen Tag an Ihrer Seite. Ideal für Geschäftsreisende, Shopping-Touren oder einen dicht gefüllten Tag in der Stadt.',
      cards: [
        { icon: IC.around, title: 'Flexible Stunden', text: 'Buchen Sie ab zwei Stunden und verlängern Sie bei Bedarf spontan — ganz nach Ablauf.' },
        { icon: IC.user, title: 'Chauffeur bleibt da', text: 'Ihr Chauffeur wartet zwischen den Terminen und ist sofort wieder für Sie bereit.' },
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-intro.jpg', alt: 'Chauffeur prüft die Uhrzeit neben einer schwarzen Mercedes E-Klasse' },
    },
    benefit: {
      title: 'Ein Chauffeur für den ganzen Tag.',
      body: 'Statt einzelner Fahrten haben Sie Ihren Chauffeur flexibel zur Verfügung — perfekt, wenn ein Termin den nächsten jagt und Sie zwischendurch nicht auf ein Taxi warten möchten.',
      items: [
        'Buchung ab zwei Stunden, stundenweise verlängerbar',
        'Chauffeur wartet zwischen Ihren Terminen',
        'Beliebig viele Stopps und Routenänderungen',
        'Transparenter Fixpreis pro Stunde',
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-benefit.jpg', alt: 'Mantel und Ledertasche auf dem Rücksitz einer Mercedes-Benz' },
      badge: { big: '2 h', sm: 'Ab zwei Stunden' },
    },
    seo: {
      eyebrow: 'Chauffeur pro Stunde Wien',
      title: 'Stundenweise Chauffeur in Wien — maximale Flexibilität an jedem Tag.',
      paragraphs: [
        'Wenn ein Termin den nächsten jagt, ist ein Chauffeur pro Stunde die entspannteste Lösung. Statt einzelne Fahrten zu buchen, haben Sie Ihren persönlichen Chauffeur für die gesamte Dauer zur Verfügung — er wartet, bringt Sie weiter und passt sich flexibel Ihrem Ablauf an. Vienna Grand Chauffeurs macht Ihren Tag in Wien planbar, komfortabel und stressfrei.',
        'Der große Vorteil der stundenweisen Buchung liegt in ihrer Flexibilität. Sie müssen nicht bei jedem Ortswechsel neu planen oder auf ein Taxi warten — Ihr Chauffeur bleibt in der Nähe und ist sofort wieder zur Stelle, sobald Sie weiterfahren möchten. So verlieren Sie zwischen den Terminen keine Zeit.',
        'Die stundenweise Buchung eignet sich ideal für Geschäftsreisende mit mehreren Terminen, für Shopping- und Kulturtouren oder für Gäste, die die Stadt in Ruhe erleben möchten. Auch bei Messen, Tagungen und Firmenbesuchen bewährt sich ein fester Chauffeur, der Ihren Zeitplan kennt und mitdenkt.',
        'Sie reisen in gepflegten Premiumfahrzeugen der Mercedes-Benz Oberklasse, begleitet von erfahrenen Chauffeuren mit Ortskenntnis. Ob E-Klasse, S-Klasse oder V-Klasse für kleinere Gruppen — Sie wählen das Fahrzeug, das zu Anlass und Personenzahl passt.',
        'Abgerechnet wird zu einem transparenten Fixpreis pro Stunde, ohne versteckte Kosten oder Kilometerzuschläge im Stadtgebiet. Sie buchen ab zwei Stunden und verlängern jederzeit spontan, falls Ihr Tag länger wird als geplant — volle Kostenkontrolle inklusive.',
        'Ob für einen einzelnen intensiven Tag oder wiederkehrende Termine — unser Stundenchauffeur ist in Wien und ganz Österreich für Sie unterwegs. Nennen Sie uns Datum, Uhrzeit und geplante Dauer, und wir stellen Ihnen unverbindlich ein Angebot zusammen. Wir freuen uns auf Ihre Anfrage.',
      ],
    },
    faq: [
      { q: 'Wie lange muss ich mindestens buchen?', a: 'Die stundenweise Buchung ist ab zwei Stunden möglich und lässt sich bei Bedarf spontan verlängern.' },
      { q: 'Wartet der Chauffeur zwischen meinen Terminen?', a: 'Ja. Ihr Chauffeur bleibt während der gebuchten Zeit für Sie bereit und wartet zwischen den Terminen.' },
      { q: 'Kann ich die Route frei bestimmen?', a: 'Selbstverständlich. Sie geben Ziele und Tempo vor, Ihr Chauffeur richtet sich flexibel danach.' },
      { q: 'Wie wird abgerechnet?', a: 'Sie zahlen einen transparenten Fixpreis pro Stunde — ohne versteckte Kosten oder Kilometerzuschläge im Stadtgebiet.' },
      { q: 'Welche Fahrzeuge kann ich wählen?', a: 'Zur Wahl stehen die Mercedes E-Klasse und S-Klasse sowie die V-Klasse für Gruppen.' },
    ],
  },

  {
    slug: 'limousinen-service-wien',
    metaTitle: 'Limousinenservice Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Stilvoller Limousinenservice in Wien für Hochzeiten, Events und besondere Anlässe. Gepflegte Mercedes-Benz Limousinen mit erfahrenem Chauffeur.',
    heroImg: '/images/services/limousinen-service-wien-hero.jpg',
    hero: {
      title: 'Limousinenservice Wien',
      sub: 'Stilvoll unterwegs in gepflegten Mercedes-Benz Limousinen — für Hochzeiten, Events oder besondere Anlässe in Wien und ganz Österreich.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'Für besondere Anlässe' },
      { icon: IC.user, label: 'Erfahrener Chauffeur' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Limousinenservice Wien', 'Hochzeiten & Events', 'Mercedes-Benz Oberklasse', 'Stilvoll ankommen', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Limousinenservice',
      title: 'Stilvoll ankommen. Bei jedem Anlass.',
      body: 'Ob Hochzeit, Gala oder Firmenevent — mit unserem Limousinenservice setzen Sie den passenden Rahmen. Gepflegte Mercedes-Benz Limousinen, ein Chauffeur mit Etikette und ein perfekt abgestimmter Ablauf sorgen dafür, dass Ihr großer Moment reibungslos und elegant verläuft.',
      cards: [
        { icon: IC.meet, title: 'Für Ihren Anlass', text: 'Hochzeit, Gala oder Event — wir stimmen Fahrzeug und Ablauf auf Ihren Moment ab.' },
        { icon: IC.user, title: 'Chauffeur mit Etikette', text: 'Diskret, elegant und aufmerksam — Ihr Chauffeur begleitet den Tag souverän.' },
      ],
      image: { src: '/images/services/limousinen-service-wien-intro.jpg', alt: 'Schwarze Mercedes S-Klasse vor einem festlichen Anlass in Wien' },
    },
    benefit: {
      title: 'Eleganz, die in Erinnerung bleibt.',
      body: 'Ein Limousinenservice ist Teil des Erlebnisses. Wir sorgen dafür, dass Ankunft und Fahrt genauso stilvoll sind wie der Anlass selbst — vom ersten Gruß bis zur letzten Etappe.',
      items: [
        'Gepflegte Mercedes-Benz Limousinen der Oberklasse',
        'Chauffeur mit Etikette und Gespür für den Anlass',
        'Perfekt abgestimmte Abläufe und Wartezeiten',
        'Transparente Fixpreise ohne versteckte Kosten',
      ],
      image: { src: '/images/services/limousinen-service-wien-benefit.jpg', alt: 'Luxuriöser Fond einer Mercedes S-Klasse für besondere Anlässe' },
      badge: { big: 'VIP', sm: 'Erster Klasse' },
    },
    seo: {
      eyebrow: 'Limousinenservice Wien',
      title: 'Limousinenservice in Wien — stilvoll und souverän für jeden Anlass.',
      paragraphs: [
        'Ein exklusiver Limousinenservice in Wien verleiht besonderen Momenten den passenden Rahmen. Ob Hochzeit, Gala, Firmenevent oder ein festlicher Abend — Vienna Grand Chauffeurs bringt Sie stilvoll, pünktlich und diskret ans Ziel. Unsere gepflegten Mercedes-Benz Limousinen und geschulten Chauffeure sorgen für einen Auftritt, der in Erinnerung bleibt.',
        'Der erste Eindruck zählt, und er beginnt bei der Ankunft. Eine elegante Limousine mit aufmerksamem Chauffeur setzt genau das Zeichen, das ein besonderer Anlass verdient — würdevoll, ruhig und mit einem Gespür für den richtigen Moment.',
        'Für Hochzeiten stimmen wir Fahrzeug, Route und Timing individuell auf Ihren Tag ab, damit Brautpaar und Gäste entspannt und pünktlich ankommen. Auch für Bälle, Premieren, Firmenfeiern und Staatsempfänge ist unser Limousinenservice die stilvolle Wahl.',
        'Unsere Chauffeure bewegen sich mit Etikette und Diskretion und behalten dabei jedes Detail im Blick — von der Ankunftszeit bis zu Wartezeiten zwischen den einzelnen Programmpunkten. Sie können sich ganz auf Ihren Anlass konzentrieren, während wir den Ablauf im Hintergrund souverän organisieren.',
        'Zur Auswahl stehen die repräsentative Mercedes S-Klasse und E-Klasse sowie die V-Klasse für größere Gruppen. Alle Fahrzeuge sind makellos gepflegt, klimatisiert und auf höchsten Komfort ausgelegt, damit Sie sich vom ersten bis zum letzten Moment wohlfühlen.',
        'Transparente Fixpreise geben Ihnen volle Planungssicherheit, ohne versteckte Kosten. Erzählen Sie uns von Ihrem Anlass, Datum und gewünschtem Ablauf — wir erstellen Ihnen ein individuelles Angebot und begleiten Ihren großen Tag in Wien und ganz Österreich zuverlässig und stilvoll.',
      ],
    },
    faq: [
      { q: 'Bieten Sie einen Hochzeits-Limousinenservice an?', a: 'Ja. Wir stimmen Fahrzeug, Route und Ablauf individuell auf Ihre Hochzeit ab und sorgen für einen reibungslosen, stilvollen Tag.' },
      { q: 'Kann ich die Limousine dekorieren lassen?', a: 'Gerne besprechen wir Ihre Wünsche im Vorfeld. Sprechen Sie uns einfach bei der Buchung darauf an.' },
      { q: 'Wartet der Chauffeur während der Veranstaltung?', a: 'Ja. Wartezeiten lassen sich einplanen, sodass Ihr Chauffeur den gesamten Anlass über für Sie bereitsteht.' },
      { q: 'Welche Limousinen stehen zur Auswahl?', a: 'Zur Wahl stehen die Mercedes E-Klasse und S-Klasse sowie die V-Klasse für größere Gruppen.' },
      { q: 'Wie erhalte ich ein Angebot?', a: 'Kontaktieren Sie uns mit Datum, Anlass und Route — Sie erhalten umgehend einen transparenten Fixpreis.' },
    ],
  },

  {
    slug: 'fahrdienst-diplomaten',
    metaTitle: 'Fahrdienst für Diplomaten & Botschaften — Vienna Grand Chauffeurs',
    metaDescription:
      'Diskreter, sicherheitsbewusster Fahrdienst für Diplomaten, Botschaften und offizielle Gäste in Wien. Höchste Zuverlässigkeit und Vertraulichkeit.',
    heroImg: '/images/services/fahrdienst-diplomaten-hero.jpg',
    hero: {
      title: 'Fahrdienst für Diplomaten',
      sub: 'Diskreter, sicherheitsbewusster Fahrdienst für Diplomaten, Botschaften und offizielle Gäste — mit höchster Zuverlässigkeit und Vertraulichkeit.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'Höchste Diskretion' },
      { icon: IC.user, label: 'Sicherheitsbewusst' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.preis, label: 'Verlässliche Abläufe' },
    ],
    marquee: ['Fahrdienst Diplomaten', 'Botschaften & Konsulate', 'Höchste Diskretion', 'Sicher & zuverlässig', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Diplomaten & Botschaften',
      title: 'Diskretion und Sicherheit an erster Stelle.',
      body: 'Für Diplomaten, Botschaften und offizielle Gäste zählt jedes Detail. Unser Fahrdienst verbindet absolute Vertraulichkeit mit präziser Planung und sicherheitsbewussten Chauffeuren. Vom Empfang am Flughafen bis zum offiziellen Termin sorgen wir für einen reibungslosen, würdevollen Ablauf.',
      cards: [
        { icon: IC.meet, title: 'Absolute Vertraulichkeit', text: 'Diskretion, Zurückhaltung und Verschwiegenheit sind bei jeder Fahrt selbstverständlich.' },
        { icon: IC.user, title: 'Sicherheitsbewusst', text: 'Erfahrene Chauffeure mit Gespür für Protokoll, Timing und sichere Routenführung.' },
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-intro.jpg', alt: 'Diskreter Chauffeur öffnet die Tür einer schwarzen Mercedes S-Klasse' },
    },
    benefit: {
      title: 'Repräsentativ, sicher, zuverlässig.',
      body: 'Offizielle Anlässe verlangen einen Fahrdienst, der Protokoll und Diskretion versteht. Wir arbeiten präzise, vorausschauend und mit höchster Verlässlichkeit — für einen Auftritt, der jeder Situation gerecht wird.',
      items: [
        'Absolute Diskretion und Verschwiegenheit',
        'Sicherheitsbewusste, erfahrene Chauffeure',
        'Präzise Planung nach Protokoll und Timing',
        'Repräsentative Mercedes-Benz Oberklasse',
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-benefit.jpg', alt: 'Privater, getönter Fond einer Mercedes S-Klasse' },
      badge: { big: 'VIP', sm: 'Protokollgerecht' },
    },
    seo: {
      eyebrow: 'Fahrdienst für Diplomaten',
      title: 'Fahrdienst für Diplomaten und Botschaften in Wien — diskret und sicherheitsbewusst.',
      paragraphs: [
        'Ein Fahrdienst für Diplomaten, Botschaften und offizielle Gäste stellt besondere Anforderungen an Diskretion, Sicherheit und Verlässlichkeit. Vienna Grand Chauffeurs bietet einen protokollgerechten Service, der Vertraulichkeit mit präziser Planung verbindet. Unsere erfahrenen Chauffeure kennen die Abläufe offizieller Termine und sorgen für einen würdevollen, reibungslosen Auftritt.',
        'Diskretion steht bei jedem Auftrag an erster Stelle. Vertrauliche Gespräche, sensible Termine und persönliche Informationen bleiben selbstverständlich geschützt. Unsere Chauffeure agieren zurückhaltend, aufmerksam und mit dem nötigen Fingerspitzengefühl für offizielle und protokollarische Situationen.',
        'Sicherheit und Verlässlichkeit sind untrennbar mit einem diplomatischen Fahrdienst verbunden. Wir planen Routen vorausschauend, kalkulieren Zeitpuffer ein und stimmen uns eng mit Ihrem Büro oder Sicherheitsteam ab, damit jeder Termin pünktlich, sicher und ohne Zwischenfälle abläuft.',
        'Ob Empfang am Flughafen Wien, Fahrt zu einem Staatsbesuch oder Begleitung während eines mehrtägigen Programms — wir arbeiten flexibel und rund um die Uhr. Auch wiederkehrende Fahrdienste und feste Zuteilungen eines Chauffeurs sind auf Wunsch möglich.',
        'Für einen repräsentativen Auftritt setzen wir auf die gepflegte Mercedes-Benz Oberklasse, allen voran die S-Klasse, sowie die V-Klasse für Delegationen und Gruppen. Alle Fahrzeuge sind makellos gepflegt und auf Komfort und Sicherheit ausgelegt.',
        'Als verlässlicher Partner für Botschaften, Konsulate und offizielle Delegationen sind wir in Wien und ganz Österreich für Sie im Einsatz. Kontaktieren Sie uns vertraulich, um Ihre Anforderungen zu besprechen — wir erstellen ein maßgeschneidertes Konzept für Ihren Fahrdienst.',
      ],
    },
    faq: [
      { q: 'Arbeiten Sie mit Botschaften und Konsulaten zusammen?', a: 'Ja. Wir betreuen regelmäßig offizielle Gäste und Delegationen und richten uns nach protokollarischen Anforderungen.' },
      { q: 'Wie stellen Sie Diskretion sicher?', a: 'Verschwiegenheit ist für unsere Chauffeure selbstverständlich. Vertrauliche Informationen und Gespräche bleiben stets geschützt.' },
      { q: 'Sind mehrtägige oder wiederkehrende Fahrdienste möglich?', a: 'Selbstverständlich. Wir planen einzelne Termine ebenso wie mehrtägige Programme und feste Fahrdienste.' },
      { q: 'Welche Fahrzeuge kommen zum Einsatz?', a: 'Wir setzen repräsentative Mercedes-Benz Limousinen der Oberklasse ein, für Gruppen auch die V-Klasse.' },
      { q: 'Wie kann ich einen Fahrdienst anfragen?', a: 'Kontaktieren Sie uns direkt — wir besprechen Ihre Anforderungen vertraulich und erstellen ein passendes Angebot.' },
    ],
  },

  {
    slug: 'privatchauffeur-wien',
    metaTitle: 'Privatchauffeur Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Ihr fester Privatchauffeur in Wien für Alltag und besondere Tage. Flexibel, diskret und ganz auf Sie eingestellt — in gepflegten Premiumfahrzeugen.',
    heroImg: '/images/services/privatchauffeur-wien-hero.jpg',
    hero: {
      title: 'Privatchauffeur Wien',
      sub: 'Ihr fester Privatchauffeur für den Alltag oder besondere Tage — flexibel, diskret und ganz auf Sie eingestellt.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Ihr fester Chauffeur' },
      { icon: IC.around, label: 'Flexibel & spontan' },
      { icon: IC.meet, label: 'Diskret & vertraut' },
      { icon: IC.preis, label: 'Transparente Preise' },
    ],
    marquee: ['Privatchauffeur Wien', 'Ihr fester Chauffeur', 'Alltag & besondere Tage', 'Diskret & flexibel', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Privatchauffeur',
      title: 'Ein vertrautes Gesicht am Steuer.',
      body: 'Ein Privatchauffeur bringt Ruhe und Verlässlichkeit in Ihren Alltag. Ob tägliche Fahrten, Termine oder besondere Anlässe — Ihr fester Chauffeur kennt Ihre Gewohnheiten, denkt mit und ist zur Stelle, wenn Sie ihn brauchen. Diskret, flexibel und ganz auf Sie eingestellt.',
      cards: [
        { icon: IC.user, title: 'Fester Ansprechpartner', text: 'Ihr persönlicher Chauffeur kennt Ihre Wünsche und Ihren Ablauf — Fahrt für Fahrt.' },
        { icon: IC.around, title: 'Flexibel verfügbar', text: 'Ob geplant oder spontan, Ihr Privatchauffeur richtet sich nach Ihrem Terminkalender.' },
      ],
      image: { src: '/images/services/privatchauffeur-wien-intro.jpg', alt: 'Privatchauffeur begrüßt einen Stammkunden neben einer Mercedes E-Klasse' },
    },
    benefit: {
      title: 'Mehr Zeit. Weniger Gedanken.',
      body: 'Mit einem festen Privatchauffeur gewinnen Sie Zeit und Gelassenheit. Sie steigen ein, wir kümmern uns um alles Weitere — vom Verkehr bis zum Parkplatz.',
      items: [
        'Ihr fester, persönlicher Chauffeur',
        'Flexibel für Alltag und besondere Anlässe',
        'Diskret, vertraut und immer pünktlich',
        'Transparente Preise ohne versteckte Kosten',
      ],
      image: { src: '/images/services/privatchauffeur-wien-benefit.jpg', alt: 'Gepflegter Fond einer Mercedes-Benz im warmen Morgenlicht' },
      badge: { big: '1:1', sm: 'Ganz persönlich' },
    },
    seo: {
      eyebrow: 'Privatchauffeur Wien',
      title: 'Ihr persönlicher Privatchauffeur in Wien — für Alltag und besondere Tage.',
      paragraphs: [
        'Ein Privatchauffeur in Wien schenkt Ihnen Zeit, Ruhe und Verlässlichkeit — jeden Tag aufs Neue. Vienna Grand Chauffeurs stellt Ihnen einen festen, diskreten Chauffeur zur Seite, der Ihre Gewohnheiten kennt und sich flexibel auf Ihren Alltag einstellt. Ob tägliche Wege, Geschäftstermine oder private Anlässe: Sie steigen ein und lassen sich souverän ans Ziel bringen.',
        'Der Unterschied zu einer einzelnen Fahrt liegt in der Vertrautheit. Ein fester Privatchauffeur weiß, welche Route Sie bevorzugen, wann Sie starten möchten und worauf es Ihnen ankommt. So entsteht ein Service, der sich nahtlos in Ihren Alltag einfügt.',
        'Ob feste Wege wie der Weg ins Büro, Fahrten der Familie, Arzttermine oder abendliche Veranstaltungen — Ihr Chauffeur steht bereit, wenn Sie ihn brauchen. Auch spontane Änderungen sind jederzeit möglich, ohne dass Sie neu planen müssen.',
        'Diskretion ist dabei selbstverständlich. Ihr Privatchauffeur bewegt sich zurückhaltend und aufmerksam, sodass Sie sich im Fond jederzeit ungestört unterhalten, arbeiten oder einfach entspannen können.',
        'Sie reisen in gepflegten Premiumfahrzeugen der Mercedes-Benz Oberklasse, von der E-Klasse über die S-Klasse bis zur V-Klasse. Wir wählen gemeinsam mit Ihnen das Fahrzeug, das am besten zu Ihrem Alltag und Ihren Ansprüchen passt.',
        'Transparente Preise ohne versteckte Kosten, abgestimmt auf Umfang und Häufigkeit Ihrer Fahrten, geben Ihnen volle Planungssicherheit. Ob einzelne Tage oder ein dauerhafter Fahrdienst — kontaktieren Sie uns und wir gestalten Ihren persönlichen Privatchauffeur-Service in Wien und ganz Österreich.',
      ],
    },
    faq: [
      { q: 'Bekomme ich immer denselben Chauffeur?', a: 'Auf Wunsch stellen wir Ihnen einen festen Privatchauffeur zur Seite, der Ihre Gewohnheiten und Ihren Ablauf kennt.' },
      { q: 'Ist der Service auch kurzfristig verfügbar?', a: 'Ja. Ihr Privatchauffeur richtet sich flexibel nach Ihrem Terminkalender — geplant oder spontan.' },
      { q: 'Kann ich den Chauffeur regelmäßig buchen?', a: 'Selbstverständlich. Wir bieten einzelne Fahrten ebenso wie feste, wiederkehrende Fahrdienste an.' },
      { q: 'Welche Fahrzeuge stehen zur Verfügung?', a: 'Zur Wahl stehen die Mercedes E-Klasse und S-Klasse sowie die V-Klasse für mehr Platz.' },
      { q: 'Wie sind die Preise gestaltet?', a: 'Sie erhalten transparente Fixpreise ohne versteckte Kosten — abgestimmt auf Umfang und Häufigkeit Ihrer Fahrten.' },
    ],
  },

  {
    slug: 'shuttle-service-wien',
    metaTitle: 'Shuttle-Service Wien — Vienna Grand Chauffeurs',
    metaDescription:
      'Zuverlässiger Shuttle-Service in Wien für Gruppen, Events und Firmen. Komfortabel in der Mercedes V-Klasse mit erfahrenem Chauffeur.',
    heroImg: '/images/services/shuttle-service-wien-hero.jpg',
    hero: {
      title: 'Shuttle-Service Wien',
      sub: 'Zuverlässiger Shuttle-Service für Gruppen, Events und Firmen — komfortabel und stressfrei in der geräumigen Mercedes V-Klasse.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Bis zu 7 Personen' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.meet, label: 'Für Gruppen & Firmen' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Shuttle-Service Wien', 'Gruppen & Events', 'Mercedes V-Klasse', 'Bis zu 7 Personen', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Shuttle-Service',
      title: 'Gemeinsam ankommen. Ganz entspannt.',
      body: 'Ob Firmenevent, Messe, Hochzeitsgesellschaft oder Gruppenreise — unser Shuttle-Service bringt alle sicher und komfortabel ans Ziel. In der geräumigen Mercedes V-Klasse reisen bis zu sieben Personen mit Gepäck, während sich ein erfahrener Chauffeur um Route, Timing und Komfort kümmert.',
      cards: [
        { icon: IC.user, title: 'Platz für die Gruppe', text: 'Bis zu sieben Personen reisen komfortabel und mit reichlich Gepäck in der V-Klasse.' },
        { icon: IC.meet, title: 'Für Events & Firmen', text: 'Koordinierte Abholungen und Transfers für Messen, Events und Firmenanlässe.' },
      ],
      image: { src: '/images/services/shuttle-service-wien-intro.jpg', alt: 'Geöffnete Schiebetür einer schwarzen Mercedes V-Klasse mit Sitzplätzen' },
    },
    benefit: {
      title: 'Ein Fahrzeug. Die ganze Gruppe.',
      body: 'Statt mehrerer Taxis bringt unser Shuttle-Service alle gemeinsam ans Ziel — koordiniert, pünktlich und komfortabel. Ideal für Firmen, Events und Reisegruppen.',
      items: [
        'Bis zu sieben Personen plus Gepäck',
        'Koordinierte Transfers für Gruppen und Firmen',
        'Erfahrener Chauffeur mit Blick fürs Timing',
        'Transparente Fixpreise ohne versteckte Kosten',
      ],
      image: { src: '/images/services/shuttle-service-wien-benefit.jpg', alt: 'Geräumiger Innenraum einer Mercedes V-Klasse für Gruppen' },
      badge: { big: '7', sm: 'Sitzplätze' },
    },
    seo: {
      eyebrow: 'Shuttle-Service Wien',
      title: 'Shuttle-Service in Wien — komfortabel und zuverlässig für Gruppen und Firmen.',
      paragraphs: [
        'Ein zuverlässiger Shuttle-Service in Wien bringt Gruppen entspannt und gemeinsam ans Ziel. Ob Firmenevent, Messe, Hochzeit oder Reisegruppe — Vienna Grand Chauffeurs sorgt mit der geräumigen Mercedes V-Klasse für komfortable Transfers von bis zu sieben Personen samt Gepäck. Ein erfahrener Chauffeur übernimmt Planung, Route und Timing, damit alle pünktlich und stressfrei ankommen.',
        'Gruppenlogistik in Wien erfordert präzise Planung und zuverlässige Umsetzung. Unser Shuttle-Service nimmt Ihnen diesen Aufwand vollständig ab: Wir stimmen Abhol- und Ankunftszeiten ab, koordinieren mehrere Stopps und sorgen dafür, dass Ihre Gruppe ohne organisatorischen Mehraufwand ankommt.',
        'Statt mehrerer Taxis reist Ihre Gruppe gemeinsam in einem Fahrzeug — das spart Zeit, hält alle zusammen und macht den Transfer angenehmer. In der klimatisierten V-Klasse finden bis zu sieben Personen mit großzügigem Gepäckraum bequem Platz.',
        'Besonders bewährt sich unser Shuttle-Service bei Firmenevents, Messen, Tagungen und Flughafentransfers für Gruppen. Auch mehrtägige Veranstaltungen und wiederkehrende Transfers koordinieren wir zuverlässig und mit einem festen Ansprechpartner an Ihrer Seite.',
        'Für besonders große Reisegruppen stellen wir bei Bedarf mehrere Fahrzeuge gleichzeitig bereit und sorgen für einen abgestimmten, reibungslosen Ablauf. Unsere freundlichen, ortskundigen Chauffeure reagieren flexibel auf kurzfristige Planänderungen.',
        'Transparente Fixpreise ohne versteckte Kosten geben Ihnen volle Planungssicherheit. Nennen Sie uns Personenzahl, Datum und Route, und wir erstellen Ihnen ein individuelles Angebot für Ihren Shuttle-Service in Wien und ganz Österreich.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen ist der Shuttle-Service geeignet?', a: 'In der Mercedes V-Klasse reisen bis zu sieben Personen komfortabel und mit ausreichend Gepäck.' },
      { q: 'Bieten Sie Transfers für Firmenevents an?', a: 'Ja. Wir koordinieren Abholungen und Transfers für Messen, Events und Firmenanlässe — auch mehrtägig.' },
      { q: 'Ist ein Flughafen-Shuttle für Gruppen möglich?', a: 'Selbstverständlich. Wir holen Ihre Gruppe am Flughafen Wien ab und bringen alle gemeinsam ans Ziel.' },
      { q: 'Können mehrere Fahrzeuge gebucht werden?', a: 'Ja. Für größere Gruppen stellen wir bei Bedarf mehrere Fahrzeuge bereit.' },
      { q: 'Wie erhalte ich ein Angebot?', a: 'Nennen Sie uns Personenzahl, Datum und Route — Sie erhalten umgehend einen transparenten Fixpreis.' },
    ],
  },

  {
    slug: 'langstreckenfahrten',
    metaTitle: 'Langstreckenfahrten — Vienna Grand Chauffeurs',
    metaDescription:
      'Komfortable Langstreckenfahrten ab Wien in ganz Österreich und Europa. Entspannt ohne Umsteigen, in gepflegten Premiumfahrzeugen mit erfahrenem Chauffeur.',
    heroImg: '/images/services/langstreckenfahrten-hero.jpg',
    hero: {
      title: 'Langstreckenfahrten',
      sub: 'Entspannt über weite Strecken: Fahrten in ganz Österreich und Europa — komfortabel, sicher und ganz ohne Umsteigen.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Österreich & Europa' },
      { icon: IC.user, label: 'Erfahrener Chauffeur' },
      { icon: IC.meet, label: 'Ohne Umsteigen' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Langstreckenfahrten', 'Österreich & Europa', 'Ohne Umsteigen', 'Komfortabel reisen', 'Tür zu Tür'],
    intro: {
      eyebrow: 'Langstrecke',
      title: 'Weite Strecken. Voller Komfort.',
      body: 'Warum umsteigen, wenn Sie durchreisen können? Unsere Langstreckenfahrten bringen Sie von Tür zu Tür — quer durch Österreich oder ins europäische Ausland. Sie lehnen sich zurück, arbeiten oder ruhen, während ein erfahrener Chauffeur Sie sicher und komfortabel ans Ziel bringt.',
      cards: [
        { icon: IC.around, title: 'Tür zu Tür', text: 'Kein Umsteigen, keine Wartezeiten — wir bringen Sie direkt von Adresse zu Adresse.' },
        { icon: IC.user, title: 'Erfahrener Chauffeur', text: 'Routiniert auf langen Strecken, mit Blick für Komfort, Pausen und sichere Fahrt.' },
      ],
      image: { src: '/images/services/langstreckenfahrten-intro.jpg', alt: 'Schwarze Mercedes S-Klasse an einem Aussichtspunkt in Österreich' },
    },
    benefit: {
      title: 'Reisen, ohne den Kopf einzuschalten.',
      body: 'Auf der Langstrecke zählt Komfort. Sie bestimmen Abfahrt und Pausen, wir sorgen für eine ruhige, sichere Fahrt — vom Start bis zur Ankunft, ganz ohne Umsteigen.',
      items: [
        'Direktfahrten in Österreich und Europa',
        'Komfortable Premiumfahrzeuge für lange Strecken',
        'Erfahrene Chauffeure mit Blick für Sicherheit',
        'Transparente Fixpreise ohne versteckte Kosten',
      ],
      image: { src: '/images/services/langstreckenfahrten-benefit.jpg', alt: 'Entspannter Fahrgast im Fond einer Mercedes-Benz auf der Langstrecke' },
      badge: { big: 'EU', sm: 'Länderübergreifend' },
    },
    seo: {
      eyebrow: 'Langstreckenfahrten',
      title: 'Langstreckenfahrten ab Wien — komfortabel durch Österreich und Europa.',
      paragraphs: [
        'Langstreckenfahrten mit Chauffeur verbinden Komfort mit Verlässlichkeit. Statt Umsteigen, Wartezeiten und Stress bringt Vienna Grand Chauffeurs Sie direkt von Tür zu Tür — quer durch Österreich oder ins europäische Ausland. Sie reisen in einem gepflegten Premiumfahrzeug, arbeiten oder entspannen, während ein erfahrener Chauffeur Sie sicher ans Ziel bringt.',
        'Der größte Vorteil einer Langstreckenfahrt mit Chauffeur ist die Direktverbindung. Kein Umsteigen, keine Anschlüsse, kein Warten am Bahnhof oder Flughafen — Sie steigen an Ihrer Adresse ein und werden ohne Unterbrechung genau dorthin gebracht, wo Sie hinmöchten.',
        'Weite Strecken verlangen Erfahrung und Ruhe am Steuer. Unsere Chauffeure sind auf Langstrecken geübt, kennen die wichtigsten Routen und behalten Sicherheit, Timing und Ihren Komfort gleichermaßen im Blick — auch bei anspruchsvollen Bedingungen.',
        'Sie bestimmen den Ablauf: Abfahrtszeit, Pausen und Zwischenstopps richten sich ganz nach Ihren Wünschen. Ob konzentriertes Arbeiten unterwegs oder entspannte Erholung im Fond, die Fahrt gehört Ihnen.',
        'Für maximalen Reisekomfort empfehlen wir die Mercedes S-Klasse mit großzügigem Platzangebot, für Gruppen und viel Gepäck die V-Klasse. Alle Fahrzeuge sind gepflegt, klimatisiert und für lange Strecken bestens ausgestattet.',
        'Transparente Fixpreise für die gesamte Strecke sorgen für volle Planungssicherheit, ohne versteckte Kosten. Ob Geschäftsreise, privater Anlass oder ein Transfer in eine andere Stadt — nennen Sie uns Start, Ziel und Wunschzeit, und wir planen Ihre Langstreckenfahrt ab Wien individuell.',
      ],
    },
    faq: [
      { q: 'Bis wohin bieten Sie Langstreckenfahrten an?', a: 'Wir fahren Sie in ganz Österreich sowie ins europäische Ausland — direkt von Tür zu Tür, ohne Umsteigen.' },
      { q: 'Kann ich unterwegs Pausen einplanen?', a: 'Selbstverständlich. Sie bestimmen Abfahrt und Pausen, Ihr Chauffeur richtet sich flexibel danach.' },
      { q: 'Welche Fahrzeuge eignen sich für lange Strecken?', a: 'Für maximalen Komfort empfehlen wir die Mercedes S-Klasse, für Gruppen die V-Klasse.' },
      { q: 'Wie werden Langstreckenfahrten abgerechnet?', a: 'Sie erhalten einen transparenten Fixpreis für die gesamte Strecke — ohne versteckte Kosten.' },
      { q: 'Ist auch ein früher oder später Start möglich?', a: 'Ja. Unser Service ist rund um die Uhr verfügbar, sodass Sie jederzeit starten können.' },
    ],
  },
];

export const SERVICES_DATA_EN: Service[] = [
  {
    slug: 'flughafen-transfer-wien',
    metaTitle: 'Airport Transfer Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Chauffeur service to Vienna Airport: discreet, punctual and comfortable. Real-time flight monitoring, Meet & Greet at the gate and transparent fixed prices.',
    heroImg: '/images/services/hero-flughafen.jpg',
    hero: {
      title: 'Airport Transfer Vienna',
      sub: 'Punctual and relaxed to or from Vienna Airport. We keep an eye on your flight, pick you up reliably and bring you to your destination without stress.',
    },
    heroFeatures: [
      { icon: IC.flug, label: 'Flight monitoring included' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.meet, label: 'Meet & Greet at the gate' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Airport Transfer Vienna', '24/7 available', 'Meet & Greet at the gate', 'Transparent fixed prices', 'VIE City Centre'],
    intro: {
      eyebrow: 'Airport Transfer',
      title: 'Punctual. Discreet. Comfortable.',
      body: 'Our airport transfer takes you to Vienna Airport and back again without stress. We track your flight in real time, flexibly adjust the pick-up time and welcome you personally at the gate. No searching, no waiting — just a calm, comfortable journey in an immaculate premium vehicle with an experienced chauffeur at your side.',
      cards: [
        { icon: IC.plane, title: 'Real-time flight monitoring', text: 'We keep an eye on your flight and automatically adjust the pick-up time in the event of delays.' },
        { icon: IC.user, title: 'Meet & Greet at the gate', text: 'Your chauffeur awaits you personally with a name sign right after your arrival in the terminal.' },
      ],
      image: { src: '/images/services/intro-airport.jpg', alt: 'Chauffeur with Mercedes E-Class in front of the airport terminal' },
    },
    benefit: {
      title: 'More than a journey from A to B.',
      body: 'Whether an early departure or a late arrival, our chauffeur service takes you to Vienna Airport and back home again without stress. No waiting, no surprises, just a relaxed journey.',
      items: [
        'Real-time flight monitoring & flexible pick-up times',
        'Personal Meet & Greet service at the gate',
        'Immaculate premium vehicles with experienced chauffeurs',
        'Transparent fixed prices, no hidden costs',
      ],
      image: { src: '/images/services/benefit-interior.jpg', alt: 'Beige leather seats in the rear of a Mercedes S-Class' },
      badge: { big: '24/7', sm: 'Ready for you' },
    },
    seo: {
      eyebrow: 'Airport Transfer Vienna',
      title: 'Chauffeur service to Vienna Airport — discreet, punctual and comfortable.',
      paragraphs: [
        'Anyone looking for a reliable airport transfer in Vienna expects more than just a journey from A to B. Vienna Grand Chauffeurs offers a professional chauffeur service that takes you punctually, safely and in a relaxed manner to Vienna-Schwechat Airport and picks you up again just as reliably. From the first contact to arrival at your destination, a carefully considered process is at the heart of everything, so that your journey begins and ends without stress.',
        'Punctuality is decisive for an airport transfer. Our experienced team tracks your flight in real time and flexibly adjusts the pick-up time — even in the event of last-minute delays or early landings. This way we are always ready precisely when you need us, whether an early morning flight or a late-night arrival. Our service is available for you 24 hours a day, 7 days a week.',
        'On arrival, your chauffeur welcomes you personally with a Meet & Greet service right at the gate or in the arrivals hall. He accompanies you with your luggage to the vehicle, so that no searching and no waiting is necessary. Discretion, attentiveness and a composed manner are a matter of course for our chauffeurs.',
        'All vehicles in our premium fleet are immaculately maintained, air-conditioned and designed for the highest comfort. For solo travellers and couples we recommend the Mercedes E-Class or S-Class, for groups and plenty of luggage the spacious V-Class with up to seven seats. This way we find the right vehicle for every travel situation.',
        'Transparent fixed prices with no hidden costs are a matter of course with us from the very start. You receive your final price already at the time of booking — including tolls, waiting time and VAT. In the event of flight delays no additional charges arise, so that you can budget for your transfer with certainty and without surprises.',
        'Our airport transfer is available to you for private trips, business flights and group journeys — in Vienna and throughout Austria. Whether a transfer to your hotel, to the office or home, we bring you reliably to your destination. Book your airport transfer conveniently online or contact us directly — we reply quickly, without complication, and are glad to advise you personally.',
      ],
    },
    faq: [
      { q: 'How do I book an airport transfer?', a: 'Very easily online via our enquiry form or by telephone. Tell us your flight number, date and address, and you will receive an immediate confirmation with a fixed price and all the details.' },
      { q: 'What happens if my flight is delayed?', a: 'We monitor your flight in real time and automatically adjust the pick-up time. Even in the event of delays no additional costs arise for you — your chauffeur is there when you land.' },
      { q: 'Where does my chauffeur wait on arrival?', a: 'Your chauffeur awaits you with a name sign right in the arrivals hall and accompanies you with your luggage to the vehicle.' },
      { q: 'Is the price for the transfer fixed or variable?', a: 'You receive a transparent fixed price already at the time of booking — including tolls, waiting time and VAT, entirely without hidden costs.' },
      { q: 'Can I also book for group travel or plenty of luggage?', a: 'Of course. For groups and plenty of luggage our Mercedes V-Class with up to seven seats is available to you.' },
      { q: 'Which vehicles are available for the airport transfer?', a: 'You can choose between the Mercedes E-Class and S-Class for saloon comfort as well as the V-Class for groups and more luggage.' },
    ],
  },

  {
    slug: 'chauffeurservice',
    metaTitle: 'Chauffeur Service Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Personal chauffeur service in Vienna for business, events and private occasions. Discreet, flexible and stylish in immaculate Mercedes-Benz vehicles.',
    heroImg: '/images/services/chauffeurservice-hero.jpg',
    hero: {
      title: 'Chauffeur Service Vienna',
      sub: 'Your personal chauffeur for business appointments, events or private occasions — discreet, flexible and always tailored to your wishes.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Personal chauffeur' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.meet, label: 'Discreet & professional' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Chauffeur Service Vienna', 'Business & Events', 'Discreet & flexible', 'Premium luxury class', 'Throughout Austria'],
    intro: {
      eyebrow: 'Chauffeur Service',
      title: 'Your chauffeur. Entirely to your wishes.',
      body: 'Whether an important business appointment, an evening event or a day full of errands — our chauffeur service adapts flexibly to your schedule. Your dedicated chauffeur brings you discreetly and punctually to your destination, waits for you and thinks ahead. This leaves your mind free for what matters.',
      cards: [
        { icon: IC.user, title: 'Personal care', text: 'A dedicated point of contact who knows your schedule and adapts to your wishes.' },
        { icon: IC.meet, title: 'Absolute discretion', text: 'Confidential conversations stay in the vehicle — discretion is a matter of course for us.' },
      ],
      image: { src: '/images/services/chauffeurservice-intro.jpg', alt: 'Chauffeur in a dark suit beside a black Mercedes S-Class in Vienna' },
    },
    benefit: {
      title: 'Composed on the move, at every appointment.',
      body: 'Our chauffeur service is more than a driving service. It is your calm base on a busy day — flexibly plannable, discreet and always punctual.',
      items: [
        'A dedicated, personal chauffeur for your day',
        'Flexible routes and spontaneous stops possible',
        'Discretion and etiquette on every occasion',
        'Transparent fixed prices with no hidden costs',
      ],
      image: { src: '/images/services/chauffeurservice-benefit.jpg', alt: 'Passenger relaxing in the rear of a Mercedes-Benz with cognac-coloured leather' },
      badge: { big: '100%', sm: 'Discreet' },
    },
    seo: {
      eyebrow: 'Chauffeur Service Vienna',
      title: 'Personal chauffeur service in Vienna — for business, events and private occasions.',
      paragraphs: [
        'A professional chauffeur service in Vienna means more than a comfortable journey: it gives you time, calm and the certainty of arriving everywhere punctually and relaxed. Vienna Grand Chauffeurs places an experienced, discreet chauffeur at your side who adapts entirely to your schedule — whether for business appointments, trade fairs, evening events or private trips.',
        'In a business setting in particular, every moment counts. While your chauffeur takes care of traffic, route and parking, you have the time in the rear to prepare for appointments, make calls or simply take a breath. Discretion and etiquette are a matter of course for our chauffeurs.',
        'Our immaculate Mercedes-Benz luxury class stands for calm comfort and a composed appearance. From the prestigious business appointment to the elegant evening event, we find the right vehicle — from the E-Class through the S-Class to the spacious V-Class for smaller groups.',
        'You determine the route and the pace, we take care of the rest. Spontaneous stops, last-minute changes of plan or waiting times between appointments are no problem for us, but part of a flexible service that adapts to your day — and not the other way around.',
        'Transparent fixed prices ensure full cost control. You receive your price in advance, with no hidden surcharges, so that you can book your chauffeur service with certainty and predictability — for individual journeys as well as for regular appointments.',
        'Whether for companies, private individuals or international guests — our chauffeur service is at your disposal in Vienna and throughout Austria. Contact us by telephone or via the enquiry form and let us prepare an individual offer for you. We are glad to advise you personally and discreetly.',
      ],
    },
    faq: [
      { q: 'Can I book a chauffeur for several hours?', a: 'Yes. You can book your chauffeur by the hour or for the whole day — ideal for multiple appointments, events or city journeys.' },
      { q: 'Is the chauffeur also suitable for business appointments?', a: 'Of course. Our chauffeurs are trained in discretion, etiquette and punctual business journeys.' },
      { q: 'Can I make spontaneous stops or route changes?', a: 'Yes, your chauffeur adapts flexibly to your wishes — even last-minute changes are no problem.' },
      { q: 'Which vehicles are available?', a: 'You can choose between the Mercedes E-Class and S-Class as well as the V-Class for groups and more luggage.' },
      { q: 'How do I obtain an offer?', a: 'Contact us by telephone or via the enquiry form. You will receive a transparent fixed price without delay.' },
    ],
  },

  {
    slug: 'chauffeur-pro-stunde',
    metaTitle: 'Chauffeur by the Hour Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Book your chauffeur by the hour in Vienna. Maximum flexibility for multiple appointments, city journeys and spontaneous stops — with a fixed price per hour.',
    heroImg: '/images/services/chauffeur-pro-stunde-hero.jpg',
    hero: {
      title: 'Chauffeur by the Hour',
      sub: 'Book your chauffeur by the hour and stay completely flexible — ideal for multiple appointments, city journeys or spontaneous stops in a single day.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Flexible hourly booking' },
      { icon: IC.user, label: 'Chauffeur waits for you' },
      { icon: IC.meet, label: 'Multiple stops possible' },
      { icon: IC.preis, label: 'Fixed price per hour' },
    ],
    marquee: ['Chauffeur by the Hour', 'Book by the hour', 'Multiple appointments', 'Full flexibility', 'All of Vienna'],
    intro: {
      eyebrow: 'Chauffeur by the Hour',
      title: 'Your time. Your pace. Your chauffeur.',
      body: 'With our hourly booking you have your chauffeur for exactly as long as you need him. He waits between your appointments, takes you to the next destination and stays at your side throughout the day. Ideal for business travellers, shopping tours or a densely packed day in the city.',
      cards: [
        { icon: IC.around, title: 'Flexible hours', text: 'Book from two hours and extend spontaneously as needed — entirely to suit your schedule.' },
        { icon: IC.user, title: 'The chauffeur stays', text: 'Your chauffeur waits between appointments and is immediately ready for you again.' },
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-intro.jpg', alt: 'Chauffeur checking the time beside a black Mercedes E-Class' },
    },
    benefit: {
      title: 'A chauffeur for the whole day.',
      body: 'Instead of individual journeys you have your chauffeur flexibly at your disposal — perfect when one appointment follows the next and you do not want to wait for a taxi in between.',
      items: [
        'Booking from two hours, extendable by the hour',
        'Chauffeur waits between your appointments',
        'Any number of stops and route changes',
        'Transparent fixed price per hour',
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-benefit.jpg', alt: 'Coat and leather bag on the back seat of a Mercedes-Benz' },
      badge: { big: '2 h', sm: 'From two hours' },
    },
    seo: {
      eyebrow: 'Chauffeur by the Hour Vienna',
      title: 'Chauffeur by the hour in Vienna — maximum flexibility on any day.',
      paragraphs: [
        'When one appointment follows the next, a chauffeur by the hour is the most relaxed solution. Instead of booking individual journeys, you have your personal chauffeur at your disposal for the entire duration — he waits, takes you onward and adapts flexibly to your schedule. Vienna Grand Chauffeurs makes your day in Vienna plannable, comfortable and stress-free.',
        'The great advantage of booking by the hour lies in its flexibility. You do not have to plan anew at every change of location or wait for a taxi — your chauffeur stays nearby and is immediately on hand again as soon as you wish to move on. This way you lose no time between appointments.',
        'Booking by the hour is ideally suited to business travellers with multiple appointments, to shopping and cultural tours or to guests who wish to experience the city at their leisure. For trade fairs, conferences and company visits too, a dedicated chauffeur who knows your schedule and thinks ahead proves its worth.',
        'You travel in immaculate premium vehicles of the Mercedes-Benz luxury class, accompanied by experienced chauffeurs with local knowledge. Whether E-Class, S-Class or V-Class for smaller groups — you choose the vehicle that suits the occasion and the number of passengers.',
        'Billing is at a transparent fixed price per hour, with no hidden costs or mileage surcharges within the city area. You book from two hours and extend spontaneously at any time, should your day run longer than planned — full cost control included.',
        'Whether for a single intensive day or recurring appointments — our hourly chauffeur is on the move for you in Vienna and throughout Austria. Tell us the date, time and planned duration, and we will put together a no-obligation offer for you. We look forward to your enquiry.',
      ],
    },
    faq: [
      { q: 'What is the minimum I have to book?', a: 'Booking by the hour is possible from two hours and can be extended spontaneously as needed.' },
      { q: 'Does the chauffeur wait between my appointments?', a: 'Yes. Your chauffeur remains ready for you throughout the booked time and waits between appointments.' },
      { q: 'Can I determine the route freely?', a: 'Of course. You set the destinations and the pace, and your chauffeur adapts flexibly to them.' },
      { q: 'How is billing handled?', a: 'You pay a transparent fixed price per hour — with no hidden costs or mileage surcharges within the city area.' },
      { q: 'Which vehicles can I choose?', a: 'You can choose between the Mercedes E-Class and S-Class as well as the V-Class for groups.' },
    ],
  },

  {
    slug: 'limousinen-service-wien',
    metaTitle: 'Limousine Service Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Stylish limousine service in Vienna for weddings, events and special occasions. Immaculate Mercedes-Benz limousines with an experienced chauffeur.',
    heroImg: '/images/services/limousinen-service-wien-hero.jpg',
    hero: {
      title: 'Limousine Service Vienna',
      sub: 'Travelling in style in immaculate Mercedes-Benz limousines — for weddings, events or special occasions in Vienna and throughout Austria.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'For special occasions' },
      { icon: IC.user, label: 'Experienced chauffeur' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Limousine Service Vienna', 'Weddings & Events', 'Mercedes-Benz luxury class', 'Arrive in style', 'Throughout Austria'],
    intro: {
      eyebrow: 'Limousine Service',
      title: 'Arrive in style. On every occasion.',
      body: 'Whether a wedding, gala or company event — with our limousine service you set the right tone. Immaculate Mercedes-Benz limousines, a chauffeur with etiquette and a perfectly coordinated schedule ensure that your big moment runs smoothly and elegantly.',
      cards: [
        { icon: IC.meet, title: 'For your occasion', text: 'Wedding, gala or event — we tailor the vehicle and schedule to your moment.' },
        { icon: IC.user, title: 'Chauffeur with etiquette', text: 'Discreet, elegant and attentive — your chauffeur accompanies the day with composure.' },
      ],
      image: { src: '/images/services/limousinen-service-wien-intro.jpg', alt: 'Black Mercedes S-Class in front of a festive occasion in Vienna' },
    },
    benefit: {
      title: 'Elegance that stays in the memory.',
      body: 'A limousine service is part of the experience. We ensure that the arrival and the journey are just as stylish as the occasion itself — from the first greeting to the final stage.',
      items: [
        'Immaculate Mercedes-Benz limousines of the luxury class',
        'Chauffeur with etiquette and a feel for the occasion',
        'Perfectly coordinated schedules and waiting times',
        'Transparent fixed prices with no hidden costs',
      ],
      image: { src: '/images/services/limousinen-service-wien-benefit.jpg', alt: 'Luxurious rear of a Mercedes S-Class for special occasions' },
      badge: { big: 'VIP', sm: 'First class' },
    },
    seo: {
      eyebrow: 'Limousine Service Vienna',
      title: 'Limousine service in Vienna — stylish and composed for every occasion.',
      paragraphs: [
        'An exclusive limousine service in Vienna lends special moments the right setting. Whether a wedding, gala, company event or a festive evening — Vienna Grand Chauffeurs brings you to your destination in style, punctually and discreetly. Our immaculate Mercedes-Benz limousines and trained chauffeurs ensure an appearance that stays in the memory.',
        'The first impression counts, and it begins on arrival. An elegant limousine with an attentive chauffeur sets precisely the tone that a special occasion deserves — dignified, calm and with a feel for the right moment.',
        'For weddings we tailor the vehicle, route and timing individually to your day, so that the bridal couple and guests arrive relaxed and punctual. For balls, premieres, company celebrations and state receptions too, our limousine service is the stylish choice.',
        'Our chauffeurs move with etiquette and discretion while keeping every detail in view — from the time of arrival to waiting times between the individual parts of the programme. You can concentrate entirely on your occasion, while we organise the proceedings composedly in the background.',
        'Available to choose from are the prestigious Mercedes S-Class and E-Class as well as the V-Class for larger groups. All vehicles are immaculately maintained, air-conditioned and designed for the highest comfort, so that you feel at ease from the first moment to the last.',
        'Transparent fixed prices give you full planning certainty, with no hidden costs. Tell us about your occasion, date and desired schedule — we will prepare an individual offer for you and accompany your big day in Vienna and throughout Austria reliably and in style.',
      ],
    },
    faq: [
      { q: 'Do you offer a wedding limousine service?', a: 'Yes. We tailor the vehicle, route and schedule individually to your wedding and ensure a smooth, stylish day.' },
      { q: 'Can I have the limousine decorated?', a: 'We are glad to discuss your wishes in advance. Simply mention it to us when booking.' },
      { q: 'Does the chauffeur wait during the event?', a: 'Yes. Waiting times can be planned in, so that your chauffeur remains ready for you throughout the entire occasion.' },
      { q: 'Which limousines are available to choose from?', a: 'You can choose between the Mercedes E-Class and S-Class as well as the V-Class for larger groups.' },
      { q: 'How do I obtain an offer?', a: 'Contact us with the date, occasion and route — you will receive a transparent fixed price without delay.' },
    ],
  },

  {
    slug: 'fahrdienst-diplomaten',
    metaTitle: 'Chauffeur Service for Diplomats & Embassies — Vienna Grand Chauffeurs',
    metaDescription:
      'Discreet, security-conscious chauffeur service for diplomats, embassies and official guests in Vienna. The highest reliability and confidentiality.',
    heroImg: '/images/services/fahrdienst-diplomaten-hero.jpg',
    hero: {
      title: 'Chauffeur Service for Diplomats',
      sub: 'Discreet, security-conscious chauffeur service for diplomats, embassies and official guests — with the highest reliability and confidentiality.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'The highest discretion' },
      { icon: IC.user, label: 'Security-conscious' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.preis, label: 'Dependable procedures' },
    ],
    marquee: ['Diplomat Chauffeur Service', 'Embassies & Consulates', 'The highest discretion', 'Safe & reliable', 'Throughout Austria'],
    intro: {
      eyebrow: 'Diplomats & Embassies',
      title: 'Discretion and security first.',
      body: 'For diplomats, embassies and official guests, every detail counts. Our chauffeur service combines absolute confidentiality with precise planning and security-conscious chauffeurs. From the welcome at the airport to the official appointment, we ensure a smooth, dignified process.',
      cards: [
        { icon: IC.meet, title: 'Absolute confidentiality', text: 'Discretion, restraint and confidentiality are a matter of course on every journey.' },
        { icon: IC.user, title: 'Security-conscious', text: 'Experienced chauffeurs with a feel for protocol, timing and safe route planning.' },
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-intro.jpg', alt: 'Discreet chauffeur opening the door of a black Mercedes S-Class' },
    },
    benefit: {
      title: 'Prestigious, safe, reliable.',
      body: 'Official occasions call for a chauffeur service that understands protocol and discretion. We work precisely, with foresight and with the highest dependability — for an appearance that does justice to every situation.',
      items: [
        'Absolute discretion and confidentiality',
        'Security-conscious, experienced chauffeurs',
        'Precise planning according to protocol and timing',
        'Prestigious Mercedes-Benz luxury class',
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-benefit.jpg', alt: 'Private, tinted rear of a Mercedes S-Class' },
      badge: { big: 'VIP', sm: 'Protocol-compliant' },
    },
    seo: {
      eyebrow: 'Chauffeur Service for Diplomats',
      title: 'Chauffeur service for diplomats and embassies in Vienna — discreet and security-conscious.',
      paragraphs: [
        'A chauffeur service for diplomats, embassies and official guests places particular demands on discretion, security and reliability. Vienna Grand Chauffeurs offers a protocol-compliant service that combines confidentiality with precise planning. Our experienced chauffeurs know the procedures of official appointments and ensure a dignified, smooth appearance.',
        'Discretion comes first on every assignment. Confidential conversations, sensitive appointments and personal information naturally remain protected. Our chauffeurs act with restraint, attentiveness and the necessary tact for official and protocol-related situations.',
        'Security and reliability are inseparable from a diplomatic chauffeur service. We plan routes with foresight, factor in time buffers and coordinate closely with your office or security team, so that every appointment runs punctually, safely and without incident.',
        'Whether a welcome at Vienna Airport, a journey to a state visit or accompaniment during a multi-day programme — we work flexibly and around the clock. Recurring chauffeur services and the fixed assignment of a chauffeur are also possible on request.',
        'For a prestigious appearance we rely on the immaculate Mercedes-Benz luxury class, first and foremost the S-Class, as well as the V-Class for delegations and groups. All vehicles are immaculately maintained and designed for comfort and safety.',
        'As a reliable partner for embassies, consulates and official delegations, we are on the move for you in Vienna and throughout Austria. Contact us in confidence to discuss your requirements — we will prepare a bespoke concept for your chauffeur service.',
      ],
    },
    faq: [
      { q: 'Do you work with embassies and consulates?', a: 'Yes. We regularly look after official guests and delegations and adhere to protocol requirements.' },
      { q: 'How do you ensure discretion?', a: 'Confidentiality is a matter of course for our chauffeurs. Confidential information and conversations always remain protected.' },
      { q: 'Are multi-day or recurring chauffeur services possible?', a: 'Of course. We plan individual appointments as well as multi-day programmes and permanent chauffeur services.' },
      { q: 'Which vehicles are used?', a: 'We use prestigious Mercedes-Benz limousines of the luxury class, and for groups the V-Class as well.' },
      { q: 'How can I request a chauffeur service?', a: 'Contact us directly — we will discuss your requirements in confidence and prepare a suitable offer.' },
    ],
  },

  {
    slug: 'privatchauffeur-wien',
    metaTitle: 'Private Chauffeur Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Your dedicated private chauffeur in Vienna for everyday life and special days. Flexible, discreet and entirely attuned to you — in immaculate premium vehicles.',
    heroImg: '/images/services/privatchauffeur-wien-hero.jpg',
    hero: {
      title: 'Private Chauffeur Vienna',
      sub: 'Your dedicated private chauffeur for everyday life or special days — flexible, discreet and entirely attuned to you.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Your dedicated chauffeur' },
      { icon: IC.around, label: 'Flexible & spontaneous' },
      { icon: IC.meet, label: 'Discreet & familiar' },
      { icon: IC.preis, label: 'Transparent prices' },
    ],
    marquee: ['Private Chauffeur Vienna', 'Your dedicated chauffeur', 'Everyday life & special days', 'Discreet & flexible', 'Throughout Austria'],
    intro: {
      eyebrow: 'Private Chauffeur',
      title: 'A familiar face at the wheel.',
      body: 'A private chauffeur brings calm and reliability to your everyday life. Whether daily journeys, appointments or special occasions — your dedicated chauffeur knows your habits, thinks ahead and is on hand when you need him. Discreet, flexible and entirely attuned to you.',
      cards: [
        { icon: IC.user, title: 'Dedicated point of contact', text: 'Your personal chauffeur knows your wishes and your schedule — journey after journey.' },
        { icon: IC.around, title: 'Flexibly available', text: 'Whether planned or spontaneous, your private chauffeur adapts to your calendar.' },
      ],
      image: { src: '/images/services/privatchauffeur-wien-intro.jpg', alt: 'Private chauffeur greeting a regular client beside a Mercedes E-Class' },
    },
    benefit: {
      title: 'More time. Fewer worries.',
      body: 'With a dedicated private chauffeur you gain time and composure. You get in, and we take care of everything else — from the traffic to the parking.',
      items: [
        'Your dedicated, personal chauffeur',
        'Flexible for everyday life and special occasions',
        'Discreet, familiar and always punctual',
        'Transparent prices with no hidden costs',
      ],
      image: { src: '/images/services/privatchauffeur-wien-benefit.jpg', alt: 'Immaculate rear of a Mercedes-Benz in warm morning light' },
      badge: { big: '1:1', sm: 'Entirely personal' },
    },
    seo: {
      eyebrow: 'Private Chauffeur Vienna',
      title: 'Your personal private chauffeur in Vienna — for everyday life and special days.',
      paragraphs: [
        'A private chauffeur in Vienna gives you time, calm and reliability — anew each day. Vienna Grand Chauffeurs places a dedicated, discreet chauffeur at your side who knows your habits and adapts flexibly to your everyday life. Whether daily errands, business appointments or private occasions: you get in and are brought to your destination with composure.',
        'The difference from a single journey lies in the familiarity. A dedicated private chauffeur knows which route you prefer, when you like to set off and what matters to you. This creates a service that fits seamlessly into your everyday life.',
        'Whether regular routes such as the way to the office, journeys for the family, medical appointments or evening events — your chauffeur is ready when you need him. Spontaneous changes are also possible at any time, without your having to plan anew.',
        'Discretion is a matter of course throughout. Your private chauffeur moves with restraint and attentiveness, so that you can converse, work or simply relax undisturbed in the rear at any time.',
        'You travel in immaculate premium vehicles of the Mercedes-Benz luxury class, from the E-Class through the S-Class to the V-Class. Together with you we choose the vehicle that best suits your everyday life and your requirements.',
        'Transparent prices with no hidden costs, tailored to the extent and frequency of your journeys, give you full planning certainty. Whether individual days or a permanent chauffeur service — contact us and we will shape your personal private chauffeur service in Vienna and throughout Austria.',
      ],
    },
    faq: [
      { q: 'Do I always get the same chauffeur?', a: 'On request we place a dedicated private chauffeur at your side who knows your habits and your schedule.' },
      { q: 'Is the service also available at short notice?', a: 'Yes. Your private chauffeur adapts flexibly to your calendar — planned or spontaneous.' },
      { q: 'Can I book the chauffeur on a regular basis?', a: 'Of course. We offer individual journeys as well as permanent, recurring chauffeur services.' },
      { q: 'Which vehicles are available?', a: 'You can choose between the Mercedes E-Class and S-Class as well as the V-Class for more space.' },
      { q: 'How are the prices structured?', a: 'You receive transparent fixed prices with no hidden costs — tailored to the extent and frequency of your journeys.' },
    ],
  },

  {
    slug: 'shuttle-service-wien',
    metaTitle: 'Shuttle Service Vienna — Vienna Grand Chauffeurs',
    metaDescription:
      'Reliable shuttle service in Vienna for groups, events and companies. Comfortable in the Mercedes V-Class with an experienced chauffeur.',
    heroImg: '/images/services/shuttle-service-wien-hero.jpg',
    hero: {
      title: 'Shuttle Service Vienna',
      sub: 'Reliable shuttle service for groups, events and companies — comfortable and stress-free in the spacious Mercedes V-Class.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Up to 7 passengers' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.meet, label: 'For groups & companies' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Shuttle Service Vienna', 'Groups & Events', 'Mercedes V-Class', 'Up to 7 passengers', 'Throughout Austria'],
    intro: {
      eyebrow: 'Shuttle Service',
      title: 'Arriving together. Completely relaxed.',
      body: 'Whether a company event, trade fair, wedding party or group trip — our shuttle service brings everyone safely and comfortably to the destination. In the spacious Mercedes V-Class, up to seven passengers travel with luggage, while an experienced chauffeur takes care of route, timing and comfort.',
      cards: [
        { icon: IC.user, title: 'Room for the group', text: 'Up to seven passengers travel comfortably and with plenty of luggage in the V-Class.' },
        { icon: IC.meet, title: 'For events & companies', text: 'Coordinated pick-ups and transfers for trade fairs, events and company occasions.' },
      ],
      image: { src: '/images/services/shuttle-service-wien-intro.jpg', alt: 'Open sliding door of a black Mercedes V-Class with seating' },
    },
    benefit: {
      title: 'One vehicle. The whole group.',
      body: 'Instead of several taxis, our shuttle service brings everyone to the destination together — coordinated, punctual and comfortable. Ideal for companies, events and travel groups.',
      items: [
        'Up to seven passengers plus luggage',
        'Coordinated transfers for groups and companies',
        'Experienced chauffeur with an eye for timing',
        'Transparent fixed prices with no hidden costs',
      ],
      image: { src: '/images/services/shuttle-service-wien-benefit.jpg', alt: 'Spacious interior of a Mercedes V-Class for groups' },
      badge: { big: '7', sm: 'Seats' },
    },
    seo: {
      eyebrow: 'Shuttle Service Vienna',
      title: 'Shuttle service in Vienna — comfortable and reliable for groups and companies.',
      paragraphs: [
        'A reliable shuttle service in Vienna brings groups to their destination relaxed and together. Whether a company event, trade fair, wedding or travel group — Vienna Grand Chauffeurs ensures comfortable transfers of up to seven passengers with luggage in the spacious Mercedes V-Class. An experienced chauffeur takes over the planning, route and timing, so that everyone arrives punctually and stress-free.',
        'Group logistics in Vienna require precise planning and reliable execution. Our shuttle service takes this effort off your hands entirely: we align pick-up and arrival times, coordinate multiple stops and ensure that your group arrives without additional organisational effort.',
        'Instead of several taxis, your group travels together in one vehicle — that saves time, keeps everyone together and makes the transfer more pleasant. In the air-conditioned V-Class, up to seven passengers find comfortable space with generous luggage room.',
        'Our shuttle service proves particularly worthwhile at company events, trade fairs, conferences and airport transfers for groups. Multi-day events and recurring transfers too we coordinate reliably and with a dedicated point of contact at your side.',
        'For particularly large travel groups we provide several vehicles simultaneously as needed and ensure a coordinated, smooth process. Our friendly chauffeurs with local knowledge respond flexibly to last-minute changes of plan.',
        'Transparent fixed prices with no hidden costs give you full planning certainty. Tell us the number of passengers, date and route, and we will prepare an individual offer for your shuttle service in Vienna and throughout Austria.',
      ],
    },
    faq: [
      { q: 'For how many passengers is the shuttle service suitable?', a: 'In the Mercedes V-Class, up to seven passengers travel comfortably and with sufficient luggage.' },
      { q: 'Do you offer transfers for company events?', a: 'Yes. We coordinate pick-ups and transfers for trade fairs, events and company occasions — over several days too.' },
      { q: 'Is an airport shuttle for groups possible?', a: 'Of course. We pick up your group at Vienna Airport and bring everyone to the destination together.' },
      { q: 'Can several vehicles be booked?', a: 'Yes. For larger groups we provide several vehicles as needed.' },
      { q: 'How do I obtain an offer?', a: 'Tell us the number of passengers, date and route — you will receive a transparent fixed price without delay.' },
    ],
  },

  {
    slug: 'langstreckenfahrten',
    metaTitle: 'Long-Distance Journeys — Vienna Grand Chauffeurs',
    metaDescription:
      'Comfortable long-distance journeys from Vienna throughout Austria and Europe. Relaxed with no changes, in immaculate premium vehicles with an experienced chauffeur.',
    heroImg: '/images/services/langstreckenfahrten-hero.jpg',
    hero: {
      title: 'Long-Distance Journeys',
      sub: 'Relaxed over long distances: journeys throughout Austria and Europe — comfortable, safe and entirely without changing.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Austria & Europe' },
      { icon: IC.user, label: 'Experienced chauffeur' },
      { icon: IC.meet, label: 'Without changing' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Long-Distance Journeys', 'Austria & Europe', 'Without changing', 'Travel comfortably', 'Door to door'],
    intro: {
      eyebrow: 'Long Distance',
      title: 'Long distances. Full comfort.',
      body: 'Why change when you can travel straight through? Our long-distance journeys take you from door to door — right across Austria or abroad in Europe. You sit back, work or rest, while an experienced chauffeur brings you safely and comfortably to your destination.',
      cards: [
        { icon: IC.around, title: 'Door to door', text: 'No changing, no waiting times — we take you directly from address to address.' },
        { icon: IC.user, title: 'Experienced chauffeur', text: 'Seasoned on long distances, with an eye for comfort, breaks and a safe journey.' },
      ],
      image: { src: '/images/services/langstreckenfahrten-intro.jpg', alt: 'Black Mercedes S-Class at a viewpoint in Austria' },
    },
    benefit: {
      title: 'Travel without having to switch on your mind.',
      body: 'On long distances, comfort counts. You determine the departure and the breaks, we ensure a calm, safe journey — from the start to the arrival, entirely without changing.',
      items: [
        'Direct journeys in Austria and Europe',
        'Comfortable premium vehicles for long distances',
        'Experienced chauffeurs with an eye for safety',
        'Transparent fixed prices with no hidden costs',
      ],
      image: { src: '/images/services/langstreckenfahrten-benefit.jpg', alt: 'Relaxed passenger in the rear of a Mercedes-Benz on a long-distance journey' },
      badge: { big: 'EU', sm: 'Cross-border' },
    },
    seo: {
      eyebrow: 'Long-Distance Journeys',
      title: 'Long-distance journeys from Vienna — comfortable across Austria and Europe.',
      paragraphs: [
        'Long-distance journeys with a chauffeur combine comfort with reliability. Instead of changing, waiting times and stress, Vienna Grand Chauffeurs takes you directly from door to door — right across Austria or abroad in Europe. You travel in an immaculate premium vehicle, working or relaxing, while an experienced chauffeur brings you safely to your destination.',
        'The greatest advantage of a long-distance journey with a chauffeur is the direct connection. No changing, no connections, no waiting at the station or airport — you get in at your address and are taken without interruption exactly to where you wish to go.',
        'Long distances call for experience and calm at the wheel. Our chauffeurs are practised on long distances, know the most important routes and keep an equal eye on safety, timing and your comfort — even in demanding conditions.',
        'You determine the schedule: the departure time, breaks and stopovers are entirely to your wishes. Whether focused work on the move or relaxed rest in the rear, the journey is yours.',
        'For maximum travel comfort we recommend the Mercedes S-Class with its generous space, and for groups and plenty of luggage the V-Class. All vehicles are immaculately maintained, air-conditioned and superbly equipped for long distances.',
        'Transparent fixed prices for the entire route ensure full planning certainty, with no hidden costs. Whether a business trip, a private occasion or a transfer to another city — tell us the start, destination and desired time, and we will plan your long-distance journey from Vienna individually.',
      ],
    },
    faq: [
      { q: 'How far do you offer long-distance journeys?', a: 'We drive you throughout Austria as well as abroad in Europe — directly from door to door, without changing.' },
      { q: 'Can I plan breaks along the way?', a: 'Of course. You determine the departure and the breaks, and your chauffeur adapts flexibly to them.' },
      { q: 'Which vehicles are suitable for long distances?', a: 'For maximum comfort we recommend the Mercedes S-Class, and for groups the V-Class.' },
      { q: 'How are long-distance journeys billed?', a: 'You receive a transparent fixed price for the entire route — with no hidden costs.' },
      { q: 'Is an early or late start also possible?', a: 'Yes. Our service is available around the clock, so that you can set off at any time.' },
    ],
  },
];

import type { Lang } from './i18n';
export const getServices = (lang: Lang): Service[] => (lang === 'en' ? SERVICES_DATA_EN : SERVICES_DATA);
