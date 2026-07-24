# Agent 06 — Offre / Pricing / Abonnement

> Audit du modèle freemium de Dropp : lisibilité du gratuit, désirabilité du Pro, cohérence des 3 formules, perception prix par profil, stratégie de conversion. Read-only. Chaque affirmation est sourcée (fichier / section / texte exact). Impact qualitatif. Confiance : élevé / moyen / faible.

**Note globale : 78 / 100.**

L'architecture d'offre est saine et, sur un point, remarquable : le refus explicite de faire payer l'alarme de sécurité. Le gratuit est un vrai outil, pas un piège à conversion. Les points faibles sont de l'ordre de la finition et de la transparence, pas de la structure : présentation des prix trop dense, prix en euros figés dans les 14 langues, distinction iPhone/Watch implicite, absence de mentions d'abonnement près du prix.

---

## 1. Forces à conserver (ne pas dégrader)

1. **L'alarme de fin ne sera jamais payante — et c'est écrit.**
   `locales/fr/home.json` → `pricing.freeNote` : « L'alarme de fin est un signal de sécurité : elle ne sera jamais payante. » C'est un positionnement éthique fort, cohérent avec un public soignant et avec l'identité « rassurante ». Il désamorce le reproche numéro un fait aux apps santé freemium (« ils rançonnent la sécurité »). **À protéger absolument, dans toutes les langues** (vérifié présent en en/ja/de/pt-br).

2. **Le gratuit est un outil complet, pas une démo.**
   `pricing.freeName` = « Gratuit — un vrai outil ». Contenu : calculs illimités, tempo visuel, une perfusion suivie, alarme de fin « pour toujours », sans pub ni compte. Le cœur du métier (calculer un débit gtt/min) est entièrement gratuit et sans limite de temps. C'est le bon design freemium : on donne le job-to-be-done, on vend le confort et le poignet.

3. **Le mur payant est adossé à un objet naturel : l'Apple Watch.**
   `pricing.proItem1` = « L'app Apple Watch complète ». Le Pro regroupe ce qui est soit lié au matériel (Watch, Double Tap), soit du confort avancé (perfusions simultanées, pré-alerte, rappels adaptatifs, Mode Tap, historique, thèmes). La frontière free/paid est lisible et défendable : personne ne peut dire que le calcul de base est rançonné.

4. **Trois formules qui couvrent l'aversion à l'abonnement.**
   `pricing.priceLifetime` = « 49,99 € à vie » + `lifetimeNote` « tout, pour toujours, sans abonnement ». Pour un public d'infirmiers et d'étudiants souvent lassés des abonnements, l'achat à vie est un signal de confiance et un anti-friction. Le maintenir est stratégiquement juste (voir §3).

5. **« Prix de lancement » : urgence honnête.**
   `pricing.priceYearNote` = « prix de lancement, 7 jours d'essai ». Crée une raison d'agir sans dark pattern ni faux compte à rebours. Cohérent avec la sobriété voulue.

6. **Zéro pub / zéro compte réaffirmé dans l'offre.** `pricing.freeItem5` « Aucune publicité, aucun compte ». Aligne le modèle économique sur l'identité premium/vie privée. Ne pas introduire de pub même côté free.

---

## 2. Problèmes (emplacement · observation · impact · preuve · reco · exemple · effort · priorité · confiance)

