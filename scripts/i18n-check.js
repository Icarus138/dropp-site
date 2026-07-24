#!/usr/bin/env node
/**
 * i18n-check.js — contrôle de cohérence des traductions.
 *
 * Vérifie, locale par locale, contre la locale source (fr) :
 *   - fichiers présents et JSON valides ;
 *   - clés manquantes (erreur) / clés en trop (avertissement) ;
 *   - traductions vides (erreur) ;
 *   - placeholders {x} incohérents avec la source (erreur) ;
 *   - objets pluriels : formes CLDR valides + « other » présent (erreur) ;
 *   - marque : « DROPP »/« Dropp » jamais traduite ni translittérée (erreur) ;
 *   - balises <b>/<br> déséquilibrées par rapport à la source (avertissement).
 *
 * Usage : node scripts/i18n-check.js [--dir <localesDir>] [--quiet]
 * Sort avec un code ≠ 0 s'il y a au moins une erreur.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const argDir = process.argv.indexOf('--dir');
const LOCALES_DIR = argDir > -1 ? path.resolve(process.argv[argDir + 1]) : path.join(ROOT, 'locales');
const QUIET = process.argv.includes('--quiet');

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'src', 'site.config.json'), 'utf8'));
const LOCALE_FILES = ['common', 'home', 'privacy', 'support', 'legal'];
const PLURAL_KEYS = new Set(['zero', 'one', 'two', 'few', 'many', 'other']);

const errors = [];
const warnings = [];

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
  const dir = path.join(LOCALES_DIR, code);
  if (!fs.existsSync(dir)) { errors.push(`[${code}] répertoire absent : locales/${code}/`); return null; }
  const merged = {};
  for (const f of LOCALE_FILES) {
    const p = path.join(dir, `${f}.json`);
    if (!fs.existsSync(p)) { errors.push(`[${code}] fichier absent : ${f}.json`); continue; }
    try { merged[f] = JSON.parse(fs.readFileSync(p, 'utf8')); }
    catch (e) { errors.push(`[${code}] JSON invalide : ${f}.json — ${e.message}`); }
  }
  return flatten(merged);
}

function placeholders(v) {
  const set = new Set();
  const scan = (s) => { for (const m of String(s).matchAll(/\{(\w+)\}/g)) set.add(m[1]); };
  if (isPluralObject(v)) Object.values(v).forEach(scan); else scan(v);
  return set;
}

function tagCount(v, tag) {
  const s = isPluralObject(v) ? Object.values(v).join(' ') : String(v);
  return (s.match(new RegExp(`<${tag}\\b`, 'g')) ?? []).length;
}

/* --- locale source --- */
const source = loadLocale(config.sourceLocale);
if (!source) { console.error('✗ Locale source illisible.'); process.exit(1); }
const sourceKeys = Object.keys(source);

const declared = config.locales.map(l => l.code);
for (const dirEntry of fs.existsSync(LOCALES_DIR) ? fs.readdirSync(LOCALES_DIR) : []) {
  if (fs.statSync(path.join(LOCALES_DIR, dirEntry)).isDirectory() && !declared.includes(dirEntry)) {
    warnings.push(`[${dirEntry}] répertoire de locale non déclaré dans site.config.json`);
  }
}

for (const locale of config.locales) {
  const code = locale.code;
  const flat = loadLocale(code);
  if (!flat) continue;
  if (code === config.sourceLocale) continue;

  for (const key of sourceKeys) {
    const v = flat[key];
    if (v === undefined) { errors.push(`[${code}] clé manquante : ${key}`); continue; }
    const isEmpty = isPluralObject(v)
      ? Object.values(v).some(s => String(s).trim() === '')
      : String(v).trim() === '';
    if (isEmpty) { errors.push(`[${code}] traduction vide : ${key}`); continue; }

    // Placeholders {x}
    const ref = placeholders(source[key]);
    const got = placeholders(v);
    for (const p of ref) if (!got.has(p)) errors.push(`[${code}] placeholder {${p}} absent : ${key}`);
    for (const p of got) if (!ref.has(p)) errors.push(`[${code}] placeholder {${p}} en trop : ${key}`);

    // Pluriels
    if (isPluralObject(source[key])) {
      if (!isPluralObject(v)) errors.push(`[${code}] forme plurielle attendue (objet one/other…) : ${key}`);
      else if (!('other' in v)) errors.push(`[${code}] forme plurielle sans « other » : ${key}`);
    }

    // Marque intacte — on ignore les URL et e-mails (le domaine « dropp.care »
    // et « contact@dropp.care » ne sont PAS la marque et restent en minuscules).
    const stripUrls = (s) => String(s)
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/\S+@\S+/g, ' ')
      .replace(/dropp\.care/gi, ' ');
    const srcBrand = stripUrls(isPluralObject(source[key]) ? source[key].other : source[key]);
    if (/\bDROPP\b|\bDropp\b/.test(srcBrand)) {  // marque réelle (capitalisée) dans la source
      const s = stripUrls(isPluralObject(v) ? Object.values(v).join(' ') : v);
      if (!/Dropp|DROPP/.test(s)) errors.push(`[${code}] marque « DROPP » absente ou altérée : ${key}`);
    }

    // Balises
    for (const tag of ['b', 'br', 'a']) {
      if (tagCount(source[key], tag) !== tagCount(v, tag)) {
        warnings.push(`[${code}] balises <${tag}> ≠ source : ${key}`);
      }
    }
  }

  for (const key of Object.keys(flat)) {
    if (!(key in source)) warnings.push(`[${code}] clé inconnue de la source (inutilisée ?) : ${key}`);
  }
}

/* --- clés source non utilisées par les templates --- */
const tplDir = path.join(ROOT, 'src', 'templates');
const partialDir = path.join(ROOT, 'src', 'partials');
let corpus = '';
for (const dir of [tplDir, partialDir]) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) corpus += fs.readFileSync(path.join(dir, f), 'utf8');
}
if (corpus) {
  const used = new Set([...corpus.matchAll(/\{\{([A-Za-z0-9_.-]+)\}\}/g)].map(m => m[1]));
  for (const key of sourceKeys) {
    // Consommées par le build (build.js) ou le runtime de page, pas par un
    // template : sous-arbre *.js.* (runtime), common.lang.* (sélecteur).
    if (/(^|\.)js\./.test(key)) continue;
    if (key.startsWith('common.lang.')) continue;
    if (!used.has(key)) warnings.push(`[fr] clé jamais référencée par un template : ${key}`);
  }
}

/* --- bilan --- */
if (!QUIET) {
  for (const w of warnings) console.warn(`⚠ ${w}`);
  for (const e of errors) console.error(`✗ ${e}`);
}
const localeCount = config.locales.length;
console.log(`\ni18n:check — ${localeCount} locales · ${sourceKeys.length} clés source · ${errors.length} erreur(s) · ${warnings.length} avertissement(s)`);
process.exit(errors.length ? 1 : 0);
