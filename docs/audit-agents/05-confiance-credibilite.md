# Agent 5 — Confiance perçue & crédibilité (site + fiche App Store)

> Périmètre : le produit **semble-t-il** sérieux, fiable, développé avec connaissance du terrain ? Un soignant s'appuierait-il dessus en soin ? Analyse par dimension : confiance **visuelle / technique / clinique / juridique / liée au créateur / preuves externes**. Chaque affirmation est sourcée (fichier + ligne, section, texte exact). Note /100 en fin.
> Base factuelle : `docs/audit-agents/01-reconnaissance.md` (lu).

---

## Synthèse

DROPP inspire une **confiance visuelle et technique fortes** (design premium Apple-grade, promesse de confidentialité radicale et **réelle dans le code**, 14 langues, démos interactives qui prouvent le produit en direct). Mais la confiance qui compte le plus pour un **outil clinique** — celle qui décide si un infirmier s'y fie pendant une garde — repose sur trois piliers aujourd'hui **faibles ou absents** :

1. **Autorité du créateur** : un unique byline anonyme (« Conçu par un soignant, éprouvé sur le terrain »), enterré tout en bas, non substantié. Le levier le plus puissant du produit est le moins exploité.
2. **Preuve externe / sociale** : **zéro**. 0 avis, 0 note App Store, aucun témoignage, aucune mention d'usage, aucun logo, aucune presse. Un soignant qui atterrit ne voit **aucune** validation par un tiers.
3. **Transparence de la méthode de calcul** : le site montre *que* ça calcule (démos) mais jamais *comment* ni *pourquoi c'est juste*. Le disclaimer dit ce que DROPP n'est **pas** ; rien ne dit pourquoi le calcul **est** fiable.

Les fondations sont excellentes et ne doivent pas être dégradées. Ce qui manque, ce sont les **preuves** qui transforment une belle vitrine en outil qu'on ose utiliser sur un patient.

**Note globale : 63 / 100.**

---

## Forces à conserver (ne pas dégrader)

1. **Confiance technique / confidentialité — exemplaire et crédible.** La section Confiance (`locales/fr/home.json:180-189`) tient trois tenets nets : « Aucune donnée transmise », « Aucun compte, aucun serveur », « Local et hors ligne ». La page Confidentialité renforce sans langue de bois : « Dropp ne collecte aucune donnée. Aucune. » (`privacy.json:5`). **Point rare : c'est vérifié réel** (recon §2 : « Aucun analytics, aucun cookie, aucun consentement — revendiqué et réel : rien dans le code »). La cohérence entre promesse marketing et code est en soi un signal de sérieux majeur. À préserver tel quel.

2. **Confiance visuelle — premium, sobre, sans surpromesse décorative.** Hero WebGL, scrollytelling, démos interactives (recon §2). L'exigence Apple transparaît. Le produit *a l'air* soigné par quelqu'un qui sait ce qu'il fait. Conserver.

3. **Disclaimer clinique — rassurant, pas anxiogène.** « Outil d'aide au calcul, au rythme et au suivi. Ne remplace ni le jugement clinique, ni les protocoles locaux, ni les dispositifs de contrôle. » (`home.json:188`, repris en `legal.json:16` et FAQ a6 `home.json:203`). Le ton pose le **périmètre** avec humilité professionnelle plutôt que d'agiter des avertissements. Un soignant lit ça comme « ils connaissent leur métier et leurs limites », pas comme « c'est dangereux ». La répétition (Confiance + FAQ + mentions légales) est cohérente, pas alarmiste. **À garder** — c'est un modèle de disclaimer bien fait.

4. **Garde-fou de plausibilité — excellent signal de rigueur.** « Hors plage plausible — l'app refuse de battre un tempo absurde. » (`home.json:64`). Montrer que l'outil **refuse** de produire une valeur aberrante est exactement le genre de détail qui rassure un clinicien. À mettre davantage en avant (voir findings).

