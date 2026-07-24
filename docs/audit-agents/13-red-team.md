# Agent 13 — Red team / contradicteur

> Rôle : contester les conclusions des agents 02 à 12. Chaque contestation = une reco douteuse, pourquoi elle est fragile, comment trancher, le test ou la donnée manquante. Voix sans complaisance. Je ne conteste pas pour contester : je nomme aussi ce qui est solide et ne doit pas être dégradé.

## Confiance globale dans l'audit : 72/100

L'audit est sérieux : preuves liées (fichier/ligne/texte exact), niveaux de confiance annoncés, bon respect des garde-fous (pas de tracking, pas de dose, pas de fichier patient). Quatre biais méthodologiques l'affaiblissent :

1. **Sur-comptage.** Trois thèmes (0 avis, langue déclarée EN, « éprouvé sur le terrain ») sont comptés 3 à 5 fois, chacun gonflant le score d'un domaine différent. Cela crée une fausse impression de récurrence : ce sont 3 actions, pas 12 problèmes.
2. **Inversion de priorité.** La seule chose qui peut légalement stopper la distribution (qualification MDR) est classée P2, pendant que la formulation du hero est P0.
3. **Intuition présentée comme fait.** Plusieurs recos CRO (nommer la fonction dans le hero, CTA collant, dark mode) sont données en confiance « élevé » alors qu'aucune n'est mesurée, et que l'agent 12 démontre qu'aucune mesure n'existe pour les valider.
4. **Notation pénalisant l'état pré-lancement.** Les scores bas (12 à 22, 05/08/11 dans les 60) sont surtout tirés par des états qui se résolvent au lancement (0 avis, pas encore localisé, pas d'analytics), traités comme des défauts de qualité.

---

## Ce qui est solide et ne doit pas être dégradé

- **Agent 10 P0 — permission notif refusée = échec silencieux.** Vérifié dans le code : `LocalNotificationScheduler.swift:96` ne teste que `.notDetermined`, aucun `.denied` nulle part, 0 `requestReview`, 0 `WidgetKit`. C'est le finding le plus concret et le plus rentable de tout l'audit. À traiter en premier.
- **Agent 12 P0 — tokens `ct` sur les 3 CTA.** Vérifié : `site.config.json:4` = URL nue. L'ajout d'un `ct` par CTA est réellement à coût nul, sans cookie, sans JS, et l'agrégation reste côté Apple : la promesse « aucune donnée » tient littéralement. Meilleur rapport valeur/effort de l'audit.
- **Agents 05/09 — l'autorité du créateur-soignant, à exploiter mais sans jamais inventer.** Reco honnête, alignée sur la valeur du produit.
- **Agents 11/12 — discipline des non-goals** (pas de tracking, pas de dose, pas de fichier patient). Protège le vrai moat. À formaliser par écrit.
- **Langue déclarée EN → FR.** Correction juste, à coût nul, à faire. (Je conteste seulement l'inflation de gravité, pas le geste.)
- **Agents 06/09 — conditions d'abonnement + lien EULA absents du site.** Vrai trou de conformité et de confiance, correctement identifié.

---

## Contestations

### C1 — « Le hero doit nommer la fonction et le public » n'est pas un fait, c'est une préférence non mesurée (conteste Agent 02 P0)
- **Reco contestée :** injecter « calcul de débit de perfusion — pour infirmiers » dans le hero, classé P0/critique, confiance « élevé ».
- **Pourquoi c'est douteux :** l'affirmation « le visiteur froid bounce » est une hypothèse, pas une donnée. Le parti pris épuré du hero est une décision de marque documentée et assumée (identité premium minimale). Classer P0 un changement qui dégrade la seule chose visuellement différenciante, en confiance « élevé », sans aucune mesure, c'est de la préférence CRO habillée en fait. Contradiction interne à l'audit : l'agent 12 (score 22) démontre qu'il n'existe aucun analytics pour trancher.
- **Comment trancher :** ne pas réécrire le hero à l'aveugle. Le premier levier mesurable est l'App Store (Product Page Optimization) et le test modéré 5 utilisateurs de l'agent 12 (tâche « en 20 s, dites à quoi sert l'app et à qui »). Si ≥2/5 échouent, corriger ; sinon, la « critique » tombe.
- **Test nécessaire :** protocole agent 12 (5-8 soignants) + PPO sur la 1re capture. Aucun changement de hero avant ce signal.

