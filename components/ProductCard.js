'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { ProductArt } from './Art';
import Icon from './Icons';
import { formatPrice } from '../lib/pricing';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const href = `/produkty/${product.slug}`;
  const soldOut = product.stock <= 0;

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 4000);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-lift">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="honeycomb block bg-wax-100">
        <ProductArt art={product.art} className="mx-auto h-48 w-full max-w-[17rem] transition-transform duration-300 group-hover:scale-[1.04]" />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-2xl font-bold">
          <Link href={href} className="hover:text-bark-700 hover:underline hover:decoration-honey-500 hover:decoration-2 hover:underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <p className="mb-5 flex-1 text-lg text-ink-soft">{product.description}</p>

        <div className="mb-4 flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
          <p className="font-serif text-3xl font-bold text-bark-800">{formatPrice(product.price)}</p>
          <p className={`flex items-center gap-1.5 text-base font-semibold ${soldOut ? 'text-alert-600' : 'text-meadow-600'}`}>
            <Icon name={soldOut ? 'close' : 'check'} className="h-5 w-5" strokeWidth={3} />
            {soldOut ? 'Vypredané' : 'Skladom'}
          </p>
        </div>

        {product.variants ? (
          <Link href={href} className="btn-outline w-full">
            Vybrať typ úľa
            <Icon name="arrowRight" className="h-5 w-5" />
          </Link>
        ) : added ? (
          <div className="space-y-2" role="status">
            <p className="flex min-h-[3.25rem] items-center justify-center gap-2 rounded-xl bg-meadow-50 text-lg font-bold text-meadow-700">
              <Icon name="check" strokeWidth={3} /> Pridané do košíka
            </p>
            <Link href="/kosarik" className="link block text-center text-lg">
              Prejsť do košíka
            </Link>
          </div>
        ) : (
          <button
            type="button"
            className="btn-primary w-full"
            disabled={soldOut}
            onClick={() => {
              addItem(product.id, 1);
              setAdded(true);
            }}
          >
            <Icon name="cart" />
            Pridať do košíka
          </button>
        )}
      </div>
    </article>
  );
}
