import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/Section';
import { Prose, Mark } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { SponsorWall } from '@/components/SponsorWall';
import { ArrowRight } from '@/components/Icon';
import { currentSponsors } from '@/content/sponsors';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sponsors',
  description:
    'The companies and organizations backing Horizon, FTC Team 36596, and what each of them gave.',
};

export default function SponsorsPage() {
  const hasSponsors = currentSponsors.length > 0;

  return (
    <>
      <PageHeader
        eyebrow="Sponsors"
        title="Who backs Horizon"
        lead={
          <p>
            Horizon was founded this year, so this list is short and every name
            on it took a chance on a team with no season behind it. Each one is
            here because of something they actually gave us.
          </p>
        }
      >
        <div className="mt-9">
          <Link href="/support/" className="btn-primary">
            Become a sponsor
            <ArrowRight size={17} />
          </Link>
        </div>
      </PageHeader>

      <Section tone="sunk">
        {hasSponsors ? (
          <SponsorWall />
        ) : (
          <Reveal>
            <div className="card grain relative px-8 py-14 text-center sm:px-14 sm:py-16">
              <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-brand-300">
                Nobody yet
              </p>
              <h2 className="mx-auto mt-6 max-w-2xl text-[1.75rem] font-light leading-tight text-haze-50 sm:text-[2.125rem]">
                We have not signed a sponsor yet
              </h2>
              <Prose className="mx-auto mt-6 text-center">
                <p>
                  The first name that goes on this wall goes on the robot, the
                  pit, the merchandise, and every piece of media we put out for
                  the whole season — <Mark>and it gets to be first</Mark>.
                </p>
              </Prose>
            </div>
          </Reveal>
        )}
      </Section>

      {/* One route on from here, for the company that is still deciding. */}
      <Section glow>
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Join them</p>
          <h2 className="mt-5 text-display-sm font-light text-haze-50">
            There is room on this page
          </h2>
          <Prose className="mx-auto mt-6 text-center">
            <p>
              Sponsors get their logo on the robot, the pit, our merchandise,
              and every piece of media we put out for the season, plus a
              quarterly report on where the money went. The tiers, the budget,
              and the ways to give are all on the support page.
            </p>
          </Prose>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/support/" className="btn-primary">
              See what sponsorship gets you
              <ArrowRight size={17} />
            </Link>
            <Link href="/contact/" className="btn-ghost">
              Talk to us first
            </Link>
          </div>
          <p className="mt-8 font-mono text-[0.8125rem] text-haze-500">
            {site.businessEmail}
          </p>
        </Reveal>
      </Section>
    </>
  );
}