### P1 — Prix en euros figés dans les 14 langues (mismatch international)
- **Emplacement** : `locales/{en,ja,de,pt-br,…}/home.json` → `pricing.priceYear/priceMonth/priceLifetime`.
- **Observation** : les montants sont codés en euros partout. `ja` affiche « €19.99/年 », `pt-br` « € 19,99/ano », `en` « €19.99/year ». Or l'App Store localise les paliers d'IAP par storefront : un utilisateur japonais paiera en JPY, un brésilien en BRL, à un montant qui n'est PAS la conversion directe de 19,99 €.
- **Impact** : **modéré**. Contradiction directe avec l'ambition « référence internationale ». Effet « sticker shock » ou confusion à l'achat (le prix du site ≠ le prix affiché par Apple), ce qui abîme le sentiment premium/rassurant au moment le plus sensible.
- **Preuve** : sortie de `locales/ja/home.json` : `priceYear = "€19.99/年"`, `priceMonth = "€2.99/月"`, `priceLifetime = "€49.99 買い切り"`.
- **Reco** : hors zone euro, ne PAS afficher un montant € brut. Deux options : (a) supprimer les chiffres absolus sur les locales non-euro et pointer vers l'App Store pour le prix local (« Voir le prix dans l'App Store »); (b) si on garde un repère, l'étiqueter clairement comme prix zone euro et ajouter « prix local affiché par l'App Store ». Le site étant statique sans runtime de prix, l'option (a) est la plus sûre.
- **Exemple concret** (locale `ja`) : remplacer `priceYear` par « 年額プラン（7日間無料）» et un `priceNote` « 価格はApp Storeでご確認ください » plutôt que « €19.99/年 ».
- **Effort** : <1j (édition JSON + revoir le gabarit `.prices`). **Confiance** : élevé (observé dans les fichiers).

### P1 — Présentation des prix trop dense, sans hiérarchie ni valorisation de l'annuel
- **Emplacement** : `src/templates/home.html:961` — `<div class="prices"><b>19,99 €/an</b> — prix de lancement, 7 jours d'essai · 2,99 €/mois · <b>49,99 € à vie</b></div>`.
- **Observation** : les trois prix sont sur une seule ligne, séparés par des points médians. Aucun plan « recommandé », aucune comparaison annuel↔mensuel, aucun break-even du « à vie ». L'annuel (la formule la plus saine en revenu) n'est pas valorisé : 19,99 €/an ≈ 1,67 €/mois, soit ~44 % de moins que 2,99 €/mois — cette économie n'est jamais montrée. Le « à vie » ne dit pas qu'il s'amortit en ~2,5 ans d'annuel.
- **Impact** : **modéré**. Un prospect ne peut pas comparer en un coup d'œil ; la formule la plus intéressante pour lui (annuel) et pour la marge (annuel/à vie) n'est pas mise en avant. L'essai 7 j — moteur de conversion — est enfoui dans une note plutôt que porté par le CTA.
- **Preuve** : `home.html:961` (une seule `<div class="prices">`), CSS `.tier .prices` (`home.html:458`) sans structure multi-lignes ni badge.
- **Reco** : passer à un petit bloc 3 lignes, annuel en tête et signalé « meilleure valeur », avec l'équivalence mensuelle et le break-even du à vie. Faire du « 7 jours d'essai » le verbe du CTA Pro.
- **Exemple concret** :
  - Annuel — 19,99 €/an · **meilleure valeur** · « ≈ 1,67 €/mois, 44 % de moins que le mensuel · 7 jours d'essai · prix de lancement »
  - Mensuel — 2,99 €/mois · « sans engagement »
  - À vie — 49,99 € · « payé une fois, équivaut à ~2,5 ans d'abonnement »
