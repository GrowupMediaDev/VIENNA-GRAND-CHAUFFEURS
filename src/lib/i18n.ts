// Vienna Grand Chauffeurs — bilingual (DE default at root, EN under /en/).
// Locale is derived from the URL; shared chrome text lives in UI below.

export type Lang = 'de' | 'en';

export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'de';
}

// Turn a DE-rooted path ('/', '/preise', '/#fahrzeuge') into the localized href.
export function hrefFor(path: string, lang: Lang): string {
  if (lang === 'de') return path;
  if (path === '/') return '/en/';
  return '/en' + path;
}

// The equivalent page in the other language — used by the header toggle.
export function altLang(url: URL): { lang: Lang; label: string; href: string } {
  const cur = getLang(url);
  if (cur === 'en') {
    const de = url.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    return { lang: 'de', label: 'DE', href: de };
  }
  return { lang: 'en', label: 'EN', href: hrefFor(url.pathname || '/', 'en') };
}

export function pick<T>(lang: Lang, de: T, en: T): T {
  return lang === 'en' ? en : de;
}

export const htmlLang: Record<Lang, string> = { de: 'de', en: 'en' };

// ── Shared chrome dictionary ────────────────────────────────────────────────
const UI = {
  de: {
    nav: { home: 'Home', services: 'Leistungen', fleet: 'Fahrzeuge', prices: 'Preise', contact: 'Kontakt', contactCta: 'Kontakt', menuOpen: 'Menü öffnen', menuClose: 'Menü schließen', langAria: 'Sprache wechseln', home_aria: 'Vienna Grand Chauffeurs — Startseite' },
    cta: { heading: 'Jetzt anfragen und entspannt ankommen, in Wien und ganz Österreich.', button: 'Jetzt anfragen', aria: 'Jetzt anfragen' },
    faq: { eyebrow: 'faq', cta: 'Jetzt anfragen', aria: 'Häufige Fragen' },
    footer: {
      tagline: 'Diskret unterwegs.<br />Souverän angekommen.',
      location: 'Standort', locationValue: '1010 Wien, Österreich',
      explore: 'Entdecken', company: 'Unternehmen', contact: 'Kontakt',
      services: 'Leistungen', fleet: 'Fahrzeuge', prices: 'Preise', airport: 'Flughafentransfer',
      aboutUs: 'Über uns', contactLink: 'Kontakt', imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB',
      rights: 'Alle Rechte vorbehalten.',
      landline: 'Festnetz', mobile: 'Mobil & WhatsApp',
    },
  },
  en: {
    nav: { home: 'Home', services: 'Services', fleet: 'Fleet', prices: 'Rates', contact: 'Contact', contactCta: 'Contact us', menuOpen: 'Open menu', menuClose: 'Close menu', langAria: 'Switch language', home_aria: 'Vienna Grand Chauffeurs — Home' },
    cta: { heading: 'Request your ride and arrive relaxed — in Vienna and across Austria.', button: 'Request now', aria: 'Request now' },
    faq: { eyebrow: 'faq', cta: 'Request now', aria: 'Frequently asked questions' },
    footer: {
      tagline: 'Travelling discreetly.<br />Arriving in style.',
      location: 'Location', locationValue: '1010 Vienna, Austria',
      explore: 'Explore', company: 'Company', contact: 'Contact',
      services: 'Services', fleet: 'Fleet', prices: 'Rates', airport: 'Airport transfer',
      aboutUs: 'About us', contactLink: 'Contact', imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms',
      rights: 'All rights reserved.',
      landline: 'Landline', mobile: 'Mobile & WhatsApp',
    },
  },
} as const;

export const t = (lang: Lang) => UI[lang];
