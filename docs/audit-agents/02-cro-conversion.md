# Agent 2 — CRO / Conversion (arrivée → clic App Store)

> Périmètre : conversion du site https://dropp.care uniquement (compréhension, hero, proposition de valeur, CTA, ordre des sections, frictions, objections, passage vers l'App Store). Read-only. Preuves : fichiers `src/templates/home.html`, `locales/fr/home.json`, `src/site.config.json`. Impact qualitatif (faible/modéré/important/critique), confiance par reco (élevé/moyen/faible).

## Note globale : 68 / 100

Site d'une qualité de fabrication rare (craft, honnêteté, confidentialité, démos interactives vivantes). Mais le **chemin vers le téléchargement est freiné** par trois choses : un hero scrollytelling qui étale la proposition de valeur sur ~4,3 écrans de scroll, une **zone morte de 9 sections sans aucun CTA App Store** entre le hero et les tarifs, et une **absence de POUR QUI explicite** en <5s. La conversion perd surtout sur le trafic froid (TikTok, Google, curieux) qui ne « scrolle pas jusqu'au bout ».

---

## Forces à conserver (ne pas dégrader)

1. **Le bouton hero « Télécharger gratuitement » est excellent.** Pastille encre pleine contraste fort (`background:var(--ink); color:var(--bg)`, `home.html:146`), épinglée bas-centre du hero collant (`position:absolute; bottom:...; z-index:3`, `home.html:143`), donc **visible pendant tout le scroll du hero**. Le libellé porte le mot « gratuitement » (`home.json:21`) : gratuité + action en un seul objet. À garder tel quel.
2. **Lien direct vers la fiche produit App Store** (`apps.apple.com/app/id6792277373`), `target="_blank" rel="noopener"` sur les 3 CTA (`home.html:573,977,1005`). Aucun intermédiaire, aucun formulaire, aucun compte. Friction technique du passage = quasi nulle.
3. **Les démos interactives sont un actif de conversion majeur.** Calculateur à molettes, calage à l'unisson, pad Tap : le visiteur *essaie le produit avant de télécharger*. C'est plus convaincant que n'importe quelle capture. À protéger absolument.
4. **Honnêteté du modèle free/pro** : « L'alarme de fin est un signal de sécurité : elle ne sera jamais payante. » (`home.json:177`) et « Gratuit — un vrai outil » (`home.json:171`). Rare et rassurant, désamorce le soupçon « freemium piège ».
5. **Bloc Confiance + disclaimer clinique** (`home.json:180-188`) : traite frontalement l'objection données/responsabilité pour un public soignant. Fort levier de confiance.
6. **Zéro cookie / zéro bandeau consentement** (site statique) : aucune friction d'entrée, aucun pop-up avant le contenu. À préserver.
7. **Fallback `prefers-reduced-motion`** : hero compact 100svh en flux (`home.html:84,89`) — les utilisateurs sensibles au mouvement obtiennent une version lisible d'un écran.

---

## Compréhension en <5 secondes (test du visiteur froid)

Ce que le hero dit réellement (`home.json:8-21`) : eyebrow « Disponible sur l'App Store » · wordmark « Dropp » · « Rythme · Précision · Soin » · « Le rythme au poignet. La tête au soin. » · sub « Volume, durée : DROPP calcule le débit, donne la cadence et vous prévient à la fin. » · trust « Sans compte · Sans publicité · Données locales ».

| Question | Répondu en <5s ? | Preuve |
|---|---|---|
| QUOI | Partiel (via le sub) | Le sub dit « calcule le débit, donne la cadence, prévient à la fin » — mais après le titre poétique. Le mot **« perfusion » n'est pas dans le hero** ; il faut déduire. |
| POUR QUI | **Non** | Aucune mention de soignant/infirmier dans le hero. « Conçu par un soignant » n'apparaît qu'au closing (`home.json:211`), après tout le scroll. |
| Quel problème | **Non (retardé)** | Les douleurs (« la formule à refaire entre deux sonnettes ») sont dans la section « moment » (`home.json:51-56`), après ~4 écrans de scroll. |
| Pourquoi mieux qu'un calcul manuel | **Non explicite** | Jamais formulé frontalement (« plus de calcul de tête, plus de recomptage »). Implicite seulement. |
| Gratuit vs payant | Partiel | « gratuitement » dans le CTA + « Sans publicité ». Le partage free/Pro n'est clair qu'aux Tarifs. |

