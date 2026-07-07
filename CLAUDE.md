# CLAUDE.md — Horizon Team Website

Project instructions for Claude Code. Read this first.

## What this project is

The public website for **Horizon, FTC Team 36596**. Audiences: sponsors,
judges, prospective members, and the FTC community. The bar: better than any
existing robotics team website, with genuinely excellent UI.

Stack: **Next.js (App Router) + TypeScript + Tailwind CSS**, statically exported
(`output: 'export'`) and deployed to **GitHub Pages** via GitHub Actions. No
backend, no database — content lives in the repo (MDX/TS data files).

Spec lives in: `docs/SPEC.md` (design intent + researched best practices).
Build plan: `docs/BACKLOG.md`.

## Who you're working with

App Lead, not a programmer, maximally hands-off. Never make them read code. They
verify by clicking the live site / preview URL. Default to autonomous action;
batch anything needing human input via /human-task-list.

## Workflow — the routine

This repo uses the shared **routine workflow**. It is integral, not optional —
treat `docs/ROUTINE.md` as authoritative alongside this file.

- **`docs/ROUTINE.md`** — source of truth for the prep → ship → report cycle, the
  auto-merge vs approval-required tier rules, and the hard safety rules.
- **`docs/BACKLOG.md`** — the work queue. Top of "Next up" ships first.
- **`/prep-backlog`** — interactively queue work (asks before writing).
- **`/run-routine`** — run one cycle now: prep, then ship the top item end to end.
- **`/human-task-list`** — compact list of what only _you_ need to do.

## Conventions

- Default branch: `main`. Feature branches: `routine/<slug>` (routine) or
  `site/<slug>` (manual).
- **pnpm, not npm.** Verify before pushing: `pnpm verify` (typecheck + lint +
  format check + build).
- BACKLOG state changes commit directly to `main`; feature work goes via PR.
- **No new dependencies** beyond the fixed stack without asking in the PR.
  Exception: tiny, well-known, zero-config UI utilities (e.g. `clsx`,
  `framer-motion`) may be added if the spec calls for the effect — note in PR body.
- **Design quality is a requirement, not polish.** Every page ships with real
  attention to typography, spacing, motion, and responsiveness. If a page would
  look like a default Tailwind tutorial, it is not done.
- Content accuracy: team facts (awards, events, robot names) come from
  `docs/SPEC.md` or the team — never invent specifics. Placeholder content is
  marked `<!-- PLACEHOLDER -->` and listed in the PR body.

## Safety (also enforced in `.claude/settings.local.json`)

Never force-push, `reset --hard`, weaken CI, commit secrets/`.env*`, or run
irreversible data operations. Prefer reversible actions; verify state before
anything destructive. See `docs/ROUTINE.md` §5 for the full list.
