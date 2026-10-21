# Installer la même démonstration sur un autre PC

## Prérequis

- Windows 10/11, PowerShell, Git.
- Node.js **24 LTS**, avec npm (`node --version`, `npm --version`).
- Docker Desktop démarré, configuré pour les conteneurs Linux (`docker info`).
- Internet pour la première installation des dépendances et de PostgreSQL.
- Ports locaux 3000 et 55432 disponibles. Codex est facultatif pour exécuter l’application.

## Première installation

Cloner ce dépôt puis ouvrir son dossier dans Codex. Pour retrouver exactement la version de remise, utiliser le tag `demo-v1` ; il est normal que Git indique une tête détachée pour ce tag. Créer une branche avant de développer à partir de cette version.

```powershell
git clone https://github.com/oussjd2/AhmedProject_ai_safety.git
cd AhmedProject_ai_safety
git checkout demo-v1
npm run demo:setup
npm run local:start
```

Ouvrir **http://127.0.0.1:3000**. Garder le terminal du serveur ouvert.

`demo:setup` vérifie les prérequis, crée `.env` à partir du modèle s’il est absent, installe les versions du lockfile, démarre PostgreSQL, génère Prisma, applique les migrations, ajoute les trois dossiers fictifs et compile l’application. Il ne copie pas la base du premier PC et ne détruit pas les dossiers existants.

Les commandes individuelles équivalentes sont :

```powershell
npm run local:setup
npm run demo:seed
npm run build
```

## Résultats attendus

| Dossier                                  | Résultat                               | Note                 |
| ---------------------------------------- | -------------------------------------- | -------------------- |
| Démo A — Traduction de documents publics | CONFORME, risque faible                | 77/100               |
| Démo B — Recherche confidentielle        | À CLARIFIER, risque élevé              | Notation non ouverte |
| Démo C — Classement des admissions       | CONFORME SOUS CONDITIONS, risque élevé | 84/100               |

Les réponses, douze documents sources fictifs, examens motivés, notes et trois rapports initiaux sont recréés automatiquement. Les identifiants techniques de pièces, dates de génération et identifiants de relations peuvent différer entre PC ; les scénarios et leurs résultats sont les mêmes. Le dossier de test manuel du premier PC n’est pas transféré.

Le menu en haut permet de choisir Demandeur, Fournisseur ou Évaluateur. Choisir Fournisseur depuis un dossier pour le lier à ce dossier. Il s’agit de rôles simulés, sans comptes ni mots de passe applicatifs.

## Utilisation suivante

```powershell
npm run local:start
```

Docker Desktop doit être démarré. Cette commande démarre PostgreSQL si nécessaire, puis le serveur. Le travail est conservé entre les sessions.

- Arrêter le serveur : **Ctrl+C**.
- Arrêter PostgreSQL : `npm run db:down`.
- Sauvegarder base, configuration et pièces : `npm run local:backup`.
- Restaurer les trois exemples seulement : `npm run demo:reset` (sauvegarde préalable automatique).
- Ajouter uniquement des exemples manquants : `npm run demo:seed`.
- Développement : `npm run dev` à la place du serveur compilé ; arrêter l’autre serveur avant.

Ne pas supprimer le volume PostgreSQL. Les modifications faites sur un PC ne sont pas synchronisées avec celles de l’autre PC par Git.

## Si une étape échoue

- `node` ou `npm` introuvable : installer Node.js 24 LTS puis rouvrir le terminal/Codex.
- Docker indisponible : démarrer Docker Desktop, attendre son démarrage complet et vérifier les conteneurs Linux.
- Port 55432 occupé : arrêter l’autre instance de cette démonstration avant de reprendre. Les fixtures sont volontairement limitées à cette base locale.
- Port 3000 occupé : arrêter l’autre serveur local.
- Script PowerShell bloqué : les commandes npm utilisent déjà une politique d’exécution limitée au processus ; ne pas modifier la politique système.
- Prisma verrouillé sous Windows : arrêter les serveurs Node de ce projet avant de relancer l’installation.
- Anciennes ressources ou erreurs après compilation : arrêter puis relancer le serveur.

Une installation relancée conserve `.env` et les dossiers déjà créés. Ne pas exécuter `demo:reset` pour résoudre une erreur d’installation.

## Message à donner à Codex

> Lis AGENTS.md, SETUP.md et docs/AGENT_HANDOFF.md. Je veux lancer la version de démonstration existante avec ses trois dossiers fictifs sur ce PC. Vérifie Node 24 et Docker, exécute l’installation documentée, puis vérifie les résultats attendus. Préserve toute donnée existante et ne modifie pas le périmètre du projet.

Le partage Cloudflare est facultatif ; aucune configuration du tunnel de l’autre PC n’est nécessaire. Les formulations juridiques doivent encore être validées par le groupe académique.
