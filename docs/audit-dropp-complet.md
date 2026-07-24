# Audit complet — écosystème Dropp

> Audit multi-agents (12 agents spécialisés + Red Team + synthèse), **read-only**, 24/07/2026.
> Preuves détaillées : `docs/audit-agents/01`→`15`. Actions : `docs/audit-dropp-actions.csv` (101 findings).
> Ressources : site https://dropp.care · fiche https://apps.apple.com/fr/app/dropp/id6792277373 · repos `dropp-site` + `dropp-native`.

---

## 1. Résumé exécutif

**Situation.** Dropp est un produit **remarquablement bien exécuté** pour un lancement : design premium sobre (hero WebGL + scrollytelling + démos interactives), copy soignée (82/100), éthique irréprochable (« zéro donnée » vérifiée dans le code, « l'alarme de fin ne sera jamais payante »), ingénierie du site propre (88/100), 14 langues. C'est déjà au-dessus de toute la concurrence directe en finition.

**Avantage principal.** L'exécution premium **+ l'auteur-soignant** + le parti pris « sans pub, sans compte, données locales » forment un différenciateur que les concurrents (dev anonymes, apps basiques, certaines avec pub) ne peuvent pas copier facilement. Les **démos interactives** laissent essayer avant de télécharger — actif de conversion supérieur à toute capture.

**Problème principal.** Trois trous minent la conversion et la fiabilité : (1) un **bug produit** — la permission de notification n'est ni demandée proprement ni rattrapée, donc l'alarme de fin (la promesse gratuite centrale) peut **échouer en silence** ; (2) une **clarté insuffisante dans les 5 premières secondes** (le hero ne nomme ni la fonction précise ni le public) ; (3) **zéro preuve sociale** et aucun prompt d'avis, dans une catégorie où la confiance prime.

**Risque principal.** La **qualification réglementaire (MDR, règle 11)** n'est pas tranchée. C'est le seul risque capable d'arrêter la distribution. L'app est déjà live, donc ce n'est pas une urgence de retrait, mais une **note de qualification d'un cabinet spécialisé est obligatoire**, et certaines formulations (« signal de sécurité », « éprouvé sur le terrain », « Précision ») sont à geler d'ici l'avis.

**Opportunité principale.** Une **niche premium francophone inoccupée** : concentrer acquisition, avis et contenu sur la francophonie (où l'app tient sa promesse et où le calcul de débit est un sujet d'apprentissage IFSI récurrent), amorcer une preuve sociale crédible, PUIS localiser l'app en anglais (v1.1) avant tout push international.

**Recommandation stratégique centrale.** Ne rien refondre. **Fiabiliser (bug notif), amorcer la preuve (avis in-app), clarifier les 5 premières secondes (testé, pas à l'aveugle)**, sécuriser le socle juridique/réglementaire, et instrumenter la mesure via App Store Connect **sans trahir « zéro donnée »**. Le produit est prêt à convertir une fois ces blocages levés.

---

## 2. Scorecard

| Domaine | Note /100 |
|---|---|
| Compréhension (<5s) | 58 |
| Conversion (site) | 68 |
| UX / UI | 74 |
| Copywriting | 82 |
| Confiance | 63 |
| Offre & pricing | 78 |
| App Store | 68 |
| SEO | 62 |
| Technique / performance | 88 |
| Accessibilité | 68 |
| Juridique | 74 |
| Positionnement | 70 |
| Rétention | 68 |
| Analytics | 22 (état pré-lancement) |

**Note globale : ~67/100.** **Maturité : « lancé, crédible, bien conçu — mais pas encore optimisé pour convertir ».** Interprétation : le socle de craft est excellent (rare à ce stade) ; l'écart au potentiel tient à quelques blocages concrets et corrigibles (1 bug produit, clarté d'entrée, preuve sociale, mesure, conformité abonnement), pas à une faiblesse structurelle. Le 22 de l'analytics est un **état** (pas d'instrumentation, trafic nul), pas un défaut de qualité : il se résout dès la mise en place du funnel App Store Connect.

