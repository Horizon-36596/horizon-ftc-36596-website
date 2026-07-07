import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Team',
  description: `About ${site.teamName}, ${site.program} Team ${site.teamNumber}.`,
};

export default function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="The team"
        intro="Who we are, how we work, and the people behind the robot."
      />

      <section className="container-page space-y-12 py-16">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-white">Our story</h2>
          {/* PLACEHOLDER: replace with Horizon's real origin story + mission. */}
          <p className="mt-4 text-slate-300">
            Horizon is {site.program} Team {site.teamNumber}. This is
            placeholder copy — the team&rsquo;s real story, mission, and
            founding will go here.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Subteams</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {[
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
            ].map((s) => (
              <div
                key={s.name}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{s.name}</h3>
                <p className="mt-2 text-sm text-slate-400">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-white">Members</h2>
          {/* PLACEHOLDER: real member + mentor list (names/photos) from the team. */}
          <p className="mt-4 max-w-2xl text-slate-400">
            Member and mentor profiles will appear here once the team provides
            names and photos.
          </p>
        </div>
      </section>
    </>
  );
}
