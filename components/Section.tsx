import { Reveal } from '@/components/Reveal';

// Section chrome. Two pieces:
//
//   <Section>        — vertical rhythm, optional alternating ground, and the
//                      optional horizon glow rising from the bottom edge.
//   <SectionHeading> — the small brand label, the heading, and the sunrise rule.
//
// The glow deliberately rises from the *bottom* of a section rather than
// blooming out of a corner. That's the site's one atmospheric move and it maps
// to the team's name.

export function Section({
  children,
  id,
  /** `sunk` is the alternating darker ground; `raised` lifts a step. */
  tone = 'base',
  /** Adds the rising light. Chrome and identity surfaces only, never data. */
  glow = false,
  className,
}: {
  children: React.ReactNode;
  id?: string;
  tone?: 'base' | 'sunk' | 'raised';
  glow?: boolean;
  className?: string;
}) {
  const tones = {
    base: 'bg-night-950',
    sunk: 'bg-night-925',
    raised: 'bg-night-900',
  } as const;

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${tones[tone]} py-24 sm:py-32 ${className ?? ''}`}
    >
      {glow ? (
        <div
          aria-hidden
          className="glow-horizon pointer-events-none absolute inset-x-0 bottom-0 h-[28rem]"
        />
      ) : null}
      <div className="container-page relative">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  /** Right-aligns the rule and text for the occasional asymmetric section. */
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <Reveal
      as="header"
      className={[
        align === 'center' ? 'mx-auto max-w-2xl text-center' : '',
        className ?? '',
      ].join(' ')}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-display-sm font-light text-haze-50">{title}</h2>
      <div
        aria-hidden
        className={`mt-6 h-px w-16 bg-gradient-to-r from-brand-300 to-brand-700 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
      {intro ? (
        <div
          className={`mt-6 font-prose text-[1.0625rem] leading-[1.7] text-haze-300 sm:text-[1.125rem] ${
            align === 'center' ? 'mx-auto' : ''
          } max-w-[var(--measure)]`}
        >
          {intro}
        </div>
      ) : null}
    </Reveal>
  );
}
