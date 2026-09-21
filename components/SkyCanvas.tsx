'use client';

import { useEffect, useRef } from 'react';

// The sky behind the hero, and the clock the sunrise runs on.
//
// One fixed canvas holding a vertical gradient plus a warm glow where the sun
// is. Both are interpolated between a night set of stops and a dawn set as the
// reader scrolls, so the opening of the page is a single continuous movement
// rather than a loop that plays whether anyone is watching or not.
//
// It also writes two custom properties to the document element, which is how
// the CSS in globals.css and the sun in <Hero> stay in step with the painting:
//
//   --p  progress through the whole document, 0 at the top, 1 at the bottom.
//        Drives how far the sky has warmed.
//   --q  progress through the hero's scroll track, eased. Drives how far the
//        sun has risen, the strength of the warmth at the horizon, and the
//        fade of the scroll hint.
//
// Painting is driven by the scroll event through one queued animation frame —
// there is no idle loop, so the page costs nothing once the reader stops. A
// repaint is skipped entirely when neither value has moved enough to see.
//
// Canvas rather than CSS gradients because the stops are interpolated per
// frame: four moving colour stops plus a radial wash is one fill each here,
// against a stack of layers the compositor would have to re-rasterise.

// Colour stops at each end of the rise, top of the screen to bottom.
const NIGHT: RGB[] = [
  [8, 1, 12],
  [18, 4, 26],
  [30, 8, 32],
  [48, 14, 44],
];
const DAWN: RGB[] = [
  [26, 7, 34],
  [58, 18, 48],
  [122, 42, 68],
  [210, 77, 70],
];
const STOPS = [0, 0.5, 0.8, 1];

// Where the glow sits, matching --sun-x in globals.css on each side of the
// 820px breakpoint.
const SUN_X_WIDE = 0.72;
const SUN_X_NARROW = 0.5;
const WIDE_FROM = 820;

// Below this, a repaint would not be visible.
const EPSILON = 0.002;

type RGB = [number, number, number];

const mix = (a: RGB, b: RGB, t: number): RGB =>
  a.map((c, i) => Math.round(c + (b[i] - c) * t)) as RGB;

export function SkyCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const track = document.querySelector<HTMLElement>('[data-hero-track]');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let lastP = -1;
    let lastQ = -1;
    let queued = false;

    function size() {
      // Capped at 2: past that the extra pixels cost more than they show on a
      // soft gradient.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastP = -1;
    }

    function paint(p: number, q: number) {
      const sky = ctx!.createLinearGradient(0, 0, 0, height);
      STOPS.forEach((stop, i) => {
        const [r, g, b] = mix(NIGHT[i], DAWN[i], p);
        sky.addColorStop(stop, `rgb(${r} ${g} ${b})`);
      });
      ctx!.fillStyle = sky;
      ctx!.fillRect(0, 0, width, height);

      // The light the sun itself throws, brightening with whichever of the two
      // is further along.
      const x = width * (width >= WIDE_FROM ? SUN_X_WIDE : SUN_X_NARROW);
      const y = height * 0.78;
      const warm = 0.25 + 0.45 * Math.max(p, q);
      const glow = ctx!.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        Math.max(width, height) * 0.55,
      );
      glow.addColorStop(0, `rgb(255 203 92 / ${warm * 0.55})`);
      glow.addColorStop(0.35, `rgb(248 106 67 / ${warm * 0.35})`);
      glow.addColorStop(1, 'rgb(177 56 72 / 0)');
      ctx!.fillStyle = glow;
      ctx!.fillRect(0, 0, width, height);
    }

    function frame() {
      queued = false;

      const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable));

      const range = Math.max(
        1,
        (track?.offsetHeight ?? 0) - window.innerHeight,
      );
      const raw = Math.min(1, Math.max(0, window.scrollY / range));
      // Decelerating, so the sun slows as it settles on the line.
      const q = 1 - Math.pow(1 - raw, 2);

      if (Math.abs(p - lastP) < EPSILON && Math.abs(q - lastQ) < EPSILON)
        return;

      root.style.setProperty('--p', p.toFixed(3));
      root.style.setProperty('--q', q.toFixed(3));
      paint(p, q);
      lastP = p;
      lastQ = q;
    }

    const ask = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(frame);
    };

    const onResize = () => {
      size();
      if (reduce) paint(0.35, 1);
      else ask();
    };

    size();

    // Nothing rises or warms on scroll for a reader who has asked for less
    // motion: one painting, at the state the hero rests in.
    if (reduce) {
      root.style.setProperty('--p', '0.35');
      root.style.setProperty('--q', '1');
      paint(0.35, 1);
    } else {
      ask();
      window.addEventListener('scroll', ask, { passive: true });
    }
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', ask);
      window.removeEventListener('resize', onResize);
      root.style.removeProperty('--p');
      root.style.removeProperty('--q');
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="hero-sky" />;
}
