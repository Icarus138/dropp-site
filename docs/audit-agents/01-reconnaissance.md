# Agent 1 — Reconnaissance & collecte de preuves

> Base factuelle partagée. Distingue **[FAIT]** (observé/vérifié), **[MESURE]**, **[HYP]** (hypothèse), **[NV]** (non vérifiable ici).

## 1. Écosystème & URLs

- **[FAIT]** Site : https://dropp.care — statique, GitHub Pages (repo `Icarus138/dropp-site`, branche `main`), domaine via CNAME.
- **[FAIT]** Fiche App Store FR : https://apps.apple.com/fr/app/dropp/id6792277373 — App ID `6792277373`.
- **[FAIT]** App native : repo `dropp-native` (SwiftUI, cibles iOS + watchOS).

## 2. Site — architecture technique

- **[FAIT]** 100 % statique, **aucun framework**, **aucune dépendance runtime**. Génération statique maison (Node, 0 dépendance) : `src/templates/*.html` + `locales/{code}/*.json` → 14 langues (`/fr/`…`/zh-tw/`).
- **[FAIT]** **14 langues** : fr en es de it pt-BR pt-PT nl ru ar ja ko zh-CN zh-TW. Détection navigateur à la racine `/`, choix mémorisé (localStorage), UTM préservés. `hreflang` complet + `x-default`, sitemap, Open Graph/Twitter/JSON-LD localisés.
- **[FAIT]** Hero = **WebGL** (shader « LiquidScene », nappe liquide animée) + **scrollytelling** (JS `apply(p)` piloté au scroll) + repli « poster » statique si `prefers-reduced-motion`/no-JS.
- **[FAIT]** Démos **interactives** JS : calculateur à molettes-rouleaux (volume/durée → gtt/min, s/goutte, mL/h ; facteur 20 en démo), calage à la molette (unisson), pad Tap. Runtime i18n inline (`Intl.NumberFormat`/`PluralRules`).
- **[FAIT]** **Bouton hero « Télécharger gratuitement »** (logo Apple, pastille encre, épinglé bas, lien direct App Store) — ajouté récemment, live.
- **[FAIT]** **Aucun analytics, aucun cookie, aucun consentement** (revendiqué et réel : rien dans le code).
- **[FAIT]** Perf : pas de police externe (piles système, dont CJK/arabe dédiées), images PNG/JPG locales, un `dropp-film.mp4` (~1,5 Mo) FR + `dropp-film-en.mp4` (~1,77 Mo) pour les autres langues, poster JPG.

## 3. Site — contenu (ordre des sections, FR)

