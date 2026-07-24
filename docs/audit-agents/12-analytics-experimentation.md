# Agent 12 — Mesure & expérimentation

> Périmètre : instrumentation, funnel, métriques essentielles vs vanité, tableau de bord minimal, plan d'A/B tests, protocole test utilisateur. Read-only. Chaque affirmation est sourcée (fichier/ligne/section). Impact qualitatif (faible/modéré/important/critique). Confiance : élevé (démontré) / moyen (probable) / faible (hypothèse).

## 0. Résumé exécutif

Dropp est, aujourd'hui, **aveugle sur tout son haut de funnel**. Le site (`dropp.care`) n'a **aucun analytics, aucun cookie, aucun log exploitable** — c'est confirmé dans le code (aucune occurrence de `analytics|gtag|plausible|sendBeacon|track` dans `src/`, `scripts/`, `*.html`). C'est un choix revendiqué **et écrit dans les pages légales** : `locales/fr/legal.json:14` (« Ce site ne dépose aucun cookie et ne collecte aucune donnée personnelle »), `locales/fr/privacy.json:3` (« pas d'outil d'analyse »), `privacy.json:18` (« Le principe fondateur — aucune collecte — ne changera pas »).

La tension de la mission est donc plus dure qu'un simple arbitrage produit : **ajouter un analytics site contredirait une promesse juridique publiée**, pas seulement une posture marketing. Bonne nouvelle : on peut mesurer l'essentiel **sans toucher à cette promesse**, parce que l'essentiel se mesure **côté Apple** (App Store Connect / App Analytics), et non côté site. Le site continue de « ne rien collecter » ; c'est Apple qui agrège, à l'insu de personne, en opt-in utilisateur.

Le vrai problème n'est pas « faut-il trahir la promesse » — c'est que **le pont de mesure le moins cher et 100 % compatible avec la promesse n'est pas posé** : les 3 CTA App Store partent en URL nue (`site.config.json:4` → `https://apps.apple.com/app/id6792277373`, sans token de campagne `ct`). Résultat : impossible de savoir si un téléchargement vient du site, ni de comparer les CTA entre eux, alors qu'Apple offre ce join gratuitement et sans cookie.

**Note de maturité mesure : 22/100.** Justification : instrumentation quasi nulle, funnel jamais défini, aucun tableau de bord, aucun plan d'expérimentation, attribution site→store cassée. La note n'est pas 0 parce que (a) la source de vérité gratuite et respectueuse (App Store Connect) existe déjà et n'attend qu'exploitation, (b) la posture zéro-donnée est cohérente et constitue un actif, (c) les UTM entrants sont déjà préservés dans la navigation.

---

## 1. Forces à conserver (ne pas dégrader)

- **F1 — Posture « zéro collecte » cohérente et écrite noir sur blanc.** `privacy.json:5` (« Dropp ne collecte aucune donnée. Aucune »), `legal.json:14`, section Confiance `home.json:182`. C'est un différenciateur crédible sur un marché soignant (données de santé). **Ne pas la fissurer par commodité de mesure.** Toute mesure ajoutée doit passer le test : « le site continue-t-il de littéralement ne rien déposer ni collecter ? » Le token `ct` (reco P0) passe ce test ; un script Plausible/GA ne le passe pas.
- **F2 — UTM déjà préservés dans la navigation.** `root.html:38` et `i18n.js:42-44` transmettent `location.search`+`hash` à la redirection de langue et au changement de langue. La plomberie de propagation de paramètres existe déjà — il ne manque que le dernier maillon (vers le lien App Store).
- **F3 — Pile technique minimale = surface de mesure honnête.** 0 dépendance, 0 framework (`package.json`). Aucune dette d'instrumentation « fantôme » (pixels tiers oubliés, tags marketing zombies). On part d'une page blanche propre.
- **F4 — App neuve, non encore lancée publiquement (« Été 2026 »).** C'est le bon moment pour poser la mesure *avant* le trafic, pas après. Aucun historique à migrer.

---

## 2. La tension « mesurer sans trahir » — analyse honnête

### 2.1 Ce que la promesse interdit réellement
La promesse porte sur **le site et l'app** : pas de cookie, pas de collecte, pas d'outil d'analyse *embarqué*. Elle ne dit rien — et ne peut rien dire — sur les **statistiques agrégées qu'Apple produit de son côté** quand un utilisateur télécharge/ouvre l'app et a activé « Partager avec les développeurs d'apps ». Ces données sont : agrégées, anonymisées, opt-in côté utilisateur, sans PII, sans SDK, sans une ligne de code ajoutée. **Les exploiter ne contredit aucune phrase publiée.**

