'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useToast } from './ToastContext';
import { useState } from 'react';

const categoryConfig = {
  ule: { emoji: '🏠', label: 'Úle', bg: 'bg-amber-50' },
  ramiky: { emoji: '🔲', label: 'Rámiky', bg: 'bg-stone-50' },
  prislusenstvo: { emoji: '🔧', label: 'Príslušenstvo', bg: 'bg-slate-50' },
  med: { emoji: '🍯', label: 'Med', bg: 'bg-yellow-50' },
};

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const cat = categoryConfig[product.category] || { emoji: '📦', label: '', bg: 'bg-gray-50' };

  function handleAdd() {
    addItem(product);
    setAdded(true);
    addToast(`${product.name} pridaný do košíka`);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-honey-300 hover:shadow-lg transition-all duration-200 flex flex-col group">
      {/* Image area */}
      <Link href={`/produkty/${product.slug}`} className="block">
        <div className={`${cat.bg} rounded-t-2xl p-8 flex items-center justify-center min-h-[140px] relative overflow-hidden`}>
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200">
            {cat.label}
          </span>
          {/* Stock badge */}
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-3 right-3 bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Posledné kusy!
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute top-3 right-3 bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded-full">
              Vypredané
            </span>
          )}
          <span className="text-6xl group-hover:scale-110 transition-transform duration-200">
            {cat.emoji}
          </span>
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link
          href={`/produkty/${product.slug}`}
          className="font-bold text-gray-900 hover:text-honey-700 transition-colors mb-1.5 leading-snug text-sm"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-xs mb-4 flex-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-50">
          <div>
            <span className="text-xl font-bold text-honey-700">
              {product.price.toFixed(2)} €
            </span>
            <div className="text-xs text-gray-400">vrát. DPH</div>
          </div>
          <button
            onClick={handleAdd}
            disabled={added || product.stock === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              added
                ? 'bg-green-500 text-white'
                : product.stock === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-honey-500 hover:bg-honey-600 text-white hover:scale-105 shadow-sm'
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                OK
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Do košíka
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
