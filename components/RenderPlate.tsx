import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';
import { asset } from '@/lib/basePath';
import { BrandMark } from '@/components/BrandMark';

// Display surface for CAD renders.
//
// Renders usually export on a white (or transparent) background, which reads as
// a bright hole punched in a dark page. Mounting them on a deliberate light
// plate makes that brightness look intentional and gives a dark robot enough
// contrast to actually be legible.
//
// The file is checked at build time: if it hasn't been added yet the component
// falls back to an instruction panel rather than a broken image, so the page
// ships before the asset exists.
export function RenderPlate({
  src,
  alt,
  hint,
  fallbackAspect = 'aspect-[16/9]',
}: {
  src: string;
  alt: string;
  /** Shown in the fallback so whoever adds the image knows where it goes. */
  hint?: string;
  /** Shape of the empty-state panel, matched to the artwork that's coming. */
  fallbackAspect?: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), 'public', src));

  if (!exists) {
    return (
      <div
        className={`flex ${fallbackAspect} w-full flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-white/15 bg-white/[0.02] px-6 text-center`}
      >
        <BrandMark variant="white" size={40} className="opacity-25" />
        <p className="text-sm font-medium text-slate-400">
          Render not added yet
        </p>
        {hint ? (
          <p className="max-w-md text-xs text-slate-500">{hint}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white to-slate-200 shadow-2xl shadow-black/40">
      <Image
        src={asset(src)}
        alt={alt}
        width={2000}
        height={1200}
        unoptimized
        className="h-auto w-full object-contain"
      />
    </div>
  );
}
