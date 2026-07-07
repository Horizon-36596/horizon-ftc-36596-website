# Paste-in setup prompt

Drop the `team-website-starter-kit` folder into a new Claude Code chat (open the
folder as your working directory), then paste everything between the lines below.

---

You are helping me set up a new **FTC robotics team website** project. This folder
is a starter kit copied from a working team's setup. I am not necessarily a
programmer — explain the process as you go so I learn it, but do the actual work
yourself. Ask me questions in small batches; never make me read code.

Do these steps in order. Narrate what each piece is for as you go.

**Step 0 — Read the kit.** Read `README.md`, `CLAUDE.md`, `docs/ROUTINE.md`,
`docs/BACKLOG.md`, and every file in `.claude/`. Tell me in 3-4 sentences what
this workflow is (the routine: prep → ship → report) and how the three slash
commands and the safety rules fit together. This is the process I'm learning.

**Step 1 — Interview me.** Ask me for the facts needed to fill the
`<PLACEHOLDER>` marks in `CLAUDE.md`: team name, team number, who the human is
(programmer or not, how hands-off), and whether the stack should stay Next.js +
TypeScript + Tailwind + GitHub Pages (pnpm) or change. Batch the questions.

**Step 2 — Fill CLAUDE.md.** Replace every placeholder with my answers. Confirm
no `<...>` marks remain.

**Step 3 — Write a SPEC.** `docs/ROUTINE.md` and `CLAUDE.md` both reference
`docs/SPEC.md`, which the kit does NOT include. Interview me briefly (audiences,
must-have pages, the team's story/vibe, any awards or events to feature) and write
`docs/SPEC.md` capturing design intent + a simple page list (IA). Mark anything
you invent as `<!-- PLACEHOLDER -->`.

**Step 4 — Scaffold the site.** Create a Next.js (App Router) + TypeScript +
Tailwind project configured for static export (`output: 'export'`) and GitHub
Pages, using pnpm. Add a GitHub Actions workflow that builds and deploys to
Pages. Add a `pnpm verify` script (typecheck + lint + format check + build). Keep
the kit's `.claude/` and `docs/` in place. If the stack changed in Step 1, adapt.

**Step 5 — Seed the backlog.** Turn the SPEC's page list into `docs/BACKLOG.md`
items under "Next up", highest-value page first.

**Step 6 — Init git + first commit.** Add a sensible `.gitignore`
(`node_modules`, `.next`, `out`, `.env*`). `git init`, stage, and make the first
commit. Ask before creating any GitHub remote or pushing — don't do it unasked.

**Step 7 — Teach me the loop.** Show me the three commands and when to use each:
`/prep-backlog` (queue work), `/run-routine` (ship the top item end to end),
`/human-task-list` (what only I must do). Then offer to run one `/run-routine`
cycle on the top backlog item so I see it work.

Notes:

- The kit assumes some skills exist (`new-project-setup`, `frontend-design`). If
  I don't have them installed, do the equivalent work directly — do NOT block on
  a missing skill. Mention which skills would have helped so I can install them
  later.
- Follow the safety rules in `.claude/settings.local.json` and `docs/ROUTINE.md`:
  never force-push, `reset --hard`, weaken CI, or commit secrets.

Start with Step 0.

---