---

## 3. Forces à conserver (ne pas dégrader)

| Force | Valeur utilisateur | Valeur de marque | Risque si supprimée |
|---|---|---|---|
| Démos interactives (calculateur, calage, tap) | Essayer avant de télécharger | Preuve de sérieux et de craft | Perte du meilleur outil de conversion |
| Hero WebGL + scrollytelling | Impression premium immédiate | Différenciateur d'exécution | Banalisation, alignement sur la concurrence |
| Copy 82/100 (triade Calculez/Calez/Continuez, douleurs terrain) | Reconnaissance « c'est fait pour moi » | Mémorisation, voix distincte | Retour à un discours générique |
| « Zéro donnée », « alarme de fin jamais payante » | Confiance, sécurité | Positionnement éthique unique | Effondrement de l'argument différenciant #1 |
| Refus dose/posologie/patient/pub | Sécurité réglementaire et clinique | Sérieux professionnel | Exposition MDR + perte de crédibilité |
| Ingénierie site (0 dépendance, WebGL bridé, hreflang/JSON-LD propres) | Rapidité, robustesse | Qualité durable | Dette technique, perf, SEO |
| Frontière freemium naturelle (Apple Watch = Pro ; pause gratuite) | Gratuit réellement utile | Confiance freemium | Soupçon « paywall-piège » |

---

## 4. Problèmes critiques (P0 → P3)

### P0 — bloque ou menace fortement (6)

- **[Produit] Échec silencieux de la permission notification.** `dropp-native` (LocalNotificationScheduler + AppState) : la permission n'est ni amorcée ni rattrapée. **Impact critique** : l'alarme de fin — promesse gratuite centrale — peut ne jamais sonner. Reco : écran d'amorçage de valeur avant la 1re demande + détection permanente du statut + bandeau de rattrapage (« Notifications désactivées — l'alarme ne sonnera pas. Activer »). Effort <2h. Confiance élevée (vérifié Red Team). *À reproduire sur device.*
- **[ASO] Langue déclarée « Anglais » alors que l'app est 100 % française.** Fiche App Store. Un anglophone télécharge une app en français. Reco : déclarer **Français** comme langue principale (retirer EN tant que le binaire EN n'existe pas). Effort <30min.
- **[Juridique] Qualification MDR non tranchée** (élevée en P0, cf. arbitrage). Reco : note de qualification (règle 11 / MDCG 2019-11) par un cabinet ; geler « signal de sécurité »/« éprouvé sur le terrain »/« Précision » d'ici là. Ne bloque pas l'app live mais gate la montée en charge.
- **[Analytics] Attribution site→App Store cassée** : CTA en URL nue, sans token `ct`. Reco : `?ct=site_hero|site_pricing|site_badge`, lisibles dans App Store Connect > App Analytics. Zéro cookie/JS/collecte. Effort <2h.
- **[Analytics] App Store Connect non structuré en source de vérité** : pas de funnel ni tableau de bord. Reco : formaliser le funnel 10 étapes + dashboard hebdo 1 page maintenant (pré-trafic). Effort <1j.
- **[CRO] Hero ne dit ni QUOI ni POUR QUI en <5s** (P0 conditionnel — à valider par test, cf. arbitrage Red Team). Le mot « perfusion » et le public « infirmiers/IDE » sont absents du hero. Reco : **tester** (5-8 soignants + PPO), appliquer si ≥2/5 échouent.

### P1 — impact majeur (33)

