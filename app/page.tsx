import Link from 'next/link';
import { site } from '@/lib/site';

export default function HomePage() {
  return (
    <>
      {/* Hero — the flagship first impression. The dawn/horizon gradient is a nod
          to the team name and a placeholder until official colors land. */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[36rem] bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.brand.500/25),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />
        <div className="container-page relative flex min-h-[70vh] flex-col justify-center py-24">
          <p className="animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            {site.program} · Team {site.teamNumber}
          </p>
          <h1 className="mt-4 max-w-3xl animate-fade-up text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-7xl">
            {site.teamName}
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-lg text-slate-300">
            {site.tagline}
          </p>
          <div className="mt-10 flex animate-fade-up flex-wrap gap-3">
            <Link href="/sponsors" className="btn-primary">
              Become a sponsor
            </Link>
            <Link href="/team" className="btn-ghost">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      {/* Quick-glance value props. Content is intentionally generic scaffolding;
          the routine replaces these with real Horizon specifics. */}
      <section className="container-page grid gap-6 py-16 sm:grid-cols-3">
        {[
          {
            title: 'Compete',
            body: 'Designing, building, and programming a robot for the FTC season.',
          },
          {
            title: 'Build',
            body: 'An engineering process from CAD to iteration to competition.',
          },
          {
            title: 'Reach out',
            body: 'Growing STEM in our community through outreach and mentorship.',
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/40"
          >
            <h2 className="text-lg font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-slate-400">{card.body}</p>
          </div>
        ))}
      </section>
    </>
  );
}
