import Link from 'next/link';
import { site } from '@/lib/site';
import { ArrowRight } from '@/components/Icon';

// A voiced 404 rather than a bare error. The site was in coming-soon mode until
// recently, so links to /team, /robots, /sponsors, and /contact that predate the
// rebuild now resolve — and anything else lands here with somewhere to go.
export default function NotFound() {
  return (
    <div className="grain relative isolate overflow-hidden">
      <div
        aria-hidden
        className="glow-horizon pointer-events-none absolute inset-x-0 bottom-0 h-80"
      />
      <div className="container-page relative flex min-h-[70vh] flex-col justify-center py-24">
        <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-brand-300">
          404
        </p>
        <h1 className="mt-6 max-w-2xl text-display-sm font-light text-haze-50">
          Nothing at this address
        </h1>
        <p className="mt-6 max-w-lg font-prose text-[1.125rem] leading-[1.65] text-haze-300">
          The page you were after either moved or never existed. Everything{' '}
          {site.teamName} has published is one of these:
        </p>

        <ul className="mt-9 flex flex-wrap gap-3">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="btn-ghost">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="btn-link group mt-10">
          Back to the start
          <ArrowRight
            size={16}
            className="transition-transform duration-200 ease-out-quart group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </div>
  );
}
