'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';
import QuantityStepper from './QuantityStepper';
import Icon from './Icons';
import { MAX_QTY } from '../lib/pricing';

export default function AddToCart({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState('');
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const max = Math.min(product.stock, MAX_QTY);
  const soldOut = product.stock <= 0;

  function handleAdd() {
    if (product.variants && !variant) {
      setError('Najprv vyberte typ úľa.');
      return;
    }
    addItem(product.id, qty, variant || null);
    setError('');
    setAdded(true);
  }

  if (soldOut) {
    return (
      <p className="rounded-xl bg-alert-50 p-4 text-lg font-semibold text-alert-600">
        Tento tovar je momentálne vypredaný. Zavolajte nám a dohodneme sa.
      </p>
    );
  }

  return (
    <div className="space-y-5">
      {product.variants && (
        <fieldset>
          <legend className="field-label">Typ úľa</legend>
          <div className="flex flex-wrap gap-3">
            {product.variants.map((v) => (
              <label
                key={v}
                className={`flex min-h-[3.25rem] cursor-pointer items-center gap-3 rounded-xl border-2 px-5 text-lg font-semibold transition-colors ${
                  variant === v ? 'border-honey-600 bg-wax-100' : 'border-bark-500/30 bg-white hover:border-honey-500'
                }`}
              >
                <input
                  type="radio"
                  name="variant"
                  value={v}
                  checked={variant === v}
                  onChange={() => {
                    setVariant(v);
                    setError('');
                    setAdded(false);
                  }}
                  className="h-5 w-5 accent-honey-600"
                />
                {v}
              </label>
            ))}
          </div>
          {error && (
            <p className="field-error" role="alert">
              <Icon name="alert" className="h-5 w-5" /> {error}
            </p>
          )}
        </fieldset>
      )}

      <div>
        <p className="field-label" id="qty-label">Počet kusov</p>
        <div className="flex flex-wrap items-center gap-3">
          <QuantityStepper value={qty} max={max} onChange={(v) => { setQty(Math.max(1, Math.min(max, v))); setAdded(false); }} />
          <button type="button" className="btn-primary flex-1 sm:flex-none" onClick={handleAdd}>
            <Icon name="cart" />
            Pridať do košíka
          </button>
        </div>
      </div>

      {added && (
        <div role="status" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-meadow-600/30 bg-meadow-50 p-4">
          <p className="flex items-center gap-2 text-lg font-bold text-meadow-700">
            <Icon name="check" strokeWidth={3} /> Pridané do košíka
          </p>
          <Link href="/kosarik" className="btn-dark !min-h-[3rem]">
            Prejsť do košíka <Icon name="arrowRight" className="h-5 w-5" />
          </Link>
        </div>
      )}
    </div>
  );
}
