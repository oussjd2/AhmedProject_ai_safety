# Agent handoff — Clair, première itération

État de remise : 21 octobre 2026. Référence de départ : tag Git `demo-v1`. Lire également `../AGENTS.md`, `../SETUP.md`, `IMPLEMENTATION.md` et `STATUS.md`.

## Objectif et périmètre convenus

Projet académique du groupe d’Ahmed : démonstration de due diligence lors de l’acquisition d’outils d’IA dans un contexte universitaire suisse/vaudois. Présentation attendue le 30 octobre 2026. Le besoin porte sur une démo fonctionnelle sur laptop, pas une plateforme de production.

Première itération livrée : tous les stades fonctionnels, aucune IA, cas fictifs, rôles simulés, travail sauvegardé, examen des preuves, résultats expliqués, notation conditionnée et rapport imprimable. Ne pas réintroduire de classification générative ou de chatbot dans cette itération. Aucune connexion aux systèmes réels de l’UNIL, authentification réelle, invitation email ou infrastructure cloud obligatoire.

## Architecture et points d’entrée

- Next.js / React / TypeScript ; Tailwind et composants shadcn/ui ; Zod pour la validation.
- PostgreSQL 17 en Docker sur `127.0.0.1:55432` ; Prisma et deux migrations versionnées.
- App Node sur `127.0.0.1:3000`. Le code de l’app n’est pas conteneurisé ; Docker héberge PostgreSQL.
- `src/app/api/[...path]/route.ts` : API, validation des écritures, rôles, fichiers, examens, notes et rapports.
- `src/lib/server.ts` : lecture des dossiers, contrôle de liaison fournisseur, transactions et journal.
- `src/lib/engine.ts` : moteur pur, dépendances de questions, triage, empreintes, contrôles, admissibilité, résultats.
- `src/config/assessment.ts` : questions, contrôles, sources, pondérations, version du référentiel `2026-10-20.1`.
- `src/config/source-questions.json` : formulations sources et correspondances conservées.
- `prisma/schema.prisma` : Case, Vendor, Answer, Evidence, Review, Score, Report, AuditEvent.
- `src/components/` : interface française des six étapes et rapports.
- `demo/fixtures.ts`, `demo/evidence/`, `scripts/demo.ts` : trois scénarios reproductibles et leurs pièces.
- `scripts/setup-demo.ps1` : installation complète avec fixtures et build ; `setup.ps1` : installation de base ; `start.ps1` : démarrage ; `backup.ps1` : sauvegarde.

## Parcours et invariants métier

1. Création du dossier, identification du fournisseur et besoin.
2. Questionnaire interne conditionnel, brouillon automatique et soumission contrôlée.
3. Triage explicable : impact, données/confidentialité, supervision ; qualification juridique séparée par acteur.
4. Questionnaire fournisseur activé par le contexte ; justificatifs par contrôle ; nouvelle soumission après upload.
5. Évaluateur : examen humain motivé, qualification des régimes, catégorie et calendrier. Une validation positive nécessite réponses pertinentes et preuve.
6. Notation seulement après les deux soumissions et résolution des prérequis ; poids total 100 %, notes sur 5, somme note/5 × poids.
7. Rapport versionné contenant un instantané autonome ; il peut également documenter un dossier incomplet ou bloqué. Les anciennes versions ne changent pas.

Les six onglets sont Besoin, Triage, Fournisseur, Contrôles, Évaluation, Rapport. Le fournisseur ne reçoit pas les réponses internes, les examens, les scores ou les rapports ; sa session est liée au dossier depuis lequel le rôle est sélectionné. Ce mécanisme n’est pas une authentification : n’utiliser que des données fictives.

Statuts d’examen : satisfait, non applicable, information manquante, à clarifier, examen humain requis, à corriger, blocage confirmé, satisfait sous conditions. Priorité de résultat global : **BLOQUANT → À CLARIFIER → À CORRIGER → CONFORME SOUS CONDITIONS → CONFORME**. Le haut risque interne n’entraîne pas à lui seul un blocage légal. Une condition continue acceptée peut laisser la notation ouverte ; un prérequis marqué `[PRÉALABLE]` la ferme.

