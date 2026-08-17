import { tierBenefits, tiers } from '@/content/sponsors';
import { Check } from '@/components/Icon';

// The tier matrix, verbatim from the sponsorship package.
//
// A benefits table is a data surface, so it gets none of the site's atmosphere:
// no glow, no grain, no gradient. It gets a real <table> with proper header
// scopes, and on a narrow screen it scrolls horizontally inside its own
// container rather than reflowing into stacked cards, because sponsors compare
// tiers by reading across.

const TIER_ACCENT = {
  bronze: 'text-[#C08A5E]',
  silver: 'text-haze-200',
  gold: 'text-brand-300',
  diamond: 'text-brand-500',
} as const;

function Cell({ value }: { value: string | boolean | null }) {
  if (value === true) {
    return (
      <>
        <Check size={18} className="mx-auto text-brand-300" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === null || value === false) {
    return (
      <>
        <span aria-hidden className="text-haze-600">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="text-[0.8125rem] text-haze-200">{value}</span>;
}

export function TierTable() {
  return (
    <div className="-mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <caption className="sr-only">
          Sponsorship tiers and the benefits included at each level
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[38%] pb-5 pr-6 align-bottom">
              <span className="eyebrow">Benefit</span>
            </th>
            {tiers.map((tier) => (
              <th
                key={tier.name}
                scope="col"
                className="px-3 pb-5 text-center align-bottom"
              >
                <span
                  className={`block text-[1.0625rem] font-medium ${TIER_ACCENT[tier.accent]}`}
                >
                  {tier.name}
                </span>
                <span className="tabular mt-1 block font-mono text-[0.8125rem] text-haze-400">
                  {tier.min}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tierBenefits.map((row) => (
            <tr
              key={row.label}
              className="border-t border-night-700/70 align-middle"
            >
              <th
                scope="row"
                className="py-4 pr-6 text-[0.9375rem] font-normal leading-snug text-haze-300"
              >
                {row.label}
              </th>
              {row.values.map((value, i) => (
                <td key={tiers[i].name} className="px-3 py-4 text-center">
                  <Cell value={value} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
