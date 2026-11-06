// Single source of truth for prices, shipping and fees.
// Used by the cart, the order page AND the server – the server never
// trusts prices sent from the browser.
import { getProductById } from '../data/products';

export const SHIPPING_FEE = 4.5;
export const FREE_SHIPPING_FROM = 60;
export const COD_FEE = 1.5;
export const MAX_QTY = 99;

export const DELIVERY = {
  kurier: {
    label: 'Kuriér na adresu',
    note: 'Doručenie po celom Slovensku do 5 pracovných dní od odoslania',
  },
  osobny: {
    label: 'Osobný odber v Kraskove',
    note: 'Kraskovo 81 – po telefonickej dohode',
  },
};

export const PAYMENT = {
  prevod: {
    label: 'Bankovým prevodom',
    note: 'Údaje na platbu vám pošleme e-mailom. Tovar odošleme po prijatí platby.',
    delivery: ['kurier', 'osobny'],
  },
  dobierka: {
    label: 'Na dobierku',
    note: 'Platíte kuriérovi pri prevzatí. Poplatok 1,50 €.',
    delivery: ['kurier'],
  },
  hotovost: {
    label: 'V hotovosti pri odbere',
    note: 'Zaplatíte pri osobnom prevzatí v Kraskove.',
    delivery: ['osobny'],
  },
};

export function paymentsFor(delivery) {
  return Object.keys(PAYMENT).filter((k) => PAYMENT[k].delivery.includes(delivery));
}

export function lineKey(id, variant) {
  return variant ? `${id}:${variant}` : String(id);
}

/** Turns raw cart items [{id, variant, quantity}] into validated, priced lines. */
export function priceCart(rawItems) {
  const lines = [];
  for (const raw of Array.isArray(rawItems) ? rawItems : []) {
    const product = getProductById(raw?.id);
    if (!product) continue;
    const variant =
      product.variants && product.variants.includes(raw.variant) ? raw.variant : null;
    if (product.variants && !variant) continue;
    const quantity = Math.min(
      Math.max(1, Math.floor(Number(raw.quantity) || 0)),
      product.stock,
      MAX_QTY
    );
    lines.push({
      key: lineKey(product.id, variant),
      product,
      variant,
      quantity,
      lineTotal: round(product.price * quantity),
    });
  }
  const subtotal = round(lines.reduce((s, l) => s + l.lineTotal, 0));
  return { lines, subtotal };
}

export function shippingFor(subtotal, delivery) {
  if (delivery === 'osobny') return 0;
  return subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;
}

export function priceOrder(rawItems, delivery, payment) {
  const { lines, subtotal } = priceCart(rawItems);
  const shipping = shippingFor(subtotal, delivery);
  const codFee = payment === 'dobierka' ? COD_FEE : 0;
  return { lines, subtotal, shipping, codFee, total: round(subtotal + shipping + codFee) };
}

const fmt = new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR' });

/** 8 → "8,00 €" (Slovak format with decimal comma) */
export function formatPrice(value) {
  return fmt.format(value);
}

function round(n) {
  return Math.round(n * 100) / 100;
}
