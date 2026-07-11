// Cloudflare Pages Function — contact form → Resend, with Turnstile spam protection.
// Route: POST /api/contact
//
// Design tokens taken from the project (src/styles/global.css):
//   accent  #c46a2d  (--color-terracotta, line 19)
//   dark    #0d0703  (brand deep black used in Nav/Footer/Hero)
//   cream   #f4efe9  (--color-cream, line 27)
//   body font: Inter → mapped to a system sans stack for email compatibility.
//
// Secrets come from Cloudflare Pages env vars (NEVER hard-coded):
//   RESEND_API_KEY        (Secret)
//   TURNSTILE_SECRET_KEY  (Secret)
// The public Turnstile site key lives in the frontend via PUBLIC_TURNSTILE_SITE_KEY.

// ── Brand / routing constants (safe to edit) ────────────────────────────────
const BRAND = 'Vienna Grand Chauffeurs';
const DOMAIN = 'viennagrandchauffeurs.at';
const WEB = 'https://viennagrandchauffeurs.at';
const FROM = 'Vienna Grand Chauffeurs <noreply@viennagrandchauffeurs.at>'; // must be on the Resend-verified domain
const ADMIN_TO = 'office@viennagrandchauffeurs.at'; // where inquiries land — confirm this inbox exists
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

// Localized display labels for the "Leistung" select values.
const SERVICE_LABELS = {
  'Allgemeine Anfrage': { de: 'Allgemeine Anfrage', en: 'General enquiry' },
  'Flughafentransfer': { de: 'Flughafentransfer Wien', en: 'Airport Transfer Vienna' },
  'Chauffeurservice': { de: 'Chauffeurservice', en: 'Chauffeur Service' },
  'Chauffeur pro Stunde': { de: 'Chauffeur pro Stunde', en: 'Chauffeur by the Hour' },
  'Limousinenservice': { de: 'Limousinenservice Wien', en: 'Limousine Service Vienna' },
  'Fahrdienst Diplomaten': { de: 'Fahrdienst für Diplomaten', en: 'Diplomatic Chauffeur Service' },
  'Privatchauffeur': { de: 'Privatchauffeur Wien', en: 'Private Chauffeur Vienna' },
  'Shuttle-Service': { de: 'Shuttle-Service Wien', en: 'Shuttle Service Vienna' },
  'Langstreckenfahrten': { de: 'Langstreckenfahrten', en: 'Long-Distance Journeys' },
};

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json' } });

// ── Shared email header (identical in both emails) ──────────────────────────
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

// ── Admin email (always German — internal) ──────────────────────────────────
function adminEmail({ name, email, telefon, leistungLabel, nachricht }) {
  const rows =
    dataRow('Name', name) +
    dataRow('E-Mail', email) +
    (telefon ? dataRow('Telefon', telefon) : '') +
    (leistungLabel ? dataRow('Leistung', leistungLabel) : '');

  const inner = `
    <h1 style="margin:0 0 8px;font-family:${SANS};font-size:23px;font-weight:700;letter-spacing:-0.01em;color:${C_TEXT};">Neue Anfrage eingegangen</h1>
    <p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:#5f5850;">Über das Kontaktformular auf ${DOMAIN} ist eine neue Anfrage eingegangen.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    ${messageBox('Nachricht', nachricht)}
    <div style="margin:30px 0 4px;">
      <a href="mailto:${esc(email)}" style="display:inline-block;background:${C_ACCENT};color:#1a0e04;font-family:${SANS};font-weight:600;font-size:15px;text-decoration:none;padding:13px 32px;border-radius:999px;">Direkt antworten</a>
    </div>`;

  const text = [
    'Neue Anfrage eingegangen',
    `Eingegangen über ${DOMAIN}`,
    '',
    `Name: ${name}`,
    `E-Mail: ${email}`,
    telefon ? `Telefon: ${telefon}` : null,
    leistungLabel ? `Leistung: ${leistungLabel}` : null,
    '',
    'Nachricht:',
    nachricht,
    '',
    `— ${LEGAL}`,
  ].filter((l) => l !== null).join('\n');

  return {
    subject: `Neue Anfrage über ${DOMAIN}`,
    html: emailShell(inner),
    text,
  };
}

