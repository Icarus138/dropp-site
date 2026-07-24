# Agent 9 — Audit juridique / RGPD / réglementaire (indicatif)

> **Avertissement.** Analyse indicative de conformité apparente, réalisée à partir des pages publiées et du code source. **Ce n'est pas un avis juridique.** Les points marqués **[AVIS JURISTE OBLIGATOIRE]** doivent être tranchés par un avocat (droit de la consommation UE/FR) et, pour la qualification réglementaire, par un spécialiste dispositifs médicaux / affaires réglementaires (MDR 2017/745). Je ne conclus PAS sur le statut dispositif médical.
>
> Périmètre : `confidentialite.html` → `/fr/privacy.html`, `mentions-legales.html` → `/fr/legal.html`, `assistance.html` → `/fr/support.html`, section Tarifs + Confiance + FAQ de la home (`locales/fr/home.json`). Preuves = fichier + ligne.

**Note de conformité apparente : 74 / 100.**

---

## 1. Forces à conserver (ne pas dégrader)

1. **Confidentialité réellement « zéro donnée », et cohérente de bout en bout.** `fr/privacy.html:163` (« Dropp ne collecte aucune donnée. Aucune. »), confirmé côté technique par l'absence d'analytics/cookie/serveur dans le code (Agent 1, §2). L'absence de bandeau cookies est ici **légitime** : rien n'est déposé, donc pas de consentement ePrivacy/RGPD à recueillir. C'est un vrai atout de conformité, rare. **À ne pas casser** en ajoutant plus tard un pixel, une police Google Fonts distante ou un embed tiers sans réintroduire le consentement.
2. **Mise en garde « champ Repère » = privacy-by-design exemplaire.** `fr/privacy.html:170` (« N'y saisissez jamais de nom de patient… ») et note produit `home.json:125`. Anticipe le risque que l'utilisateur transforme un outil sans donnée de santé en traitement de données de santé (art. 9 RGPD). Formulation à garder mot pour mot.
3. **Mentions légales : socle présent.** `fr/legal.html:162-172` : éditeur (entreprise individuelle), SIREN 852 769 579, SIRET, APE 62.01Z, commune, hébergeur GitHub Inc. avec adresse US, directeur de la publication, propriété intellectuelle, contact. Couvre l'essentiel de la LCEN art. 6.
4. **Disclaimer clinique répété et bien formulé.** Pieds de page `privacy.html:188`, `support.html:176`, `legal.html:178`, section Confiance `home.json:188`, FAQ `home.json:203`. Message constant : « outil d'aide… ne remplace ni le jugement clinique, ni les protocoles, ni les dispositifs de contrôle ». C'est la meilleure défense de positionnement du produit — **à conserver et à propager** partout où une nouvelle fonction est décrite.
5. **FAQ défensive q6/a6 (`home.json:202-203`)** : « ne mesure rien, ne décide rien, et ne se substitue à aucun dispositif ni protocole ». Exactement le vocabulaire qui éloigne de la qualification dispositif médical. Idem promo App Store « convertisseur de débit » (Agent 1, §5). À garder.
6. **Résiliation et restauration d'achat documentées** dans l'assistance : `support.html:167` (« L'abonnement se gère et se résilie dans les réglages de votre compte App Store ») et « Restaurer un achat ». Deux obligations Apple/UE couvertes, au bon endroit.
7. **Achats : bon rappel que Dropp ne voit aucun paiement** (`privacy.html:176`). Cohérent avec le modèle (Apple = vendeur/tiers de confiance).

---

## 2. Problèmes (observation → risque → reco), classés

### 2.1 — [P1] Nom de l'entrepreneur individuel absent des mentions légales

- **Emplacement** : `fr/legal.html:162-166` (bloc « Éditeur du site » + « Directeur de la publication »).
- **Observation** : l'éditeur est désigné « **Dropp**, entreprise individuelle » + SIREN, et le directeur de publication par « **le représentant légal** de l'entreprise éditrice » — **sans jamais nommer la personne physique**. Or la fiche App Store affiche « TONY KEVIN DOMINEAUX » (Agent 1, §5). Une entreprise individuelle est une **personne physique** exerçant à titre professionnel.
- **Risque** : LCEN art. 6-III-1 impose, pour un éditeur professionnel personne physique, la publication des **nom et prénom**. Le SIREN seul ne suffit pas à identifier l'éditeur pour l'obligation. Incohérence visible entre le site (anonyme) et l'App Store (nom complet). **[problème observable]**.
- **Impact** : modéré (conformité formelle, faible probabilité de sanction mais correctif trivial et éliminant une incohérence public).
- **Reco (correction)** : nommer explicitement l'entrepreneur individuel et le directeur de publication.
- **Exemple** : « Le présent site est édité par **Tony Domineaux**, entrepreneur individuel exerçant sous le nom commercial **Dropp** · SIREN 852 769 579… » et « Directeur de la publication : **Tony Domineaux**. »
- **Effort** : `<30min`. **Confiance** : élevé.

### 2.2 — [P1] Absence de toute mention du renouvellement automatique de l'abonnement

- **Emplacement** : section Tarifs `home.json:156-178` ; recherche `renouvellement / tacite / reconduction` = **0 occurrence** sur tout le site FR (vérifié).
- **Observation** : le site affiche « 19,99 €/an », « 2,99 €/mois », « 7 jours d'essai » (`home.json:166-168`) **sans jamais indiquer que l'abonnement se renouvelle automatiquement**, ni que l'essai bascule en paiement à son terme. La résiliation est mentionnée uniquement dans l'assistance (`support.html:167`), pas au moment où le prix est présenté.
- **Risque** : **[risque à vérifier]** — transparence précontractuelle. Code de la consommation (art. L221-5, information précontractuelle contrats à distance) et directive Omnibus : la nature « à renouvellement automatique », le prix total et les modalités de résiliation doivent être présentés **de façon claire et lisible avant l'engagement**. La vente passe par Apple (vendeur de fait), ce qui **atténue** l'obligation côté éditeur — mais le site, en tant que support marketing incitant à l'achat, ne doit pas induire en erreur. Un essai qui se transforme en abonnement payant sans mention explicite est le motif classique de litige « dark pattern ».
- **Impact** : important (touche à la confiance ET au risque conso ; croise l'audit CRO).
- **Reco (correction)** : ajouter, sous les prix, une ligne sobre sur le renouvellement automatique et le point de gestion. Formulation à valider par un juriste.
- **Exemple** : sous les tarifs — « Abonnement à renouvellement automatique jusqu'à résiliation. L'essai de 7 jours se poursuit en abonnement annuel sauf résiliation avant son terme. Gérable et résiliable à tout moment dans les réglages de votre compte App Store. » (harmoniser avec l'écran d'achat in-app, qui doit déjà porter ces mentions pour la règle Apple 3.1.2).
- **Effort** : `<2h`. **Confiance** : moyen (obligation atténuée par le rôle d'Apple, à confirmer).

### 2.3 — [P1] « Signal de sécurité » + « éprouvé sur le terrain » : formulations qui alourdissent le risque de qualification dispositif médical

- **Emplacement** : `home.json:177` (« L'alarme de fin est un **signal de sécurité** »), `home.json:211` (« Conçu par un soignant, **éprouvé sur le terrain** »), signature `home.json:10` (« Rythme · **Précision** · Soin »), `home.json:64` (« l'app **refuse** de battre un tempo absurde »).
- **Observation** : la « destination » (intended purpose) d'un logiciel, au sens MDR, se déduit **notamment du discours marketing**. Or ces quatre formulations tirent dans le sens d'une **fonction de sécurité clinique** : « signal de sécurité » présente l'alarme comme un dispositif de protection du patient ; « refuse un tempo absurde » suggère un garde-fou de sûreté ; « précision » et « éprouvé sur le terrain » sont des allégations de performance/validation.
- **Risque** : **[risque à vérifier]** — ces phrases **renforcent** l'argument d'une destination médicale, alors que le reste du site (disclaimers, FAQ a6, promo « convertisseur ») construit soigneusement la thèse inverse (« aide, ne décide rien »). **Contradiction interne** qui affaiblit la ligne de défense. Ce n'est pas la fonction qui change, c'est la manière de la nommer.
- **Impact** : important (le vocabulaire est le principal levier maîtrisable sur la qualification).
- **Reco (correction)** : neutraliser le vocabulaire de sécurité/performance sans rien retirer à la fonction.
  - « signal de sécurité » → « **repère de fin** » ou « rappel de fin » (`home.json:177`).
  - « éprouvé sur le terrain » → « **pensé pour le terrain** » ou « conçu à partir de la pratique » (`home.json:211`).
  - conserver « Précision » et « refuse un tempo absurde » est acceptable, mais à surveiller (voir 2.6).
- **Exemple** : `freeNote` → « L'alarme de fin est un repère essentiel : elle ne sera jamais payante. »
- **Effort** : `<30min`. **Confiance** : moyen (l'effet réel sur la qualification relève de l'avis réglementaire).

### 2.4 — [P2] Qualification réglementaire globale (MDR 2017/745, règle 11) : non tranchée — avis obligatoire

- **Emplacement** : fonction réelle décrite `home.json:63` (« Volume et durée deviennent immédiatement gouttes par minute… »), `home.json:110-111` (mode Tap → mL/h), Agent 1 §4.
- **Observation** : Dropp calcule un débit de perfusion (gtt/min, s/goutte, mL/h) à partir de volume + durée + facteur, cadence un tempo, alerte à la fin. La question centrale : ce calcul **fournit-il une information utilisée pour une décision à visée diagnostique/thérapeutique pour un patient donné** (→ logiciel dispositif médical, règle 11, classe potentiellement IIa) **ou** n'est-ce qu'un **outil de calcul/conversion générique** exclu du champ (cf. MDCG 2019-11 : les logiciels de simple recherche/calcul « qui ne servent pas un objectif médical » peuvent ne pas être des MDSW) ?
- **Risque** : **[AVIS JURISTE / AFFAIRES RÉGLEMENTAIRES OBLIGATOIRE]**. Le dossier présente des éléments **dans les deux sens** :
  - *Vers "hors champ"* : disclaimers constants, FAQ a6 « ne mesure rien, ne décide rien », promo « convertisseur de débit », calcul déterministe sans donnée patient.
  - *Vers "dans le champ"* : cible = professionnels de santé, contexte = administration d'un médicament/soluté à un patient réel, résultat directement recalé sur la molette (`home.json:69`), vocabulaire de sécurité (voir 2.3).
  Je **ne conclus pas**. Trois niveaux :
  1. **[problème observable]** : contradiction interne de discours (2.3) à corriger d'abord, car elle est sous contrôle immédiat.
  2. **[risque à vérifier]** : la destination déclarée doit être fixée **une seule fois**, par écrit, et rester cohérente site + App Store + app.
  3. **[avis obligatoire]** : statut MDR à faire trancher avant toute montée en charge / communication « clinique », avec analyse règle 11 + MDCG 2019-11 + position ANSM.
- **Impact** : critique (conditionne le droit de distribuer sans marquage CE dispositif médical).
- **Reco (decision-strategique + verification-juridique)** : commander une note de qualification MDR à un cabinet spécialisé ; en attendant, **verrouiller la destination** sur « outil d'aide au calcul et au suivi, non dispositif médical » et purger tout vocabulaire ambigu (2.3, 2.6, cf. mémoire « garde-fou calcul de dose »).
- **Exemple** : phrase de destination unique à répliquer partout — « Dropp est un outil d'aide au calcul, au rythme et au suivi destiné aux professionnels de santé. Il n'est pas un dispositif médical, ne réalise aucune mesure et ne prend aucune décision clinique. »
- **Effort** : `>1sem` (avis externe). **Confiance** : élevé (sur le fait que l'avis est nécessaire) / faible (sur l'issue).

### 2.5 — [P2] Aucun lien vers l'EULA / conditions de licence depuis le site

- **Emplacement** : recherche `eula / licence / conditions générales` sur le site FR = **0 occurrence** ; l'EULA est l'EULA standard Apple, présente uniquement dans la fiche App Store et le paywall (Agent 1 §7).
- **Observation** : un utilisateur qui découvre l'app via `dropp.care` ne trouve **aucune condition d'utilisation / licence** accessible depuis le site. Les « Mentions légales » couvrent l'édition du site, pas les conditions d'usage du logiciel.
- **Risque** : **[risque à vérifier]** — pour une app payante, l'absence de CGU/EULA accessible depuis le support de vente est une lacune de transparence. Le rappel Apple 3.1.2c (mémoire projet : lien EULA absent des métadonnées) montre que le sujet est déjà sensible côté App Store. L'EULA Apple par défaut couvre le juridique minimal, mais le lien devrait être **atteignable**.
- **Impact** : modéré.
- **Reco (correction)** : ajouter en pied de page / mentions légales un lien vers l'EULA applicable (a minima le lien Apple standard `https://www.apple.com/legal/internet-services/itunes/dev/stdeula/`), et préciser que l'usage de l'app est régi par cet EULA + les conditions App Store.
- **Exemple** : dans `legal.html`, section « Nature du service », ajouter : « L'utilisation de l'application est régie par le contrat de licence utilisateur final (EULA) présenté lors du téléchargement — voir l'[EULA standard Apple](https://www.apple.com/legal/internet-services/itunes/dev/stdeula/). »
- **Effort** : `<30min`. **Confiance** : moyen.

### 2.6 — [P2] Droit de rétractation : non mentionné

- **Emplacement** : absent du site (recherche `rétractation` = 0).
- **Observation** : pour un contenu/service numérique fourni immédiatement, le droit de rétractation de 14 jours peut être **écarté** si le consommateur a expressément consenti et renoncé (art. L221-28 C. conso). Ce mécanisme est géré par Apple à l'achat. Le site n'en dit rien.
- **Risque** : **[risque à vérifier]** — obligation portée principalement par Apple (vendeur). Côté éditeur, l'omission est peu risquée mais une phrase de clarté renforce la conformité apparente et coupe court aux réclamations « je n'ai pas pu me rétracter ».
- **Impact** : faible.
- **Reco (correction)** : une ligne dans l'assistance renvoyant à la politique de remboursement Apple.
- **Exemple** : `support.html`, sous « Restaurer un achat » → « **Remboursement** : les demandes se font auprès d'Apple (reportProblem.apple.com), gestionnaire de tous les achats. »
- **Effort** : `<30min`. **Confiance** : moyen.

### 2.7 — [P3] « Prix de lancement » : allégation promotionnelle à sécuriser

- **Emplacement** : `home.json:167` (« prix de lancement, 7 jours d'essai »).
- **Observation** : « prix de lancement » suggère une hausse future et crée une incitation à l'urgence.
- **Risque** : **[risque à vérifier]** — sous la directive Omnibus / art. L121-1 C. conso, une allégation de prix promotionnel/temporaire ne doit pas être trompeuse. Si le prix n'augmente jamais, la mention « de lancement » entretenue durablement peut être qualifiée de pratique trompeuse. Risque faible mais réel si la mention reste des années.
- **Impact** : faible.
- **Reco (optimisation)** : soit tenir réellement l'engagement (augmenter à date connue), soit retirer « de lancement » et garder le prix nu. Ne pas maintenir une « offre de lancement » perpétuelle.
- **Exemple** : « 19,99 €/an · 7 jours d'essai » (sans « prix de lancement »), OU « Prix de lancement jusqu'au [date] ».
- **Effort** : `<30min`. **Confiance** : moyen.

### 2.8 — [P3] « Précision » dans la signature + « refuse un tempo absurde » : à surveiller

- **Emplacement** : `home.json:10` et `home.json:64`.
- **Observation** : moins graves que « signal de sécurité », mais participent au même faisceau (voir 2.3/2.4). « Précision » est une allégation de performance ; « refuse » implique une validation active.
- **Risque** : **[risque à vérifier]**, cumulatif avec 2.3.
- **Impact** : faible.
- **Reco (experimentation)** : les conserver pour l'instant (valeur marketing réelle), mais les inscrire dans la note de destination et les réévaluer selon l'avis MDR. Ne pas ajouter d'autres allégations du même registre (« fiable cliniquement », « sûr », « validé »).
- **Effort** : `<30min` (surveillance). **Confiance** : faible.

---

## 3. Synthèse RGPD / cookies / consentement

- **RGPD** : conforme en apparence et par conception. Pas de traitement côté éditeur (aucun serveur, aucune collecte — `privacy.html:163-179`). Pas de responsable de traitement à déclarer pour une activité de collecte inexistante. La seule zone de risque (données de santé) est **correctement neutralisée** par la consigne « pas de nom de patient » (`privacy.html:170`).
- **Cookies / ePrivacy** : **aucun cookie, aucun stockage sauf `localStorage` de préférence de langue** (`privacy.html:233` : `dropp-lang`). Ce `localStorage` est un stockage **strictement nécessaire au confort de langue choisi par l'utilisateur**, non traceur : pas de consentement requis. L'absence de bandeau est justifiée. **[FAIT]**.
- **Transfert hors UE** : hébergement GitHub (USA) — mais le site ne collecte rien, donc pas de transfert de données personnelles au sens RGPD. Les logs serveur GitHub (IP) relèvent de GitHub en tant qu'hébergeur, à signaler par prudence.
  - **Reco [P3, optimisation]** : une phrase dans la politique de confidentialité indiquant que l'hébergeur (GitHub) peut consigner des données techniques de connexion (adresse IP, logs) selon sa propre politique, hors du contrôle de l'éditeur. `<30min`, confiance moyen.

---

## 4. Barème de la note (74/100)

| Volet | Poids | Appréciation | Points |
|---|---|---|---|
| Confidentialité / RGPD / cookies | 25 | Excellent, cohérent, privacy-by-design | 24 / 25 |
| Mentions légales (LCEN) | 15 | Solides mais nom de l'EI absent (2.1) | 11 / 15 |
| Transparence abonnement (conso UE) | 20 | Résiliation OK, mais renouvellement auto + rétractation absents (2.2, 2.6) | 11 / 20 |
| Disclaimers cliniques | 15 | Répétés, clairs, bien placés | 14 / 15 |
| Risque qualification MDR (maîtrise du discours) | 20 | Bonne base défensive MAIS contradictions « sécurité / éprouvé / précision » (2.3, 2.4, 2.8) ; avis externe non encore rendu | 11 / 20 |
| CGU/EULA accessibles | 5 | Aucun lien depuis le site (2.5) | 3 / 5 |
| **Total** | **100** | | **74 / 100** |

**Lecture** : conformité apparente **bonne**, portée par une confidentialité irréprochable et des disclaimers constants. Les points qui pèsent : (a) la **transparence de l'abonnement** (renouvellement automatique jamais énoncé), et (b) la **cohérence du discours réglementaire** (quelques formulations « sécurité/performance » qui contredisent la ligne « simple aide »). Aucun de ces points n'est bloquant à court terme, tous sont corrigeables vite — sauf l'avis MDR (2.4), qui est structurant et doit être commandé.

---

*Rapport indicatif — ne se substitue pas à un avis juridique ni à une évaluation réglementaire formelle.*
