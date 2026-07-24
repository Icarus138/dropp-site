# Agent 10 — Produit / Activation / Rétention

> Périmètre : au-delà de l'acquisition. Moment de première valeur, action de
> la 1re session, hook de rétention, justification d'un abonnement récurrent,
> habitude, utilité réelle de l'Apple Watch, causes de désinstallation,
> fonctions à garder simples vs ajoutables. Sources : site (recon 01), fiche
> App Store, `dropp-native` lu en Read. Chaque affirmation est sourcée
> (fichier/ligne ou section). Read-only.

## Méthode & preuves lues

- `Dropp/DroppApp.swift` (entrée app), `Dropp/Views/RootView.swift` (flow 3 slides),
  `Dropp/Views/NewSessionView.swift` (action primaire + T1), `Dropp/Views/SceneView.swift`
  (scène/tempo + T2), `Dropp/Views/DoneView.swift` (écran de fin), `Dropp/Views/SettingsView.swift`
  (lignes fantômes Pro), `Dropp/Views/PaywallView.swift`,
  `DroppKit/Sources/DroppKit/AppState.swift`, `DroppKit/Sources/DroppKit/LocalNotificationScheduler.swift`.
- Grep vérifiés (absences confirmées) : `requestReview`/`SKStoreReview` = **0 occurrence** ;
  `WidgetKit`/`Complication` = **0** ; `AppIntent`/`Shortcut` de lancement = **0**
  (seul `WatchDoubleTap.swift` référence AppIntents, pour le geste Double Tap, pas un raccourci Siri) ;
  `onboard`/`firstLaunch`/`tutorial` = **0** ; gestion de la permission notif `.denied` = **0**
  (seul test : `authorizationStatus == .notDetermined` dans `LocalNotificationScheduler.swift:96`).

---

## 1. Le hook de rétention est le bon — et il est bien construit

Le brief est correct sur le fond : **l'alarme de fin est le hook, elle est
gratuite « pour toujours », et elle n'est jamais monétisée.**

- `LocalNotificationScheduler.swift:100-121` : la notif de fin (S1) est toujours
  programmée, dès la création, sur date absolue (`endsAt`).
- `AppState.reconcileNotifications()` (`AppState.swift:409-413`), appelé au lancement
  (`RootView.swift:72`) : ré-arme les alarmes des perfusions en cours après
  redémarrage, mise à jour ou réinstallation. Le hook **survit** aux événements
  qui, sinon, videraient la file de notifications. C'est le bon niveau de soin.
- `DoneView.swift:40-48` : à la fin fraîche, la mélodie « G » est jouée in-app
  (catégorie playback) pour retentir même en mode silencieux.

**C'est la meilleure chose du produit côté rétention.** Le raisonnement est
juste : à chaque perfusion, le soignant a une raison de revenir (calculer +
être prévenu), et cette raison ne coûte rien. À conserver tel quel.

## 2. Moment de première valeur : quasi instantané (force)

- `RootView.swift:39-52` + `SceneView.swift:37-72` : les valeurs par défaut
  (`draftVolume=500`, `draftDuration=240`, `NewSessionView.swift:14`) produisent
  **immédiatement** un aperçu vivant sur la slide Scène (500 × 20 / 240 = 42 gtt/min),
  avant même de créer une session. La « première valeur » (voir un chiffre juste)
  est atteinte en quelques secondes, sans compte, sans friction.
- L'action primaire (« Calculer », `NewSessionView.swift:67-77`) est unique,
  centrale, claire.

À protéger : ne pas alourdir cette première slide.

## 3. Le point aveugle critique : la permission de notification

**Tout le hook repose sur une permission jamais préparée et jamais rattrapée.**

- La demande d'autorisation est contextuelle (`ensureAuthorization`,
  `LocalNotificationScheduler.swift:93-98`), déclenchée à la 1re création de
  session. Bon principe (pas de prompt au lancement à froid).
