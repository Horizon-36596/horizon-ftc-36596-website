import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';
import { Section } from '@/components/Section';
import { Reveal } from '@/components/Reveal';
import { Frame } from '@/components/Frame';
import { ArrowRight } from '@/components/Icon';
import { robotsByYear } from '@/content/robots';

export const metadata: Metadata = {
  title: 'Robots',
  description:
    'Every robot Horizon has designed, starting with Ender — the entry that won the Chain Reaction CAD competition — and the BIOBUZZ competition robot now in production.',
};

const STATUS_LABEL = {
  'in-production': 'In production',
  complete: 'Complete',
} as const;

export default function RobotsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Robots"
        title="Our robots"
        lead={
          <p>
            Horizon is one season old, so this page is short. What is here is
            real: one CAD entry that won a competition, and one competition
            robot being built right now.
          </p>
        }
      />

      <Section tone="sunk">
        <ul className="space-y-8">
          {robotsByYear.map((robot, i) => (
            <Reveal as="li" key={robot.slug} delay={i * 90}>
              <Link
                href={`/robots/${robot.slug}/`}
                className="card group grid gap-8 overflow-hidden p-6 transition duration-300 ease-out-quart hover:-translate-y-1 hover:border-brand-500/40 sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-12"
              >
                <Frame
                  src={robot.mainImage}
                  alt={
                    robot.mainImage
                      ? `${robot.name}, Horizon's ${robot.season} robot`
                      : ''
                  }
                  isRender={robot.mainImageIsRender}
                  width={robot.mainImageWidth}
                  height={robot.mainImageHeight}
                  aspect="aspect-[16/10]"
                  slot={`public/robots/${robot.slug}/main.webp`}
                  hint="1600 × 1000 or larger"
                />

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[0.75rem] uppercase tracking-[0.14em] text-haze-400">
                      {robot.season}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${
                        robot.status === 'complete'
                          ? 'border-brand-500/40 bg-brand-500/10 text-brand-300'
                          : 'border-night-600 text-haze-400'
                      }`}
                    >
                      {STATUS_LABEL[robot.status]}
                    </span>
                  </div>

                  <h2 className="mt-4 text-display-sm font-light text-haze-50">
                    {robot.name}
                  </h2>

                  {robot.tagline ? (
                    <p className="mt-4 max-w-md font-prose text-[1.0625rem] leading-[1.7] text-haze-300">
                      {robot.tagline}
                    </p>
                  ) : null}

                  <span className="btn-link mt-7">
                    {robot.status === 'complete'
                      ? 'See the design'
                      : 'Follow the build'}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-200 ease-out-quart group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
