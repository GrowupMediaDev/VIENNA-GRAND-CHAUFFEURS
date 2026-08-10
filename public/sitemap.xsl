<?xml version="1.0" encoding="UTF-8"?>
<!--
  Darstellung von /sitemap-index.xml und /sitemap-0.xml als lesbare Tabelle.
  Reine Praesentation - Googlebot ignoriert das Stylesheet, der XML-Inhalt
  bleibt unveraendert. Referenziert wird es ueber die xslURL-Option von
  @astrojs/sitemap (astro.config.mjs).

  Die Farben sind die Design-Tokens aus src/styles/global.css und muessen hier
  inline stehen: die gebuendelte CSS ist gehasht und nicht stabil verlinkbar.
  Die Fonts liegen unter /fonts/ (Kopien aus @fontsource-variable), damit die
  Seite dieselben Schriften nutzt, ohne ein CDN zu laden.
-->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="s xhtml">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="de">
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Sitemap – Vienna Grand Chauffeurs</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <style>
          /* Design-Tokens aus src/styles/global.css */
          @font-face {
            font-family: 'Bricolage Grotesque Variable';
            font-style: normal; font-display: swap; font-weight: 200 800;
            src: url(/fonts/bricolage-grotesque-latin-wght-normal.woff2) format('woff2-variations');
          }
          @font-face {
            font-family: 'Inter Variable';
            font-style: normal; font-display: swap; font-weight: 100 900;
            src: url(/fonts/inter-latin-wght-normal.woff2) format('woff2-variations');
          }
          :root {
            --bg:#1e1e1e; --panel:#262626; --line:#333333;
            --text:#ffffff; --muted:#a39d95; --accent:#c46a2d;
            color-scheme: dark;
          }
          * { box-sizing:border-box; }
          body { margin:0; background:var(--bg); color:var(--text);
                 font-family:'Inter Variable', 'Inter', system-ui, -apple-system, sans-serif;
                 -webkit-font-smoothing:antialiased; }
          .wrap { max-width:1100px; margin:0 auto; padding:48px 24px 80px; }
          h1 { font-family:'Bricolage Grotesque Variable', 'Bricolage Grotesque', Georgia, serif;
               font-weight:600; font-size:clamp(28px,4vw,44px); color:var(--accent);
               margin:0 0 4px; letter-spacing:.5px; }
          .badge { display:inline-block; font-size:11px; color:var(--muted);
                   border:1px solid var(--line); border-radius:999px; padding:2px 10px; margin-left:10px; vertical-align:middle; }
          .sub { color:var(--muted); font-size:14px; margin:0 0 28px; }
          table { width:100%; border-collapse:collapse; background:var(--panel);
                  border:1px solid var(--line); border-radius:10px; overflow:hidden; }
          thead th { text-align:left; font-size:12px; text-transform:uppercase; letter-spacing:.08em;
                     color:var(--accent); padding:14px 16px; border-bottom:1px solid var(--line); }
          tbody td { padding:12px 16px; border-bottom:1px solid var(--line); font-size:14px; vertical-align:top; }
          tbody tr:last-child td { border-bottom:none; }
          tbody tr:hover { background:rgba(127,127,127,.08); }
          .num { color:var(--muted); width:48px; }
          a { color:var(--accent); text-decoration:none; word-break:break-all; }
          a:hover { text-decoration:underline; }
          .langs { color:var(--muted); font-size:12px; }
          .tag { display:inline-block; border:1px solid var(--line); border-radius:4px;
                 padding:1px 6px; margin:0 4px 4px 0; color:var(--text); }
        </style>
      </head>
      <body>
        <div class="wrap">
          <xsl:choose>

            <!-- Fall A: Sitemap-Index (verweist auf mehrere Sitemaps) -->
            <xsl:when test="s:sitemapindex">
              <h1>Sitemap<span class="badge">Index</span></h1>
              <p class="sub">
                <xsl:value-of select="count(s:sitemapindex/s:sitemap)"/>
                <xsl:choose>
                  <xsl:when test="count(s:sitemapindex/s:sitemap) = 1"> Sitemap · </xsl:when>
                  <xsl:otherwise> Sitemaps · </xsl:otherwise>
                </xsl:choose>
                vienna-grand-chauffeurs.pages.dev
              </p>
              <table>
                <thead><tr><th class="num">#</th><th>Sitemap</th><th>Geändert</th></tr></thead>
                <tbody>
                  <xsl:for-each select="s:sitemapindex/s:sitemap">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="langs"><xsl:value-of select="s:lastmod"/></td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:when>

            <!-- Fall B: einzelne Sitemap -->
            <xsl:otherwise>
              <h1>Sitemap</h1>
              <p class="sub"><xsl:value-of select="count(s:urlset/s:url)"/> URLs · vienna-grand-chauffeurs.pages.dev</p>
              <table>
                <thead><tr><th class="num">#</th><th>URL</th><th>Sprache</th></tr></thead>
                <tbody>
                  <xsl:for-each select="s:urlset/s:url">
                    <tr>
                      <td class="num"><xsl:value-of select="position()"/></td>
                      <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                      <td class="langs">
                        <xsl:choose>
                          <!-- hreflang-Alternates, falls die Sitemap sie fuehrt -->
                          <xsl:when test="xhtml:link">
                            <xsl:for-each select="xhtml:link">
                              <span class="tag"><xsl:value-of select="@hreflang"/></span>
                            </xsl:for-each>
                          </xsl:when>
                          <!-- sonst die Sprache aus dem Pfad: EN liegt unter /en/, DE an der Wurzel -->
                          <xsl:when test="contains(s:loc, '/en/')">
                            <span class="tag">en</span>
                          </xsl:when>
                          <xsl:otherwise>
                            <span class="tag">de-AT</span>
                          </xsl:otherwise>
                        </xsl:choose>
                      </td>
                    </tr>
                  </xsl:for-each>
                </tbody>
              </table>
            </xsl:otherwise>

          </xsl:choose>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
