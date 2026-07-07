import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sponsors',
  description: `Sponsor ${site.teamName}, ${site.program} Team ${site.teamNumber}, and get in touch.`,
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title="Sponsors & contact"
        intro="Your support puts tools in students' hands and a robot on the field. Here's why it matters — and how to reach us."
      />

      <section className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Why sponsor Horizon
            </h2>
            {/* PLACEHOLDER: sharpen with real impact numbers once available. */}
            <ul className="mt-4 space-y-3 text-slate-300">
              <li>Fund hands-on STEM education for students on the team.</li>
              <li>Put your brand in front of our school and FTC community.</li>
              <li>Support outreach that grows engineering in our region.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">Sponsor tiers</h2>
            {/* PLACEHOLDER: confirm real tier names and amounts with the team. */}
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {['Bronze', 'Silver', 'Gold'].map((tier) => (
                <div
                  key={tier}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{tier}</h3>
                  <p className="mt-2 text-sm text-slate-400">
                    Tier details to be confirmed.
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">Our sponsors</h2>
            {/* PLACEHOLDER: real sponsor names/logos — never invent these. */}
            <p className="mt-4 text-slate-400">
              We&rsquo;ll proudly list our sponsors here.
            </p>
          </div>
        </div>

        {/* Contact card. */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold text-white">Get in touch</h2>
          <p className="mt-3 text-sm text-slate-400">
            Interested in sponsoring, or a student who wants to join? Reach out.
          </p>
          {/* PLACEHOLDER: replace with the team's real contact email. */}
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
