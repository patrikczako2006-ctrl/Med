'use client';

import { useCart } from '../../components/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { items, totalPrice, removeItem, updateQuantity } = useCart();

  const FREE_SHIPPING_THRESHOLD = 60;
  const shippingFee = totalPrice > 0 && totalPrice < FREE_SHIPPING_THRESHOLD ? 4.5 : 0;
  const grandTotal = totalPrice + shippingFee;
  const missingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const shippingProgress = Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100);

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Košík je prázdny</h1>
        <p className="text-gray-500 mb-6">Pridajte produkty do košíka a potom pokračujte k objednávke.</p>
        <Link
          href="/produkty"
          className="bg-honey-500 hover:bg-honey-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Prezrieť produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Košík</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Items */}
        <div className="flex-1 space-y-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4"
            >
              <div className="text-3xl flex-shrink-0">
                {item.category === 'med' ? '🍯' : item.category === 'ule' ? '🏠' : item.category === 'ramiky' ? '🔲' : '🔧'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate">{item.name}</p>
                <p className="text-honey-600 font-medium">{item.price.toFixed(2)} € / ks</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                >
                  −
                </button>
                <span className="px-3 py-1.5 text-sm font-medium text-gray-800">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm"
                >
                  +
                </button>
              </div>

              <div className="text-right flex-shrink-0 w-20">
                <p className="font-bold text-gray-900">
                  {(item.price * item.quantity).toFixed(2)} €
                </p>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                aria-label="Odstrániť"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:w-72">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
            <h2 className="font-bold text-gray-900 mb-4">Súhrn objednávky</h2>

            {/* Free shipping progress */}
            <div className="mb-4">
              {missingForFreeShipping > 0 ? (
                <>
                  <p className="text-xs text-gray-600 mb-1.5">
                    Do dopravy zdarma chýba{' '}
                    <span className="font-semibold text-honey-700">
                      {missingForFreeShipping.toFixed(2)} €
                    </span>
                  </p>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-honey-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${shippingProgress}%` }}
                    />
                  </div>
                </>
              ) : (
                <p className="text-xs text-green-600 font-medium">
                  Doprava zdarma
                </p>
              )}
            </div>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Medzisuček</span>
                <span>{totalPrice.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Doprava</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600">Zdarma</span>
                  ) : (
                    `${shippingFee.toFixed(2)} €`
                  )}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-lg">
                <span>Celkom</span>
                <span className="text-honey-700">{grandTotal.toFixed(2)} €</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">Vrátane DPH</p>
            </div>

            <Link
              href="/objednavka"
              className="block w-full bg-honey-500 hover:bg-honey-600 text-white font-semibold py-3 rounded-xl text-center transition-colors"
            >
              Pokračovať k objednávke
            </Link>

            <Link
              href="/produkty"
              className="block w-full text-center text-gray-500 hover:text-honey-600 text-sm mt-3 transition-colors"
            >
              Pokračovať v nákupe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
