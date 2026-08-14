// Central site metadata. Everything team-specific that isn't page content lives
// here so it can be edited in one place. Facts the team hasn't confirmed yet are
// marked PLACEHOLDER and should not be treated as real until verified.

// ---------------------------------------------------------------------------
// COMING-SOON MODE
//
// While true, the site serves a single holding page: logo, team number, and a
// short message. Nothing else is reachable.
//
// TO BRING THE FULL SITE BACK:
//   1. Set `comingSoon` to false below.
//   2. Rename the parked route folders to drop the leading underscore:
//        app/_team -> app/team          app/_robots  -> app/robots
//        app/_sponsors -> app/sponsors  app/_contact -> app/contact
//      (A leading underscore is how Next.js keeps a folder out of routing, so
//      the pages are intact and un-routed — nothing was deleted.)
//
// Every page, the branding, the Ender render, and the Robots section are all
// still in the repo exactly as they were.
// ---------------------------------------------------------------------------
export const comingSoon = true;

/** The season the site is being rebuilt for. Shown on the holding page. */
export const upcomingSeason = 'BIOBUZZ';

export const site = {
  teamName: 'Horizon',
  teamNumber: 36596,
  program: 'FIRST Tech Challenge',
  // <!-- PLACEHOLDER: confirm official tagline -->
  tagline: 'Building toward what’s next.',
  // <!-- PLACEHOLDER: confirm team mission / one-liner -->
  description:
    'Horizon is FTC Team 36596 — a robotics team engineering competitive robots and reaching outward to grow STEM in our community.',
  contactEmail: 'horizon36596@gmail.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/robots', label: 'Robots' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/contact', label: 'Contact' },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
