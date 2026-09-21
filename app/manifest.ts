import type { MetadataRoute } from 'next';
import { asset } from '@/lib/basePath';
import { site } from '@/lib/site';

// The web manifest, served at /manifest.webmanifest. Next emits the <link> for
// it from this file by convention, so nothing needs wiring up by hand.
//
// It is what Android reads when someone saves the site to their home screen:
// without it there is no name, no colour and no icon to install with, and the
// install prompt never appears at all.
//
// Icon paths go through asset() because they are written by hand here rather
// than resolved by Next, and GitHub Pages can serve the site under a sub-path.

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.teamName} — ${site.program} Team ${site.teamNumber}`,
    short_name: site.teamName,
    description: site.description,
    start_url: asset('/'),
    scope: asset('/'),
    display: 'standalone',
    // Both the brand ground, so the splash screen and the address bar match
    // the page rather than flashing white before it paints.
    background_color: '#17061D',
    theme_color: '#17061D',
    icons: [
      {
        src: asset('/icons/icon-192.png'),
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: asset('/icons/icon-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        // Drawn with the mark well inside the centre, because Android crops a
        // maskable icon to whatever shape the launcher uses.
        src: asset('/icons/icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
