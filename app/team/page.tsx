import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { RenderPlate } from '@/components/RenderPlate';
import { cadChampionship } from '@/content/achievements';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Team',
  description: `About ${site.teamName}, ${site.program} Team ${site.teamNumber} — a new team, and what we've done so far.`,
};

const subteams = [
  {
    name: 'Build',
    body: 'Mechanical design, CAD, and fabrication.',
  },
  {
    name: 'Programming',
    body: 'Autonomous, controls, and software.',
  },
  {
    name: 'Outreach',
    body: 'Community, sponsors, and STEM advocacy.',
  },
];

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="The team"
        intro="A new team, building in the open. Here's where we came from and what we've done so far."
      />

      {/* ------------------------------------------------------------------ */}
      {/* Origin story. Honest about being new — no borrowed history.        */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-page py-16">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Our story
          </h2>
          <div className="mt-6 space-y-4 text-lg text-slate-300">
            <p>
              Horizon is new. Team {site.teamNumber} is early in its first
              chapter, and we&rsquo;re not going to dress that up — there is no
              decade of history behind us and no trophy case built by people who
              graduated before we arrived.
            </p>
            <p>
              What being new actually means: every process here is one we chose,
              every decision on the robot is one we can explain, and nothing on
              this site was inherited. We&rsquo;d rather earn a short record
              honestly than borrow a long one.
            </p>
            {/* PLACEHOLDER: the team's real founding story — who started Horizon,
                when, and why. Replace the paragraph below once confirmed. */}
            <p className="text-slate-400">
              The full founding story — who started Horizon, when, and what
              we&rsquo;re setting out to build — goes here.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Honours — currently one real result, featured properly rather than */}
      {/* padded out into a list.                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container-page py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Honours
            </h2>
            <p className="text-sm text-slate-500">
              Short list, for now. Everything on it is ours.
            </p>
          </div>

          <div className="mt-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-semibold text-brand-300">
                ✦ {cadChampionship.result}
              </span>
              <h3 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {cadChampionship.headline}
              </h3>

              {/* Details render only once the team confirms them. */}
              {cadChampionship.competitionName ||
              cadChampionship.date ||
              cadChampionship.fieldSize ? (
                <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm">
                  {cadChampionship.competitionName ? (
                    <div>
                      <dt className="text-slate-500">Competition</dt>
                      <dd className="mt-1 font-medium text-slate-200">
                        {cadChampionship.competitionName}
                      </dd>
                    </div>
                  ) : null}
                  {cadChampionship.date ? (
                    <div>
                      <dt className="text-slate-500">Held</dt>
                      <dd className="mt-1 font-medium text-slate-200">
                        {cadChampionship.date}
                      </dd>
                    </div>
                  ) : null}
                  {cadChampionship.fieldSize ? (
                    <div>
                      <dt className="text-slate-500">Field</dt>
                      <dd className="mt-1 font-medium text-slate-200">
                        {cadChampionship.fieldSize}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              ) : null}

              {cadChampionship.description.length > 0 ? (
                <div className="mt-6 space-y-4 text-slate-300">
                  {cadChampionship.description.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <p className="mt-6 text-slate-400">
                  Meet {cadChampionship.robotName}. A design that had to win on
                  the strength of the engineering alone — no driver, no field,
                  just the model. The full write-up of how it came together is
                  coming.
                </p>
              )}

              {cadChampionship.link ? (
                <a
                  href={cadChampionship.link}
                  className="btn-ghost mt-8"
                  target="_blank"
                  rel="noreferrer"
                >
                  See the results
                </a>
              ) : null}
            </div>

            {/* The render is a wide export, so it gets the full container
                width rather than being squeezed into a side column. */}
            <figure className="mt-12">
              <RenderPlate
                src={cadChampionship.image}
                alt={cadChampionship.imageAlt}
                width={cadChampionship.imageWidth}
                height={cadChampionship.imageHeight}
                fallbackAspect="aspect-[2048/817]"
                hint="Save the winning render to public/awards/ender-render.webp and it appears here automatically."
              />
              <figcaption className="mt-4 text-center text-sm text-slate-500">
                <span className="font-semibold text-slate-300">
                  {cadChampionship.robotName}
                </span>{' '}
                — the winning entry
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* How we're organised.                                                */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-page py-16">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          How we work
        </h2>
        <p className="mt-3 max-w-2xl text-slate-400">
          Three groups, one robot. Most of us end up touching more than one.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {subteams.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/40 hover:bg-white/[0.05]"
            >
              <h3 className="text-lg font-semibold text-white">{s.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Members.                                                            */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-page pb-24">
        <h2 className="text-3xl font-bold tracking-tight text-white">
          Members &amp; mentors
        </h2>
        {/* PLACEHOLDER: real member + mentor list (names/photos) from the team. */}
        <p className="mt-4 max-w-2xl text-slate-400">
          Profiles go up once the team signs off on names and photos.
        </p>
        <Link href="/contact" className="btn-ghost mt-8">
          Want to join?
        </Link>
      </section>
    </>
  );
}