- **Effort** : <1j. **Confiance** : moyen (la logique de conversion est probable, l'ampleur reste à tester).

### P2 — Distinction « iPhone gratuit / Apple Watch Pro » implicite
- **Emplacement** : sections features `home.html:722-820` (5 sections Pro : Watch, Double Tap, Mode Tap, Perfusions simultanées, Aperçu Pro) + `pricing.proItem1` « L'app Apple Watch complète ».
- **Observation** : le site consacre l'essentiel de son argumentaire à des fonctions Watch/Pro, mais ne dit jamais en clair « l'app iPhone est gratuite ; l'app Apple Watch et les perfusions simultanées relèvent du Pro ». La FAQ q3 parle de l'app Watch sans mentionner qu'elle est payante. Risque que l'utilisateur venu pour le poignet découvre le mur seulement en installant, avec un sentiment « je paie pour utiliser mon Apple Watch ».
- **Impact** : **modéré**. C'est le seul endroit où le reproche « payer pour ce qui devrait être gratuit » peut mordre. La fonction est légitimement Pro (matériel + confort), mais l'absence d'énoncé clair transforme une frontière défendable en surprise.
- **Preuve** : `locales/fr/home.json` `faq.a3` ne mentionne pas le caractère Pro ; `pricing` ne contient aucune phrase « iPhone gratuit / Watch Pro ».
- **Reco** : une ligne explicite dans la section Tarifs + une FAQ dédiée « Combien coûte Pro et que débloque-t-il ? ». Nommer la frontière évite la déception et, paradoxalement, valorise le Pro (on assume que le poignet est le premium).
- **Exemple concret** : sous le titre Tarifs, microcopy : « L'app iPhone — calcul, tempo, alarme de fin — est gratuite. L'app Apple Watch, les perfusions simultanées et les rappels avancés sont Dropp Pro. » Nouvelle FAQ : Q « L'app Apple Watch est-elle incluse ? » / A « Elle fait partie de Dropp Pro ; l'app iPhone reste gratuite. »
- **Effort** : <2h. **Confiance** : moyen.

### P2 — Aucune mention d'abonnement près du prix (renouvellement, résiliation, essai, EULA)
- **Emplacement** : section Tarifs `home.html:946-979` ; pages légales `confidentialite.html`, `mentions-legales.html`.
- **Observation** : à côté des prix, rien sur le renouvellement automatique, la résiliation, le passage payant après les 7 jours, ni de lien EULA/CGV. La reconnaissance confirme l'absence de CGV/CGU dédiées et de mentions d'abonnement sur le site (§7).
- **Impact** : **modéré à important**. Double enjeu : (1) conversion — un pro prudent hésite à s'abonner sans savoir comment résilier ; (2) conformité — App Store 3.1.2 exige les infos d'abonnement, et le droit conso UE impose des mentions (renouvellement auto, rétractation). Sur une app médicale à public professionnel, l'opacité tarifaire détonne avec l'exigence affichée.
- **Preuve** : la section Tarifs (`home.html:946-979`) ne contient aucun texte d'abonnement ; aucun lien EULA hors fiche App Store (recon §7).
- **Reco** : ajouter sous les prix une note courte « À propos de l'abonnement » (renouvellement auto, résiliation possible à tout moment dans les réglages Apple, facturation après l'essai) + lien EULA. À coordonner avec l'agent juridique (périmètre partagé).
- **Exemple concret** : « L'abonnement se renouvelle automatiquement sauf résiliation au moins 24 h avant l'échéance, dans les réglages de votre compte Apple. L'essai de 7 jours devient payant à son terme si non annulé. Voir les conditions (EULA). »
- **Effort** : <2h (site) ; validation juridique à part. **Confiance** : élevé (absence observée). **Type** : vérification-juridique / correction.

### P3 — Le tarif Pro est présenté avant le Gratuit (tension avec le discours)
- **Emplacement** : `home.html:949-974` — la carte `tier pro` est le premier enfant de `.tiers` (donc à gauche en desktop et **au-dessus** en pile mobile, cf. CSS `home.html:451-452`).
- **Observation** : le titre de section dit « L'essentiel est gratuit. Le Pro suit votre garde. », mais la première carte que l'œil rencontre est la payante (bordure ambre `home.html:454`). Léger décalage entre le récit « d'abord gratuit, sans pression » et la mise en page qui pousse le payant en tête.
- **Impact** : **faible**. Pas bloquant, mais une friction de perception dans une marque qui se veut sans surpromesse.
- **Preuve** : ordre DOM (`home.html:950` pro puis `964` free) + `.tiers{grid-template-columns:1fr 1fr}` qui empile Pro en premier < 700px.
- **Reco** : mettre Gratuit à gauche/en premier, garder la bordure ambre pour signaler le Pro. Le récit « l'essentiel est gratuit » et la lecture coïncident.
- **Exemple concret** : intervertir les deux blocs `.tier` dans le gabarit ; conserver `class="tier pro"` sur la carte Pro pour l'accent.
- **Effort** : <30min. **Confiance** : faible.

