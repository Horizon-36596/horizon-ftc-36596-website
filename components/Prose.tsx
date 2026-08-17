// Narrative copy. Everything Horizon actually *writes* — the mission, the
// story, the sponsorship ask — goes through here, set in the serif at 18px on a
// constrained measure. It is the single decision that stops the site reading
// like a product landing page.

export function Prose({
  children,
  className,
  /** Slightly larger, for the one lead paragraph that opens a page. */
  lead = false,
}: {
  children: React.ReactNode;
  className?: string;
  lead?: boolean;
}) {
  return (
    <div
      className={[
        'font-prose text-haze-300 [&>p+p]:mt-5',
        lead
          ? 'text-[1.1875rem] leading-[1.65] sm:text-[1.3125rem]'
          : 'text-[1.0625rem] leading-[1.72] sm:text-[1.125rem]',
        'max-w-[var(--measure)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

// Horizon's print materials pick key phrases out of a paragraph in amber and
// orange. Reproducing that here is what makes the pages read as the team's own
// documents rather than as a template someone filled in.
//
// It renders <strong>, so the emphasis survives reader mode and screen readers.
export function Mark({
  children,
  tone = 'amber',
}: {
  children: React.ReactNode;
  tone?: 'amber' | 'orange' | 'crimson';
}) {
  const tones = {
    amber: 'text-brand-300',
    orange: 'text-brand-500',
    crimson: 'text-brand-600',
  } as const;

  return <strong className={`font-medium ${tones[tone]}`}>{children}</strong>;
}
