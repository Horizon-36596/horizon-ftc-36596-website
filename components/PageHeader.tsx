export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="container-page border-b border-white/5 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        {title}
      </h1>
      {intro ? (
        <p className="mt-4 max-w-2xl text-lg text-slate-300">{intro}</p>
      ) : null}
    </header>
  );
}
