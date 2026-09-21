import type { MetadataRoute } from 'next';

import { asset } from '@/lib/basePath';
import { site } from '@/lib/site';

// Makes the site installable — "Add to home screen" on Android and Chrome.
// Without it the browser has no name, colour or icon to install with and falls
// back to a screenshot and the page title.
//
// Static export has no server to generate this per request.
export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.teamName} — ${site.program} Team ${site.teamNumber}`,
    // What sits under the icon on a home screen. Anything much longer than
    // about 12 characters gets truncated with an ellipsis.
    short_name: site.teamName,
    description: site.description,

    // Both go through asset() so they stay correct if the site is ever served
    // from a sub-path again instead of the apex domain in public/CNAME.
    start_url: asset('/'),
    scope: asset('/'),

    display: 'standalone',
    // night-950, the official brand ground — the same colour body uses, so the
    // splash screen and browser chrome match the site instead of flashing white.
    background_color: '#17061d',
    theme_color: '#17061d',

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
        // Android clips this to its own shape, so the mark is drawn smaller to
        // stay inside the safe zone. Without a maskable icon the platform
        // crops an `any` icon and the horizon can lose its ends.
        src: asset('/icons/icon-maskable-512.png'),
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