### C2 — « 0 avis » compté 5 fois : un état de lancement transformé en 5 problèmes (conteste Agents 05, 07, 10, 11, 12)
- **Reco contestée :** cinq findings P1/important sur l'absence d'avis.
- **Pourquoi c'est douteux :** une app neuve a 0 avis par définition ; ce n'est pas un défaut à corriger mais un état qui se résout avec les téléchargements. La solution (requestReview après valeur reçue) est UNE action, cheap, réelle. La compter 5 fois gonfle artificiellement l'importance du thème et déprime 5 scores. Les impacts annoncés (« remboursements », « 1★ ») sont hypothétiques à 0 download.
- **Comment trancher :** dédupliquer en un seul item d'action (requestReview depuis `DoneView` après N fins réussies, plafond Apple). Juger ensuite par App Analytics une fois un volume réel atteint.
- **Donnée nécessaire :** taux d'avis obtenus / fins réussies après quelques centaines de sessions, pas avant.

### C3 — La qualification MDR est le vrai P0, pas la formulation du hero (conteste Agent 09 : priorité + contradiction interne)
- **Reco contestée :** MDR classé P2 ; en parallèle, réécrire dès maintenant en P1 « signal de sécurité » → « repère de fin » et « éprouvé sur le terrain », avant l'avis juridique que l'agent 09 dit lui-même « obligatoire ».
- **Pourquoi c'est douteux :** l'agent 09 attribue à la MDR le seul impact « critique » (droit de distribuer sans marquage CE) puis la range en P2, sous des findings CRO P0. C'est une inversion. Et il se contredit : il dit « je ne conclus pas, avis juriste obligatoire » puis recommande en P1, confiance « moyen », de vider le marketing de ses mots forts. Détruire de la valeur marketing sur une hypothèse non tranchée est prématuré selon sa propre logique.
- **Comment trancher :** l'avis de qualification MDR (règle 11 / MDCG 2019-11) devient le P0 réel, gate business. Les réécritures de copy sont réversibles : les préparer, ne pas les déployer avant l'avis. Ne pas amputer « Précision »/« signal de sécurité » tant que le juriste n'a pas dit que le faisceau penche du mauvais côté.
- **Donnée nécessaire :** note de qualification d'un cabinet spécialisé, avant toute montée en charge.