Regroupés (détail dans le CSV) : preuve sociale absente + aucun prompt d'avis (dédup en 1 action) ; 9 sections sans CTA App Store (dont le calculateur) ; scrollytelling 420svh qui retarde la valeur ; nom App Store sous-exploité (5/30) + captures à réordonner (bénéfice d'abord) ; autorité créateur-soignant sous-exploitée ; conditions d'abonnement + EULA absents du site ; renouvellement auto non mentionné ; nom de l'entrepreneur absent des mentions légales ; contrastes sous AA (disclaimer clinique 1.59:1, micro-libellés `--soft` 2.30:1) ; title/H1 sans mot-clé ; app FR-only vs ambition internationale ; prix en € figés dans 14 langues ; annuel/essai non valorisés ; méthode de calcul non exposée ; « la cadence au poignet » copiable (OnDrip le fait déjà) ; écart de prix avec l'ancre de catégorie [NV].

### P2 (39) et P3 (23)

Détail complet dans `docs/audit-dropp-actions.csv`. Points notables P2 : header/CTA collant (à tester), sous-titre App Store abstrait, JSON-LD FAQPage manquant, vidéo film qui tente le son + risque CLS, dark mode (déprioritisé), distinction iPhone-gratuit/Watch-Pro implicite.

---

## 5. Top 20 des actions

Voir le tableau complet et arbitré dans **`docs/audit-agents/14-synthese-priorisation.md`** (rang, action, domaine, impact, effort, risque, dépendances, responsable, résultat attendu). Résumé du haut du classement :

1. Corriger l'échec silencieux de la permission notif (app).
2. Prompt d'avis in-app après N fins réussies.
3. Langue App Store EN → FR.
4. Tokens `ct` sur les 3 CTA.
5. Note de qualification MDR + gel de la copy médicale.
6. Conditions d'abonnement + lien EULA sur le site.
7. Nommer l'entrepreneur dans les mentions légales.
8. Nom d'affichage développeur App Store.
9. Contrastes AA (disclaimer + micro-libellés).
10. Tester la clarté du hero, appliquer si le test échoue.

(11→20 : CTA post-calculateur, metadata ASO déployée, captures, bloc créateur-soignant, bloc « Comment Dropp calcule », funnel+dashboard, localisation EN app, widget+shortcut, présentation prix, cohérence copy.)

---

## 6. Quick wins

- **< 30 min** : langue ASC (FR), nom éditeur (mentions légales), nom dév ASC, dernier bouton → App Store, « donne » → « bat la cadence », aligner « Été 2026 », `focus-visible` rouleaux, `loading=lazy` appicon.
- **< 2 h** : bug notif, avis in-app, tokens `ct`, conditions abonnement + EULA, contrastes AA, CTA post-calculateur, bloc créateur, bloc formule, cohérence copy, FAQPage JSON-LD, film muet par défaut.
- **< 1 j** : test hero + PPO, funnel + dashboard, présentation prix, déploiement metadata ASC, test réduction scrollytelling.
- **< 1 sem** : captures App Store, widget + shortcut, page-outil SEO pilote, protocole test utilisateurs.

---

## 7. Recommandations de copywriting (textes finaux)

- **Hero — clarté fonction+public (à tester)** : sur-titre `Calcul de débit de perfusion — pour infirmiers et étudiants IDE`, ou sub reformulé `Pour les soignants : volume et durée, Dropp calcule le débit en gouttes/min, bat la cadence et prévient à la fin.`
- **Accroche App Store (éviter « convertisseur »)** : `Dropp bat le rythme de vos perfusions : débit calculé, cadence au poignet, alerte à la fin. Gratuit, sans compte ni donnée.`
- **Section Pro (valeur, pas thème)** : titre `Pro : tout ce qui veille pendant que vous soignez.` sous-titre `L'Apple Watch complète, plusieurs perfusions à la fois, des alertes qui ne dorment pas.`
- **Bloc créateur-soignant (au-dessus des tarifs)** : `Dropp est né au chevet, pas devant un tableur. Infirmier, j'ai recalculé une fois de trop la même formule entre deux sonnettes.`
- **Bloc « Comment Dropp calcule »** : `Débit (gtt/min) = Volume (mL) × Facteur (gtt/mL) ÷ Durée (min). Facteur selon le perfuseur : 10, 15, 20 ou 60. Dropp arrondit à la goutte près et refuse toute valeur hors plage plausible.`
- **Conditions d'abonnement (sous les prix)** : `Abonnement à renouvellement automatique, résiliable à tout moment dans les réglages de votre compte Apple au moins 24 h avant l'échéance. L'essai de 7 jours se poursuit en abonnement annuel sauf résiliation avant son terme.`
- **Cohérence** : « bat la cadence » partout ; « Dropp » en casse titre dans le texte courant (DROPP réservé au wordmark) ; retirer la contradiction « Été 2026 » / « Disponible ».
- **Sous connotation MDR (geler jusqu'à l'avis)** : `freeNote` → `L'alarme de fin est un repère essentiel : elle ne sera jamais payante.` ; byline → `Conçu par un soignant, pensé pour le terrain.`

