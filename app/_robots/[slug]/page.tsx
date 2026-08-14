import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RobotImage } from '@/components/RobotImage';
import { robots, getRobot } from '@/content/robots';

export function generateStaticParams() {
  return robots.map((robot) => ({ slug: robot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const robot = getRobot((await params).slug);
  if (!robot) return {};
  return {
    title: `${robot.name} — Robots`,
    description: `${robot.name} (${robot.season}): design overview and subsystems.`,
  };
}

export default async function RobotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const robot = getRobot((await params).slug);
  if (!robot) notFound();

  return (
    <>
      <header className="container-page border-b border-white/5 py-16">
        <nav className="text-sm text-slate-400">
          <Link href="/robots" className="transition hover:text-white">
            Robots
          </Link>{' '}
          <span className="text-slate-600">/</span>{' '}
          <span className="text-slate-200">{robot.name}</span>
        </nav>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {robot.season}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {robot.name}
        </h1>
        {robot.tagline ? (
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {robot.tagline}
          </p>
        ) : null}
      </header>

      <section className="container-page py-16">
        {/* Main robot photo — set `mainImage` in content/robots.ts. */}
        <RobotImage src={robot.mainImage} alt={robot.name} />

        {/* Robot description — add paragraphs in content/robots.ts. */}
        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold text-white">The robot</h2>
          {robot.description.length > 0 ? (
            <div className="mt-4 space-y-4 text-slate-300">
              {robot.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-slate-500">
              Design overview coming soon — this is where the robot&rsquo;s
              story will live.
            </p>
          )}
        </div>

        {/* Subsystem cards — each links to its own page. */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white">Subsystems</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {robot.subsystems.map((s) => (
              <Link
                key={s.slug}
                href={`/robots/${robot.slug}/${s.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-brand/40 hover:bg-white/[0.05]"
              >
                <h3 className="text-lg font-semibold text-white group-hover:text-brand-100">
                  {s.name}
                </h3>
                <p className="mt-2 text-sm text-slate-400">{s.summary}</p>
                <p className="mt-4 text-sm font-medium text-brand">
                  Read more →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
