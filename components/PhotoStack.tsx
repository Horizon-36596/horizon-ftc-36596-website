import Image from 'next/image';
import { asset } from '@/lib/basePath';

// Two photos laid over each other at slight opposing angles, the way they sit
// in the team's sponsorship deck. The rotation is what makes them read as
// photographs on a desk rather than as two boxes in a grid, so it stays even at
// the smallest size — only the offset shrinks.
//
// Both slots are sized from real pixel dimensions so nothing reflows on load.

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export function PhotoStack({
  photos,
  className,
}: {
  photos: Photo[];
  className?: string;
}) {
  const [back, front] = photos;
  if (!back) return null;

  return (
    <div className={`relative pb-[22%] pr-[6%] ${className ?? ''}`}>
      <div className="w-[84%] rotate-[-3deg] overflow-hidden rounded-lg border border-night-700 shadow-lifted">
        <Image
          src={asset(back.src)}
          alt={back.alt}
          width={back.width}
          height={back.height}
          unoptimized
          className="h-auto w-full object-cover"
        />
      </div>

      {front ? (
        <div className="absolute bottom-0 right-0 w-[58%] rotate-[4deg] overflow-hidden rounded-lg border border-night-700 shadow-lifted">
          <Image
            src={asset(front.src)}
            alt={front.alt}
            width={front.width}
            height={front.height}
            unoptimized
            className="h-auto w-full object-cover"
          />
        </div>
      ) : null}
    </div>
  );
}
