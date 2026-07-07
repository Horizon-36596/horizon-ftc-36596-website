import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-night-950/70 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight text-white"
        >
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_12px] shadow-brand transition group-hover:scale-125"
          />
          {site.teamName}
          <span className="text-slate-500">· {site.teamNumber}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
