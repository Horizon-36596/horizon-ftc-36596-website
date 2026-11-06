import Link from 'next/link';
import { SponsorLogo } from '@/components/SponsorLogo';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight } from '@/components/Icon';
import {
  currentSponsors,
  NONPROFIT_TIER,
  sponsorTierOrder,
  type Sponsor,
  type SponsorTier,
} from '@/content/sponsors';

// The wall. Grouped by band rather than shown as one flat grid, because a
// Bronze sponsor of hardware and a company handing out free software licences
// are not the same thing and a sponsor reading this page can tell.
//
// Logos sit on the dark ground in a single ink. A logo that links out gets a
// slight lift and full-strength ink on hover; that is the whole interaction.

function LogoTile({ sponsor }: { sponsor: Sponsor }) {
  const inner = (
    <>
      {sponsor.logo ? (
        <SponsorLogo
          logo={sponsor.logo}
          name={sponsor.name}
          height={44}
          className="max-w-full text-haze-200 transition-colors duration-200 group-hover:text-haze-50"
        />
      ) : (
        <span className="text-[1.25rem] font-light text-haze-100">
          {sponsor.name}
        </span>
      )}

      <span className="mt-5 block text-[0.9375rem] text-haze-100">
        {sponsor.name}
      </span>
      <span className="mt-1 flex items-center justify-center gap-1 font-prose text-[0.9375rem] leading-snug text-haze-400">
        {sponsor.gave}
        {sponsor.href ? (
          <ArrowUpRight
            size={13}
            className="shrink-0 text-haze-500 transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        ) : null}
      </span>
    </>
  );

  const shell =
    'group flex h-full min-h-[13rem] flex-col items-center justify-center bg-night-850 px-6 py-10 text-center transition-colors duration-300';

  return sponsor.href ? (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noreferrer"
      className={`${shell} hover:bg-night-800`}
    >
      {inner}
    </a>
  ) : (
    <div className={shell}>{inner}</div>
  );
}

/**
 * Classes for the tile at `index` in a band of `count`, so the band's last row
 * has no empty cells: on two columns an odd band's last tile spans both, and
 * on three columns it spans what the row leaves over. Bands of one, two and
 * four never use three columns, so they need nothing here.
 */
function lastTileSpan(count: number, index: number) {
  if (index !== count - 1 || count < 3 || count === 4) return undefined;
  const sm = count % 2 === 1 ? 'sm:col-span-2' : '';
  const lg =
    count % 3 === 1 ? 'lg:col-span-3' : count % 3 === 2 ? 'lg:col-span-2' : '';
  // A band that fills three columns exactly still needs its sm span undone.
  const reset = count % 3 === 0 && sm ? 'lg:col-span-1' : '';
  return [sm, lg, reset].filter(Boolean).join(' ') || undefined;
}

export function SponsorWall() {
  const bands = sponsorTierOrder
    .map((tier) => ({
      tier,
      sponsors: currentSponsors.filter((s) => s.tier === tier),
    }))
    .filter((band) => band.sponsors.length > 0);

  if (bands.length === 0) return null;

  return (
    <div className="space-y-14">
      {bands.map((band, i) => (
        <Reveal key={band.tier} delay={i * 90}>
          <div className="flex items-center gap-5">
            <h3 className="eyebrow shrink-0">{band.tier}</h3>
            <span
              aria-hidden
              className="h-px flex-1 bg-gradient-to-r from-night-700 to-transparent"
            />
          </div>

          {/* Column count follows the band's own size, and the last tile
              stretches over any cells its row would leave empty. A lit empty
              cell reads as a sponsor who dropped out. */}
          <ul
            className={`mt-7 grid gap-px overflow-hidden rounded-xl border border-night-700/70 bg-night-700/70 ${
              band.sponsors.length === 1
                ? ''
                : band.sponsors.length === 2 || band.sponsors.length === 4
                  ? 'sm:grid-cols-2'
                  : 'sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {band.sponsors.map((sponsor, j) => (
              <li
                key={sponsor.name}
                className={lastTileSpan(band.sponsors.length, j)}
              >
                <LogoTile sponsor={sponsor} />
              </li>
            ))}
          </ul>

          {band.tier === NONPROFIT_TIER ? (
            <p className="mt-5 max-w-[var(--measure)] font-prose text-[0.9375rem] leading-relaxed text-haze-400">
              Free through each company&rsquo;s nonprofit programme rather than
              a donation, which is why they sit in their own band.
            </p>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}

// A single quiet row of the same logos, for the home page. No tier bands, no
// captions — it is there to answer "does anyone back these people" in the first
// screen and then get out of the way.
export function SponsorStrip() {
  if (currentSponsors.length === 0) return null;

  // Biggest band first, matching the wall. The sort is stable, so sponsors
  // within a band keep the order they have in content/sponsors.ts.
  const ordered = [...currentSponsors].sort(
    (a, b) =>
      sponsorTierOrder.indexOf(a.tier) - sponsorTierOrder.indexOf(b.tier),
  );

  return (
    <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between sm:gap-10">
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-7 sm:gap-x-14">
        {ordered.map((sponsor) => {
          const mark = sponsor.logo ? (
            <SponsorLogo
              logo={sponsor.logo}
              name={sponsor.name}
              height={30}
              className="max-w-full text-haze-300 transition-colors duration-200 group-hover:text-haze-50"
            />
          ) : (
            <span className="text-[1.0625rem] text-haze-200">
              {sponsor.name}
            </span>
          );

          return (
            <li key={sponsor.name}>
              {sponsor.href ? (
                <a
                  href={sponsor.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  {mark}
                </a>
              ) : (
                <span className="block">{mark}</span>
              )}
            </li>
          );
        })}
      </ul>

      <Link href="/sponsors/" className="btn-link group shrink-0">
        Our sponsors
        <ArrowUpRight
          size={14}
          className="transition-transform duration-200 ease-out-quart group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </Link>
    </div>
  );
}
