# État de livraison — étapes 1 à 16

Implémentation terminée pour le périmètre local convenu : interface française, rôles simulés, dossiers persistants, questionnaires conditionnels consolidés, moteur explicable, preuves, examens, qualification par acteur, notation et rapports versionnés imprimables.

## Vérifié pendant le développement

- PostgreSQL local démarré ; deux migrations appliquées.
- Génération du client Prisma, lint, vérification TypeScript et compilation de production réussis.
- Dossier fictif créé dans Chrome par l’interface ; une réponse sauvegardée avant navigation vers le triage.
- Affichage desktop du triage inspecté dans Chrome et avec `view_image`.
- Aucun appel d’IA ni ressource graphique/police distante nécessaire au fonctionnement.
- Audit npm des dépendances de production : aucune vulnérabilité signalée. `deepmerge-ts` est fixé à 8.0.2 pour corriger l’alerte transitive de la configuration Prisma ; génération et migrations revérifiées.
- L’audit complet conserve cinq alertes liées à la chaîne de lint Next/fast-glob/micromatch/braces. Aucun `audit fix --force` ni changement incompatible de framework n’a été appliqué.

## Étape 15 — données de démonstration

Trois dossiers préremplis et douze justificatifs fictifs sont fournis dans `demo/`, avec un rapport initial chacun. Les deux questionnaires sont soumis ; les examens et notes sont expliqués.

- Traduction publique : risque faible, CONFORME, 77/100.
- Recherche confidentielle : risque élevé, À CLARIFIER, preuve de transfert absente, corrections confidentialité/sécurité, notation non ouverte.
- Admissions : risque élevé, CONFORME SOUS CONDITIONS, supervision et conformité future, 84/100.

`npm run demo:seed` crée uniquement les exemples absents. `npm run demo:reset` sauvegarde puis restaure seulement ces trois dossiers ; les autres dossiers sont conservés. Aucun déroulé oral n’est inclus, conformément à la demande.

Vérifications de l’étape 15 : création des trois exemples et contrôle automatique de leurs résultats avec le moteur courant ; seconde exécution sans doublon ; restauration des trois exemples avec sauvegarde préalable. Le dossier préexistant hors démo et ses relations ont conservé la même empreinte SHA-256 avant/après restauration. Douze pièces sources et trois rapports initiaux sont présents. TypeScript, lint et compilation de production réussis après ajout. Ces contrôles ne remplacent pas les tests d’acceptation de l’étape 16.

## Étape 16 — recette technique locale du 20 octobre 2026

Recette passée sur la version de production à `http://127.0.0.1:3000`, Chrome sous Windows, vues 1440 × 1000 et 390 × 844. Trente contrôles principaux ont réussi, complétés par les contrôles conditionnels, de configuration et de persistance ci-dessous. Le navigateur connecté IAB a également confirmé la navigation vers le triage, le changement de rôle et la restriction de la vue fournisseur. Les automatisations Chrome et les scripts de recette sont temporaires, hors du dépôt ; aucune dépendance de test ajoutée au projet.

| Domaine             | Résultat vérifié                                                                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Parcours            | Création par formulaire, brouillon sauvegardé avant navigation, rechargement, deux questionnaires soumis, preuves, examens, notation à 77/100 et génération du rapport                               |
| Trois exemples      | Risques, résultats, accès à la notation et rapports conformes aux attentes de l’étape 15                                                                                                             |
| Rôles               | Changement de rôle dans l’interface ; fournisseur limité à son dossier, sans réponses internes, examens ou rapports ; accès directs étrangers refusés                                                |
| Validation          | Soumission incomplète refusée ; choix invalide, révision dépassée, format/signature de fichier incorrects et écriture interorigine refusés                                                           |
| Conditions          | Décision d’admission active questions et contrôles renforcés ; désactivation supprime les réponses devenues cachées                                                                                  |
| Examens et notation | Examens requis avant notation ; somme des poids imposée à 100 % ; correction et blocage confirmé retirent la notation ; condition continue distinguée du prérequis                                   |
| Justificatifs       | Upload, téléchargement, remplacement et suppression ; ancienne URL retirée ; nouvel examen requis et score retiré après remplacement                                                                 |
| Historique          | Rapport initial immuable après modification ; seconde version avec réponse longue conservée ; changement de contexte rend les examens caducs                                                         |
| Référentiel         | Ancienne version bloque la notation ; actualisation par évaluateur réinitialise soumissions/examens et préserve les rapports                                                                         |
| Persistance         | Même empreinte SHA-256 des huit dossiers de recette et de leurs relations avant/après redémarrage réel de PostgreSQL et de l’application                                                             |
| Réseau              | Chargement local avec requêtes externes interceptées/refusées : aucun appel externe nécessaire observé ; aucun appel IA                                                                              |
| Interface           | Pages non vides, aucune surcouche d’erreur, aucun message console/runtime dans le dernier parcours complet ; aucune largeur hors écran au viewport mobile testé                                      |
| Impression          | Bouton d’impression opérationnel ; cinq PDF A4 générés (trois démos, recette conforme, réponse longue), toutes leurs pages rendues et examinées visuellement, sans clipping ni chevauchement observé |
| Livraison           | Lint, TypeScript et build réussis ; sauvegarde complète créée avant retrait des quatre dossiers temporaires de recette ; trois démos et dossier initial conservés                                    |

