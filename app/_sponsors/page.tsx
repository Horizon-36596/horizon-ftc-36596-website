import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { RenderPlate } from '@/components/RenderPlate';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Sponsors',
  description: `Sponsor ${site.teamName}, ${site.program} Team ${site.teamNumber}.`,
};

export default function SponsorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partner with us"
        title="Sponsors"
        intro="Your support puts tools in students' hands and a robot on the field. Here's why it matters."
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
            <h2 className="text-2xl font-semibold text-white">
              Sponsorship package
            </h2>
            <p className="mt-3 max-w-2xl text-slate-400">
              The full breakdown of tiers, benefits, and where the money goes.
            </p>
            {/* The package is being designed separately. Drop the exported
                image at the path below and it replaces this panel on the next
                build — no code change needed. */}
            <div className="mt-6 max-w-xl">
              <RenderPlate
                src="/sponsors/sponsorship-package.png"
                alt="Horizon sponsorship package"
                fallbackAspect="aspect-[8.5/11]"
                hint="Save the finished package as public/sponsors/sponsorship-package.png and it appears here automatically."
              />
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

        {/* Pointer to the contact page. */}
        <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold text-white">
            Ready to partner?
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Reach out and we&rsquo;ll get back to you about sponsorship.
          </p>
          <Link href="/contact" className="btn-primary mt-6 w-full">
            Contact the team
          </Link>
        </aside>
      </section>
    </>
  );
}