1. **Hero** : eyebrow « Disponible sur l'App Store » · wordmark « DROPP » · signature « Rythme · Précision · Soin » · tagline « Le rythme au poignet. La tête au soin. » · sub « Volume, durée : DROPP calcule le débit, donne la cadence et vous prévient à la fin. » · maquettes iPhone/Watch (42 gtt/min) · trust « Sans compte · Sans publicité · Données locales » · **bouton Télécharger gratuitement**.
2. **Démo** « En quinze secondes / Tout le geste, d'un regard. » : 6 vignettes SVG animées (saisir → calculer → rythme → caler → suivre → prévenir).
3. **« Vous connaissez ce moment »** : 3 douleurs (formule refaite, molette à l'œil, fins à mémoriser) + « C'est une charge — et DROPP la porte. »
4. **« Trois gestes »** : Calculez / Calez / Continuez — chacun avec démo interactive.
5. **Pro · Apple Watch** « Tout, sans sortir l'iPhone. »
6. **Pro · Double Tap** « Un geste, sans toucher l'écran. » (Watch Series 9+).
7. **Pro · Mode Tap** « Observez une cadence. Tapez-la. Lisez-la. »
8. **Pro · Perfusions simultanées.**
9. **Aperçu Pro** (thème Graphite sombre) : pré-alerte/jalons, alarmes poignet, historique local, scène 3D Premium.
10. **Le film** (vidéo muette autoplay + bouton Son).
11. **Tarifs** « Gratuit et Pro » (2 colonnes).
12. **Confiance** : 3 tenets (aucune donnée transmise, aucun compte/serveur, local & hors-ligne) + disclaimer clinique.
13. **FAQ** (7 questions).
14. **Closing** « Été 2026 / Disponible sur l'App Store. » + badge App Store cliquable + byline « Conçu par un soignant, éprouvé sur le terrain » + CTA « Revoir DROPP en action ».
15. **Footer** : liens Confidentialité / Assistance / Mentions légales + nav 14 langues + disclaimer.

## 4. Offre & prix (site + App Store cohérents)

- **[FAIT]** **Gratuit** : calculs illimités, tempo visuel (écran), une perfusion suivie, alarme de fin (« pour toujours »), sans pub/compte.
- **[FAIT]** **Dropp Pro** (achats intégrés) : app Apple Watch complète, perfusions simultanées, pré-alerte 5 min, rappels adaptatifs, Mode Tap, historique local, thèmes/scènes premium.
- **[FAIT]** Prix : **2,99 €/mois** · **19,99 €/an (essai 7 j)** · **49,99 € à vie**.
- **[FAIT]** CTA site vers App Store : 3 points (bouton hero « Télécharger gratuitement », CTA tarifs « Télécharger sur l'App Store », badge closing) — tous vers `apps.apple.com/app/id6792277373`.

## 5. Fiche App Store (FR) — état observé

- **[FAIT]** Nom : **Dropp**. Sous-titre : **« Rythme de perfusion »**. Catégorie **Médecine**, 4+.
- **[FAIT]** Texte promo : « Dropp, convertisseur de débit : gouttes/min, tempo, alarme de fin — gratuit, sans compte ni donnée. »
- **[FAIT]** Description : calcul gtt/min (volume/durée/facteur 10-15-20-60), scène liquide, alarme de fin, Apple Watch (Pro), perfusions multiples, pré-alerte 5 min, mode tap, historique local, sans donnée/compte.
- **[FAIT]** Gratuit + IAP (2,99/19,99 essai 7 j/49,99). **Développeur : « TONY KEVIN DOMINEAUX »** (nom légal, majuscules, 2ᵉ prénom).
- **[FAIT]** **Langues déclarées : « Anglais »** — INCOHÉRENCE : l'UI de l'app est en français (binaire non localisé, `developmentRegion` = en par défaut). Un utilisateur anglophone téléchargerait une app en français.
- **[FAIT]** **0 avis / 0 note** (« pas assez de notes »). Confidentialité : **« aucune donnée collectée »**. Compatible **iPhone, Apple Watch, Mac (Apple Silicon)**. Taille 3,5 Mo. iOS 17+. « Nouveautés » : absent.
- **[HYP]** App **non indexée** dans la recherche « Dropp » (app neuve, délai d'indexation + 0 download → classement bas). Accessible par lien direct.

## 6. App native (dropp-native)

- **[FAIT]** SwiftUI, **100 % FR codé en dur** : aucun `.lproj`, aucun String Catalog, aucun `NSLocalizedString` (`Text("Perfusion terminée")`…). Non localisée.
- **[FAIT]** Cibles iOS + watchOS. Double Tap watchOS (Series 9+) implémenté. Thème Graphite. Toggles debug en `#if DEBUG` (absents du build Release).
- **[NV]** Onboarding, moment de première valeur, rétention réelle : non audités directement ici (hors périmètre site ; à voir sur device).

## 7. Juridique (pages site)

- **[FAIT]** **Mentions légales** : éditeur = **Dropp, entreprise individuelle** (personne physique) · SIREN 852 769 579 · SIRET …00032 · APE 62.01Z · Collonges-sous-Salève (74). Hébergeur : **GitHub, Inc.** (GitHub Pages). Contact : contact@dropp.care.
- **[FAIT]** **Confidentialité** : « aucune donnée collectée », stockage local iPhone/Watch, sync WatchConnectivity chiffrée Apple, pas de compte/serveur/analytics, achats gérés par App Store. « Ne pas saisir de nom de patient » dans le champ Repère.
- **[FAIT]** **Pas de CGU/CGV dédiées** sur le site, **pas de mentions d'abonnement détaillées** (renouvellement auto, résiliation, rétractation) hors app. EULA = EULA standard Apple (dans la fiche + paywall app).
- **[FAIT]** Disclaimer clinique présent (footer + section Confiance + FAQ) : « outil d'aide, ne remplace ni le jugement clinique, ni les dispositifs de contrôle ».

## 8. Éléments non vérifiables ici / limites

- **[NV]** Core Web Vitals réels terrain (LCP/CLS/INP) — pas de Lighthouse exécuté dans ce run (le WebGL + le film sont les suspects LCP/poids).
- **[NV]** Concurrents App Store exacts (noms, avis, captures) — à investiguer par l'agent concurrence via recherche.
- **[NV]** Comportement onboarding/rétention in-app.
- **[NV]** Positionnement réglementaire définitif (dispositif médical) — avis juriste requis.
