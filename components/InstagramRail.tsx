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
// Design notes, because each of these is a decision rather than a default:
//
//   - Native scroll-snap, not a JS carousel. A trackpad, a touch drag, a
//     shift-wheel and the keyboard all work before any of our own code runs,
//     and there is no transform to fight the browser over.
//   - Portrait 4/5 tiles, not squares. It is the ratio Instagram itself favours
//     now, it gives the rail real presence against a full-width section, and it
//     matches the portrait language the team avatars already use.
//   - The rail fades into the night ground at both edges rather than being cut
//     off by the viewport. A hard edge announces "this is a scroll box"; a fade
//     reads as more of the same thing continuing past the frame, which is the
//     whole point of a rail.
//   - Same rounded-lg corners, solid hairline border and lifted shadow as the
//     photo pair in the FTC section, so the two read as one family.
//   - The date is set in mono, like every other figure on the site.
//
// Tiles are plain <img>: the URLs come from a CDN at runtime, so their
// dimensions are unknown at build time and there is nothing for the image
// optimizer to do in a static export. Every tile is a fixed 4/5 box with the
// image cropped into it, which is what stops the rail reflowing as posts of
// different shapes load.

const CARD = 'w-[16rem] shrink-0 snap-start sm:w-[19rem]';

// Cards dissolve into the ground at both ends of the track.
const EDGE_FADE =
  '[mask-image:linear-gradient(to_right,transparent,#000_2.5rem,#000_calc(100%-2.5rem),transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_2.5rem,#000_calc(100%-2.5rem),transparent)]';

function shortDate(iso?: string) {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  // Fixed locale and format, so this renders identically on the server and the
  // client whatever the visitor's machine is set to.
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

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
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [measure, posts.length]);

  function nudge(direction: -1 | 1) {
    const el = trackRef.current;
    if (!el) return;
    // One card plus its gap, so a click always lands on a snap point.
    const card = el.querySelector('li');
    const step = card ? card.clientWidth + 20 : el.clientWidth * 0.8;
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
    // Re-measure once the animation has had time to settle.
    window.setTimeout(measure, 600);
  }

  const hasPosts = posts.length > 0;

  return (
    <div>
      {/* Header row: the account link, and on a wide screen the arrows. */}
      <div className="mb-9 flex flex-wrap items-center justify-between gap-4">
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

        {hasPosts ? (
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
        ) : null}
      </div>

      {hasPosts ? (
        <ul
          ref={trackRef}
          onScroll={measure}
          // The scrollbar is hidden on purpose: the arrows and the drag both
          // work, and a bar under a photo rail reads as a bug.
          className={`-mx-4 flex snap-x snap-mandatory scroll-pl-4 gap-5 overflow-x-auto scroll-smooth px-4 pb-2 [scrollbar-width:none] motion-reduce:scroll-auto sm:-mx-6 sm:scroll-pl-6 sm:px-6 [&::-webkit-scrollbar]:hidden ${EDGE_FADE}`}
        >
          {posts.map((post) => {
            const date = shortDate(post.timestamp);
            return (
              <li key={post.permalink} className={CARD}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-night-700 bg-night-900 shadow-lifted transition duration-500 ease-out-quart group-hover:-translate-y-1 group-hover:border-brand-500/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.caption ?? 'A post from Horizon on Instagram'}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-quart group-hover:scale-[1.04]"
                    />

                    {/* A scrim at the foot of the tile, so the page's own dark
                        ground carries up into the photography instead of every
                        tile ending in a hard rectangle of someone else's
                        colour. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-night-950/60 to-transparent"
                    />

                    {post.isVideo ? (
                      <span
                        aria-hidden
                        className="absolute right-3 top-3 rounded-full bg-night-950/70 px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-haze-100 backdrop-blur-sm"
                      >
                        Video
                      </span>
                    ) : null}
                  </div>

                  {date || post.caption ? (
                    <div className="mt-4">
                      {date ? (
                        <p className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-haze-500">
                          {date}
                        </p>
                      ) : null}
                      {post.caption ? (
                        <p className="mt-1.5 line-clamp-2 font-prose text-[0.9375rem] leading-snug text-haze-400 transition-colors duration-200 group-hover:text-haze-200">
                          {post.caption}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        // No feed configured, or the feed gave us nothing.
        <div className="card grain relative flex flex-col items-start gap-5 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <p className="font-prose text-[1.0625rem] leading-relaxed text-haze-300">
            {failed
              ? 'Our feed did not load just now. The posts are all on Instagram.'
              : 'We post build progress, competitions, and the shop on Instagram.'}
          </p>
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
      )}
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
