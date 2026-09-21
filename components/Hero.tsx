import Image from 'next/image';
import Link from 'next/link';
import { asset } from '@/lib/basePath';
import { site } from '@/lib/site';
import { SkyCanvas } from '@/components/SkyCanvas';
import { ArrowRight } from '@/components/Icon';

// The hero, and the site's signature.
//
// The opening of the page is one sunrise. The sun is the logo's stroked circle
// at scale, clipped by a curve of the same construction as the mark in
// public/brand/, and over the first screen and a half of scroll it clears that
// line while the sky behind it warms from night to dawn. So the page's horizon
// is the brand, and the brand is the thing that moves.
//
// How the movement is built:
//
//   <SkyCanvas>   paints the sky and writes --q, how far the rise has gone.
//   .hero-track   the scroll distance the rise is spread over.
//   .hero-sticky  the hero pinned inside that track, so the page holds still
//                 while the sun moves through it.
//
// The measurements live in globals.css, where --q and the 820px breakpoint can
// be read next to each other. Only the drawing is here.
//
// Two independently positioned layers rather than one scaled SVG: a single
// slice-scaled SVG puts the sun dead center, which is exactly where the
// headline is. Instead the curve stretches full-bleed with its crest authored
// at 72% of the width on desktop, and the sun is centered on that crest — clear
// of the text column at every viewport. On phones both move to the middle and
// the content sits above them.
//
// Not a 100vh centered hero: the content sits left, the light sits low, and the
// fold deliberately shows the start of the next section.

function Defs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        {/* The official sun gradient, amber through orange to crimson. */}
        <linearGradient id="hero-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFCB5C" />
          <stop offset="0.28" stopColor="#FFCB5C" />
          <stop offset="0.6" stopColor="#F86A43" />
          <stop offset="0.82" stopColor="#F86A43" />
          <stop offset="1" stopColor="#B13848" />
        </linearGradient>

        {/* The horizon rule, brightest where the sun sits: right of center on
            desktop, and centered on the symmetric phone curve. */}
        <linearGradient id="hero-horizon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B13848" stopOpacity="0" />
          <stop offset="0.16" stopColor="#B13848" stopOpacity="0.8" />
          <stop offset="0.45" stopColor="#D24D46" />
          <stop offset="0.72" stopColor="#F48A49" />
          <stop offset="0.88" stopColor="#D24D46" />
          <stop offset="1" stopColor="#B13848" stopOpacity="0.5" />
        </linearGradient>

        <linearGradient id="hero-horizon-centered" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#B13848" stopOpacity="0" />
          <stop offset="0.2" stopColor="#B13848" stopOpacity="0.8" />
          <stop offset="0.5" stopColor="#F48A49" />
          <stop offset="0.8" stopColor="#B13848" stopOpacity="0.8" />
          <stop offset="1" stopColor="#B13848" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Sunrise() {
  // Ground fill: a step darker than the page, so the bright rule reads as a
  // horizon rather than a stray hairline across the section.
  const ground = '#0e0312';

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-[1]">
      <div className="hero-warmth" />

      {/* The viewBox is square and the ring is inset, so the translate in
          globals.css can carry the sun from mostly below the line up to the
          logo's own proportion without the stroke ever being clipped. */}
      <div className="hero-sun">
        <svg viewBox="0 0 400 400">
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#hero-sun)"
            strokeWidth="13"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="hero-ground">
        {/* Desktop: peaks at 72% of the width, under the sun and clear of the
            headline. */}
        <svg
          className="hero-desk"
          viewBox="0 0 1440 300"
          preserveAspectRatio="none"
        >
          <path
            fill={ground}
            d="M0 210 C 320 150 720 90 1037 74 C 1230 64 1340 70 1440 84 L1440 300 L0 300 Z"
          />
          <path
            fill="none"
            stroke="url(#hero-horizon)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            d="M0 210 C 320 150 720 90 1037 74 C 1230 64 1340 70 1440 84"
          />
        </svg>

        {/* Phone: symmetric, because the sun is centered and the hill reads as
            one shape under it rather than a slope running off the screen. */}
        <svg
          className="hero-mob"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          <path
            fill={ground}
            d="M0 150 C 200 100 300 82 400 80 C 500 82 600 100 800 150 L800 300 L0 300 Z"
          />
          <path
            fill="none"
            stroke="url(#hero-horizon-centered)"
            strokeWidth="2.5"
            vectorEffect="non-scaling-stroke"
            d="M0 150 C 200 100 300 82 400 80 C 500 82 600 100 800 150"
          />
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div className="hero-track" data-hero-track>
      <SkyCanvas />

      {/* No ground of its own: this is the one section that lets the sky
          through. */}
      <section className="grain hero-sticky" aria-label={site.teamName}>
        <Defs />
        <Sunrise />

        <div className="container-page hero-wrap">
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

        <p
          aria-hidden
          className="hero-hint absolute bottom-5 left-1/2 z-[3] flex -translate-x-1/2 items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-haze-400"
        >
          <span className="block h-7 w-px bg-gradient-to-b from-brand-300 to-transparent" />
          Scroll
        </p>
      </section>
    </div>
  );
}
