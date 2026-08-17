import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Section, SectionHeading } from '@/components/Section';
import { Prose, Mark } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { PhotoStack } from '@/components/PhotoStack';
import { SponsorStrip } from '@/components/SponsorWall';
import { ArrowRight, ArrowUpRight, Trophy } from '@/components/Icon';
import { cadChampionship as cad } from '@/content/achievements';
import { aboutFtc, foundingMembers, mission } from '@/content/team';
import { impactAreas } from '@/content/sponsors';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Who is already behind the team, before anything is asked of the
          reader. A thin band rather than a section, so it reads as a credit
          line under the hero and not as a pitch. */}
      <section className="border-y border-night-700/50 bg-night-925/60 py-10">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-7">Supported by</p>
            <SponsorStrip />
          </Reveal>
        </div>
      </section>

      {/* Who we are. The mission paragraph is the team's own words, verbatim. */}
      <Section tone="sunk">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <SectionHeading eyebrow="About us" title="Who we are" />
            <Reveal delay={80}>
              <Prose className="mt-8" lead>
                <p>{mission}</p>
              </Prose>
              <Link href="/team/" className="btn-link group mt-8">
                Read the full story
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:pt-10">
            <Frame
              alt="Horizon's founding members: Levin, Saket, Nippurn, and Nico"
              aspect="aspect-[4/3]"
              slot="public/team/founders.webp"
              hint="1600 × 1200 or larger"
            />
            <p className="mt-4 font-prose text-[0.9375rem] italic leading-relaxed text-haze-400">
              Our founding members: Levin, Saket, Nippurn, and Nico.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* The win. The only real photography the team has, so it gets the space. */}
      <Section glow>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-500/10 px-3.5 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-brand-300">
                <Trophy size={15} />
                {cad.result}
              </p>
              <h2 className="mt-6 text-display-sm font-light text-haze-50">
                {cad.headline}
              </h2>
            </Reveal>

            <Reveal delay={80}>
              <Prose className="mt-6">
                <p>
                  Horizon won <Mark>{cad.competitionName}</Mark> in {cad.date},
                  the summer the team was founded. The entry was{' '}
                  <Mark tone="orange">{cad.robotName}</Mark> — a complete robot
                  modeled in software and judged on the design alone, with no
                  field to test it on and no driver to cover for it.
                </p>
              </Prose>

              {/* The two figures that back the claim in the heading. */}
              {cad.rank && cad.fieldCount ? (
                <dl className="mt-8 flex flex-wrap items-start gap-x-12 gap-y-6">
                  <div className="flex flex-col-reverse">
                    <dt className="mt-2 text-[0.875rem] text-haze-400">
                      where we placed
                    </dt>
                    <dd className="tabular font-mono text-4xl leading-none text-brand-300">
                      {cad.rank}
                    </dd>
                  </div>
                  <div className="flex flex-col-reverse">
                    <dt className="mt-2 text-[0.875rem] text-haze-400">
                      team submissions in the field
                    </dt>
                    <dd className="tabular font-mono text-4xl leading-none text-brand-300">
                      {cad.fieldCount}
                    </dd>
                  </div>
                </dl>
              ) : null}

              <Link href="/robots/ender/" className="btn-link group mt-8">
                See the entry
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
                />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <Frame
              src={cad.image}
              alt={cad.imageAlt}
              isRender
              width={cad.imageWidth}
              height={cad.imageHeight}
            />
            <p className="mt-4 font-prose text-[0.9375rem] italic leading-relaxed text-haze-400">
              {cad.robotName}, as entered. Horizon competed as{' '}
              <span className="font-mono not-italic text-haze-300">
                {cad.competedAs}
              </span>{' '}
              here, which is the number on the side panel.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What the founders bring. Credibility, in the sponsors' terms. */}
      <Section tone="sunk">
        <SectionHeading
          eyebrow="Our founders"
          title="Who started Horizon"
          intro={
            <p>
              Horizon is a rookie team. The people in it are not. Between the
              four founders there is a World Championship division finalist, a
              robot that finished fourth in the world by OPR, an Inspire award,
              and the two most referenced FTC robots on Onshape.
            </p>
          }
        />

        <ul className="mt-14 divide-y divide-night-700/70 border-y border-night-700/70">
          {foundingMembers.map((member, i) => (
            <Reveal as="li" key={member.name} delay={i * 70}>
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 py-6">
                <h3 className="min-w-[8rem] text-[1.375rem] font-light text-haze-50">
                  {member.name}
                </h3>
                <p className="flex-1 text-[0.9375rem] text-haze-300">
                  {member.role}
                </p>
                {member.experience ? (
                  <p className="font-mono text-[0.8125rem] text-haze-500">
                    {member.experience}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* For anyone who has never heard of FTC. */}
      <Section id="ftc" className="scroll-mt-16">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="The program"
              title={
                <>
                  What the <em className="not-italic text-brand-300">FIRST</em>{' '}
                  Tech Challenge is
                </>
              }
            />
            <Reveal delay={80}>
              <Prose className="mt-8">
                <p>{aboutFtc.body}</p>
              </Prose>

              {/* Reversed so the figure reads first while the markup keeps
                  term-then-description order. */}
              <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-6 border-t border-night-700/70 pt-8">
                {aboutFtc.stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-[0.875rem] text-haze-400">
                      {stat.label}
                    </dt>
                    <dd className="tabular font-mono text-3xl leading-none text-brand-300">
                      {stat.figure}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-haze-500">
                {aboutFtc.season}
              </p>

              <a
                href={aboutFtc.href}
                target="_blank"
                rel="noreferrer"
                className="btn-link group mt-8"
              >
                firstinspires.org
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </Reveal>
          </div>

          <Reveal delay={140}>
            <PhotoStack photos={aboutFtc.photos} />
            <p className="mt-2 font-prose text-[0.9375rem] italic leading-relaxed text-haze-400">
              {aboutFtc.photoCaption}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* What sponsorship reaches. Text-led, no icon-card grid. */}
      <Section tone="sunk">
        <SectionHeading
          eyebrow="Reach"
          title="What your support reaches"
          intro={
            <p>
              Sponsoring Horizon funds a team and a robot. It also funds
              everything those students give away — and this is a team of people
              who have been giving their work away for years.
            </p>
          }
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

      {/* Closing. One primary action. */}
      <Section glow className="border-t border-night-700/50">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Support the team</p>
          <h2 className="mt-5 text-display-sm font-light text-haze-50">
            Why sponsor Horizon
          </h2>
          <Prose className="mx-auto mt-6 text-center">
            <p>
              We run our own fundraisers, but sponsorship covers the largest
              share of what a season costs — the parts, the registrations, and
              getting a robot to competitions. If your company or organization
              wants to put its name on a team that is going to be worth
              watching, we would like to talk.
            </p>
          </Prose>
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link href="/support/" className="btn-primary">
              Sponsor Horizon
              <ArrowRight size={17} />
            </Link>
            <Link href="/contact/" className="btn-ghost">
              Get in touch
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
