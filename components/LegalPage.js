import PageHeader from './PageHeader';
import CallBox from './CallBox';

export const LEGAL_VALID_FROM = '6. novembra 2026';

export default function LegalPage({ title, intro, children }) {
  return (
    <>
      <PageHeader title={title} intro={intro} crumbs={[{ href: '/', label: 'Domov' }, { label: title }]} />
      <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_22rem] lg:items-start">
        <article className="legal card min-w-0 max-w-none p-5 sm:p-10">{children}</article>
        <CallBox className="lg:sticky lg:top-40" title="Niečomu nerozumiete?" text="Zavolajte nám, všetko vám radi vysvetlíme." />
      </div>
    </>
  );
}
