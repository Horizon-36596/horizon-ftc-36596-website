// ---------------------------------------------------------------------------
// TEAM — mission, the people, and the mentors.
//
// Every fact here comes from the team. Nothing is invented. Where the team has
// not supplied something yet (a member's years in FIRST, the mentor roster) the
// field is left empty or clearly marked, and the page shows a designed
// placeholder rather than a plausible-sounding guess.
// ---------------------------------------------------------------------------

/** The mission paragraph, supplied verbatim by the team. Do not reword. */
export const mission =
  'We are Horizon (FTC 36596), a dedicated group of high school students based in Oregon that seeks to become the best in the robotics program named the FIRST Tech Challenge (FTC). Originally founded in 2026 by leaders from three existing teams, our community, nonprofit team seeks to combine experience from some of the most dedicated students in the world to learn new skills, spread knowledge, and create excellence in everything we do.';

export type Member = {
  name: string;
  /** What they work on. Team-confirmed 2026-08-16. */
  role: string;
  /** The FTC team they came from, if there is one. */
  formerTeam?: string;
  /** Experience, stated as a year count — e.g. 'Sixth year in FIRST'. */
  experience?: string;
  /**
   * Portrait under /public/team/. Leave undefined and the card shows a branded
   * placeholder sized 800×1000 rather than a broken image.
   */
  photo?: string;
};

export const foundingMembers: Member[] = [
  {
    name: 'Levin',
    role: 'Design / Build / Programming',
    formerTeam: 'FTC 12808',
    experience: 'Third year in FIRST',
    // photo: '/team/levin.webp',
  },
  {
    name: 'Saket',
    role: 'Design / Programming / Business',
    formerTeam: 'FTC 23511',
    experience: 'Sixth year in FIRST',
    // photo: '/team/saket.webp',
  },
  {
    name: 'Nippurn',
    role: 'Design / Build / Business',
    formerTeam: 'FTC 32154',
    // <!-- PLACEHOLDER: Nippurn's years in FIRST. Add e.g. 'Fourth year in FIRST'. -->
    // photo: '/team/nippurn.webp',
  },
  {
    name: 'Nico',
    role: 'Design / Build',
    // <!-- PLACEHOLDER: Nico's prior FTC team and years in FIRST. -->
    // photo: '/team/nico.webp',
  },
];

/**
 * Shown on the Team page. This is a real, current position: the team is
 * actively recruiting through the summer and offseason.
 */
export const recruiting = {
  heading: 'Join the team',
  body: 'We are looking for high school students in the Portland area who are dedicated and willing to learn. Prior experience helps, but it is not required.',
};

// ---------------------------------------------------------------------------
// MENTORS
//
// <!-- PLACEHOLDER: the mentor roster is not filled in yet. Each entry needs a
//      photo at /public/team/mentors/<name>.webp, a real name, their real-world
//      job title, and a short line (3–10 words) on what they mentor Horizon on.
//      The three entries below are a visible template so the shape is obvious —
//      replace them with real people before this site goes public. -->
// ---------------------------------------------------------------------------
export type Mentor = {
  name: string;
  /** Their actual job title and employer or school. */
  title: string;
  /** 3–10 words on what they mentor the team on. */
  mentorsOn: string;
  /** Photo under /public/team/mentors/. */
  photo?: string;
};

export const mentors: Mentor[] = [
  {
    name: 'Mentor name',
    title: 'Their real-world title',
    mentorsOn: 'What they mentor us on',
  },
  {
    name: 'Mentor name',
    title: 'Their real-world title',
    mentorsOn: 'What they mentor us on',
  },
  {
    name: 'Mentor name',
    title: 'Their real-world title',
    mentorsOn: 'What they mentor us on',
  },
];

/**
 * Facts about the FIRST Tech Challenge itself, for readers who have never heard
 * of it. Figures are FIRST's own published numbers for the 2024–25 season, as
 * cited in the team's sponsorship package.
 */
export const aboutFtc = {
  season: '2024–25 season',
  stats: [
    { figure: '100,000+', label: 'students competing worldwide' },
    { figure: '8,000+', label: 'teams across the program' },
  ],
  body: 'The FIRST Tech Challenge is a robotics competition for middle and high school students, run by FIRST, the largest nonprofit robotics organization in the world. Every season a new game is announced, and every team gets the same few months to design, build, program, and campaign a robot for it. Students come out the other side with mechanical, software, and nontechnical skills that the program is quite deliberately trying to send into the next generation of engineers.',
  href: 'https://www.firstinspires.org/robotics/ftc',
  /**
   * Event photography supplied by the team. These are FIRST Championship
   * scenes, not Horizon's own competitions — the captions say so.
   */
  photos: [
    {
      src: '/ftc/pit-hall.webp',
      alt: 'The pit and exhibition hall at the FIRST Championship, crowded with teams and sponsor booths',
      width: 1600,
      height: 1067,
    },
    {
      src: '/ftc/field.webp',
      alt: 'A FIRST Tech Challenge match in progress at the FIRST Championship, drivers at the field with the score on the screen',
      width: 1200,
      height: 800,
    },
  ],
  photoCaption: 'Photos from the FIRST Championship.',
};
