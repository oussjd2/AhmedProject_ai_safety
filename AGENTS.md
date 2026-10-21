# Clair — instructions for Codex

Read `SETUP.md`, then `docs/AGENT_HANDOFF.md` before working on this project.

- This is a French academic demonstration of due diligence when acquiring AI tools. The application itself uses no AI. It runs locally on one presentation laptop, with fictional data and simulated roles.
- Keep changes straightforward and within the agreed first iteration. Do not add production authentication, cloud infrastructure, AI features or university integrations without a new request.
- First installation with the three demos: `npm run demo:setup`, then `npm run local:start`. Requires Node.js 24 LTS, Git and Docker Desktop with Linux containers. Use `npm ci`, preserving the lockfile.
- Preserve existing dossiers and uploaded evidence. Never reset the whole database or remove its volume. `demo:seed` adds missing demos; `demo:reset` restores only the three reserved examples with a backup.
- Never commit `.env`, `.env.local`, `data/`, `backups/`, runtime uploads or credentials. The password in `.env.example` and `compose.yaml` is an intentional local-only demo default.
- The authoritative rules are in `src/config/assessment.ts` and `src/lib/engine.ts`; role and write validation is in `src/app/api/[...path]/route.ts`. Read them before changing behavior.
- Keep internal risk distinct from legal classification. Human review confirms legal conclusions. Missing/unknown information must not silently become compliance. Scoring must respect prerequisites and blockers.
- Preserve report snapshots and review fingerprint invalidation. Increment `CONFIG_VERSION` when changing the assessment reference rules; document effects on existing dossiers.
- Run relevant checks: `npm run typecheck`, `npm run lint`, `npm run build`. For behavior changes, verify the affected browser/API flow. Restart the production server after building to avoid stale asset errors.
- The first iteration passed local acceptance checks. Historical evidence and limits are in `docs/STATUS.md`; do not present those checks as freshly run on a new machine.
- Keep setup instructions and `docs/AGENT_HANDOFF.md` aligned with actual changes. Do not start a tunnel or publish updates unless requested.
