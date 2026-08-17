'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { site } from '@/lib/site';
import { BrandMark } from '@/components/BrandMark';
import { Close, Menu } from '@/components/Icon';

// Conventional chrome on purpose: logo top-left, nav top-right, sticky. Jakob's
// law applies to navigation even when the rest of the page is doing something
// less expected.
//
// The mobile panel is a plain absolutely-positioned sheet rather than a portal
// or a dialog polyfill — there is one of them, it holds five links, and it
// closes on route change and on Escape.
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on navigation, so following a link never leaves the sheet up.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Escape closes; body scroll locks while the sheet is open.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-night-700/60 bg-night-950/80 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-[0.9375rem] font-medium tracking-tight text-haze-50"
        >
          <BrandMark
            size={28}
            className="transition-transform duration-300 ease-out-quart group-hover:scale-110"
          />
          <span>{site.teamName}</span>
          <span className="font-mono text-[0.8125rem] text-haze-500">
            {site.teamNumber}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`rounded-full px-3.5 py-2 text-[0.875rem] transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-brand-300'
                  : 'text-haze-300 hover:text-haze-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={site.supportHref}
            className="ml-2 rounded-full border border-brand-500/50 px-4 py-2 text-[0.875rem] font-medium text-brand-300 transition duration-200 ease-out-quart hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500/10"
          >
            Support us
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-haze-100 transition-colors hover:bg-night-850 md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-night-700/60 bg-night-950 md:hidden"
        >
          <nav aria-label="Main" className="container-page flex flex-col py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`flex min-h-[52px] items-center border-b border-night-800 text-[1.0625rem] ${
                  isActive(item.href) ? 'text-brand-300' : 'text-haze-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href={site.supportHref} className="btn-primary mt-6">
              Support us
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
