#!/usr/bin/env node
/**
 * build.js — génération statique multilingue du site DROPP.
 *
 * src/templates/*.html + locales/{code}/*.json  →  /{code}/*.html (14 langues)
 * + racine détectrice (/index.html), stubs de redirection des anciennes URL,
 * 404.html et sitemap.xml.
 *
 * Zéro dépendance. Voir docs/i18n.md.
 *
 * Usage : node scripts/build.js [--quiet] [--strict]
 *   --strict : échoue si une clé manque (sinon repli en → fr, signalé).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const QUIET = process.argv.includes('--quiet');
const STRICT = process.argv.includes('--strict');

const config = JSON.parse(fs.readFileSync(path.join(SRC, 'site.config.json'), 'utf8'));
const DOMAIN = config.domain;

/* ---------------- Locales ---------------- */

const LOCALE_FILES = ['common', 'home', 'privacy', 'support', 'legal'];
const PLURAL_KEYS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

function isPluralObject(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const keys = Object.keys(v);
  return keys.length > 0 && keys.every(k => PLURAL_KEYS.has(k));
}

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v) && !isPluralObject(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

function loadLocale(code) {
  const dir = path.join(ROOT, 'locales', code);
  const merged = {};
  for (const f of LOCALE_FILES) {
    const p = path.join(dir, `${f}.json`);
    if (fs.existsSync(p)) merged[f] = JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return flatten(merged);
}

const strings = {};       // code → { flatKey: value }
for (const loc of config.locales) strings[loc.code] = loadLocale(loc.code);

const fallbackWarnings = [];  // { locale, key, from }
function lookup(code, key) {
  const own = strings[code]?.[key];
  if (own !== undefined && own !== '') return own;
  const en = strings[config.fallbackLocale]?.[key];
  if (en !== undefined && en !== '') {
    if (code !== config.fallbackLocale) fallbackWarnings.push({ locale: code, key, from: config.fallbackLocale });
    return en;
  }
  const fr = strings[config.sourceLocale]?.[key];
  if (fr !== undefined && fr !== '') {
    fallbackWarnings.push({ locale: code, key, from: config.sourceLocale });
    return fr;
  }
  return undefined;
}

/* ---------------- Templates + partials ---------------- */

const templateCache = {};
function readTemplate(name) {
  if (!templateCache[name]) {
    templateCache[name] = fs.readFileSync(path.join(SRC, 'templates', name), 'utf8');
  }
  return templateCache[name];
}

function readPartial(name) {
  return fs.readFileSync(path.join(SRC, 'partials', name), 'utf8');
}

/** Inline {{> partial-name}} (récursif, une passe suffit ici). */
function inlinePartials(tpl) {
  let out = tpl, guard = 0;
  while (out.includes('{{>') && guard++ < 10) {
    out = out.replace(/\{\{>\s*([\w.-]+)\s*\}\}/g, (_, name) => readPartial(name));
  }
  return out;
}

const missing = [];  // { locale, page, key }
const KEY_RE = /\{\{([A-Za-z0-9_.-]+)\}\}/g;
function render(tpl, ctx, { localeCode, pageId }) {
  // Substitution itérative : une traduction peut contenir {{path.privacy}}
  // (lien interne localisé), résolu à la passe suivante.
  let out = tpl, prev = null, guard = 0;
  while (out !== prev && guard++ < 4) {
    prev = out;
    out = out.replace(KEY_RE, (m, key) => {
      const v = ctx(key);
      return v === undefined ? m : String(v);
    });
  }
  for (const m of out.matchAll(KEY_RE)) {
    missing.push({ locale: localeCode, page: pageId, key: m[1] });
    // laissé visible dans la page : jamais masqué silencieusement
  }
  return out;
}

/* ---------------- Blocs générés ---------------- */

function pagePath(localeCode, page) {
  return page.id === 'home' ? `/${localeCode}/` : `/${localeCode}/${page.out}`;
}

function hreflangBlock(page) {
  const lines = config.locales.map(l =>
    `<link rel="alternate" hreflang="${l.hreflang}" href="${DOMAIN}${pagePath(l.code, page)}">`);
  // x-default : la racine détectrice pour l'accueil (recommandation Google
  // pour une page d'entrée qui redirige selon la langue) ; la version
  // anglaise pour les sous-pages (pas de détecteur dédié).
  const xdef = page.id === 'home' ? `${DOMAIN}/` : `${DOMAIN}${pagePath('en', page)}`;
  lines.push(`<link rel="alternate" hreflang="x-default" href="${xdef}">`);
  return lines.join('\n');
}

/** Sélecteur de langue du header : <details> accessible, fonctionne sans JS. */
function langSwitcherHTML(locale, page) {
  const items = config.locales.map(l => {
    const cur = l.code === locale.code;
    return `      <li><a href="${pagePath(l.code, page)}" lang="${l.htmlLang}" hreflang="${l.hreflang}" data-lang="${l.code}"${cur ? ' aria-current="true"' : ''}>${l.name}</a></li>`;
  }).join('\n');
  const label = lookup(locale.code, 'common.lang.change') ?? 'Change language';
  const title = lookup(locale.code, 'common.lang.label') ?? 'Language';
  return `<details class="lsw" id="lsw">
  <summary aria-label="${label} — ${locale.name}">
    <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9.2" fill="none" stroke="currentColor" stroke-width="1.7"/><ellipse cx="12" cy="12" rx="4.2" ry="9.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M3.4 8.9h17.2M3.4 15.1h17.2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg><span class="lsw-cur">${locale.code.split('-')[0].toUpperCase()}</span><i aria-hidden="true"></i>
  </summary>
  <div class="lsw-pop" role="group" aria-label="${title}">
    <p class="lsw-title" aria-hidden="true">${title}</p>
    <ul>
${items}
    </ul>
  </div>
</details>`;
}

/** Nav de langues du footer : liens crawlables, natifs, une ligne. */
function footerLangNavHTML(locale, page) {
  const title = lookup(locale.code, 'common.lang.label') ?? 'Language';
  const items = config.locales.map(l => {
    const cur = l.code === locale.code;
    return `<a href="${pagePath(l.code, page)}" lang="${l.htmlLang}" hreflang="${l.hreflang}" data-lang="${l.code}"${cur ? ' aria-current="true"' : ''}>${l.name}</a>`;
  }).join('<span aria-hidden="true"> · </span>');
  return `<nav class="flangs" aria-label="${title}">${items}</nav>`;
}

/** Chaînes dynamiques (JS de page) : sous-arbre home.js.* de la locale,
 *  repli clé par clé en → fr, inliné dans window.I18N. */
function i18nBootJSON(locale, page) {
  const s = {};
  if (page.jsStrings) {
    const prefix = `${page.jsStrings}.`;
    const keys = new Set();
    for (const code of [locale.code, config.fallbackLocale, config.sourceLocale]) {
      for (const k of Object.keys(strings[code] ?? {})) if (k.startsWith(prefix)) keys.add(k);
    }
    for (const k of keys) s[k.slice(prefix.length)] = lookup(locale.code, k);
  }
  return JSON.stringify({ lang: locale.htmlLang, num: locale.numberLocale, s });
}

function mediaFor(locale) {
  const m = config.media;
  const pick = (spec) => {
    const chosen = spec.byLocale[locale.code] ?? spec.default;
    return fs.existsSync(path.join(ROOT, chosen.slice(1))) ? chosen : spec.fallback;
  };
  const ogCandidate = m.ogImagePattern.replace('{code}', locale.code);
  const ogImage = fs.existsSync(path.join(ROOT, ogCandidate.slice(1))) ? ogCandidate : m.ogImageDefault;
  return { film: pick(m.film), poster: pick(m.poster), ogImage };
}

/* ---------------- Rendu des pages ---------------- */

let written = 0;
function writeFile(rel, content) {
  const abs = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
  written++;
  if (!QUIET) console.log(`  ✓ ${rel}`);
}

const GENERATED_NOTE = '<!-- Page générée — ne pas éditer à la main. Sources : src/templates + locales/. Build : npm run build -->';

for (const locale of config.locales) {
  for (const page of config.pages) {
    const tpl = inlinePartials(readTemplate(page.template));
    const media = mediaFor(locale);
    const boot = i18nBootJSON(locale, page);
    const builtins = {
      'builtin.htmlLang': locale.htmlLang,
      'builtin.dir': locale.dir,
      'builtin.localeCode': locale.code,
      'builtin.ogLocale': locale.ogLocale,
      'builtin.canonical': `${DOMAIN}${pagePath(locale.code, page)}`,
      'builtin.hreflangs': hreflangBlock(page),
      'builtin.langSwitcher': langSwitcherHTML(locale, page),
      'builtin.footerLangNav': footerLangNavHTML(locale, page),
      'builtin.i18nJson': boot,
      'builtin.filmSrc': media.film,
      'builtin.filmPoster': media.poster,
      'builtin.ogImage': `${DOMAIN}${media.ogImage}`,
      'builtin.generatedNote': GENERATED_NOTE,
      'builtin.storageKey': config.storageKey,
      'path.home': pagePath(locale.code, config.pages[0]),
      'path.privacy': pagePath(locale.code, config.pages[1]),
      'path.support': pagePath(locale.code, config.pages[2]),
      'path.legal': pagePath(locale.code, config.pages[3]),
    };
    const ctx = (key) => builtins[key] !== undefined ? builtins[key] : lookup(locale.code, key);
    const html = render(tpl, ctx, { localeCode: locale.code, pageId: page.id });
    const outRel = page.id === 'home' ? `${locale.code}/index.html` : `${locale.code}/${page.out}`;
    writeFile(outRel, html);
  }
}

/* ---------------- Racine détectrice ---------------- */

{
  const tpl = inlinePartials(readTemplate('root.html'));
  // Table {codeNavigateur → répertoire} minimale pour le détecteur client.
  const dirs = Object.fromEntries(config.locales.map(l => [l.code, 1]));
  const linkList = config.locales.map(l =>
    `<li><a href="/${l.code}/" lang="${l.htmlLang}" hreflang="${l.hreflang}" data-lang="${l.code}">${l.name}</a></li>`).join('\n      ');
  const builtins = {
    'builtin.hreflangs': hreflangBlock(config.pages[0]),
    'builtin.localeDirsJson': JSON.stringify(dirs),
    'builtin.linkList': linkList,
    'builtin.storageKey': config.storageKey,
    'builtin.fallbackLocale': config.fallbackLocale,
    'builtin.generatedNote': GENERATED_NOTE,
  };
  const ctx = (key) => builtins[key];
  writeFile('index.html', render(tpl, ctx, { localeCode: 'root', pageId: 'root' }));
}

/* ---------------- 404 ---------------- */

{
  const tpl = inlinePartials(readTemplate('404.html'));
  const linkList = config.locales.map(l =>
    `<li><a href="/${l.code}/" lang="${l.htmlLang}" hreflang="${l.hreflang}">${l.name}</a></li>`).join('\n      ');
  const ctx = (key) => ({ 'builtin.linkList': linkList, 'builtin.generatedNote': GENERATED_NOTE })[key];
  writeFile('404.html', render(tpl, ctx, { localeCode: 'root', pageId: '404' }));
}

/* ---------------- Stubs de redirection (anciennes URL FR) ---------------- */

for (const r of config.legacyRedirects) {
  const page = config.pages.find(p => p.id === r.toPage);
  const target = pagePath(r.toLocale, page);
  const title = lookup(r.toLocale, `${r.toPage}.title`) ?? 'Dropp';
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
${GENERATED_NOTE}
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Dropp — ${title}</title>
<link rel="canonical" href="${DOMAIN}${target}">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace('${target}'+location.search+location.hash);</script>
<style>body{margin:0;background:#F4EFE6;color:#3A3834;font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",Roboto,sans-serif;display:grid;place-items:center;min-height:100svh;text-align:center}</style>
</head>
<body>
<p><a href="${target}">${DOMAIN}${target}</a></p>
</body>
</html>
`;
  writeFile(r.from, html);
}

/* ---------------- Sitemap ---------------- */

{
  const today = new Date().toISOString().slice(0, 10);
  const urls = [];
  const entry = (loc, page, priority, changefreq) => {
    const alts = config.locales.map(l =>
      `    <xhtml:link rel="alternate" hreflang="${l.hreflang}" href="${DOMAIN}${pagePath(l.code, page)}"/>`);
    const xdef = page.id === 'home' ? `${DOMAIN}/` : `${DOMAIN}${pagePath('en', page)}`;
    alts.push(`    <xhtml:link rel="alternate" hreflang="x-default" href="${xdef}"/>`);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alts.join('\n')}\n  </url>`;
  };
  urls.push(`  <url>\n    <loc>${DOMAIN}/</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`);
  for (const locale of config.locales) {
    for (const page of config.pages) {
      urls.push(entry(`${DOMAIN}${pagePath(locale.code, page)}`, page,
        page.id === 'home' ? '0.9' : '0.3',
        page.id === 'home' ? 'monthly' : 'yearly'));
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`;
  writeFile('sitemap.xml', xml);
}

/* ---------------- Bilan ---------------- */

if (fallbackWarnings.length) {
  const byLocale = {};
  for (const w of fallbackWarnings) (byLocale[w.locale] ??= []).push(w.key);
  console.warn(`\n⚠ Replis de traduction (${fallbackWarnings.length}) :`);
  for (const [loc, keys] of Object.entries(byLocale)) {
    console.warn(`  ${loc} : ${[...new Set(keys)].slice(0, 8).join(', ')}${keys.length > 8 ? ` … (+${keys.length - 8})` : ''}`);
  }
}
if (missing.length) {
  console.error(`\n✗ Clés introuvables dans TOUTES les locales (${missing.length}) :`);
  for (const m of missing.slice(0, 20)) console.error(`  [${m.locale}/${m.page}] ${m.key}`);
  process.exit(1);
}
if (STRICT && fallbackWarnings.length) {
  console.error('\n✗ --strict : des replis subsistent.');
  process.exit(1);
}
console.log(`\n✓ Build : ${written} fichiers (${config.locales.length} langues × ${config.pages.length} pages + racine, 404, ${config.legacyRedirects.length} redirections, sitemap).`);
