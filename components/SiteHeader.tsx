import Link from 'next/link';
import { site } from '@/lib/site';
import { BrandMark } from '@/components/BrandMark';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-night-950/70 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-2.5 font-semibold tracking-tight text-white"
        >
          <BrandMark
            size={30}
            className="transition duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_theme(colors.brand.500/60)]"
          />
          {site.teamName}
          <span className="hidden text-slate-500 sm:inline">
            · {site.teamNumber}
          </span>
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