5. **Promesse « l'alarme de fin ne sera jamais payante ».** (`home.json:177` : « L'alarme de fin est un signal de sécurité : elle ne sera jamais payante. »). Éthique freemium irréprochable sur une fonction de sécurité. Renforce fortement la confiance dans les intentions du créateur. Conserver et éventuellement remonter en visibilité.

6. **Bases juridiques solides et transparentes.** Mentions légales complètes (éditeur, SIREN 852 769 579, APE, hébergeur, contact — `legal.json:6-10`). Adresse mail de contact réelle et unique partout (`contact@dropp.care`). Rien de caché.

---

## Problèmes (par ordre de priorité)

### P1 — Autorité du créateur : le levier le plus fort, le plus sous-exploité

- **Emplacement** : `locales/fr/home.json:211` (byline closing) — unique occurrence de « soignant » sur tout le site (`grep` confirmé : aucune autre mention « soignant / infirmier / nurse / bio / expérience / terrain » dans `locales/fr/`). Rendu en `src/templates/home.html:1009`, en `<p class="muted">`, tout en bas de page.
- **Observation** : la seule preuve d'expertise terrain est *« Conçu par un soignant, éprouvé sur le terrain — pour garder l'attention là où elle compte. »*, anonyme, en texte atténué (`muted`), après le CTA final. Aucune page « à propos », aucun nom, aucun parcours, aucun « pourquoi j'ai construit ça ». Or **pour un outil de soin, l'autorité du concepteur est le premier déterminant d'adoption** : un infirmier fait confiance à un outil fait *par un des siens* bien plus qu'à un joli produit d'un éditeur anonyme.
- **Aggravant (incohérence de signal)** : la fiche App Store affiche le développeur « **TONY KEVIN DOMINEAUX** » (recon §5, nom légal en capitales, 2ᵉ prénom) — froid, administratif, sans aucun cadre soignant. Le visiteur qui vérifie le développeur ne voit ni « soignant », ni « infirmier », juste un nom de personne physique en majuscules. Le seul signal d'autorité du site n'est donc **pas relayé** là où l'achat se décide.
- **Impact** : **important**. C'est la différence entre « une app de plus » et « l'app d'un collègue qui a vécu le problème ».
- **Recommandation** : exploiter franchement (et honnêtement) le créateur-soignant. Ajouter un bloc court « Pourquoi DROPP » ou une micro-page « À propos », avec au minimum : la profession (infirmier / soignant), le contexte de terrain qui a motivé l'app, éventuellement le prénom. Relayer le cadre soignant dans la **description App Store** (le nom légal du développeur ne peut pas changer, mais la première ligne de description le peut).
- **Exemple concret** : bloc au-dessus des tarifs — *« DROPP est né au chevet, pas devant un tableur. Infirmier, j'ai recalculé une fois de trop la même formule entre deux sonnettes. J'ai construit l'outil que je voulais au poignet. »* (à ajuster au réel, sans inventer de faits). Et en 1ʳᵉ ligne de description App Store : *« Conçu par un infirmier, pour les soignants. »*
- **Effort** : `<2h` (rédaction + un bloc HTML/JSON, réutilisable en 14 langues via le pipeline existant).
- **Confiance** : **élevé** (le déséquilibre entre la force du levier et sa mise en œuvre actuelle est démontré par le code).
- **Type** : decision-strategique.

### P1 — Preuve externe / sociale : absente sur toute la chaîne

