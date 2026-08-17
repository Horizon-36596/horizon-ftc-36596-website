# SPEC — Horizon (FTC 36596) Team Website

Design intent + information architecture for the public site. This is the brief
the routine builds from. Anything not yet confirmed by the team is marked
`<!-- PLACEHOLDER -->` and must be replaced with real facts before it ships.

## 1. Purpose

The public website for **Horizon, FTC Team 36596**. Goal: better than any
existing robotics team website, with genuinely excellent UI. It should make a
strong first impression in seconds and give each audience a clear next step.

## 2. Audiences (all four are primary)

| Audience                | What they need                                            | Primary call-to-action            |
| ----------------------- | --------------------------------------------------------- | --------------------------------- |
| **Sponsors**            | Why Horizon is worth funding; credibility; ease of giving | "Become a sponsor" → Contact      |
| **Judges**              | Team story, engineering process, outreach, values         | Team / About + (future) portfolio |
| **Prospective members** | Is this team for me? How do I join?                       | "Join us" → Contact               |
| **FTC community**       | Who Horizon is; outreach; collaboration                   | About + social links              |

## 3. Story & vibe

**Horizon is a new team — say so.** Confirmed by the team. The site must not
imply history it doesn't have: no alumni counts, no multi-season retrospectives,
no "behind the bots" style media archive, no padded awards list. Reference site
for structure and tone is theseusrobotics.org, but its scale (20+ alumni, six
robots, 65-photo gallery) does not transfer — borrow the _shape_, not the
inventory. Newness is framed as an asset: every process and design decision is
the team's own, nothing inherited.

Founded **2026** in **Portland, Oregon** by captains and leads from three
existing FTC teams — Levin (12808), Saket (23511), Nippurn (32154), and Nico. A
**community** team, not a school team, and a **nonprofit**. The team does charge
a member fee, so **the site never says or implies that it doesn't** — team
instruction, 2026-08-16. Funding comes from sponsorship (the largest share) plus
the team's own fundraisers; say both, and never claim sponsors cover everything.
The mission paragraph is team-supplied and lives verbatim in `content/team.ts` —
do not reword it.

