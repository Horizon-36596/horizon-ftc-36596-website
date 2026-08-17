import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { BudgetBreakdown } from '@/components/BudgetBreakdown';
import { TierTable } from '@/components/TierTable';
import { ArrowUpRight, Mail } from '@/components/Icon';
import {
  customAskNote,
  impactAreas,
  impactIntro,
  taxNote,
  theAsk,
} from '@/content/sponsors';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Support us',
  description:
    'Why support Horizon, what a season costs, what your support reaches, our sponsorship tiers, and how to give. All contributions are tax-deductible.',
};

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Support us"
        title="Sponsor Horizon"
        lead={
          <p>
            We run our own fundraisers, but sponsorship covers the largest share
            of what a season costs. Everything we build is paid for by people
            who decided a rookie team was worth backing before it had anything
            to show them.
          </p>
        }
      >
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={site.donateUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Donate now
            <ArrowUpRight size={17} />
          </a>
          <Link href="#tiers" className="btn-ghost">
            See the tiers
          </Link>
        </div>
      </PageHeader>

      {/* The ask, and where the money goes. */}
      <Section tone="sunk">
        <SectionHeading
          eyebrow="The ask"
          title="What a season actually costs"
          intro={
            <>
              {theAsk.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="[&+p]:mt-5">
                  {paragraph}
                </p>
              ))}
            </>
          }
        />

        <Reveal delay={100} className="mt-16">
          <BudgetBreakdown />
        </Reveal>
      </Section>

      {/* Impact. */}
      <Section>
        <SectionHeading
          eyebrow="Impact"
          title="Who your support reaches"
          intro={<p>{impactIntro}</p>}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-night-700/70 bg-night-700/70 sm:grid-cols-2">
          {impactAreas.map((area, i) => (
            <Reveal
              key={area.title}
              delay={i * 70}
              className="bg-night-850 p-8"
            >
              <h3 className="text-[1.1875rem] font-normal text-haze-50">
                {area.title}
              </h3>
              <p className="mt-3 font-prose text-[1rem] leading-[1.7] text-haze-300">
                {area.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Tiers. */}
      <Section id="tiers" tone="sunk" className="scroll-mt-16">
        <SectionHeading
          eyebrow="Tiers"
          title="Sponsorship tiers"
          intro={
            <p>
              We built these tiers to thank our sponsors properly rather than to
              list the minimum we could get away with. If you want something on
              this table that is not offered at your level, ask — we would
              rather have the conversation than lose you over a line item.
            </p>
          }
        />

        <Reveal delay={100} className="mt-14">
          <TierTable />
        </Reveal>

        <Reveal delay={140}>
          <p className="mt-8 max-w-[var(--measure)] font-prose text-[1rem] leading-relaxed text-haze-400">
            Companies that give Horizon software or tooling free through a
            nonprofit programme are recognised too, in their own band on the{' '}
            <Link
              href="/sponsors/"
              className="text-brand-300 underline decoration-brand-500/40 underline-offset-4 transition-colors hover:decoration-brand-500"
            >
              sponsors page
            </Link>
            .
          </p>
        </Reveal>
      </Section>

      {/* Giving. */}
      <Section id="give" glow className="scroll-mt-16">
        <SectionHeading
          eyebrow="Give"
          title="Two ways to donate"
          intro={<p>{taxNote}</p>}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal className="card grain relative flex flex-col p-8 sm:p-10">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-brand-300">
              Online
            </p>
            <h3 className="mt-4 text-[1.375rem] font-light text-haze-50">
              Through our donation portal
            </h3>
            <p className="mt-4 flex-1 font-prose text-[1rem] leading-[1.7] text-haze-300">
              The fastest route. It runs through our fiscal sponsor,{' '}
              {site.fiscalSponsor}, and issues a receipt automatically.
            </p>
            <a
              href={site.donateUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8 self-start"
            >
              Donate now
              <ArrowUpRight size={17} />
            </a>
          </Reveal>

          <Reveal delay={80} className="card flex flex-col p-8 sm:p-10">
            <p className="font-mono text-[0.75rem] uppercase tracking-[0.16em] text-haze-400">
              By check
            </p>
            <h3 className="mt-4 text-[1.375rem] font-light text-haze-50">
              Made out to {site.fiscalSponsor}
            </h3>
            <p className="mt-4 flex-1 font-prose text-[1rem] leading-[1.7] text-haze-300">
              Write the check to{' '}
              <span className="text-haze-100">{site.fiscalSponsor}</span> and
              put{' '}
              <span className="text-haze-100">
                Horizon FTC {site.teamNumber}
              </span>{' '}
              in the memo line, so it is routed to our team rather than the
              foundation’s general fund.
            </p>
            <dl className="mt-8 space-y-2 border-t border-night-700/70 pt-6 text-[0.875rem]">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-haze-500">Pay to</dt>
                <dd className="font-mono text-haze-200">
                  {site.fiscalSponsor}
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-haze-500">Memo</dt>
                <dd className="font-mono text-haze-200">
                  For Horizon FTC {site.teamNumber}
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 flex flex-col gap-5 border-t border-night-700/70 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-prose text-[1.0625rem] leading-relaxed text-haze-300">
              {customAskNote}
            </p>
            <a
              href={`mailto:${site.businessEmail}`}
              className="btn-ghost shrink-0"
            >
              <Mail size={17} />
              {site.businessEmail}
            </a>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