- **Emplacement** : ensemble du site (`src/templates/home.html` — aucune section témoignage/avis) + fiche App Store (recon §5 : « 0 avis / 0 note »).
- **Observation** : il n'existe **aucune** preuve par un tiers. Pas de témoignage soignant, pas de citation, pas de « X infirmiers l'utilisent », pas de logo d'école/IFSI/service, pas de presse, pas d'étoiles. Sur la fiche App Store, « pas assez de notes ». Le visiteur doit croire DROPP **sur parole**. Pour un produit clinique visant à devenir « référence internationale », l'absence totale de validation externe est le plafond de crédibilité le plus bas.
- **Impact** : **important** (critique à moyen terme pour l'ambition de référence).
- **Recommandation** : construire la preuve sociale **éthiquement**, par étapes. (1) Solliciter des avis App Store auprès des premiers utilisateurs réels via un prompt in-app au bon moment (après une perfusion suivie avec succès, jamais avant valeur reçue). (2) Recueillir 2-4 verbatims de soignants testeurs (nommés « IDE, service X » ou anonymisés avec accord) pour une section « Ils l'utilisent ». (3) Viser une visibilité IFSI / étudiants infirmiers (public cité comme cœur de cible) comme premier terreau de bouche-à-oreille. **Ne jamais fabriquer d'avis** — l'authenticité est ici la valeur même du produit.
- **Exemple concret** : section discrète avant la FAQ, 3 cartes verbatim + attribution métier ; et déclencheur d'avis App Store natif (`SKStoreReviewController` / `requestReview`) posé après un suivi de perfusion terminé.
- **Effort** : `<1sem` (côté récolte + intégration) ; le prompt d'avis in-app est `<1j`.
- **Confiance** : **élevé** (l'absence est un fait ; l'efficacité de la preuve sociale sur l'adoption est bien établie).
- **Type** : experimentation / decision-strategique.

### P1 — Transparence de la méthode de calcul : le « pourquoi c'est juste » manque

- **Emplacement** : section Calculez (`home.json:61-65`), démo (`home.json:33-49`), FAQ facteurs (`home.json:198-199`). Aucun bloc dédié à la **formule** ni à sa **validation**.
- **Observation** : le site prouve *que* DROPP calcule (démo 500 mL / 4 h → 125 mL/h → 1,43 s/goutte au facteur 20) et liste les facteurs 10/15/20/60 (`home.json:63`, `a4`). Mais il n'explique **jamais** la formule (débit gtt/min = volume × facteur ÷ durée), ni pourquoi elle est fiable, ni comment les arrondis sont gérés, ni ce que fait exactement le garde-fou de plausibilité. Un soignant méthodique — profil exact de la cible — veut **vérifier le raisonnement** avant de faire confiance. Le disclaimer dit ce que l'outil n'est pas ; **rien ne dit pourquoi le résultat est correct**.
- **Impact** : **modéré** (frein direct pour l'utilisateur le plus exigeant, celui qui deviendrait prescripteur).
- **Recommandation** : ajouter un bloc court « Comment DROPP calcule » : la formule explicite, le rôle du facteur de goutte, la règle d'arrondi, et une phrase sur le garde-fou de plausibilité (bornes). Transparence = autorité. Cela transforme le scepticisme clinique en confiance et différencie d'un calculateur boîte noire.
- **Exemple concret** : *« Débit (gtt/min) = Volume (mL) × Facteur (gtt/mL) ÷ Durée (min). Facteur selon votre perfuseur : 10, 15, 20 ou 60. DROPP arrondit à la goutte près et refuse toute valeur hors plage physiologique plausible. »* — en bloc dépliable, sans alourdir le hero.
- **Effort** : `<2h`.
- **Confiance** : **moyen** (bénéfice probable sur le segment exigeant, à confirmer par retours).
- **Type** : optimisation.

### P1 — Conditions d'abonnement absentes du site : risque juridique **et** de confiance

- **Emplacement** : site (recon §7 : « Pas de CGU/CGV dédiées, pas de mentions d'abonnement détaillées — renouvellement auto, résiliation, rétractation — hors app »). Seule trace : support `q3` (`support.json:9`) « L'abonnement se gère et se résilie dans les réglages de votre compte App Store. »
- **Observation** : DROPP vend des abonnements (2,99 €/mois, 19,99 €/an essai 7 j) et un achat à vie (49,99 €). Le site ne présente **nulle part** avant achat : le renouvellement automatique, les modalités de résiliation, le droit de rétractation, ni de CGV. Double problème : (a) **confiance** — un soignant prudent hésite à s'abonner sans voir les conditions ; (b) **conformité** — les guidelines App Store (3.1.2) et le droit conso FR/UE imposent des informations d'abonnement claires et accessibles. Cet audit ne tranche pas le juridique (avis juriste requis) mais **signale** le manque.
- **Impact** : **modéré** (confiance) à **important** (si blocage review App Store ou litige conso).
- **Recommandation** : publier une page « Abonnement & conditions » (ou compléter les tarifs) : renouvellement auto, prix, période d'essai, résiliation via App Store, rétractation. Lier depuis la section Tarifs et le footer. Faire valider par un juriste (renvoi à l'agent juridique de l'audit).
- **Exemple concret** : sous les prix — *« Abonnement à renouvellement automatique, résiliable à tout moment dans les réglages de votre compte App Store au moins 24 h avant l'échéance. Essai de 7 jours, sans engagement. Conditions complètes. »*
- **Effort** : `<1j` (rédaction) + validation juridique.
- **Confiance** : **élevé** (absence factuelle) sur le constat ; **moyen** sur l'exigence légale exacte (hors périmètre).
- **Type** : verification-juridique.

### P2 — « Éprouvé sur le terrain » : claim non substantié vs identité « sans surpromesse »

- **Emplacement** : `home.json:211` (byline) ; « éprouvé sur le terrain » repris implicitement.
- **Observation** : l'identité voulue est « sans surpromesse » (brief produit). « Éprouvé sur le terrain » est une **affirmation de validation** sans aucune preuve derrière (0 avis, aucun test terrain documenté). Un lecteur exigeant peut y voir un slogan creux — l'inverse de l'effet recherché. Le risque : dévaluer les claims *vrais* (zéro donnée) par contagion.
- **Impact** : **faible** à **modéré**.
- **Recommandation** : soit **substantier** (dès qu'il y a des verbatims/tests réels, les rattacher à cette phrase), soit **adoucir** vers une formulation factuelle non prouvable-fausse (« Pensé au chevet, pour le geste réel »). Ne pas laisser une promesse de validation sans validation.
- **Exemple concret** : remplacer par *« Conçu par un soignant, pour le geste réel du chevet. »* jusqu'à disposer de preuves terrain.
- **Effort** : `<30min`.
- **Confiance** : **moyen**.
- **Type** : correction.

### P2 — Fiche App Store : langue déclarée « Anglais » alors que l'app est en français

- **Emplacement** : fiche App Store (recon §5 : langues déclarées « Anglais », UI app 100 % FR, binaire non localisé).
- **Observation** : incohérence visible publiquement. Un anglophone télécharge une app en français ; un francophone qui inspecte voit « Anglais » et se demande si la fiche est sérieuse. Sur une fiche déjà à 0 avis, chaque micro-incohérence pèse lourd sur la crédibilité perçue.
- **Impact** : **modéré** (érosion de crédibilité + mauvaise expérience anglophone).
- **Recommandation** : aligner la langue déclarée sur la réalité (Français) tant que l'app n'est pas localisée EN (localisation EN prévue v1.1, recon §6). Corriger dès la prochaine soumission métadonnées.
- **Exemple concret** : dans App Store Connect, langue principale = Français ; ajouter Anglais **uniquement** quand le binaire sera localisé.
- **Effort** : `<30min`.
- **Confiance** : **élevé**.
- **Type** : correction.

### P2 — Nom du développeur affiché : froid et sans cadre soignant

- **Emplacement** : fiche App Store — développeur « TONY KEVIN DOMINEAUX » (recon §5).
- **Observation** : le nom légal en capitales d'une personne physique lit « amateur / administratif » là où le site vise « premium ». Surtout, il n'active **pas** le levier soignant. On ne peut pas changer le nom légal de l'entité, mais on peut compenser par la 1ʳᵉ ligne de description et le sous-titre.
- **Impact** : **faible** à **modéré**.
- **Recommandation** : compenser via texte éditorial (description : « Conçu par un infirmier… ») ; si un jour la structure évolue, envisager un nom d'affichage éditeur = « Dropp » côté App Store Connect (selon options disponibles pour une EI).
- **Exemple concret** : voir finding P1 créateur — la même phrase sert les deux.
- **Effort** : `<30min` (texte).
- **Confiance** : **moyen**.
- **Type** : optimisation.

### P3 — Perception « développeur solo / entreprise individuelle »

- **Emplacement** : mentions légales `legal.json:6` (« entreprise individuelle », « Entrepreneur individuel »).
- **Observation** : la transparence est bonne et honnête, mais « personne physique / EI » peut, pour un cadre hospitalier ou un acheteur institutionnel, poser la question de la **pérennité** et du **support**. Ce n'est pas un défaut à cacher (l'authenticité sert le récit soignant-fondateur), mais un point à **compenser par des engagements**.
- **Impact** : **faible**.
- **Recommandation** : ne pas masquer ; au contraire, transformer en force (« fait par un soignant indépendant, sans investisseur, sans pub, sans revente de données »). Ajouter un engagement de support/réponse (délai indicatif) sur la page Assistance pour rassurer sur la continuité.
- **Exemple concret** : page Assistance — *« Une seule personne lit contact@dropp.care et répond, en général sous 48 h. »* (si tenable).
- **Effort** : `<30min`.
- **Confiance** : **faible** (hypothèse sur la perception institutionnelle).
- **Type** : optimisation.

### P3 — Le disclaimer dit ce que DROPP n'est pas ; rien ne dit pourquoi il est fiable

- **Emplacement** : `home.json:188`, FAQ a6 `home.json:203`, `legal.json:16`.
- **Observation** : la confiance clinique est aujourd'hui **uniquement défensive** (périmètre, limites). Bien fait (voir Forces §3), mais déséquilibré : aucun contrepoids **positif** n'explique pourquoi le calcul mérite confiance. Le finding P1-méthode y répond directement ; à traiter comme un couple (limites + méthode) pour un équilibre « humble ET rigoureux ».
- **Impact** : **faible** (redondant avec P1-méthode, listé pour cadrer l'équilibre du discours de confiance).
- **Recommandation** : conserver le disclaimer, y adosser le bloc méthode (P1) pour que la confiance clinique soit à la fois « ce que je ne fais pas » **et** « pourquoi ce que je fais est juste ».
- **Exemple concret** : placer « Comment DROPP calcule » **juste avant** ou après la section Confiance, pour que les deux se lisent ensemble.
- **Effort** : `<30min` (placement, si le bloc P1 est fait).
- **Confiance** : **moyen**.
- **Type** : optimisation.

---

## Note : 63 / 100

**Répartition qualitative par dimension :**
- Confiance **visuelle** : très forte (préserver).
- Confiance **technique / confidentialité** : très forte, et **vérifiée dans le code** — différenciateur majeur (préserver).
- Confiance **juridique** : bases solides (mentions légales, SIREN, contact), mais **conditions d'abonnement manquantes** (P1).
- Confiance **clinique** : disclaimer excellent + garde-fou de plausibilité, mais **méthode de calcul non exposée** (P1) — confiance seulement défensive.
- Confiance **liée au créateur** : levier le plus puissant, **le plus sous-exploité** (P1) ; signal froid côté App Store.
- **Preuves externes** : **absentes** (P1) — plafond de crédibilité pour l'ambition « référence ».

Les fondations premium et l'intégrité technique évitent tout effondrement de confiance. Le plafond actuel tient à l'absence de **preuves** (créateur substantié, validation par des pairs, transparence de méthode) et aux frictions App Store (0 avis, langue mal déclarée, nom froid). Combler les trois P1 non-juridiques (créateur, preuve sociale, méthode) ferait franchir un palier net sans rien dégrader de ce qui marche.
