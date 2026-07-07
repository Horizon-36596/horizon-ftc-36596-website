import Link from 'next/link';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10 text-sm text-slate-400">
      <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p>
          <span className="font-semibold text-slate-200">{site.teamName}</span>{' '}
          · {site.program} Team {site.teamNumber}
        </p>
        <nav className="flex items-center gap-4">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
