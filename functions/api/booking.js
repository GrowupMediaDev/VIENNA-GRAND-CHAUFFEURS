// Cloudflare Pages Function — booking form → Resend, with Turnstile spam protection.
// Route: POST /api/booking
//
// Sends two branded emails (matching /api/contact styling):
//   1) Admin booking notification (German, internal)
//   2) Customer booking confirmation (DE / EN based on the hidden `lang` field)
//
// Design tokens taken from the project (src/styles/global.css):
//   accent #c46a2d · dark #0d0703 · cream #f4efe9. Body font mapped to a
//   system sans stack for email-client compatibility.
//
// Secrets come from Cloudflare Pages env vars (NEVER hard-coded):
//   RESEND_API_KEY (Secret) · TURNSTILE_SECRET_KEY (Secret)

// ── Brand / routing constants (keep in sync with contact.js) ────────────────
const BRAND = 'Vienna Grand Chauffeurs';
const DOMAIN = 'viennagrandchauffeurs.at';
const WEB = 'https://viennagrandchauffeurs.at';
const FROM = 'Vienna Grand Chauffeurs <noreply@viennagrandchauffeurs.at>'; // must be on the Resend-verified domain
const ADMIN_TO = 'office@viennagrandchauffeurs.at'; // where bookings land — confirm this inbox exists
const PHONE = '+43 660 123 4567'; // PLACEHOLDER — update with the real number
const CONTACT_EMAIL = 'office@viennagrandchauffeurs.at'; // PLACEHOLDER
const LEGAL = 'VT-Limousinen Service GmbH · 1010 Wien, Österreich';

// Colors
const C_DARK = '#0d0703';
const C_ACCENT = '#c46a2d';
const C_CREAM = '#f4efe9';
const C_CARD = '#ffffff';
const C_TEXT = '#0c0a08';
const C_MUTED = '#8a8178';
const C_LINE = '#ece7e0';
const SANS = "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif";

// Trip-type values (German, from the form) → localized labels.
const TRIP_LABELS = {
  'Einzelfahrt': { de: 'Einzelfahrt', en: 'One-way' },
  'Hin- & Rückfahrt': { de: 'Hin- & Rückfahrt', en: 'Return trip' },
  'Stundenbuchung': { de: 'Stundenbuchung', en: 'Hourly booking' },
};

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

// ── Shared email chrome (identical to contact.js) ───────────────────────────
function emailHeader() {
  return `
  <tr><td style="background:${C_DARK};padding:38px 40px 32px;text-align:center;">
    <div style="font-family:${SANS};font-size:22px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${C_CREAM};line-height:1.2;">Vienna Grand Chauffeurs</div>
    <div style="width:46px;height:2px;background:${C_ACCENT};margin:16px auto 0;"></div>
    <div style="font-family:${SANS};font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:rgba(255,255,255,0.5);margin-top:14px;">Wien · Österreich</div>
  </td></tr>`;
}

function emailShell(innerHtml) {
  return `<!doctype html><html><body style="margin:0;padding:0;background:${C_CREAM};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C_CREAM};">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:${C_CARD};border-radius:16px;overflow:hidden;box-shadow:0 20px 60px -30px rgba(0,0,0,0.25);">
        ${emailHeader()}
        <tr><td style="padding:36px 40px 40px;">${innerHtml}</td></tr>
      </table>
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;">
        <tr><td style="padding:20px 40px;text-align:center;font-family:${SANS};font-size:12px;line-height:1.7;color:${C_MUTED};">${BRAND} · ${DOMAIN}</td></tr>
      </table>
    </td></tr>
  </table></body></html>`;
}

function dataRow(label, value) {
  return `<tr>
    <td style="padding:11px 0;border-bottom:1px solid ${C_LINE};font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};white-space:nowrap;vertical-align:top;">${esc(label)}</td>
    <td style="padding:11px 0 11px 22px;border-bottom:1px solid ${C_LINE};font-family:${SANS};font-size:15px;color:${C_TEXT};vertical-align:top;">${esc(value)}</td>
  </tr>`;
}