---

## 8. Recommandations de design

- **À ajouter** : CTA App Store après le calculateur ; bloc créateur-soignant ; bloc formule ; note d'abonnement ; en-tête/CTA collant discret (à **tester**, pas déployer d'office).
- **À déplacer** : rappel « ce que vous obtenez gratuitement » avant les 5 sections Pro ; colonne Gratuit avant Pro sur mobile (à tester).
- **À réduire** : longueur du scrollytelling (420→~220svh, à tester) ; auto-play du film (muet par défaut, respecter reduced-motion).
- **À corriger** : contrastes AA (disclaimer, micro-libellés, notes) ; `focus-visible` sur les rouleaux ; `aspect-ratio` du film (CLS).
- **À conserver** : le WebGL, les démos, le parti pris ivoire premium, `prefers-reduced-motion` de bout en bout.
- **À déprioriser** : dark mode du site (exiger un signal d'abord).

---

## 9. Structure de page recommandée

| Section | Objectif | Message | Visuel | CTA | Objection traitée |
|---|---|---|---|---|---|
| Hero | Comprendre + agir | Fonction + public + gratuité | WebGL + wordmark | Télécharger gratuitement | « c'est quoi / pour qui » |
| Démo 15s | Montrer le geste | Tout d'un regard | Vignettes SVG | — | « ça sert à quoi » |
| Douleurs | S'identifier | « Vous connaissez ce moment » | — | — | « c'est pour moi ? » |
| 3 gestes (interactif) | Essayer | Calculez/Calez/Continuez | Démos live | **CTA App Store** | « est-ce que ça marche » |
| Rappel gratuit | Rassurer | « Tout ça est gratuit » | — | — | « ça va être payant » |
| Bloc Pro | Monter en gamme | « Ce qui veille pour vous » | Graphite (preuve) | — | « pourquoi payer » |
| Créateur | Crédibiliser | « Conçu par un soignant » | Portrait/citation | — | « qui est derrière » |
| Formule + Confiance | Autorité + réassurance | Calcul transparent + zéro donnée | — | — | « c'est juste ? mes données ? » |
| Tarifs | Décider | Annuel « meilleure valeur » + à vie | Tableau clair | Télécharger gratuitement | « combien, comment résilier » |
| FAQ | Lever le reste | Abonnement, hors-ligne, versions | — | — | objections résiduelles |
| Closing | Convertir | « Disponible sur l'App Store » | Badge | **Télécharger** (pas « revoir ») | dernière hésitation |

---

## 10. Recommandations App Store

- **Nom** : `Dropp — Débit de perfusion` (26/30) — capte « débit » + « perfusion » dans le champ le plus fort.
- **Sous-titre** : `Calcul gouttes/min & tempo` (26/30) ou `Gouttes/min, calcul & alarme` (28/30).
- **Texte promo** : garder la version live (bonne), ou tester l'accroche « rythme » (section 7).
- **Description** : 1re ligne = cadre créateur-soignant + fonction + gratuité, puis blocs (calcul, rythme/tempo, alarme de fin, Apple Watch Pro, perfusions simultanées, confidentialité). Renseigner « Nouveautés ».
- **Ordre des captures** : Rythme (scène qui bat + gros « 42 gtt/min ») → Calcul → Alarme de fin → Apple Watch → Perfusions simultanées → Confiance. 1re capture avec légende bénéfice : « Le débit calculé. Le rythme sous vos yeux. »
- **Mots-clés** (jamais « dose »/« posologie ») : `gouttes,gtt,ml/h,infirmier,infirmière,IDE,IDEL,IFSI,ESI,minuteur,perfuseur,soins,libéral,domicile`.
- **Avis** : `requestReview()` in-app après N fins réussies + amorçage manuel via 10-15 testeurs TestFlight FR.
- **Nom d'affichage développeur** : `Dropp` ou `Tony Domineaux` (pas le nom légal en capitales).
- **Localisation** : FR déclarée maintenant ; EN quand le binaire sera localisé (v1.1) ; concentrer d'abord la francophonie.

---

## 11. Recommandations juridiques

> Analyse **indicative**, pas un avis juridique. Détail : `docs/audit-agents/09-juridique-reglementaire.md`.

- **Indispensables** : nommer l'entrepreneur individuel (éditeur + directeur de publication, LCEN) ; publier les conditions d'abonnement (renouvellement auto, essai, résiliation, gestion App Store) ; ajouter un lien vers l'EULA.
- **Recommandées** : mention du droit de rétractation / remboursement Apple ; phrase de prudence sur les logs techniques de l'hébergeur (GitHub, USA) ; sécuriser « prix de lancement » (date de fin ou retrait).
- **À vérifier avec un juriste (obligatoire)** : **qualification MDR (règle 11)** — commander une note de qualification. Gate business.
- **Formulations à geler d'ici l'avis MDR** : « signal de sécurité », « éprouvé sur le terrain », « Précision », « refuse un tempo absurde ». Verrouiller une **phrase de destination unique** : « Dropp est un outil d'aide au calcul, au rythme et au suivi destiné aux professionnels de santé. Il n'est pas un dispositif médical. »

---

## 12. Roadmap

Détaillée dans `docs/audit-agents/14-synthese-priorisation.md`. Quatre phases : **1. Lever les blocages** (bug notif, langue, tokens ct, note MDR, conformité abonnement) → **2. Convertir** (avis, hero testé, CTA post-calculateur, ASO, prix, dashboard) → **3. Confiance & rétention** (créateur, formule, widget/shortcut, premiers avis, contrastes) → **4. Référence de catégorie** (app EN puis ES/DE/IT, SEO validé, expansion mesurée).

---

## 13. Backlog technique

Détail : `docs/audit-agents/08-seo-technique-performance.md` et `10-produit-retention.md`. Extraits (fichier · problème · correction · risque · critère) :

- `dropp-native/…/LocalNotificationScheduler.swift` + `AppState.swift` · permission notif non amorcée/rattrapée · amorçage + détection statut + bandeau · risque faible · critère : alarme reçoit après refus→réautorisation.
- `src/templates/home.html` (title/H1) · aucun mot-clé cible · `<title>` + `<h1>` sémantique enrichis · risque nul · critère : « calcul débit perfusion » dans le title.
- `scripts/build.js` · FAQPage JSON-LD absent · générer depuis `home.faq.*` · risque nul · critère : rich result FAQ valide.
- `home.html:922-929` · film auto-play avec son + pas de dimensions (CLS) · muet par défaut + `aspect-ratio` · risque faible · critère : CLS ≈ 0, pas de son non sollicité.
- `home.html` (rouleaux) · `focus-visible` incohérent · `[role=slider]:focus-visible{outline…}` · risque nul · critère : focus visible au clavier.
- CSS footer/`--soft` · contrastes < AA · `--body` mini, disclaimer en `--ink` · risque nul · critère : ratios ≥ 4.5:1.
- `site.config.json:4` (URL App Store) · pas de token `ct` · ajouter `?ct=…` par CTA · risque nul · critère : campagnes visibles dans App Analytics.

---

## 14. Plan d'expérimentation (10 expériences, 8 semaines)

> Ne rien lancer avant les **tokens `ct`** (attribution). Détail : `docs/audit-agents/12-analytics-experimentation.md`.

1. **Test modéré 5-8 soignants** (voix haute) : « en 20 s, à quoi sert l'app et pour qui » → valide/invalide le P0 hero. Décision : réécrire si ≥2/5 échouent.
2. **PPO 1re capture** : actuelle vs « résultat 42 gtt/min plein écran ». Métrique : vue→download.
3. **PPO sous-titre** : « Rythme de perfusion » vs « Calcul gouttes/min & tempo ». Métrique : vue→download.
4. **A/B hero clarté** (site, ct-tracké) : hero actuel vs hero + ligne fonction/public. Métrique : conversion vers App Store.
5. **A/B CTA post-calculateur** : sans vs avec. Métrique : clics App Store attribués.
6. **A/B présentation prix** : bloc actuel vs annuel « meilleure valeur » + essai en CTA. Métrique : clics App Store depuis Tarifs.
7. **A/B barre CTA collante** (après ct) : contrôle vs sticky discret. Métrique : downloads par `ct`.
8. **Test prix par storefront** (paliers à vie) : valider l'écart d'ancre par la conversion réelle, pas l'intuition.
9. **A/B ordre des colonnes tarifs** (Gratuit d'abord) sur mobile. Métrique : vue→download.
10. **A/B réduction scrollytelling** (420 vs 220svh) : taux de scroll jusqu'à `#demo` + conversion.

Chaque test : hypothèse, A, B, métrique unique, risque, volume minimal raisonnable, décision.

---

## 15. Verdict final

- **Dropp est-il prêt à convertir efficacement ?** Presque. Le socle est là ; il faut lever 3 blocages (bug notif, clarté <5s testée, preuve sociale) et poser l'attribution. Une fois faits, oui.
- **Le produit paraît-il fiable ?** Visuellement et éthiquement, oui (parmi les plus crédibles de la catégorie). Techniquement, un bug critique (notif) fragilise la promesse centrale — à corriger en priorité. Cliniquement, l'autorité (créateur-soignant, méthode) est réelle mais sous-exploitée.
- **L'abonnement est-il assez clair ?** Non côté site : conditions et renouvellement absents. À combler (conformité + confiance).
- **Le site reflète-t-il la qualité de l'app ?** Oui, largement — c'est même l'inverse du problème habituel : le site est excellent, il sur-vend peut-être un produit encore jeune (0 avis, app FR-only). L'enjeu est de faire monter le produit au niveau du site (localisation, preuve, fiabilité).
- **La fiche App Store valorise-t-elle assez le produit ?** Partiellement. Nom sous-exploité, langue incohérente, captures et description à optimiser, développeur affiché froid. Gains faciles disponibles.
- **Les 3 changements à plus fort impact** : (1) corriger l'échec silencieux de la notification (fiabilité), (2) prompt d'avis in-app après une fin réussie (preuve sociale), (3) clarifier la fiche (langue FR + nom + captures) et le hero (testé) — auxquels s'ajoute le socle non négociable : **note de qualification MDR**.
- **Dropp peut-il devenir une référence ?** Oui, mais dans un couloir précis : **la référence premium francophone du calcul + suivi de perfusion**, portée par l'exécution, l'auteur-soignant et l'éthique « zéro donnée ». **À conditions** : fiabiliser le produit, amorcer la preuve sociale, sécuriser le réglementaire, localiser l'app avant l'international, et **ne pas** se banaliser en « simple calculateur » ni copier les fonctions à risque (dose, patient, pub) des concurrents.
