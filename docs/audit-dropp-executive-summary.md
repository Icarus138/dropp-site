# Dropp — Résumé exécutif de l'audit

*Lecture 5 min. Détail : `audit-dropp-complet.md` · actions : `audit-dropp-actions.csv` · preuves : `audit-agents/`.*

## En une phrase

**Un produit exceptionnellement bien exécuté pour un lancement, freiné par un bug produit, un déficit de clarté dans les 5 premières secondes, zéro preuve sociale et un socle juridique/réglementaire incomplet — tout est corrigible, rien n'est à refondre.**

## Note globale : ~67/100 — « lancé, crédible, bien conçu, pas encore optimisé pour convertir »

## Les 5 forces à protéger

1. **Démos interactives** — le visiteur essaie le produit avant de télécharger (meilleur atout de conversion).
2. **Craft premium** — hero WebGL + scrollytelling, au-dessus de toute la concurrence directe.
3. **Copy 82/100** — Calculez/Calez/Continuez, douleurs terrain, voix distincte.
4. **Éthique vérifiée** — « zéro donnée » (dans le code), « l'alarme de fin ne sera jamais payante ».
5. **Ingénierie du site 88/100** — 0 dépendance, WebGL bridé, SEO technique propre, 14 langues.

## Les 10 problèmes prioritaires

1. **P0 — bug notif** : la permission n'est ni demandée ni rattrapée → l'alarme de fin (promesse gratuite) peut échouer en silence (app).
2. **P0 — langue App Store « Anglais »** alors que l'app est 100 % française → à passer en Français.
3. **P0 — qualification MDR non tranchée** → note d'un cabinet obligatoire ; geler la copy médicale.
4. **P0 — attribution cassée** : CTA en URL nue → poser des tokens `ct` (sans cookie).
5. **P0 — pas de source de vérité** : App Store Connect non structuré → funnel + dashboard 1 page.
6. **P0/conditionnel — hero flou <5s** : ni la fonction ni le public nommés → tester puis corriger.
7. **P1 — zéro preuve sociale + aucun prompt d'avis** → `requestReview()` après une fin réussie.
8. **P1 — conditions d'abonnement + EULA absents** du site → conformité conso + confiance.
9. **P1 — contrastes < AA** (disclaimer clinique 1.59:1, micro-libellés 2.30:1) → passer en `--body`/`--ink`.
10. **P1 — app FR-only vs ambition internationale** → localiser l'app (EN v1.1) avant tout push.

## Les 10 quick wins

- Langue App Store → **Français** (<30min)
- Nommer l'entrepreneur dans les **mentions légales** (<30min)
- **Nom d'affichage développeur** App Store (pas « TONY KEVIN DOMINEAUX ») (<30min)
- Dernier bouton de la page → **App Store** (au lieu de « revoir ») (<30min)
- Tokens **`ct`** sur les 3 CTA (<2h)
- **Contrastes AA** (disclaimer + micro-libellés) (<2h)
- **CTA App Store après le calculateur** (<2h)
- Note **conditions d'abonnement** + lien EULA (<2h)
- Bloc **« Comment Dropp calcule »** (formule) (<2h)
- **Cohérence copy** (« bat la cadence », casse Dropp, retirer « Été 2026 » contradictoire) (<2h)

## Les 3 recommandations stratégiques

1. **Fiabiliser puis prouver.** Corriger le bug notif, brancher le prompt d'avis in-app, et instrumenter la mesure via App Store Connect **sans trahir « zéro donnée »**. On ne peut pas optimiser ce qu'on ne mesure pas, ni convertir sur une promesse (l'alarme) qui peut échouer.
2. **Tête de pont francophone premium.** Concentrer acquisition, contenu et avis sur la francophonie (où l'app tient sa promesse), amorcer une preuve sociale crédible, **puis** localiser l'app (EN) avant l'international. Le site 14 langues draine aujourd'hui un trafic qui aboutit à une app FR-only.
3. **Rester « aide au calcul et au suivi », jamais dispositif médical ni simple calculateur.** Sécuriser le réglementaire (note MDR, geler la copy médicale), et défendre le moat par l'exécution + l'auteur-soignant + l'éthique — pas par la fonction « tempo au poignet » (déjà copiée). Ne pas copier dose/patient/pub des concurrents.

## Verdict

Dropp **peut devenir la référence premium francophone du calcul et du suivi de perfusion**. À condition de fiabiliser le produit, d'amorcer la preuve, de sécuriser le juridique/réglementaire et de localiser l'app avant d'ouvrir l'international. Le plus dur (le craft, l'éthique, la voix) est déjà fait.
