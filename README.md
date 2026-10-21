# Clair — Due diligence des outils d’IA

Prototype académique local : besoin → triage → fournisseur → contrôles → évaluation → rapport.
Les données doivent être fictives. Le sélecteur de rôle est une simulation, pas une authentification.
Aucune API d’IA, police distante ou connexion aux systèmes UNIL.

**Nouveau PC / Codex : commencer par [SETUP.md](SETUP.md).** Le contexte de reprise est dans [AGENTS.md](AGENTS.md) et [docs/AGENT_HANDOFF.md](docs/AGENT_HANDOFF.md). Le tag `demo-v1` identifie la version de remise.

## Installation Windows

Prérequis : Node.js 24 LTS, npm, Docker Desktop démarré (conteneurs Linux).

```powershell
npm run local:setup
npm run dev
```

Ouvrir http://127.0.0.1:3000. PostgreSQL écoute uniquement sur 127.0.0.1:55432.
La première installation télécharge les dépendances et l’image PostgreSQL. Ensuite le fonctionnement de l’application est local.

Pour installer directement la version compilée avec les trois dossiers de démonstration :

```powershell
npm run demo:setup
npm run local:start
```

Pour lancer la version compilée :

```powershell
npm run build
npm run local:start
```

Arrêter le serveur avec Ctrl+C. `npm run db:down` arrête PostgreSQL sans supprimer ses données.
`npm run local:backup` sauvegarde la base, les justificatifs et la configuration dans `backups/`.
Ne pas exécuter `docker compose down -v` : cela supprimerait le volume de dossiers.

## Dossiers de démonstration

```powershell
npm run demo:seed
```

Ajoute trois dossiers fictifs avec documents, examens motivés et rapports : traduction conforme (77/100), recherche à clarifier (notation non ouverte), admissions conformes sous conditions (84/100).
Une seconde exécution conserve les dossiers existants. `npm run demo:reset` restaure uniquement ces trois exemples, avec sauvegarde préalable, et conserve les autres dossiers. PostgreSQL doit être démarré.
Les détails et résultats attendus figurent dans [demo/README.md](demo/README.md).

## Partage temporaire Cloudflare

Avec l’application et PostgreSQL démarrés, lancer `cloudflared tunnel --url http://127.0.0.1:3000 --no-autoupdate`.
Dans le terminal de l’application, définir `$env:CLAIR_PREVIEW_ORIGIN = 'https://hote-genere.trycloudflare.com'` avec l’origine exacte fournie par le tunnel, puis relancer `npm run start` (après compilation).
L’API accepte cet hôte précis et ses écritures de même origine, tout en conservant les contrôles de rôles. Aucun joker de domaine n’est autorisé.
Le lien donne accès à la démo et aux rôles simulés : utiliser uniquement des données fictives et le partager seulement avec les personnes souhaitées.
Garder le PC éveillé, internet, PostgreSQL, le serveur et le tunnel actifs. Arrêter `cloudflared` coupe le partage ; un nouveau tunnel fournit une nouvelle adresse et nécessite de mettre à jour la variable puis de relancer le serveur.
La variable est facultative et n’est pas enregistrée dans le dépôt ; sans elle, l’API reste locale.

## Parcours

1. Créer un dossier comme demandeur ; renseigner puis soumettre toutes les rubriques internes.
2. Consulter le triage, les risques, les régimes à examiner et les actions.
3. Dans le dossier, choisir le rôle fournisseur. Répondre aux questions activées et joindre les documents fictifs ; soumettre après les uploads.
4. Choisir le rôle évaluateur. Ouvrir les contrôles, examiner les réponses/documents et motiver les conclusions.
5. Lorsque les prérequis sont satisfaits, enregistrer les notes et pondérations.
6. Générer un rapport, puis utiliser « Imprimer / Enregistrer en PDF ».

Le rôle fournisseur est lié au dossier depuis lequel il est sélectionné. Il ne reçoit ni les commentaires internes, ni les rapports, ni les dossiers concurrents. Tout utilisateur de cette démo peut changer de rôle : ce dispositif ne protège pas de vraies données.

## Organisation

- `src/app/` : pages Next.js et API locale.
- `src/components/` : interface, formulaires, preuves, examens et rapports.
- `src/config/assessment.ts` : questions affichées, contrôles, sources, poids et version.
- `src/config/source-questions.json` : formulations sources reproduites dans le rapport reçu.
- `src/lib/engine.ts` : moteur déterministe, explications, invalidation des examens et agrégation.
- `src/lib/server.ts` : accès aux dossiers, rôles simulés et transactions.
- `prisma/` : modèle PostgreSQL et migration initiale.
- `scripts/` : installation, démarrage et sauvegarde.
- `docs/` : brief reçu et décisions d’implémentation.

## Sauvegarde et cohérence

Les réponses sont enregistrées après une courte pause. Attendre l’indicateur « Enregistré » avant de quitter la page ; les boutons d’étape attendent l’enregistrement. Une erreur laisse le brouillon affiché pour correction.
Chaque écriture incrémente la révision du dossier. Une révision dépassée est rejetée au lieu d’écraser des données.
Les examens portent une empreinte des faits et preuves pertinents. Une modification rend les examens concernés caducs et retire la notation antérieure.
Les rapports sont des instantanés immuables : réponses, questions affichées, conclusions, sources, contrôles, notes et version du référentiel.

## Configuration et limites connues

Les questions de base et les ajouts du dernier rapport sont intégrés. Les questions sources abrégées sont archivées telles que transmises, sans prétendre reconstituer les PDF des coéquipiers. Le registre des sources distingue consultation et validation juridique complète.
Les risques internes suivent une rubrique académique explicite ; ils ne constituent pas une catégorie légale.
L’évaluateur confirme les conclusions nécessitant une appréciation. Les cinq résultats sont déterminés par les statuts des contrôles, les informations disponibles et les prérequis.
Une règle incertaine ne produit jamais une conformité inventée. Il reste au groupe à valider le contenu juridique pour sa remise.

Pour changer un référentiel, incrémenter `CONFIG_VERSION`. Les anciens rapports restent inchangés. L’évaluateur doit actualiser explicitement un dossier ancien et reprendre les examens.

## Vérifications de développement

```powershell
npm run typecheck
npm run lint
npm run build
```

Les étapes 1–16 sont terminées pour la recette technique locale : parcours, rôles, justificatifs, invalidation, notation, historique, redémarrage et impressions vérifiés. Le partage Cloudflare a ensuite été vérifié et arrêté. Voir [docs/STATUS.md](docs/STATUS.md) pour les preuves et limites. La répétition sur le laptop final et la validation juridique par le groupe restent à suivre. Le déroulé oral est préparé par l’utilisateur.
