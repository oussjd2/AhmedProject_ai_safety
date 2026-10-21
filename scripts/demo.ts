import { existsSync } from 'node:fs';
import { copyFile, mkdir, readFile, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { Prisma, PrismaClient } from '@prisma/client';
import { DEMO_MARKER, DEMO_VERSION, fixtures, type DemoFixture } from '../demo/fixtures';
import {
  CONFIG_VERSION,
  DISCLAIMER,
  RULE_SUMMARY,
  questions,
  scoringCriteria,
  sources,
} from '../src/config/assessment';
import type { CaseView, ReportSnapshot } from '../src/lib/domain';
import {
  assess,
  controlFingerprint,
  effectiveAnswers,
  missingQuestions,
  visibleQuestions,
} from '../src/lib/engine';

if (existsSync('.env')) process.loadEnvFile('.env');
const db = new PrismaClient();
const reset = process.argv.includes('--reset');
const evidenceRoot = path.resolve('data/evidence');
const sourceRoot = path.resolve('demo/evidence');
const include = {
  vendor: true,
  answers: true,
  evidence: { orderBy: { createdAt: 'asc' as const } },
  reviews: true,
  scores: true,
  reports: {
    select: { id: true, version: true, createdAt: true },
    orderBy: { version: 'desc' as const },
  },
  events: { orderBy: { createdAt: 'desc' as const }, take: 100 },
} satisfies Prisma.CaseInclude;

function inside(root: string, relative: string) {
  const target = path.resolve(root, relative);
  const rel = path.relative(root, target);
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel))
    throw new Error(`Chemin refusé : ${relative}`);
  return target;
}

async function load(tx: Prisma.TransactionClient, id: string): Promise<CaseView> {
  const row = await tx.case.findUniqueOrThrow({ where: { id }, include });
  return {
    ...JSON.parse(JSON.stringify(row)),
    answers: Object.fromEntries(row.answers.map((a) => [a.questionId, a.value])),
  };
}

function checkAnswers(f: DemoFixture) {
  const answers = effectiveAnswers({
    ...f.answers,
    U01: `${f.department} — ${f.owner}`,
    U02: f.description,
  });
  for (const audience of ['internal', 'vendor'] as const) {
    const missing = missingQuestions(audience, answers);
    if (missing.length)
      throw new Error(`${f.key} : réponses manquantes ${missing.map((q) => q.id).join(', ')}`);
    for (const q of visibleQuestions(audience, answers)) {
      const value = answers[q.id];
      if (value === undefined) continue;
      const valid =
        q.type === 'number'
          ? typeof value === 'number' && Number.isFinite(value)
          : q.type === 'multi'
            ? Array.isArray(value) && value.every((v) => q.options?.includes(v))
            : typeof value === 'string' && (!q.options || q.options.includes(value));
      if (!valid) throw new Error(`${f.key} : valeur invalide pour ${q.id}`);
    }
  }
  return answers;
}

