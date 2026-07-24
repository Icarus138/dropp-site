# Agent 08 — SEO technique, performance & qualité technique

> Périmètre : site `dropp.care` uniquement (repo `dropp-site`). Read-only. Chaque affirmation est sourcée (fichier:ligne / URL / texte exact). Impact qualitatif (faible/modéré/important/critique). Confiance : élevé (démontré) / moyen (probable, à tester en conditions réelles) / faible (hypothèse).
>
> **Deux notes** : **SEO = 62/100** · **Qualité technique & perf = 88/100**. Le socle technique est excellent ; c'est la *stratégie de contenu et de mots-clés* qui manque presque entièrement. Le site est un très bon objet d'ingénierie et un objet SEO incomplet.

---

## 1. Forces à conserver (ne pas dégrader)

Ces points sont faits correctement et constituent un avantage durable. Toute refonte SEO doit les préserver.

1. **Hygiène technique i18n complète et automatisée.** `hreflang` sur 14 locales + `x-default` pointant la racine détectrice (`scripts/build.js:126-135`), `canonical` auto-référencé par locale (`build.js:217`), sitemap XML avec `xhtml:link` alternates, `lastmod`, `changefreq`, `priority` (`build.js:298-322`, 57 URLs = 1 racine + 14×4 pages). `robots.txt` propre (`Allow: /` + `Sitemap:`). C'est un niveau de rigueur i18n que 95 % des sites n'atteignent pas. **Confiance : élevé.**
2. **Balises sociales et structurées présentes.** OG complet (`og:type/title/description/url/image` 1200×630 `/locale`), Twitter `summary_large_image`, JSON-LD `MobileApplication` valide (`home.html:12-29`, vérifié dans `fr/index.html:41`). Favicon + apple-touch-icon (`home.html:10-11`).
3. **Performance de chargement exemplaire.** Zéro dépendance runtime, zéro police externe (piles système CJK/arabe incluses), zéro analytics, zéro cookie. Page buildée ≈ 100 Ko non compressée → **≈ 29 Ko gzip** (mesuré : `gzip -c fr/index.html` = 28 999 octets). Tout est en SVG inline (aucune image lourde on-page ; `og-image.png` 295 Ko sert au partage social uniquement).
4. **WebGL du hero correctement bridé — ce n'est PAS un risque LCP/CPU.** `IntersectionObserver` met la scène en pause hors écran (`home.html:1102`), `document.hidden` coupe la boucle (`home.html:1125`), `devicePixelRatio` plafonné à 1,5 (`home.html:1130`), repli « poster » (gradient statique) si `prefers-reduced-motion`, échec de contexte WebGL ou no-JS (`home.html:1108,1111`). Le H1 texte peint immédiatement (LCP = titre, pas le canvas). **Confiance : moyen** (à confirmer par un run Lighthouse terrain, mais l'architecture est saine).
5. **Vidéo film chargée proprement.** `preload="metadata"` (`home.html:907`) : le mp4 de 1,5 Mo n'est téléchargé qu'au scroll, pas au chargement initial. `IntersectionObserver` déclenche lecture/pause.
6. **`prefers-reduced-motion` respecté partout** (`home.html:497-510`, `177-182`, JS `rm` guards), sliders accessibles (`role="slider"`, `aria-valuenow/valuetext`, clavier), `aria-live` sur les résultats. Accessibilité soignée = signal qualité pour Google.
7. **404 en `noindex`** (`src/templates/404.html:9`), redirections legacy FR en `canonical` + `location.replace` (`build.js:276-293`). Propre.

---

## 2. Problèmes (par priorité)

### P1 — `title` et `H1` ne contiennent aucun mot-clé cible

