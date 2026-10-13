// Renders a sponsor's mark from components/sponsorLogoData.ts in the
// surrounding text colour. See that file for how the marks are sourced.
import { LOGOS, type SponsorLogoKey } from '@/components/sponsorLogoData';

export type { SponsorLogoKey };

export function SponsorLogo({
  logo,
  name,
  /** Base height in px, before the per-logo optical correction. */
  height,
  className,
}: {
  logo: SponsorLogoKey;
  name: string;
  height: number;
  className?: string;
}) {
  const mark = LOGOS[logo];
  if (!mark) return null;

  const h = Math.round(height * mark.optical);

  return (
    <svg
      viewBox={mark.viewBox}
      role="img"
      aria-label={name}
      className={className}
      style={{ height: h, width: Math.round(h * mark.ratio) }}
    >
      {(Array.isArray(mark.path) ? mark.path : [mark.path]).map((p, i) => (
        <path
          key={i}
          d={typeof p === 'string' ? p : p.d}
          fill="currentColor"
          fillOpacity={typeof p === 'string' ? undefined : p.opacity}
          fillRule={mark.fillRule}
        />
      ))}
    </svg>
  );
}
