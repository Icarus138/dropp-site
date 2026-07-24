# Agent 4 — Copywriting & Positionnement / Marque

> Périmètre : chaque texte clé du site (`locales/fr/home.json`), la fiche App Store, et le positionnement stratégique. Read-only. Chaque affirmation est sourcée (fichier/clé/ligne ou section recon). Confiance par reco. Impact qualitatif.

**Note copy : 82 / 100.** Verdict positionnement : **fort mais saboté à un endroit décisif** (la fiche App Store se déclare « convertisseur de débit », ce qui commoditise le produit là où la découverte se joue). Le site, lui, tient une voix rare de justesse pour une app santé indépendante.

---

## Synthèse

Le copy de Dropp est, dans l'ensemble, **au-dessus du niveau attendu** pour une app indépendante de santé : concret, orienté bénéfice avant fonctionnalité, empathique sans pathos, honnête sur les limites. Trois atouts structurels sont à **protéger absolument** : la triade « Calculez · Calez · Continuez », la tagline « Le rythme au poignet. La tête au soin. », et l'éthique explicite de l'offre gratuite (« L'alarme de fin ne sera jamais payante »).

Les problèmes ne sont pas de fond mais de **cohérence et de positionnement** : (1) l'App Store se dit « convertisseur » quand le site vend un « rythme » — deux catégories opposées ; (2) tics d'écriture (32 tirets cadratins, casse DROPP/Dropp mélangée) ; (3) micro-incohérences inter-surfaces (« donne » vs « bat la cadence », « Disponible » vs « Été 2026 ») ; (4) la section Pro s'annonce par un thème cosmétique plutôt que par sa vraie valeur.

---

## Forces à conserver (ne pas dégrader)

1. **La triade « Calculez · Calez · Continuez »** (`gestures`, `calc.title`, `cal.title`, `cont.title`). Allitération en C, trois verbes d'action, structure bénéfice. C'est la colonne vertébrale narrative de la marque et un vrai actif de mémorisation. Ne jamais la remplacer par des noms de fonctionnalités.
2. **La tagline « Le rythme au poignet. La tête au soin. »** (`hero.tagline`). Bénéfice émotionnel (libérer la charge mentale) avant fonction, rythme binaire, mémorable. Meilleure ligne du produit.
3. **La section « Vous connaissez ce moment »** (`moment`). Douleurs spécifiques au réel infirmier (« à refaire entre deux sonnettes », « recomptée au moindre doute »), chute juste : « Ce n'est pas une question de compétence. C'est une charge. » Empathie sans condescendance.
4. **L'éthique de l'offre gratuite** (`pricing.freeName` « un vrai outil », `pricing.freeNote` « L'alarme de fin est un signal de sécurité : elle ne sera jamais payante »). Désamorce la perception « free bridé » et pose une posture morale rare. À protéger.
5. **L'honnêteté anti-surpromesse** (`faq.a6`, `trust.clinical`, `calc.warn` « l'app refuse de battre un tempo absurde »). Le « Non » assumé au « remplace une pompe ? » est un actif de confiance ET une protection réglementaire.
6. **Le concret tactile** (`cal.body` « quand la goutte du perfuseur tombe avec celle de DROPP, vous y êtes » ; `dt.body` « Mains prises, mains gantées »). Le copy parle la langue du terrain.
7. **La signature « Rythme · Précision · Soin »** (`hero.sign`). Trois piliers déjà bien choisis (voir positionnement ci-dessous).

---

## Positionnement / Marque

### Catégorie occupée vs. catégorie à posséder