// ── Customer confirmation email (DE / EN) ───────────────────────────────────
function customerEmail({ lang, name, email, telefon, leistungLabel, nachricht }) {
  const en = lang === 'en';
  const t = en
    ? {
        subject: `Your enquiry with ${BRAND}`,
        greeting: `Thank you, ${name}.`,
        lead: 'We have received your enquiry.',
        confirm:
          'Our team will get back to you — typically within two hours, around the clock, 365 days a year.',
        detailsHead: 'Your details',
        lService: 'Service',
        lPhone: 'Phone',
        msgHead: 'Your message',
        sigCall: 'Call us',
        footerNote: 'This email was sent automatically — you can reply to it directly.',
      }
    : {
        subject: `Ihre Anfrage bei ${BRAND}`,
        greeting: `Vielen Dank, ${name}.`,
        lead: 'Wir haben Ihre Anfrage erhalten.',
        confirm:
          'Unser Team meldet sich in der Regel innerhalb von zwei Stunden bei Ihnen — rund um die Uhr, 365 Tage im Jahr.',
        detailsHead: 'Ihre Angaben',
        lService: 'Leistung',
        lPhone: 'Telefon',
        msgHead: 'Ihre Nachricht',
        sigCall: 'Anrufen',
        footerNote: 'Diese E-Mail wurde automatisch versendet — Sie können direkt darauf antworten.',
      };

  const summaryRows = (leistungLabel ? dataRow(t.lService, leistungLabel) : '') + (telefon ? dataRow(t.lPhone, telefon) : '');

  const inner = `
    <h1 style="margin:0 0 6px;font-family:${SANS};font-size:23px;font-weight:700;letter-spacing:-0.01em;color:${C_TEXT};">${esc(t.greeting)}</h1>
    <p style="margin:0 0 4px;font-family:${SANS};font-size:16px;line-height:1.6;color:${C_TEXT};font-weight:600;">${esc(t.lead)}</p>
    <p style="margin:0 0 26px;font-family:${SANS};font-size:15px;line-height:1.7;color:#5f5850;">${esc(t.confirm)}</p>
    ${summaryRows ? `<div style="font-family:${SANS};font-size:11.5px;letter-spacing:0.08em;text-transform:uppercase;color:${C_MUTED};margin:0 0 4px;">${esc(t.detailsHead)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${summaryRows}</table>` : ''}
    ${messageBox(t.msgHead, nachricht)}
    <div style="height:1px;background:${C_LINE};margin:30px 0;"></div>
    <div style="font-family:${SANS};font-size:14px;line-height:1.9;color:${C_TEXT};">
      <div style="font-weight:700;letter-spacing:0.02em;">${BRAND}</div>
      <div><a href="tel:${PHONE.replace(/\s/g, '')}" style="color:${C_ACCENT};text-decoration:none;">${PHONE}</a></div>
      <div><a href="mailto:${CONTACT_EMAIL}" style="color:${C_ACCENT};text-decoration:none;">${CONTACT_EMAIL}</a></div>
      <div><a href="${WEB}" style="color:${C_ACCENT};text-decoration:none;">${DOMAIN}</a></div>
    </div>
    <p style="margin:24px 0 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C_MUTED};">${LEGAL}<br>${esc(t.footerNote)}</p>`;

  const text = [
    t.greeting,
    t.lead,
    t.confirm,
    '',
    leistungLabel ? `${t.lService}: ${leistungLabel}` : null,
    telefon ? `${t.lPhone}: ${telefon}` : null,
    '',
    `${t.msgHead}:`,
    nachricht,
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

  // Parse the submission (FormData from the fetch()).
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
  const token = get('cf-turnstile-response');
  try {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET_KEY,
        response: token,
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
  const name = get('name');
  const email = get('email');
  const nachricht = get('nachricht');
  if (!name || !isEmail(email) || !nachricht) {
    return json({ ok: false, error: 'Please fill in your name, a valid email and a message.' }, 400);
  }

  const telefon = get('telefon');
  const lang = get('lang') === 'en' ? 'en' : 'de';
  const leistungRaw = get('leistung');
  const labels = SERVICE_LABELS[leistungRaw];
  const leistungLabelAdmin = labels ? labels.de : leistungRaw;
  const leistungLabelCustomer = labels ? labels[lang] : leistungRaw;

  const fields = { name, email, telefon, nachricht };

  // 1) Admin email — must succeed for the request to be considered OK.
  const admin = adminEmail({ ...fields, leistungLabel: leistungLabelAdmin });
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
    console.error('Admin email failed:', e.message);
    return json({ ok: false, error: 'Sending failed. Please call or email us directly.' }, 502);
  }

  // 2) Customer confirmation — best-effort; its failure must NOT fail the request.
  try {
    const cust = customerEmail({ lang, ...fields, leistungLabel: leistungLabelCustomer });
    await sendResend(env.RESEND_API_KEY, {
      from: FROM,
      to: [email],
      reply_to: ADMIN_TO,
      subject: cust.subject,
      html: cust.html,
      text: cust.text,
    });
  } catch (e) {
    console.error('Customer confirmation email failed (non-fatal):', e.message);
  }

  return json({ ok: true });
}
