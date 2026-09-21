# Social and touch images

| File                      | Used by                                               |
| ------------------------- | ----------------------------------------------------- |
| `app/opengraph-image.jpg` | Link previews — Slack, Discord, iMessage, X, Facebook |
| `app/apple-icon.png`      | iOS home screen and Safari bookmarks                  |

Next picks both up by filename convention and emits the tags itself: `og:image`,
`twitter:image` (with type/width/height), and `apple-touch-icon`.

## metadataBase is load-bearing

Link previews need **absolute** URLs. Without `metadataBase`, Next resolves
`og:image` against `http://localhost:3000`, and no crawler can fetch that — the
card silently stays blank, which looks identical to having no image at all.

It is set in `app/layout.tsx` from `site.url`, which is the origin in
`public/CNAME` (`https://horizon36596.org`). **If the domain changes, change
`site.url` too**, or previews break without any build error.

## The card

1200x630 — the size every crawler expects. Dark ground, a warm glow rising off a
horizon curve, the wordmark from `public/brand/`, and two lines of type:

- eyebrow — JetBrains Mono 500, 21px, 5px tracking, `#FFCB5C`
- tagline — Jost 300, 42px, white at 82%

JPEG at quality 92. It was PNG first, at 683KB; the gradients compress terribly
losslessly and JPEG gets the same card to ~55KB.

## The touch icon

180x180, and **deliberately opaque** — it paints the `#17061D` ground behind the
mark. iOS composites touch icons on black and applies its own rounded mask, so a
transparent icon looks broken and a pre-rounded one gets clipped twice. The mark
sits at 76% of the square to stay inside that mask.

## Regenerating

Both are raster snapshots. **If the mark or wordmark changes, regenerate them**
or they silently drift from the site.

They are composed in two stages, for a specific reason:

1. **A browser draws the background, gradients and wordmark.** The wordmark is
   vector paths, which the browser renders faithfully.
2. **Python/Pillow draws the text**, using the variable TTFs of Jost and
   JetBrains Mono with `set_variation_by_axes` to reach the right weights.

Stage 2 exists because a headless browser canvas will happily report a webfont's
metrics via `measureText` while rasterising a fallback serif — the text looks
wrong but every in-browser check passes. Pillow has no letter-spacing, so the
eyebrow is drawn glyph by glyph with a manual advance.

Any toolchain that renders SVG and embeds real fonts works instead — ImageMagick
or `sharp` are fine. What matters is that you **look at the output** and confirm
the tagline is geometric (Jost's single-storey `g`) and not a serif.