- **Emplacement.** `title` = `locales/fr/home.json` → `meta.title` = « DROPP — Le rythme au poignet. La tête au soin. » (buildé dans `fr/index.html`). `H1` = `home.html:535` → `<h1 class="hs-title">Dropp</h1>` (le wordmark seul, confirmé dans `fr/index.html`).
- **Observation.** Les deux éléments au poids SEO le plus élevé sont 100 % marque/émotion. Le `H1` est littéralement « Dropp ». Aucune des requêtes cibles (« calcul débit perfusion », « calcul gouttes par minute », « convertisseur débit perfusion », « application infirmier ») n'apparaît dans le `title` ni le `H1`. Les mots « débit », « gtt/min », « perfusion » n'existent que dans le corps. Ironie révélatrice : la **racine détectrice** (`src/templates/root.html:8`) porte un bon titre orienté produit (« DROPP — Infusion rhythm on iPhone & Apple Watch »)… mais c'est une page de redirection JS qui ne rankera pas ; les pages réellement indexées (`/fr/`, `/en/`) ont le titre poétique.
- **Impact : important.** Pour une marque à autorité nulle (0 backlink, app neuve), commencer le `title` par le nom de marque inconnu gaspille la position la plus pondérée. Sur les requêtes transactionnelles/informationnelles cibles, la pertinence perçue est faible.
- **Preuve.** `meta.title` FR/EN ci-dessus ; `home.html:535`.
- **Recommandation.** Garder l'identité de marque MAIS injecter le mot-clé en tête ou en queue de `title`, et enrichir le `H1` d'un sous-titre descriptif (le wordmark peut rester visuellement dominant via un `<p>`/`<span>`, le `H1` sémantique portant les mots-clés).
- **Exemple concret.**
  - `title` FR : « Calcul du débit de perfusion (gouttes/min) — DROPP pour iPhone & Apple Watch » (≤ 60-65 car. visibles).
  - `H1` (sémantique, peut rester discret visuellement) : « DROPP — calcul du débit de perfusion en gouttes par minute ». Conserver le wordmark géant comme rendu visuel, mais que le `<h1>` porte la phrase.
- **Effort : <2h** (édition des 14 `meta.title` + refactor léger du hero pour séparer wordmark visuel et `H1` sémantique). **Risque de régression : faible** (attention à ne pas casser le scrollytelling qui cible `.hs-title` en JS — garder la classe, changer le contenu textuel). **Confiance : élevé.**

### P1 — Aucune architecture de contenu : le site est mono-page × 14 langues, rien ne cible les requêtes informationnelles

