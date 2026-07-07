// Central site metadata. Everything team-specific that isn't page content lives
// here so it can be edited in one place. Facts the team hasn't confirmed yet are
// marked PLACEHOLDER and should not be treated as real until verified.

export const site = {
  teamName: 'Horizon',
  teamNumber: 36596,
  program: 'FIRST Tech Challenge',
  // <!-- PLACEHOLDER: confirm official tagline -->
  tagline: 'Building toward what’s next.',
  // <!-- PLACEHOLDER: confirm team mission / one-liner -->
  description:
    'Horizon is FTC Team 36596 — a robotics team engineering competitive robots and reaching outward to grow STEM in our community.',
  // <!-- PLACEHOLDER: real contact email -->
  contactEmail: 'team@example.com',
  nav: [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/sponsors', label: 'Sponsors' },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
