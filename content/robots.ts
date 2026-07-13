// ---------------------------------------------------------------------------
// PAST ROBOTS — the only file you edit to manage the Robots section.
//
// Each robot in the list below gets its own page at /robots/<slug>, and each
// of its subsystems gets a page at /robots/<slug>/<subsystem-slug>.
//
// HOW TO ADD CONTENT:
//   1. Drop images into  public/robots/<slug>/   (e.g. public/robots/2026/main.jpg)
//   2. Point `mainImage` / `image` at them       (e.g. '/robots/2026/main.jpg')
//   3. Write paragraphs as plain strings in the `description` arrays.
//      Each string = one paragraph on the page.
//
// Leave `mainImage`/`image` undefined and the page shows a tasteful
// "photo coming soon" placeholder instead of a broken image.
// ---------------------------------------------------------------------------

export type Subsystem = {
  /** URL part, lowercase, no spaces — e.g. 'drivetrain' */
  slug: string;
  /** Display name — e.g. 'Drivetrain' */
  name: string;
  /** One-line summary shown on the robot page's subsystem cards. */
  summary: string;
  /** Paragraphs for the subsystem's own page. Empty array = "write-up coming soon". */
  description: string[];
  /** Optional image path under /public — e.g. '/robots/2026/drivetrain.jpg' */
  image?: string;
};

export type Robot = {
  /** URL part, lowercase, no spaces — e.g. '2026' or 'robot-name' */
  slug: string;
  /** Robot name. */
  name: string;
  /** Season label — e.g. 'DECODE · 2025–26'. */
  season: string;
  /** Used to sort the index page, newest first. */
  year: number;
  /** Optional one-liner shown under the robot name. */
  tagline?: string;
  /** Main photo path under /public — e.g. '/robots/2026/main.jpg' */
  mainImage?: string;
  /** Paragraphs for the robot's page. Empty array = "description coming soon". */
  description: string[];
  subsystems: Subsystem[];
};

export const robots: Robot[] = [
  // <!-- PLACEHOLDER: everything below is template scaffolding, not real team
  //      facts. Rename the robot, season, and subsystems to match reality. -->
  {
    slug: '2026',
    name: 'Robot One', // <!-- PLACEHOLDER: real robot name -->
    season: 'DECODE · 2025–26', // <!-- PLACEHOLDER: confirm season label -->
    year: 2026,
    tagline: undefined, // e.g. 'Our first competition robot.'
    mainImage: undefined, // e.g. '/robots/2026/main.jpg'
    description: [
      // Add paragraphs here, one string per paragraph:
      // 'Robot One was designed around a fast, reliable intake...',
    ],
    subsystems: [
      {
        slug: 'drivetrain',
        name: 'Drivetrain',
        summary: 'How the robot moves around the field.',
        description: [],
        image: undefined,
      },
      {
        slug: 'intake',
        name: 'Intake',
        summary: 'How the robot picks up game elements.',
        description: [],
        image: undefined,
      },
      {
        slug: 'scoring',
        name: 'Scoring',
        summary: 'How the robot scores.',
        description: [],
        image: undefined,
      },
      {
        slug: 'software',
        name: 'Software',
        summary: 'Autonomous, controls, and code architecture.',
        description: [],
        image: undefined,
      },
    ],
  },
];

/** Robots newest-first for the index page. */
export const robotsByYear = [...robots].sort((a, b) => b.year - a.year);

export function getRobot(slug: string): Robot | undefined {
  return robots.find((r) => r.slug === slug);
}

export function getSubsystem(
  robotSlug: string,
  subsystemSlug: string,
): { robot: Robot; subsystem: Subsystem } | undefined {
  const robot = getRobot(robotSlug);
  const subsystem = robot?.subsystems.find((s) => s.slug === subsystemSlug);
  return robot && subsystem ? { robot, subsystem } : undefined;
}
