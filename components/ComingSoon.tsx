import Image from 'next/image';
import { asset } from '@/lib/basePath';
import { site, upcomingSeason } from '@/lib/site';

// The holding page. Deliberately just the logo, the team number, and the
// message — a holding page that tries to do more reads as a broken site rather
// than a deliberate one.
//
// Also rendered for 404s, so links to the parked pages (/team, /robots, …) land
// here instead of on an error.
export function ComingSoon() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-6 py-20 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-[42rem] bg-[radial-gradient(60%_60%_at_50%_0%,theme(colors.brand.500/20),transparent_70%)]"
      />

      <div className="relative flex flex-col items-center">
        <Image
          src={asset('/brand/horizon-mark-gradient.svg')}
          alt=""
          aria-hidden
          width={96}
          height={96}
          unoptimized
          priority
          className="animate-fade-up drop-shadow-[0_0_28px_theme(colors.brand.500/45)]"
          style={{ animationDelay: '0ms' }}
        />

        <h1
          className="mt-10 w-full max-w-lg animate-fade-up"
          style={{ animationDelay: '80ms' }}
        >
          <span className="sr-only">{site.teamName}</span>
          <Image
            src={asset('/brand/horizon-wordmark.svg')}
            alt=""
            aria-hidden
            width={1347}
            height={316}
            unoptimized
            priority
            className="h-auto w-full"
          />
        </h1>

        <p
          className="mt-8 animate-fade-up text-sm font-semibold uppercase tracking-[0.2em] text-brand-300"
          style={{ animationDelay: '160ms' }}
        >
          {site.program} · Team {site.teamNumber}
        </p>

        <div
          aria-hidden
          className="mt-10 h-px w-24 animate-fade-up bg-gradient-to-r from-transparent via-brand/50 to-transparent"
          style={{ animationDelay: '240ms' }}
        />

        <p
          className="mt-10 max-w-xl animate-fade-up text-lg leading-relaxed text-slate-300"
          style={{ animationDelay: '320ms' }}
        >
          We are currently revamping our website for the coming{' '}
          <span className="font-semibold text-white">{upcomingSeason}</span>{' '}
          season. Thank you for your patience.
        </p>
      </div>
    </main>
  );
}
