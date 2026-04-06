'use client';

import { products } from '../../../data/products';
import { useCart } from '../../../components/CartContext';
import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const categoryEmoji = {
    ule: '🏠',
    ramiky: '🔲',
    prislusenstvo: '🔧',
    med: '🍯',
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex gap-1">
        <Link href="/" className="hover:text-honey-600">Domov</Link>
        <span>/</span>
        <Link href="/produkty" className="hover:text-honey-600">Produkty</Link>
        <span>/</span>
        <span className="text-gray-800">{product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Image placeholder */}
          <div className="bg-honey-50 rounded-2xl flex items-center justify-center text-8xl w-full md:w-64 h-56 md:h-64 flex-shrink-0">
            {categoryEmoji[product.category] || '📦'}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>

            {/* Details list */}
            {product.details && product.details.length > 0 && (
              <ul className="mb-6 space-y-1.5">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-honey-500 mt-0.5">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center gap-6 mb-6">
              <span className="text-3xl font-bold text-honey-700">
                {product.price.toFixed(2)} €
              </span>
              <span className="text-xs text-gray-500">Cena vrátane DPH</span>
            </div>

            {/* Stock indicator */}
            <p className={`text-sm mb-4 ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `✓ Skladom (${product.stock} ks)` : '✗ Vypredané'}
            </p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  −
                </button>
                <span className="px-4 py-2 font-medium text-gray-800">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors font-bold"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                disabled={added || product.stock === 0}
                className={`px-6 py-2.5 rounded-xl font-semibold transition-all ${
                  added
                    ? 'bg-green-100 text-green-700'
                    : product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-honey-500 hover:bg-honey-600 text-white'
                }`}
              >
                {added ? '✓ Pridané do košíka' : 'Pridať do košíka'}
              </button>
              {added && (
                <Link
                  href="/kosarik"
                  className="text-honey-600 hover:text-honey-800 font-medium text-sm"
                >
                  Zobraziť košík →
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Back link */}
      <div className="mt-6">
        <Link href="/produkty" className="text-honey-600 hover:text-honey-800 font-medium text-sm">
          ← Späť na produkty
        </Link>
      </div>
    </div>
  );
}
