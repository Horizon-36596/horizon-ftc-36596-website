import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RobotImage } from '@/components/RobotImage';
import { robots, getSubsystem } from '@/content/robots';

export function generateStaticParams() {
  return robots.flatMap((robot) =>
    robot.subsystems.map((s) => ({ slug: robot.slug, subsystem: s.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; subsystem: string }>;
}): Promise<Metadata> {
  const { slug, subsystem } = await params;
  const found = getSubsystem(slug, subsystem);
  if (!found) return {};
  return {
    title: `${found.subsystem.name} — ${found.robot.name}`,
    description: `${found.robot.name} ${found.subsystem.name.toLowerCase()}: ${found.subsystem.summary}`,
  };
}

export default async function SubsystemPage({
  params,
}: {
  params: Promise<{ slug: string; subsystem: string }>;
}) {
  const { slug, subsystem: subsystemSlug } = await params;
  const found = getSubsystem(slug, subsystemSlug);
  if (!found) notFound();
  const { robot, subsystem } = found;

  const index = robot.subsystems.findIndex((s) => s.slug === subsystem.slug);
  const prev = robot.subsystems[index - 1];
  const next = robot.subsystems[index + 1];

  return (
    <>
      <header className="container-page border-b border-white/5 py-16">
        <nav className="text-sm text-slate-400">
          <Link href="/robots" className="transition hover:text-white">
            Robots
          </Link>{' '}
          <span className="text-slate-600">/</span>{' '}
          <Link
            href={`/robots/${robot.slug}`}
            className="transition hover:text-white"
          >
            {robot.name}
          </Link>{' '}
          <span className="text-slate-600">/</span>{' '}
          <span className="text-slate-200">{subsystem.name}</span>
        </nav>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-brand">
          {robot.name} · {robot.season}
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {subsystem.name}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-300">
          {subsystem.summary}
        </p>
      </header>

      <section className="container-page py-16">
        {/* Subsystem photo — set `image` in content/robots.ts. */}
        <RobotImage
          src={subsystem.image}
          alt={`${robot.name} ${subsystem.name}`}
        />

        {/* Subsystem write-up — add paragraphs in content/robots.ts. */}
        <div className="mt-12 max-w-3xl">
          {subsystem.description.length > 0 ? (
            <div className="space-y-4 text-slate-300">
              {subsystem.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">
              Write-up coming soon — this is where the {subsystem.name}{' '}
              deep-dive will live.
            </p>
          )}
        </div>

        {/* Prev / next subsystem navigation. */}
        <nav className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm">
          {prev ? (
            <Link
              href={`/robots/${robot.slug}/${prev.slug}`}
              className="btn-ghost"
            >
              ← {prev.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/robots/${robot.slug}/${next.slug}`}
              className="btn-ghost"
            >
              {next.name} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </section>
    </>
  );
}
