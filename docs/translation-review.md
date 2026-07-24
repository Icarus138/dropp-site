# Suivi des traductions & relecture

Ce fichier classe les textes du site par **niveau de sensibilité** et suit l'état
de relecture par langue. Il complète `docs/i18n.md` (architecture) et
`docs/translation-brief.md` (consignes + glossaire).

> **Important** : les traductions ont été produites avec un soin professionnel
> (ton sobre, terminologie de soins, positionnement premium), mais **elles n'ont
> pas encore été relues par des soignants natifs**. Avant d'ouvrir un marché, faire
> valider **au minimum** les textes de **niveau 3** de la langue concernée.

## Niveaux de sensibilité

### Niveau 1 — faible (marketing non clinique, navigation)
Relecture souhaitable, non bloquante.

- `common.footer.*` (sauf disclaimer), `common.lang.*`
- `home.hero.*`, `home.moment.*`, `home.gestures.*`, `home.demo.*`
- `home.film.*`, `home.closing.*`, `home.pricing.eyebrow/title/cta/*Name`
- `home.faq.eyebrow`, `*.title` des pages, `home.pro.eyebrow/title/note`

### Niveau 2 — moyen (terminologie de perfusion, fonctionnalités, unités, prix)
Relecture par un professionnel de santé **recommandée**.

- `home.units.*`, `home.labels.*` — **unités** (voir décision `gtt/min` ci-dessous)
- `home.calc.*`, `home.cal.*`, `home.cont.*` — calcul, calage, suivi
- `home.watch.*`, `home.dt.*`, `home.tap.*`, `home.multi.*` — fonctionnalités
- `home.pro.card*` — fonctions Pro
- `home.pricing.price*/pro*/free*` — **prix** (vérifier format monétaire local)
- `home.js.*` — messages dynamiques (calcul, calage, tap)
- `support.*` — instructions d'utilisation
- `home.places.*` — repères de lieux (Box 3, Fauteuil 5…) : adaptation culturelle

### Niveau 3 — élevé (⚠ VALIDATION HUMAINE REQUISE)
Textes cliniques, de responsabilité, de sécurité, de confidentialité, juridiques —
susceptibles d'influencer une décision de soin ou d'engager la responsabilité.
**À faire valider par un natif bilingue soignant/juriste avant diffusion.**

- `common.footer.disclaimer` — avertissement clinique (pied de page, toutes pages)
- `home.trust.clinical` — « Ne remplace ni le jugement clinique… »
- `home.trust.t1/t2/t3*` — promesses de confidentialité/sécurité des données
- `home.faq.a6` — « DROPP ne remplace pas une pompe ni un dispositif de contrôle »
- `home.calc.warn` — garde-fou « hors plage plausible »
- `home.faq.a1…a7` — réponses factuelles (compatibilité, hors-ligne, facteurs)
- **`privacy.*` (toutes les clés)** — politique de confidentialité (RGPD/données de santé)
- **`legal.*` (toutes les clés)** — mentions légales (éditeur, hébergeur, responsabilité)
- `support.q1/q2*` — limites Apple (alarmes Watch) : exactitude technique

## Décisions terminologiques actées

| Sujet | Décision | Date |
|-------|----------|------|
| Marque | `DROPP`/`Dropp` jamais traduite ni translittérée (latin partout, y c. ru/ar/ja…) | — |
| Noms Apple | `Apple Watch`, `iPhone`, `App Store`, `iOS`, `watchOS`, `Digital Crown` officiels | — |
| Unité `gtt/min` | Conservée pour latines + **ko/ar/ru** ; **localisée `滴/分` pour ja/zh-CN/zh-TW**. ar/ru à réexaminer (`قطرة/دقيقة`, `кап/мин`) | 24/07/2026 |
| Facteur `gtt/mL` | Idem : `滴/mL` en ja/zh, `gtt/mL` ailleurs | 24/07/2026 |
| Chiffres arabes | **Chiffres latins** (1.43, 500 mL, 22:12) — lisibilité médicale | 24/07/2026 |
| Heures | Format **24 h** partout (convention hospitalière) : « 22:12 » | — |
| Repères | Lieux uniquement, jamais de nom de patient — adaptés par langue | — |

## État de relecture par langue

Légende : ✅ relu natif · 🟡 traduction pro, non relue · ⬜ à faire

| Langue | N1 | N2 | N3 | Notes |
|--------|----|----|----|-------|
| fr | ✅ | ✅ | ✅ | Langue source (contenu original du site) |
| en | 🟡 | 🟡 | 🟡 | Transcréation de référence — relire avant campagne EN |
| es | 🟡 | 🟡 | 🟡 | es-ES, tutoiement. Vérifier « ruedecilla » vs « regulador » |
| de | 🟡 | 🟡 | 🟡 | Vouvoiement (Sie). Vérifier longueur des composés en mobile |
| it | 🟡 | 🟡 | 🟡 | « morsetto a rotella » à confirmer |
| pt-br | 🟡 | 🟡 | 🟡 | « pinça rolete » (enfermagem BR) |
| pt-pt | 🟡 | 🟡 | 🟡 | « perfusão » (≠ BR « infusão ») ; registre pt-PT |
| nl | 🟡 | 🟡 | 🟡 | « rolklem », « infuus » |
| ru | 🟡 | 🟡 | 🟡 | Pluriels one/few/many ; « роликовый зажим » |
| ar | 🟡 | 🟡 | ⬜ | **RTL + clinique : priorité de relecture.** Unité `gtt/min` à trancher |
| ja | 🟡 | 🟡 | ⬜ | **クレンメ / 点滴 : priorité de relecture.** Unité `滴/分` appliquée |
| ko | 🟡 | 🟡 | 🟡 | `gtt` usuel en clinique KR (conservé) ; « 수액 조절기 » |
| zh-cn | 🟡 | 🟡 | 🟡 | « 滚轮调节器 », « 输液 » ; unité `滴/分` |
| zh-tw | 🟡 | 🟡 | 🟡 | Terminologie taïwanaise ; « 點滴 », « 調節器 » |

## Avertissements cliniques / juridiques à faire valider en priorité

1. **`home.trust.clinical`** et **`common.footer.disclaimer`** dans **les 13 langues
   non-fr** — le sens exact (« aide, ne remplace ni jugement clinique, ni protocoles,
   ni dispositifs de contrôle ») ne doit être ni affaibli ni renforcé.
2. **`privacy.*`** — conformité RGPD / données de santé, formulation par juridiction.
3. **`legal.*`** — statut de l'éditeur (entreprise individuelle française), hébergeur,
   responsabilité — à valider par un juriste pour les marchés visés.
4. **`home.faq.a6`** — la phrase « ne remplace pas une pompe / un dispositif de
   contrôle » est un point réglementaire (positionnement non-dispositif médical).
