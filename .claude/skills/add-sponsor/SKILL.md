---
name: add-sponsor
description: Add a sponsor or supporter to the Horizon website — logo, tier, and what they gave — matching the existing single-ink logo wall. Use when someone says a company sponsored, donated to, or supports the team and should appear on the site.
---

# Adding a sponsor

Every sponsor shows up in two places from one entry: the logo strip on the home
page and the wall on `/sponsors`. Both read `content/sponsors.ts`. The logo
lives in `components/SponsorLogo.tsx`.

## 1. Get the facts right first

Ask only for what you cannot find. You need:

- **Name**, as the company writes it (`FRCTees`, `PTC`).
- **Tier**, from what they gave. Thresholds are in `tiers` in
  `content/sponsors.ts`, and they are the sponsorship package's own:

  | Given   | Tier    |
  | ------- | ------- |
  | $100+   | Bronze  |
  | $500+   | Silver  |
  | $1,000+ | Gold    |
  | $2,500+ | Diamond |

  Software or tooling given free through a nonprofit programme (GitHub, Canva)
  is not a donation and goes in `NONPROFIT_TIER`, whatever its list price.

- **`gave`**: what they actually provided, in their own terms, shown under the
  logo. `'Charge 3B chargers'`, `'$500 of aluminum sheet and plate stock'`,
  `'Monetary support'`. Never invent the form of a gift. If you are told an
  amount but not whether it was money, parts or a discount, write only what you
  were told (`'$500 sponsorship'`) and say in the PR that it can be made more
  specific.
- **`href`**: the company's own homepage.

No sponsor goes on the site until it is real. Do not add a company because it
was approached, or might give.

## 2. The logo

The wall prints every logo in one ink on the dark ground, like a sponsor board.
Each logo is the company's own artwork, unchanged in shape. Only the fill is
ours. Never redraw a mark, swap its typeface, or use a third-party "logo
download" site.

**Find the company's own file.** In order of preference:

1. An SVG in their site's header, a press or brand page, or their favicon.
2. Vector art inside one of their own PDFs: brochures, case studies, spec
   sheets. Search `site:<domain> filetype:pdf`. PyMuPDF
   (`pymupdf`, installed) lists each page's images and vector drawings, and
   PDFs often hold a much bigger copy of the logo than the website does.
   Protocase's came from their URC 2018 design-tips PDF at 1483 px, where
   their site only had 150 px.
3. Their biggest official raster, traced.

Their server may reject `curl`'s default user agent with a 406 error. Send a
browser one.

**Turn it into paths.** For an SVG, take the path data as-is. For a raster,
trace it in the scratchpad, never in the repo:

```bash
pnpm add potrace   # inside a scratchpad folder with its own package.json
```

- Split the image into one black-on-white mask per tone. The PDF's soft mask
  (`smask`) is the alpha channel. Use it, or white artwork disappears.
- Open each mask by 3 px (`MaxFilter(3)` then `MinFilter(3)` on the image) so
  anti-aliased seams between tones do not become slivers of their own.
- Trace with `turdSize: 20, optTolerance: 0.3`. Use `alphaMax: 1` for type and
  0.4 for straight-edged geometry.
- Round coordinates to one decimal.
- Check the subpath count against the drawing. Every letter counter and every
  hole should be accounted for.

**Shapes with holes need `fillRule: 'evenodd'`.** That covers traced marks and
any letter with a counter, such as O, A, P or R. Without it, the holes fill solid.

**Logos with several tones.** Single ink does not mean flat. If the logo's
shape depends on tone, as Protocase's shaded boxes do, give each tone its own
path and draw it as a tint of the ink: `{ d, opacity }` in the `path` array.
Map tones by their contrast with the ground, the way the original sits on
white: darkest at full ink, the palest furthest back. Merge any tones that end
up the same.

**Add it to `components/SponsorLogo.tsx`:**

1. A `<NAME>_PATH` constant, with a comment saying exactly where the artwork
   came from.
2. Its key in `SponsorLogoKey`.
3. An entry in `LOGOS`:
   - `viewBox`: cropped to the ink and nothing else.
   - `ratio`: viewBox width ÷ height.
   - `optical`: start at 1 for a compact round or square mark and about 0.65 for
     a long wordmark. Then tune it by eye against the logos already on the wall
     until it carries the same weight.
   - `fillRule`, if it is needed.

Save the original-colour version, as paths, at `public/sponsors/<key>.svg` for
print and the sponsorship deck.

## 3. The entry

Add a `Sponsor` to `currentSponsors` in `content/sponsors.ts`, next to others of
its tier. The wall orders tiers itself through `sponsorTierOrder`.

## 4. Check it the way a visitor will

The App Lead does not read code. They look at the site. So you look first:

- Start the dev server with `preview_start` `horizon-dev` on port 3001.
- Screenshot the home strip and the `/sponsors` wall at 1440 and at 390 wide.
  Use puppeteer-core with local Chrome
  (`C:/Program Files/Google/Chrome/Application/chrome.exe`) from a scratchpad
  folder, at `deviceScaleFactor: 2`. Do not add it to this repo.
- Check:
  - holes and counters are open;
  - the weight matches its neighbours;
  - the strip still wraps cleanly on mobile.
- Stop the dev server before `pnpm verify`. Its `next build` overwrites the
  dev server's `.next`, and every page then serves unstyled. If that happens,
  delete `.next` and restart the server.

## 5. Ship

- Branch `site/<sponsor>-sponsor`.
- Run `pnpm verify`.
- One commit and one PR. The PR states:
  - where the logo artwork came from;
  - the tier and the `gave` text;
  - anything assumed.
- No attribution lines.
- Merge once CI is green, then confirm the live site shows the logo.
