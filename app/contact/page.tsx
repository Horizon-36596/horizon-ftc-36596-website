import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.teamName}, ${site.program} Team ${site.teamNumber}.`,
};

// Who might reach out, and why. Copy is scaffolding the team can sharpen.
const reasons = [
  {
    label: 'Sponsors',
    body: 'Interested in supporting the team? We’d love to talk about partnership.',
  },
  {
    label: 'Students',
    body: 'Want to join? No experience needed — just curiosity and commitment.',
  },
  {
    label: 'FTC community',
    body: 'Other teams, mentors, and event organizers — let’s collaborate.',
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Say hello"
        title="Contact"
        intro="Whether you're a sponsor, a future teammate, or another team — we want to hear from you."
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            Who we hear from
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.label}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-semibold text-white">{r.label}</h3>
                <p className="mt-2 text-sm text-slate-400">{r.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-white">Find us</h2>
            {/* PLACEHOLDER: real social links / school / meeting location from the team. */}
            <p className="mt-4 max-w-2xl text-slate-400">
              Social links and where we meet will appear here once the team
              confirms them.
            </p>
          </div>
        </div>

        {/* Email card — the primary action. */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold text-white">Email us</h2>
          <p className="mt-3 text-sm text-slate-400">
            The fastest way to reach the team. We read everything.
          </p>
          {/* PLACEHOLDER: replace with the team's real contact email in lib/site.ts. */}
          <a
            href={`mailto:${site.contactEmail}`}
            className="btn-primary mt-6 w-full"
          >
            Email the team
          </a>
        </aside>
      </section>
    </>
  );
}
