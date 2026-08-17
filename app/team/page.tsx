import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/Section';
import { Prose } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { ArrowRight } from '@/components/Icon';
import { foundingMembers, mentors, mission, recruiting } from '@/content/team';

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Horizon was founded in 2026 by captains and leads from three existing FIRST Tech Challenge teams. Our mission, our founding members, our mentors, and how to join.',
};

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

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {foundingMembers.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 80}>
              <Frame
                src={member.photo}
                alt={`${member.name}, a founding member of Horizon`}
                aspect="aspect-[4/5]"
                slot={`public/team/${member.name.toLowerCase()}.webp`}
                hint="800 × 1000"
              />

              <h3 className="mt-5 text-[1.375rem] font-light text-haze-50">
                {member.name}
              </h3>
              <p className="mt-1 text-[0.9375rem] text-brand-300">
                {member.role}
              </p>
              <p className="mt-2 font-mono text-[0.8125rem] text-haze-500">
                {member.experience ?? 'Years in FIRST coming soon'}
                {member.formerTeam ? (
                  <span className="block">formerly {member.formerTeam}</span>
                ) : null}
              </p>
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

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {mentors.map((mentor, i) => (
            <Reveal as="li" key={`${mentor.name}-${i}`} delay={i * 80}>
              <Frame
                src={mentor.photo}
                alt={mentor.photo ? `${mentor.name}, ${mentor.title}` : ''}
                aspect="aspect-[4/5]"
                slot="public/team/mentors/"
                hint="800 × 1000"
              />

              <h3 className="mt-5 text-[1.375rem] font-light text-haze-50">
                {mentor.name}
              </h3>
              <p className="mt-1 text-[0.9375rem] text-brand-300">
                {mentor.title}
              </p>
              <p className="mt-2 font-prose text-[0.9375rem] leading-snug text-haze-300">
                {mentor.mentorsOn}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