- **Occupée aujourd'hui (App Store) :** « convertisseur de débit » (texte promo, recon §5 l.49) et sous-titre « Rythme de perfusion » (recon §5 l.48). Le mot **convertisseur** range Dropp dans une catégorie **commodité, gratuite, saturée** (des dizaines de calculateurs gtt/min existent). C'est l'exact contraire de l'ambition (« éviter d'être perçu comme simple calculateur »).
- **À posséder :** **le tempo de la perfusion, au poignet.** Le différenciateur réel n'est pas le calcul (que tout le monde fait) mais le fait de **tenir la cadence** (haptique poignet + écran), de **suivre le temps** et de **prévenir**. Un calculateur calcule puis vous abandonne ; Dropp bat la mesure jusqu'à la fin. La catégorie ownable est celle du **métronome / compagnon de perfusion**, pas du convertisseur.

### Phrase manifeste (proposition)

> **« Calculer, ce n'est que le début. Dropp tient le rythme — vous gardez la tête au soin. »**

Variante courte pour signature : *« La perfusion a un rythme. Dropp le tient. »*

### Trois piliers de marque (consolident la signature existante)

1. **Rythme** — Dropp ne calcule pas seulement, il *bat* la cadence, écran + poignet. C'est le seul pilier qu'aucun convertisseur gratuit ne peut revendiquer. Pilier de différenciation.
2. **Précision** — calcul juste, refus du tempo absurde, facteurs 10/15/20/60. La rigueur sans l'effort mental. Pilier de crédibilité.
3. **Soin (sérénité)** — la fin ne repose plus sur la mémoire, données locales, sans pub, sans compte. L'attention rendue au patient plutôt qu'à l'écran. Pilier émotionnel.

### Ambiguïté calculateur / convertisseur / chronomètre / suivi

Le site jongle avec quatre registres : *calcule* (`hero.sub`), *convertisseur* (App Store), *tempo/cadence/rythme* (partout), *suit le temps* (`cont`, `hero.finalSub`). Sur le site c'est cohérent (le calcul est présenté comme la porte d'entrée, le rythme comme le cœur). **Le seul point de rupture est l'App Store**, qui aplatit tout à « convertisseur ». Décision stratégique à prendre : **aligner la fiche App Store sur le récit « rythme + suivi »** et réserver « calcul/convertit » au corps du texte, jamais au pitch d'accroche.

---

## Problèmes (triés par priorité)

