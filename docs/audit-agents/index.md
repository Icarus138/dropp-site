# Audit Dropp — index des agents

Orchestration multi-agents, **read-only** (aucun code du projet modifié). Chaque agent a travaillé isolément (pas de lecture des conclusions des autres avant sa 1re analyse), puis la Red Team a contesté, puis synthèse + contrôle qualité.

| # | Agent | Mission | Statut | Note /100 | Livrable | Dépendances |
|---|-------|---------|--------|-----------|----------|-------------|
| 01 | Reconnaissance | Collecte de preuves (site + App Store + repo) | ✅ | — | `01-reconnaissance.md` | — |
| 02 | CRO / conversion | Hero, CTA, funnel, 7 personas | ✅ | 68 | `02-cro-conversion.md` | 01 |
| 03 | UX / UI / accessibilité | Lisibilité, WCAG, mobile, RTL/CJK | ✅ | 74 | `03-ux-ui-accessibilite.md` | 01 |
| 04 | Copy / positionnement / marque | Textes, promesse, catégorie | ✅ | 82 | `04-copy-positionnement.md` | 01 |
| 05 | Confiance / crédibilité | Réassurance, preuve, contexte de soins | ✅ | 63 | `05-confiance-credibilite.md` | 01 |
| 06 | Pricing / monétisation | Gratuit/Pro, abonnement, profils | ✅ | 78 | `06-pricing-monetisation.md` | 01 |
| 07 | App Store / ASO | Nom, sous-titre, captures, mots-clés | ✅ | 68 | `07-app-store-aso.md` | 01 |
| 08 | SEO / technique / perf | Métadonnées, CWV, backlog technique | ✅ | 62 (SEO) · 88 (technique) | `08-seo-technique-performance.md` | 01 |
| 09 | Juridique / RGPD / réglementaire | Mentions, abonnement, risque MDR | ✅ | 74 | `09-juridique-reglementaire.md` | 01 |
| 10 | Produit / activation / rétention | Onboarding, habitude, Apple Watch | ✅ | 68 | `10-produit-retention.md` | 01 |
| 11 | Concurrence / marché | Matrice, moat, opportunités | ✅ | 62 | `11-concurrence-marche.md` | 01 |
| 12 | Analytics / expérimentation | Funnel, KPI, A/B, tests utilisateurs | ✅ | 22 (pré-lancement) | `12-analytics-experimentation.md` | 01 |
| 13 | Red Team | Contradiction de toutes les conclusions | ✅ | 72 (confiance dans l'audit) | `13-red-team.md` | 02-12 |
| 14 | Synthèse & priorisation | Dédup, arbitrage, Top 20, roadmap | ✅ | — | `14-synthese-priorisation.md` | 01-13 |
| 15 | Contrôle qualité | Vérification finale | ✅ | — | `15-controle-qualite.md` | 14 |

**Total : 101 findings** — P0 = 6 · P1 = 33 · P2 = 39 · P3 = 23. Après arbitrage Red Team, dédoublonnage et re-priorisation dans `14-synthese-priorisation.md`.

**Limites / non vérifiables** : Core Web Vitals terrain réels (pas de Lighthouse exécuté) ; prix/avis concurrents non revalidés de première main (agent 11, marqué [NV]) ; qualification MDR = **avis juriste spécialisé obligatoire** ; comportement onboarding/rétention réel = à valider sur device + tests utilisateurs.

**Livrables consolidés** (racine `docs/`) : `audit-dropp-complet.md`, `audit-dropp-executive-summary.md`, `audit-dropp-actions.csv`.
