// ---------------------------------------------------------------------------
// SPONSORSHIP — the ask, the budget, the tiers, and how to give.
//
// Sourced from the team's own sponsorship package. Two rules apply here harder
// than anywhere else on the site, because this page is read by people deciding
// whether to send money:
//
//   1. No invented figures, tier benefits, or sponsor names.
//   2. Anything only partially legible in the source document is flagged and
//      kept off the public page until the team confirms it (see `showAmounts`).
// ---------------------------------------------------------------------------

export const theAsk = [
  'Running an FTC team costs money, and it costs more for a new team trying to compete at the highest level of play from its first season. Registration, the field, the tools to make parts, and the parts themselves all have to be paid for before a robot exists to show anyone.',
  'We run our own fundraisers and cover part of the budget ourselves, but sponsorship is the largest share of it. Our money is managed by the students on the team, and we publish our spending to our sponsors in our quarterly newsletters. We appreciate support in the form of direct monetary funding, and in-kind support in the form of goods or services when applicable.',
];

// ---------------------------------------------------------------------------
// BUDGET
//
// Figures and segment colours are taken from the team's own budget chart,
// confirmed 2026-08-16. Categories are listed in the same clockwise order the
// chart uses, starting at twelve o'clock, so the donut on the site reads the
// same way the one in the sponsorship package does.
//
// Set `showAmounts` to false to hide the dollar figures and the donut, leaving
// only the total and the category list.
// ---------------------------------------------------------------------------
export const showAmounts = true;

export const budget = {
  totalLabel: '~$14,000',
  totalCaption: 'Team annual budget',
  categories: [
    {
      name: 'Marketing',
      amount: 750,
      color: '#9E2A42',
      note: 'Print, merchandise, and the pit',
    },
    {
      name: 'Registration',
      amount: 3100,
      color: '#F86A43',
      note: 'League play, qualifiers, and championship entry',
    },
    {
      name: 'Field',
      amount: 2000,
      color: '#FFCB5C',
      note: 'A full practice field to test and drive against',
    },
    {
      name: 'Robot parts',
      amount: 6500,
      color: '#C63C4E',
      note: 'Motors, structure, electronics, and spares',
    },
    {
      name: 'Logistics',
      amount: 750,
      color: '#FB6D45',
      note: 'Travel and getting a robot to competitions',
    },
    {
      name: 'Tools',
      amount: 1000,
      color: '#FFD87A',
      note: 'The shop equipment that makes parts possible',
    },
  ],
};

// ---------------------------------------------------------------------------
// IMPACT — who the money reaches beyond the students on the team.
// ---------------------------------------------------------------------------
export const impactIntro =
  'By sponsoring Horizon, you are first and foremost building the next generation of engineers and thinkers — the students on the team. Your support also allows us to be an ambassador for FIRST and spread robotics knowledge and awareness through a variety of mediums.';

export const impactAreas = [
  {
    title: 'Mentoring other teams',
    body: 'Horizon members share what we learn with seven other FTC teams, through in-person meetings and ongoing online support.',
  },
  {
    title: 'Corporate and collegiate connections',
    body: 'Our team connects with adults to share what we are doing in FIRST and learn from their experience. Our mentors include students at MIT and employees at Offset Robotics.',
  },
  {
    title: 'Public resources',
    body: 'Our members build and maintain resources for the whole community, including a Simplified Parts Library with more than 24,000 references and a configurable 3D printable spool with more than 1,300. Our own software library is in development now.',
  },
  {
    title: 'Social media',
    body: 'Our new team Instagram account reached over 2,000 unique visitors in less than a week. We are growing that presence to put our work in FIRST in front of a much larger audience.',
  },
];

// ---------------------------------------------------------------------------
// TIERS — verbatim from the sponsorship package. Do not add benefits.
// ---------------------------------------------------------------------------
export type TierValue = string | boolean | null;

export const tiers = [
  { name: 'Bronze', min: '$100+', accent: 'bronze' as const },
  { name: 'Silver', min: '$500+', accent: 'silver' as const },
  { name: 'Gold', min: '$1,000+', accent: 'gold' as const },
  { name: 'Diamond', min: '$2,500+', accent: 'diamond' as const },
];

