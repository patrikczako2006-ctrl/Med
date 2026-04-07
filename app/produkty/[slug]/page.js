'use client';

import { products } from '../../../data/products';
import { useCart } from '../../../components/CartContext';
import { useToast } from '../../../components/ToastContext';
import { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const categoryConfig = {
  ule: { emoji: '🏠', bg: 'bg-amber-50', label: 'Úle a nástavky' },
  ramiky: { emoji: '🔲', bg: 'bg-stone-50', label: 'Rámiky' },
  prislusenstvo: { emoji: '🔧', bg: 'bg-slate-50', label: 'Príslušenstvo' },
  med: { emoji: '🍯', bg: 'bg-yellow-50', label: 'Med a včelie produkty' },
};

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.slug === params.slug);
  if (!product) notFound();

  const { addItem } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const cat = categoryConfig[product.category] || { emoji: '📦', bg: 'bg-gray-50', label: '' };

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
    setAdded(true);
    addToast(`${product.name} (${qty} ks) pridaný do košíka`);
    setTimeout(() => setAdded(false), 2500);
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-honey-600 transition-colors">Domov</Link>
        <span className="text-gray-300">/</span>
        <Link href="/produkty" className="hover:text-honey-600 transition-colors">Produkty</Link>
        <span className="text-gray-300">/</span>
        <Link href={`/produkty?kategoria=${product.category}`} className="hover:text-honey-600 transition-colors">
          {cat.label}
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Image */}
          <div className={`${cat.bg} flex items-center justify-center p-12 md:w-80 lg:w-96 flex-shrink-0`}>
            <span className="text-9xl">{cat.emoji}</span>
          </div>

          {/* Info */}
          <div className="flex-1 p-7 lg:p-10">
            {/* Category + stock */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="bg-honey-100 text-honey-800 text-xs font-semibold px-3 py-1 rounded-full">
                {cat.label}
              </span>
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block" />
                  Skladom ({product.stock} ks)
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                  Vypredané
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            <p className="text-gray-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Details */}
            {product.details && product.details.length > 0 && (
              <ul className="mb-6 space-y-2">
                {product.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <span className="text-honey-500 flex-shrink-0 mt-0.5 font-bold">✓</span>
                    {d}
                  </li>
                ))}
              </ul>
            )}

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-4xl font-bold text-honey-700">
                {product.price.toFixed(2)} €
              </span>
              <span className="text-sm text-gray-400 mb-1">cena vrátane DPH</span>
            </div>

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3 flex-wrap mb-6">
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
                >
                  −
                </button>
                <span className="px-5 py-3 font-bold text-gray-900 text-lg">{qty}</span>
                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-lg leading-none"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={added || product.stock === 0}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm transition-all ${
                  added
                    ? 'bg-green-500 text-white'
                    : product.stock === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-honey-500 hover:bg-honey-600 text-white hover:scale-105 shadow-md shadow-honey-200'
                }`}
              >
                {added ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Pridané do košíka!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Pridať do košíka
                  </>
                )}
              </button>

              {added && (
                <Link
                  href="/kosarik"
                  className="text-honey-600 hover:text-honey-800 font-semibold text-sm transition-colors"
                >
                  Zobraziť košík →
                </Link>
              )}
            </div>

            {/* Trust micro-signals */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
              <span className="flex items-center gap-1.5">
                🚚 Doprava zdarma nad 60 €
              </span>
              <span className="flex items-center gap-1.5">
                🔄 14 dní na vrátenie
              </span>
              <span className="flex items-center gap-1.5">
                📞 Poradenstvo: 0911 768 758
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Možno vás zaujme aj</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProducts.map((p) => {
              const rc = categoryConfig[p.category] || { emoji: '📦', bg: 'bg-gray-50' };
              return (
                <Link
                  key={p.id}
                  href={`/produkty/${p.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 hover:border-honey-300 hover:shadow-md transition-all p-4 flex gap-4 items-center group"
                >
                  <div className={`${rc.bg} rounded-xl w-14 h-14 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    {rc.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-honey-700 transition-colors truncate">
                      {p.name}
                    </div>
                    <div className="text-honey-600 font-bold text-sm mt-0.5">
                      {p.price.toFixed(2)} €
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Back */}
      <div className="mt-8">
        <Link href="/produkty" className="inline-flex items-center gap-1.5 text-honey-600 hover:text-honey-800 font-medium text-sm transition-colors">
          ← Späť na produkty
        </Link>
      </div>
    </div>
  );
}
