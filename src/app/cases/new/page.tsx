import { CaseForm } from '@/components/case-form';
import { session } from '@/lib/server';
import { Notice } from '@/components/shared';
export default async function NewCase() {
  const { role } = await session();
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-7">
      <div>
        <h1>Nouvelle évaluation</h1>
        <p className="mt-2 text-muted-foreground">
          Un besoin précis est le point de départ d’un examen utile.
        </p>
      </div>
      {role === 'supplier' ? (
        <Notice title="Rôle demandeur nécessaire">
          Choisissez le rôle demandeur ou évaluateur pour créer un dossier.
        </Notice>
      ) : (
        <CaseForm />
      )}
    </div>
  );
}
