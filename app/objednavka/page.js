'use client';

import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import Link from 'next/link';

const INITIAL_FORM = {
  meno: '',
  priezvisko: '',
  email: '',
  telefon: '',
  ulica: '',
  mesto: '',
  psc: '',
  krajina: 'Slovensko',
  sposobDopravy: 'kurier',
  sposobPlatby: 'prevod',
  poznamka: '',
  suhlasVop: false,
  suhlasGdpr: false,
};

export default function OrderPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const shippingFee = totalPrice > 0 && totalPrice < 60 ? 4.5 : 0;
  const grandTotal = totalPrice + shippingFee;

  function validate() {
    const e = {};
    if (!form.meno.trim()) e.meno = 'Povinné pole';
    if (!form.priezvisko.trim()) e.priezvisko = 'Povinné pole';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Zadajte platný e-mail';
    if (!form.telefon.trim()) e.telefon = 'Povinné pole';
    if (!form.ulica.trim()) e.ulica = 'Povinné pole';
    if (!form.mesto.trim()) e.mesto = 'Povinné pole';
    if (!form.psc.trim()) e.psc = 'Povinné pole';
    if (!form.suhlasVop) e.suhlasVop = 'Musíte súhlasiť s obchodnými podmienkami';
    if (!form.suhlasGdpr) e.suhlasGdpr = 'Musíte súhlasiť so spracovaním osobných údajov';
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setServerError('');

    try {
      const res = await fetch('/api/objednavka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items, totalPrice, shippingFee, grandTotal }),
      });

      if (res.ok) {
        clearCart();
        setSuccess(true);
      } else {
        const data = await res.json();
        setServerError(data.message || 'Nastala chyba. Skúste znova alebo kontaktujte predávajúceho.');
      }
    } catch {
      setServerError('Nastala sieťová chyba. Skúste znova.');
    } finally {
      setSubmitting(false);
    }
  }

  function field(name, label, type = 'text', required = true) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type={type}
          value={form[name]}
          onChange={(ev) => setForm({ ...form, [name]: ev.target.value })}
          className={`w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 ${
            errors[name] ? 'border-red-400 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Objednávka odoslaná!
        </h1>
        <p className="text-gray-600 mb-2">
          Ďakujeme za vašu objednávku. Potvrdenie sme odoslali na váš e-mail.
        </p>
        <p className="text-gray-500 text-sm mb-8">
          V prípade otázok nás kontaktujte na{' '}
          <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">
            milan@krokavec.sk
          </a>{' '}
          alebo{' '}
          <a href="tel:+421911768758" className="text-honey-600 underline">
            0911 768 758
          </a>
          .
        </p>
        <Link
          href="/"
          className="bg-honey-500 hover:bg-honey-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Späť na úvodnú stránku
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <p className="text-gray-600 mb-4">Váš košík je prázdny.</p>
        <Link href="/produkty" className="bg-honey-500 text-white font-semibold px-6 py-3 rounded-xl">
          Prejsť na produkty
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Objednávka</h1>

      <form onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left column – form */}
          <div className="flex-1 space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Kontaktné údaje</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {field('meno', 'Meno')}
                {field('priezvisko', 'Priezvisko')}
                {field('email', 'E-mail', 'email')}
                {field('telefon', 'Telefón', 'tel')}
              </div>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Doručovacia adresa</h2>
              <div className="space-y-4">
                {field('ulica', 'Ulica a číslo domu')}
                <div className="grid grid-cols-2 gap-4">
                  {field('mesto', 'Mesto')}
                  {field('psc', 'PSČ')}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Krajina</label>
                  <select
                    value={form.krajina}
                    onChange={(e) => setForm({ ...form, krajina: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400"
                  >
                    <option>Slovensko</option>
                    <option>Česká republika</option>
                    <option>Maďarsko</option>
                    <option>Rakúsko</option>
                    <option>Poľsko</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Spôsob dopravy</h2>
              <div className="space-y-3">
                {[
                  { value: 'kurier', label: 'Kuriér (Slovenská pošta / GLS)', note: totalPrice >= 60 ? 'Zdarma' : '4,50 €' },
                  { value: 'osobny', label: 'Osobný odber – Kraskovo 81', note: 'Zdarma' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      form.sposobDopravy === opt.value
                        ? 'border-honey-400 bg-honey-50'
                        : 'border-gray-200 hover:border-honey-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sposobDopravy"
                      value={opt.value}
                      checked={form.sposobDopravy === opt.value}
                      onChange={(e) => setForm({ ...form, sposobDopravy: e.target.value })}
                      className="accent-honey-500"
                    />
                    <span className="flex-1 text-sm font-medium text-gray-800">{opt.label}</span>
                    <span className="text-sm font-semibold text-honey-700">{opt.note}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Spôsob platby</h2>
              <div className="space-y-3">
                {[
                  { value: 'prevod', label: 'Bankový prevod', icon: '🏦', note: 'Platba vopred na účet' },
                  { value: 'dobierka', label: 'Dobierka', icon: '📦', note: 'Platba pri prevzatí (+1,50 €)' },
                ].map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      form.sposobPlatby === opt.value
                        ? 'border-honey-400 bg-honey-50'
                        : 'border-gray-200 hover:border-honey-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="sposobPlatby"
                      value={opt.value}
                      checked={form.sposobPlatby === opt.value}
                      onChange={(e) => setForm({ ...form, sposobPlatby: e.target.value })}
                      className="accent-honey-500"
                    />
                    <span className="text-xl">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.note}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">Poznámka k objednávke</h2>
              <textarea
                value={form.poznamka}
                onChange={(e) => setForm({ ...form, poznamka: e.target.value })}
                rows={3}
                placeholder="Voliteľná poznámka pre predávajúceho..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-honey-400 resize-none"
              />
            </div>

            {/* Consents */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.suhlasVop}
                    onChange={(e) => setForm({ ...form, suhlasVop: e.target.checked })}
                    className="mt-0.5 accent-honey-500 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    Súhlasím s{' '}
                    <Link href="/vop" target="_blank" className="text-honey-600 underline hover:text-honey-800">
                      Obchodnými podmienkami
                    </Link>{' '}
                    a beriem na vedomie{' '}
                    <Link href="/reklamacny-poriadok" target="_blank" className="text-honey-600 underline hover:text-honey-800">
                      Reklamačný poriadok
                    </Link>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.suhlasVop && (
                  <p className="text-red-500 text-xs mt-1 ml-7">{errors.suhlasVop}</p>
                )}
              </div>
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.suhlasGdpr}
                    onChange={(e) => setForm({ ...form, suhlasGdpr: e.target.checked })}
                    className="mt-0.5 accent-honey-500 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700">
                    Súhlasím so spracovaním osobných údajov v súlade s{' '}
                    <Link href="/ochrana-udajov" target="_blank" className="text-honey-600 underline hover:text-honey-800">
                      Ochranou osobných údajov (GDPR)
                    </Link>
                    . <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.suhlasGdpr && (
                  <p className="text-red-500 text-xs mt-1 ml-7">{errors.suhlasGdpr}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right column – order summary */}
          <div className="lg:w-72">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-20">
              <h2 className="font-bold text-gray-900 mb-4">Vaša objednávka</h2>

              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium flex-shrink-0">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-3 space-y-1 mb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doprava</span>
                  <span>{shippingFee === 0 ? 'Zdarma' : `${shippingFee.toFixed(2)} €`}</span>
                </div>
                {form.sposobPlatby === 'dobierka' && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dobierka</span>
                    <span>1,50 €</span>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-3 mb-5">
                <div className="flex justify-between font-bold text-lg">
                  <span>Celkom</span>
                  <span className="text-honey-700">
                    {(grandTotal + (form.sposobPlatby === 'dobierka' ? 1.5 : 0)).toFixed(2)} €
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Vrátane DPH</p>
              </div>

              {serverError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4">
                  {serverError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-honey-500 hover:bg-honey-600 disabled:bg-honey-300 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {submitting ? 'Odosielam...' : 'Záväzne objednať'}
              </button>

              <p className="text-xs text-gray-400 text-center mt-3">
                Kliknutím na tlačidlo zadávate záväznú objednávku s povinnosťou platby.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
