'use client';

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { lineKey, priceCart, MAX_QTY } from '../lib/pricing';
import { getProductById } from '../data/products';

const STORAGE_KEY = 'krokavec-cart';
const CartContext = createContext(null);

// The cart only remembers WHAT and HOW MANY. Prices always come from
// data/products.js, so a price change can never leave stale prices in a cart.
function clampQty(id, qty) {
  const product = getProductById(id);
  const max = Math.min(product?.stock ?? 0, MAX_QTY);
  return Math.max(0, Math.min(Math.floor(qty), max));
}

function reducer(items, action) {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.id, action.variant);
      const existing = items.find((i) => lineKey(i.id, i.variant) === key);
      if (existing) {
        return items.map((i) =>
          i === existing ? { ...i, quantity: clampQty(i.id, i.quantity + action.quantity) } : i
        );
      }
      const quantity = clampQty(action.id, action.quantity);
      if (!quantity) return items;
      return [...items, { id: action.id, variant: action.variant || null, quantity }];
    }
    case 'set': {
      return items
        .map((i) =>
          lineKey(i.id, i.variant) === action.key
            ? { ...i, quantity: clampQty(i.id, action.quantity) }
            : i
        )
        .filter((i) => i.quantity > 0);
    }
    case 'remove':
      return items.filter((i) => lineKey(i.id, i.variant) !== action.key);
    case 'clear':
      return [];
    case 'load':
      return action.items;
    default:
      return items;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const { lines } = priceCart(saved);
      dispatch({
        type: 'load',
        items: lines.map((l) => ({ id: l.product.id, variant: l.variant, quantity: l.quantity })),
      });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  const value = useMemo(() => {
    const { lines, subtotal } = priceCart(items);
    return {
      ready,
      items,
      lines,
      subtotal,
      totalItems: lines.reduce((s, l) => s + l.quantity, 0),
      addItem: (id, quantity = 1, variant = null) => dispatch({ type: 'add', id, quantity, variant }),
      setQuantity: (key, quantity) => dispatch({ type: 'set', key, quantity }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      clearCart: () => dispatch({ type: 'clear' }),
    };
  }, [items, ready]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
