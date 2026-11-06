import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getCategory } from '../../../data/products';
import PageHeader from '../../../components/PageHeader';
import AddToCart from '../../../components/AddToCart';
import ProductCard from '../../../components/ProductCard';
import { ProductArt } from '../../../components/Art';
import Icon from '../../../components/Icons';
import { site } from '../../../lib/site';
import { FREE_SHIPPING_FROM, SHIPPING_FEE, formatPrice } from '../../../lib/pricing';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <>
      <PageHeader
        title={product.name}
        crumbs={[
          { href: '/', label: 'Domov' },
          { href: '/produkty', label: 'Ponuka' },
          { href: `/produkty?kategoria=${category.id}`, label: category.name },
          { label: product.name },
        ]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="honeycomb card flex items-center justify-center bg-wax-100 p-6 lg:sticky lg:top-40 lg:self-start">
            <ProductArt art={product.art} label={`Ilustrácia: ${product.name}`} className="h-auto w-full max-w-md" />
          </div>

          <div>
            <p className="text-xl leading-relaxed text-ink-soft">{product.description}</p>

            <div className="my-8 flex flex-wrap items-end gap-x-6 gap-y-2 border-y border-wax-200 py-6">
              <p className="font-serif text-5xl font-bold text-bark-800">{formatPrice(product.price)}</p>
              <p className="pb-1.5 text-lg text-ink-soft">konečná cena, nie sme platiteľmi DPH</p>
              <p className={`flex w-full items-center gap-2 text-lg font-bold ${product.stock > 0 ? 'text-meadow-600' : 'text-alert-600'}`}>
                <Icon name={product.stock > 0 ? 'check' : 'close'} strokeWidth={3} />
                {product.stock > 0 ? 'Skladom – odosielame do 5 pracovných dní' : 'Momentálne vypredané'}
              </p>
            </div>

            <AddToCart product={product} />

            <section className="mt-10">
              <h2 className="mb-4 text-2xl font-bold">Parametre</h2>
              <ul className="divide-y divide-wax-200 rounded-2xl border border-wax-200 bg-cream text-lg">
                {product.details.map((d) => {
                  const [k, ...rest] = d.split(':');
                  return (
                    <li key={d} className="flex flex-col gap-0.5 px-5 py-3.5 sm:flex-row sm:gap-4">
                      {rest.length ? (
                        <>
                          <span className="font-semibold sm:w-44 sm:flex-shrink-0">{k}</span>
                          <span className="text-ink-soft">{rest.join(':').trim()}</span>
                        </>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Icon name="check" className="h-5 w-5 text-meadow-600" strokeWidth={3} /> {d}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3 rounded-2xl bg-wax-50 p-5 text-lg">
                <Icon name="truck" className="h-7 w-7 flex-shrink-0 text-bark-600" />
                <p>
                  <strong>Kuriér {formatPrice(SHIPPING_FEE)}</strong>
                  <br />
                  od {FREE_SHIPPING_FROM} € zdarma
                </p>
              </div>
              <div className="flex gap-3 rounded-2xl bg-wax-50 p-5 text-lg">
                <Icon name="home" className="h-7 w-7 flex-shrink-0 text-bark-600" />
                <p>
                  <strong>Osobný odber</strong>
                  <br />v Kraskove zdarma
                </p>
              </div>
            </div>

            <p className="mt-8 text-lg">
              Máte otázku k tomuto výrobku? Zavolajte na{' '}
              <a href={site.phoneHref} className="link whitespace-nowrap">{site.phone}</a>.
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-20" aria-labelledby="podobne">
            <h2 id="podobne" className="mb-6 text-3xl font-bold">Z rovnakej kategórie</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        <Link href="/produkty" className="btn-outline mt-12">
          <Icon name="arrowLeft" className="h-5 w-5" /> Späť na ponuku
        </Link>
      </div>
    </>
  );
}