### P1 — La fiche App Store se déclare « convertisseur de débit »
- **Emplacement :** texte promotionnel App Store (recon §5, l.49) : « Dropp, convertisseur de débit : gouttes/min, tempo, alarme de fin — gratuit, sans compte ni donnée. »
- **Observation :** le mot **convertisseur** est le mot-accroche, en tête, là où la découverte et le référencement se jouent. Il range le produit dans la catégorie commodité que la marque veut précisément fuir, et contredit le positionnement « rythme » tenu sur tout le site.
- **Impact : important** (positionnement + différenciation + valeur perçue de l'offre payante).
- **Reco :** réécrire l'accroche autour du rythme et du suivi, garder « gratuit / sans donnée » en preuve.
- **Exemple :** *« Dropp bat le rythme de vos perfusions : débit calculé, cadence au poignet, alerte à la fin. Gratuit, sans compte ni donnée. »*
- **Effort :** <30min. **Risque :** faible (champ ASC éditable). **Confiance : élevé.** **Type :** decision-strategique.

### P1 — La section Pro s'annonce par un thème cosmétique
- **Emplacement :** `home.json` `pro.title` (l.129) « Le thème Graphite — et tout ce qui veille avec. » et `pro.eyebrow` « Aperçu Pro ».
- **Observation :** le titre du bloc Pro met en tête un attribut **esthétique** (thème sombre). La vraie valeur Pro — Apple Watch complète, perfusions simultanées, pré-alerte, rappels adaptatifs — passe en second. On sous-vend l'offre payante en l'annonçant par sa décoration.
- **Impact : modéré** (conversion Pro).
- **Reco :** titrer sur la capacité (ce qui veille pour vous), faire du thème une preuve visuelle, pas l'accroche.
- **Exemple :** *« Pro : tout ce qui veille pendant que vous soignez. »* (sous-titre : *« L'Apple Watch complète, plusieurs perfusions à la fois, des alertes qui ne dorment pas — dans le thème Graphite de l'app. »*)
- **Effort :** <30min. **Risque :** faible. **Confiance : moyen.** **Type :** optimisation.

### P2 — Incohérence « donne la cadence » (hero) vs « bat la cadence » (meta)
- **Emplacement :** `hero.sub` (l.12) « …donne la cadence… » vs `meta.description`/`ogDescription`/`jsonLdDescription` (l.4-6) « …bat la cadence… ».
- **Observation :** le verbe de la promesse centrale change selon la surface. « Bat la cadence » est plus fort (actif, fidèle à la métaphore du métronome) ; « donne » est tiède. La ligne visible par l'utilisateur (hero) est la plus faible des deux.
- **Impact : faible** mais c'est le verbe-clé de la marque.
- **Reco :** unifier sur **« bat la cadence »** partout.
- **Exemple :** `hero.sub` → *« Volume, durée : DROPP calcule le débit, bat la cadence et vous prévient à la fin. »*
- **Effort :** <30min. **Risque :** faible. **Confiance : élevé.** **Type :** correction.

### P2 — Casse du wordmark incohérente : DROPP vs Dropp
- **Emplacement :** `home.json`, 18 occurrences « DROPP » (hero, corps, trust) vs 4 « Dropp » (`meta.jsonLdDescription` l.6, `cal.colTempo` l.71 « Le tempo Dropp », `pro.note` l.147 « inclus avec Dropp Pro », `closing.iconAlt` l.208). Fiche App Store : « Dropp ».
- **Observation :** aucune règle typographique claire. « DROPP » en capitales dans le corps de texte crie (effet criard) ; « Dropp » ailleurs. Un wordmark doit avoir un traitement unique.
- **Impact : faible** (hygiène de marque, perçu subliminalement).
- **Reco :** fixer une règle : **DROPP** réservé au logotype/wordmark graphique ; **Dropp** en casse titre dans tout texte courant (aligné App Store). Appliquer partout dans `home.json` et les 13 autres locales.
- **Exemple :** `hero.sub` « …Dropp calcule le débit… » (comme la fiche App Store), pas « DROPP ».
- **Effort :** <2h (14 langues via script). **Risque :** faible. **Confiance : élevé.** **Type :** correction.

### P2 — Surabondance du tiret cadratin (—) comme tic rythmique
- **Emplacement :** `home.json` — **32 occurrences de « — » réparties sur 30 chaînes** (mesuré). Ex. `moment.conclusion`, `calc.body`, `calc.warn`, `cont.body`, `dt.body`, `pricing.freeName`, `pro.title`, `multi.note`, `faq.a1`, `closing.byline`.
- **Observation :** procédé élégant en petite dose, mais employé sur presque une chaîne « prose » sur deux, il devient une **béquille de cadence** : toutes les phrases finissent par le même effet de chute suspendue. La répétition émousse l'impact et trahit un patron génératif.
- **Impact : faible** mais cumulatif sur la perception « écrit à la machine ».
- **Reco :** limiter à ~1 tiret cadratin par section ; ailleurs, couper en deux phrases ou remplacer par « : » / point. Garder le tiret là où il porte vraiment (`pricing.freeNote`, `moment.conclusion`).
- **Exemple :** `calc.body` fin « Rien à retenir, rien à refaire. » (déjà deux phrases) ; `dt.body` « Mains prises, mains gantées. Le geste natif de l'Apple Watch répond au poignet, sans contact. »
- **Effort :** <2h. **Risque :** faible (ne pas sur-corriger et casser les bonnes lignes). **Confiance : moyen.** **Type :** optimisation.

### P2 — « Été 2026 » (closing) contredit « Disponible sur l'App Store » (hero) + bouton live
- **Emplacement :** `hero.soon` (l.9) « Disponible sur l'App Store » + `hero.getFree` bouton live vers l'App Store, vs `closing.eyebrow` (l.209) « Été 2026 » au-dessus de `closing.title` « Disponible sur l'App Store. »
- **Observation :** le haut de page affirme la disponibilité présente (avec bouton de téléchargement direct), le bas la projette à « Été 2026 ». Formulation ambiguë (saison de lancement ? disponibilité future ?) qui, passé l'été, **vieillira mal** (stale) et sèmera le doute sur la disponibilité réelle.
- **Impact : modéré** (clarté de la disponibilité = friction de conversion).
- **Reco :** si l'app est live, retirer/reformuler « Été 2026 » en marqueur de millésime non daté, ou aligner sur « Disponible maintenant ». Éviter deux statuts temporels contradictoires.
- **Exemple :** `closing.eyebrow` → *« Maintenant sur l'App Store »* (et déplacer l'idée « lancement 2026 » dans un ton non périssable, ex. « lancement, prix de découverte »).
- **Effort :** <30min. **Risque :** faible. **Confiance : moyen** (dépend du statut réel de publication au moment de lecture). **Type :** correction.

