# Agent 3 — UX/UI & Accessibilité (WCAG)

> Périmètre : site `dropp.care` (templates `src/templates/home.html`, `src/partials/i18n.css` + `i18n.js`). Read-only. Chaque affirmation est sourcée (fichier:ligne, sélecteur, ratio calculé). Ratios WCAG calculés sur les tokens réels.
> Note globale : **74 / 100**.

---

## 0. Méthode & ratios de contraste calculés

Tokens (`home.html:31-37`) sur `--bg #F4EFE6` (et `--surface #EFE9DE`) :

| Token | Hex | Ratio /bg | Ratio /surface | Verdict texte (AA = 4.5 normal / 3.0 grand) |
|---|---|---|---|---|
| `--ink` | #3A3834 | **10.21** | 9.68 | AAA partout |
| `--body` | #6F695E | **4.75** | **4.50** | AA normal, mais **pile sur le seuil** |
| `--soft` | #A59F92 | **2.30** | 2.18 | **échec** (texte normal ET grand) |
| `--faint` | #C6BFB2 | **1.59** | 1.51 | **échec** (décoratif uniquement) |
| `--amber` | #D9A44A | 1.96 | 1.86 | OK comme non-texte / bordure |

Bouton primaire `--bg` sur `--ink` = 10.2:1 (AAA). Pastille Pro `--amber-ink #1A1A1C` sur `--amber` = 7.74:1 (AAA). **Panneau Graphite** (`.dark`, sur #1A1A1C) : ink #E9E2D6 = 13.5, soft #A69F92 = 6.62, body #8F897D = 5.00 → **tout passe AA**. Le thème sombre est mieux contrasté que le thème clair.

---

## 1. Forces à conserver (ne pas dégrader)

1. **`prefers-reduced-motion` traité de bout en bout, correctement.** Repli « poster » du hero (`home.html:79-95`), WebGL du hero désactivé (`:1111`), scrollytelling non activé (`:1158 return`), canvas Pro désactivé (`:1115`), `animation:none !important` global (`:497-510`), `scroll-behavior:auto` (`:506`). C'est rare et bien fait. **À préserver absolument.**
2. **Démos interactives réellement accessibles au clavier.** Rouleaux `role="slider"` avec flèches ↑↓←→ (`:1296-1301`), `aria-valuenow`/`aria-valuetext` mis à jour dynamiquement (`:1269-1272`), résultats en `aria-live="polite"` (`:655, 679, 797`), pad Tap `<button>` avec Espace/Entrée (`:1419-1421`) + filet `click` pour VoiceOver quand il n'y a pas d'événement pointeur (`:1417-1418`). Niveau de soin exceptionnel pour un site marketing.
3. **RTL / CJK sophistiqués** (`i18n.css:45-79`) : `dir="rtl"`, **isolation des valeurs médicales** (`unicode-bidi:isolate` + `direction:ltr` sur `.cval/.crate/.cres .big/.tv`) pour éviter toute ambiguïté de lecture d'un débit en arabe, piles de police système par langue (SF Arabic, Hiragino, PingFang…), reset de letter-spacing en arabe, `hyphens:auto` pour de/nl/ru.
4. **ARIA correct sur le contenu non-textuel.** SVG décoratifs `aria-hidden` (hero devices `:539`, toutes les vignettes de démo), et les panneaux animés complexes exposés en un seul `role="img"` + `aria-label` (`.demo-stage :583`, `.dark :820`). Bon arbitrage.
5. **Cibles tactiles généreuses sur les contrôles primaires** : rouleaux 44px (`:261`), pad Tap 118px (`:314`), reset `min-height:44px` (`:324`), `touch-action` maîtrisé (`pan-y`/`manipulation`).
6. **Séparation documentée du texte de lecture (`--body`) et des micro-libellés (`--soft`)** (`:33-35`) — l'intention AA est là, même si l'exécution laisse des libellés informatifs en `--soft` (cf. §2).
7. **0 police externe, 0 dépendance, `color-scheme` explicite, `text-wrap:balance` sur les titres, `font-variant-numeric:tabular-nums` sur les valeurs.** Perf, sobriété, rigueur typographique = perception premium réelle, pas template générique.

---

## 2. Problèmes — Accessibilité (défauts objectifs WCAG)

### A11Y-1 · Disclaimer clinique + copyright quasi invisibles (contraste 1.59:1) — P1
- **Emplacement** : `footer { color:var(--faint) }` (`:493-494`) ; texte concerné = disclaimer clinique + « © 2026 Dropp » (`:1020-1021`).
- **Observation** : `--faint #C6BFB2` sur `--bg` = **1.59:1**. C'est en-dessous de tout seuil (AA texte = 4.5, non-texte = 3.0). Or ce texte n'est pas décoratif : c'est l'avertissement médical (« outil d'aide, ne remplace ni le jugement clinique… ») et la mention de copyright.
- **Impact** : critique en accessibilité (illisible pour malvoyants et en plein jour sur mobile) ; aggrave le risque juridique si le disclaimer n'est de fait pas lisible.
- **Reco** : passer le corps du footer à `--body` (#6F695E, 4.75:1) au minimum ; le disclaimer clinique mérite `--ink`.
- **Exemple** : `footer { color:var(--body); }` et pour le disclaimer un `<p class="clinic-footer" style="color:var(--ink)">`.
- **Effort** : <30min · **Confiance** : élevé (mesuré).

### A11Y-2 · Système de micro-libellés sous le seuil AA (2.30:1) — P1
- **Emplacement** : `.eyebrow` (`:49-50`), `.try` (`:252`), `.lbl` (`:75`), `.colhead` (`:285`), `.crow .clab` (`:259`), `.tier .name` (`:455`), `.tapdemo .tu` (`:313`), `.dt-cap` (`:360`), `.hs-soon/.hs-sign/.hs-hint` — tous `color:var(--soft)`.
- **Observation** : `--soft` = **2.30:1**, échec AA. Les `.eyebrow` ne sont pas décoratifs : ce sont les **intitulés de section de fait** (« En quinze secondes », « Vous connaissez ce moment », « Trois gestes », « Gratuit et Pro », « Confiance »). Texte 10-11px gras majuscule très espacé = le pire cas de lisibilité. Le seuil « grand texte » (3:1) ne s'applique pas (bold ne compte comme grand qu'à ≥18.66px).
- **Impact** : important (systémique, touche chaque section) ; nuit à la scannabilité pour tous, pas seulement les malvoyants.
- **Reco** : réserver `--soft` aux glyphes/unités purement décoratifs (`.cu`, ticks) ; passer les eyebrows et libellés porteurs de sens à `--body`. Note : sur ce fond ivoire, **seul ~#6F695E atteint 4.5:1** (testé : #7E776B = 3.87, #847D71 = 3.56). Il n'y a pas de « gris doux » conforme ; il faut assumer `--body`.
- **Exemple** : `.eyebrow, .try, .colhead, .clab, .tier .name { color:var(--body); }`.
- **Effort** : <2h (vérifier chaque libellé, garder la hiérarchie via graisse/taille) · **Confiance** : élevé.

### A11Y-3 · Focus clavier absent/incohérent sur les rouleaux du calculateur — P1
- **Emplacement** : règle focus `a:focus-visible, button:focus-visible, summary:focus-visible, input:focus-visible` (`:42-43`) ; les rouleaux sont `div.roller[role="slider"][tabindex="0"]` (`:650-654`).
- **Observation** : la seule règle de focus visible ne cible pas les `div[role=slider]`. Un utilisateur clavier qui tabule vers Volume/Durée n'a pas le contour ambre/encre cohérent du reste ; il dépend de l'anneau par défaut du navigateur (souvent absent ou très pâle sur `div` dans Safari). Contrôle interactif clé sans indicateur de focus fiable = échec WCAG 2.4.7.
- **Impact** : modéré à important (les deux rouleaux sont le cœur de la démo « Calculez »).
- **Reco** : élargir le sélecteur à `[tabindex]:focus-visible` ou ajouter `.roller:focus-visible`.
- **Exemple** : `.roller:focus-visible, [role="slider"]:focus-visible { outline:2px solid var(--ink); outline-offset:3px; }`.
- **Effort** : <30min · **Confiance** : moyen (l'anneau UA par défaut peut masquer partiellement le défaut ; à tester Safari/VoiceOver).

### A11Y-4 · Le film s'auto-joue (et tente le son) sans respecter `prefers-reduced-motion` — P2
- **Emplacement** : script du film `:912-943` ; `enter()` `:922-930` met `v.muted=false` puis `v.play()` sur intersection (`:931-934`). Aucun test de `rm` dans ce bloc (vérifié : 0 occurrence).
- **Observation** : contraste avec le reste du site, tout est soigneusement gaté par reduced-motion sauf ce film. Sous `prefers-reduced-motion`, la vidéo démarre quand même au scroll. Pire, `enter()` tente d'abord le **son actif** ; si le navigateur l'autorise (interaction préalable sur la page), du son se déclenche à l'arrivée dans la vue, sans que l'utilisateur l'ait choisi (surprise sonore en contexte clinique/partagé). Un repli muet existe seulement si l'autoplay-son est bloqué.
- **Impact** : modéré (accessibilité vestibulaire + audio inattendu ; WCAG 2.2.2 / 1.4.2). Le bouton Son existe (bon), mais l'état initial devrait être muet et l'autoplay coupé sous reduced-motion.
- **Reco** : (1) si `rm`, ne pas auto-jouer (laisser le poster + bouton lecture) ; (2) démarrer toujours muet, ne mettre le son que sur action explicite du bouton.
- **Exemple** : en tête du IIFE `var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;` puis dans `enter()` `if(rm){return;}` et retirer la tentative `v.muted=false` d'office.
- **Effort** : <30min · **Confiance** : élevé (comportement lu dans le code).

### A11Y-5 · Hiérarchie de titres faible / sections sans heading — P2
- **Emplacement** : la plupart des sections mènent par `<p class="eyebrow">` puis sautent à `<h3>` (ex. « Trois gestes » `:639`, Tap `:788-791`) ; la section « Vous connaissez ce moment » (`:629-637`) n'a **aucun** élément de titre (eyebrow `<p>` + `<ul>`) ; « Perfusions simultanées » a un `<h2>` mais les eyebrows porteurs de sens restent des `<p>`.
- **Observation** : le plan du document pour un lecteur d'écran est `h1 Dropp` → quelques `h2` → `h3` épars, avec des sections entières invisibles à la navigation par titres. Les eyebrows font visuellement office de titres mais ne sont pas des headings.
- **Impact** : modéré (navigation lecteur d'écran + SEO/outline).
- **Reco** : donner un heading réel à chaque section (au moins `h2` visuellement discret), ou lier l'eyebrow au titre. Ne pas transformer les eyebrows décoratifs en headings si un vrai titre existe déjà juste après.
- **Exemple** : section moment → ajouter un `<h2>` (même court) avant la liste ; envisager `aria-labelledby` reliant `<section>` à son eyebrow.
- **Effort** : <2h · **Confiance** : élevé.

### A11Y-6 · Texte de lecture pile sur le seuil AA (fragile) — P2
- **Emplacement** : `--body` = 4.75:1 sur bg mais **4.50:1 sur `--surface`** ; utilisé à petite taille sur surface dans `.tier .note` 12px (`:460`), `.clinic` 12px (`:469`), `.dt.requirement` 12.5px (`:759`), notes multi/pro 12.5-13px.
- **Observation** : conforme AA au sens strict, mais sans marge : à 12px sur `--surface` (4.50 exact), le moindre lissage sous-pixel ou écran peu contrasté fait basculer sous le seuil perçu.
- **Impact** : faible à modéré (robustesse).
- **Reco** : pour le texte ≤12.5px sur `--surface`, utiliser un gris un cran plus foncé (proche `--ink`) ou remonter à 13-14px.
- **Exemple** : `.tier .note, .clinic { color:#5A554C; }` (≈6:1) ou `font-size:13px`.
- **Effort** : <30min · **Confiance** : élevé.

### A11Y-7 · Nav de langues du footer : 14 cibles minuscules et serrées — P3
- **Emplacement** : `.flangs a { padding:6px 5px; font-size:11.5px; }` (`i18n.css:40`).
- **Observation** : ~27px de haut (passe le minimum AA 2.5.8 de 24px) mais loin des 44px confortables, 14 liens adjacents `line-height:2.1` → risque de mis-tap au pouce sur mobile.
- **Impact** : faible.
- **Reco** : augmenter le padding vertical (≥10px) ou espacer davantage.
- **Effort** : <30min · **Confiance** : moyen.

---

## 3. Problèmes — UX / fonctionnel

### UX-1 · Aucune navigation ni ancre de retour sur une page longue — P2
- **Emplacement** : la page enchaîne 14 sections sur ~4-5 écrans de hero + le reste, sans header de navigation, sans sommaire, sans lien « aller aux tarifs » depuis le haut. Seul le closing renvoie vers `#demo` (`:1010`).
- **Observation** : sur desktop, l'utilisateur qui veut « voir le prix » doit scroller toute la narration. Le seul CTA persistant est le bouton `.hs-get` épinglé **dans le hero** (`position:absolute`, il disparaît au scroll — ce n'est pas `fixed`).
- **Impact** : modéré (conversion : la friction pour atteindre Tarifs/Télécharger après le hero).
- **Reco** : envisager un CTA « Télécharger » discret réapparaissant en `position:fixed` après le hero (respecter reduced-motion), ou une mini-nav ancrée. À tester, ne pas alourdir l'esthétique épurée.
- **Effort** : <1j · **Confiance** : moyen · **Type** : experimentation.

### UX-2 · Forcé en clair uniquement — lisibilité de nuit — P2
- **Emplacement** : `<meta name="color-scheme" content="only light">` (`:7`), `theme-color #F4EFE6`.
- **Observation** : l'app a un thème Graphite (utilisé en preview « 22:07 » dans la section Pro), mais le site reste ivoire clair et bloque le mode sombre. Cible = infirmiers, gardes de nuit, wards en basse lumière ; un plein écran ivoire à 22h est agressif.
- **Impact** : modéré (confort d'un segment central de la cible).
- **Reco** : proposer un thème sombre du site (le token set Graphite existe déjà et passe AA), ou au minimum ne pas forcer `only light`. Décision de marque à arbitrer (le parti pris ivoire premium est assumé et cohérent).
- **Effort** : >1sem (refonte tokens) · **Confiance** : moyen · **Type** : decision-strategique.

### UX-3 · Wordmark du hero volontairement en gris doux (--body sur liquide animé) — préférence — P3
- **Emplacement** : `.hs-title { color:var(--body) }` (`:101`), commentaire assumé « habite le liquide sans le dominer » (`:99, 1192`).
- **Observation** : le H1/marque est en gris 4.75:1 sur un fond WebGL variable. En très grand (42-100px) le seuil « grand texte » 3:1 est tenu sur le repli opal (5.18:1). C'est un choix esthétique valide, mais la marque a une présence volontairement faible et le contraste dépend de la nappe animée sous-jacente.
- **Impact** : faible (subjectif).
- **Reco** : garder, mais vérifier que la teinte du shader ne descend jamais sous 3:1 pour le wordmark (borne le fond du canvas, ce qui est déjà fait via `bg:[0.957,0.937,0.902]`). Rien à corriger, à surveiller.
- **Effort** : <30min (vérif) · **Confiance** : faible · **Type** : verification.

---

## 4. Ce qui est bien et pourrait tenter d'être « amélioré » à tort

- La **densité et l'espacement** (`section padding:64px`, `max-width:920px`, `p{max-width:58ch}`) sont justes ; ne pas resserrer.
- Le **rythme visuel** alterne texte/démo/panneau sombre avec des règles fines (`--rule` 10% opacity) : cohérent, ne pas ajouter de cartes autour des démos (conforme au parti pris « scène full-bleed » de la mémoire produit).
- Les **`aria-live`** sur résultats de calcul/tap sont corrects ; ne pas les multiplier (risque de verbosité VoiceOver).

---

## 5. Note : 74 / 100

Décomposition qualitative :
- **Artisanat / interaction / i18n / reduced-motion** : excellent, très au-dessus d'un site marketing standard (+).
- **Contraste WCAG** : deux échecs systémiques réels (footer `--faint`, libellés `--soft`) qui touchent du texte porteur de sens, dont le disclaimer clinique (−). C'est le principal facteur qui plafonne la note.
- **Focus clavier** : une faille sur les rouleaux (−).
- **Structure de titres** et **autoplay du film** : correctifs modérés (−).
- **UX conversion** (pas de CTA persistant, pas de mode nuit) : perfectible mais choix assumés (neutre).

La correction des trois P1 (footer, libellés, focus) ferait passer le site en conformité AA sur le contenu essentiel et hisserait la note vers ~85+, sans toucher à l'esthétique premium qui, elle, fonctionne.
