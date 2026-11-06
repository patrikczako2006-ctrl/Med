'use client';

import Link from 'next/link';
import { useCart } from '../../components/CartContext';
import { ProductArt } from '../../components/Art';
import QuantityStepper from '../../components/QuantityStepper';
import PageHeader from '../../components/PageHeader';
import CallBox from '../../components/CallBox';
import Icon from '../../components/Icons';
import { FREE_SHIPPING_FROM, SHIPPING_FEE, MAX_QTY, formatPrice } from '../../lib/pricing';

export default function CartPage() {
  const { lines, subtotal, ready, setQuantity, removeItem } = useCart();
  const missing = Math.max(0, FREE_SHIPPING_FROM - subtotal);

  return (
    <>
      <PageHeader title="Košík" crumbs={[{ href: '/', label: 'Domov' }, { label: 'Košík' }]} />

      <div className="container-page py-10 sm:py-14">
        {!ready ? (
          <p className="py-16 text-center text-xl text-ink-soft">Načítavam košík…</p>
        ) : lines.length === 0 ? (
          <div className="card mx-auto max-w-2xl p-10 text-center">
            <ProductArt art="honey" className="mx-auto h-40 w-56" />
            <h2 className="mt-4 text-3xl font-bold">Košík je zatiaľ prázdny</h2>
            <p className="mt-2 text-xl text-ink-soft">Vyberte si z našej ponuky úľov, rámikov a medu.</p>
            <Link href="/produkty" className="btn-primary mt-6">
              Pozrieť ponuku <Icon name="arrowRight" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start [&>*]:min-w-0">
            <section aria-label="Tovar v košíku">
              <ul className="space-y-4">
                {lines.map((l) => (
                  <li key={l.key} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                    <div className="flex flex-1 items-center gap-4">
                      <div className="honeycomb flex h-24 w-28 flex-shrink-0 items-center justify-center rounded-xl bg-wax-100">
                        <ProductArt art={l.product.art} className="h-20 w-24" />
                      </div>
                      <div className="min-w-0">
                        <Link href={`/produkty/${l.product.slug}`} className="text-xl font-bold hover:underline">
                          {l.product.name}
                        </Link>
                        {l.variant && <p className="text-lg text-ink-soft">Typ úľa: <strong>{l.variant}</strong></p>}
                        <p className="text-lg text-ink-soft">{formatPrice(l.product.price)} / ks</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-wax-200 pt-4 sm:border-0 sm:pt-0">
                      <QuantityStepper
                        value={l.quantity}
                        max={Math.min(l.product.stock, MAX_QTY)}
                        onChange={(v) => setQuantity(l.key, Math.max(1, v))}
                        size="md"
                        label={`Počet kusov – ${l.product.name}`}
                      />
                      <p className="min-w-[6.5rem] text-right font-serif text-2xl font-bold">{formatPrice(l.lineTotal)}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(l.key)}
                        className="inline-flex min-h-[3rem] items-center gap-1.5 rounded-xl px-3 text-lg font-semibold text-alert-600 hover:bg-alert-50"
                      >
                        <Icon name="trash" className="h-5 w-5" /> Odstrániť
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <Link href="/produkty" className="btn-outline mt-6">
                <Icon name="arrowLeft" className="h-5 w-5" /> Pokračovať v nákupe
              </Link>
            </section>

            <aside className="space-y-6 lg:sticky lg:top-40">
              <div className="card p-6">
                <h2 className="mb-4 text-2xl font-bold">Súhrn</h2>
                <dl className="space-y-2 text-lg">
                  <div className="flex justify-between">
                    <dt>Tovar spolu</dt>
                    <dd className="font-bold">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>Doprava kuriérom</dt>
                    <dd className="font-bold">{missing === 0 ? <span className="text-meadow-600">zdarma</span> : formatPrice(SHIPPING_FEE)}</dd>
                  </div>
                </dl>
                {missing > 0 ? (
                  <div className="mt-4 rounded-xl bg-wax-50 p-4">
                    <p className="text-lg">
                      Do dopravy zdarma vám chýba <strong>{formatPrice(missing)}</strong>.
                    </p>
                    <div className="mt-2 h-3 overflow-hidden rounded-full bg-wax-200" aria-hidden="true">
                      <div className="h-full rounded-full bg-honey-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_FROM) * 100)}%` }} />
                    </div>
                  </div>
                ) : (
                  <p className="mt-4 flex items-center gap-2 rounded-xl bg-meadow-50 p-4 text-lg font-semibold text-meadow-700">
                    <Icon name="check" strokeWidth={3} /> Máte dopravu zdarma
                  </p>
                )}
                <p className="mt-4 text-base text-ink-soft">
                  Pri osobnom odbere v Kraskove je doprava vždy zdarma. Spôsob dopravy si vyberiete v ďalšom kroku.
                </p>
                <Link href="/objednavka" className="btn-primary mt-6 w-full !text-xl">
                  Pokračovať k objednávke <Icon name="arrowRight" />
                </Link>
              </div>
              <CallBox title="Potrebujete poradiť?" text="Zavolajte nám, s objednávkou radi pomôžeme." />
            </aside>
          </div>
        )}
      </div>
    </>
  );
}