### P3 — Titre `tap.title` un peu cryptique hors contexte
- **Emplacement :** `tap.title` (l.110) « Observez une cadence. Tapez-la. Lisez-la. »
- **Observation :** joli triptyque mais « Observez une cadence » n'indique pas de quoi (le débit d'un perfuseur déjà en cours). Le sens n'arrive qu'au corps de texte. En scan rapide, le titre seul laisse le lecteur deviner l'usage.
- **Impact : faible.**
- **Reco :** ancrer le sujet dans le titre ou l'eyebrow.
- **Exemple :** eyebrow « Recaler sans compter » + titre conservé, ou titre *« Une goutte tombe ? Tapez son rythme, lisez son débit. »*
- **Effort :** <30min. **Risque :** faible (ne pas alourdir la belle cadence actuelle). **Confiance : moyen.** **Type :** optimisation.

### P3 — Parenthèse technique longue dans `cal.body`
- **Emplacement :** `cal.body` (l.69) « …audible si vous l'activez (un tick discret, pas plus fort qu'un cliquetis, qui respecte le mode silencieux). »
- **Observation :** la parenthèse à trois segments casse le rythme de la phrase et sur-explique un détail secondaire. Le reste de la section est excellent.
- **Impact : faible.**
- **Reco :** raccourcir à une idée.
- **Exemple :** *« …audible si vous l'activez : un tick discret, qui respecte le mode silencieux. »*
- **Effort :** <30min. **Risque :** faible. **Confiance : moyen.** **Type :** optimisation.

### P3 — « éprouvé sur le terrain » : claim à surveiller (0 avis)
- **Emplacement :** `closing.byline` (l.211) « Conçu par un soignant, éprouvé sur le terrain ».
- **Observation :** « éprouvé sur le terrain » suggère un usage validé alors que la fiche affiche 0 avis / 0 note (recon §5 l.53). Défendable (le fondateur est soignant et l'a testé), mais c'est le seul endroit du copy qui frôle la surpromesse implicite.
- **Impact : faible.**
- **Reco :** garder si le fondateur l'a réellement utilisé en poste ; sinon nuancer.
- **Exemple :** *« Conçu par un soignant, pour le terrain. »* (promesse d'intention, pas de validation).
- **Effort :** <30min. **Risque :** faible. **Confiance : faible** (hypothèse sur la véracité). **Type :** verification-juridique.

---

## Ce qui NE doit PAS être touché

- La triade Calculez/Calez/Continuez et la tagline (actifs de mémorisation).
- Le bloc `moment` (douleurs) et la chute « C'est une charge ».
- `pricing.freeNote` (l'alarme jamais payante) et `pricing.freeName` (« un vrai outil »).
- La FAQ honnête, en particulier `a6` (ne remplace pas une pompe).
- La section Confiance (`trust`) et le disclaimer clinique.

---

## Note détaillée

| Axe | /20 | Commentaire |
|---|---|---|
| Clarté | 17 | Concret, lisible, jargon maîtrisé. |
| Bénéfice avant fonction | 16 | Excellent sauf section Pro (thème-first). |
| Ton pro / rassurant | 18 | Voix juste, empathique, sans pub. Meilleur point. |
| Mémorisation | 16 | Triade + tagline fortes ; dilué par tics (tirets). |
| Cohérence / positionnement | 15 | Site cohérent, mais rupture App Store « convertisseur » + micro-incohérences. |

**Total copy : 82 / 100.**

**Verdict positionnement :** le récit de marque est solide et différenciant sur le site (« rythme au poignet », pas « calculateur »). Il est **saboté à la surface la plus stratégique** (App Store, où se fait la recherche) par le mot « convertisseur ». Corriger la fiche App Store et unifier le wordmark suffirait à aligner promesse et découverte, sans rien changer d'un site déjà excellent.
