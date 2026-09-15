/*!
 * Vienna Grand Chauffeurs — Cookie Consent Banner Engine
 * ------------------------------------------------------------------
 * Self-contained, config-driven consent banner. Holds NO hard-coded
 * client values: every text, colour, legal link, storage key and TTL
 * comes from `window.__vgcConsentConfig`, which the site layout sets
 * before this file is loaded.
 *
 * Division of labour with the site layout (Layout.astro):
 *   - The Consent Mode v2 DEFAULT (all denied, wait_for_update) is set
 *     inline in the <head>, BEFORE the Google Tag Manager container and
 *     the direct gtag.js load. That ordering is what makes Consent Mode
 *     effective, so it cannot live in this deferred file.
 *   - The GTM container (GTM-PQGDF9SF) and the direct GA4 tag stay exactly
 *     where they are in the layout. This engine NEVER loads, removes or
 *     rewrites a Google tag. It only flips the consent SIGNAL those already
 *     present tags read on their next ping, and renders the decision UI.
 *
 * Consent Mode v2 (Advanced): the tags always load, right after the denied
 * default. A visitor who rejects still produces an anonymous, cookieless,
 * modelled signal (no _ga / _gcl_au identifiers); only after "accept" does
 * gtag('consent','update', ... granted) let them use cookies and identifiers.
 * That is the point of Consent Mode: reject means anonymised measurement, not
 * a hard 0-request block.
 *
 * Per-language consent: the decision is stored SEPARATELY per site language
 * (URL path prefix — root = German, /en/ = English), so a visitor who decided
 * on the German pages is asked once more when they first open an English page,
 * and each language re-applies its own stored choice silently on return.
 *
 * Public API: window.VgcCookieConsent.openSettings() reopens the panel from a
 * footer link at any time, so a decision can be changed or withdrawn.
 */
