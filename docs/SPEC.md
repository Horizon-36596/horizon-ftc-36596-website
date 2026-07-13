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

<!-- PLACEHOLDER: team origin story + one-line mission. Awaiting team input. -->

**Aesthetic direction:** Polished & modern (team-specified). Precise, confident,
non-generic — must not look like a default Tailwind tutorial. Strong typographic
hierarchy, generous spacing, tasteful motion (subtle reveals, no gimmicks), fully
responsive.

- **Team colors (official, team-supplied):** sunrise palette — amber `#FFCB5C`,
  orange `#F86A43`, crimson `#B13848`, deep purple-black `#17061D`, black
  `#000000`. Tokenized in `tailwind.config.ts` (`brand` scale + `night` scale).
- **Brand assets (official, team-supplied):** in `public/brand/` — gradient and
  white variants of the sun-over-horizon logo and square mark, plus the arced
  gradient wordmark. Square gradient mark doubles as the favicon (`app/icon.svg`).
- **Tagline:** <!-- PLACEHOLDER: awaiting team tagline -->
- **Tone:** confident, welcoming, forward-looking (the name "Horizon" suggests
  looking ahead / new frontiers — lean into that visually).

## 4. Pages (information architecture)

Launch set, ordered by value:

1. **Home / landing** — Hero with team name, tagline, and a one-line pitch;
   primary CTAs ("Become a sponsor", "Join us"); quick glance at who Horizon is;
   season/robot teaser. The flagship page — highest design bar.
2. **Team / About** — Horizon's story, mission, members and mentors, subteams
   (build / programming / outreach). Serves judges and prospective members.
3. **Sponsors + Contact** — Why sponsor Horizon, sponsor tiers/logos, and a clear
   way to reach the team (email/form). Serves sponsors; also the "join us"
   endpoint for prospective members.

4. **Robots** (`/robots`) — the team's robots season by season, technical-binder
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

- Team story / mission statement.
- Team colors and any logo/wordmark.
- Tagline.
- Member/mentor list and photos.
- Sponsor list (existing sponsors, tiers).
- Include a Robot page at launch, or keep deferred?
