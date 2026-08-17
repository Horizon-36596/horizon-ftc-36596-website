import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Prose } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { ArrowRight } from '@/components/Icon';
import { getSubsystem, robots } from '@/content/robots';

// Static export needs every dynamic route enumerated at build time.
export function generateStaticParams() {
  return robots.flatMap((robot) =>
    robot.subsystems.map((subsystem) => ({
      slug: robot.slug,
      subsystem: subsystem.slug,
    })),
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
    description: found.subsystem.summary,
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
  const hasWriteUp = subsystem.description.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={`${robot.name} · ${robot.season}`}
        title={subsystem.name}
        lead={<p>{subsystem.summary}</p>}
      >
        <Link href={`/robots/${robot.slug}/`} className="btn-link mt-8">
          <ArrowRight size={16} className="rotate-180" />
          Back to {robot.name}
        </Link>
      </PageHeader>

      <Section tone="sunk">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <Frame
              src={subsystem.image}
              alt={subsystem.image ? `${subsystem.name} on ${robot.name}` : ''}
              aspect="aspect-[4/3]"
              slot={`public/robots/${robot.slug}/${subsystem.slug}.webp`}
              hint="1600 × 1200 or larger"
            />
          </Reveal>

          <Reveal delay={90}>
            {hasWriteUp ? (
              <Prose>
                {subsystem.description.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </Prose>
            ) : (
              <div className="border-l-2 border-brand-500/40 pl-6">
                <p className="font-prose text-[1.0625rem] leading-[1.7] text-haze-400">
                  The write-up for this subsystem has not been published yet. It
                  goes up once the mechanism is built and tested, so that what
                  is written here describes what the robot actually does rather
                  than what we hoped it would.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </Section>
    </>
  );
}