/**
 * One row per benefit, values ordered Bronze → Silver → Gold → Diamond.
 * `true` renders a check, `null` renders a dash, a string renders as-is.
 */
export const tierBenefits: { label: string; values: TierValue[] }[] = [
  {
    label: 'Logo on merchandise, robot, website, social media, and team pit',
    values: ['Small', 'Medium', 'Medium', 'Large'],
  },
  { label: 'Quarterly newsletters', values: [true, true, true, true] },
  {
    label: 'Social media shoutout post',
    values: [null, 'Grouped', 'Individual', 'Individual'],
  },
  {
    label:
      'Permission to use team branding and pictures for promotional purposes',
    values: [null, true, true, true],
  },
  {
    label: 'Customizable paragraph on website',
    values: [null, null, true, true],
  },
  { label: 'Invitation to competitions', values: [null, null, true, true] },
  {
    label: 'Dedicated poster with customizable text at events and competitions',
    values: [null, null, null, true],
  },
  { label: 'Dedicated blog post or story', values: [null, null, null, true] },
];

// ---------------------------------------------------------------------------
// GIVING
// ---------------------------------------------------------------------------
export const donationMethods = [
  {
    title: 'Online',
    body: 'Give directly through our donation portal. Fastest route, and it issues a receipt automatically.',
    /** Set on the page from site.donateUrl. */
    isPrimary: true,
  },
  {
    title: 'By check',
    body: 'Make the check out to the Hack Foundation, with our team name in the memo line so it is routed to us.',
    isPrimary: false,
  },
];

export const taxNote =
  'All contributions are tax-deductible. Horizon operates under the Hack Foundation, a 501(c)(3) nonprofit organization, which is also our fiscal sponsor.';

export const customAskNote =
  'For a custom invoice, in-kind donations, or any other method of payment, contact us by email and we will sort it out with you directly.';

// ---------------------------------------------------------------------------
// WHO SUPPORTS HORIZON — the /sponsors page reads this file and nothing else.
//
// Same rule as everywhere: nothing here is added until it is real. `gave` is
// what the supporter actually provided, in their own terms, not a description
// of what it is worth.
// ---------------------------------------------------------------------------
import type { SponsorLogoKey } from '@/components/SponsorLogo';

/**
 * Companies that give the team software or tooling free through a nonprofit
 * programme rather than through a donation. Recognised on the Sponsors page as
 * its own band, below Bronze.
 */
export const NONPROFIT_TIER = 'Nonprofit Services';

export type SponsorTier =
  | (typeof tiers)[number]['name']
  | typeof NONPROFIT_TIER;

export type Sponsor = {
  name: string;
  tier: SponsorTier;
  /** Key into components/SponsorLogo.tsx. */
  logo?: SponsorLogoKey;
  href?: string;
  /** What they actually gave. Shown under the logo. */
  gave: string;
};

export const currentSponsors: Sponsor[] = [
  {
    name: 'Tektite',
    tier: 'Bronze',
    logo: 'tektite',
    href: 'https://tektitebiz.com/',
    gave: 'Charge 3B chargers',
  },
  {
    name: 'PTC',
    tier: 'Silver',
    logo: 'ptc',
    href: 'https://www.ptc.com/',
    gave: 'Monetary support',
  },
  {
    name: 'FRCTees',
    tier: 'Bronze',
    logo: 'frctees',
    href: 'https://frctees.com/',
    gave: 'Discounted merchandise',
  },
  {
    name: 'GitHub',
    tier: NONPROFIT_TIER,
    logo: 'github',
    href: 'https://github.com/',
    gave: 'Pro, free for nonprofits',
  },
  {
    name: 'Canva',
    tier: NONPROFIT_TIER,
    logo: 'canva',
    href: 'https://www.canva.com/',
    gave: 'Pro, free for nonprofits',
  },
];

/** Wall order: biggest band first, nonprofit services last. */
export const sponsorTierOrder: SponsorTier[] = [
  'Diamond',
  'Gold',
  'Silver',
  'Bronze',
  NONPROFIT_TIER,
];

export const nonprofitTierNote =
  'Companies that give Horizon their software free through a nonprofit programme. They are not donors, and we list them separately for that reason.';
