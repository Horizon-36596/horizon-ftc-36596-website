import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { Section, SectionHeading } from '@/components/Section';
import { Prose } from '@/components/Prose';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { ArrowRight, Gear } from '@/components/Icon';
import { getRobot, robots } from '@/content/robots';

// Static export needs every dynamic route enumerated at build time.
export function generateStaticParams() {
  return robots.map((robot) => ({ slug: robot.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const robot = getRobot(slug);
  if (!robot) return {};
  return {
    title: robot.name,
    description: robot.tagline ?? `${robot.name} — ${robot.season}.`,
  };
}

export default async function RobotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const robot = getRobot(slug);
  if (!robot) notFound();

  const hasWriteUp = robot.description.length > 0;
  const hasSubsystems = robot.subsystems.length > 0;

  return (
    <>
      <PageHeader
        eyebrow={robot.season}
        title={robot.name}
        lead={robot.tagline ? <p>{robot.tagline}</p> : undefined}
      >
        <Link href="/robots/" className="btn-link mt-8">
          <ArrowRight size={16} className="rotate-180" />
          All robots
        </Link>
      </PageHeader>

      <Section tone="sunk">
        <Reveal>
          <Frame
            src={robot.mainImage}
            alt={robot.mainImage ? `${robot.name}, ${robot.season}` : ''}
            isRender={robot.mainImageIsRender}
            width={robot.mainImageWidth}
            height={robot.mainImageHeight}
            aspect="aspect-[16/9]"
            slot={`public/robots/${robot.slug}/main.webp`}
            hint="1600 × 900 or larger"
            priority
          />
        </Reveal>

        <Reveal delay={90}>
          {hasWriteUp ? (
            <Prose className="mt-12">
              {robot.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </Prose>
          ) : (
            <div className="mt-12 max-w-[var(--measure)] border-l-2 border-brand-500/40 pl-6">
              <p className="font-prose text-[1.0625rem] leading-[1.7] text-haze-400">
                This robot is still being built. The design write-up goes up
                when there is a design worth writing up — we would rather leave
                the page short than fill it with something that is not true yet.
              </p>
            </div>
          )}
        </Reveal>
      </Section>

      {hasSubsystems ? (
        <Section>
          <SectionHeading
            eyebrow="Subsystems"
            title="How it is put together"
            intro={
              <p>
                Each subsystem gets its own page — what it does, why it is built
                that way, and what we would change.
              </p>
            }
          />

          <ul className="mt-14 grid gap-6 sm:grid-cols-2">
            {robot.subsystems.map((subsystem, i) => (
              <Reveal as="li" key={subsystem.slug} delay={i * 70}>
                <Link
                  href={`/robots/${robot.slug}/${subsystem.slug}/`}
                  className="card group flex h-full flex-col p-7 transition duration-300 ease-out-quart hover:-translate-y-1 hover:border-brand-500/40"
                >
                  <Gear size={20} className="text-brand-500" />
                  <h3 className="mt-5 text-[1.25rem] font-light text-haze-50">
                    {subsystem.name}
                  </h3>
                  <p className="mt-2.5 flex-1 font-prose text-[1rem] leading-[1.65] text-haze-300">
                    {subsystem.summary}
                  </p>
                  <span className="btn-link mt-6">
                    {subsystem.description.length > 0
                      ? 'Read the detail'
                      : 'Write-up coming'}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 ease-out-quart group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  );
}