- **MAIS** : si l'utilisateur refuse, l'app ne le détecte **nulle part**
  (`authorizationStatus == .denied` n'est testé dans aucune vue — grep = 0).
  L'alarme de fin — le hook entier — ne se déclenchera jamais, **en silence**.
  L'utilisateur croit que « ça marche », rate une fin, et conclut que l'app ne
  sert à rien. C'est le scénario de désinstallation le plus probable et le plus
  invisible.
- Il n'existe aucun écran d'amorçage (« Dropp vous préviendra à la fin —
  autorisez les notifications ») ni aucun bandeau de rattrapage vers Réglages.

C'est le **P0 rétention**. Le produit est bien conçu partout sauf sur la
condition dont dépend son unique raison de revenir.

## 4. La boucle d'habitude est fragile pour le Free (friction par usage)

Pour bénéficier du hook, le Free doit, **à chaque perfusion** : sortir
l'iPhone, ouvrir l'app, régler volume + durée aux molettes
(`NewSessionView.swift:149-182`), taper Calculer. En contexte de soin (mains
occupées, champ propre, iPhone en poche), c'est une friction réelle et répétée.

- **Aucun widget** écran verrouillé / accueil, **aucun Control Center**, **aucun
  raccourci Siri / App Shortcut** pour lancer une perfusion (grep WidgetKit /
  AppIntents de lancement = 0). Or ce sont exactement les surfaces qui
  transforment un outil utile en **réflexe**.
- L'Apple Watch (Pro) résout cette friction — mais elle est payante. Le Free
  reste condamné à ressortir le téléphone. Un widget de lancement **gratuit**
  ferait plus pour l'habitude (donc pour la conversion ultérieure) qu'une
  fonction Pro de plus.

## 5. Apple Watch : le vrai levier Pro (force à protéger)

L'analyse produit est juste : pour la cible (mains prises, geste stérile,
téléphone rangé), **l'app au poignet est le bénéfice Pro le plus défendable**
(`PaywallView.swift:31`, `SceneView.swift:104-106`, T2 `AppState.swift:197-209`).
Haptique de calage, alertes au poignet sans sortir l'iPhone : c'est un besoin
réel, pas un gadget. C'est le message d'upsell à garder au centre. Ne pas le
diluer derrière les thèmes ou la scène 3D (qui sont du confort, pas un
changement de comportement).

## 6. Justification d'un abonnement récurrent : tension structurelle

Un calculateur-utilitaire est un mauvais candidat à l'abonnement : **il n'y a
ni contenu qui évolue, ni cloud, ni coût serveur** (revendiqué : zéro serveur).
La valeur Pro (Watch, perfusions multiples, thèmes, historique local — toutes
`PaywallView.swift:30-38`) est perçue comme un **déblocage ponctuel**, pas comme
un service récurrent.

- Conséquence saine : l'option « à vie » (49,99 €, `PaywallView.swift:86-92`) est
  la plus honnête et **cannibalisera** logiquement l'abonnement. C'est cohérent
  avec le pilier « un seul achat » — à assumer, pas à corriger.
- Risque : l'annuel auto-renouvelable (19,99 €, essai 7 j) sur une valeur
  ressentie comme ponctuelle génère un terrain à **résiliations et demandes de
  remboursement** au 2e prélèvement. Position recommandée : traiter
  l'abonnement comme une **rampe d'accès à faible engagement** (essai + mensuel),
  mettre en avant le « à vie » comme destination, et surveiller le taux de
  renouvellement annuel plutôt que d'en faire le cœur du modèle.

## 7. Aucune boucle de preuve sociale / réactivation (0 avis)

- Fiche App Store : **0 avis / 0 note** (recon 01, §5).
- `requestReview` / `SKStoreReviewController` = **0 occurrence** dans le code.
  Le meilleur moment pour demander un avis — juste après une perfusion menée à
  terme, sur `DoneView` (`DoneView.swift`) — n'est pas exploité.

Manque un levier double : les premières notes (indispensables à l'ASO et à la
confiance d'un acheteur de 49,99 €) **et** un micro-rappel de valeur (« ça a
marché ») qui consolide l'habitude. À câbler avec parcimonie (Apple plafonne à
3 prompts/an), après N fins réussies.