**Écart message perçu vs message idéal** : le hero communique une *ambiance* (calme, premium, soin) avant de communiquer une *fonction pour une personne*. Idéal pour le visiteur qui connaît déjà Dropp ; risqué pour le froid qui doit comprendre « app de calcul de débit de perfusion pour infirmiers, gratuite » en un regard.

---

## Frictions structurelles

### F1 — Hero scrollytelling = 420svh (critique)
`home.html:158` : `.hero-story.on { height:420svh; }` (430svh mobile, `:175`). En régime JS actif (défaut), le visiteur doit **scroller ~4,3 hauteurs d'écran** avant d'atteindre la première section de contenu (`#demo`, `home.html:580`). La proposition de valeur est distillée au goutte-à-goutte par animation au scroll au lieu d'être affirmée. Sur desktop (molette) comme mobile, c'est le premier point de fuite : beaucoup bouncent avant même la démo. Le CTA reste heureusement visible pendant ce scroll (atténuation partielle), mais la *compréhension* est repoussée.

### F2 — Zone morte de CTA : 9 sections sans lien App Store (important)
Les seuls CTA App Store sont en `home.html:573` (hero), `:977` (Tarifs) et `:1005` (closing). Entre les deux, **9 `<section>`** (`:580, :629, :638, :721, :753, :787, :807, :817, :903`) — dont le **calculateur interactif** (le moment de plus forte intention) — n'offrent **aucun bouton de téléchargement**. Le visiteur qui vient de jouer avec le calculateur et se dit « oui, il me le faut » n'a rien à cliquer sans scroller loin. Micro-conversion perdue au pic d'intention.

### F3 — Milieu de page saturé de Pro avant les Tarifs (modéré)
Ordre des sections : demo → douleurs → 3 gestes → **Watch → Double Tap → Mode Tap → Perfusions simultanées → Aperçu Pro (Graphite)** → film → Tarifs. Soit **5 sections Pro consécutives** (`home.json:89-147`) avant que le visiteur n'apprenne noir sur blanc que l'essentiel est gratuit. Pour un CTA « télécharger gratuitement », on vend longuement le payant avant de rassurer sur le gratuit. Aspirationnel, mais retarde la levée de l'objection « ça va être payant ».

### F4 — Aucun en-tête / nav persistant (modéré)
`home.html` n'a ni `<header>` de navigation ni CTA collant après le hero (le seul `<header>` est le hero lui-même, `:529`). Le sélecteur de langue est en footer. Conséquence : un visiteur **arrivant en deep-link** (Google vers une ancre, ou « arrivée directe sur tarifs ») n'a ni logo-retour, ni langue, ni CTA en haut. Et le CTA de téléchargement disparaît totalement de l'écran dès qu'on quitte le hero, jusqu'aux Tarifs.

### F5 — Bouton final du closing ne mène pas à l'App Store (faible)
`home.html:1010` : le dernier bouton de la page, « Revoir DROPP en action », pointe vers `#demo` (`home.json:212`). La toute dernière action proposée renvoie le visiteur en haut au lieu de convertir. Le badge App Store est juste au-dessus (`:1005`), donc l'occasion existe, mais la hiérarchie du dernier écran finit sur « revoir » plutôt que « télécharger ».

### F6 — Zéro preuve sociale (faible, contraint)
0 avis / 0 note sur la fiche (recon §5). Aucun témoignage, chiffre d'usage, ni logo d'établissement sur le site. Le « éprouvé sur le terrain » (`home.json:211`) est une affirmation non étayée. Contrainte réelle (app neuve, ne rien inventer), mais l'absence totale de tiers-preuve pèse sur un public prudent.

