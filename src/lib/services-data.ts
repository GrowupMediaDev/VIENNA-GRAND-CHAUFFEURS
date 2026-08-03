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
  slug: string;        // German slug, used under /leistungen/
  slugEn: string;      // English slug, used under /en/services/
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

    slugEn: 'airport-transfer-vienna',
    metaTitle: 'Flughafentransfer Wien – Fixpreis ab VIE',
    metaDescription:
      'Flughafentransfer Wien zum Fixpreis: Abholung am Flughafen Schwechat, Flugtracking und diskrete Fahrer. Rund um die Uhr. Jetzt online buchen.',
    heroImg: '/images/services/hero-flughafen.jpg',
    hero: {
      title: 'Flughafentransfer Wien',
      sub: 'Pünktliche Abholung am Flughafen Wien und in der Stadt. Fixpreis, Flugtracking und ein Fahrer, der auf Sie wartet und Sie ans Ziel bringt.',
    },
    heroFeatures: [
      { icon: IC.flug, label: 'Flugüberwachung inklusive' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.meet, label: 'Meet & Greet am Gate' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Flughafentransfer Wien', '24/7 verfügbar', 'Meet & Greet am Gate', 'Transparente Fixpreise', 'VIE Innere Stadt'],
    intro: {
      eyebrow: 'Ihr Transfer',
      title: 'Entspannt zum Flughafen Wien',
      body: 'Ihr Chauffeur holt Sie zuhause, im Hotel oder am Terminal ab und bringt Sie sicher ans Ziel. Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit bei Verspätung automatisch an. Kein Warten in der Taxischlange, kein Stress mit dem Gepäck. Sie steigen ein und kommen entspannt an.',
      cards: [
        { icon: IC.plane, title: 'Echtzeit-Flugüberwachung', text: 'Wir behalten Ihren Flug im Blick und passen die Abholzeit bei Verspätungen automatisch an.' },
        { icon: IC.user, title: 'Meet & Greet am Gate', text: 'Ihr Chauffeur erwartet Sie persönlich mit Namensschild direkt nach der Ankunft im Terminal.' },
      ],
      image: { src: '/images/services/intro-airport.jpg', alt: 'Chauffeur mit Mercedes E-Klasse vor dem Flughafenterminal' },
    },
    benefit: {
      title: 'Warum Ihr Transfer bei uns passt',
      body: 'Feste Fahrer, transparente Preise und ein Ablauf, der einfach funktioniert. Vom ersten Klick bis zur Ankunft bleibt Ihr Transfer planbar, diskret und ruhig. Sie kommen entspannt an.',
      items: [
        'Fixpreis vorab, keine versteckten Kosten am Ende',
        'Flugtracking bei jeder Abholung',
        'Meet and Greet mit Namensschild am Terminal',
        'Diskrete Fahrer, gepflegte Fahrzeuge',
      ],
      image: { src: '/images/services/benefit-interior.jpg', alt: 'Beige Ledersitze im Fond einer Mercedes S-Klasse' },
      badge: { big: '24h', sm: 'für Sie da' },
    },
    seo: {
      eyebrow: 'Flughafentransfer Wien',
      title: 'Ihr zuverlässiger Transfer zum und vom Flughafen Wien Schwechat',
      paragraphs: [
        'Der Flughafen Wien Schwechat liegt rund 20 Kilometer vom Stadtzentrum entfernt. Mit unserem Flughafentransfer sind Sie in etwa 30 Minuten in der Innenstadt, ohne Umsteigen und ohne Gepäckschleppen. Ihr Chauffeur erwartet Sie in der Ankunftshalle mit einem Namensschild und hilft Ihnen mit dem Gepäck.',
        'Bei der Abreise holt er Sie pünktlich ab und bringt Sie rechtzeitig zum Terminal. Wir behalten Ihren Flug im Blick, damit auch bei Verspätung alles reibungslos läuft und Sie nie unnötig warten müssen. Auch späte Ankünfte und frühe Abflüge sind für uns kein Problem.',
        'Buchen Sie Ihren Transfer bequem online: Fahrzeug wählen, Fixpreis sehen, per Kreditkarte, Apple Pay oder Google Pay bezahlen. Sie erhalten sofort Ihre Bestätigung.',
        'Vom Business-Fahrzeug für eine Person bis zum Sprinter für die ganze Reisegruppe finden Sie das passende Fahrzeug. Auch für Gepäck, Kindersitze oder besondere Wünsche ist gesorgt, sagen Sie uns einfach vorab Bescheid. Für regelmäßige Fahrten oder besondere Anlässe stellen Sie eine große Anfrage und bekommen innerhalb weniger Stunden ein unverbindliches Angebot.',
        'So wird Ihr Flughafentransfer in Wien so angenehm wie die Reise selbst: zuverlässig, diskret und immer pünktlich. In jedem Wagen steht Wasser für Sie bereit, und Ihr Fahrer kennt die schnellste Route zum Terminal.',
        'Ob Sie geschäftlich reisen oder privat unterwegs sind, wir richten die Fahrt nach Ihrem Zeitplan. Auch für die Rückfahrt sind wir jederzeit für Sie da, damit Sie am Ende Ihrer Reise genauso entspannt ankommen wie am Anfang. Nennen Sie uns Ihren Flug, wir planen den Rest.',
      ],
    },
    faq: [
      { q: 'Was kostet ein Flughafentransfer in Wien?', a: 'Der Preis ist ein Fixpreis und hängt vom Fahrzeug ab. Sie sehen ihn vor der Buchung, inklusive Fahrer, Wartezeit und Gepäck.' },
      { q: 'Was passiert, wenn mein Flug Verspätung hat?', a: 'Wir verfolgen Ihren Flug in Echtzeit und passen die Abholzeit automatisch an. Für Verspätungen entstehen keine zusätzlichen Kosten.' },
      { q: 'Wo treffe ich meinen Chauffeur am Flughafen?', a: 'Ihr Fahrer erwartet Sie in der Ankunftshalle mit einem Namensschild und hilft Ihnen mit dem Gepäck zum Fahrzeug.' },
      { q: 'Kann ich einen Transfer für mehrere Personen buchen?', a: 'Ja. Vom Van bis zum Sprinter mit bis zu 20 Sitzen bringen wir auch größere Gruppen samt Gepäck gemeinsam ans Ziel.' },
      { q: 'Wie schnell bin ich vom Flughafen in der Stadt?', a: 'Die Fahrt vom Flughafen Wien Schwechat ins Zentrum dauert je nach Verkehr etwa 30 Minuten.' },
      { q: 'Kann ich im Voraus bezahlen?', a: 'Ja, Sie zahlen bequem online per Kreditkarte, Apple Pay oder Google Pay und erhalten sofort Ihre Buchungsbestätigung.' },
    ],
  },

  {
    slug: 'chauffeurservice',

    slugEn: 'chauffeur-service-vienna',
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

    slugEn: 'chauffeur-by-the-hour-vienna',
    metaTitle: 'Chauffeur pro Stunde Wien – stundenweise buchen',
    metaDescription:
      'Chauffeur pro Stunde in Wien: stundenweise buchen, fester Fahrer, Fixpreis pro Stunde. Ideal für Termine und Shopping. Online buchen, sofort bestätigt.',
    heroImg: '/images/services/chauffeur-pro-stunde-hero.jpg',
    hero: {
      title: 'Chauffeur pro Stunde',
      sub: 'Buchen Sie Ihren Chauffeur stundenweise in Wien. Ein fester Fahrer bleibt für Sie da, so lange Sie ihn brauchen, flexibel und gut planbar.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Flexible Stundenbuchung' },
      { icon: IC.user, label: 'Chauffeur wartet auf Sie' },
      { icon: IC.meet, label: 'Mehrere Stopps möglich' },
      { icon: IC.preis, label: 'Fixpreis pro Stunde' },
    ],
    marquee: ['Chauffeur pro Stunde', 'Stundenweise buchen', 'Mehrere Termine', 'Volle Flexibilität', 'Ganz Wien'],
    intro: {
      eyebrow: 'Stundenchauffeur',
      title: 'Chauffeur pro Stunde Wien',
      body: 'Mit einem Chauffeur pro Stunde Wien bleiben Sie flexibel. Mehrere Termine hintereinander, ein Einkaufstag oder ein Abend mit wechselnden Zielen: Derselbe Fahrer bleibt für Sie im Einsatz, wartet zwischen den Stopps und passt sich Ihrem Zeitplan an. Sie buchen die Stunden und sehen den Fixpreis vorab.',
      cards: [
        { icon: IC.around, title: 'Flexible Stunden', text: 'Buchen Sie ab zwei Stunden und verlängern Sie bei Bedarf spontan — ganz nach Ablauf.' },
        { icon: IC.user, title: 'Chauffeur bleibt da', text: 'Ihr Chauffeur wartet zwischen den Terminen und ist sofort wieder für Sie bereit.' },
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-intro.jpg', alt: 'Chauffeur prüft die Uhrzeit neben einer schwarzen Mercedes E-Klasse' },
    },
    benefit: {
      title: 'Warum stundenweise buchen',
      body: 'Ein fester Chauffeur für Ihren ganzen Termin, klare Stundenpreise und volle Flexibilität. Sie buchen online und sehen den Preis sofort, ganz ohne Wartezeit auf ein Angebot.',
      items: [
        'Fester Fahrer für die gebuchte Zeit',
        'Transparenter Fixpreis pro Stunde',
        'Wartet zwischen Ihren Terminen und Stopps',
        'Flexibel verlängerbar bei Bedarf',
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-benefit.jpg', alt: 'Mantel und Ledertasche auf dem Rücksitz einer Mercedes-Benz' },
      badge: { big: '1', sm: 'fester Fahrer' },
    },
    seo: {
      eyebrow: 'Chauffeur pro Stunde',
      title: 'Ihr persönlicher Chauffeur, stundenweise buchbar in ganz Wien',
      paragraphs: [
        'Manche Tage lassen sich nicht in eine einzelne Fahrt pressen. Ein Chauffeur pro Stunde Wien ist dann die entspannteste Lösung.',
        'Ein Vormittag mit drei Terminen, ein Nachmittag zum Einkaufen, ein Abend mit Essen und Veranstaltung: Ihr fester Fahrer bringt Sie von Ziel zu Ziel, wartet dazwischen und hält den Wagen bereit.',
        'Sie müssen nicht jedes Mal neu buchen, keinen Parkplatz suchen und nicht auf ein Taxi warten. Wenn Sie einen Chauffeur mieten Wien und Umgebung, steht Wasser im Wagen bereit, auf Wunsch auch ein Kindersitz, und Sie behalten denselben vertrauten Ansprechpartner am Steuer.',
        'Die Buchung ist unkompliziert. Sie wählen Fahrzeug und Stundenzahl, sehen den Fixpreis pro Stunde und buchen direkt über unser Online Buchungssystem. Bezahlt wird per Kreditkarte, Apple Pay oder Google Pay, die Bestätigung kommt sofort. Sie warten nicht auf ein Angebot wie bei vielen anderen Anbietern, sondern kennen den Preis von Anfang an.',
        'Braucht Ihr Tag doch länger, verlängern wir flexibel, solange der Fahrer verfügbar ist. Für Geschäftskunden gibt es feste Konditionen für regelmäßige Buchungen, für besondere Wünsche erreichen Sie uns per WhatsApp oder E-Mail. So behalten Sie Ihren Zeitplan im Griff und überlassen die Fahrt jemandem, der Wien in- und auswendig kennt und vorausschauend fährt. Den Fixpreis sehen Sie vorab.',
        'Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz.',
      ],
    },
    faq: [
      { q: 'Wie viele Stunden muss ich mindestens buchen?', a: 'Die Mindestdauer nennen wir Ihnen bei der Buchung. Sie sehen den Fixpreis pro Stunde vorab und können bei Bedarf flexibel verlängern.' },
      { q: 'Bleibt derselbe Fahrer den ganzen Termin dabei?', a: 'Ja. Ihr Chauffeur ist für die gebuchte Zeit fest für Sie da, wartet zwischen den Stopps und passt sich Ihrem Ablauf an.' },
      { q: 'Kann ich die Buchung spontan verlängern?', a: 'Ja, sofern der Fahrer verfügbar ist. Sagen Sie ihm einfach Bescheid, die zusätzliche Zeit wird transparent abgerechnet.' },
      { q: 'Wofür eignet sich ein Chauffeur pro Stunde?', a: 'Für mehrere Termine, Shopping, Sightseeing oder Abende mit wechselnden Zielen. Überall dort, wo Sie flexibel bleiben wollen.' },
      { q: 'Kann ich stundenweise auch außerhalb Wiens fahren?', a: 'Ja. Innerhalb der gebuchten Zeit fahren wir auch ins Umland. Längere Strecken planen wir gern individuell.' },
      { q: 'Wie buche ich einen Chauffeur pro Stunde?', a: 'Über unser Online Buchungssystem: Fahrzeug und Stunden wählen, Fixpreis sehen, direkt zahlen. Für Sonderwünsche per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'limousinenservice',

    slugEn: 'limousine-service-vienna',
    metaTitle: 'Limousinenservice Wien – Mercedes mit Chauffeur',
    metaDescription:
      'Limousinenservice Wien: Mercedes-Limousine mit Chauffeur zum Fixpreis. Diskret, komfortabel, rund um die Uhr. Online buchen und sofort bestätigt.',
    heroImg: '/images/services/limousinen-service-wien-hero.jpg',
    hero: {
      title: 'Limousinenservice Wien',
      sub: 'Mercedes-Limousine mit persönlichem Chauffeur. Für Geschäftstermine, besondere Anlässe und stilvolle, diskrete Fahrten durch ganz Wien und Umgebung.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'Für besondere Anlässe' },
      { icon: IC.user, label: 'Erfahrener Chauffeur' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Limousinenservice Wien', 'Hochzeiten & Events', 'Mercedes-Benz Oberklasse', 'Stilvoll ankommen', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Ihre Limousine',
      title: 'Ihr Limousinen Service Wien',
      body: 'Unser Limousinen Service Wien bringt Sie stilvoll ans Ziel. Sie wählen Ihre Limousine, wir stellen den passenden Chauffeur. Ob Business-Termin, Abendveranstaltung oder Fahrt zur Oper: Sie reisen in einer gepflegten Mercedes-Limousine, ruhig und diskret. Ihr Fahrer kennt Wien und ist pünktlich zur Stelle.',
      cards: [
        { icon: IC.meet, title: 'Für Ihren Anlass', text: 'Hochzeit, Gala oder Event — wir stimmen Fahrzeug und Ablauf auf Ihren Moment ab.' },
        { icon: IC.user, title: 'Chauffeur mit Etikette', text: 'Diskret, elegant und aufmerksam — Ihr Chauffeur begleitet den Tag souverän.' },
      ],
      image: { src: '/images/services/limousinen-service-wien-intro.jpg', alt: 'Schwarze Mercedes S-Klasse vor einem festlichen Anlass in Wien' },
    },
    benefit: {
      title: 'Warum unser Limousinenservice',
      body: 'Moderne Mercedes-Flotte, feste Chauffeure und ein transparenter Fixpreis. Sie buchen online, sehen den Preis sofort und erhalten die Bestätigung ohne Wartezeit auf ein Angebot.',
      items: [
        'Gepflegte Mercedes-Limousinen jeder Klasse',
        'Fixpreis vorab, ohne versteckte Kosten',
        'Diskrete, geschulte Chauffeure mit Ortskenntnis',
        'Online buchen, sofort bestätigt',
      ],
      image: { src: '/images/services/limousinen-service-wien-benefit.jpg', alt: 'Luxuriöser Fond einer Mercedes S-Klasse für besondere Anlässe' },
      badge: { big: '5.0', sm: 'Kundenurteil' },
    },
    seo: {
      eyebrow: 'Limousinenservice Wien',
      title: 'Ihre Mercedes-Limousine mit Chauffeur für jeden Anlass in Wien',
      paragraphs: [
        'Ein Limousinen Service Wien ist mehr als eine Fahrt. Er ist die ruhige Minute vor dem Termin, der gute erste Eindruck bei Kunden und das entspannte Ankommen nach einem langen Tag.',
        'Bei uns wählen Sie aus einer modernen Mercedes-Flotte, von der eleganten E-Klasse über die repräsentative S-Klasse bis zum geräumigen Van für mehrere Gäste. Wer eine Luxuslimousine Wien mit Fahrer sucht, ist hier richtig: Jeder Wagen ist gepflegt, klimatisiert und mit Wasser für Sie ausgestattet, auf Wunsch stellen wir einen Kindersitz bereit. Ihr Chauffeur ist diskret, pünktlich und kennt die Wege durch Wien.',
        'Der Ablauf ist einfach. Sie möchten eine Limousine mieten Wien und Umgebung? Sie sehen sofort den Fixpreis und buchen direkt über unser Online Buchungssystem.',
        'Bezahlt wird per Kreditkarte, Apple Pay oder Google Pay, die Bestätigung kommt umgehend. Anders als bei Anbietern, bei denen Sie erst eine Anfrage schicken und auf ein Angebot warten, wissen Sie bei uns vorab genau, was die Fahrt kostet, ohne versteckte Zuschläge.',
        'Für Geschäftskunden bieten wir feste Konditionen für regelmäßige Fahrten, ideal für wiederkehrende Termine oder Kundenbesuche. Haben Sie einen besonderen Wunsch, etwa mehrere Stopps oder eine Abendbegleitung, erreichen Sie uns jederzeit per WhatsApp oder E-Mail.',
        'So wird Ihre Fahrt durch Wien so angenehm und stilvoll wie der Anlass, zu dem sie Sie bringt. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online.',
      ],
    },
    faq: [
      { q: 'Was kostet ein Limousinenservice in Wien?', a: 'Der Preis richtet sich nach Fahrzeugklasse, Dauer und Strecke. Sie sehen den Fixpreis vor der Buchung, inklusive Chauffeur und allen Nebenkosten.' },
      { q: 'Welche Fahrzeuge stehen zur Auswahl?', a: 'Von der Mercedes E-Klasse über die S-Klasse bis zum Van und Sprinter. Sie wählen das Modell passend zu Anlass und Personenzahl.' },
      { q: 'Kann ich die Limousine für einen ganzen Tag buchen?', a: 'Ja. Neben Einzelfahrten bieten wir Stundenbuchungen und Ganztagesbegleitung. Buchen Sie online oder fragen Sie ein individuelles Angebot an.' },
      { q: 'Ist der Limousinenservice auch für Events geeignet?', a: 'Ja, für Hochzeiten, Firmenfeiern oder Empfänge. Für größere Gruppen oder besondere Wünsche erreichen Sie uns per WhatsApp oder E-Mail.' },
      { q: 'Sind die Fahrer diskret?', a: 'Ja. Unsere Chauffeure sind geschult, zur Verschwiegenheit verpflichtet und auf gehobenen Service spezialisiert.' },
      { q: 'Wie schnell ist die Limousine verfügbar?', a: 'Für spontane Fahrten sind wir rund um die Uhr erreichbar. Für Events und feste Termine empfehlen wir eine frühzeitige Buchung.' },
    ],
  },

  {
    slug: 'fahrdienst-diplomaten',

    slugEn: 'diplomatic-chauffeur-vienna',
    metaTitle: 'Diplomaten Chauffeur Wien – diskreter Fahrdienst',
    metaDescription:
      'Diplomaten Chauffeur in Wien: diskreter, sicherer Fahrdienst für Botschaften, Delegationen und Protokoll. Zuverlässig und vertraulich. Jetzt anfragen.',
    heroImg: '/images/services/fahrdienst-diplomaten-hero.jpg',
    hero: {
      title: 'Diplomaten Chauffeur',
      sub: 'Diskreter Fahrdienst für Diplomatie und Protokoll in Wien. Sicher, vertraulich und zuverlässig für Botschaften, Konsulate und offizielle Delegationen.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'Höchste Diskretion' },
      { icon: IC.user, label: 'Sicherheitsbewusst' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.preis, label: 'Verlässliche Abläufe' },
    ],
    marquee: ['Fahrdienst Diplomaten', 'Botschaften & Konsulate', 'Höchste Diskretion', 'Sicher & zuverlässig', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Ihr Fahrdienst',
      title: 'Ihr Diplomaten Chauffeur Wien',
      body: 'Ein Diplomaten Chauffeur Wien bewegt sich sicher im diplomatischen Umfeld, wo jedes Detail zählt: Pünktlichkeit, Diskretion und ein sicheres Auftreten. Unsere Chauffeure sind auf Fahrten für Botschaften, Delegationen und Protokoll spezialisiert und sorgen für einen reibungslosen Ablauf, ob Einzeltermin',
      cards: [
        { icon: IC.meet, title: 'Absolute Vertraulichkeit', text: 'Diskretion, Zurückhaltung und Verschwiegenheit sind bei jeder Fahrt selbstverständlich.' },
        { icon: IC.user, title: 'Sicherheitsbewusst', text: 'Erfahrene Chauffeure mit Gespür für Protokoll, Timing und sichere Routenführung.' },
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-intro.jpg', alt: 'Diskreter Chauffeur öffnet die Tür einer schwarzen Mercedes S-Klasse' },
    },
    benefit: {
      title: 'Warum unser Diplomatendienst',
      body: 'Erfahrene Chauffeure, absolute Vertraulichkeit und ein Gespür für Protokoll. Wir koordinieren mehrere Fahrzeuge, halten Zeitpläne exakt ein und bleiben dabei stets dezent im',
      items: [
        'Auf Diplomatie und Protokoll spezialisiert',
        'Absolute Diskretion und',
        'Koordination mehrerer Fahrzeuge möglich',
        'Pünktlich, sicher und dezent',
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-benefit.jpg', alt: 'Privater, getönter Fond einer Mercedes S-Klasse' },
      badge: { big: '100', sm: '% diskret' },
    },
    seo: {
      eyebrow: 'Diplomaten Chauffeur',
      title: 'Ihr diskreter Diplomaten Chauffeur für Botschaften und Protokoll in',
      paragraphs: [
        'Fahrten im diplomatischen Umfeld verlangen mehr als einen guten Wagen. Ein Diplomaten Chauffeur Wien braucht Fingerspitzengefühl, Verschwiegenheit und ein Verständnis für Protokoll und Abläufe.',
        'Unsere Chauffeure begleiten Botschaften, Delegationen und offizielle Gäste in Wien, vom einzelnen Termin bis zum mehrtägigen Besuch mit engem Zeitplan. Als Fahrdienst Botschaft Wien treten sie sicher auf, halten sich dezent im Hintergrund und wahren jederzeit Vertraulichkeit. Bei Bedarf koordinieren wir mehrere Fahrzeuge im Konvoi, stimmen Zeitpläne exakt ab und passen uns kurzfristigen Änderungen zuverlässig an.',
        'Für regelmäßige Fahrten von Botschaften und Institutionen richten wir feste Konditionen und feste Ansprechpartner ein. Als diskreter VIP Fahrdienst Wien planen wir jeden Auftrag persönlich mit Ihnen, da jeder Einsatz im diplomatischen Umfeld individuell ist.',
        'Erreichen Sie uns dazu direkt per WhatsApp oder E-Mail. Sie erhalten eine verlässliche Zusage mit klaren Konditionen, ganz ohne unnötige Umwege oder langes Warten auf ein Angebot.',
        'Unsere Fahrzeuge sind gepflegte Mercedes-Modelle der Ober- und Luxusklasse, auf Wunsch mit erhöhter Diskretion. So bleibt der Fahrdienst das, was er sein soll: ein reibungsloser, unauffälliger Teil eines gelungenen Ablaufs. Den Fixpreis sehen Sie vorab. Sie buchen bequem online.',
        'Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab.',
      ],
    },
    faq: [
      { q: 'Für wen ist der Diplomatendienst gedacht?', a: 'Für Botschaften, Konsulate, Delegationen und offizielle Gäste, die einen diskreten, protokollsicheren Fahrdienst in Wien benötigen.' },
      { q: 'Wie wird Vertraulichkeit gewährleistet?', a: 'Unsere Chauffeure sind zur Verschwiegenheit verpflichtet, erfahren im diplomatischen Umfeld und halten sich konsequent dezent im Hintergrund.' },
      { q: 'Können Sie mehrere Fahrzeuge koordinieren?', a: 'Ja. Für Delegationen und Staatsbesuche stellen wir mehrere Fahrzeuge mit abgestimmten Zeitplänen und festen Fahrern bereit.' },
      { q: 'Sind mehrtägige Einsätze möglich?', a: 'Ja. Wir begleiten auch mehrtägige Besuche mit engem Programm und passen uns kurzfristigen Änderungen zuverlässig an.' },
      { q: 'Wie sind die Fahrzeuge ausgestattet?', a: 'Gepflegte Mercedes-Fahrzeuge der Ober- und Luxusklasse, auf Wunsch mit erhöhter Diskretion und passender Ausstattung.' },
      { q: 'Wie kann ich anfragen?', a: 'Da jeder Einsatz individuell ist, planen wir ihn persönlich. Erreichen Sie uns per WhatsApp oder E-Mail für ein vertrauliches Angebot.' },
    ],
  },

  {
    slug: 'privatchauffeur',

    slugEn: 'private-chauffeur-vienna',
    metaTitle: 'Privatchauffeur Wien – Ihr persönlicher Fahrer',
    metaDescription:
      'Privatchauffeur in Wien: Ihr persönlicher Fahrer für Alltag, Termine und Familie. Diskret, zuverlässig, zum Fixpreis. Online buchen, sofort bestätigt.',
    heroImg: '/images/services/privatchauffeur-wien-hero.jpg',
    hero: {
      title: 'Privatchauffeur Wien',
      sub: 'Ihr persönlicher Fahrer in Wien. Diskret und zuverlässig für Alltag, Termine, Familie und jeden Weg, den Sie im Voraus planen und fest einplanen möchten.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Ihr fester Chauffeur' },
      { icon: IC.around, label: 'Flexibel & spontan' },
      { icon: IC.meet, label: 'Diskret & vertraut' },
      { icon: IC.preis, label: 'Transparente Preise' },
    ],
    marquee: ['Privatchauffeur Wien', 'Ihr fester Chauffeur', 'Alltag & besondere Tage', 'Diskret & flexibel', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Ihr Fahrer',
      title: 'Ihr Privatchauffeur Wien',
      body: 'Ein Privatchauffeur Wien ist mehr als eine Fahrt von A nach B. Er kennt Ihre Wege, Ihre Termine und Ihre Vorlieben. Ob täglicher Weg ins Büro, Fahrten der Familie oder der Abend in der Stadt: Sie haben einen festen Fahrer, auf den Sie sich verlassen. Diskret, pünktlich und immer mit gepflegtem Wagen.',
      cards: [
        { icon: IC.user, title: 'Fester Ansprechpartner', text: 'Ihr persönlicher Chauffeur kennt Ihre Wünsche und Ihren Ablauf — Fahrt für Fahrt.' },
        { icon: IC.around, title: 'Flexibel verfügbar', text: 'Ob geplant oder spontan, Ihr Privatchauffeur richtet sich nach Ihrem Terminkalender.' },
      ],
      image: { src: '/images/services/privatchauffeur-wien-intro.jpg', alt: 'Privatchauffeur begrüßt einen Stammkunden neben einer Mercedes E-Klasse' },
    },
    benefit: {
      title: 'Warum ein Privatchauffeur',
      body: 'Ein vertrautes Gesicht am Steuer, das Ihre Routine kennt. Feste Konditionen, transparente Preise und ein Fahrer, der sich um jedes Detail kümmert, während Sie sich entspannt',
      items: [
        'Fester, persönlicher Fahrer für Ihre Wege',
        'Diskret und absolut zuverlässig',
        'Feste Konditionen für regelmäßige Fahrten',
        'Online buchen, sofort bestätigt',
      ],
      image: { src: '/images/services/privatchauffeur-wien-benefit.jpg', alt: 'Gepflegter Fond einer Mercedes-Benz im warmen Morgenlicht' },
      badge: { big: '1', sm: 'fester Fahrer' },
    },
    seo: {
      eyebrow: 'Privatchauffeur Wien',
      title: 'Ihr persönlicher Privatchauffeur für jeden Weg in Wien',
      paragraphs: [
        'Manche Wege wiederholen sich, andere sind besonders. Ein Privatchauffeur Wien passt sich beidem an. Er bringt Sie morgens ins Büro, wartet bei Terminen, holt die Kinder von der Schule oder fährt Sie am Abend ins Konzert.',
        'Als persönlicher Fahrer Wien wird er mit der Zeit zu einem vertrauten Gesicht, das Ihre Routine kennt und vorausdenkt. Sie müssen nicht erklären, nicht organisieren und sich nicht ums Parken kümmern. Wasser steht im Wagen bereit, auf Wunsch ein Kindersitz, und der Wagen ist stets gepflegt und diskret.',
        'Sie buchen Ihre Fahrten direkt über unser Online Buchungssystem, sehen den Fixpreis sofort und zahlen bequem per Kreditkarte, Apple Pay oder Google Pay. Als Privatfahrer Wien stehen wir Ihnen so oft zur Verfügung, wie Sie möchten.',
        'Anders als bei Anbietern mit reinem Anfrageformular kennen Sie Ihren Preis von Anfang an, ohne auf ein Angebot zu warten. Für Geschäftskunden richten wir feste Firmenkonditionen ein, für besondere Wünsche wie mehrere Fahrten am Tag oder feste Wochentermine erreichen Sie uns jederzeit per WhatsApp oder E-Mail.',
        'So gewinnen Sie Zeit und Ruhe im Alltag, während sich jemand anderes zuverlässig und diskret ums Fahren kümmert und Sie sich auf das konzentrieren, was wirklich zählt. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest.',
        'Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online.',
      ],
    },
    faq: [
      { q: 'Was macht ein Privatchauffeur?', a: 'Ihr persönlicher Fahrer bringt Sie zu Terminen, im Alltag oder zu besonderen Anlässen. Auf Wunsch steht derselbe Fahrer bei jeder Fahrt bereit.' },
      { q: 'Kann ich denselben Fahrer regelmäßig buchen?', a: 'Ja. Gerade im Alltag schätzen Kunden ein vertrautes Gesicht. Wir richten feste Konditionen für regelmäßige Fahrten ein.' },
      { q: 'Was kostet ein Privatchauffeur in Wien?', a: 'Der Preis richtet sich nach Umfang und Dauer. Sie sehen den Fixpreis vor der Buchung, für regelmäßige Fahrten bieten wir feste Konditionen.' },
      { q: 'Ist der Privatchauffeur auch für Familien geeignet?', a: 'Ja. Auf Wunsch stellen wir Kindersitze bereit und bringen zuverlässig auch Kinder oder Angehörige ans Ziel.' },
      { q: 'Sind die Fahrer diskret?', a: 'Ja. Unsere Chauffeure sind geschult, verschwiegen und darauf spezialisiert, sich dezent im Hintergrund zu halten.' },
      { q: 'Wie buche ich einen Privatchauffeur?', a: 'Über unser Online Buchungssystem mit sofortiger Bestätigung. Für regelmäßige Fahrten oder Sonderwünsche per WhatsApp oder E-Mail.' },
    ],
  },

  {
    slug: 'shuttle-service',

    slugEn: 'shuttle-service-vienna',
    metaTitle: 'Shuttle Service Wien – Gruppentransfer mit Fahrer',
    metaDescription:
      'Shuttle Service Wien: zuverlässiger Gruppentransfer für Events, Firmen und Hotels. Bis 20 Sitze, Fixpreis, fester Fahrer. Jetzt online anfragen.',
    heroImg: '/images/services/shuttle-service-wien-hero.jpg',
    hero: {
      title: 'Shuttle Service Wien',
      sub: 'Zuverlässiger Gruppentransfer in Wien. Für Events, Firmen und Hotels, mit Platz für bis zu 20 Personen und einem festen, ortskundigen Fahrer am Steuer.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Bis zu 7 Personen' },
      { icon: IC.around, label: '24/7 verfügbar' },
      { icon: IC.meet, label: 'Für Gruppen & Firmen' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Shuttle-Service Wien', 'Gruppen & Events', 'Mercedes V-Klasse', 'Bis zu 7 Personen', 'Ganz Österreich'],
    intro: {
      eyebrow: 'Ihr Shuttle',
      title: 'Ihr Gruppentransfer Wien',
      body: 'Unser Gruppentransfer Wien bringt die ganze Gruppe gemeinsam ans Ziel. Ob Firmenevent, Hochzeit, Hotelgäste oder Delegation: Statt vieler einzelner Wagen reisen alle zusammen, entspannt und koordiniert. Vom Van bis zum 20-Sitzer Sprinter wählen wir das passende Fahrzeug, mit festem Fahrer und Fixpreis.',
      cards: [
        { icon: IC.user, title: 'Platz für die Gruppe', text: 'Bis zu sieben Personen reisen komfortabel und mit reichlich Gepäck in der V-Klasse.' },
        { icon: IC.meet, title: 'Für Events & Firmen', text: 'Koordinierte Abholungen und Transfers für Messen, Events und Firmenanlässe.' },
      ],
      image: { src: '/images/services/shuttle-service-wien-intro.jpg', alt: 'Geöffnete Schiebetür einer schwarzen Mercedes V-Klasse mit Sitzplätzen' },
    },
    benefit: {
      title: 'Warum unser Shuttle Service',
      body: 'Ein Fahrzeug für die ganze Gruppe, ein fester Fahrer und ein transparenter Preis. Wir koordinieren Abholung und Route, damit alle gemeinsam und pünktlich am Ziel ankommen.',
      items: [
        'Platz für bis zu 20 Personen im Sprinter',
        'Fester Fahrer und feste Route',
        'Ideal für Events, Firmen und Hotels',
        'Transparenter Fixpreis für die Gruppe',
      ],
      image: { src: '/images/services/shuttle-service-wien-benefit.jpg', alt: 'Geräumiger Innenraum einer Mercedes V-Klasse für Gruppen' },
      badge: { big: '20', sm: 'bis 20 Sitze' },
    },
    seo: {
      eyebrow: 'Shuttle Service Wien',
      title: 'Ihr zuverlässiger Shuttle Service für Gruppen in Wien',
      paragraphs: [
        'Wenn eine ganze Gruppe zum selben Ziel muss, wird Organisation schnell zur Herausforderung. Unser Gruppentransfer Wien nimmt Ihnen das ab.',
        'Ob Mitarbeiter zu einem Firmenevent, Gäste einer Hochzeit oder eine Reisegruppe vom Hotel: Alle reisen gemeinsam in einem Fahrzeug, koordiniert und pünktlich. Unser Shuttle Service Wien bringt das passende Fahrzeug, von der komfortablen V-Klasse für kleinere Gruppen bis zum 20-Sitzer Sprinter, immer mit festem, ortskundigem Fahrer. So kommt niemand zu spät, niemand verfährt sich, und Sie behalten den Überblick über die ganze Gruppe.',
        'Für regelmäßige Transfers, etwa von Mitarbeitern oder Hotelgästen, richten wir feste Konditionen ein. Ob großer Bus oder Kleinbus mit Fahrer Wien und Umgebung, da Gruppenfahrten oft individuelle Planung brauchen, stellen Sie einfach eine Anfrage über unser Buchungssystem oder erreichen uns direkt per WhatsApp oder E-Mail.',
        'Sie erhalten zügig ein transparentes Angebot mit Fixpreis für die gesamte Gruppe, ganz ohne versteckte Kosten und ohne langes Warten. Auf Wunsch koordinieren wir auch mehrere Fahrzeuge parallel, etwa bei größeren Delegationen mit vielen Gästen.',
        'So wird der Transfer zum reibungslosen Teil Ihres Events, um den Sie sich nicht mehr kümmern müssen und der einfach funktioniert. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest.',
        'Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab.',
      ],
    },
    faq: [
      { q: 'Für wie viele Personen eignet sich der Shuttle?', a: 'Vom Van für kleinere Gruppen bis zum Sprinter mit bis zu 20 Sitzen. Für größere Gruppen setzen wir mehrere Fahrzeuge ein.' },
      { q: 'Wofür eignet sich ein Shuttle Service?', a: 'Für Firmenevents, Hochzeiten, Hoteltransfers, Delegationen und Reisegruppen. Überall, wo viele Menschen gemeinsam ans Ziel sollen.' },
      { q: 'Was kostet ein Shuttle Service in Wien?', a: 'Sie erhalten einen Fixpreis für die gesamte Gruppe, abhängig von Fahrzeug, Strecke und Dauer, ohne versteckte Kosten.' },
      { q: 'Kann ich regelmäßige Transfers buchen?', a: 'Ja. Für wiederkehrende Fahrten von Mitarbeitern oder Gästen richten wir feste Konditionen ein. Sprechen Sie uns an.' },
      { q: 'Wie buche ich einen Gruppentransfer?', a: 'Am besten über eine Anfrage mit Details zu Gruppe und Anlass. Sie erhalten zügig ein Angebot, alternativ per WhatsApp oder E-Mail.' },
      { q: 'Sind auch mehrere Fahrzeuge möglich?', a: 'Ja. Für größere Gruppen oder parallele Abholungen koordinieren wir mehrere Fahrzeuge mit festen Fahrern.' },
    ],
  },

  {
    slug: 'langstreckenfahrten',

    slugEn: 'day-trips-from-vienna',
    metaTitle: 'Langstreckenfahrten Wien – Bratislava, Prag & mehr',
    metaDescription:
      'Langstreckenfahrten ab Wien: komfortabel nach Bratislava, Prag, Budapest oder quer durch Österreich. Fixpreis, fester Chauffeur, online buchbar.',
    heroImg: '/images/services/langstreckenfahrten-hero.jpg',
    hero: {
      title: 'Langstreckenfahrten',
      sub: 'Komfortabel über die Stadtgrenze hinaus. Mit festem Chauffeur nach Bratislava, Prag, Budapest oder quer durch ganz Österreich und Europa.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Österreich & Europa' },
      { icon: IC.user, label: 'Erfahrener Chauffeur' },
      { icon: IC.meet, label: 'Ohne Umsteigen' },
      { icon: IC.preis, label: 'Transparenter Festpreis' },
    ],
    marquee: ['Langstreckenfahrten', 'Österreich & Europa', 'Ohne Umsteigen', 'Komfortabel reisen', 'Tür zu Tür'],
    intro: {
      eyebrow: 'Ihre Langstrecke',
      title: 'Langstreckenfahrten Wien',
      body: 'Unsere Langstreckenfahrten Wien bringen Sie entspannt über die Stadtgrenze. Statt Bahnhofsstress oder Mietwagen holt Ihr Chauffeur Sie ab und fährt Sie direkt ans Ziel, ohne Umsteigen. Ob Geschäftsreise oder Wochenende, Sie reisen bequem und können unterwegs arbeiten oder ausruhen. Den Fixpreis sehen Sie',
      cards: [
        { icon: IC.around, title: 'Tür zu Tür', text: 'Kein Umsteigen, keine Wartezeiten — wir bringen Sie direkt von Adresse zu Adresse.' },
        { icon: IC.user, title: 'Erfahrener Chauffeur', text: 'Routiniert auf langen Strecken, mit Blick für Komfort, Pausen und sichere Fahrt.' },
      ],
      image: { src: '/images/services/langstreckenfahrten-intro.jpg', alt: 'Schwarze Mercedes S-Klasse an einem Aussichtspunkt in Österreich' },
    },
    benefit: {
      title: 'Warum Langstrecke mit uns',
      body: 'Direkt von Tür zu Tür, ohne Umsteigen und Wartezeit. Fester Chauffeur, bequemes Fahrzeug und ein Fixpreis für die ganze Strecke, den Sie schon vor der Buchung kennen.',
      items: [
        'Direkte Fahrt von Tür zu Tür ohne Umsteigen',
        'Fixpreis für die gesamte Strecke',
        'Arbeiten oder ausruhen unterwegs',
        'Grenzüberschreitend in ganz Europa',
      ],
      image: { src: '/images/services/langstreckenfahrten-benefit.jpg', alt: 'Entspannter Fahrgast im Fond einer Mercedes-Benz auf der Langstrecke' },
      badge: { big: 'EU', sm: 'grenzüberschr.' },
    },
    seo: {
      eyebrow: 'Langstreckenfahrten',
      title: 'Ihre komfortable Langstreckenfahrt ab Wien in ganz Europa',
      paragraphs: [
        'Nicht jede Reise endet an der Stadtgrenze. Unsere Langstreckenfahrten Wien bringen Sie ruhig und direkt ans Ziel.',
        'Ein Termin in Bratislava, ein Wochenende in Prag, eine Hochzeit in Budapest oder der Transfer nach Salzburg: Sie steigen in Wien ein und an Ihrer Zieladresse wieder aus, ohne Umsteigen, ohne Gepäckwagen, ohne Fahrstress.',
        'Ob Transfer Wien Bratislava, Transfer Wien Prag oder Transfer Wien Budapest, unterwegs haben Sie Ruhe für Telefonate, Arbeit oder die Aussicht auf die Landschaft. Wasser steht bereit, auf Wunsch auch ein Kindersitz, und Ihr Fahrer kennt die Strecke und die Grenzformalitäten.',
        'Die Buchung ist so einfach wie bei jeder Fahrt. Sie geben Start und Ziel an, wählen Ihr Fahrzeug, sehen den Fixpreis für die gesamte Strecke und buchen direkt über unser Online Buchungssystem. Bezahlt wird per Kreditkarte, Apple Pay oder Google Pay. Anders als bei Anbietern mit reinem Anfrageformular kennen Sie Ihren Preis sofort, ohne auf ein Angebot zu warten und ohne Zuschläge für Wartezeit oder Grenzübertritt.',
        'Beliebte Strecken wie diese fahren wir regelmäßig und kennen die schnellsten Wege. Für mehrtägige Reisen, feste Firmenkonditionen oder besondere Routen mit Zwischenstopps erreichen Sie uns per WhatsApp oder E-Mail. So kommen Sie entspannt und pünktlich an, egal wie weit das Ziel entfernt liegt. Den Fixpreis sehen Sie vorab.',
        'Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret. Auf Wunsch mit Kindersitz. Den Fixpreis sehen Sie vorab. Sie buchen bequem online. Wir kümmern uns um den Rest. Zuverlässig und diskret.',
      ],
    },
    faq: [
      { q: 'Welche Ziele fahren Sie ab Wien an?', a: 'Regelmäßig Bratislava, Prag, Budapest, Salzburg und Graz, dazu Ziele in ganz Österreich und im benachbarten Ausland. Andere Strecken planen wir individuell.' },
      { q: 'Was kostet eine Langstreckenfahrt?', a: 'Sie zahlen einen Fixpreis für die gesamte Strecke, den Sie vor der Buchung sehen. Keine Zuschläge für Wartezeit oder Grenzübertritt.' },
      { q: 'Kann ich unterwegs Stopps einlegen?', a: 'Ja. Sagen Sie uns Ihre Wünsche bei der Buchung oder per WhatsApp, wir planen Zwischenstopps in Ihre Route ein.' },
      { q: 'Sind mehrtägige Fahrten möglich?', a: 'Ja, wir bieten mehrtägige Chauffeurbegleitung mit festem Fahrer. Fragen Sie dazu ein persönliches Angebot an.' },
      { q: 'Reisen Sie auch über Landesgrenzen?', a: 'Ja, grenzüberschreitend in ganz Europa. Ihr Chauffeur kennt die Formalitäten, sodass die Fahrt reibungslos verläuft.' },
      { q: 'Wie buche ich eine Langstreckenfahrt?', a: 'Über unser Online Buchungssystem mit Start, Ziel und Fahrzeugwahl. Für mehrtägige oder besondere Fahrten per WhatsApp oder E-Mail.' },
    ],
  },
];

export const SERVICES_DATA_EN: Service[] = [
  {
    slug: 'flughafen-transfer-wien',

    slugEn: 'airport-transfer-vienna',
    metaTitle: 'Vienna Airport Transfer – Fixed Price from VIE',
    metaDescription:
      'Vienna airport transfer at a fixed price: pickup at Vienna Airport, flight tracking and discreet drivers. Around the clock. Book your transfer online now.',
    heroImg: '/images/services/hero-flughafen.jpg',
    hero: {
      title: 'Vienna Airport',
      sub: 'Punctual pickup at Vienna Airport and in the city. Fixed price, flight tracking and a driver who waits for you and brings you to your destination.',
    },
    heroFeatures: [
      { icon: IC.flug, label: 'Flight monitoring included' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.meet, label: 'Meet & Greet at the gate' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Airport Transfer Vienna', '24/7 available', 'Meet & Greet at the gate', 'Transparent fixed prices', 'VIE City Centre'],
    intro: {
      eyebrow: 'Your transfer',
      title: 'Relaxed to Vienna Airport',
      body: 'Your chauffeur picks you up at home, at your hotel or at the terminal and brings you safely to your destination. We track your flight in real time and adjust the pickup time automatically if it is delayed. No waiting in the taxi queue, no stress with luggage. You get in and arrive relaxed.',
      cards: [
        { icon: IC.plane, title: 'Real-time flight monitoring', text: 'We keep an eye on your flight and automatically adjust the pick-up time in the event of delays.' },
        { icon: IC.user, title: 'Meet & Greet at the gate', text: 'Your chauffeur awaits you personally with a name sign right after your arrival in the terminal.' },
      ],
      image: { src: '/images/services/intro-airport.jpg', alt: 'Chauffeur with Mercedes E-Class in front of the airport terminal' },
    },
    benefit: {
      title: 'Why your transfer fits with us',
      body: 'Fixed drivers, transparent prices and a process built to be simple. You book online, see the price at once and receive your confirmation without waiting for a quote.',
      items: [
        'Pickup at Vienna Airport and in the city',
        'Fixed price, no hidden costs',
        'Flight tracking and automatic adjustment',
        'Book online, confirmed instantly',
      ],
      image: { src: '/images/services/benefit-interior.jpg', alt: 'Beige leather seats in the rear of a Mercedes S-Class' },
      badge: { big: '24h', sm: 'at your' },
    },
    seo: {
      eyebrow: 'Vienna Airport',
      title: 'Your reliable airport transfer to and from Vienna Airport',
      paragraphs: [
        'A flight is tiring enough on its own. The transfer to or from Vienna Airport should be the easy part, and with us it is. Your chauffeur is there on time, helps with your luggage and knows the fastest way into the city or out to Schwechat.',
        'We track your flight, so even if it arrives early or late, your driver is waiting, not the other way around. Water is on board, and a child seat is available on request. Instead of queuing for a taxi after a long journey, you step straight into a clean, comfortable Mercedes and arrive relaxed.',
        'Booking is just as simple. You enter your route, choose your vehicle, see the fixed price and book directly through our online booking system.',
        'Payment is by credit card, Apple Pay or Google Pay, and confirmation is immediate. Unlike providers where you first send a request and wait for a quote, you know exactly what the ride costs in advance, with no surcharges for waiting time.',
        'The price you see is the price you pay. For business clients we set up fixed corporate terms for regular airport runs. If you have a special request, such as several stops or a group pickup, you can reach us any time by WhatsApp or email. That way your airport transfer is one thing you never have to worry about.',
        'You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is always on board for you. You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard.',
      ],
    },
    faq: [
      { q: 'How much does a Vienna airport transfer cost?', a: 'You pay a fixed price that you see before booking, including driver and all extras. No taxi meter and no surcharges for waiting.' },
      { q: 'What happens if my flight is delayed?', a: 'We track your flight in real time and adjust the pickup automatically. Your driver waits for you at no extra charge.' },
      { q: 'Where does the driver wait at the airport?', a: 'Your chauffeur meets you at the arrivals area and helps with your luggage. On request we arrange a personal name sign.' },
      { q: 'Can I book a transfer for several people?', a: 'Yes. From the van to the 20-seater Sprinter we cover groups of any size. Simply choose the right vehicle when booking.' },
      { q: 'How do I pay for the transfer?', a: 'Conveniently online by credit card, Apple Pay or Google Pay. Your confirmation arrives immediately after booking.' },
      { q: 'Do you also drive to other airports?', a: 'Yes, we also handle transfers to Bratislava, Budapest and other airports in the region at a fixed price.' },
    ],
  },

  {
    slug: 'chauffeurservice',

    slugEn: 'chauffeur-service-vienna',
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

    slugEn: 'chauffeur-by-the-hour-vienna',
    metaTitle: 'Chauffeur by the Hour Vienna – Book Hourly',
    metaDescription:
      'Chauffeur by the hour in Vienna: book hourly, a fixed driver, fixed price per hour. Ideal for meetings and shopping. Book online, confirmed instantly.',
    heroImg: '/images/services/chauffeur-pro-stunde-hero.jpg',
    hero: {
      title: 'Chauffeur by the Hour',
      sub: 'Book your chauffeur by the hour in Vienna. A fixed driver stays with you for as long as you need, flexible and simple to plan around your day.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Flexible hourly booking' },
      { icon: IC.user, label: 'Chauffeur waits for you' },
      { icon: IC.meet, label: 'Multiple stops possible' },
      { icon: IC.preis, label: 'Fixed price per hour' },
    ],
    marquee: ['Chauffeur by the Hour', 'Book by the hour', 'Multiple appointments', 'Full flexibility', 'All of Vienna'],
    intro: {
      eyebrow: 'Hourly chauffeur',
      title: 'Flexible through your day',
      body: 'Several meetings in a row, a day of shopping or an evening with changing destinations: with our chauffeur by the hour the same driver stays on duty for you. He waits between stops, knows the routes and adapts to your schedule. You book the hours you need and see the fixed price per hour in advance.',
      cards: [
        { icon: IC.around, title: 'Flexible hours', text: 'Book from two hours and extend spontaneously as needed — entirely to suit your schedule.' },
        { icon: IC.user, title: 'The chauffeur stays', text: 'Your chauffeur waits between appointments and is immediately ready for you again.' },
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-intro.jpg', alt: 'Chauffeur checking the time beside a black Mercedes E-Class' },
    },
    benefit: {
      title: 'Why book by the hour',
      body: 'One fixed chauffeur for your whole appointment, clear hourly rates and full flexibility. You book online and see the price at once, with no waiting for a quote or offer.',
      items: [
        'A fixed driver for the booked time',
        'Transparent fixed price per hour',
        'Waits between your meetings and stops',
        'Easily extended when you need it',
      ],
      image: { src: '/images/services/chauffeur-pro-stunde-benefit.jpg', alt: 'Coat and leather bag on the back seat of a Mercedes-Benz' },
      badge: { big: '1', sm: 'fixed driver' },
    },
    seo: {
      eyebrow: 'Chauffeur by the Hour',
      title: 'Your personal chauffeur, bookable by the hour across Vienna',
      paragraphs: [
        'Some days cannot be squeezed into a single ride. A morning with three meetings, an afternoon of shopping, an evening of dinner and an event: this is where a chauffeur by the hour is the most relaxed solution.',
        'Your fixed driver takes you from place to place, waits in between and keeps the car ready. You do not book again each time, search for parking or wait for a taxi. Water is on board, a child seat on request, and you keep the same familiar person at the wheel throughout the day.',
        'Booking is straightforward. You choose the vehicle and number of hours, see the fixed price per hour and book directly through our online booking system. Payment is by credit card, Apple Pay or Google Pay, and confirmation is immediate. You do not wait for a quote like with many other providers, you know the price from the start.',
        'If your day runs longer than planned, we extend flexibly as long as the driver is available. For business clients there are fixed terms for regular bookings, and for special wishes such as several passengers or fixed weekly slots you can reach us by WhatsApp or email.',
        'That way you keep your schedule under control and leave the driving to someone who knows Vienna. You see the fixed price before you book.',
        'Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard.',
      ],
    },
    faq: [
      { q: 'How many hours do I have to book at least?', a: 'We tell you the minimum duration when booking. You see the fixed price per hour in advance and can extend flexibly if needed.' },
      { q: 'Does the same driver stay for the whole appointment?', a: 'Yes. Your chauffeur is dedicated to you for the booked time, waits between stops and adapts to your schedule.' },
      { q: 'Can I extend the booking spontaneously?', a: 'Yes, as long as the driver is available. Just let him know, and the additional time is billed transparently.' },
      { q: 'What is a chauffeur by the hour good for?', a: 'For several meetings, shopping, sightseeing or evenings with changing destinations. Anywhere you want to stay flexible.' },
      { q: 'Can I travel outside Vienna by the hour?', a: 'Yes. Within the booked time we also drive into the surrounding area. Longer routes we plan individually.' },
      { q: 'How do I book a chauffeur by the hour?', a: 'Through our online booking system: choose vehicle and hours, see the price, pay directly. For special wishes by WhatsApp or email.' },
    ],
  },

  {
    slug: 'limousinenservice',

    slugEn: 'limousine-service-vienna',
    metaTitle: 'Limousine Service Vienna – Mercedes with Driver',
    metaDescription:
      'Limousine service in Vienna: Mercedes limousine with chauffeur at a fixed price. Discreet, comfortable, around the clock. Book online, confirmed instantly.',
    heroImg: '/images/services/limousinen-service-wien-hero.jpg',
    hero: {
      title: 'Limousine Service',
      sub: 'A Mercedes limousine with your own chauffeur. For business meetings, special occasions and stylish, discreet rides across all of Vienna.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'For special occasions' },
      { icon: IC.user, label: 'Experienced chauffeur' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Limousine Service Vienna', 'Weddings & Events', 'Mercedes-Benz luxury class', 'Arrive in style', 'Throughout Austria'],
    intro: {
      eyebrow: 'Your limousine',
      title: 'Travel Vienna in style',
      body: 'You choose your limousine, we provide the right chauffeur. Whether a business meeting, an evening event or a ride to the opera, you travel in a well-kept Mercedes, calm and discreet. Your driver knows Vienna, plans the route ahead and is there on time. You see the fixed price before you book.',
      cards: [
        { icon: IC.meet, title: 'For your occasion', text: 'Wedding, gala or event — we tailor the vehicle and schedule to your moment.' },
        { icon: IC.user, title: 'Chauffeur with etiquette', text: 'Discreet, elegant and attentive — your chauffeur accompanies the day with composure.' },
      ],
      image: { src: '/images/services/limousinen-service-wien-intro.jpg', alt: 'Black Mercedes S-Class in front of a festive occasion in Vienna' },
    },
    benefit: {
      title: 'Why our limousine service',
      body: 'A modern Mercedes fleet, fixed chauffeurs and a transparent fixed price. You book online, see the price at once and receive confirmation without waiting for a quote.',
      items: [
        'Well-kept Mercedes limousines of every class',
        'Fixed price upfront, no hidden costs',
        'Discreet, trained chauffeurs who know the city',
        'Book online, confirmed instantly',
      ],
      image: { src: '/images/services/limousinen-service-wien-benefit.jpg', alt: 'Luxurious rear of a Mercedes S-Class for special occasions' },
      badge: { big: '5.0', sm: 'client rating' },
    },
    seo: {
      eyebrow: 'Limousine Service',
      title: 'Your Mercedes limousine with chauffeur for any occasion in Vienna',
      paragraphs: [
        'A limousine service is more than a ride. It is the calm minute before a meeting, the good first impression with clients and the easy arrival after a long day.',
        'With us you choose from a modern Mercedes fleet, from the elegant E-Class through the representative S-Class to the spacious van for several guests. Every car is clean, air-conditioned and stocked with water for you, and a child seat is available on request. Your chauffeur is discreet, punctual and knows the routes through Vienna.',
        'The process is simple. You pick your vehicle, see the fixed price at once and book directly through our online booking system.',
        'Payment is by credit card, Apple Pay or Google Pay, and confirmation arrives immediately. Unlike providers where you first send a request and wait for an offer, you know exactly what the ride costs in advance, with no hidden surcharges.',
        'For business clients we offer fixed corporate terms for regular rides. If you have a special wish, such as several stops or an evening of events, you can reach us any time by WhatsApp or email. That way your ride through Vienna is as pleasant as the occasion it takes you to. You see the fixed price before you book. Booking takes just a couple of minutes.',
        'Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request.',
      ],
    },
    faq: [
      { q: 'What does a limousine service in Vienna cost?', a: 'The price depends on vehicle class, duration and route. You see the fixed price before booking, including chauffeur and all extras.' },
      { q: 'Which vehicles can I choose from?', a: 'From the Mercedes E-Class and S-Class to vans and the Sprinter. You pick the model to suit the occasion and number of guests.' },
      { q: 'Can I book the limousine for a full day?', a: 'Yes. Alongside single rides we offer hourly bookings and full-day service. Book online or request an individual quote.' },
      { q: 'Is the limousine service suitable for events?', a: 'Yes, for weddings, corporate events or receptions. For larger groups or special wishes reach us by WhatsApp or email.' },
      { q: 'Are the drivers discreet?', a: 'Yes. Our chauffeurs are trained, bound to confidentiality and specialised in refined service.' },
      { q: 'How quickly is a limousine available?', a: 'For spontaneous rides we are reachable around the clock. For events and fixed dates we recommend booking early.' },
    ],
  },

  {
    slug: 'fahrdienst-diplomaten',

    slugEn: 'diplomatic-chauffeur-vienna',
    metaTitle: 'Diplomatic Chauffeur Vienna – Discreet Driver',
    metaDescription:
      'Diplomatic chauffeur in Vienna: discreet, secure driver service for embassies, delegations and protocol. Reliable and confidential. Request your service',
    heroImg: '/images/services/fahrdienst-diplomaten-hero.jpg',
    hero: {
      title: 'Diplomatic Chauffeur',
      sub: 'A discreet driver service for diplomacy and protocol in Vienna. Secure, confidential and reliable for embassies, consulates and delegations.',
    },
    heroFeatures: [
      { icon: IC.meet, label: 'The highest discretion' },
      { icon: IC.user, label: 'Security-conscious' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.preis, label: 'Dependable procedures' },
    ],
    marquee: ['Diplomat Chauffeur Service', 'Embassies & Consulates', 'The highest discretion', 'Safe & reliable', 'Throughout Austria'],
    intro: {
      eyebrow: 'Your service',
      title: 'Discretion comes first',
      body: 'In the diplomatic world every detail counts: punctuality, discretion and a confident presence. Our chauffeurs are specialised in rides for embassies, delegations and protocol. They know the procedures, keep confidentiality and ensure a smooth process, whether a single appointment or a multi-day state',
      cards: [
        { icon: IC.meet, title: 'Absolute confidentiality', text: 'Discretion, restraint and confidentiality are a matter of course on every journey.' },
        { icon: IC.user, title: 'Security-conscious', text: 'Experienced chauffeurs with a feel for protocol, timing and safe route planning.' },
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-intro.jpg', alt: 'Discreet chauffeur opening the door of a black Mercedes S-Class' },
    },
    benefit: {
      title: 'Why our diplomatic service',
      body: 'Experienced chauffeurs, absolute confidentiality and a feel for protocol. We coordinate several vehicles, keep schedules exact and stay quietly in the background at all times.',
      items: [
        'Specialised in diplomacy and protocol',
        'Absolute discretion and',
        'Coordination of several vehicles possible',
        'Punctual, secure and unobtrusive',
      ],
      image: { src: '/images/services/fahrdienst-diplomaten-benefit.jpg', alt: 'Private, tinted rear of a Mercedes S-Class' },
      badge: { big: '100', sm: '% discreet' },
    },
    seo: {
      eyebrow: 'Diplomatic Chauffeur',
      title: 'Your discreet diplomatic chauffeur for embassies and protocol in',
      paragraphs: [
        'Rides in the diplomatic world demand more than a good car. They demand tact, discretion and a driver who understands protocol and procedure.',
        'Our chauffeurs accompany embassies, delegations and official guests in Vienna, from a single appointment to a multi-day visit with a tight schedule. They present themselves with confidence, stay quietly in the background and keep confidentiality at all times. When needed we coordinate several vehicles in convoy, align schedules exactly and adapt reliably to short-notice changes.',
        'For regular rides of embassies and institutions we set up fixed terms and fixed points of contact, so processes stay smooth and familiar. As every assignment in the diplomatic field is individual, we plan it personally with you. You can reach us directly by WhatsApp or email.',
        'You receive a reliable commitment with clear terms, without unnecessary detours or long waiting for a quote. Our vehicles are well-kept Mercedes models of the upper and luxury class, with heightened discretion on request.',
        'That way the driver service stays what it should be: a smooth, unobtrusive part of a successful programme you can rely on at any time. From the first request to the last ride you have one fixed point of contact who knows every step and coordinates confidentially for you.',
        'You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book.',
      ],
    },
    faq: [
      { q: 'Who is the diplomatic service for?', a: 'For embassies, consulates, delegations and official guests who need a discreet, protocol-aware driver service in Vienna.' },
      { q: 'How is confidentiality ensured?', a: 'Our chauffeurs are bound to confidentiality, experienced in the diplomatic field and consistently discreet in the background.' },
      { q: 'Can you coordinate several vehicles?', a: 'Yes. For delegations and state visits we provide several vehicles with aligned schedules and fixed drivers.' },
      { q: 'Are multi-day assignments possible?', a: 'Yes. We also accompany multi-day visits with tight programmes and adapt reliably to short-notice changes.' },
      { q: 'How are the vehicles equipped?', a: 'Well-kept Mercedes vehicles of the upper and luxury class, with heightened discretion and suitable equipment on request.' },
      { q: 'How can I make a request?', a: 'As every assignment is individual, we plan it personally. Reach us by WhatsApp or email for a confidential quote.' },
    ],
  },

  {
    slug: 'privatchauffeur',

    slugEn: 'private-chauffeur-vienna',
    metaTitle: 'Private Chauffeur Vienna – Your Personal Driver',
    metaDescription:
      'Private chauffeur in Vienna: your personal driver for daily life, meetings and family. Discreet, reliable, at a fixed price. Book online, confirmed',
    heroImg: '/images/services/privatchauffeur-wien-hero.jpg',
    hero: {
      title: 'Private Chauffeur',
      sub: 'Your personal driver in Vienna. Discreet and reliable for daily life, meetings, family and any route you plan and schedule well ahead of time.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Your dedicated chauffeur' },
      { icon: IC.around, label: 'Flexible & spontaneous' },
      { icon: IC.meet, label: 'Discreet & familiar' },
      { icon: IC.preis, label: 'Transparent prices' },
    ],
    marquee: ['Private Chauffeur Vienna', 'Your dedicated chauffeur', 'Everyday life & special days', 'Discreet & flexible', 'Throughout Austria'],
    intro: {
      eyebrow: 'Your driver',
      title: 'Personal travel in Vienna',
      body: 'A private chauffeur is more than a ride from A to B. He knows your routes, your appointments and your preferences. Whether the daily commute, family rides or an evening out, you have a fixed driver you can rely on. Discreet, punctual and always in a well-kept car. You see the fixed price in advance.',
      cards: [
        { icon: IC.user, title: 'Dedicated point of contact', text: 'Your personal chauffeur knows your wishes and your schedule — journey after journey.' },
        { icon: IC.around, title: 'Flexibly available', text: 'Whether planned or spontaneous, your private chauffeur adapts to your calendar.' },
      ],
      image: { src: '/images/services/privatchauffeur-wien-intro.jpg', alt: 'Private chauffeur greeting a regular client beside a Mercedes E-Class' },
    },
    benefit: {
      title: 'Why a private chauffeur',
      body: 'A familiar face at the wheel who knows your routine. Fixed terms, transparent prices and a driver who takes care of every detail, while you simply lean back and relax.',
      items: [
        'A fixed, personal driver for your routes',
        'Discreet and absolutely reliable',
        'Fixed terms for regular, recurring rides',
        'Book online, confirmed instantly',
      ],
      image: { src: '/images/services/privatchauffeur-wien-benefit.jpg', alt: 'Immaculate rear of a Mercedes-Benz in warm morning light' },
      badge: { big: '1', sm: 'fixed driver' },
    },
    seo: {
      eyebrow: 'Private Chauffeur',
      title: 'Your personal private chauffeur for every route in Vienna',
      paragraphs: [
        'Some routes repeat, others are special, and a private chauffeur adapts to both. He takes you to the office in the morning, waits during meetings, collects the children from school or drives you to a concert in the evening.',
        'Over time the driver becomes a familiar face who knows your routine and thinks ahead. You do not need to explain, organise or worry about parking. Water is on board, a child seat on request, and the car is always clean and discreet.',
        'You book your rides directly through our online booking system, see the fixed price at once and pay conveniently by credit card, Apple Pay or Google Pay. Unlike providers with a request form only, you know your price from the start, without waiting for an offer.',
        'For business clients we set up fixed corporate terms, and for special wishes such as several rides a day or fixed weekly appointments you can reach us any time by WhatsApp or email. That way you gain time and calm in daily life, while someone else takes reliable, discreet care of the driving and you focus on what really matters.',
        'You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard.',
        'Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book.',
      ],
    },
    faq: [
      { q: 'What does a private chauffeur do?', a: 'Your personal driver takes you to meetings, through daily life or to special occasions. On request the same driver is available for every ride.' },
      { q: 'Can I book the same driver regularly?', a: 'Yes. In daily life especially, clients value a familiar face. We set up fixed terms for regular rides.' },
      { q: 'What does a private chauffeur in Vienna cost?', a: 'The price depends on scope and duration. You see the fixed price before booking, with fixed terms for regular rides.' },
      { q: 'Is the private chauffeur suitable for families?', a: 'Yes. On request we provide child seats and reliably bring children or relatives to their destination.' },
      { q: 'Are the drivers discreet?', a: 'Yes. Our chauffeurs are trained, discreet and specialised in staying quietly in the background.' },
      { q: 'How do I book a private chauffeur?', a: 'Through our online booking system with instant confirmation. For regular rides or special wishes reach us by WhatsApp or email.' },
    ],
  },

  {
    slug: 'shuttle-service',

    slugEn: 'shuttle-service-vienna',
    metaTitle: 'Shuttle Service Vienna – Group Transfer with Driver',
    metaDescription:
      'Shuttle service in Vienna: reliable group transfer for events, companies and hotels. Up to 20 seats, fixed price, fixed driver. Request your shuttle now.',
    heroImg: '/images/services/shuttle-service-wien-hero.jpg',
    hero: {
      title: 'Shuttle Service',
      sub: 'Reliable group transfer in Vienna. For events, companies and hotels, with comfortable room for up to 20 people and a fixed, local driver.',
    },
    heroFeatures: [
      { icon: IC.user, label: 'Up to 7 passengers' },
      { icon: IC.around, label: '24/7 available' },
      { icon: IC.meet, label: 'For groups & companies' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Shuttle Service Vienna', 'Groups & Events', 'Mercedes V-Class', 'Up to 7 passengers', 'Throughout Austria'],
    intro: {
      eyebrow: 'Your shuttle',
      title: 'Groups safely to the goal',
      body: 'Whether a corporate event, a wedding, hotel guests or a delegation, your shuttle brings the whole group together and on time. Instead of many separate cars, everyone travels together, relaxed and coordinated. From the van to the 20-seater Sprinter we choose the right vehicle, with a fixed driver and a',
      cards: [
        { icon: IC.user, title: 'Room for the group', text: 'Up to seven passengers travel comfortably and with plenty of luggage in the V-Class.' },
        { icon: IC.meet, title: 'For events & companies', text: 'Coordinated pick-ups and transfers for trade fairs, events and company occasions.' },
      ],
      image: { src: '/images/services/shuttle-service-wien-intro.jpg', alt: 'Open sliding door of a black Mercedes V-Class with seating' },
    },
    benefit: {
      title: 'Why our shuttle service',
      body: 'One vehicle for the whole group, a fixed driver and a transparent price. We coordinate the pickup and the route, so that everyone arrives together and right on time.',
      items: [
        'Room for up to 20 people in the Sprinter',
        'A fixed driver and a fixed route',
        'Ideal for events, companies and hotels',
        'A transparent fixed price for the group',
      ],
      image: { src: '/images/services/shuttle-service-wien-benefit.jpg', alt: 'Spacious interior of a Mercedes V-Class for groups' },
      badge: { big: '20', sm: 'up to 20 seats' },
    },
    seo: {
      eyebrow: 'Group Transfer Vienna',
      title: 'Your reliable shuttle service for groups in Vienna',
      paragraphs: [
        'When a whole group needs to reach the same destination, organisation quickly becomes a challenge. Our shuttle service takes that off your hands.',
        'Whether staff heading to a corporate event, guests at a wedding or a travel group from a hotel, everyone travels together in one vehicle, coordinated and on time.',
        'We bring the right vehicle for the size of the group, from the comfortable V-Class for smaller groups to the 20-seater Sprinter, always with a fixed, local driver. That way no one is late, no one gets lost, and you keep an overview of the whole group without sitting behind the wheel yourself.',
        'For regular transfers, for example of staff or hotel guests, we set up fixed terms. As group rides often need individual planning, you simply send a request through our booking system or reach us directly by WhatsApp or email. You receive a clear quote with a fixed price for the whole group, without hidden costs and without long waiting.',
        'On request we also coordinate several vehicles in parallel, for larger delegations or when guests are collected from different places. That way the transfer becomes the smooth part of your event, one you no longer have to worry about, from the first guest to the last. You see the fixed price before you book. Booking takes just a couple of minutes.',
        'Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are.',
      ],
    },
    faq: [
      { q: 'How many people fit in the shuttle?', a: 'From the van for smaller groups to the Sprinter with up to 20 seats. For larger groups we use several vehicles.' },
      { q: 'What is a shuttle service good for?', a: 'For corporate events, weddings, hotel transfers, delegations and travel groups. Anywhere many people need to arrive together.' },
      { q: 'What does a shuttle service in Vienna cost?', a: 'You receive a fixed price for the whole group, depending on vehicle, route and duration, with no hidden costs.' },
      { q: 'Can I book regular transfers?', a: 'Yes. For recurring rides of staff or guests we set up fixed terms. Simply get in touch.' },
      { q: 'How do I book a group transfer?', a: 'Best via a request with details on group and occasion. You receive a quote quickly, or reach us by WhatsApp or email.' },
      { q: 'Are several vehicles possible?', a: 'Yes. For larger groups or parallel pickups we coordinate several vehicles with fixed drivers.' },
    ],
  },

  {
    slug: 'langstreckenfahrten',

    slugEn: 'day-trips-from-vienna',
    metaTitle: 'Day Trips from Vienna – Private Driver & Car',
    metaDescription:
      'Day trips from Vienna with a private chauffeur: Hallstatt, Bratislava, Budapest and more. Comfortable, door to door, at a fixed price. Book your trip',
    heroImg: '/images/services/langstreckenfahrten-hero.jpg',
    hero: {
      title: 'Day Trips from Vienna',
      sub: 'Explore beyond the city with your own driver. Day trips from Vienna to Hallstatt, Bratislava, Budapest and right across the wider region.',
    },
    heroFeatures: [
      { icon: IC.around, label: 'Austria & Europe' },
      { icon: IC.user, label: 'Experienced chauffeur' },
      { icon: IC.meet, label: 'Without changing' },
      { icon: IC.preis, label: 'Transparent fixed price' },
    ],
    marquee: ['Long-Distance Journeys', 'Austria & Europe', 'Without changing', 'Travel comfortably', 'Door to door'],
    intro: {
      eyebrow: 'Your day trip',
      title: 'See more, drive less',
      body: 'Instead of train timetables or a rental car, your chauffeur picks you up and brings you straight to your destination and back. Whether a day in Hallstatt, a visit to Bratislava or a trip to Salzburg, you travel in a comfortable Mercedes and simply enjoy the view. You see the fixed price for the whole',
      cards: [
        { icon: IC.around, title: 'Door to door', text: 'No changing, no waiting times — we take you directly from address to address.' },
        { icon: IC.user, title: 'Experienced chauffeur', text: 'Seasoned on long distances, with an eye for comfort, breaks and a safe journey.' },
      ],
      image: { src: '/images/services/langstreckenfahrten-intro.jpg', alt: 'Black Mercedes S-Class at a viewpoint in Austria' },
    },
    benefit: {
      title: 'Why day trips with us',
      body: 'Door to door, without changing trains or waiting around. A fixed chauffeur, a comfortable car and one fixed price for the whole trip, all known well before you book.',
      items: [
        'Direct door-to-door travel, no changes',
        'Fixed price for the whole trip',
        'Relax, work or enjoy the view along the way',
        'Cross-border across the region',
      ],
      image: { src: '/images/services/langstreckenfahrten-benefit.jpg', alt: 'Relaxed passenger in the rear of a Mercedes-Benz on a long-distance journey' },
      badge: { big: 'EU', sm: 'cross-border' },
    },
    seo: {
      eyebrow: 'Day Trips from Vienna',
      title: 'Your comfortable day trip from Vienna with a private chauffeur',
      paragraphs: [
        'Vienna is a wonderful base, and some of the region\'s best places are only a comfortable drive away. A day in the lakeside village of Hallstatt, a visit to Bratislava, a trip to Budapest or a tour to Salzburg: with a private chauffeur these day trips become the most relaxed way to travel.',
        'You are collected at your hotel and brought straight to each destination, without changing trains, carrying luggage or worrying about directions. Along the way you have time for photos, rest or simply the scenery. Water is on board, a child seat on request, and your driver knows the routes and any border formalities.',
        'Booking is as easy as any ride. You tell us your destination, choose your vehicle, see the fixed price for the whole trip and book directly through our online booking system. Payment is by credit card, Apple Pay or Google Pay.',
        'Unlike providers with a request form only, you know your price at once, without waiting for a quote and with no surcharges for waiting time. Popular trips such as Vienna to Hallstatt, Bratislava or Budapest we drive regularly and know the best stops along the way.',
        'For multi-day tours, private guides or special routes you can reach us by WhatsApp or email. That way you see more of the region and drive less yourself, arriving relaxed at every stop.',
        'You see the fixed price before you book. Booking takes just a couple of minutes. Your driver is ready when you are. Comfort and discretion come as standard. Water is on board, a child seat on request. Reach us any time by WhatsApp or email. You see the fixed price before you book.',
      ],
    },
    faq: [
      { q: 'Which day trips do you offer from Vienna?', a: 'Popular trips include Hallstatt, Bratislava, Budapest, Salzburg and the Wachau valley, plus custom routes across the region.' },
      { q: 'What does a day trip cost?', a: 'You pay a fixed price for the whole trip, seen before booking. No surcharges for waiting time or border crossings.' },
      { q: 'Can we make stops along the way?', a: 'Yes. Tell us your wishes when booking or by WhatsApp, and we plan stops and sightseeing into your route.' },
      { q: 'Can the driver act as a guide?', a: 'Our chauffeurs know the routes and main sights. For an expert guided tour we can arrange a licensed guide on request.' },
      { q: 'Do you also cross borders?', a: 'Yes, we travel across the region, for example to Bratislava or Budapest. Your driver knows the formalities for a smooth trip.' },
      { q: 'How do I book a day trip?', a: 'Through our online booking system with destination and vehicle. For multi-day or custom trips reach us by WhatsApp or email.' },
    ],
  },
];

import type { Lang } from './i18n';
export const getServices = (lang: Lang): Service[] => (lang === 'en' ? SERVICES_DATA_EN : SERVICES_DATA);
