// Vienna Grand Chauffeurs — central site data.
// Domain, real contact details and the booking widget are still deferred
// (see project brief). Values flagged PLACEHOLDER are safe to swap later
// without touching markup.

export const CONTACT = {
  phone: {
    display: '+43 676 4221825',
    tel: '+436764221825',
  },
  whatsapp: {
    url: 'https://wa.me/436764221825',
  },
  email: {
    display: 'office@viennagrandchauffeurs.at', // PLACEHOLDER
    mailto: 'mailto:office@viennagrandchauffeurs.at',
  },
} as const;

// The eight services from the locked sitemap (slug shared across locales).
export const SERVICES = [
  { slug: 'flughafen-transfer-wien', title: 'Flughafentransfer Wien', titleEn: 'Airport Transfer Vienna' },
  { slug: 'chauffeurservice', title: 'Chauffeurservice', titleEn: 'Chauffeur Service' },
  { slug: 'chauffeur-pro-stunde', title: 'Chauffeur pro Stunde', titleEn: 'Chauffeur by the Hour' },
  { slug: 'limousinen-service-wien', title: 'Limousinenservice Wien', titleEn: 'Limousine Service Vienna' },
  { slug: 'fahrdienst-diplomaten', title: 'Fahrdienst für Diplomaten', titleEn: 'Diplomatic Chauffeur Service' },
  { slug: 'privatchauffeur-wien', title: 'Privatchauffeur Wien', titleEn: 'Private Chauffeur Vienna' },
  { slug: 'shuttle-service-wien', title: 'Shuttle-Service Wien', titleEn: 'Shuttle Service Vienna' },
  { slug: 'langstreckenfahrten', title: 'Langstreckenfahrten', titleEn: 'Long-Distance Journeys' },
] as const;

// The fleet, in menu order.
export const FAHRZEUGE = [
  { slug: 'e-klasse', title: 'Mercedes E-Klasse', titleEn: 'Mercedes E-Class' },
  { slug: 'bmw-5er', title: 'BMW 5er', titleEn: 'BMW 5 Series' },
  { slug: 's-klasse', title: 'Mercedes S-Klasse', titleEn: 'Mercedes S-Class' },
  { slug: 'v-klasse', title: 'Mercedes V-Klasse', titleEn: 'Mercedes V-Class' },
  { slug: 'mercedes-eqe', title: 'Mercedes EQE', titleEn: 'Mercedes EQE' },
  { slug: 'business-sprinter', title: 'Mercedes-Benz Sprinter', titleEn: 'Mercedes-Benz Sprinter' },
] as const;

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

import { type Lang, t, hrefFor, pick } from './i18n';

// Header + mobile menu, localized. "Leistungen/Services" fans out into the
// eight service pages; "Fahrzeuge/Fleet" into the six vehicles.
export function getNav(lang: Lang): NavLink[] {
  const n = t(lang).nav;
  return [
    { label: n.home, href: hrefFor('/', lang) },
    {
      label: n.services,
      href: hrefFor(`/leistungen/${SERVICES[0].slug}`, lang),
      children: SERVICES.map((s) => ({ label: pick(lang, s.title, s.titleEn), href: hrefFor(`/leistungen/${s.slug}`, lang) })),
    },
    {
      label: n.fleet,
      href: hrefFor('/fahrzeuge', lang),
      children: FAHRZEUGE.map((v) => ({ label: pick(lang, v.title, v.titleEn), href: hrefFor(`/fahrzeuge/${v.slug}`, lang) })),
    },
    { label: n.prices, href: hrefFor('/preise', lang) },
    { label: n.contact, href: hrefFor('/kontakt', lang) },
  ];
}