Les mises à jour utilisent une révision optimiste. Les empreintes d’examen portent sur le contexte, les réponses pertinentes et les pièces. Une modification de contexte rend les examens dépendants caducs ; une modification de pièce affecte son contrôle. Les changements de contenu ou d’examen retirent les notes antérieures. Les réponses cachées après un changement de parent sont supprimées du contexte effectif. Préserver ces règles.

## Démos à retrouver après clonage

| Identifiant réservé      | Scénario                                      | Attendu                                                                        |
| ------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------ |
| `clair-demo-translation` | Traduction publique, relecture                | Risque faible, CONFORME, 77/100                                                |
| `clair-demo-research`    | Recherche confidentielle et données sensibles | Risque élevé, À CLARIFIER ; D04 sans preuve, corrections D05/S01 ; pas de note |
| `clair-demo-admissions`  | Classement d’admission avec décision humaine  | Risque élevé, CONFORME SOUS CONDITIONS, 84/100                                 |

Douze fichiers texte fictifs sont versionnés. Le seed les copie vers le stockage privé `data/evidence/`, crée les réponses, examens, notes et un rapport par dossier. Il vérifie les résultats avec le moteur existant. Les données locales supplémentaires de l’auteur ne sont pas transférées.

`demo:seed` conserve les exemples existants ; `demo:reset` vérifie leur marqueur, sauvegarde les trois exemples existants et ne remplace que leurs identifiants réservés. Aucun reset global. La base, les uploads et les rapports créés ensuite sur le nouveau PC restent propres à ce PC.

## Vérifications réalisées et limites

Étapes 1–16 terminées sur le PC d’origine. Recette Chrome : parcours complet, permissions, réponses conditionnelles, conflits de révision, uploads/remplacements, invalidation, corrections/blocages/conditions, notation, versions et changement de référentiel. Trente contrôles principaux plus contrôles complémentaires réussis. Cinq PDF A4 rendus et inspectés, dont une réponse longue. Redémarrage réel app/PostgreSQL avec empreinte de données inchangée. Desktop et viewport mobile testés ; pas de téléphone physique. Détails historiques dans `STATUS.md`.

TypeScript, lint et build ont réussi. Un serveur de production doit être redémarré après un build ; une ancienne instance peut demander des ressources périmées. Une icône manquante a été ajoutée pendant la recette. Aucun changement du moteur n’a été nécessaire à cette recette.

L’audit production était sans alerte au dernier contrôle ; l’audit complet signalait cinq alertes de dépendances de développement de la chaîne de lint. L’override `deepmerge-ts` 8.0.2 corrige une alerte transitive Prisma. Ne pas exécuter de mise à niveau forcée sans examiner son impact. Ces constats sont historiques : vérifier avant d’annoncer un état courant.

Les sources et conclusions juridiques doivent être validées par le groupe ; le logiciel n’est pas une certification ni un avis juridique. Le calendrier et les formulations du brief sont des hypothèses documentées dans la configuration actuelle. Aucun élargissement automatique du droit à d’autres cas.

## Environnement et partage

Le dépôt public n’inclut aucun `.env`, backup, volume de base ou upload utilisateur. `.env.example` et Compose contiennent uniquement les paramètres publics de la démo locale. `npm run demo:setup` prépare une nouvelle machine ; aucun tunnel nécessaire.

Cloudflare a été testé avec lecture, sauvegarde, upload et téléchargement HTTPS. L’origine autorisée doit être exacte dans `CLAIR_PREVIEW_ORIGIN`, sans joker ; sans cette variable, l’API reste locale. L’ancien tunnel et les services ont été arrêtés à la demande de l’utilisateur. Ne pas réutiliser son ancien lien ; ne démarrer un tunnel qu’à sa demande.

## Travail restant / décisions ouvertes

- Lancer et vérifier la démo sur le laptop du frère avec les instructions de setup.
- Recueillir ses retours et faire valider le contenu juridique par le groupe.
- Répétition sur le laptop final sans accès internet externe. Le déroulé oral est préparé par l’utilisateur.
- L’utilisateur a demandé une documentation complète du flux et des règles avec diagramme global, détails par étape et tables. La compréhension a été confirmée, mais cet artefact n’a pas encore été produit : ne pas le présenter comme livré.
- Pas de prochaine fonctionnalité déjà autorisée ; demander le besoin concret avant d’étendre le périmètre.
