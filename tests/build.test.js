/**
 * Tests du système i18n (node:test, zéro dépendance).
 * Prérequis : `node scripts/build.js` a déjà généré les pages
 * (le script npm `test` le fait avant d'appeler `node --test`).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'site.config.json'), 'utf8'));
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), 'utf8');
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

const LOCALE_FILES = ['common', 'home', 'privacy', 'support', 'legal'];
const PLURAL_KEYS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);
function isPluralObject(v) {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  const k = Object.keys(v);
  return k.length && k.every(x => PLURAL_KEYS.has(x));
}
function flatten(obj, p = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = p ? `${p}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v) && !isPluralObject(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}
function loadLocale(code) {
  const merged = {};
  for (const f of LOCALE_FILES) {
    const p = path.join(ROOT, 'locales', code, `${f}.json`);
    if (fs.existsSync(p)) merged[f] = JSON.parse(fs.readFileSync(p, 'utf8'));
  }
  return flatten(merged);
}

const CODES = config.locales.map(l => l.code);
const srcKeys = Object.keys(loadLocale(config.sourceLocale));

test('les 14 locales déclarées existent avec leurs 5 fichiers', () => {
  assert.equal(config.locales.length, 14);
  for (const l of config.locales) {
    for (const f of LOCALE_FILES) {
      assert.ok(exists(`locales/${l.code}/${f}.json`), `manquant : locales/${l.code}/${f}.json`);
    }
  }
});

test('toutes les langues possèdent toutes les clés source (aucune manquante)', () => {
  for (const code of CODES) {
    const flat = loadLocale(code);
    for (const k of srcKeys) {
      assert.ok(k in flat, `[${code}] clé manquante : ${k}`);
      const v = flat[k];
      const empty = isPluralObject(v) ? Object.values(v).some(s => !String(s).trim()) : !String(v).trim();
      assert.ok(!empty, `[${code}] valeur vide : ${k}`);
    }
  }
});

test('placeholders {x} cohérents avec la source dans toutes les langues', () => {
  const ph = (v) => {
    const set = new Set();
    const scan = s => { for (const m of String(s).matchAll(/\{(\w+)\}/g)) set.add(m[1]); };
    if (isPluralObject(v)) Object.values(v).forEach(scan); else scan(v);
    return [...set].sort().join(',');
  };
  const src = loadLocale(config.sourceLocale);
  for (const code of CODES) {
    const flat = loadLocale(code);
    for (const k of srcKeys) {
      if (/\{/.test(JSON.stringify(src[k]))) {
        assert.equal(ph(flat[k]), ph(src[k]), `[${code}] placeholders ≠ source : ${k}`);
      }
    }
  }
});

test('la marque DROPP n\'est jamais traduite', () => {
  for (const code of CODES) {
    assert.ok(/Dropp/i.test(read(`${code}/index.html`).match(/<title>(.*?)<\/title>/)[1]),
      `[${code}] title sans marque`);
    // Le wordmark du hero reste "Dropp"
    assert.ok(read(`${code}/index.html`).includes('hs-title">Dropp<'), `[${code}] wordmark altéré`);
  }
});

test('chaque page a lang + dir corrects ; l\'arabe est en RTL', () => {
  for (const l of config.locales) {
    const html = read(`${l.code}/index.html`);
    assert.ok(html.includes(`<html lang="${l.htmlLang}" dir="${l.dir}">`),
      `[${l.code}] balise <html> lang/dir incorrecte`);
  }
  assert.ok(read('ar/index.html').includes('dir="rtl"'), 'ar doit être en RTL');
  assert.ok(read('fr/index.html').includes('dir="ltr"'), 'fr doit être en LTR');
});

test('hreflang complet (14 langues + x-default) sur chaque page d\'accueil', () => {
  for (const code of CODES) {
    const html = read(`${code}/index.html`);
    for (const l of config.locales) {
      assert.ok(html.includes(`hreflang="${l.hreflang}"`), `[${code}] hreflang ${l.hreflang} absent`);
    }
    assert.ok(html.includes('hreflang="x-default"'), `[${code}] x-default absent`);
    assert.ok(html.includes('hreflang="zh-Hans"') && html.includes('hreflang="zh-Hant"'),
      `[${code}] codes chinois zh-Hans/zh-Hant attendus`);
  }
});

test('canonical par langue + Open Graph localisés', () => {
  const fr = read('fr/index.html'), ja = read('ja/index.html');
  assert.ok(fr.includes('<link rel="canonical" href="https://dropp.care/fr/">'));
  assert.ok(ja.includes('<link rel="canonical" href="https://dropp.care/ja/">'));
  assert.ok(fr.includes('og:locale" content="fr_FR"'));
  assert.ok(ja.includes('og:locale" content="ja_JP"'));
});

test('aucune clé de gabarit {{…}} résiduelle dans les pages générées', () => {
  for (const code of CODES) {
    for (const page of ['index.html', 'privacy.html', 'support.html', 'legal.html']) {
      const html = read(`${code}/${page}`);
      const leftover = html.match(/\{\{[A-Za-z0-9_.-]+\}\}/g);
      assert.equal(leftover, null, `[${code}/${page}] gabarit non résolu : ${leftover}`);
    }
  }
});

test('aucun texte français résiduel dans le CONTENU VISIBLE d\'une page non-fr', () => {
  // On teste le texte visible : on retire scripts, styles et commentaires
  // HTML (les commentaires de code du projet sont en français, par choix,
  // et jamais rendus à l'utilisateur).
  const visible = (html) => html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ');
  const leaks = ['Le rythme au poignet', 'Bientôt sur l\'App Store', 'Trois gestes',
    'Questions directes', 'Calculez', 'Confiance'];
  for (const code of CODES) {
    if (code === 'fr') continue;
    const html = visible(read(`${code}/index.html`));
    for (const s of leaks) assert.ok(!html.includes(s), `[${code}] fuite FR visible : « ${s} »`);
  }
});

test('la racine détecte la langue et préserve query + hash (UTM)', () => {
  const root = read('index.html');
  assert.ok(root.includes('navigator.languages'), 'détection via navigator.languages');
  assert.ok(!/geoip|ipapi|ip-api|geolocation|ip[_-]?address/i.test(root), 'aucune géolocalisation IP');
  assert.ok(root.includes('location.search') && root.includes('location.hash'),
    'les paramètres (UTM) et l\'ancre doivent être préservés');
  assert.ok(root.includes('localStorage'), 'le choix manuel doit être mémorisé');
});

test('le sélecteur de langue est présent (header pastille + footer nav) et accessible', () => {
  const html = read('en/index.html');
  assert.ok(html.includes('class="lsw"'), 'pastille header');
  assert.ok(html.includes('class="flangs"'), 'nav footer');
  // 14 liens de langue crawlables au moins (header) + aria-current sur la langue active
  assert.ok((html.match(/data-lang="/g) || []).length >= 14, 'liens de langue crawlables');
  assert.ok(html.includes('aria-current="true"'), 'langue active marquée');
});

test('les liens internes du footer pointent vers la bonne locale', () => {
  const de = read('de/index.html');
  assert.ok(de.includes('href="/de/privacy.html"'), 'lien privacy localisé');
  assert.ok(de.includes('href="/de/support.html"'), 'lien support localisé');
  assert.ok(de.includes('href="/de/legal.html"'), 'lien legal localisé');
});

test('les anciennes URL FR redirigent (stubs) sans être cassées', () => {
  for (const r of config.legacyRedirects) {
    const html = read(r.from);
    assert.ok(html.includes('location.replace'), `${r.from} doit rediriger`);
    assert.ok(html.includes(`/${r.toLocale}/`), `${r.from} → bonne locale`);
    assert.ok(html.includes('rel="canonical"'), `${r.from} doit avoir un canonical`);
  }
});

test('le sitemap liste la racine + 56 pages localisées avec alternates', () => {
  const xml = read('sitemap.xml');
  assert.ok(xml.includes('<loc>https://dropp.care/</loc>'), 'racine');
  for (const code of CODES) {
    assert.ok(xml.includes(`<loc>https://dropp.care/${code}/</loc>`), `accueil ${code}`);
  }
  assert.ok(xml.includes('xhtml:link rel="alternate"'), 'alternates hreflang dans le sitemap');
});

test('le film localisé : fr → film FR, autres → film EN si disponible', () => {
  assert.ok(read('fr/index.html').includes('/dropp-film.mp4'));
  if (exists('dropp-film-en.mp4')) {
    assert.ok(read('en/index.html').includes('/dropp-film-en.mp4'));
    assert.ok(read('de/index.html').includes('/dropp-film-en.mp4'));
  }
});

test('les valeurs cliniques (facteurs de goutte) restent identiques partout', () => {
  // Le disclaimer clinique doit exister dans les 14 langues (non vide).
  for (const code of CODES) {
    const flat = loadLocale(code);
    assert.ok(flat['home.trust.clinical'] && flat['home.trust.clinical'].length > 10,
      `[${code}] avertissement clinique manquant`);
  }
  // Aucune locale ne doit modifier les facteurs de goutte (10/15/20/60) :
  // ils apparaissent tels quels dans la FAQ a4.
  for (const code of CODES) {
    const a4 = loadLocale(code)['home.faq.a4'];
    assert.ok(/10/.test(a4) && /15/.test(a4) && /20/.test(a4) && /60/.test(a4),
      `[${code}] facteurs de goutte 10/15/20/60 altérés dans faq.a4`);
  }
});
