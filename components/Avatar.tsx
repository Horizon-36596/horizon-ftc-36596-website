import Image from 'next/image';
import { asset } from '@/lib/basePath';

// Circular portrait for people — members and mentors.
//
// Deliberately small. The photos the team can get hold of are low resolution,
// and a low-resolution image fails loudly at full-bleed portrait size and
// almost invisibly at 80px in a circle. Cropping to a circle also throws away
// the part of a snapshot that gives it away as a snapshot: the background.
//
// Sizes are px, not Tailwind classes, so `sizes` below can be honest about how
// large the image is ever asked to render.

export function Avatar({
  src,
  name,
  size = 80,
  className,
}: {
  src?: string;
  /** Used for alt text, and for the fallback initial. */
  name: string;
  size?: number;
  className?: string;
}) {
  const shell = `relative shrink-0 overflow-hidden rounded-full border border-night-700 ${className ?? ''}`;

  // No photo yet: the person's initial on the night ground. Reads as a designed
  // state rather than a missing asset, and keeps the row's rhythm intact next
  // to a neighbour who does have one.
  if (!src) {
    return (
      <div
        className={`${shell} flex items-center justify-center bg-night-850`}
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden
          className="font-display font-light leading-none text-haze-500"
          style={{ fontSize: Math.round(size * 0.4) }}
        >
          {name.trim().charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={shell} style={{ width: size, height: size }}>
      <Image
        src={asset(src)}
        alt={name}
        width={size * 2}
        height={size * 2}
        unoptimized
        className="h-full w-full object-cover"
      />
    </div>
  );
}
