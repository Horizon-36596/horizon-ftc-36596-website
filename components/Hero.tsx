import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/basePath';
import { site } from '@/lib/site';
import { ArrowRight } from '@/components/Icon';

// The hero, and the site's signature.
//
// The sun is the logo's stroked circle at scale, clipped by a curve of the same
// construction as the mark in public/brand/. So the page's horizon is the brand,
// not generic atmosphere.
//
// Two independently positioned layers rather than one scaled SVG: a single
// slice-scaled SVG puts the sun dead center, which is exactly where the headline
// is. Instead the curve stretches full-bleed with its crest authored at 72% of
// the width, and the sun is centered on that crest — clear of the text column at
// every viewport.
//
// Not a 100vh centered hero: the content sits left, the light sits low and
// right, and the fold deliberately shows the start of the next section.
//
// CREST_PX is the one number tying the layers together: the height above the
// section's bottom edge at which the horizon runs, and therefore the line the
// sun is clipped at.
const CREST_PX = 150;
const CURVE_H = 210;

function HorizonCurve() {
  return (
    <svg
      viewBox="0 0 1440 210"
      preserveAspectRatio="none"
      aria-hidden
      className="absolute inset-x-0 bottom-0 w-full"
      style={{ height: CURVE_H }}
    >
      <defs>
        {/* The official horizon gradient, brightest where the sun sits.
            userSpaceOnUse because the stops below are viewBox coordinates. */}
        <linearGradient
          id="hero-horizon"
          x1="0"
          y1="0"
          x2="1440"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#B13848" stopOpacity="0" />
          <stop offset="16%" stopColor="#B13848" stopOpacity="0.8" />
          <stop offset="45%" stopColor="#D24D46" />
          <stop offset="72%" stopColor="#F48A49" />
          <stop offset="88%" stopColor="#D24D46" />
          <stop offset="100%" stopColor="#B13848" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Ground. Barely darker than the page, but enough that the bright rule
          reads as a horizon rather than a stray hairline across the section. */}
      <path
        d="M0 176 C 320 132 720 74 1037 60 C 1230 52 1340 58 1440 72 L1440 210 L0 210 Z"
        fill="#100415"
      />

      {/* Peaks at 72% of the width — under the sun, clear of the headline. */}
      <path
        d="M0 176 C 320 132 720 74 1037 60 C 1230 52 1340 58 1440 72"
        fill="none"
        stroke="url(#hero-horizon)"
        strokeWidth="2.5"
        vectorEffect="non-scaling-stroke"
        className="origin-center animate-rule-wipe"
      />
    </svg>
  );
}

function Sun() {
  return (
    // Centered on the curve's crest (72%) rather than offset from an edge, so
    // the ring meets the line evenly on both sides at every width.
    //
    // Two nested elements on purpose: the entrance animation sets `transform`,
    // which would otherwise overwrite the centering translate and leave the sun
    // hanging off the right edge on narrow screens.
    <div
      aria-hidden
      className="absolute left-[72%] w-[clamp(7rem,22vw,22rem)] -translate-x-1/2"
      style={{ bottom: CREST_PX }}
    >
      {/* The viewBox stops short of the circle's lowest point, so roughly the
          bottom fifth sits below the horizon — the same proportion as the logo. */}
      <svg viewBox="0 0 400 268" className="h-auto w-full animate-sun-rise">
        <defs>
          {/* The official sun gradient, amber through orange to crimson.
              userSpaceOnUse because the stops below are viewBox coordinates. */}
          <linearGradient
            id="hero-sun"
            x1="200"
            y1="22"
            x2="200"
            y2="322"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#FFCB5C" />
            <stop offset="28%" stopColor="#FFCB5C" />
            <stop offset="60%" stopColor="#F86A43" />
            <stop offset="82%" stopColor="#F86A43" />
            <stop offset="100%" stopColor="#B13848" />
          </linearGradient>
        </defs>
        <circle
          cx="200"
          cy="172"
          r="150"
          fill="none"
          stroke="url(#hero-sun)"
          strokeWidth="13"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function Sunrise() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {/* Warmth in the sky, rising from the crest under the sun. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[36rem]"
        style={{
          backgroundImage:
            'radial-gradient(46% 78% at 72% 100%, rgb(248 106 67 / 0.28), rgb(177 56 72 / 0.10) 46%, transparent 72%)',
        }}
      />
      <Sun />
      <HorizonCurve />
    </div>
  );
}

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden">
      <Sunrise />

      {/* Bottom padding leaves the band the sun and the horizon curve occupy. */}
      <div className="container-page relative pb-72 pt-16 sm:pb-56 sm:pt-24">
        <p
          className="animate-rise font-mono text-[0.75rem] uppercase tracking-[0.18em] text-brand-300"
          style={{ animationDelay: '80ms' }}
        >
          {site.program} · Team {site.teamNumber} · {site.location}
        </p>

        <h1 className="mt-8 max-w-3xl">
          <span className="sr-only">
            {site.teamName} — {site.tagline}
          </span>

          <span
            aria-hidden
            className="block animate-rise"
            style={{ animationDelay: '160ms' }}
          >
            <Image
              src={asset('/brand/horizon-wordmark.svg')}
              alt=""
              width={337}
              height={79}
              unoptimized
              priority
              className="h-11 w-auto sm:h-16"
            />
          </span>

          <span
            aria-hidden
            className="mt-6 block animate-rise text-display-md font-light text-haze-50 sm:mt-8"
            style={{ animationDelay: '240ms' }}
          >
            Building towards
            <br />
            what’s next
          </span>
        </h1>

        <p
          className="mt-8 max-w-xl animate-rise font-prose text-[1.125rem] leading-[1.65] text-haze-300 sm:text-[1.25rem]"
          style={{ animationDelay: '320ms' }}
        >
          A community nonprofit robotics team in {site.location}, founded in{' '}
          {site.foundedYear} by captains and leads from three existing{' '}
          <em>FIRST</em> Tech Challenge teams.
        </p>

        <div
          className="mt-10 flex animate-rise flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ animationDelay: '400ms' }}
        >
          <Link href="/support/" className="btn-primary">
            Sponsor Horizon
            <ArrowRight size={17} />
          </Link>
          <Link href="/team/" className="btn-ghost">
            Meet the team
          </Link>
        </div>
      </div>
    </section>
  );
}
