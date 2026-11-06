import Link from 'next/link';
import { products, categories, getCategory } from '../../data/products';
import ProductCard from '../../components/ProductCard';
import PageHeader from '../../components/PageHeader';
import CallBox from '../../components/CallBox';

export async function generateMetadata({ searchParams }) {
  const { kategoria } = await searchParams;
  const cat = getCategory(kategoria);
  return {
    title: cat ? cat.name : 'Ponuka',
    description: 'Úle, nadstavky, rámiky, príslušenstvo a med z Kraskova.',
  };
}

export default async function ProductsPage({ searchParams }) {
  const { kategoria } = await searchParams;
  const active = getCategory(kategoria) ? kategoria : 'all';
  const shown = active === 'all' ? products : products.filter((p) => p.category === active);
  const tabs = [{ id: 'all', name: 'Všetko', count: products.length }].concat(
    categories.map((c) => ({ ...c, count: products.filter((p) => p.category === c.id).length }))
  );

  return (
    <>
      <PageHeader
        title={active === 'all' ? 'Naša ponuka' : getCategory(active).name}
        intro="Všetky ceny sú konečné – nie sme platiteľmi DPH. Pri úľoch radi poradíme, ktorý typ je pre vás vhodný."
        crumbs={[{ href: '/', label: 'Domov' }, { label: 'Ponuka' }]}
      />

      <div className="container-page py-10">
        <nav aria-label="Kategórie" className="mb-10">
          <ul className="flex flex-wrap gap-3">
            {tabs.map((t) => {
              const isActive = t.id === active;
              return (
                <li key={t.id}>
                  <Link
                    href={t.id === 'all' ? '/produkty' : `/produkty?kategoria=${t.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    scroll={false}
                    className={`inline-flex min-h-[3.25rem] items-center gap-2 rounded-xl border-2 px-5 text-lg font-bold transition-colors ${
                      isActive
                        ? 'border-bark-800 bg-bark-800 text-cream'
                        : 'border-bark-500/30 bg-cream text-bark-800 hover:border-honey-500 hover:bg-wax-50'
                    }`}
                  >
                    {t.name}
                    <span className={`rounded-full px-2 text-base ${isActive ? 'bg-bark-600' : 'bg-wax-100'}`}>{t.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <CallBox className="mt-14" title="Nenašli ste, čo hľadáte?" text="Prijímame aj objednávky na mieru – napríklad rámiky iných rozmerov alebo väčšie množstvá. Zavolajte nám." />
      </div>
    </>
  );
}
