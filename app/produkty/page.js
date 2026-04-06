'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products, categories } from '../../data/products';
import ProductCard from '../../components/ProductCard';

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get('kategoria') || 'all';
  const [activeCategory, setActiveCategory] = useState(initialCat);

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Všetky produkty</h1>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-honey-500 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:border-honey-300'
          }`}
        >
          Všetky
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              activeCategory === cat.id
                ? 'bg-honey-500 text-white'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-honey-300'
            }`}
          >
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          V tejto kategórii sa nenachádzajú žiadne produkty.
        </div>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Načítavam...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