## 8. Causes probables de désinstallation (synthèse)

1. **Notif refusée → hook muet** (silencieux). §3. Impact critique.
2. **Décalage de langue** : la fiche déclare « Anglais », l'UI est 100 % FR
   (recon 01, §5-6). Un anglophone installe, tombe sur du français, rebondit
   dès la 1re session (et pose potentiellement une 1re note négative). Impact
   important sur l'activation des non-francophones.
3. **Friction par usage** (Free sans widget/raccourci). §4. Impact modéré,
   cumulatif.
4. **Fréquence réelle du job-to-be-done** : le calcul de débit en gouttes
   (perfusion par gravité) n'est pas quotidien pour tous les profils (pompes
   volumétriques fréquentes en établissement). Si le contexte de l'utilisateur
   mobilise rarement la perfusion par gravité, l'usage s'espace et l'app est
   oubliée. C'est le **plafond de rétention structurel** — à valider, pas à
   supposer.

## 9. Fonctions à garder simples (ne pas dégrader)

- Le calculateur volume/durée/facteur → gtt/min. Ne **jamais** y greffer calcul
  de dose/posologie, base médicamenteuse, données patient (risque MDR + Apple
  1.4.1 ; cf. discipline déjà tenue : plafonds anti-journal du mode tap,
  `AppState.swift:361-376`). La sobriété de l'action primaire est un actif.
- Les paywalls contextuels **non bloquants** avec issue gratuite (T1 «
  Remplacer », `NewSessionView.swift:321-332` ; T2 bandeau 1/jour,
  `AppState.swift:197-209` ; T3 Watch verrouillée) : le Free n'est jamais coincé.
  À conserver — c'est ce qui protège la rétention du Free.
- La pause de perfusion (gratuite, `AppState.swift:308-332`) : bien vue, réduit
  la frustration sans monétiser un besoin de sécurité.

## 10. Roadmap rétention

**Maintenant (P0/P1)**
- Amorçage + rattrapage de la permission notif (§3) : un écran de valeur avant
  la 1re demande, et un bandeau persistant si `.denied` renvoyant vers Réglages.
- Prompt d'avis in-app après N fins réussies, depuis `DoneView` (§7).
- Corriger le décalage de langue de la fiche (activation non-FR) — cf. agent ASO
  pour la mécanique, mais l'impact est rétention/première session.

**Ensuite (P1/P2)**
- Widget écran verrouillé / accueil + App Shortcut « Nouvelle perfusion »
  **gratuits** pour créer l'habitude et réduire la friction par usage (§4).
- Rappel de valeur discret dans l'historique Pro (compte de perfusions menées à
  terme) — sans horodatage patient, pour rester hors périmètre réglementaire.

**Plus tard**
- Complication Watch (déjà annoncée Pro) ; scène 3D / thèmes = confort, priorité
  basse.

**À éviter**
- Empiler des fonctions Pro « de plus » (thèmes, scènes) en croyant justifier
  l'abonnement : elles ne changent pas le comportement et n'améliorent pas la
  rétention. Le levier est le poignet + la réduction de friction, pas la
  décoration.
- Tout ce qui approche la donnée patient ou le calcul de dose.

---

## Note de potentiel de rétention : 68 / 100

Fondations solides et rares : le hook (alarme gratuite, robuste aux relances)
est le bon, la première valeur est instantanée, les paywalls ne piègent jamais
le Free, l'Apple Watch est un levier Pro réellement aligné sur la cible. Ce qui
plafonne la note : la permission notif non préparée et non rattrapée (échec
silencieux du hook), l'absence totale de surfaces d'habitude (widget/raccourci)
et de boucle d'avis, une justification d'abonnement récurrent structurellement
faible, et une fréquence d'usage du job-to-be-done non validée. Le socle mérite
75+ ; les gaps d'activation-vers-habitude coûtent les points.
