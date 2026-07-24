# Brief de traduction — site DROPP (dropp.care)

Contexte produit : DROPP est une app iOS/watchOS destinée aux professionnels de santé
(principalement infirmiers). Elle calcule le débit d'une perfusion (gouttes/minute),
bat la cadence visuellement et au poignet (Apple Watch), suit le temps restant et
alerte à la fin. Aucun compte, aucune donnée collectée.

## Sources

- **Français** (`locales/fr/*.json`) : langue source, fait foi pour le sens.
- **Anglais** (`locales/en/*.json`) : référence de transcréation validée — la barre de qualité.

## Livrable par langue

Exactement 5 fichiers JSON UTF-8 valides dans `locales/<code>/` :
`common.json`, `home.json`, `privacy.json`, `support.json`, `legal.json` —
**mêmes clés, même structure** que le français.

## Ton

Sobre, précis, premium (standard Apple). Jamais publicitaire, pas d'exagération,
pas de point d'exclamation. Les slogans se **transcréent** (sens + élégance de la
langue cible), ne se traduisent pas mot à mot. Registre : professionnel de santé.

## Glossaire impératif

| Terme | Règle |
|---|---|
| DROPP, Dropp, Dropp Pro | Jamais traduits, jamais translittérés, toujours en alphabet latin. |
| Apple Watch, iPhone, App Store, iOS, watchOS, Series 9 | Dénominations Apple officielles, inchangées. |
| Double Tap | Nom officiel Apple du geste dans la langue cible (marketing Apple Watch Series 9) ; sinon « Double Tap ». |
| gtt / min | `gtt` = latin *guttae*. **Décision produit (24/07/2026)** : conservé tel quel pour les langues à écriture latine (fr, en, es, de, it, pt-BR, pt-PT, nl) **et** pour ko/ar/ru — c'est la notation clinique reconnue. **Localisé uniquement pour ja, zh-CN, zh-TW → `滴 / 分`** (idem facteur `gtt/mL → 滴/mL`), où `gtt` est peu familier. En prose, forme développée locale (drops/min, Tropfen/min, gotas/min…). À réexaminer par un natif pour ar/ru (candidats `قطرة/دقيقة`, `кап/мин`). |
| mL, mL/h, h, min, s | Notation latine partout. |
| perfusion (IV) | Terme clinique standard de la langue cible. |
| molette (roller clamp) | Terme de soins standard de la langue cible (Rollenklemme, pinça rolete, クレンメ…). |
| Repère | Étiquette de **lieu** (jamais un nom de patient). |
| pré-alerte, pause, reprendre, acquitter | Termes usuels du métier. |
| Box 3, Fauteuil 5, Chambre 12, Passage 2, Perfusion A | Adapter en repères d'hôpital naturels et **courts**. |

## Règles techniques (bloquantes)

1. Placeholders `{v} {h} {m} {mm} {n} {hPart} {mPart}` : conservés tels quels.
2. `{{path.privacy}}` et `{{path.support}}` dans les liens : conservés byte pour byte.
3. Balises HTML (`<b>`, `<br>`, `<a href=…>`) : mêmes balises, même nombre ; seul le texte se traduit.
4. Objets pluriels (`{"one":…,"other":…}`) : catégories CLDR de la langue cible ; `other` obligatoire.
   (ru : one/few/many ; ar : one/two/few/many/other ; ja/ko/zh : `other` seul.)
5. Chaînes statiques avec nombres : séparateur décimal local. Heures au format **24 h** (convention hospitalière) : « 22:12 ».
6. Ponctuation et guillemets de la langue cible.
7. Le séparateur « · » entre mots courts est un élément de design : à conserver.
8. Arabe : chiffres **latins** (1.43, 500 mL) — décision produit pour la lisibilité médicale.

## Contraintes de longueur (SVG étroits — dépasser casse le visuel)

Rester au plus près de la longueur française, jamais plus de ~20 % au-delà.

| Clés | Max (caractères) |
|---|---|
| home.units.gttMin | 10 (garder « gtt / min ») |
| home.demo.vol500 / dur4h | 8 / 6 |
| home.demo.step4Hint / step5Detail / step6Banner / step6Wrist | 34 / 30 / 22 / 22 |
| home.cont.svgEndTime / svgPreAlert / svgPreAlertDetail | 12 / 12 / 22 |
| home.cont.svgEndBannerName / svgEndBannerState / svgPreAlertMark / svgEndMark | 10 / 12 / 22 / 6 |
| home.watch.svgLabelOptional / svgCrownHint / svgStart | 20 / 26 / 10 |
| home.places.* | 12 (affichés en très grand dans un cadran) |
| home.dt.svgPaused / caption | 14 / 44 |
| home.pro.svgMidway / svgPreAlert / svgEndsIn5 / svgDoneAt | 14 / 14 / 22 / 22 |
| home.pro.svgHist1 / svgHist2 / svgHist3Name / svgHist3Value | 20 / 20 / 16 / 10 |
| home.hero.sign / trust | 32 / 60 |

## Sensibilité clinique — niveau 3 (précision absolue)

`common.footer.disclaimer`, `home.trust.clinical`, `home.faq.a6`, `home.calc.warn`,
`privacy.*`, `legal.s6P1`.

Sens exact à préserver : DROPP est une **aide** (calcul, rythme, suivi) et **ne
remplace ni** le jugement clinique, **ni** les protocoles locaux, **ni** les
dispositifs de contrôle de perfusion. Ne jamais affaiblir ni renforcer ces
avertissements. Aucune promesse clinique ajoutée.

## Vérification

```bash
node scripts/i18n-check.js 2>&1 | grep "\[<code>\]"
```

Aucune ligne d'erreur « ✗ » ne doit apparaître pour la locale livrée.
