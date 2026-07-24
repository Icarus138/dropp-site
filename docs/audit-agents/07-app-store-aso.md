# Agent 07 — Audit fiche App Store FR & ASO

> Périmètre : fiche https://apps.apple.com/fr/app/dropp/id6792277373 (id `6792277373`).
> Sources : fiche live (WebFetch), `dropp-native/docs/appstore-metadata.md` (brouillon Phase 7), recon `01-reconnaissance.md`, recherche concurrence App Store FR.
> Convention impact : faible / modéré / important / critique. Confiance : élevé / moyen / faible.

---

## 0. Constat central : la fiche LIVE n'utilise PAS la metadata travaillée

Il existe un excellent brouillon dans `dropp-native/docs/appstore-metadata.md` (nom long, sous-titre bénéfice, promo, description structurée, champ mots-clés optimisé à 98/100 car.). **La fiche live ne le reflète pas.** Écarts vérifiés :

| Champ | Live (fiche observée) | Brouillon repo (metadata.md) |
|---|---|---|
| Nom | `Dropp` (5/30 car.) | `Dropp — Rythme de perfusion` (L10) |
| Sous-titre | `Rythme de perfusion` | `Le débit calculé, calé, suivi` (L11) |
| Promo | `Dropp, convertisseur de débit : gouttes/min, tempo, alarme de fin — gratuit, sans compte ni donnée.` | `Prix de lancement sur l'abonnement annuel…` (L24) |

Autrement dit, une bonne partie du travail ASO n'est pas déployée dans App Store Connect. **C'est la première action à mener** avant toute autre optimisation : le potentiel est déjà écrit, il n'est pas branché. (Confiance : élevé — écart direct entre fiche et fichier.)

Je note aussi que le brouillon lui-même est perfectible sur 2 points (nom et promo), détaillés plus bas — donc « déployer le brouillon tel quel » n'est pas la reco finale.

---

## 1. Forces à conserver (ne pas dégrader)

1. **Catégorie Médecine + 4+** : correct, aligné concurrence (Confiance : élevé).
2. **Confidentialité « Aucune donnée collectée »** : label nutrition parfait, différenciant fort face à des apps médicales. À afficher plus visiblement, pas à toucher (Confiance : élevé).
3. **Description brouillon (metadata.md L28-84)** : structurée en blocs capitalisés (LE CALCUL / LE RYTHME / LA FIN / DROPP PRO / CONÇU POUR LA CONFIANCE), paragraphe abonnement conforme 3.1.2c, liens EULA + confidentialité présents. C'est du bon travail, garder la structure (Confiance : élevé).
4. **Garde-fou réglementaire** dans les mots-clés (metadata.md L89 : « Ne PAS ajouter dose/posologie ») : discipline saine, à préserver absolument (Confiance : élevé).
5. **Promo LIVE actuelle** (« convertisseur de débit : gouttes/min, tempo, alarme de fin — gratuit, sans compte ni donnée ») : concrète, dense en bénéfices, mieux que la promo « prix de lancement » du brouillon. Paradoxalement, sur ce champ, le live est supérieur au draft — à conserver (Confiance : moyen).

---

## 2. Paysage concurrentiel App Store FR (calcul débit / perfusion)

| App | Sous-titre | Prix | Notes | Watch | Signal |
|---|---|---|---|---|---|
| **Calculatrice Perfusion Poche** (id1242281549) | « Pompe à Perfusion » | Gratuit | 0 avis | non | Faible finition, description utilitaire |
| **Goutte Infusion** (iLeaf) | « Calculer le débit de perfusion » | 1,99 € | 2 avis / 4,1 | oui | Concurrent le plus proche (Watch + calcul inverse) |
| **CalcuDose** (id1609062237) | calcul ml/h + gtt/min | — | — | non | Générique |
| **L'appli de l'infirmier** | suite | 9,99 € | — | non | Couteau suisse, débit = 1 feature |

