import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { BrandMark } from '@/components/BrandMark';

// Every image slot on the site goes through here.
//
// Horizon has brand assets and one CAD render; it does not yet have member
// portraits, robot photography, or event shots. A site that shows broken images
// or grey boxes in those places reads as unfinished, so the empty state is
// designed: the mark, the exact file path to drop the image at, and the pixel
// size that will fit. It looks deliberate now and becomes the photo later with
// a one-line edit.

export function Frame({
  src,
  alt,
  /** Where the file goes, shown in the empty state. */
  slot,
  /** Pixel size the team should supply, shown in the empty state. */
  hint,
  aspect = 'aspect-[16/9]',
  className,
  /** Renders export on white; mount them on a light plate instead of the dark card. */
  isRender = false,
  width,
  height,
  priority = false,
}: {
  src?: string;
  alt: string;
  slot?: string;
  hint?: string;
  aspect?: string;
  className?: string;
  isRender?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={`flex ${aspect} w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-night-600/70 bg-night-900/50 px-6 text-center ${className ?? ''}`}
      >
        <BrandMark variant="white" size={34} className="opacity-20" />
        <p className="text-[0.8125rem] text-haze-400">Photo coming soon</p>
        {slot ? (
          <p className="font-mono text-[0.6875rem] leading-relaxed text-haze-500">
            {slot}
            {hint ? <span className="block">{hint}</span> : null}
          </p>
        ) : null}
      </div>
    );
  }

  // A render on a white background punches a bright hole in a dark page unless
  // the brightness is made to look intentional — hence the light plate.
  if (isRender) {
    return (
      <div
        className={`relative overflow-hidden rounded-xl border border-night-700/70 bg-gradient-to-b from-haze-50 to-haze-200 shadow-lifted ${className ?? ''}`}
      >
        <Image
          src={asset(src)}
          alt={alt}
          width={width ?? 1600}
          height={height ?? 900}
          unoptimized
          priority={priority}
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${aspect} w-full overflow-hidden rounded-xl border border-night-700/70 shadow-card ${className ?? ''}`}
    >
      <Image
        src={asset(src)}
        alt={alt}
        fill
        unoptimized
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
