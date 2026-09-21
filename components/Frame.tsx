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

  // A render gets the same treatment as the hero rather than a light plate:
  // cut out, stood on a horizon line with the sunrise glow behind it. A white
  // plate punches a bright hole in a dark page, and pretending the brightness
  // is deliberate only half works — putting the robot on the site's own
  // horizon makes it belong to the page instead.
  //
  // This needs a cutout with a transparent background; a render still boxed in
  // on white will show the box.
  if (isRender) {
    return (
      <div
        className={`relative ${aspect} overflow-hidden rounded-xl border border-night-700/70 bg-night-900 shadow-lifted ${className ?? ''}`}
      >
        {/* Light rising behind the robot, same move as a section's glow. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%]"
          style={{
            backgroundImage:
              'radial-gradient(60% 80% at 50% 100%, rgb(248 106 67 / 0.28), rgb(177 56 72 / 0.10) 50%, transparent 75%)',
          }}
        />

        {/* The line it stands on. */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-[12%] h-px bg-gradient-to-r from-transparent via-brand-500/70 to-transparent"
        />

        <Image
          src={asset(src)}
          alt={alt}
          width={width ?? 1600}
          height={height ?? 900}
          unoptimized
          priority={priority}
          className="absolute bottom-[12%] left-1/2 h-[84%] w-auto max-w-none -translate-x-1/2 object-contain [filter:drop-shadow(0_18px_24px_rgb(0_0_0/0.5))]"
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
