# Dossiers fictifs de démonstration

Étape 15 : trois dossiers préremplis, douze documents texte téléchargeables, examens motivés, notes lorsque les prérequis sont satisfaits et un rapport initial par dossier.
Tous les noms, sociétés, engagements, tests, tarifs et conclusions sont inventés. Aucun justificatif ne constitue une preuve sur un fournisseur réel ou une validation institutionnelle.

## Commandes

Après l’installation locale, avec PostgreSQL démarré :

```powershell
npm run demo:seed
```

Crée les dossiers absents seulement. Les dossiers démo déjà présents, y compris leurs modifications, sont conservés.
Ouvrir l’application sur http://127.0.0.1:3000 ; les trois dossiers figurent dans la liste habituelle. Les rôles simulés permettent de consulter leurs questionnaires et examens. Le rapport initial est disponible dans chaque dossier.

Pour restaurer les trois exemples dans leur état initial :

```powershell
npm run demo:reset
```

Cette commande remplace uniquement les trois identifiants réservés ci-dessous, après vérification de leur marqueur de création. Elle conserve les autres dossiers et refuse une collision avec un dossier non identifié comme démo. Elle est limitée à la base locale `clair` sur `127.0.0.1:55432` ou `localhost:55432`.

Avant remplacement, les dossiers démo existants, leurs relations et leurs justificatifs sont copiés dans `backups/demo-<date>-<identifiant>/` (`cases.json` et `evidence/`). Les remplacements en base sont transactionnels ; les anciennes preuves ne sont retirées du stockage actif que si aucun dossier ne les référence encore. Pour une sauvegarde complète de l’application, utiliser `npm run local:backup`.

## Résultats attendus

| Dossier                       | Identifiant              | Risque interne | Résultat                 | Note        |
| ----------------------------- | ------------------------ | -------------- | ------------------------ | ----------- |
| A — Traduction publique       | `clair-demo-translation` | Faible         | CONFORME                 | 77/100      |
| B — Recherche confidentielle  | `clair-demo-research`    | Élevé          | À CLARIFIER              | Non ouverte |
| C — Classement des admissions | `clair-demo-admissions`  | Élevé          | CONFORME SOUS CONDITIONS | 84/100      |

Les deux questionnaires sont soumis dans chaque exemple. Les incertitudes de B sont explicites : une réponse « Inconnu » est renseignée, mais ne vaut pas une preuve satisfaisante.

- A : sept contrôles satisfaits ; traduction de contenus publics avec relecture. Notes qualité/coût/intégration/durabilité : 4, 3, 5, 4 sur 5, avec poids 40/30/15/15.
- B : douze contrôles ; D04 sans preuve, F24a et F26 inconnus ; corrections D05 (réutilisation) et S01 (clés et accès). L’information manquante détermine le résultat global, sans masquer les corrections. Aucune notation enregistrée.
- C : onze contrôles ; qualification renforcée retenue par l’évaluateur fictif ; conditions continues T03 (supervision, recours, biais) et C02 (conformité future). Le moteur ajoute également la condition liée à un contrat traversant décembre 2027. Notes : 4,5, 4, 4, 4 sur 5. Le risque élevé reste visible malgré la notation autorisée.

La qualification juridique par acteur est propre à chaque hypothèse fictive. Le contenu juridique reste à valider par le groupe ; les exemples n’ajoutent pas de règle générale au moteur.

## Fichiers

- `fixtures.ts` : réponses, rattachements des pièces, examens, conclusions, notes et résultats attendus.
- `evidence/translation/` : produit, sécurité et contrat (trois pièces).
- `evidence/research/` : produit, traitement, sécurité provisoire et projet de contrat (quatre pièces). L’absence de pièce de transfert est intentionnelle.
- `evidence/admissions/` : produit, traitement/impact, flux, supervision/tests et contrat/calendrier (cinq pièces).
- `../scripts/demo.ts` : chargement et restauration ; utilise le moteur existant pour vérifier les résultats et produire les instantanés.

Les pièces sources restent dans ce répertoire ; des copies sont placées dans le stockage privé `data/evidence/` et accessibles par les routes habituelles de l’application. Un même document peut étayer plusieurs contrôles du même dossier.

La préparation d’un déroulé oral est laissée à l’utilisateur. La campagne complète de tests de l’application et l’inspection des impressions/PDF restent à l’étape 16.