### C4 — CTA collant / header persistant : playbook CRO conventionnel qui dégrade le hero épuré (conteste Agents 02 P2/P2, 03 P2)
- **Reco contestée :** header collant + CTA après le calculateur + barre collante mobile.
- **Pourquoi c'est douteux :** c'est le réflexe CRO générique appliqué à une marque dont la différenciation EST la retenue. Aucun des agents ne mesure le gain ; le risque (banaliser l'entrée premium) est réel et non chiffré. Empiler des CTA sur toutes les sections suppose un funnel de conversion classique qu'aucune donnée ne décrit ici.
- **Comment trancher :** un seul test à la fois, une fois le trafic ct-tracké : barre CTA collante discrète vs contrôle, décision sur downloads par `ct`. Pas de déploiement sur intuition.
- **Test nécessaire :** A/B trafic réel avec attribution `ct` (dépend de C2/agent 12 d'abord).

### C5 — « Prix 15x OnDrip, tester un à-vie plus bas » repose sur des données concurrentes non vérifiées et une comparaison biaisée (conteste Agent 11 P1)
- **Reco contestée :** baisser / tester un palier à vie d'introduction face à OnDrip 2,99 $.
- **Pourquoi c'est douteux :** (a) les prix/fonctions concurrents sont marqués [NV] en reconnaissance, pas vérifiés ; l'agent 11 les asserte comme faits. (b) Comparaison pommes-oranges : le cœur de Dropp (calcul + tempo + alarme de fin) est gratuit à vie, là où OnDrip fait payer ; le « 15x » n'oppose que les à-vie et ignore le périmètre gratuit. (c) Baisser le prix dégrade la position premium que l'agent 11 lui-même désigne comme le moat. Contradiction interne.
- **Comment trancher :** vérifier d'abord les prix/fonctions concurrents de première main. Tester le prix par expérimentation de storefront réelle (conversion vue→download par palier), pas par intuition d'ancre.
- **Donnée nécessaire :** captures/prix concurrents datés + un test de prix, pas une déduction d'ancre.

### C6 — Construire un arbre SEO pour « calcul débit perfusion » contredit le positionnement (conteste Agent 08 P1 vs Agent 11 P2)
- **Reco contestée :** créer /calcul-debit-perfusion/, /gouttes-par-minute/, guides, pour ranker sur le calcul.
- **Pourquoi c'est douteux :** l'agent 11 démontre que le calcul est une commodité gratuite partout (sites IDE, calcul mental) et que la valeur ne doit PAS y être ancrée. Investir un arbre de contenu solo-dev pour gagner exactement le mot-clé-commodité, à intention de téléchargement faible, est un ROI non prouvé et une tension inter-agents. Le calcul est l'appât gratuit, pas l'argument ; en faire la porte SEO peut drainer du trafic à faible conversion.
- **Comment trancher :** valider l'intention mot-clé → download sur UNE page FR ct-trackée avant de bâtir un arbre. Étendre seulement si le download/visite est réel.
- **Donnée nécessaire :** downloads attribués (`ct`) depuis une page-outil pilote sur 3-4 semaines.

### C7 — Dark mode du site : effort lourd sur hypothèse non testée (conteste Agent 03 P2, effort >1sem)
- **Reco contestée :** thème sombre du site pour les gardes de nuit.
- **Pourquoi c'est douteux :** justifié par « l'ivoire à 22 h fait bouncer les infirmiers de nuit » — non mesuré. Forcer le clair est un choix de marque cohérent. Un refactor de tokens + QA sur 14 langues et un panneau déjà sombre est un investissement réel adossé à zéro preuve de bounce nocturne.
- **Comment trancher :** c'est une décision, pas un défaut. Exiger d'abord un signal (part de visites nocturnes, retours utilisateurs) avant d'engager le chantier. Correctifs de contraste AA (agent 03 P1) d'abord : eux sont des défauts réels et cheap.
- **Donnée nécessaire :** répartition horaire des visites (indisponible tant que zéro analytics) ou verbatims terrain.

### C8 — La notation pénalise des états pré-lancement comme des défauts (conteste la méthode d'agrégation, notamment Agent 12 à 22)
- **Reco contestée :** scores 22 (mesure), 62-63 (confiance/concurrence/SEO) tirés vers le bas par 0 avis, non-localisé, pas d'analytics.
- **Pourquoi c'est douteux :** « pas de mesure construite » n'est pas « mesure faite mal ». L'absence d'analytics découle en grande partie d'une contrainte défendable (promesse zéro donnée) ; la scorer 22/100 conflate contrainte assumée et échec. Ces états se résolvent au lancement.
- **Comment trancher :** séparer explicitement, dans la synthèse, « état pré-lancement (se résout) » de « défaut à corriger maintenant ». Ne pas moyenner les deux dans un score unique qui donne une lecture faussement alarmiste.
- **Test nécessaire :** re-scorer 30 jours après lancement public sur les mêmes axes.

### C9 — Trous factuels mineurs à ne pas propager (conteste Agents 07, 04)
- **Reco contestée :** « changer le nom App Store peut demander une revalidation Apple » (agent 07 P1) ; « éprouvé sur le terrain » traité comme 3 findings distincts (04, 05, 09).
- **Pourquoi c'est douteux :** un changement de nom/métadonnées passe par la revue de fiche, pas par une revalidation du binaire ; formulation qui exagère le frein. Et « éprouvé sur le terrain » est UNE ligne de copy (une édition 30 min), pas trois problèmes de trois domaines.
- **Comment trancher :** dédupliquer « éprouvé sur le terrain » en un seul item ; corriger la nuance revalidation binaire vs revue métadonnées.
- **Donnée nécessaire :** aucune, corrections rédactionnelles.

---

## Synthèse pour le décideur

Ordre réel recommandé, si l'on retient les findings les mieux étayés et qu'on retire le bruit :

1. **P0 réel — avis de qualification MDR** (gate business ; agent 09, remonté de P2).
2. **P0 — permission notif refusée non gérée** (agent 10, vérifié code).
3. **P0 — tokens `ct` + langue déclarée FR + requestReview** (trois corrections cheap, agents 12/07/10, dédupliquées).
4. **P1 — conditions d'abonnement + lien EULA sur le site** (agents 06/09).
5. **P1 — contraste AA du disclaimer et des libellés** (agent 03, défauts réels, pas le dark mode).
6. **À NE PAS faire à l'aveugle :** réécrire le hero (C1), empiler les CTA collants (C4), baisser le prix (C5), bâtir l'arbre SEO (C6), le dark mode (C7). Tous à conditionner à une mesure qui n'existe pas encore. Poser la mesure (`ct` + App Analytics + un test 5 utilisateurs) AVANT de toucher aux forces actuelles.
