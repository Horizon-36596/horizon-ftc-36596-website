import { Reveal } from '@/components/Reveal';

// The top of every page that isn't the home page. Same shape as the hero —
// eyebrow, display line, one serif lead, light rising from the bottom edge —
// at about half the scale, so an inner page is recognisably the same site
// without competing with the landing page.
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  /** Optional actions or metadata under the lead. */
  children?: React.ReactNode;
}) {
  return (
    <header className="grain relative isolate overflow-hidden border-b border-night-700/50">
      <div
        aria-hidden
        className="glow-horizon pointer-events-none absolute inset-x-0 bottom-0 h-72"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
      />

      <div className="container-page relative py-20 sm:py-28">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-display-sm font-light text-haze-50">
            {title}
          </h1>
        </Reveal>

        {lead ? (
          <Reveal delay={90}>
            <div className="mt-7 max-w-[var(--measure)] font-prose text-[1.125rem] leading-[1.65] text-haze-300 sm:text-[1.25rem]">
              {lead}
            </div>
          </Reveal>
        ) : null}

        {children ? <Reveal delay={160}>{children}</Reveal> : null}
      </div>
    </header>
  );
}
