// Central site metadata. Everything team-specific that isn't page content lives
// here so it can be edited in one place. Facts the team hasn't confirmed yet are
// marked PLACEHOLDER and should not be treated as real until verified.

export const site = {
  teamName: 'Horizon',
  teamNumber: 36596,
  program: 'FIRST Tech Challenge',
  /** Team-supplied. */
  tagline: 'Building towards what’s next',
  location: 'Portland, Oregon',
  foundedYear: 2026,

  /** Used for page metadata and link previews. */
  description:
    'Horizon is FTC Team 36596, a community nonprofit robotics team in Portland, Oregon, founded in 2026 by leaders from three existing FIRST Tech Challenge teams.',

  /** Sponsorship, partnerships, invoices. Published on the site. */
  businessEmail: 'business@horizon36596.org',

  /**
   * The contact form's real destination is horizon36596@gmail.com, but that
   * address is deliberately NOT in this file or anywhere else in the bundle —
   * it would ship to every scraper that loads the page. The form posts to a
   * FormSubmit alias instead; see components/ContactForm.tsx.
   */

  socials: [
    {
      label: 'Instagram',
      handle: '@horizon36596',
      href: 'https://www.instagram.com/horizon36596/',
    },
  ],

  /**
   * The sponsorship package, served straight out of /public so the URL is
   * permanent: https://horizon36596.org/sponsorship-package.pdf
   *
   * TO UPDATE IT: overwrite public/sponsorship-package.pdf with the new export
   * and keep the filename. The link never changes, so anything already sent to
   * a sponsor keeps working and starts serving the new version.
   */
  sponsorshipPackage: '/sponsorship-package.pdf',

  /** Online donation portal, run through the team's 501(c)(3) fiscal sponsor. */
  donateUrl: 'https://hcb.hackclub.com/donations/start/horizon-36596',
  fiscalSponsor: 'The Hack Foundation',

  /**
   * Site-wide banner above the header. Set to null to remove it — that is the
   * only edit needed, the bar and its spacing disappear with it.
   */
  announcement: 'This site is still under construction.',

  nav: [
    { href: '/team/', label: 'Team' },
    { href: '/robots/', label: 'Robots' },
    { href: '/sponsors/', label: 'Sponsors' },
    { href: '/contact/', label: 'Contact' },
  ],

  /** The one CTA that appears in the header on every page. */
  supportHref: '/support/',
} as const;

export type NavItem = (typeof site.nav)[number];
