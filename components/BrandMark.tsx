import Image from 'next/image';
import { asset } from '@/lib/basePath';

// The Horizon sun-over-horizon mark (square). Rendered from the official brand
// SVGs in public/brand/. `variant` picks the gradient art (for light-on-dark
// chrome like the header) or the plain white art (for quiet spots like the
// footer).
export function BrandMark({
  variant = 'gradient',
  size = 32,
  className,
}: {
  variant?: 'gradient' | 'white';
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={asset(`/brand/horizon-mark-${variant}.svg`)}
      alt=""
      aria-hidden
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