### 2.2 Trois niveaux de mesure, classés par compatibilité avec la promesse

| Source | Ce qu'elle donne | Coût promesse | Verdict |
|---|---|---|---|
| **App Store Connect — App Analytics** (impressions, vues fiche, downloads, sessions, rétention, crashs) | Funnel de la fiche jusqu'à la rétention, agrégé | **Nul** (Apple, opt-in user, aucun code) | **À exploiter immédiatement** |
| **App Store Connect — Campagnes (`ct`)** + **Product Page Optimization** | Attribution par CTA/source + A/B natif de la fiche | **Nul** (paramètre d'URL + outil Apple) | **À poser (P0/P1)** |
| **App Store Connect — Abonnements / Sales & Trends** | Essais, conversion essai→payant, churn, proceeds | **Nul** (Apple) | **À exploiter** |
| Analytics site **cookieless** (Plausible/Fathom/Cloudflare Web Analytics) | Visites, sources, scroll, clics CTA sortants | **Élevé** : contredit `privacy.json:3` (« pas d'outil d'analyse ») et `legal.json:14` ; imposerait MAJ pages légales | **Déconseillé à ce stade** (voir P1 décision) |
| Événements **in-app custom** (SDK type PostHog/Firebase, activation, écrans) | Activation, first-value, funnel in-app fin | **Critique** : contredit « aucune donnée collectée » (`home.json:182`) ; imposerait consentement + refonte confidentialité + revue App Store Privacy | **Déconseillé** (proxys Apple suffisent) |

**Conclusion de la tension :** il n'y a *presque pas* de tension si l'on accepte que la mesure vit **côté Apple, pas côté site/app**. Le seul angle mort qui resterait — « combien de visiteurs du site, et lesquels cliquent » — est précisément celui qui coûte le plus cher à la promesse et rapporte le moins tant que le trafic est faible. On peut vivre sans, longtemps.

---

## 3. Le funnel — mesurable vs aveugle

| Étape | Où ça vit | Mesurable aujourd'hui ? | Source | Avec la reco P0 (`ct`) |
|---|---|---|---|---|
| **1. Visite site** | dropp.care | ❌ Aveugle | — (GitHub Pages ne donne pas de logs) | ❌ (reste aveugle) |
| **2. Compréhension / engagement** (scroll, démo, film) | dropp.care | ❌ Aveugle | — | ❌ |
| **3. Clic CTA App Store** (hero/tarifs/badge) | dropp.care → sortant | ❌ Aveugle côté site | — | ⚠️ Attribuable *côté Apple* : vues fiche par `ct` |
| **4. Impression / vue fiche** | App Store | ✅ | App Analytics : Impressions, Product Page Views | ✅ + segmenté par source |
| **5. Installation** | App Store | ✅ | App Analytics : First-Time Downloads | ✅ + segmenté par `ct` |
| **6. Ouverture** | App | ✅ (agrégé, opt-in) | App Analytics : Sessions, Active Devices | ✅ |
| **7. Activation** (1er calcul mené au bout) | App | ⚠️ Proxy seulement | Proxy = rétention J1 + sessions/appareil | ⚠️ (event custom = coût promesse) |
| **8. Essai** (trial 7 j) | App Store | ✅ | App Store Connect : Subscriptions → Trials | ✅ |
| **9. Abonnement** (essai→payant) | App Store | ✅ | Subscriptions : conversion rate, paid subs | ✅ |
| **10. Renouvellement / churn** | App Store | ✅ | Subscriptions : retention, cancellations, churn | ✅ |

**Lecture :** le funnel est **entièrement mesurable de l'étape 4 à 10** via App Store Connect, gratuitement, sans trahir la promesse. Les étapes **1-3 (le site) sont un trou noir**, et le **join 3→4 est cassé** faute de token `ct`. L'activation (7) n'est mesurable que par proxy tant qu'on refuse un SDK — ce qui est le bon arbitrage.

---

## 4. Métriques essentielles vs vanité

**Essentielles (pilotent des décisions) :**
- Taux de conversion fiche : **Product Page Views → First-Time Downloads** (le KPI n°1 de l'ASO).
- Taux de conversion impression → download.
- **Downloads attribués au site** (via `ct`) vs autres sources.
- **Taux de démarrage d'essai** (downloads → trials) et **conversion essai→payant**.
- **Churn / rétention d'abonnement** (M1, M3).
- **Rétention app J1 / J7 / J28** (proxy d'activation et de valeur réelle).
- **Taux de crash** et **désinstallations** (santé produit).

**Vanité (à ne pas piloter dessus) :**
- Nombre cumulé de téléchargements (flatte, ne dit rien de la santé).
- Impressions brutes seules (sans le taux de conversion aval).
- « 14 langues » comme trophée (couverture ≠ demande ; à corréler aux downloads par territoire).
- Sophistication du hero WebGL / du film (esthétique ≠ conversion tant que non mesuré).
- Sessions totales sans rétention.

---

## 5. Tableau de bord minimal (1 page, hebdomadaire, 100 % App Store Connect)

Aucun outil à acheter. Extraction manuelle hebdo (ou export API App Store Connect) dans un tableur.

**Bloc A — Acquisition (fiche)**
- Impressions | Product Page Views | First-Time Downloads | **Taux conversion vue→download** (%)
- Downloads par `ct` : `site_hero` / `site_pricing` / `site_badge` / (organique/recherche)

**Bloc B — Activation & rétention**
- Sessions / appareil actif | Rétention J1 / J7 / J28 | Désinstallations

**Bloc C — Monétisation**
- Essais démarrés | Conversion essai→payant (%) | Abonnements actifs (mois/an/à vie) | **Churn M1** | Proceeds

**Bloc D — Santé**
- Taux de crash | Note moyenne / nb d'avis (aujourd'hui 0/0, cf. Agent 7)

Règle : **4 blocs, une page, un chiffre + sa tendance vs semaine précédente.** Pas de graphe décoratif. Si une ligne ne peut pas déclencher une décision, elle sort du tableau.

---

## 6. Plan d'A/B tests priorisé

> **Avertissement de puissance statistique (critique).** Au moment de l'audit : **0 téléchargement, 0 avis, app non indexée** (recon §5). **Aucun A/B test n'est concluant à volume nul.** La priorité n'est pas « lancer des tests » mais **poser la mesure, générer du trafic, puis tester**. Tout test ci-dessous suppose d'avoir d'abord atteint un volume minimal. Ne pas conclure sur < ~100 conversions/variante (ordre de grandeur ; en pratique viser plusieurs centaines de vues fiche/variante avant de lire un résultat).

### Lane 1 — Product Page Optimization (Apple natif, coût promesse nul)
Outil intégré App Store Connect, jusqu'à 3 traitements, répartition et significativité gérées par Apple, aucun tracking utilisateur.

| # | Hypothèse | A (contrôle) | B (variante) | Métrique de décision | Risque | Volume mini | Décision |
|---|---|---|---|---|---|---|---|
| T1 | La 1re capture ne montre pas la valeur en 1 s | 1re capture actuelle | 1re capture = résultat gtt/min plein écran | Conversion vue→download | Faible (réversible) | ~plusieurs centaines de vues/variante | Garder la gagnante si écart net et stable |
| T2 | L'icône ne signale pas « perfusion/soin » | Icône actuelle | Icône avec signal goutte/cadence renforcé | Conversion vue→download | Faible | idem | idem |
| T3 | Le sous-titre « Rythme de perfusion » sous-vend le calcul | Sous-titre actuel | « Débit de perfusion en gouttes/min » | Impression→download | Faible | idem | idem |

### Lane 2 — Attribution des CTA du site (via `ct`, pas un A/B au sens strict)
Pas une répartition aléatoire : chaque CTA porte un `ct` distinct, et on **compare les downloads attribués**. Permet de savoir quel CTA travaille (hero vs tarifs vs badge closing) sans aucun analytics site.

### Lane 3 — A/B du site lui-même : **reporté, assumé**
Un vrai A/B site (variante de hero, d'ordre de sections, de wording CTA) exige une couche de mesure d'objectif côté site — donc soit un analytics (coût promesse), soit un split déployé + lecture via les `ct` App Store. **Recommandation : ne pas faire d'A/B site avant** (a) un volume réel et (b) une décision explicite sur la couche de mesure (P1 ci-dessous). D'ici là, itérer au jugement + retours qualitatifs (§7), pas en A/B non mesuré (ce qui donnerait une fausse impression de rigueur).

---

## 7. Protocole test utilisateur — 5 à 8 soignants

Le quantitatif est aveugle en haut de funnel ; **le qualitatif comble le trou sans rien collecter**. 5 utilisateurs révèlent ~85 % des problèmes d'usabilité majeurs (loi des rendements décroissants de Nielsen) ; 6-8 pour couvrir 2 profils (infirmier expérimenté / étudiant infirmier).

**Format :** test modéré, individuel, 30-40 min, en présentiel ou visio partage d'écran. Penser à voix haute. Aucune donnée patient. Enregistrement seulement avec consentement explicite, supprimé après analyse (cohérent avec la posture).

**Recrutement :** 3-4 infirmiers en poste (services à perfusions gravitaires : gériatrie, médecine, domicile/HAD) + 2-3 étudiants IFSI. Éviter les proches non-soignants (biais de complaisance).

**Tâches (site puis app) :**
1. « Arrivez sur dropp.care. En 20 s, dites à quoi sert cette app et à qui. » → mesure de **compréhension** (le pitch passe-t-il ?).
2. « Que coûte l'app ? Qu'est-ce qui est gratuit, qu'est-ce qui est payant ? » → clarté offre (croise Agent pricing).
3. « Cette app est-elle un dispositif médical selon vous ? » → **vérifie la perception du disclaimer** (risque réglementaire/confiance).
4. (App) « Vous devez passer 500 mL en 8 h avec un perfuseur 20 gtt/mL. Trouvez le débit. » → **succès de tâche + temps + erreurs**.
5. (App) « Lancez le suivi, montrez comment vous sauriez que c'est bientôt fini. » → découverte de la valeur cœur.
6. « Qu'est-ce qui vous ferait payer / ne pas payer le Pro ? » → objections de conversion.

**Mesures qualitatives :** taux de succès par tâche (binaire), temps de complétion, points de friction verbalisés, **malentendus** (surtout tâche 3 : confusion « dispositif médical »), une note de confiance déclarée (1-5) « recommanderais-je à un collègue ». 

**Décision :** un problème vu par ≥ 2/5 utilisateurs = à corriger avant de scaler l'acquisition. Prioriser les échecs de tâche 1, 3, 4 (compréhension, réglementaire, calcul).

---

## 8. Constats détaillés (findings)

Voir l'objet structuré pour le détail complet (emplacement, observation, impact, reco, exemple, effort, risque, confiance, priorité). Synthèse :

- **P0** — Attribution site→App Store cassée : les 3 CTA partent en URL nue (`site.config.json:4`). Ajouter un token `ct` par CTA. Coût promesse nul.
- **P0** — App Store Connect App Analytics non structuré en source de vérité : définir le funnel §3 + le tableau de bord §5 dès maintenant, avant le lancement « Été 2026 ».
- **P1** — Décision stratégique : trancher explicitement « analytics site : jamais » (aligné sur la promesse publiée) vs « un jour, cookieless + MAJ légale ». Aujourd'hui : rester pur, s'appuyer sur Apple.
- **P1** — Funnel + métriques essentielles vs vanité jamais formalisés : adopter §3-4.
- **P1** — Product Page Optimization non utilisé + tests sous-puissants à volume nul : préparer T1-T3, ne lancer qu'après trafic.
- **P2** — Protocole test utilisateur soignants absent : lancer §7 avant de scaler l'acquisition.
- **P2** — Angle mort activation in-app : assumer le proxy rétention J1/J7 plutôt qu'un SDK qui casserait « aucune donnée collectée ».
- **P3** — Piège métriques de vanité (downloads cumulés, « 14 langues ») : bannir du pilotage.

---

## 9. Note de maturité mesure : **22 / 100**

| Dimension | État | /pts |
|---|---|---|
| Instrumentation site | Nulle (assumée) — trou noir top-funnel | 3/20 |
| Exploitation App Store Connect | Disponible, non structurée en dashboard/funnel | 6/25 |
| Attribution site→store | Cassée (pas de `ct`) | 2/15 |
| Funnel & KPI définis | Inexistants | 3/15 |
| Culture d'expérimentation (A/B, PPO) | Aucune ; volume nul | 3/15 |
| Qualitatif / test utilisateur | Aucun protocole | 5/10 |

La note est **basse mais pas catastrophique** : tout le socle gratuit et respectueux existe (App Store Connect), la posture est cohérente, et l'app est pré-lancement — c'est le bon moment pour poser la mesure du premier coup. Le levier le plus rentable et le moins coûteux pour la promesse (token `ct`) coûte < 2 h.