Enseignements ASO :
- Le champ concurrentiel est **peu professionnalisé** : sous-titres plats, peu d'avis, aucune identité premium. Dropp peut dominer visuellement (Confiance : moyen).
- **Aucun concurrent ne « bat le tempo »** ni ne pousse l'Apple Watch comme cœur premium. C'est l'angle de différenciation à mettre en 1re capture (Confiance : moyen).
- Le mot **« perfusion »** est présent chez tous les concurrents dans le nom OU sous-titre. Le laisser hors du nom de Dropp (« Dropp » seul) est un désavantage direct de matching (Confiance : élevé).

---

## 3. Problèmes (triés par priorité)

### P0 — Incohérence « Langue : Anglais » vs UI 100 % française
- **Emplacement** : fiche live, bloc « Langues » = `Anglais` ; app native `dropp-native` = SwiftUI FR codé en dur, aucun `.lproj`/String Catalog (recon §6).
- **Observation** : un anglophone télécharge une app entièrement en français. À l'inverse, la fiche FR déclare une langue qui n'est pas la langue réelle du binaire. Risque : avis 1★ « app in French », remboursements, et signal de qualité négatif pour l'algo.
- **Impact** : critique (confiance : élevé).
- **Reco** : dans App Store Connect, déclarer la localisation réelle = **Français** (au minimum ajouter FR ; idéalement retirer EN tant que le binaire n'est pas localisé). Ne pas déclarer une langue non livrée. La localisation EN (fiche + app) est prévue v1.1 : la déclarer seulement quand le binaire EN existe.
- **Effort** : <30min (déclaration ASC). Type : correction.

### P1 — Le champ NOM est sous-exploité (5/30 caractères)
- **Emplacement** : nom live = `Dropp`.
- **Observation** : le nom est le champ ASO le plus lourd. « Dropp » n'a aucune valeur de matching (marque inconnue, 0 download, non indexée — recon §5). Les concurrents captent « perfusion »/« débit » dans leur nom. Dropp gaspille 25 caractères.
- **Impact** : important (confiance : élevé).
- **Reco** : passer à **`Dropp — Débit de perfusion`** (26 car.). Capte « débit » ET « perfusion » dans le champ le plus fort, garde la marque en tête. (Le brouillon L10 propose `Dropp — Rythme de perfusion` : « rythme » est une valeur de recherche quasi nulle en contexte perfusion ; « débit » est le terme réellement tapé par les IDE. Préférer « débit ».)
- **Exemple** : `Dropp — Débit de perfusion`.
- **Effort** : <30min. Type : optimisation.

### P1 — Zéro avis / zéro note, aucune stratégie d'amorçage
- **Emplacement** : fiche live « pas assez de notes » ; 0 avis (recon §5).
- **Observation** : la preuve sociale est le 2e facteur de conversion après la 1re capture. À 0 avis, chaque visiteur doute. Pour une app santé, la confiance est décisive.
- **Impact** : important (confiance : élevé).
- **Reco** : (a) intégrer `SKStoreReviewController` / `requestReview` déclenché après un **moment de valeur** (ex. 3e perfusion menée à terme avec alarme reçue), jamais au lancement ni derrière le paywall ; plafonner à la politique Apple (3/an). (b) Amorçage manuel : solliciter 10-15 IDE/ESI testeurs TestFlight pour un avis FR au jour du lancement public. (c) Ne jamais inciter par récompense (interdit Apple).
- **Effort** : <1j (code + amorçage). Type : experimentation.

### P1 — Ordre et contenu des captures non optimisés / non vérifiables
- **Emplacement** : captures fiche live (contenu texte non extractible ici) ; brouillon L141-143 note « refaire une passe propre, heure 9:41 ».
- **Observation** : la 1re capture décide 80 % de la conversion sur la page de résultats. Impossible ici de confirmer qu'elle porte un bénéfice + texte intégré fort. Le risque d'une 1re capture « écran brut sans légende » est réel pour une app faite par un solo-dev.
- **Impact** : important (confiance : moyen — contenu exact non vérifié).
- **Reco** : ordre + texte intégré recommandé (voir §4 détaillé). 1re capture = la scène liquide qui bat + gros chiffre `42 gtt/min` + légende bénéfice « Le débit calculé. Le rythme sous vos yeux. ». Toujours une légende courte incrustée en haut, jamais l'écran nu.
- **Effort** : <1sem (design captures). Type : optimisation.

### P2 — Sous-titre « Rythme de perfusion » : abstrait, peu de matching
- **Emplacement** : sous-titre live `Rythme de perfusion` (19 car.).
- **Observation** : « rythme » n'est pas un terme de recherche IDE. Si le nom devient « Dropp — Débit de perfusion » (P1), le sous-titre doit capter d'AUTRES mots-clés (gtt/min, calcul, infirmier), pas répéter « perfusion ».
- **Impact** : modéré (confiance : moyen).
- **Reco** : sous-titre = **`Calcul gouttes/min & tempo`** (26 car.) ou **`Gouttes/min, calcul & alarme`** (28 car.). Capte « gouttes/min », « calcul », « alarme » non couverts par le nom. Éviter de re-mettre « perfusion » (déjà dans le nom = gaspillage). Testé sous 30 car. : oui.
- **Exemple** : nom `Dropp — Débit de perfusion` + sous-titre `Calcul gouttes/min & tempo`.
- **Effort** : <30min. Type : optimisation.

### P2 — Nom développeur affiché « TONY KEVIN DOMINEAUX »
- **Emplacement** : fiche live, développeur = `TONY KEVIN DOMINEAUX` (nom légal, majuscules, 2e prénom — recon §5).
- **Observation** : capitales + 2e prénom = amateur, casse la promesse « premium » et « conçu par un soignant ». Pour une app santé, un nom d'éditeur soigné rassure.
- **Impact** : modéré (confiance : élevé).
- **Reco** : renseigner un **nom d'affichage** propre dans App Store Connect (ex. `Dropp` ou `Tony Domineaux`). Le nom légal reste privé côté Apple ; l'affiché est éditable. Cohérent avec l'entreprise individuelle « Dropp » des mentions légales.
- **Effort** : <30min (peut nécessiter validation Apple). Type : correction.

### P2 — Promo du brouillon inférieure à la promo live
- **Emplacement** : brouillon L24 « Prix de lancement sur l'abonnement annuel… ».
- **Observation** : si on déploie le brouillon tel quel, on remplacerait une promo dense en bénéfices (live) par une promo qui ouvre sur un argument prix — moins vendeur pour un premier contact, et « prix de lancement » vieillit mal.
- **Impact** : modéré (confiance : moyen).
- **Reco** : garder l'esprit de la promo LIVE. Version affinée (170 car.) : `Volume, durée : Dropp calcule le débit en gouttes/min, bat le tempo sous vos yeux et au poignet, et vous prévient à la fin. Sans compte, sans donnée.` Réserver l'argument prix aux captures/tarifs, pas au 1er champ lu.
- **Effort** : <30min. Type : optimisation.

### P2 — Absence de « Nouveautés »
- **Emplacement** : fiche live, « Nouveautés » absent (recon §5).
- **Observation** : un champ Nouveautés vide signale une app inerte. Le brouillon L93 a déjà le texte v1.0.
- **Impact** : faible-modéré (confiance : élevé).
- **Reco** : renseigner le texte L93 dès la version publique ; le mettre à jour à chaque release (même mineure). Type : correction. Effort : <30min.

### P3 — Champ mots-clés : vérifier le déploiement + micro-optimisation
- **Emplacement** : brouillon L88-89 (`gouttes,gtt,infirmier,infirmière,IDE,IDEL,IFSI,ESI,minuteur,cadence,soins,poignet,libéral,domicile`).
- **Observation** : excellent champ (98/100, garde-fou dose/posologie respecté). Non vérifiable qu'il est bien saisi dans ASC (champ invisible côté public). Si le nom passe à « Débit de perfusion » (P1), « perfusion »/« débit » restent hors mots-clés (bien), mais on libère de la place : envisager `ml/h`, `perfuseur`, `hôpital`, `étudiant`.
- **Impact** : faible (confiance : moyen).
- **Reco** : confirmer la saisie du champ dans ASC ; après changement de nom, réallouer les mots doublonnés. Ne jamais mettre « dose »/« posologie ». Type : optimisation. Effort : <30min.

### P3 — App non indexée dans la recherche « Dropp »
- **Emplacement** : recon §5 [HYP].
- **Observation** : normal pour une app neuve à 0 download ; se résout avec le temps + premiers téléchargements + métadonnées cohérentes.
- **Impact** : faible (confiance : moyen — hypothèse).
- **Reco** : pas d'action directe ; les correctifs P0-P1 (langue, nom, avis) accélèrent l'indexation. Suivre la position sur « débit perfusion », « gouttes minute », « calcul perfusion » après 2-3 semaines. Type : experimentation.

---

## 4. Ordre de captures recommandé + texte intégré exact

Objectif : bénéfice d'abord, fonctionnalité ensuite. Chaque capture = **une légende courte incrustée en haut**, visuel dessous. 6 captures iPhone.

1. **Le rythme (hook premium)** — scène liquide qui bat + gros `42 gtt/min`.
   Légende : **« Le débit calculé. Le rythme sous vos yeux. »**
   → 1re capture idéale : c'est le seul différenciant qu'aucun concurrent n'a.
2. **Le calcul** — écran saisie volume/durée/facteur → résultat.
   Légende : **« Volume, durée : le débit en un geste. »**
3. **La fin jamais ratée** — écran/alarme de fin + heure prévue.
   Légende : **« L'alarme de fin. Gratuite, pour toujours. »**
4. **Apple Watch (Pro)** — perfusion suivie au poignet.
   Légende : **« Tout au poignet. Sans sortir l'iPhone. »**
5. **Perfusions simultanées (Pro)** — liste multi-sessions avec repères.
   Légende : **« Plusieurs perfusions, chacune son repère. »**
6. **Confiance** — écran + pictos zéro donnée / local / hors-ligne.
   Légende : **« Sans compte. Sans donnée. Hors-ligne. »**

Captures Apple Watch (jeu séparé) : 1) tempo au poignet, 2) alarme poignet, 3) liste sessions.

