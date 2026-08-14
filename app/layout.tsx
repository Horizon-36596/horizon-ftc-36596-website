import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { comingSoon, site, upcomingSeason } from '@/lib/site';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.teamName} — FTC Team ${site.teamNumber}`,
    template: `%s — ${site.teamName} (FTC ${site.teamNumber})`,
  },
  description: comingSoon
    ? `${site.teamName}, ${site.program} Team ${site.teamNumber}. Our website is being revamped for the coming ${upcomingSeason} season.`
    : site.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // In coming-soon mode there's nowhere to navigate to, so the header and
  // footer would just be dead links. The holding page supplies its own <main>.
  if (comingSoon) {
    return (
      <html lang="en" className={inter.variable}>
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
