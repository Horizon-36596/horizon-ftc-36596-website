# Team Website Starter Kit

A portable copy of the workflow scaffolding used to build the Seattle Solvers
(FTC 23511) team website with Claude Code. Team-specific facts have been
stripped — fill the `<PLACEHOLDER>` marks in `CLAUDE.md` and go.

## What's in the box (in-repo, copy directly)

```
.claude/
  commands/
    run-routine.md       # /run-routine — ship one backlog item end to end
    prep-backlog.md      # /prep-backlog — interactively queue work
    human-task-list.md   # /human-task-list — what only the human must do
  settings.json          # SessionStart hook: auto fast-forward from origin
  settings.local.json    # permission allow-list + safety deny-list (no force-push, etc.)
docs/
  ROUTINE.md             # the prep→ship→report cycle + tier/safety rules (authoritative)
  BACKLOG.md             # work-queue template
CLAUDE.md                # project brief template — FILL THE PLACEHOLDERS
```

## What is NOT in the box (skills/plugins — install separately)

These are NOT files in the repo; they live in the user's `~/.claude` (personal
scope) or come from plugin marketplaces. Your friend installs them once, then
they work in any project:

- **new-project-setup** skill — scaffolds this whole workflow into a fresh repo.
  Fastest path: install it, open the new project folder, say "set up the repo".
- **frontend-design** skill — distinctive, non-generic UI + per-project UI_GUIDE.md.
- **caveman** plugin — token-compressed responses + cavecrew subagents (optional).
- **anthropic-skills** marketplace — docx/pdf/pptx/xlsx, skill-creator, audits, etc.

## Two ways to use this

**Option 1 — regenerate (recommended).** Install the `new-project-setup` skill,
open the new project folder, tell Claude Code "set up the repo and workflow."
It builds fresh scaffolding tuned to the new project. Use this kit as a reference.

**Option 2 — copy this kit.** Drop `.claude/` and `docs/` into the new repo, then
fill every `<PLACEHOLDER>` in `CLAUDE.md`. Adjust the stack line if not
Next.js + Tailwind + GitHub Pages.

## Stack assumptions

The kit assumes: Next.js (App Router) + TypeScript + Tailwind, static export
(`output: 'export'`), deployed to GitHub Pages via GitHub Actions, package
manager **pnpm**. Change these in `CLAUDE.md` if the friend's team differs.
