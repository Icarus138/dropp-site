# Agent 14 — Synthèse & priorisation

Consolidation des 12 rapports + Red Team. Dédoublonnage, arbitrage des contradictions, re-priorisation.

## Arbitrages clés (contradictions tranchées)

1. **Qualification MDR = P0 réel (pas P2).** La Red Team a raison contre l'agent 09 : c'est le seul risque qui peut **arrêter la distribution**. Nuance importante : l'app est **déjà approuvée et live**, donc ce n'est pas un « retirer maintenant » mais **« commander une note de qualification (règle 11 MDR / MDCG 2019-11) à un cabinet spécialisé, et geler les changements de copy à connotation médicale d'ici là »**. Ne pas amputer « Précision »/« signal de sécurité » à l'aveugle avant l'avis (réversible mais autant décider une fois).

2. **« 0 avis » : un seul problème, pas cinq.** Les agents 05, 07, 10, 11, 12 ont chacun listé l'absence d'avis. Dédoublonné en **une action** : `requestReview()` in-app déclenché après **N fins de perfusion réussies** (jamais après un échec ni derrière le paywall). C'est un **état de lancement**, pas un défaut de qualité — juger ensuite au volume.

3. **« Le hero doit nommer la fonction + le public » (agent 02 P0) : hypothèse forte, à valider avant réécriture aveugle** (Red Team). La confiance est « élevée » côté CRO, mais le test est **cheap** : protocole 5-8 soignants (agent 12) « en 20 s, dites à quoi sert l'app et pour qui » + App Store Product Page Optimization sur la 1re capture. Règle : corriger si ≥ 2/5 échouent. Reste haut dans le Top 20 mais en **« tester puis appliquer »**.

4. **CTA collant / header persistant (agents 02, 03) : playbook générique, à tester, pas à déployer sur intuition** (Red Team). Dépend d'abord des tokens `ct` pour être mesurable. Rétrogradé en expérimentation.

5. **Arbre de contenu SEO (agent 08) vs positionnement (agent 11).** Tension réelle : bâtir des pages « calcul débit perfusion » attire du trafic mais banalise (« simple calculateur »). Trancher par **une page-outil pilote FR ct-trackée** ; n'étendre que si le download attribué est réel.

6. **Dark mode du site (agent 03 P2) : effort > 1 sem sur une hypothèse non testée.** Déprioritisé : exiger un signal (part de visites nocturnes, verbatims) avant le chantier. Le parti pris ivoire premium est cohérent et assumé.

7. **Scores pré-lancement ≠ défauts de qualité.** Le 22/100 de l'analytics reflète un **état** (pas encore instrumenté, trafic nul) qui se résout, pas un défaut. Ne pas le moyenner naïvement dans une lecture alarmiste. Re-scorer 30 j après le lancement public.

## Forces à protéger (ne pas dégrader)

- **Craft premium** : hero WebGL + scrollytelling + **démos interactives** (le visiteur essaie avant de télécharger). Actif de conversion supérieur à toute capture.
- **Copy 82/100** : triade Calculez/Calez/Continuez, tagline émotionnelle, douleurs terrain spécifiques, signature « Rythme · Précision · Soin ».
- **Éthique irréprochable** : « l'alarme de fin ne sera jamais payante », « zéro donnée » (vérifié dans le code), refus dose/posologie/patient/pub.
- **Ingénierie du site 88/100** : 0 dépendance, 0 police externe, WebGL bridé (IntersectionObserver), hreflang/canonical/OG/JSON-LD propres.
- **Frontière freemium naturelle** : l'Apple Watch comme objet payant, la pause de perfusion gratuite.

## Top 20 (après arbitrage)

