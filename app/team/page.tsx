import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/Section';
import { Prose } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { Avatar } from '@/components/Avatar';
import { ArrowRight, ArrowUpRight } from '@/components/Icon';
import { foundingMembers, mentors, mission, recruiting } from '@/content/team';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Horizon was founded in 2026 by captains and leads from three existing FIRST Tech Challenge teams. Our mission, our founding members, our mentors, and how to join.',
};

// People are listed as rows — a small circular portrait beside the text, not a
// portrait card above it. The photos the team can get are low resolution, and
// the row keeps them at a size where that does not show while giving the words
// the room they actually need.
const ROW =
  'flex items-start gap-5 bg-night-850 p-6 transition-colors duration-300 sm:p-7';

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="The team"
        title="About Horizon"
        lead={<p>{mission}</p>}
      />

      {/* The founders, with the group photo above them. */}
      <Section tone="sunk">
        <Reveal>
          <Frame
            alt="Horizon's founding members: Levin, Saket, Nippurn, and Nico"
            aspect="aspect-[16/9]"
            slot="public/team/founders.webp"
            hint="1600 × 900 or larger"
          />
        </Reveal>

        <SectionHeading
          className="mt-16"
          eyebrow="Founding members"
          title="Who is on the team"
        />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-night-700/70 bg-night-700/70 sm:grid-cols-2">
          {foundingMembers.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 70}>
              <div className={`${ROW} h-full`}>
                <Avatar src={member.photo} name={member.name} size={72} />

                <div className="min-w-0">
                  <h3 className="text-[1.25rem] font-light leading-tight text-haze-50">
                    {member.name}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] text-brand-300">
                    {member.role}
                  </p>
                  <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-haze-500">
                    {member.experience ?? 'Years in FIRST coming soon'}
                    {member.formerTeam ? (
                      <span className="block">
                        formerly {member.formerTeam}
                      </span>
                    ) : null}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Joining. Two lines and one action — the roster is not closed. */}
      <Section glow>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div>
            <SectionHeading eyebrow="Recruiting" title={recruiting.heading} />
            <Reveal delay={80}>
              <Prose className="mt-6">
                <p>{recruiting.body}</p>
              </Prose>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <Link href="/contact/" className="btn-primary">
              Talk to us about joining
              <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </Section>

      {/* Mentors. */}
      <Section tone="sunk">
        <SectionHeading eyebrow="Mentors" title="Who we learn from" />

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-night-700/70 bg-night-700/70 sm:grid-cols-2">
          {mentors.map((mentor, i) => (
            <Reveal as="li" key={mentor.name} delay={i * 70}>
              <div className={`${ROW} h-full`}>
                <Avatar src={mentor.photo} name={mentor.name} size={72} />

                <div className="min-w-0">
                  <h3 className="text-[1.25rem] font-light leading-tight text-haze-50">
                    {mentor.name}
                  </h3>

                  {mentor.href ? (
                    <a
                      href={mentor.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-1.5 inline-flex items-center gap-1 text-[0.9375rem] text-brand-300 transition-colors hover:text-brand-400"
                    >
                      {mentor.title}
                      <ArrowUpRight
                        size={13}
                        className="shrink-0 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  ) : (
                    <p className="mt-1.5 text-[0.9375rem] text-brand-300">
                      {mentor.title}
                    </p>
                  )}

                  {/* Background and honour share one block in one weight.
                      Every mentor is listed as an equal — a highlighted badge
                      on one of them reads as a ranking. */}
                  {mentor.background || mentor.honour ? (
                    <p className="mt-2 font-mono text-[0.8125rem] leading-relaxed text-haze-500">
                      {mentor.background}
                      {mentor.honour ? (
                        <span className="block">{mentor.honour}</span>
                      ) : null}
                    </p>
                  ) : null}

                  <p className="mt-3 font-prose text-[0.9375rem] leading-snug text-haze-300">
                    {mentor.mentorsOn}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
