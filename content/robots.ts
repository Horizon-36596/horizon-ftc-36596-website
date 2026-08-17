// ---------------------------------------------------------------------------
// ROBOTS — the only file you edit to manage the Robots section.
//
// Each robot below gets a page at /robots/<slug>, and each of its subsystems
// gets a page at /robots/<slug>/<subsystem-slug>.
//
// HOW TO ADD CONTENT:
//   1. Drop images into  public/robots/<slug>/   (e.g. public/robots/ender/arm.webp)
//   2. Point `mainImage` / `image` at them       (e.g. '/robots/ender/arm.webp')
//   3. Write paragraphs as plain strings in the `description` arrays.
//      Each string = one paragraph on the page.
//
// Leave `mainImage`/`image` undefined and the page shows a branded
// "photo coming soon" panel instead of a broken image. Leave `description`
// empty and the page says the write-up is coming, rather than inventing one.
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
  /** Optional image path under /public — e.g. '/robots/ender/drivetrain.webp' */
  image?: string;
};

export type Robot = {
  /** URL part, lowercase, no spaces. */
  slug: string;
  /** Robot name. */
  name: string;
  /** Season or event label — e.g. 'BIOBUZZ · 2026–27'. */
  season: string;
  /** Used to sort the index page, newest first. */
  year: number;
  /** Where this robot stands right now. Drives the badge on the index card. */
  status: 'in-production' | 'complete';
  /** One-liner shown under the robot name. */
  tagline?: string;
  /** Main image path under /public. */
  mainImage?: string;
  /** True for renders (light background, mounted on a light plate). */
  mainImageIsRender?: boolean;
  /** Real pixel size of `mainImage`, so its space is reserved without a jump. */
  mainImageWidth?: number;
  mainImageHeight?: number;
  /** Paragraphs for the robot's page. Empty array = "description coming soon". */
  description: string[];
  subsystems: Subsystem[];
};

export const robots: Robot[] = [
  {
    slug: 'biobuzz',
    name: 'Our first competition robot',
    season: 'BIOBUZZ · 2026–27',
    year: 2027,
    status: 'in-production',
    tagline: 'In production through the summer and offseason.',
    mainImage: undefined,
    description: [
      // <!-- PLACEHOLDER: the BIOBUZZ robot is being built now. Add the design
      //      write-up, photos, and subsystem detail as they exist. Nothing about
      //      this robot should be described here before it is true. -->
    ],
    subsystems: [
      {
        slug: 'drivetrain',
        name: 'Drivetrain',
        summary: 'How the robot moves around the field.',
        description: [],
      },
      {
        slug: 'intake',
        name: 'Intake',
        summary: 'How the robot picks up game elements.',
        description: [],
      },
      {
        slug: 'scoring',
        name: 'Scoring',
        summary: 'How the robot scores.',
        description: [],
      },
      {
        slug: 'software',
        name: 'Software',
        summary: 'Autonomous, driver controls, and code architecture.',
        description: [],
      },
    ],
  },
  {
    slug: 'ender',
    name: 'Ender',
    season: 'Chain Reaction · July 2026',
    year: 2026,
    status: 'complete',
    tagline: 'First of 80+ submissions at Chain Reaction, entered as 788.',
    mainImage: '/awards/ender-render.webp',
    mainImageIsRender: true,
    mainImageWidth: 2048,
    mainImageHeight: 817,
    description: [
      'Ender is a CAD-only entry: a complete robot modeled in software and judged on the design itself, with no field to test it on and no driver to cover for it. Horizon entered it as 788 in Chain Reaction — the largest FTC CAD competition held to date, with more than 80 submissions — and ranked first.',
      // <!-- PLACEHOLDER: the team's own account of Ender's design decisions.
      //      One string per paragraph. -->
    ],
    subsystems: [
      // <!-- PLACEHOLDER: add Ender's subsystems and their write-ups when the
      //      team is ready to break the model down publicly. -->
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