function messageBox(heading, message) {
  return `
  <div style="font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};margin:26px 0 10px;">${esc(heading)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
    <td style="background:#faf7f2;border-left:3px solid ${C_ACCENT};border-radius:0 10px 10px 0;padding:16px 20px;font-family:${SANS};font-size:15px;line-height:1.75;color:${C_TEXT};white-space:pre-wrap;">${esc(message)}</td>
  </tr></table>`;
}

// Build the ordered detail rows shared by both emails. `L` supplies the labels.
function detailRows(b, L) {
  const isHourly = b.fahrttyp === 'Stundenbuchung';
  return (
    dataRow(L.trip, b.tripLabel) +
    dataRow(L.pickup, b.abholadresse) +
    (isHourly ? dataRow(L.duration, b.dauer || '—') : dataRow(L.dest, b.zieladresse)) +
    dataRow(L.when, `${b.datum}${b.uhrzeit ? ` · ${b.uhrzeit}` : ''}`) +
    dataRow(L.vehicle, b.fahrzeug) +
    dataRow(L.persons, `${b.personen || '—'}`) +
    dataRow(L.luggage, `${b.gepaeck || '—'}`)
  );
}

// ── Admin email (always German — internal) ──────────────────────────────────
function adminBookingEmail(b) {
  const L = { trip: 'Fahrttyp', pickup: 'Abholadresse', dest: 'Zieladresse', duration: 'Dauer', when: 'Datum / Uhrzeit', vehicle: 'Fahrzeug', persons: 'Personen', luggage: 'Gepäck' };
  const contact = dataRow('Name', b.name) + dataRow('E-Mail', b.email) + (b.telefon ? dataRow('Telefon', b.telefon) : '');

  const inner = `
    <h1 style="margin:0 0 8px;font-family:${SANS};font-size:23px;font-weight:700;letter-spacing:-0.01em;color:${C_TEXT};">Neue Buchungsanfrage</h1>
    <p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:#5f5850;">Über das Buchungsformular auf ${DOMAIN} ist eine neue Buchungsanfrage eingegangen.</p>
    <div style="font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};margin:0 0 4px;">Fahrt</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(b, L)}</table>
    <div style="font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};margin:26px 0 4px;">Kontakt</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${contact}</table>
    ${b.anmerkungen ? messageBox('Anmerkungen', b.anmerkungen) : ''}
    <div style="margin:30px 0 4px;">
      <a href="mailto:${esc(b.email)}" style="display:inline-block;background:${C_ACCENT};color:#1a0e04;font-family:${SANS};font-weight:600;font-size:15px;text-decoration:none;padding:13px 32px;border-radius:999px;">Direkt antworten</a>
    </div>`;

  const isHourly = b.fahrttyp === 'Stundenbuchung';
  const text = [
    'Neue Buchungsanfrage',
    `Eingegangen über ${DOMAIN}`,
    '',
    `Fahrttyp: ${b.tripLabel}`,
    `Abholadresse: ${b.abholadresse}`,
    isHourly ? `Dauer: ${b.dauer || '—'}` : `Zieladresse: ${b.zieladresse}`,
    `Datum / Uhrzeit: ${b.datum} ${b.uhrzeit}`,
    `Fahrzeug: ${b.fahrzeug}`,
    `Personen: ${b.personen || '—'} · Gepäck: ${b.gepaeck || '—'}`,
    '',
    `Name: ${b.name}`,
    `E-Mail: ${b.email}`,
    b.telefon ? `Telefon: ${b.telefon}` : null,
    b.anmerkungen ? `\nAnmerkungen:\n${b.anmerkungen}` : null,
    '',
    `— ${LEGAL}`,
  ].filter((l) => l !== null).join('\n');

  return { subject: `Neue Buchungsanfrage · ${b.fahrzeug} · ${b.datum}`, html: emailShell(inner), text };
}