### P3 — Aucune porte d'entrée « établissement / école » pour les formateurs
- **Emplacement** : offre globale (IAP consumer uniquement).
- **Observation** : l'offre est 100 % achat individuel App Store. Aucun dispositif pour un IFSI, un formateur ou un service qui voudrait déployer/recommander Pro à un groupe. Pour ces profils, la perception n'est pas « prix trop cher » mais « pas d'offre pour nous ».
- **Impact** : **faible** au lancement (le gratuit couvre déjà l'usage étudiant/formation), mais c'est un canal de croissance laissé de côté.
- **Preuve** : `pricing` ne contient que des SKU individuels ; aucune mention volume/éducation sur le site.
- **Reco** : ne rien changer au lancement, mais garder en backlog une piste B2B/éducation (Apple Volume Purchase, ou simplement une page « Pour les écoles »). Ne pas la traiter comme une remise mais comme un canal.
- **Exemple concret** : futur lien footer « Pour les établissements » → contact@dropp.care. À décider post-lancement.
- **Effort** : >1sem (si mené). **Confiance** : faible. **Type** : decision-strategique.

---

## 3. Analyses transverses demandées

**Abonnement justifié vs usage ?** Oui pour l'annuel et le à vie ; le mensuel est le plus fragile. L'usage est intermittent (par garde), ce qui rend un mensuel 2,99 € facile à résilier après un mois. C'est une raison de plus de mettre l'**annuel avec essai** en avant (P1) : il capture la valeur avant la première tentation de résiliation.

**Trois formules = trop complexe ?** Non. Mensuel / annuel-essai / à vie est un triptyque standard et lisible. La complexité perçue vient de la **présentation** (une ligne dense, P1), pas du nombre de formules. Ne pas supprimer de formule.

**Le à vie est-il pertinent ?** Oui. Pour un public anti-abonnement (soignants, étudiants) et une marque « données locales, sans compte », le à vie renforce la confiance et convertit les réfractaires à la récurrence. Risque de cannibalisation limité tant que le prix (49,99 €) reste ~2,5× l'annuel. **Conserver**, mais afficher le break-even pour le rendre lisible comme un choix rationnel, pas une dépense.

**Faut-il baisser les prix ?** **Non — le problème n'est pas tarifaire.** 2,99/19,99/49,99 € est cohérent avec la valeur (outil pro, gain de temps et de sécurité par garde), avec le coût des alternatives (aucune app équivalente identifiée côté recon) et avec l'habitude App Store santé. Le frein probable n'est pas le montant mais (a) la lisibilité des prix, (b) le doute sur l'abonnement, (c) la frontière iPhone/Watch non énoncée. Corriger ces trois points avant de toucher au prix.

**Perception par profil :**
- **Étudiant infirmier** : reste sur le gratuit (calcul = son besoin ; possède rarement une Apple Watch). Bien servi, futur acheteur. Pas de remise nécessaire.
- **Salarié hospitalier** : cible cœur du Pro (Watch au poignet, mains prises). L'annuel-essai est fait pour lui ; à valoriser.
- **Libéral (IDEL)** : sensible au à vie (anti-abonnement, dépense pro déductible). Bien couvert.
- **Utilisateur Apple Watch** : c'est LE persona payant ; d'où l'importance d'énoncer « Watch = Pro » sans le vivre comme une punition (P2).
- **Formateur / établissement** : pas d'offre dédiée (P3) ; non bloquant au lancement.

**Stratégie conversion gratuit → premium :** le déclencheur naturel est double — atteindre la limite « une perfusion suivie » et vouloir le poignet. Le site expose déjà bien la valeur Pro (5 sections). Il manque surtout de faire du **7 jours d'essai** le CTA explicite et d'énoncer la frontière iPhone/Watch. Le moteur est là ; il faut l'armer, pas le refondre.

---

## 4. Ce qu'il ne faut PAS faire
- Ne pas faire payer l'alarme de fin, ni introduire de pub côté free.
- Ne pas supprimer le à vie ni fusionner des formules.
- Ne pas baisser les prix avant d'avoir corrigé lisibilité + transparence + frontière iPhone/Watch.
- Ne pas transformer le gratuit en démo limitée dans le temps.

---

*Sources : `locales/fr/home.json` (bloc `pricing`, `faq`, `hero`, `pro`), `locales/{en,ja,de,pt-br}/home.json`, `src/templates/home.html:451-461` (CSS tiers) et `:946-979` (section Tarifs), `docs/audit-agents/01-reconnaissance.md` §4–7.*