async function seedCase(
  tx: Prisma.TransactionClient,
  f: DemoFixture,
  files: Record<string, { storageName: string; size: number; originalName: string }>,
) {
  const answers = checkAnswers(f);
  await tx.case.create({
    data: {
      id: f.id,
      title: f.title,
      department: f.department,
      owner: f.owner,
      purpose: f.purpose,
      description: f.description,
      assessmentDate: '2026-10-20',
      deploymentDate: f.deploymentDate,
      revision: 1,
      configVersion: CONFIG_VERSION,
      internalSubmitted: true,
      vendorSubmitted: true,
      vendor: { create: f.vendor },
      answers: {
        create: Object.entries(answers).map(([questionId, value]) => ({ questionId, value })),
      },
      events: {
        create: {
          actor: 'evaluator',
          action: DEMO_MARKER,
          detail: { key: f.key, version: DEMO_VERSION, fictional: true },
        },
      },
    },
  });
  let c = await load(tx, f.id);
  const active = assess(c).controls;
  for (const control of active) {
    if (!(control.id in f.evidenceByControl))
      throw new Error(`${f.key} : preuve non définie pour ${control.id}`);
    const key = f.evidenceByControl[control.id];
    if (key) {
      const file = files[key];
      if (!file) throw new Error(`${f.key} : document inconnu ${key}`);
      await tx.evidence.create({
        data: {
          caseId: f.id,
          controlId: control.id,
          ...file,
          mime: 'text/plain',
          uploadedBy: 'supplier',
        },
      });
    }
  }
  c = await load(tx, f.id);
  for (const control of active) {
    const preset = f.reviewOverrides[control.id];
    const status = preset?.status ?? 'satisfied';
    const justification = preset?.justification ?? f.notes[control.id];
    if (!justification) throw new Error(`${f.key} : justification absente pour ${control.id}`);
    if (['satisfied', 'conditional', 'not_applicable'].includes(status)) {
      const visible = new Set(visibleQuestions('vendor', answers).map((q) => q.id));
      if (
        !c.evidence.some((e) => e.controlId === control.id) ||
        control.questionIds.some(
          (id) =>
            visible.has(id) &&
            (!answers[id] || ['Inconnu', 'Inconnue'].includes(String(answers[id]))),
        )
      ) {
        throw new Error(`${f.key} : examen positif sans prérequis pour ${control.id}`);
      }
    }
    await tx.review.create({
      data: {
        caseId: f.id,
        controlId: control.id,
        status,
        justification,
        condition: preset?.condition ?? '',
        reviewer: `Évaluateur fictif — ${f.key}`,
        legalConclusions: control.id === 'T02' ? f.legalConclusions : {},
        fingerprint: controlFingerprint(control, c),
      },
    });
  }
  c = await load(tx, f.id);
  if (f.scoreValues) {
    if (!assess(c).scoringEligible) throw new Error(`${f.key} : notation prématurée`);
    const reasons =
      f.key === 'translation'
        ? [
            'Relecture et limites terminologiques documentées ; qualité simulée satisfaisante.',
            'Coût fictif de 2 400 CHF sur douze mois, sans intégration spécifique.',
            'Formats ouverts et usage web autonome adaptés au besoin fictif.',
            'Consommation illustrative suivie ; absence d’audit indépendant.',
          ]
        : [
            'Tests fictifs de classement et de biais ; décision humaine et suivi continu requis.',
            'Coût fictif de 54 000 CHF sur trente-six mois incluant suivi et sortie.',
            'Import et export ouverts prévus ; intégration réelle non réalisée.',
            'Suivi fictif par campagne et limitation des traitements inutiles.',
          ];
    await tx.score.createMany({
      data: scoringCriteria.map((criterion, i) => ({
        caseId: f.id,
        criterionId: criterion.id,
        weight: criterion.weight,
        value: f.scoreValues![i],
        justification: reasons[i],
      })),
    });
  }
  c = await load(tx, f.id);
  const assessment = assess(c);
  if (
    assessment.outcome !== f.expected.outcome ||
    assessment.overallRisk !== f.expected.risk ||
    assessment.score !== f.expected.score ||
    assessment.controls.some((x) => x.stale)
  ) {
    throw new Error(
      `${f.key} : résultat inattendu ${JSON.stringify({ outcome: assessment.outcome, risk: assessment.overallRisk, score: assessment.score, controls: assessment.controls.map((x) => [x.id, x.status, x.stale]) })}`,
    );
  }
  const snapshot: ReportSnapshot = {
    case: c,
    assessment,
    sources,
    questions,
    scoringDefinitions: scoringCriteria,
    disclaimer: DISCLAIMER,
    configVersion: CONFIG_VERSION,
    ruleSummary: RULE_SUMMARY,
    generatedBy: 'evaluator',
    generatedAt: new Date().toISOString(),
  };
  await tx.report.create({
    data: {
      id: `${f.id}-report-v1`,
      caseId: f.id,
      version: 1,
      snapshot: JSON.parse(JSON.stringify(snapshot)),
    },
  });
  return `${f.title} : ${assessment.outcome} · risque ${assessment.overallRisk} · note ${assessment.score ?? 'non ouverte'}`;
}