Règles : heure 9:41, batterie pleine (déjà noté L143) ; jamais « pouls/FC/mesure » ni « dose/posologie » dans une légende (garde-fou) ; police cohérente avec l'identité (SF, poids light sur les nombres). Confiance : moyen (contenu actuel non vérifié, reco constructive).

---

## 5. Priorités de localisation

1. **FR d'abord** (fait, marché cible) — mais corriger la déclaration de langue (P0).
2. **EN** en v1.1 : **localiser le binaire AVANT de déclarer EN** sur la fiche. Ordre correct = app EN → fiche EN → déclaration langue EN. Ne jamais l'inverse (cause de la P0 actuelle).
3. Ensuite, marché francophone élargi couvert par FR (Belgique, Suisse, Québec, Afrique francophone) sans travail supplémentaire.
4. ES / DE / IT / PT : le site a déjà 14 langues ; prioriser après traction FR+EN, en réutilisant les glossaires du site. Ne pas ouvrir 14 fiches store sans binaire localisé (même piège que P0).

---

## 6. Note globale : 68 / 100

Décomposition qualitative :
- **Fondations (catégorie, prix, confidentialité, disclaimer, description brouillon)** : solides (+).
- **Déploiement** : le meilleur travail (metadata.md) n'est pas branché sur la fiche live (−).
- **Bloquants** : langue EN déclarée sur binaire FR (P0, critique), nom sous-exploité (P1), 0 avis sans stratégie (P1), captures non optimisées/non vérifiées (P1).
- **Finition** : nom développeur en capitales, Nouveautés vide (P2).

Le socle est là et le potentiel est déjà écrit ; ce sont des correctifs de déploiement et d'ASO à faible effort, pas une refonte. En traitant P0 + les deux P1 de champs (nom, sous-titre) + la stratégie d'avis, la fiche passerait raisonnablement à ~85/100. Confiance sur la note : moyen (contenu exact des captures live non extractible dans ce run).
