# BACKLOG — Horizon Team Website

Work queue for the routine. Top of **Next up** ships first. See `docs/ROUTINE.md`
for how items move through states.

## Next up

<!-- Highest-priority item first. One line each; link a spec section if it exists. -->

1. **Drop in the team photography** — founders group shot (16/9, 1600 × 900+)
   and four member portraits. Portraits are now **square** crops at
   `public/team/<name>.webp`, 320 × 320, rendered as small circles — the old
   800 × 1000 portrait slots are gone. File drop plus one line per member in
   `content/team.ts`. (auto-merge)
2. **Write Ender's design story** — the Chain Reaction entry currently states
   only confirmed facts. Add the team's own account of the design decisions to
   `content/robots.ts` → `ender.description`. (auto-merge)
3. **Confirm rights and credit for the FIRST Championship photos** — the two
   event photos in `public/ftc/` came from the team. If they are official FIRST
   press images, check whether a credit line is required and add one under
   `aboutFtc.photoCaption`. (auto-merge)
4. **Clear the under-construction banner** — set `announcement` to `null` in
   `lib/site.ts` once items 1–3 are done. One line, and the bar and its spacing
   both go. (auto-merge)

## In progress

<!-- Item currently being shipped, with its branch name. -->

_(none)_

## Done

<!-- Shipped + merged items, newest first. -->

- **Mentor roster complete** (2026-08-17) — Declan Simcich, Bilal Chaudhary,
  Joshua Wang, and Nishant Vikramaditya, all four with photos. Listed as equals:
  Nishant's World Championship sits in the same weight as everyone else's team
  number, not in a highlighted badge, on team instruction.
- **Contact form live** (2026-08-17) — activated and confirmed by the team. Now
  posts to FormSubmit's alias rather than the naked address, so the team's gmail
  is no longer in the shipped build. Contact copy cut back to short lines.
- **Favicon** (2026-08-17) — the brand mark unchanged on a `#17061D` ground.
  An earlier pass redrew the geometry (solid sun, heavier horizon) to survive
  16px; the team rejected that, so the mark stands as supplied.
- **First sponsors, page split, and a working form** (2026-08-16) — Tektite
  signed at Bronze (Charge 3B chargers); GitHub and Canva recognised in a new
  Nonprofit Services band. The pitch moved to `/support` and `/sponsors` became
  the wall. Logos are inlined single-colour paths with per-logo optical
  scaling. Contact form now POSTs to FormSubmit with a mail-client fallback.
  Under-construction banner added above the header.
- **Voice and content pass** (2026-08-16) — team instructions applied sitewide:
  no mention of team fees anywhere, funding described as sponsorship plus the
  team's own fundraisers, the word "honest" removed, and every constructed
  section title replaced with one that names the section. Member cards now carry
  role and years in FIRST instead of individual honours; roles corrected. Join
  us condensed to two lines, "Why a new team" cut, a mentors section added, the
  budget donut rebuilt to match the team's own chart (`showAmounts: true`), and
  two FIRST Championship photos added to the FTC section as an angled stack.
- **Chain Reaction figures published** (2026-08-16) — team confirmed 80+
  submissions and a 1st-place finish, so the claim "largest FTC CAD competition
  held to date" is now backed by figures shown on the Home and Ender pages.
- **White wordmark added** (2026-08-16) — `public/brand/horizon-wordmark-white.svg`,
  now used in the footer. Completes the brand set.
- **Full site rebuild from scratch** (2026-08-16). Coming-soon mode removed;
  Home, Team, Robots (+ robot and subsystem pages), Sponsors, and Contact all
  built against a new design system captured in `docs/UI_GUIDE.md`. Content
  written from the team's sponsorship package and the supplied mission
  paragraph. `pnpm verify` green; contrast, tap targets, mobile overflow, form
  validation, and the mobile menu all checked.
- **Build the Home / landing page** — superseded by the rebuild above.

## Icebox

<!-- Ideas not yet ready to queue. -->

- **Blog / season updates** — worth doing once BIOBUZZ starts and there is a
  build to narrate. Sponsors at the Diamond tier are promised a dedicated post,
  so this becomes load-bearing the moment one signs.
- **Outreach page** — the impact material currently lives inside the Sponsors
  page. It earns its own page when there is more of it than four paragraphs.
- **Engineering portfolio** — for judges, once there is a season's work behind it.
- **Sponsor showcase** — the grid is already written in `app/sponsors/page.tsx`
  and renders automatically as soon as `currentSponsors` is non-empty.
