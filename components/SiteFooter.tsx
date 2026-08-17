import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/site';
import { asset } from '@/lib/basePath';
import { ArrowUpRight, Instagram, Mail } from '@/components/Icon';

// The footer carries the last horizon: the wordmark sits above a full-width
// sunrise rule, with the sitemap and contact routes below it.
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-night-700/60 bg-night-925">
      <div
        aria-hidden
        className="glow-horizon pointer-events-none absolute inset-x-0 bottom-0 h-64 opacity-70"
      />

      <div className="container-page relative py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            {/* The white wordmark rather than the gradient one: the sunrise
                rule sits a few rows below, and two gradient elements in the
                same block read as a second logo moment instead of a sign-off. */}
            <Link href="/" className="group inline-block">
              <span className="sr-only">{site.teamName} home</span>
              <Image
                src={asset('/brand/horizon-wordmark-white.svg')}
                alt=""
                aria-hidden
                width={337}
                height={79}
                unoptimized
                className="h-8 w-auto opacity-80 transition-opacity duration-200 group-hover:opacity-100"
              />
            </Link>
            <p className="mt-5 font-prose text-[0.9375rem] leading-relaxed text-haze-400">
              {site.program} Team{' '}
              <span className="font-mono text-haze-300">{site.teamNumber}</span>
              , a community nonprofit team in {site.location}, founded in{' '}
              <span className="font-mono text-haze-300">
                {site.foundedYear}
              </span>
              .
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="eyebrow">Pages</h2>
              <ul className="mt-4 space-y-2.5">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    {/* inline-block + padding so the target clears the 24px
                        floor; the bare inline link measured 21px tall. */}
                    <Link
                      href={item.href}
                      className="inline-block py-1 text-[0.9375rem] text-haze-300 transition-colors duration-200 hover:text-brand-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow">Reach us</h2>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${site.businessEmail}`}
                    className="group inline-flex items-center gap-2 py-1 text-[0.9375rem] text-haze-300 transition-colors duration-200 hover:text-brand-300"
                  >
                    <Mail size={17} className="text-haze-500" />
                    {site.businessEmail}
                  </a>
                </li>
                {site.socials.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 py-1 text-[0.9375rem] text-haze-300 transition-colors duration-200 hover:text-brand-300"
                    >
                      <Instagram size={17} className="text-haze-500" />
                      {s.handle}
                      <ArrowUpRight
                        size={14}
                        className="text-haze-500 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div aria-hidden className="rule-horizon mt-14" />

        <div className="mt-6 flex flex-col gap-2 text-[0.8125rem] text-haze-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.foundedYear}–2027 {site.teamName}. Tax-deductible giving is
            handled through {site.fiscalSponsor}, a 501(c)(3).
          </p>
          <p>
            Not affiliated with or endorsed by <em>FIRST</em>.
          </p>
        </div>
      </div>
    </footer>
  );
}
