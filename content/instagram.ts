// ---------------------------------------------------------------------------
// INSTAGRAM FEED — the one file to edit to make the home page carousel live.
//
// WHY THIS NEEDS A URL FROM YOU
//
// Instagram has no public, unauthenticated way to read an account's posts. An
// anonymous request to instagram.com/horizon36596 gets a login wall, and the
// internal JSON endpoint rate-limits immediately. So a feed that genuinely
// updates on its own has to come from somewhere that holds a token on our
// behalf. There is no version of this that needs nothing set up.
//
// Paste a JSON feed URL into FEED_ENDPOINT and the carousel goes live and stays
// live — the page fetches it in the browser on every visit, so a new post shows
// up without anyone rebuilding or redeploying the site.
//
// TWO WAYS TO GET THAT URL
//
//   1. A hosted widget service with a JSON endpoint. Behold (behold.so) has a
//      free tier that is one feed, no watermark, and returns plain JSON. Sign
//      in with the team Instagram, create a feed, copy its JSON URL.
//   2. Our own Meta app + Instagram Graph API token, if we would rather not
//      depend on anyone. More setup, and the token needs refreshing.
//
// SHAPE EXPECTED
//
// An array of objects, or an object with a `data`, `posts`, or `media` array.
// Each item needs an image URL and a link. The reader below accepts the field
// names Behold and the Graph API both use, so either drops in unchanged.
//
// Until FEED_ENDPOINT is set the section renders a designed follow-us card
// rather than an empty rail or a hole in the page.
// ---------------------------------------------------------------------------

/** JSON feed URL. Empty string = the carousel shows the follow-us card. */
export const FEED_ENDPOINT = 'https://feeds.behold.so/fNxcdbfF47R1PvaP53jm';

/**
 * How many posts the rail shows at most. Behold's free tier returns 6, which
 * is enough to overflow the rail on a desktop and therefore enough to scroll.
 */
export const MAX_POSTS = 12;

export type InstagramPost = {
  /** Image URL. Remote is fine; these are not build-time assets. */
  image: string;
  /** Link to the post itself. */
  permalink: string;
  /** Caption, trimmed for display. Optional. */
  caption?: string;
  /** True for video posts, which get a play affordance. */
  isVideo?: boolean;
  /** Number of images when the post is a carousel, so the tile can say so. */
  albumCount?: number;
  /** ISO timestamp, shown as a short date under the tile. */
  timestamp?: string;
};

/**
 * Optional hand-maintained posts, used only when FEED_ENDPOINT is empty. Handy
 * for pinning a couple of posts before the live feed is wired up — fill in the
 * permalink and a local image under /public/instagram/.
 */
export const fallbackPosts: InstagramPost[] = [];

/**
 * Whether the home page renders the Instagram section at all.
 *
 * With no feed and no fallback posts there is nothing to show, and a section
 * heading sitting above a card that only says "we are on Instagram" is worse
 * than no section: it takes the space of real content and delivers a link the
 * footer already carries. So the whole section is omitted until there is
 * something in it. Set FEED_ENDPOINT and it returns.
 */
export const hasInstagramFeed =
  FEED_ENDPOINT.length > 0 || fallbackPosts.length > 0;

// ---------------------------------------------------------------------------
// Feed reader. Normalizes the shapes Behold and the Graph API return so
// FEED_ENDPOINT can point at either without touching the component.
// ---------------------------------------------------------------------------

type Unknown = Record<string, unknown>;

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

/**
 * Pulls a URL out of one entry in Behold's `sizes` map.
 *
 * Each entry is an OBJECT — `{ width, height, mediaUrl }` — not a string. This
 * matters more than it looks: miss it and the reader falls through to the
 * post's own `mediaUrl`, which points at cdninstagram.com. Those URLs are
 * signed and expire, so the rail would look correct on the day it shipped and
 * fill with broken images a few days later.
 */
function sizeUrl(value: unknown): string | undefined {
  if (typeof value === 'string') return str(value);
  if (value && typeof value === 'object') {
    return str((value as Unknown).mediaUrl) ?? str((value as Unknown).url);
  }
  return undefined;
}

export function normalizePosts(raw: unknown): InstagramPost[] {
  const list: unknown[] = Array.isArray(raw)
    ? raw
    : ((): unknown[] => {
        const o = (raw ?? {}) as Unknown;
        for (const key of ['data', 'posts', 'media']) {
          if (Array.isArray(o[key])) return o[key] as unknown[];
        }
        return [];
      })();

  return list
    .map((item): InstagramPost | null => {
      const o = (item ?? {}) as Unknown;

      // Behold lets a post be hidden from the feed without deleting it on
      // Instagram. Respect that: anything not explicitly visible is dropped.
      const visibility = str(o.visibility);
      if (visibility && visibility !== 'visible') return null;

      const type = str(o.mediaType) ?? str(o.media_type);
      const isVideo = type ? /video|reel/i.test(type) : undefined;
      // A carousel holds several images behind the one we show, which is worth
      // signalling so the tile does not look like the whole post.
      const children = Array.isArray(o.children) ? o.children.length : 0;
      const albumCount =
        children > 1 || (type ? /carousel|album/i.test(type) : false)
          ? Math.max(children, 2)
          : undefined;

      // Prefer Behold's re-hosted, pre-resized webp on its own CDN. Only fall
      // back to the raw Instagram URL if there is nothing else, and see
      // `sizeUrl` above for why that fallback is a last resort.
      const sizes = (o.sizes ?? {}) as Unknown;
      const image =
        sizeUrl(sizes.large) ??
        sizeUrl(sizes.medium) ??
        sizeUrl(sizes.full) ??
        sizeUrl(sizes.small) ??
        str(o.thumbnailUrl) ??
        str(o.thumbnail_url) ??
        str(o.mediaUrl) ??
        str(o.media_url) ??
        str(o.image);

      const permalink =
        str(o.permalink) ?? str(o.url) ?? str(o.link) ?? undefined;

      if (!image || !permalink) return null;

      // `prunedCaption` is the caption with trailing hashtag and mention blocks
      // stripped, which is what we want under a tile.
      const caption =
        str(o.prunedCaption) ?? str(o.caption) ?? str(o.text) ?? undefined;

      return {
        image,
        permalink,
        caption: caption?.replace(/\s+/g, ' ').trim(),
        isVideo,
        albumCount,
        timestamp: str(o.timestamp),
      };
    })
    .filter((p): p is InstagramPost => p !== null)
    .slice(0, MAX_POSTS);
}