**Voice rules (team instruction, 2026-08-16).** Section titles state what the
section is, plainly — "Who we are", "Our robots", "Sponsorship tiers". No
constructed or clever headings ("Four founders, and everything they did before
this" was the example given). The word "honest" is banned sitewide; it reads as
AI. Captions only where they add something the page doesn't already say.

### Confirmed results

- **Champions — the largest FTC CAD competition held to date.** Team-confirmed.
  The event is **Chain Reaction** (the 2026 Unofficial FTC Discord CAD
  Competition), **July 2026**; the entry was **Ender**, submitted under the
  number **788**. Data lives in `content/achievements.ts`; the winning render is
  at `public/awards/ender-render.webp`. The field was **80+ team submissions**
  and Horizon ranked **1st** — team-confirmed 2026-08-16, which is what backs
  the word "largest", so both figures are now published.

**Aesthetic direction:** Polished & modern (team-specified). Precise, confident,
non-generic — must not look like a default Tailwind tutorial. Strong typographic
hierarchy, generous spacing, tasteful motion (subtle reveals, no gimmicks), fully
responsive.

- **Team colors (official, team-supplied):** sunrise palette — amber `#FFCB5C`,
  orange `#F86A43`, crimson `#B13848`, deep purple-black `#17061D`, black
  `#000000`. Tokenized in `tailwind.config.ts` (`brand` scale + `night` scale).
- **Brand assets (official, team-supplied):** in `public/brand/` — gradient and
  white variants of the sun-over-horizon logo, the square mark, and the arced
  wordmark. Square gradient mark doubles as the favicon (`app/icon.svg`). Use
  the gradient wordmark where it is the focal point (the hero) and the white one
  where it should recede (the footer); two gradient marks in one block read as a
  second logo moment rather than a sign-off.
- **Tagline (official, team-supplied):** "Building towards what's next."
- **Type (see `docs/UI_GUIDE.md` §2):** Jost for display and UI, Newsreader for
  every narrative paragraph, JetBrains Mono for figures. The serif prose is the
  deliberate anti-generic choice — it is what stops the pages reading as a
  product landing page.
- **Tone:** confident, welcoming, forward-looking (the name "Horizon" suggests
  looking ahead / new frontiers — lean into that visually).

## 4. Pages (information architecture)

> **CURRENT STATE — live, rebuilt from scratch 2026-08-16.** Coming-soon mode
> is gone: `lib/site.ts` no longer has a `comingSoon` flag, the parked
> `app/_*` folders are deleted, and every page below is a real route. The
> design system this was rebuilt against is `docs/UI_GUIDE.md`, which is
> binding — read it before adding any page or component.

Launch set, ordered by value:

1. **Home / landing** — Hero with team name, tagline, and a one-line pitch;
   primary CTAs ("Become a sponsor", "Join us"); quick glance at who Horizon is;
   season/robot teaser. The flagship page — highest design bar.
2. **Team / About** — Horizon's story, mission, members and mentors, subteams
   (build / programming / outreach). Serves judges and prospective members.
3. **Support us** (`/support`) — the pitch: the ask, the budget donut, what
   sponsorship reaches, the tier table, and the two ways to give. This is the
   page every "Sponsor Horizon" CTA points at, including the header button.
4. **Sponsors** (`/sponsors`) — the wall: who actually backs Horizon, grouped
   into bands, with what each of them gave. Split from the pitch on team
   instruction 2026-08-16, so a sponsor can be shown off without a reader
   having to walk through a funding ask to see them. Driven entirely by
   `currentSponsors` in `content/sponsors.ts`; the page falls back to a designed
   "no sponsors yet" panel if that array is emptied.
   - **Bands.** The four paid tiers (Bronze → Diamond), plus **Nonprofit
     Services** below Bronze for companies giving software free through a
     nonprofit programme. That band is recognition only — it is deliberately
     **not** a column in the tier table, because the team has not defined any
     benefits for it and inventing them is out of bounds.
   - Logos are inlined as single-colour paths in `components/SponsorLogo.tsx`
     so one wall can hold a wordmark and an app mark without looking like three
     websites. Each needs an `optical` multiplier — equal pixel heights do not
     read as equal weight. Original vectors are archived in `public/sponsors/`.
5. **Contact** (`/contact`) — one clear way to reach the team, framed for all
   three audiences (sponsor / join / community). The form POSTs to FormSubmit,
   which forwards to `site.formInbox`; if that request fails it falls back to a
   prefilled mail-client handoff so a message is never lost.

6. **Robots** (`/robots`) — the team's robots season by season, technical-binder
   style (inspired by team4414.com): each robot gets its own page with a main
   photo + design overview, and per-subsystem sub-pages
   (`/robots/<robot>/<subsystem>`). Content lives in `content/robots.ts` —
   structure shipped ahead of content; robot names, photos, and write-ups are
   `<!-- PLACEHOLDER -->` until the team supplies them.

### Icebox (not at launch)

- **Blog / Season updates**, **Outreach**, **Portfolio** — candidates for later.

## 5. Content rules

- Team facts (awards, events, sponsor names/logos, member names/photos) are never
  invented. Until the team supplies them, use clearly-marked placeholder content
  and list it in the PR body (per `CLAUDE.md`).
- Every page ships responsive and with real design attention — typography,
  spacing, motion. Design quality is a requirement, not polish.

## 6. Open questions (for the team)

Answered 2026-08-16 — mission paragraph (verbatim in `content/team.ts`), tagline
("Building towards what's next"), colors and wordmark, tiers, budget total,
impact figures, socials, and the fact that there are no signed sponsors yet.

Still outstanding. Each one is a marked placeholder in the code, and each has a
designed empty state on the live site rather than a gap:

| What                                | Where it goes                                            | Why it's blocked                                                                    |
| ----------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Founders group photo                | `public/team/founders.webp` (1600×1200+)                 | Not supplied                                                                        |
| Four member portraits               | `public/team/{levin,saket,nippurn,nico}.webp` (800×1000) | Not supplied                                                                        |
| Nippurn's and Nico's years in FIRST | `content/team.ts` → `foundingMembers` → `experience`     | Not supplied                                                                        |
| The mentor roster                   | `content/team.ts` → `mentors`                            | Three template entries are rendering on the live Team page until real people are in |
| BIOBUZZ robot photos + write-up     | `public/robots/biobuzz/`, `content/robots.ts`            | Robot still in production                                                           |
| Ender's design story and subsystems | `content/robots.ts` → `ender`                            | The team's to write                                                                 |
| A real form endpoint                | `components/ContactForm.tsx` → `FORM_ENDPOINT`           | No account set up; falls back to a prefilled mail-client handoff, which works today |