// ── Customer confirmation email (DE / EN) ───────────────────────────────────
function customerBookingEmail(b) {
  const en = b.lang === 'en';
  const t = en
    ? {
        subject: `Your booking request with ${BRAND}`,
        greeting: `Thank you, ${b.name}.`,
        lead: 'We have received your booking request.',
        confirm: 'Our team will confirm your journey and your fixed price — typically within two hours, around the clock, 365 days a year.',
        detailsHead: 'Your journey',
        L: { trip: 'Trip type', pickup: 'Pickup', dest: 'Destination', duration: 'Duration', when: 'Date / time', vehicle: 'Vehicle', persons: 'Passengers', luggage: 'Luggage' },
        notesHead: 'Your notes',
        footerNote: 'This email was sent automatically — you can reply to it directly.',
      }
    : {
        subject: `Ihre Buchungsanfrage bei ${BRAND}`,
        greeting: `Vielen Dank, ${b.name}.`,
        lead: 'Wir haben Ihre Buchungsanfrage erhalten.',
        confirm: 'Unser Team bestätigt Ihre Fahrt und Ihren Fixpreis in der Regel innerhalb von zwei Stunden — rund um die Uhr, 365 Tage im Jahr.',
        detailsHead: 'Ihre Fahrt',
        L: { trip: 'Fahrttyp', pickup: 'Abholadresse', dest: 'Zieladresse', duration: 'Dauer', when: 'Datum / Uhrzeit', vehicle: 'Fahrzeug', persons: 'Personen', luggage: 'Gepäck' },
        notesHead: 'Ihre Anmerkungen',
        footerNote: 'Diese E-Mail wurde automatisch versendet — Sie können direkt darauf antworten.',
      };

  const inner = `
    <h1 style="margin:0 0 6px;font-family:${SANS};font-size:23px;font-weight:700;letter-spacing:-0.01em;color:${C_TEXT};">${esc(t.greeting)}</h1>
    <p style="margin:0 0 4px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C_TEXT};font-weight:600;">${esc(t.lead)}</p>
    <p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:#5f5850;">${esc(t.confirm)}</p>
    <div style="font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};margin:0 0 4px;">${esc(t.detailsHead)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(b, t.L)}</table>
    ${b.anmerkungen ? messageBox(t.notesHead, b.anmerkungen) : ''}
    <div style="height:1px;background:${C_LINE};margin:30px 0;"></div>
    <div style="font-family:${SANS};font-size:14px;line-height:1.9;color:${C_TEXT};">
      <div style="font-weight:700;letter-spacing:0.02em;">${BRAND}</div>
      <div><a href="tel:${PHONE.replace(/\s/g, '')}" style="color:${C_ACCENT};text-decoration:none;">${PHONE}</a></div>
      <div><a href="mailto:${CONTACT_EMAIL}" style="color:${C_ACCENT};text-decoration:none;">${CONTACT_EMAIL}</a></div>
      <div><a href="${WEB}" style="color:${C_ACCENT};text-decoration:none;">${DOMAIN}</a></div>
    </div>
    <p style="margin:24px 0 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C_MUTED};">${LEGAL}<br>${esc(t.footerNote)}</p>`;

  const isHourly = b.fahrttyp === 'Stundenbuchung';
  const text = [
    t.greeting,
    t.lead,
    t.confirm,
    '',
    `${t.L.trip}: ${b.tripLabel}`,
    `${t.L.pickup}: ${b.abholadresse}`,
    isHourly ? `${t.L.duration}: ${b.dauer || '—'}` : `${t.L.dest}: ${b.zieladresse}`,
    `${t.L.when}: ${b.datum} ${b.uhrzeit}`,
    `${t.L.vehicle}: ${b.fahrzeug}`,
    `${t.L.persons}: ${b.personen || '—'} · ${t.L.luggage}: ${b.gepaeck || '—'}`,
    b.anmerkungen ? `\n${t.notesHead}:\n${b.anmerkungen}` : null,
    '',
    BRAND,
    PHONE,
    CONTACT_EMAIL,
    DOMAIN,
    '',
    LEGAL,
    t.footerNote,
  ].filter((l) => l !== null).join('\n');

  return { subject: t.subject, html: emailShell(inner), text };
}

