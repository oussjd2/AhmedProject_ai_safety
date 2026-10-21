# Décisions de la première itération

## Périmètre

Étapes 1–14 : application locale complète, sans IA, avec dossiers fictifs, rôles simulés, réponses sauvegardées, justificatifs, examens, résultats expliqués, notation et rapport imprimable.
Pas d’authentification réelle, d’invitations email, de connexion UNIL, d’interface d’administration complète ni de comparaison multi-fournisseurs.

## Architecture

Next.js / React / TypeScript, Tailwind et composants shadcn/ui, Zod, PostgreSQL 17 et Prisma 6.
Le navigateur ne reçoit jamais les champs internes d’un dossier en rôle fournisseur.
L’API vérifie le rôle et la liaison au dossier ; elle accepte les hôtes locaux et, pendant le partage, l’hôte HTTPS exact configuré par `CLAIR_PREVIEW_ORIGIN`. Les écritures d’origine étrangère sont refusées.
Les fichiers sont conservés hors de `public/`, servis par une route contrôlée et validés en taille, extension et signature.

## Logique

- Réponses structurées → questions pertinentes → contrôles et explications.
- Les identifiants U01–U25 et F01–F37 correspondent au dernier rapport ; les champs complémentaires portent un suffixe ou un préfixe de module.
- Les formulations originales reproduites et les libellés affichés sont conservés séparément.
- Un contrôle non applicable demande une justification explicite ; ce statut ne signifie pas absence de preuve ignorée.
- Toute validation positive d’un contrôle requiert une preuve et des réponses pertinentes complètes.
- Un blocage confirmé précise obligation légale ou exigence de marché public.
- Priorité globale : blocage confirmé, information/examen manquant, correction, condition, conformité.
- La notation nécessite les deux soumissions et tous les contrôles préalables résolus.
- Une correction préalable bloque la notation ; une condition continue explicitement acceptée peut la permettre.
- Les poids totalisent 100 % ; la note est la somme de note / 5 × poids.

## Règles de conservation

Les changements internes rendent les examens dépendants du contexte caducs. Les changements fournisseur invalident les contrôles portant sur leurs réponses ; un justificatif modifié invalide son contrôle.
Toute modification retire la notation enregistrée. Les anciens rapports sont préservés en JSON autonome en base, y compris libellés et sources.
Un document retiré n’est plus téléchargeable, mais son nom et ses métadonnées restent dans les rapports déjà générés.

## Contenu juridique

La configuration distingue loi, qualification juridique, condition de marché, contrat et référentiel interne.
Le calendrier de l’amendement 2026/1744 a été consulté ; les autres qualifications du cas concret et les contributions consolidées doivent être approuvées par le groupe.
Les exemples du rapport de recherche ne sont pas traités comme des preuves de conformité d’un vrai fournisseur.

## Suite réservée

Étape 15 terminée : trois dossiers de démonstration, douze documents fictifs associés, examens motivés, résultats contrastés et rapports initiaux. `demo:seed` ajoute les dossiers absents ; `demo:reset` restaure seulement les trois dossiers réservés, avec sauvegarde préalable et conservation des autres dossiers. Le déroulé de présentation est laissé à l’utilisateur.
Étape 16 terminée pour la recette technique locale : parcours complet, isolation des vues, invalidation, blocages, notation, historique, redémarrage et inspection des PDF imprimés. Détails et limites dans `STATUS.md`. L’icône navigateur manquante a été ajoutée ; aucun changement du moteur métier n’a été nécessaire. La répétition sur le laptop final, la validation juridique et le tunnel de partage restent à suivre.