(function () {
  'use strict';

  var config = window.__vgcConsentConfig;
  if (!config || typeof config !== 'object') {
    if (window.console && window.console.error) {
      console.error('[VgcCookieConsent] window.__vgcConsentConfig fehlt — Banner wird nicht gerendert.');
    }
    return;
  }

  // gtag shim — shares the same dataLayer the layout already created for GTM.
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  // Only three real categories: no empty "comfort" bucket is shown, because
  // no comfort-tier service is actually in use on this site.
  var CATEGORY_ORDER = ['necessary', 'statistics', 'marketing'];

  var DEFAULT_LANG = (config.language && config.language.default) || 'de';
  var AVAILABLE_LANGS = (config.language && config.language.available) || [DEFAULT_LANG];
  var SITE_LOCALES = (config.language && config.language.siteLocales) || AVAILABLE_LANGS;

  function detectPageLocale() {
    var path = window.location.pathname;
    for (var i = 0; i < SITE_LOCALES.length; i++) {
      var l = SITE_LOCALES[i];
      if (l === DEFAULT_LANG) continue;
      if (path === '/' + l || path.indexOf('/' + l + '/') === 0) return l;
    }
    return DEFAULT_LANG;
  }

  var pageLocale = detectPageLocale();

  var state = {
    lang: pageLocale,
    view: 'main', // 'main' | 'settings'
    choice: { necessary: true, statistics: false, marketing: false }
  };

  var hostEl = null;
  var shadowRoot = null;

  // ------------------------------------------------------------------
  // Storage helpers — always wrapped: private mode / blocked storage throws.
  // ------------------------------------------------------------------
  function safeGetItem(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }
  function safeSetItem(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch (e) {
      return false;
    }
  }

  function consentKeyForLocale(locale) {
    return config.consentStorageKey + '__' + locale;
  }

  function readStoredConsent(locale) {
    var raw = safeGetItem(consentKeyForLocale(locale));
    if (!raw) return null;
    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      return null;
    }
    if (!parsed || !parsed.timestamp || !parsed.choice) return null;
    var ttlDays = config.consentTtlDays || 180;
    if (Date.now() - parsed.timestamp > ttlDays * 24 * 60 * 60 * 1000) return null;
    return parsed;
  }

  function storeConsent(choice, locale) {
    var record = {
      timestamp: Date.now(),
      choice: {
        necessary: true,
        statistics: !!choice.statistics,
        marketing: !!choice.marketing
      },
      bannerVersion: config.bannerVersion || '1.0.0'
    };
    safeSetItem(consentKeyForLocale(locale), JSON.stringify(record));
  }

  // ------------------------------------------------------------------
  // Consent Mode v2 update — the ONLY thing that touches Google here.
  // ------------------------------------------------------------------
  function applyConsent(choice) {
    gtag('consent', 'update', {
      ad_storage: choice.marketing ? 'granted' : 'denied',
      analytics_storage: choice.statistics ? 'granted' : 'denied',
      ad_user_data: choice.marketing ? 'granted' : 'denied',
      ad_personalization: choice.marketing ? 'granted' : 'denied'
    });
  }

  // ------------------------------------------------------------------
  // Text helpers
  // ------------------------------------------------------------------
  function t() {
    var lang = state.lang;
    if (!config.text || !config.text[lang]) lang = DEFAULT_LANG;
    return (config.text && config.text[lang]) || {};
  }

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // ------------------------------------------------------------------
  // Rendering — Shadow DOM isolates the banner from the site's Tailwind
  // reset and vice versa. Self-hosted brand fonts are document-global, so
  // Bricolage Grotesque / Inter resolve inside the shadow tree too.
  // ------------------------------------------------------------------
  function ensureHost() {
    if (hostEl) return;
    hostEl = document.createElement('div');
    hostEl.id = 'vgc-cookie-consent';
    shadowRoot = hostEl.attachShadow({ mode: 'open' });
    document.body.appendChild(hostEl);
  }

  function styleBlock() {
    var c = config.colors || {};
    // Warm burnt-orange system — the ORANGE is the surface, not an accent.
    var barTop = c.barTop || '#c0692c';        // brighter terracotta (bar top)
    var barBottom = c.barBottom || '#a4521f';  // deeper terracotta (bar bottom)
    var panelTop = c.panelTop || '#9a4c1c';    // settings panel continues, deeper
    var panelBottom = c.panelBottom || '#7d3d15';
    var cream = c.cream || '#f7f2ec';           // primary text / logo ground
    var creamMuted = c.creamMuted || 'rgba(247,242,236,0.82)';
    var espresso = c.espresso || '#1a120b';     // dark accent: primary button, "on" toggle
    var hairline = c.hairline || 'rgba(247,242,236,0.20)';
    var inkOnCream = c.inkOnCream || '#3a1e0c';

    // Design direction: a full-width bottom BAR, warm burnt-orange as the
    // dominant fill (deliberately NOT the dark espresso card of v1, nor a
    // dark+gold sister look). Squared edges (no radius) read as a classic,
    // confident cookie bar. Content runs horizontally: brand + text left,
    // solid action buttons right. Settings expand UPWARD as a deeper-orange
    // panel that stays part of the same warm surface, with the bar as anchor.
    return (
      '<style>' +
      ':host{all:initial;}' +
      '*,*::before,*::after{box-sizing:border-box;}' +
      '.vc-root{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;display:flex;flex-direction:column;' +
      'max-height:100dvh;' +
      "font-family:'Inter Variable','Inter',system-ui,-apple-system,sans-serif;" +
      'animation:vc-in .5s cubic-bezier(0.16,1,0.3,1);' +
      // Dismiss transition (slide-down + fade): the entrance is a keyframe
      // @animation that plays once on insertion and is finished long before a
      // visitor clicks a button, so adding a `transition` here for the SAME
      // transform/opacity properties does not fight it. hide() below toggles
      // .vc-leaving after a decision to slide the bar back down and fade it,
      // THEN sets display:none once that finishes (see hide()).
      'transition:transform .32s cubic-bezier(0.4,0,1,1),opacity .28s ease-in;}' +
      '@keyframes vc-in{from{transform:translateY(102%);}to{transform:translateY(0);}}' +
      '.vc-root.vc-leaving{transform:translateY(102%);opacity:0;pointer-events:none;}' +
      '@media (prefers-reduced-motion: reduce){.vc-root{animation:none;transition:none;}}' +

      // ---- The bar (main + action row) ----------------------------------
      '.vc-bar{position:relative;display:flex;align-items:center;gap:20px 28px;flex-wrap:wrap;' +
      'padding:16px clamp(18px,4vw,44px);' +
      'background:linear-gradient(178deg,' + barTop + ' 0%,' + barBottom + ' 100%);' +
      'color:' + cream + ';box-shadow:0 -14px 40px -14px rgba(20,8,2,.55);' +
      // Settings view: .vc-bar is a flex sibling of .vc-panel inside .vc-root
      // (both column children of a max-height-capped flex container). Without
      // flex-shrink:0 here, the default flex-shrink:1 lets THIS box (holding
      // Zurueck/Auswahl-speichern) get squeezed too when content overflows --
      // exactly the "must scroll to reach Save" bug. Pinning it to its natural
      // size means .vc-cats (see below, the only child with min-height:0) is
      // the sole element that ever shrinks/scrolls. No effect in the main view
      // (there .vc-bar is .vc-root's only child, nothing competes for space).
      'flex-shrink:0;}' +
      // Fine top edge to lift the bar off page content.
      '.vc-bar::before{content:"";position:absolute;inset:0 0 auto 0;height:1px;' +
      'background:linear-gradient(90deg,rgba(255,255,255,.34),rgba(255,255,255,.08));}' +

      // Lead: logo + copy, takes the free space.
      '.vc-lead{display:flex;align-items:center;gap:18px;flex:1 1 440px;min-width:min(100%,440px);}' +
      // Logo — explicit intrinsic size (matches the footer recipe) + object-fit
      // so the preserveAspectRatio="none" wordmark SVG can never clip again.
      // width is a fixed calc() from the wordmark's own viewBox ratio (156.923:60),
      // NOT "auto" -- the SVG has no absolute intrinsic size (root width/height are
      // "100%"), so browsers fall back to reporting a 300x150 (2:1) natural size for
      // it regardless of the real ~2.615:1 viewBox ratio. object-fit:contain then
      // sizes the content against that WRONG ratio and the "V" of "Vienna" gets
      // clipped off the left edge (confirmed live, and in the footer's identical
      // <img>, which has the same bug). preserveAspectRatio="none" on the SVG root
      // means its content always stretches to exactly fill whatever box it is
      // given -- so handing it a box in the CORRECT ratio via explicit width+height
      // is sufficient on its own; object-fit no longer needs to guess anything.
      '.vc-mark{height:38px;width:calc(38px * 157 / 60);flex:0 0 auto;display:block;' +
      'filter:drop-shadow(0 1px 2px rgba(20,8,2,.3));}' +
      '.vc-lead-text{display:flex;flex-direction:column;gap:7px;min-width:0;}' +
      '.vc-intro{margin:0;font-size:13px;line-height:1.55;color:' + cream + ';max-width:70ch;}' +
      '.vc-intro a{color:' + cream + ';text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}' +
      '.vc-intro a:hover{color:#fffdfa;}' +
      // Meta row (legal links + language switch) under the copy.
      '.vc-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px 18px;margin-top:1px;}' +
      '.vc-foot-links{display:flex;flex-wrap:wrap;gap:16px;}' +
      '.vc-foot-links a{font-size:11px;letter-spacing:.02em;color:' + creamMuted + ';text-decoration:none;}' +
      '.vc-foot-links a:hover{color:' + cream + ';text-decoration:underline;text-underline-offset:2px;}' +
      '.vc-langs{display:flex;gap:2px;}' +
      '.vc-lang{font-size:11px;font-weight:700;letter-spacing:.04em;padding:3px 8px;border:1px solid transparent;' +
      'background:transparent;color:' + creamMuted + ';cursor:pointer;font-family:inherit;transition:color .15s,border-color .15s,background-color .15s;}' +
      '.vc-lang:hover{color:' + cream + ';}' +
      '.vc-lang.is-active{color:' + espresso + ';background:' + cream + ';border-color:' + cream + ';}' +

      // Actions: solid buttons, horizontal, in the bar.
      '.vc-actions{display:flex;align-items:center;flex-wrap:wrap;gap:10px;flex:0 0 auto;margin-left:auto;}' +
      '.vc-btn{padding:12px 22px;font-size:13px;font-weight:700;letter-spacing:.01em;' +
      "font-family:inherit;cursor:pointer;border:1.5px solid transparent;border-radius:0;" +
      'transition:background-color .16s cubic-bezier(0.16,1,0.3,1),color .16s,border-color .16s,transform .09s ease-out;}' +
      '.vc-btn:active{transform:translateY(1px);}' +
      '.vc-btn:focus-visible{outline:2px solid ' + espresso + ';outline-offset:2px;}' +
      // Reject + Accept are BOTH solid, equal size = equal prominence (DSGVO).
      '.vc-btn-accept{background:' + espresso + ';color:' + cream + ';border-color:' + espresso + ';}' +
      '.vc-btn-accept:hover{background:#25190f;}' +
      '.vc-btn-reject{background:' + cream + ';color:' + inkOnCream + ';border-color:' + cream + ';}' +
      '.vc-btn-reject:hover{background:#fffdfa;}' +
      // Settings = outlined ghost on the orange, clearly a tertiary action.
      '.vc-btn-ghost{background:transparent;color:' + cream + ';border-color:' + hairline + ';}' +
      '.vc-btn-ghost:hover{border-color:' + cream + ';background:rgba(247,242,236,.08);}' +

      // ---- Settings panel (expands above the bar) -----------------------
      '.vc-panel{background:linear-gradient(178deg,' + panelTop + ' 0%,' + panelBottom + ' 100%);' +
      'color:' + cream + ';display:flex;flex-direction:column;min-height:0;' +
      'animation:vc-panel-in .38s cubic-bezier(0.16,1,0.3,1);}' +
      '@keyframes vc-panel-in{from{opacity:0;}to{opacity:1;}}' +
      '@media (prefers-reduced-motion: reduce){.vc-panel{animation:none;}}' +
      '.vc-panel-head{display:flex;align-items:center;gap:16px;padding:20px clamp(18px,4vw,44px) 6px;}' +
      // Same fixed-ratio fix as .vc-mark above (same asset, same bug).
      '.vc-mark-sm{height:28px;width:calc(28px * 157 / 60);flex:0 0 auto;display:block;}' +
      '.vc-title{margin:0;font-family:\'Bricolage Grotesque Variable\',\'Bricolage Grotesque\',Georgia,serif;' +
      'font-weight:600;font-size:20px;letter-spacing:-.01em;line-height:1.1;color:' + cream + ';}' +
      // min-height:0 is the actual fix (Auftrag Cagri 15.09.2026): .vc-cats is a
      // flex child of .vc-panel (display:flex;flex-direction:column;min-height:0
      // above). Without min-height:0 HERE too, a flex item's default min-height
      // is "auto" -> it refuses to shrink below its own content's natural height,
      // which blocked .vc-panel's shrink from ever reaching this element and
      // pushed .vc-bar's Zurueck/Auswahl-speichern buttons out of view instead.
      // max-height stays as an upper bound for large screens; min-height:0 is
      // what lets it shrink FURTHER (and scroll, via the existing overflow-y)
      // when the panel is squeezed on short mobile viewports.
      '.vc-cats{padding:6px clamp(18px,4vw,44px) 10px;max-height:min(52vh,420px);min-height:0;overflow-y:auto;overscroll-behavior:contain;}' +
      '.vc-cat{padding:16px 0;border-top:1px solid ' + hairline + ';}' +
      '.vc-cat:first-child{border-top:none;}' +
      '.vc-cat-row{display:flex;align-items:center;justify-content:space-between;gap:16px;}' +
      '.vc-cat-name{font-size:14.5px;font-weight:700;letter-spacing:.005em;color:' + cream + ';}' +
      '.vc-cat-desc{margin:8px 0 0 0;font-size:12.3px;line-height:1.6;color:' + creamMuted + ';max-width:82ch;}' +
      // Toggle: "on" = espresso (dark) on the orange = unambiguous.
      '.vc-tog{position:relative;display:inline-block;width:44px;height:24px;flex:0 0 auto;cursor:pointer;}' +
      '.vc-tog input{position:absolute;opacity:0;inset:0;width:100%;height:100%;margin:0;cursor:pointer;}' +
      '.vc-tog-track{position:absolute;inset:0;background:rgba(247,242,236,0.26);border-radius:999px;' +
      'transition:background-color .18s cubic-bezier(0.16,1,0.3,1);}' +
      '.vc-tog-thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;' +
      'background:' + cream + ';box-shadow:0 1px 3px rgba(20,8,2,.5);transition:transform .2s cubic-bezier(0.16,1,0.3,1);}' +
      '.vc-tog input:checked ~ .vc-tog-track{background:' + espresso + ';}' +
      '.vc-tog input:checked ~ .vc-tog-track .vc-tog-thumb{transform:translateX(20px);}' +
      '.vc-tog input:focus-visible ~ .vc-tog-track{outline:2px solid ' + cream + ';outline-offset:3px;}' +
      '.vc-tog.is-locked{opacity:.55;cursor:not-allowed;}' +
      '.vc-tog.is-locked input{cursor:not-allowed;}' +
      // A short note that sits left of the Back/Save actions in settings.
      '.vc-bar-note{margin:0;font-size:11.5px;line-height:1.5;color:' + creamMuted + ';flex:1 1 300px;min-width:0;}' +

      // ---- Responsive: stays a full-width bottom bar, stacks vertically --
      '@media (max-width:720px){' +
      '.vc-bar{gap:14px;padding:16px 18px 18px;}' +
      '.vc-lead{flex:1 1 100%;min-width:100%;align-items:flex-start;}' +
      '.vc-actions{width:100%;margin-left:0;}' +
      '.vc-btn{flex:1 1 auto;text-align:center;}' +
      '.vc-btn-ghost{flex:1 1 100%;}' +
      '.vc-bar-note{flex:1 1 100%;}' +
      '}' +
      // ---- Small phones: the bar was tall enough to cover most of the
      // hero (logo row + 2-line intro + meta row + 3 full-width stacked
      // buttons). Trims every dimension and puts Accept/Reject side by side
      // so the whole bar stays a compact strip, the hero stays visible above
      // it, and every control is still comfortably tappable. A max-height +
      // internal scroll is a hard safety net in case content still overflows
      // (e.g. a very long translated intro) -- it never becomes full-screen.
      '@media (max-width:480px){' +
      '.vc-root{max-height:72dvh;}' +
      '.vc-bar{gap:8px;padding:10px 14px 12px;max-height:72dvh;overflow-y:auto;overscroll-behavior:contain;}' +
      '.vc-mark{height:26px;width:calc(26px * 157 / 60);}' +
      '.vc-intro{font-size:12px;line-height:1.42;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}' +
      '.vc-meta{gap:4px 12px;margin-top:0;}' +
      '.vc-foot-links{gap:12px;}' +
      '.vc-foot-links a{font-size:10.5px;}' +
      '.vc-lang{font-size:10.5px;padding:2px 6px;}' +
      '.vc-actions{gap:8px;}' +
      '.vc-btn{padding:10px 12px;font-size:12.5px;flex:1 1 calc(50% - 4px);}' +
      '.vc-btn-ghost{flex:1 1 100%;padding:8px 12px;}' +
      '}' +
      '</style>'
    );
  }

  function introMarkup(texts) {
    // Optional multi-section RCB text (heading + body); falls back to one intro.
    if (texts.sections && texts.sections.length) {
      return texts.sections
        .map(function (s) {
          return (
            '<p class="vc-intro" style="margin-top:10px">' +
            (s.heading ? '<strong style="color:inherit;font-weight:600">' + escapeHtml(s.heading) + '.</strong> ' : '') +
            escapeHtml(s.body) +
            '</p>'
          );
        })
        .join('');
    }
    return '<p class="vc-intro">' + escapeHtml(texts.intro) + '</p>';
  }

  function categoryMarkup(key, texts) {
    var cat = (texts.categories && texts.categories[key]) || {};
    var locked = key === 'necessary';
    var checked = locked ? true : !!state.choice[key];
    return (
      '<div class="vc-cat">' +
      '<div class="vc-cat-row">' +
      '<span class="vc-cat-name">' + escapeHtml(cat.label) + '</span>' +
      '<label class="vc-tog' + (locked ? ' is-locked' : '') + '">' +
      '<input type="checkbox" data-cat="' + key + '"' + (checked ? ' checked' : '') + (locked ? ' disabled' : '') + '/>' +
      '<span class="vc-tog-track"><span class="vc-tog-thumb"></span></span>' +
      '</label>' +
      '</div>' +
      '<p class="vc-cat-desc">' + escapeHtml(cat.description) + '</p>' +
      '</div>'
    );
  }

  // Legal links + per-language switch, shown as one compact meta row.
  // Links follow state.lang (the language the banner is currently DISPLAYING),
  // not the host page's language -- switching the banner to EN must point the
  // links at the EN legal pages even on a German page, and vice versa.
  function metaMarkup(texts) {
    var footer = texts.footer || {};
    var legalByLang = config.legalLinks || {};
    var legal = legalByLang[state.lang] || legalByLang[DEFAULT_LANG] || {};
    var links = '';
    if (legal.privacy) {
      links += '<a href="' + escapeHtml(legal.privacy) + '">' + escapeHtml(footer.privacy) + '</a>';
    }
    if (legal.imprint) {
      links += '<a href="' + escapeHtml(legal.imprint) + '">' + escapeHtml(footer.imprint) + '</a>';
    }
    var langs = '';
    for (var i = 0; i < AVAILABLE_LANGS.length; i++) {
      var lng = AVAILABLE_LANGS[i];
      langs +=
        '<button type="button" class="vc-lang' + (lng === state.lang ? ' is-active' : '') +
        '" data-lang="' + escapeHtml(lng) + '">' + escapeHtml(lng.toUpperCase()) + '</button>';
    }
    return (
      '<div class="vc-meta">' +
      '<div class="vc-foot-links">' + links + '</div>' +
      '<div class="vc-langs">' + langs + '</div>' +
      '</div>'
    );
  }

  function markImg(cls, texts) {
    if (!config.markUrl) return '';
    // Explicit intrinsic width/height (157x60 wordmark) locks the aspect ratio
    // so the preserveAspectRatio="none" SVG renders whole — the footer proves it.
    return (
      '<img class="' + cls + '" src="' + escapeHtml(config.markUrl) + '" width="157" height="60" ' +
      'alt="' + escapeHtml(config.companyName || '') + '"/>'
    );
  }

  function render() {
    if (!shadowRoot) return;
    var texts = t();
    var b = texts.buttons || {};
    var label = escapeHtml(texts.title || config.companyName || 'Cookie');
    var inner;

    if (state.view === 'settings') {
      // A deeper-orange panel expands above the bar; the bar keeps Back/Save.
      inner =
        '<div class="vc-panel">' +
        '<div class="vc-panel-head">' + markImg('vc-mark-sm', texts) +
        '<h2 class="vc-title">' + escapeHtml(texts.title || config.companyName || '') + '</h2></div>' +
        '<div class="vc-cats">' +
        CATEGORY_ORDER.map(function (k) { return categoryMarkup(k, texts); }).join('') +
        '</div>' +
        '<div class="vc-panel-head" style="padding-top:2px;padding-bottom:16px">' + metaMarkup(texts) + '</div>' +
        '</div>' +
        '<div class="vc-bar">' +
        '<p class="vc-bar-note">' + escapeHtml(texts.intro || '') + '</p>' +
        '<div class="vc-actions">' +
        '<button type="button" class="vc-btn vc-btn-ghost" data-action="back">' + escapeHtml(b.back) + '</button>' +
        '<button type="button" class="vc-btn vc-btn-accept" data-action="save">' + escapeHtml(b.save) + '</button>' +
        '</div>' +
        '</div>';
    } else {
      inner =
        '<div class="vc-bar">' +
        '<div class="vc-lead">' + markImg('vc-mark', texts) +
        '<div class="vc-lead-text">' + introMarkup(texts) + metaMarkup(texts) + '</div>' +
        '</div>' +
        '<div class="vc-actions">' +
        '<button type="button" class="vc-btn vc-btn-reject" data-action="reject">' + escapeHtml(b.reject) + '</button>' +
        '<button type="button" class="vc-btn vc-btn-accept" data-action="acceptAll">' + escapeHtml(b.acceptAll) + '</button>' +
        '<button type="button" class="vc-btn vc-btn-ghost" data-action="customize">' + escapeHtml(b.customize) + '</button>' +
        '</div>' +
        '</div>';
    }

    shadowRoot.innerHTML =
      styleBlock() +
      '<div class="vc-root" role="dialog" aria-modal="false" aria-label="' + label + '">' +
      inner +
      '</div>';

    shadowRoot.addEventListener('click', onClick);
    shadowRoot.addEventListener('change', onChange);
  }

  function onClick(evt) {
    var langEl = evt.target.closest ? evt.target.closest('[data-lang]') : null;
    if (langEl) {
      var lang = langEl.getAttribute('data-lang');
      if (lang && lang !== state.lang) {
        state.lang = lang;
        render();
      }
      return;
    }
    var actionEl = evt.target.closest ? evt.target.closest('[data-action]') : null;
    if (!actionEl) return;
    var action = actionEl.getAttribute('data-action');
    if (action === 'acceptAll') {
      state.choice = { necessary: true, statistics: true, marketing: true };
      decide(state.choice);
    } else if (action === 'reject') {
      state.choice = { necessary: true, statistics: false, marketing: false };
      decide(state.choice);
    } else if (action === 'customize') {
      state.view = 'settings';
      render();
    } else if (action === 'back') {
      state.view = 'main';
      render();
    } else if (action === 'save') {
      decide(state.choice);
    }
  }

  function onChange(evt) {
    var input = evt.target;
    if (!input || !input.matches || !input.matches('input[type="checkbox"][data-cat]')) return;
    var cat = input.getAttribute('data-cat');
    if (cat === 'necessary') return;
    state.choice[cat] = !!input.checked;
  }

  function decide(choice) {
    // Stored against pageLocale (the URL actually being viewed), not state.lang
    // which the footer buttons can switch purely for reading in another language.
    storeConsent(choice, pageLocale);
    applyConsent(choice);
    hide();
  }

  function hide() {
    if (!hostEl) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var el = shadowRoot && shadowRoot.querySelector('.vc-root');
    if (reduceMotion || !el) {
      hostEl.style.display = 'none';
      return;
    }
    // Slide-down + fade on dismiss (.vc-leaving, see styleBlock), THEN
    // display:none once the transition actually finishes -- setting display
    // none immediately would skip the transition entirely. transitionend is
    // the real signal; the timeout is only a fallback in case it never fires
    // (e.g. the property that ends up not changing on a given browser).
    el.classList.add('vc-leaving');
    var done = false;
    var finish = function () {
      if (done) return;
      done = true;
      if (hostEl) hostEl.style.display = 'none';
    };
    el.addEventListener('transitionend', finish, { once: true });
    setTimeout(finish, 420);
  }

  function show(view) {
    ensureHost();
    state.view = view || 'main';
    render();
    if (hostEl) hostEl.style.display = '';
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  // The banner must not pop up unsolicited on the legal pages themselves
  // (Datenschutz/Impressum, any language) -- those pages already explain
  // everything, and a consent prompt on top of them is unwelcome. A visitor
  // can still open the panel deliberately via the footer's "Cookie settings"
  // link (VgcCookieConsent.openSettings), which is NOT gated by this check.
  function isHiddenPath() {
    var hide = config.hideOnPaths;
    if (!hide || !hide.length) return false;
    var here = window.location.pathname.replace(/\/+$/, '') || '/';
    for (var i = 0; i < hide.length; i++) {
      var p = String(hide[i]).replace(/\/+$/, '') || '/';
      if (p === here) return true;
    }
    return false;
  }

  function boot() {
    var stored = readStoredConsent(pageLocale);
    if (stored) {
      // Existing valid decision for THIS language — re-apply silently, no banner.
      state.choice = {
        necessary: true,
        statistics: !!stored.choice.statistics,
        marketing: !!stored.choice.marketing
      };
      applyConsent(state.choice);
    } else if (!isHiddenPath()) {
      show('main');
    }
  }

  if (document.body) {
    boot();
  } else {
    document.addEventListener('DOMContentLoaded', boot);
  }

  window.VgcCookieConsent = {
    openSettings: function () {
      function openNow() {
        var stored = readStoredConsent(pageLocale);
        if (stored) {
          state.choice = {
            necessary: true,
            statistics: !!stored.choice.statistics,
            marketing: !!stored.choice.marketing
          };
        }
        show('settings');
      }
      if (document.body) openNow();
      else document.addEventListener('DOMContentLoaded', openNow);
    }
  };
})();