async function sendResend(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Resend ${res.status}: ${body}`);
  }
  return res.json();
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY env var is not set');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500);
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const get = (k) => (form.get(k) || '').toString().trim();

  // Honeypot — a filled _gotcha means a bot; pretend success, send nothing.
  if (get('_gotcha')) return json({ ok: true });

  // Cloudflare Turnstile verification.
  if (!env.TURNSTILE_SECRET_KEY) {
    console.error('TURNSTILE_SECRET_KEY env var is not set');
    return json({ ok: false, error: 'Server misconfiguration.' }, 500);
  }
  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: get('cf-turnstile-response'),
        remoteip: request.headers.get('CF-Connecting-IP') || undefined,
      }),
    });
    const result = await verify.json();
    if (result.success !== true) {
      console.error('Turnstile verification failed', JSON.stringify(result['error-codes'] || []));
      return json({ ok: false, error: 'Spam check failed. Please reload and try again.' }, 403);
    }
  } catch (e) {
    console.error('Turnstile verification error', e.message);
    return json({ ok: false, error: 'Spam check failed. Please try again.' }, 403);
  }

  // Server-side validation.
  const lang = get('lang') === 'en' ? 'en' : 'de';
  const name = get('name');
  const email = get('email');
  const abholadresse = get('abholadresse');
  const datum = get('datum');
  const uhrzeit = get('uhrzeit');
  const fahrttyp = get('fahrttyp') || 'Einzelfahrt';
  const isHourly = fahrttyp === 'Stundenbuchung';
  const zieladresse = get('zieladresse');

  if (!name || !isEmail(email) || !abholadresse || !datum || !uhrzeit || (!isHourly && !zieladresse)) {
    return json({ ok: false, error: 'Please complete the required fields.' }, 400);
  }

  const trip = TRIP_LABELS[fahrttyp];
  const b = {
    lang,
    fahrttyp,
    tripLabel: trip ? trip[lang] : fahrttyp,
    abholadresse,
    zieladresse,
    dauer: get('dauer'),
    datum,
    uhrzeit,
    personen: get('personen'),
    gepaeck: get('gepaeck'),
    fahrzeug: get('fahrzeug') || '—',
    name,
    email,
    telefon: get('telefon'),
    anmerkungen: get('anmerkungen'),
  };

  // 1) Admin email — always German, tripLabel forced to German for the internal copy.
  const admin = adminBookingEmail({ ...b, tripLabel: trip ? trip.de : fahrttyp });
  try {
    await sendResend(env.RESEND_API_KEY, {
      from: FROM,
      to: [ADMIN_TO],
      reply_to: email,
      subject: admin.subject,
      html: admin.html,
      text: admin.text,
    });
  } catch (e) {
    console.error('Admin booking email failed:', e.message);
    return json({ ok: false, error: 'Sending failed. Please call or email us directly.' }, 502);
  }

  // 2) Customer confirmation — best-effort; its failure must NOT fail the request.
  try {
    const cust = customerBookingEmail(b);
    await sendResend(env.RESEND_API_KEY, {
      from: FROM,
      to: [email],
      reply_to: ADMIN_TO,
      subject: cust.subject,
      html: cust.html,
      text: cust.text,
    });
  } catch (e) {
    console.error('Customer booking confirmation failed (non-fatal):', e.message);
  }

  return json({ ok: true });
}
