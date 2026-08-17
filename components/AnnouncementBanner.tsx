import { site } from '@/lib/site';

// A thin notice above the header, for the one thing every visitor should know
// before they read anything else. Deliberately not dismissible and not a
// toast: it is a state of the site, not an event, and it should still be there
// when someone comes back tomorrow.
//
// Clear it by setting `announcement` to null in lib/site.ts.

export function AnnouncementBanner() {
  if (!site.announcement) return null;

  return (
    <div
      role="status"
      className="relative z-50 border-b border-brand-500/25 bg-brand-800/25"
    >
      <p className="container-page flex items-center justify-center gap-2.5 py-2 text-center text-[0.8125rem] leading-snug text-haze-200">
        <span
          aria-hidden
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400"
        />
        {site.announcement}
      </p>
    </div>
  );
}