| # | Action | Domaine | Impact | Effort | Risque | Dépend | Responsable | Résultat attendu |
|---|--------|---------|--------|--------|--------|--------|-------------|------------------|
| 1 | Corriger l'échec silencieux de la permission notif (amorçage + rattrapage) | Produit (app) | critique | <2h | faible | — | iOS | L'alarme de fin (promesse gratuite) sonne réellement ; hook de rétention protégé |
| 2 | Prompt d'avis in-app après N fins réussies (`requestReview`) | Produit/Confiance | important | <2h | faible | — | iOS | Amorçage de preuve sociale ; dédup du « 0 avis » |
| 3 | Corriger la langue déclarée App Store : EN → **Français** | ASO | critique | <30min | faible | — | ASC | Fin de l'incohérence « app FR déclarée EN » |
| 4 | Poser des tokens `ct` par CTA (hero/tarifs/badge) | Analytics | important | <2h | nul | — | Web | Attribution site→install sans cookie ni JS |
| 5 | Commander une **note de qualification MDR** + geler la copy médicale | Juridique | critique | >1sem | — | juriste | Fondateur+juriste | Sécurise la distribution ; décision réglementaire éclairée |
| 6 | Publier les **conditions d'abonnement** + lien EULA (renouvellement auto, résiliation, essai) | Juridique/Pricing | important | <2h | faible | 5 | Web+juriste | Conformité conso UE + levée d'objection |
| 7 | Nommer l'entrepreneur individuel dans les mentions légales (LCEN) | Juridique | important | <30min | nul | — | Web | Conformité éditeur personne physique |
| 8 | Nom d'affichage développeur App Store (Dropp / Tony Domineaux) | ASO/Confiance | important | <30min | faible | — | ASC | Fin du « TONY KEVIN DOMINEAUX » froid |
| 9 | Contraste AA : disclaimer clinique (1.59:1) + micro-libellés `--soft` (2.30:1) | Accessibilité | important | <2h | nul | — | Web | Lisibilité + conformité WCAG AA |
| 10 | **Tester** la clarté du hero (fonction + public) via test 5-8 soignants + PPO ; appliquer si ≥2/5 échouent | CRO | critique | <2h (test) | faible | 4 | Product | Compréhension <5s validée par la donnée, pas l'intuition |
| 11 | CTA App Store juste après le calculateur/la démo | CRO | important | <2h | faible | 4 | Web | Capter le pic d'intention (9 sections sans CTA) |
| 12 | Déployer nom/sous-titre/mots-clés App Store affinés (v1.1 metadata) | ASO | important | <2h | faible | — | ASC | « Dropp — Débit de perfusion » + sous-titre porteur de requêtes |
| 13 | Captures App Store : ordre bénéfice-d'abord + légendes | ASO | important | <1sem | faible | — | Design | 1re capture = valeur en 1s ; taux vue→download |
| 14 | Exploiter l'autorité créateur-soignant (bloc site + 1re ligne description) | Confiance | important | <2h | faible | — | Copy | Le levier de confiance le plus fort, aujourd'hui sous-exploité |
| 15 | Bloc « Comment Dropp calcule » (formule, facteur, arrondi, garde-fou) | Confiance | modéré | <2h | faible | 5 | Web | Autorité clinique ; différencie d'un calculateur opaque |
| 16 | Formaliser le funnel 10 étapes + tableau de bord hebdo 1 page (App Store Connect, sans SDK) | Analytics | important | <1j | nul | — | Fondateur | Pilotage réel sans trahir « zéro donnée » |
| 17 | Prioriser la **localisation EN de l'app** (String Catalog) avant tout push international | Produit/Marché | important | >1sem | modéré | — | iOS | Cohérence site 14 langues ↔ app ; ouverture anglophone |
| 18 | Widget + App Shortcut « Nouvelle perfusion » **gratuits** | Produit/Rétention | modéré | <1sem | faible | — | iOS | Habitude à faible friction (moteur de conversion Pro) |
| 19 | Refondre la présentation des prix (annuel « meilleure valeur », essai = verbe du CTA, € non figé hors zone €) | Pricing | modéré | <1j | faible | — | Web | Valorise l'annuel/essai ; corrige le mismatch international |
| 20 | Uniformiser la copy (« bat la cadence » partout, casse Dropp, « Été 2026 »↔« Disponible ») | Copy | faible | <2h | nul | — | Copy | Cohérence de marque sur 14 langues |

## Quick wins (par effort)

**< 30 min** : #3 (langue ASC), #7 (nom éditeur mentions légales), #8 (nom dév ASC), dernier bouton page → App Store (au lieu de `#demo`), « donne la cadence » → « bat la cadence », retirer/aligner « Été 2026 », `focus-visible` sur les rouleaux, `loading=lazy` sur l'appicon.

**< 2 h** : #1 (bug notif), #2 (avis in-app), #4 (tokens ct), #6 (conditions abonnement + EULA), #9 (contrastes AA), #11 (CTA post-calculateur), #14 (bloc créateur-soignant), #15 (bloc formule), #20 (cohérence copy), FAQPage JSON-LD, vidéo film muette par défaut + `aspect-ratio`.

**< 1 j** : #10 (test hero + PPO), #16 (funnel + dashboard), #19 (présentation prix), déployer #12 (metadata ASC), test réduction scrollytelling (220svh).

**< 1 sem** : #13 (captures), #18 (widget + shortcut), page-outil SEO pilote FR ct-trackée, protocole test utilisateurs (5-8 soignants).

## Roadmap (4 phases)

- **Phase 1 — Lever les blocages** : #1 bug notif, #3 langue, #4 tokens ct, #5 lancer la note MDR, #6-7 conformité abonnement/éditeur. Critère : l'alarme de fin fonctionne à coup sûr ; la fiche est cohérente ; l'attribution existe.
- **Phase 2 — Convertir** : #2 avis, #10 test+clarté hero, #11 CTA post-calculateur, #12-13 ASO, #19 prix, #16 dashboard. Critère : taux vue→download et compréhension <5s mesurés et en hausse.
- **Phase 3 — Confiance & rétention** : #14 créateur, #15 formule, #18 widget/shortcut, premiers avis FR, contrastes. Critère : socle d'avis crédibles ; rétention J7 saine.
- **Phase 4 — Référence de catégorie** : #17 app EN puis ES/DE/IT, SEO pilote→arbre validé, expansion internationale mesurée, éventuel canal établissement/école. Critère : position sur les requêtes cibles ; downloads par territoire.
