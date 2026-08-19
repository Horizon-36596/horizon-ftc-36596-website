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
export const FEED_ENDPOINT = '';

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
  /** ISO timestamp, shown as a short date under the tile. */
  timestamp?: string;
};

/**
 * Optional hand-maintained posts, used only when FEED_ENDPOINT is empty. Handy
 * for pinning a couple of posts before the live feed is wired up — fill in the
 * permalink and a local image under /public/instagram/.
 */
export const fallbackPosts: InstagramPost[] = [];

// ---------------------------------------------------------------------------
// Feed reader. Normalizes the shapes Behold and the Graph API return so
// FEED_ENDPOINT can point at either without touching the component.
// ---------------------------------------------------------------------------

type Unknown = Record<string, unknown>;

function str(value: unknown): string | undefined {
  return typeof value === 'string' && value.length > 0 ? value : undefined;
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
      const type = str(o.mediaType) ?? str(o.media_type);
      const isVideo = type ? /video|reel/i.test(type) : undefined;

      // Behold uses sizes/thumbnailUrl; the Graph API uses media_url and
      // thumbnail_url (the latter being the only still for a video).
      // Behold exposes a `sizes` object of pre-resized webp; the tiles are big
      // enough that `large` is the right pick, with `medium` as the fallback.
      const sizes = (o.sizes ?? {}) as Unknown;
      const image =
        str(sizes.large) ??
        str(sizes.medium) ??
        str(o.thumbnailUrl) ??
        str(o.thumbnail_url) ??
        str(o.mediaUrl) ??
        str(o.media_url) ??
        str(o.image);

      const permalink =
        str(o.permalink) ?? str(o.url) ?? str(o.link) ?? undefined;

      if (!image || !permalink) return null;

      const caption = str(o.caption) ?? str(o.text);

      return {
        image,
        permalink,
        caption: caption?.replace(/\s+/g, ' ').trim(),
        isVideo,
        timestamp: str(o.timestamp),
      };
    })
    .filter((p): p is InstagramPost => p !== null)
    .slice(0, MAX_POSTS);
}