- **Emplacement.** `src/site.config.json:8-13` : 4 pages seulement (home, privacy, support, legal). Aucune page outil ni guide.
- **Observation.** Le site n'a rien à offrir à quelqu'un qui tape « comment calculer le débit d'une perfusion », « formule gouttes par minute », « facteur de goutte 20 gtt/mL », « ml/h en gouttes ». Or ces requêtes ont une intention massive chez les infirmiers/étudiants et sont exactement le cœur de compétence de l'app. Le calculateur JS existe déjà (`home.html:1250-1314`) mais il est enterré dans la page marketing, non ciblé, non indexable comme outil autonome.
- **Impact : important** (c'est le plus gros gisement de trafic organique qualifié, et — critère du brief — un contenu *réellement utile*, pas du remplissage pour Google).
- **Recommandation.** Créer un petit arbre de pages-outils + guides, une par intention, chacune : (a) un outil interactif réel (réutiliser le moteur de calcul déjà écrit), (b) le contexte pédagogique court (formule, tableau des facteurs 10/15/20/60 gtt/mL), (c) un CTA App Store. Architecture proposée :
  - `/fr/calcul-debit-perfusion/` — calculateur volume+durée+facteur → gtt/min, s/goutte, ml/h (l'outil du hero, en page dédiée).
  - `/fr/gouttes-par-minute/` — convertisseur ml/h ↔ gtt/min + tableau des facteurs de goutte.
  - `/fr/guide/facteur-de-goutte/` — guide court : perfuseur macro (10-20) vs micro (60), quand utiliser quoi.
  - Décliner sur les 14 langues via le pipeline i18n existant (le build gère déjà l'ajout de pages).
- **Exemple concret.** Nouvelle entrée dans `site.config.json.pages` : `{ "id":"calc", "template":"calc.html", "out":"calcul-debit-perfusion.html", "jsStrings":"calc.js" }`, template réutilisant `.calc` + le `roller()`/`render()` de `home.html`. Ajouter `JSON-LD` `SoftwareApplication`/`HowTo` selon la page.
- **Effort : <1sem** (par vague : d'abord la page calculateur FR+EN, mesurer, étendre). **Risque de régression : faible** (pages neuves, isolées ; veiller au `canonical`/`hreflang` auto — déjà géré par le build). **Confiance : moyen** (le gain dépend de l'exécution éditoriale et de l'autorité acquise ; l'utilité est certaine, le ranking à confirmer). **Type : decision-strategique.**

### P2 — La FAQ (7 questions) n'est pas balisée en `FAQPage` JSON-LD

- **Emplacement.** `home.html:992-998` — 7 `<details><summary>…</summary><p>…</p></details>` sans données structurées.
- **Observation.** Contenu Q/R déjà rédigé et localisé, mais aucun `FAQPage` schema → inéligible aux rich results FAQ / aux réponses génératives qui s'appuient sur le structuré.
- **Impact : modéré** (visibilité SERP améliorée à coût quasi nul ; Google a réduit l'affichage FAQ mais le structuré reste utile pour l'entité et les moteurs IA).
- **Recommandation.** Générer un bloc `FAQPage` JSON-LD à partir des mêmes clés locale `home.faq.q*/a*`, injecté dans le `<head>` de la home (le build a déjà accès aux strings : ajouter une fonction analogue au JSON-LD existant `home.html:27-29`).
- **Exemple concret.** Dans `build.js`, produire `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":q1,"acceptedAnswer":{"@type":"Answer","text":a1}}, …]}` et l'exposer via un builtin `{{builtin.faqJsonLd}}`.
- **Effort : <2h.** **Risque : faible** (additif). **Confiance : élevé.** **Type : optimisation.**

### P2 — La vidéo film tente une lecture automatique AVEC son, et n'a pas de dimensions (risque CLS)

- **Emplacement.** `home.html:922-929` (`enter()` : `v.muted=false; v.play()` puis repli `muted=true`) ; `home.html:907` (`<video>` sans `width`/`height`) ; `.film` sans `aspect-ratio` (`home.html:512`).
- **Observation (autoplay son).** À l'entrée en viewport, le code force `muted=false` avant `play()`. Les navigateurs bloquent quasi systématiquement l'autoplay sonore sans interaction → double tentative de lecture (rejet puis relecture muette), et sur les rares contextes autorisés (MEI élevé) l'utilisateur reçoit du son inattendu. Le bouton « Son » existe déjà pour l'opt-in explicite : tenter le son d'office est agressif et techniquement gaspilleur.
- **Observation (CLS).** `<video>` sans `width`/`height` ni `aspect-ratio` sur `.film` : avant chargement du poster, la hauteur peut être ~0 puis se caler sur l'aspect intrinsèque du poster → décalage de mise en page. Impact réel faible (section sous la ligne de flottaison, LCP = hero), mais le CLS est cumulé sur toute la session.
- **Impact : modéré.**
- **Recommandation.** (a) Démarrer muet par défaut, ne dé-muter que sur clic du bouton Son (déjà câblé). (b) Fixer l'aspect : `aspect-ratio` sur `.film`/`.film-v` ou `width`/`height` sur `<video>`, alignés sur les dimensions du poster.
- **Exemple concret.** `home.html:922-929` : remplacer par `function enter(){ v.play().catch(function(){}); sync(); }` (toujours muet à l'entrée) ; CSS : `.film-v{ aspect-ratio: 16/9; }` (ajuster au ratio réel du poster).
- **Effort : <30min.** **Risque : faible** (le bouton Son reste le chemin d'opt-in ; vérifier que `sync()` reflète bien l'état muet initial). **Confiance : élevé.** **Type : correction.**

### P2 — Titres de section (`H2`) poétiques, sans valeur de requête

- **Emplacement.** `home.html` — ex. `705` « Le film », `watch.title` « Tout, sans sortir l'iPhone », etc. (16 `h2/h3` au total).
- **Observation.** La hiérarchie `H2` est bien structurée sémantiquement mais entièrement narrative. Aucun `H2` ne contient « débit », « gouttes/minute », « perfusion », « infirmier ». Google lit les `H2` comme signaux de sous-thèmes.
- **Impact : modéré.**
- **Recommandation.** Garder le ton premium mais glisser le vocabulaire métier dans 2-3 `H2` clés (démo, gestes, tarifs) sans sur-optimiser.
- **Exemple concret.** `home.demo.title` : au lieu de « Tout le geste, d'un regard », → « Calculer le débit de perfusion en quinze secondes » ; section gestes : « Calculez le débit, calez la cadence, suivez la perfusion ».
- **Effort : <2h** (édition strings localisées). **Risque : faible** (attention à conserver la longueur pour `text-wrap:balance`). **Confiance : moyen.** **Type : optimisation.**

### P2 — JSON-LD `MobileApplication` minimal

- **Emplacement.** `home.html:28`.
- **Observation.** Schéma valide mais pauvre : `offers` price « 0 » seul (pas de mention IAP), pas de `featureList`, pas d'`aggregateRating` (correctement absent tant qu'il y a 0 avis — ne PAS inventer). L'`author` = `Organization "Dropp"` alors que l'éditeur légal est une personne physique (cohérence à vérifier avec l'agent juridique, hors périmètre perf).
- **Impact : faible à modéré.**
- **Recommandation.** Enrichir avec `featureList` (calcul gtt/min, tempo, alarme de fin, Apple Watch), `operatingSystem` déjà présent, `applicationCategory` déjà « HealthApplication » (correct). Ajouter le lien App Store en `sameAs`/`installUrl`. Laisser `aggregateRating` absent jusqu'à obtention d'avis réels.
- **Exemple concret.** Ajouter `"featureList":["Calcul du débit de perfusion (gouttes/min)","Tempo visuel et haptique","Alarme de fin de perfusion","Apple Watch"],"installUrl":"https://apps.apple.com/app/id6792277373"`.
- **Effort : <30min.** **Risque : faible.** **Confiance : moyen.** **Type : optimisation.**

### P3 — CSS et JS inline dupliqués sur 14 langues, non cachables

- **Emplacement.** `home.html` (≈ 84 Ko de template, tout inline) → chaque `/{locale}/index.html` embarque son propre CSS+JS identique. `build.js` inline les partials (`inlinePartials`).
- **Observation.** Pas de fichier `.css`/`.js` partagé cachable entre pages/langues. Un visiteur qui change de langue re-télécharge tout. Compensé par gzip (≈ 29 Ko/page) et par le fait que c'est une seule requête par page.
- **Impact : faible** (site majoritairement en visite unique ; le gain de cache inter-pages est marginal ici, et l'inline supprime des requêtes — le compromis actuel est défendable).
- **Recommandation.** À n'envisager QUE si l'analytics futur montre de la navigation inter-langues ou multi-pages : extraire un `dropp.css` + `dropp.js` cachables. Sinon, laisser tel quel — c'est un choix de perf assumé.
- **Exemple concret.** N/A (statu quo recommandé à court terme).
- **Effort : <1j** (si fait). **Risque : modéré** (casse potentielle du CSP-free inline / du timing d'exécution JS). **Confiance : moyen.** **Type : optimisation.**

### P3 — Détails perf/indexation mineurs

- **Emplacement / observation.**
  - `home.html:1002` : `<img class="appicon" src="/icon.png" width="88" height="88">` a des dimensions (bien, pas de CLS) mais pas de `loading="lazy"` alors qu'elle est en pied de page. **Effort <30min, risque faible.**
  - `src/site.config.json:22-23` + `build.js:189-191` : une seule `og-image.png` générique (pas d'OG localisée présente sur disque ; le fallback fonctionne). Optionnel : des OG par langue amélioreraient le partage social. **Effort <1j, impact faible.**
  - Pas de `VideoObject` JSON-LD ni de sitemap vidéo pour le film — éligibilité aux résultats vidéo perdue. **Effort <2h, impact faible.**
  - `meta color-scheme: only light` (`home.html:7`) : choix assumé (identité ivoire), pas un problème SEO ; noter que le mode sombre système est ignoré.
- **Impact : faible.** **Type : optimisation.**

---

## 3. Potentiel SEO par requête cible

| Requête | Couverture actuelle | Verdict |
|---|---|---|
| calcul débit perfusion | mot présent dans le corps, absent de title/H1/H2 | **faible** — page dédiée requise (P1 #2) |
| calcul gouttes par minute | « gtt/min » dans le corps, jamais en clair « gouttes par minute » dans les balises fortes | **faible** — cible idéale d'une page-outil |
| convertisseur débit perfusion | le calculateur existe mais enterré, non ciblé | **faible→moyen** — extraire en page autonome |
| application infirmier | positionnement soignant présent (byline, disclaimer) mais aucune balise ne le cible | **faible** |
| calcul perfusion infirmier | idem | **faible** |

Conclusion : le site est aujourd'hui optimisé pour la requête de marque « Dropp » (qu'il ne domine même pas encore, app non indexée) et quasi absent des requêtes génériques qui portent le volume. Le socle technique permet de corriger cela rapidement — c'est un problème de contenu/mots-clés, pas d'infrastructure.

---

## 4. Notes

- **SEO : 62/100.** Hygiène technique quasi parfaite (hreflang, sitemap, canonical, OG, JSON-LD, robots, i18n) mais stratégie on-page/contenu qui *fait ranker* largement absente : title/H1/H2 sans mots-clés, zéro page-outil/guide, FAQ non structurée. Le plafond est haut ; l'exécution éditoriale manque.
- **Qualité technique & performance : 88/100.** Ingénierie remarquable : 0 dépendance, WebGL bridé, `prefers-reduced-motion` généralisé, `preload=metadata`, SVG inline, accessibilité soignée, build i18n déterministe. Points retirés : tentative d'autoplay sonore, CLS vidéo, actifs inline non cachables — tous mineurs et corrigeables en <2h cumulées.

*Non vérifié ici (à confirmer) : Core Web Vitals terrain via Lighthouse/CrUX (LCP/CLS/INP réels sur mobile 4G). L'architecture prédit de bons scores mais aucune mesure terrain n'a été exécutée dans ce run.*