Un navigateur initialement attaché à une ancienne compilation générait des erreurs de ressources ; le redémarrage du serveur sur la compilation courante les a résolues. L’icône navigateur manquante a été ajoutée dans `src/app/icon.svg`. Le dernier parcours complet ne présente aucune erreur console. Les scripts de test ont également été corrigés pour attendre le chargement et utiliser les libellés réels ; ces ajustements ne sont pas des corrections applicatives.

Sauvegarde de fin de recette : `backups/20261020-225241/` (base, preuves et configuration). Les PDF et captures de recette sont temporaires dans `%TEMP%/clair-step16/`. Aucune restauration de sauvegarde, aucun second navigateur et aucun appareil mobile physique n’ont été testés.

## Validation humaine et partage à suivre

- Répétition sur le laptop final et contrôle matériel sans internet, à faire par l’utilisateur.
- Validation des formulations et règles juridiques consolidées par le groupe.
- Partage Cloudflare vérifié après la recette : chargement public, changement de rôle et cookie de session, création de dossier, sauvegarde, upload/téléchargement et accès au rapport imprimable via HTTPS. Origine étrangère refusée. Dossier temporaire retiré. L’API accepte les hôtes locaux et uniquement l’hôte de prévisualisation explicitement configuré par `CLAIR_PREVIEW_ORIGIN` ; aucun joker. Configuration courante dans `.env.local` ignoré par Git, à actualiser pour un nouveau tunnel. Garder serveur, PostgreSQL, tunnel et PC actifs pendant le partage.

Le déroulé oral reste à la charge de l’utilisateur. La recette technique ne vaut pas validation juridique ou institutionnelle.

## Référence visuelle et inspection

Référence de travail : `preview/design-reference.png`, générée par l’outil intégré ImageGen pour la conception seulement. L’application n’utilise pas d’IA. Prompt : écran desktop français de due diligence académique « Clair », sidebar claire, typographie navy, accent vert, six étapes, résultats expliqués et panneau d’avancement ; aucun logo officiel.

Capture d’implémentation : `preview/triage-desktop.png`, obtenue via le navigateur Chrome connecté. L’IAB avait échoué à s’attacher dans cette session ; Chrome a permis l’inspection sans navigateur de remplacement.

Comparaison directe des deux images avec `view_image` :

| Point               | Résultat / adaptation                                                                                 |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| Navigation latérale | Même structure claire, marque sobre, trois entrées et statut académique                               |
| Palette             | Blanc, slate, navy et vert institutionnel conservés                                                   |
| Typographie         | Hiérarchie lisible sur le viewport desktop réel de 1732 × 961                                         |
| Parcours            | Six étapes conservées, état calculé à partir des soumissions réelles                                  |
| Contenu principal   | Risques internes et qualification séparés ; tableaux juridiques et règles explicables                 |
| Panneau droit       | Progression, contrôles et action suivante conservés                                                   |
| Copie               | Libellés fonctionnels conservés ; faux chiffres/dates de la maquette remplacés par le dossier courant |

Adaptations intentionnelles : le titre est celui du dossier ; le risque interne utilise trois dimensions lisibles ; le prétriage provisoire et les incertitudes sont visibles. Le mockup est une référence de langage visuel, pas une source de faits juridiques.
Pas de validation annoncée au pixel près. Une vue mobile 390 × 844 a ensuite été vérifiée pendant la recette de l’étape 16 ; aucun appareil physique n’a été testé.
