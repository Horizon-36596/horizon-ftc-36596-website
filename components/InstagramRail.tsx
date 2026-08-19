'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { site } from '@/lib/site';
import { ArrowRight, ArrowUpRight, Instagram } from '@/components/Icon';
import {
  FEED_ENDPOINT,
  fallbackPosts,
  normalizePosts,
  type InstagramPost,
} from '@/content/instagram';

// The Instagram rail.
//
// A horizontal scroll-snap track, not a JS carousel: native scrolling means it
// already works with a trackpad, a touch drag, a shift-wheel, and the keyboard
// before a line of our own code runs. The arrows scroll it by one card. Cards
// carry the same rounded-lg corners, solid hairline border and lifted shadow
// as the photo pair in the FTC section, so the two read as the same family.
//
// Tiles are plain <img>, not next/image: the URLs come from a CDN at runtime, so
// their dimensions are unknown at build time and there is nothing for the image
// optimizer to do in a static export anyway. Every tile is a fixed square box
// with the image cropped into it, which is what keeps the rail from reflowing as
// posts of different shapes load.

const CARD = 'w-[15rem] shrink-0 snap-start sm:w-[17rem]';

export function InstagramRail() {
  const [posts, setPosts] = useState<InstagramPost[]>(fallbackPosts);
  const [failed, setFailed] = useState(false);
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Live fetch. Runs in the browser on every visit, which is what makes new
  // posts appear without a rebuild.
  useEffect(() => {
    if (!FEED_ENDPOINT) return;

    const controller = new AbortController();

    fetch(FEED_ENDPOINT, { signal: controller.signal })
      .then((r) =>
        r.ok ? r.json() : Promise.reject(new Error(String(r.status))),
      )
      .then((json) => {
        const next = normalizePosts(json);
        if (next.length > 0) setPosts(next);
        else setFailed(true);
      })
      .catch((error) => {
        if ((error as Error).name !== 'AbortError') setFailed(true);
      });

    return () => controller.abort();
  }, []);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    measure();
    const el = trackRef.current;
    if (!el) return;
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure, posts.length]);

  function nudge(direction: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    // One card plus its gap, so a click always lands on a snap point.
    const card = el.querySelector('li');
    const step = card ? card.clientWidth + 16 : el.clientWidth * 0.8;
    // Someone who has asked for less motion gets the jump, not the glide.
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    el.scrollBy({
      left: step * direction,
      behavior: reduced ? 'auto' : 'smooth',
    });
    // The scroll event is the primary signal for the arrow states, but a
    // programmatic smooth scroll does not reliably emit one in every engine.
    // Re-measure once the animation has had time to settle so the arrows can
    // never be left claiming there is more rail than there is.
    window.setTimeout(measure, 600);
  }

  // No feed configured, or the feed gave us nothing: one card pointing at the
  // account. Better than an empty rail, and it is still a real route out.
  if (posts.length === 0) {
    return (
      <div className="card grain relative flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
        <div>
          <p className="font-prose text-[1.0625rem] leading-relaxed text-haze-300">
            {failed
              ? 'Our feed did not load just now. The posts are all on Instagram.'
              : 'We post build progress, competitions, and the shop on Instagram.'}
          </p>
        </div>
        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noreferrer"
          className="btn-primary shrink-0"
        >
          <Instagram size={17} />
          {site.socials[0].handle}
        </a>
      </div>
    );
  }

  return (
    <div>
      <ul
        ref={trackRef}
        onScroll={measure}
        // scrollbar is hidden on purpose; the arrows and the drag both work,
        // and a visible bar under a photo rail reads as a bug.
        className="-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto scroll-smooth px-4 pb-1 [scrollbar-width:none] motion-reduce:scroll-auto sm:-mx-6 sm:scroll-pl-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <li key={post.permalink} className={CARD}>
            <a
              href={post.permalink}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg border border-night-700 bg-night-900 shadow-lifted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.image}
                  alt={post.caption ?? 'A post from Horizon on Instagram'}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 ease-out-quart group-hover:scale-[1.03]"
                />

                {post.isVideo ? (
                  <span
                    aria-hidden
                    className="absolute right-3 top-3 rounded-full bg-night-950/70 px-2 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-haze-100 backdrop-blur-sm"
                  >
                    Video
                  </span>
                ) : null}
              </div>

              {post.caption ? (
                <p className="mt-3 line-clamp-2 font-prose text-[0.9375rem] leading-snug text-haze-400 transition-colors group-hover:text-haze-300">
                  {post.caption}
                </p>
              ) : null}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-7 flex items-center justify-between gap-4">
        <a
          href={site.socials[0].href}
          target="_blank"
          rel="noreferrer"
          className="btn-link group"
        >
          {site.socials[0].handle}
          <ArrowUpRight
            size={14}
            className="transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>

        <div className="flex gap-2">
          <RailButton
            label="Previous posts"
            disabled={atStart}
            onClick={() => nudge(-1)}
            flip
          />
          <RailButton
            label="More posts"
            disabled={atEnd}
            onClick={() => nudge(1)}
          />
        </div>
      </div>
    </div>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  flip = false,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  flip?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-night-700 text-haze-200 transition duration-200 ease-out-quart enabled:hover:border-brand-500/50 enabled:hover:bg-brand-500/10 enabled:hover:text-brand-300 disabled:opacity-35"
    >
      <ArrowRight size={17} className={flip ? 'rotate-180' : undefined} />
    </button>
  );
}
