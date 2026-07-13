import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { RobotImage } from '@/components/RobotImage';
import { robotsByYear } from '@/content/robots';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Robots',
  description: `The robots of ${site.teamName}, ${site.program} Team ${site.teamNumber}, season by season.`,
};

export default function RobotsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Engineering"
        title="Our robots"
        intro="Every season, a new machine. The engineering story of each robot, subsystem by subsystem."
      />

      <section className="container-page py-16">
        <div className="grid gap-8 sm:grid-cols-2">
          {robotsByYear.map((robot) => (
            <Link
              key={robot.slug}
              href={`/robots/${robot.slug}`}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-brand/40 hover:bg-white/[0.05]"
            >
              <RobotImage src={robot.mainImage} alt={robot.name} />
              <div className="p-4">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-300">
                  {robot.season}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white group-hover:text-brand-100">
                  {robot.name}
                </h2>
                {robot.tagline ? (
                  <p className="mt-2 text-sm text-slate-400">{robot.tagline}</p>
                ) : null}
                <p className="mt-3 text-sm font-medium text-brand">
                  {robot.subsystems.length} subsystems →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
