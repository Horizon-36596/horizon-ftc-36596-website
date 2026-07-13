import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { BrandMark } from '@/components/BrandMark';

// Robot/subsystem photo slot. Renders the image when a path is set in
// content/robots.ts, and a quiet branded "photo coming soon" panel when not —
// so pages can ship before photography exists.
export function RobotImage({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={`flex aspect-[16/9] w-full flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-night-900 to-night-950 ${className ?? ''}`}
      >
        <BrandMark variant="white" size={40} className="opacity-25" />
        <p className="text-sm text-slate-500">Photo coming soon</p>
      </div>
    );
  }
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 ${className ?? ''}`}
    >
      <Image
        src={asset(src)}
        alt={alt}
        fill
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
