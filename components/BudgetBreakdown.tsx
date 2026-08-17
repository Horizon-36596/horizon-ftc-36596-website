import { budget, showAmounts } from '@/content/sponsors';

// Where a sponsor's money goes.
//
// The donut mirrors the chart in the team's sponsorship package: same figures,
// same colours, same clockwise order starting at twelve o'clock, and the total
// in the middle. `content/sponsors.ts` is the only file to edit — this reads
// the amounts and the colours straight off it.
//
// `showAmounts` is the switch. False hides the donut and the dollar figures and
// shows only the total with the category list, for when a figure is in flux.

const FALLBACK_COLOR = '#F86A43';

function Donut() {
  const total = budget.categories.reduce((sum, c) => sum + c.amount, 0);

  // Stroke-dasharray on a circle is the cheapest correct donut: no path maths,
  // no library, and it scales cleanly. The -rotate-90 on the svg puts the first
  // segment's start edge at twelve o'clock, matching the package's chart.
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      <svg
        viewBox="0 0 160 160"
        className="w-full -rotate-90"
        role="img"
        aria-label={`Team annual budget of ${budget.totalLabel}, split across ${budget.categories.length} categories`}
      >
        {budget.categories.map((category, i) => {
          const dash = (category.amount / total) * circumference;
          const segment = (
            <circle
              key={category.name}
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke={category.color ?? FALLBACK_COLOR}
              strokeWidth="30"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return segment;
        })}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="tabular font-mono text-[1.75rem] leading-none text-haze-50">
          {budget.totalLabel}
        </span>
        <span className="mt-2 max-w-[8rem] text-[0.75rem] leading-tight text-haze-400">
          {budget.totalCaption}
        </span>
      </div>
    </div>
  );
}

export function BudgetBreakdown() {
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
      {showAmounts ? (
        <Donut />
      ) : (
        <div className="card grain relative flex h-full min-h-[22rem] flex-col items-center justify-center px-8 py-16 text-center">
          <span className="tabular font-mono text-5xl leading-none text-haze-50 sm:text-6xl">
            {budget.totalLabel}
          </span>
          <span className="mt-4 text-[0.8125rem] uppercase tracking-[0.16em] text-haze-400">
            {budget.totalCaption}
          </span>
          <div aria-hidden className="rule-horizon mt-10" />
          <p className="mt-8 max-w-xs font-prose text-[0.9375rem] leading-relaxed text-haze-400">
            Managed by the students on the team, and reported to sponsors every
            quarter.
          </p>
        </div>
      )}

      <ul className="divide-y divide-night-700/70">
        {budget.categories.map((category) => (
          <li
            key={category.name}
            className="flex items-baseline gap-4 py-4 first:pt-0 last:pb-0"
          >
            <span
              aria-hidden
              className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: category.color ?? FALLBACK_COLOR }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[0.9375rem] text-haze-100">{category.name}</p>
              <p className="mt-1 font-prose text-[0.9375rem] leading-snug text-haze-400">
                {category.note}
              </p>
            </div>
            {showAmounts ? (
              <span className="tabular shrink-0 font-mono text-[0.9375rem] text-haze-200">
                {currency.format(category.amount)}
              </span>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
