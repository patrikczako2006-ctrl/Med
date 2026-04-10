'use client';

import Link from 'next/link';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  const categoryEmoji = {
    ule: '🏠',
    ramiky: '🔲',
    prislusenstvo: '🔧',
    med: '🍯',
    balicky: '🎁',
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col relative">
      {/* Savings badge */}
      {savings > 0 && (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg z-10">
          Ušetríte {savings} €
        </div>
      )}

      {/* Category badge + emoji */}
      <div className="bg-honey-50 rounded-t-2xl p-6 flex items-center justify-center text-5xl min-h-[120px]">
        {categoryEmoji[product.category] || '📦'}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link
          href={`/produkty/${product.slug}`}
          className="font-semibold text-gray-900 hover:text-honey-700 transition-colors mb-1 leading-snug"
        >
          {product.name}
        </Link>
        <p className="text-gray-500 text-sm mb-4 flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-xl font-bold text-honey-700">
              {product.price.toFixed(2)} €
            </span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                {product.originalPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            disabled={added}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              added
                ? 'bg-green-100 text-green-700'
                : 'bg-honey-500 hover:bg-honey-600 text-white'
            }`}
          >
            {added ? '✓ Pridané' : 'Do košíka'}
          </button>
        </div>
      </div>
    </div>
  );
}