---

## Objections non traitées côté site

- **« C'est un abonnement déguisé ? »** — désamorcé pour l'alarme (jamais payante) mais les **conditions d'abonnement détaillées** (renouvellement auto, résiliation, essai 7 j → bascule payante) ne sont **pas sur le site** (recon §7). Objection résiduelle pour le prudent avant même d'ouvrir l'App Store.
- **« Est-ce fiable / validé ? »** — le disclaimer dit ce que Dropp *n'est pas*, mais rien sur la méthode de calcul (formule standard gtt/min = V×facteur/durée) ni sur un contrôle. Un infirmier sceptique veut voir la formule.
- **« Pour qui, exactement ? »** — jamais nommé explicitement (infirmiers, étudiants IDE, libéraux). Voir F/compréhension.

---

## Les 7 personas (arrivée → clic ou fuite)

1. **Étudiant infirmier via TikTok** — arrive chaud mais pressé et sur mobile. Voit un hero magnifique mais poétique ; ne lit pas « pour étudiants/infirmiers » ; doit scroller 4 écrans pour comprendre le problème. **Risque de fuite avant la démo.** Le CTA gratuit visible le sauve en partie. *Hésite : « c'est quoi au juste ? »*
2. **Infirmier expérimenté sceptique** — cherche la formule, la fiabilité, le piège payant. Rassuré par Confiance + « alarme jamais payante ». Mais absence de formule visible et de preuve sociale entretient le doute. *Télécharge si la démo calculateur le convainc — d'où l'importance d'un CTA près de la démo (absent, F2).*
3. **Infirmier libéral pressé** — veut « ça sert à quoi, combien, où je clique » en 10s. Le hero l'oblige à scroller ; le prix est loin (après 5 sections Pro). *Peut cliquer le CTA hero par confiance, ou fuir par impatience.*
4. **Utilisateur Apple Watch** — bien servi : sections Watch/Double Tap/Tap détaillées et désirables. Comprend vite la valeur poignet. **Meilleur persona du site.** *Télécharge.*
5. **Cadre / formateur** — évalue pour recommander à une équipe/promo. Cherche sérieux, conformité, preuve. Trouve craft + disclaimer, mais rien sur déploiement établissement, ni licences volume, ni preuve d'usage. *Intéressé, mais sans élément de décision → tiède.*
6. **Arrivée Google** — atterrit possiblement sur une ancre profonde ou la home. Sans nav persistante (F4), pas de repère haut de page. SEO propre (recon) l'amène ; l'absence de CTA hors hero/tarifs peut le laisser sans action. *Dépend de l'endroit d'atterrissage.*
7. **Arrivée directe sur tarifs** — voit la colonne **Pro en premier** (`home.html:950`) avant Gratuit. Le titre « L'essentiel est gratuit » rassure, mais l'œil tombe d'abord sur 7 fonctions Pro + prix. *Peut surestimer le coût ; le CTA Tarifs mène bien à l'App Store.*

---

## Recommandations prioritaires (résumé)

- **P0** : Affirmer QUOI + POUR QUI dès le hero (une ligne explicite « pour infirmiers et étudiants IDE » / « calcul de débit de perfusion »). Confiance élevée.
- **P0** : Raccourcir le hero scrollytelling (viser ~200-250svh) ou permettre d'accéder au contenu concret plus vite. Confiance moyenne (à A/B tester).
- **P1** : Ajouter un CTA App Store après la démo interactive (calculateur) et/ou un CTA collant discret après le hero. Confiance élevée.
- **P1** : Remonter/rapprocher la réassurance « gratuit » avant le bloc de 5 sections Pro. Confiance moyenne.
- **P2** : Faire pointer le dernier bouton de la page vers l'App Store, pas vers `#demo`. Confiance élevée.
- **P2** : Publier les conditions d'abonnement + la formule de calcul (lève 2 objections). Confiance moyenne.

Le reste (démos, honnêteté, confidentialité, craft) est un différenciateur : **ne pas y toucher.**
