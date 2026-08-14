import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';
import { asset } from '@/lib/basePath';

// Pillars shown on the home page. Copy is deliberately generic scaffolding that
// the team can sharpen; nothing here asserts unverified specifics.
const pillars = [
  {
    label: 'Compete',
    body: 'Designing, building, and programming a robot to compete in the FTC season.',
  },
  {
    label: 'Build',
    body: 'A real engineering process — CAD, prototyping, iteration, and testing.',
  },
  {
    label: 'Reach out',
    body: 'Growing STEM in our community through outreach and mentorship.',
  },
];

// Quick facts. Only confirmed facts belong here — an empty stat reads worse
// than no stat, so anything unverified stays off the strip entirely.
const facts = [
  { value: 'FTC', label: 'FIRST Tech Challenge' },
  { value: `#${site.teamNumber}`, label: 'Team number' },
  { value: 'Champions', label: 'Largest FTC CAD competition to date' },
  { value: 'New team', label: 'Building our first seasons' },
];

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* Hero — the flagship first impression, built around the official     */}
      {/* brand art: the gradient sun mark cresting above the arced wordmark. */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-48 h-[42rem] bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.brand.500/20),transparent_70%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand/40 to-transparent"
        />
        <div className="container-page relative flex min-h-[82vh] flex-col items-center justify-center py-24 text-center">
          <Image
            src={asset('/brand/horizon-mark-gradient.svg')}
            alt=""
            aria-hidden
            width={104}
            height={104}
            unoptimized
            priority
            className="animate-fade-up drop-shadow-[0_0_28px_theme(colors.brand.500/45)]"
            style={{ animationDelay: '0ms' }}
          />
          <p
            className="mt-8 animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-brand-300"
            style={{ animationDelay: '80ms' }}
          >
            {site.program} · Team {site.teamNumber}
          </p>
          <h1
            className="mt-6 w-full max-w-3xl animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            <span className="sr-only">{site.teamName}</span>
            <Image
              src={asset('/brand/horizon-wordmark.svg')}
              alt=""
              aria-hidden
              width={1347}
              height={316}
              unoptimized
              className="h-auto w-full"
              priority
            />
          </h1>
          <p
            className="mt-8 max-w-xl animate-fade-up text-lg text-slate-300 sm:text-xl"
            style={{ animationDelay: '240ms' }}
          >
            {site.tagline}
          </p>
          <div
            className="mt-10 flex animate-fade-up flex-wrap justify-center gap-3"
            style={{ animationDelay: '320ms' }}
          >
            <Link href="/sponsors" className="btn-primary">
              Become a sponsor
            </Link>
            <Link href="/team" className="btn-ghost">
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* What we do — three pillars.                                         */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-page py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What we do
          </h2>
          <p className="mt-3 text-slate-400">
            {/* <!-- PLACEHOLDER: replace with Horizon's real one-line story --> */}
            {site.description}
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pillars.map((p, i) => (
            <div
              key={p.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/40 hover:bg-white/[0.05]"
            >
              <span className="text-sm font-semibold text-brand">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {p.label}
              </h3>
              <p className="mt-2 text-sm text-slate-400">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Quick facts strip.                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label}>
              <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {f.value}
              </div>
              <div className="mt-1 text-sm text-slate-400">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Closing CTA band.                                                   */}
      {/* ------------------------------------------------------------------ */}
      <section className="container-page py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night-900 p-10 sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,theme(colors.brand.500/25),transparent_70%)]"
          />
          <div className="relative max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Help put a robot on the field.
            </h2>
            <p className="mt-4 text-slate-300">
              Sponsors fund the tools and parts that make {site.teamName}{' '}
              possible. Students: there&rsquo;s a seat for you on the team.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/sponsors" className="btn-primary">
                Become a sponsor
              </Link>
              <Link href="/team" className="btn-ghost">
                Join the team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
