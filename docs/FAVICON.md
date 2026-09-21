# Favicon

Two files, deliberately:

| File              | Who uses it                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `app/icon.svg`    | Chrome, Firefox, Edge — any browser that accepts an SVG favicon      |
| `app/favicon.ico` | **Safari**, which ignores SVG favicons entirely, plus older browsers |

Next emits a `<link rel="icon">` for each; browsers pick. Without the `.ico`,
Safari renders no icon at all.

## Why the icon is not the lockup

The lockup in `public/brand/` is about 2.3:1 — wide and flat. Fitting all of it
into a square leaves the ring small, and its stroke then renders below one
device pixel at 16px, where antialiasing halves its opacity and it reads as a
smudge. That follows from the aspect ratio, so cropping cannot fix it.

`app/icon.svg` is therefore drawn square-first on a 100-unit grid, with the ring
stroke at 11 units (~1.8px at 16px) and the horizon at 8.5 (~1.4px). Same idea,
same gradients, same warm ramp — different drawing.

## Regenerating favicon.ico

**The `.ico` is a raster snapshot of `app/icon.svg`. If the mark changes, it must
be regenerated or the two will silently disagree** — and Safari users will be the
only ones who see the stale one.

It holds 16/24/32/48 entries, each rendered natively from the vector at that size
rather than downscaled from one large bitmap, in 32-bit BGRA with an AND mask.

The sizes were rasterised in a browser (the most accurate SVG renderer available,
and the same engine that displays the result) and packed with a short Python
script. To redo it:

1. Serve the site locally and open it.
2. In the console, rasterise `/icon.svg` to a canvas at each size and read back
   `getImageData`.
3. Pack the RGBA buffers into an `.ico` — ICONDIR, then one ICONDIRENTRY per
   size, then `BITMAPINFOHEADER` + bottom-up BGRA + 1bpp AND mask per image.
   Note `biHeight` is **twice** the pixel height, because it counts the mask.
4. Verify by reopening with Pillow: `Image.open('app/favicon.ico').ico.sizes()`
   should list all four, and each frame should still have an alpha channel.

Any tool that renders SVG at native size per entry works equally well —
ImageMagick or `sharp` are fine if either is available. What matters is that the
entries are rendered per size, not resampled from one, and that transparency
survives.
