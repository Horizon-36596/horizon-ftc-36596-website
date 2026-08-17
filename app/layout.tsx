import type { Metadata } from 'next';
import { JetBrains_Mono, Jost, Newsreader } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

// Jost — geometric, Futura lineage. Chosen because the Horizon wordmark and sun
// mark are built from circles and arcs and this is the same construction.
const display = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

// Newsreader — every narrative paragraph on the site is set in this. A serif is
// the clearest possible signal that a person wrote the words.
const prose = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-prose',
  display: 'swap',
});

// Figures, team numbers, tier prices, counts. Always tabular.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.teamName} — ${site.program} Team ${site.teamNumber}`,
    template: `%s — ${site.teamName} (FTC ${site.teamNumber})`,
  },
  description: site.description,
  openGraph: {
    title: `${site.teamName} — ${site.program} Team ${site.teamNumber}`,
    description: site.description,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${prose.variable} ${mono.variable}`}
      // The inline script below adds a class before React hydrates, so the
      // server and client markup differ here by design.
      suppressHydrationWarning
    >
      <head>
        {/*
          Marks the document as scripted before anything paints. The scroll
          reveals hide their content behind this class, so a visitor without
          working JavaScript gets the whole page rather than a blank one, and a
          visitor with it never sees a flash of un-hidden content.
        */}
        {/*
          suppressHydrationWarning because browser extensions routinely inject
          their own <script> into <head> before React hydrates, which shifts
          this node in the tree and makes React report a mismatch that has
          nothing to do with the site.
        */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-2.5 focus:text-[0.875rem] focus:font-medium focus:text-night-950"
        >
          Skip to content
        </a>
        <AnnouncementBanner />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