async function main() {
  const url = new URL(process.env.DATABASE_URL ?? '');
  if (
    !['localhost', '127.0.0.1'].includes(url.hostname) ||
    url.port !== '55432' ||
    url.pathname !== '/clair'
  )
    throw new Error('Utiliser uniquement la base locale clair sur le port 55432.');
  if (process.argv.slice(2).some((arg) => arg !== '--reset'))
    throw new Error('Option inconnue. Utiliser demo:seed ou demo:reset.');
  const ids = fixtures.map((f) => f.id);
  const existing = await db.case.findMany({
    where: { id: { in: ids } },
    include: { ...include, reports: true, events: true },
  });
  for (const c of existing) {
    if (
      !c.events.some(
        (e) =>
          e.action === DEMO_MARKER &&
          (e.detail as { key?: string })?.key === fixtures.find((f) => f.id === c.id)?.key,
      )
    )
      throw new Error(
        `Identifiant réservé occupé sans marqueur démo : ${c.id}. Aucune suppression effectuée.`,
      );
  }
  const selected = fixtures.filter((f) => reset || !existing.some((c) => c.id === f.id));
  for (const f of selected) checkAnswers(f);
  let backup: string | undefined;
  if (reset && existing.length) {
    backup = path.resolve(
      'backups',
      `demo-${new Date().toISOString().replace(/[:.]/g, '-')}-${randomUUID().slice(0, 8)}`,
    );
    await mkdir(path.join(backup, 'evidence'), { recursive: true });
    await writeFile(
      path.join(backup, 'cases.json'),
      JSON.stringify({ demoVersion: DEMO_VERSION, cases: existing }, null, 2),
    );
    for (const storageName of new Set(
      existing.flatMap((c) => c.evidence.map((e) => e.storageName)),
    )) {
      await copyFile(
        inside(evidenceRoot, storageName),
        inside(path.join(backup, 'evidence'), storageName),
      );
    }
  }
  const written: string[] = [];
  const prepared: Record<
    string,
    Record<string, { storageName: string; size: number; originalName: string }>
  > = {};
  await mkdir(evidenceRoot, { recursive: true });
  let summaries: string[];
  try {
    for (const f of selected) {
      prepared[f.id] = {};
      for (const [key, relative] of Object.entries(f.documents)) {
        const source = inside(sourceRoot, relative);
        const contents = await readFile(source, 'utf8');
        if (!contents.includes('FICTIF'))
          throw new Error(`Document sans avertissement fictif : ${relative}`);
        const storageName = `demo-${randomUUID()}.txt`;
        const destination = inside(evidenceRoot, storageName);
        await copyFile(source, destination);
        written.push(destination);
        prepared[f.id][key] = {
          storageName,
          size: (await stat(destination)).size,
          originalName: `${f.key}-${path.basename(relative)}`,
        };
      }
    }
    summaries = await db.$transaction(
      async (tx) => {
        // Recheck ownership and revisions inside the transaction before replacing anything.
        const current = await tx.case.findMany({
          where: { id: { in: ids } },
          include: { events: true },
        });
        for (const c of current) {
          const before = existing.find((row) => row.id === c.id);
          if (
            !before ||
            before.revision !== c.revision ||
            before.updatedAt.getTime() !== c.updatedAt.getTime() ||
            !c.events.some((e) => e.action === DEMO_MARKER)
          )
            throw new Error('Un dossier démo a changé. Relancer la commande.');
        }
        if (current.length !== existing.length)
          throw new Error('Un dossier démo a changé. Relancer la commande.');
        if (reset) await tx.case.deleteMany({ where: { id: { in: selected.map((f) => f.id) } } });
        const result: string[] = [];
        for (const f of selected) result.push(await seedCase(tx, f, prepared[f.id]));
        return result;
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable, timeout: 30000 },
    );
  } catch (error) {
    for (const file of written) await unlink(file).catch(() => undefined);
    throw error;
  }
  // Delete only old files no longer referenced by any dossier, after a successful commit.
  if (reset)
    for (const storageName of new Set(
      existing.flatMap((c) => c.evidence.map((e) => e.storageName)),
    )) {
      if (!(await db.evidence.count({ where: { storageName } })))
        await unlink(inside(evidenceRoot, storageName)).catch((error) =>
          console.warn(`Ancienne preuve conservée : ${storageName}`, error.message),
        );
    }
  console.log(
    `${selected.length} dossier(s) ${reset ? 'restauré(s)' : 'créé(s)'}. ${fixtures.length - selected.length} dossier(s) existant(s) conservé(s).`,
  );
  for (const summary of summaries) console.log(summary);
  if (backup) console.log(`Sauvegarde préalable : ${backup}`);
  console.log('Les autres dossiers sont conservés. Ouvrir http://127.0.0.1:3000');
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
