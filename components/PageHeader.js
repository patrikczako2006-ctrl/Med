import Link from 'next/link';

export default function PageHeader({ title, intro, crumbs = [], eyebrow }) {
  return (
    <div className="honeycomb border-b border-wax-200 bg-wax-50">
      <div className="container-page py-10 sm:py-14">
        {crumbs.length > 0 && (
          <nav aria-label="Kde sa nachádzate" className="mb-4 text-lg">
            <ol className="flex flex-wrap items-center gap-2 text-ink-soft">
              {crumbs.map((c, i) => (
                <li key={c.href || c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">›</span>}
                  {c.href ? (
                    <Link href={c.href} className="underline underline-offset-4 hover:text-bark-800">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="font-semibold text-ink">{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-4xl font-bold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 max-w-3xl text-xl text-ink-soft">{intro}</p>}
      </div>
    </div>
  );
}
