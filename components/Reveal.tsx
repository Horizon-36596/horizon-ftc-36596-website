'use client';

import { useEffect, useRef } from 'react';

// Scroll-entrance for a block of content. The animation itself lives in
// globals.css on the [data-reveal] attribute — this component only flips the
// attribute to "shown", then stops observing.
//
// Deliberately not a motion library: the project takes no new dependencies, and
// one shared pattern is cheaper than a runtime animation engine for what amounts
// to a fade-and-rise.
//
// Three layers of safety, because content that is invisible until JavaScript
// says otherwise is a real way to ship a blank page:
//
//   1. The hidden state is gated behind a `js` class that an inline script in
//      the document head adds. No JavaScript, no hidden state — the page is
//      simply visible.
//   2. On mount, anything already inside the viewport is shown immediately
//      rather than waiting on an observer callback.
//   3. An observer always delivers one callback per target as soon as it starts
//      observing, whether or not the target is intersecting. If that first
//      callback never arrives, intersection reporting is broken in this browser
//      and the element is revealed outright rather than stranded.
//
// prefers-reduced-motion is handled in CSS, so nothing here branches on it.
const FAILSAFE_MS = 1200;

export function Reveal({
  children,
  /** Milliseconds to stagger this item behind its neighbours. */
  delay = 0,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => {
      el.dataset.reveal = 'shown';
    };

    // Already on screen, or the browser can't observe: show it now.
    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView || typeof IntersectionObserver === 'undefined') {
      show();
      return;
    }

    // Set by the first callback of any kind, which proves the observer works.
    let observerResponded = false;

    const observer = new IntersectionObserver(
      (entries) => {
        observerResponded = true;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show();
          observer.unobserve(entry.target);
        }
      },
      // Fire a little before the element reaches the fold so the motion has
      // finished by the time it is properly in view.
      { rootMargin: '0px 0px -12% 0px', threshold: 0.1 },
    );

    observer.observe(el);

    // Only rescues the broken-observer case. A working observer answers within
    // a frame, so a still-scrolling page keeps its entrance animation.
    const failsafe = window.setTimeout(() => {
      if (!observerResponded) show();
    }, FAILSAFE_MS);

    return () => {
      window.clearTimeout(failsafe);
      observer.disconnect();
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error — one ref type across the small set of allowed tags.
      ref={ref}
      data-reveal=""
      style={
        delay
          ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={className}
    >
      {children}
    </Tag>
  );
}
