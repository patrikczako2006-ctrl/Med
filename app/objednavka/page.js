'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useCart } from '../../components/CartContext';
import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icons';
import { site } from '../../lib/site';
import { DELIVERY, PAYMENT, paymentsFor, priceOrder, formatPrice, FREE_SHIPPING_FROM } from '../../lib/pricing';
import { validateOrderForm } from '../../lib/validation';

const INITIAL = {
  meno: '',
  priezvisko: '',
  telefon: '',
  email: '',
  ulica: '',
  psc: '',
  mesto: '',
  doprava: 'kurier',
  platba: 'prevod',
  poznamka: '',
  suhlasVop: false,
  web: '', // spam trap – real people never see or fill this
};

const FIELD_ORDER = ['meno', 'priezvisko', 'telefon', 'email', 'ulica', 'mesto', 'psc', 'suhlasVop'];

export default function OrderPage() {
  const { items, lines, ready, clearCart } = useCart();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const [result, setResult] = useState(null);
  const summaryRef = useRef(null);

  const order = priceOrder(items, form.doprava, form.platba);
  const set = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  // Keep payment valid for the chosen delivery (e.g. no "dobierka" for pickup)
  useEffect(() => {
    const allowed = paymentsFor(form.doprava);
    if (!allowed.includes(form.platba)) set('platba', allowed[0]);
  }, [form.doprava, form.platba]);

  useEffect(() => {
    if (Object.keys(errors).length && summaryRef.current) {
      summaryRef.current.focus({ preventScroll: true });
      summaryRef.current.scrollIntoView({ block: 'start' });
    }
  }, [errors]);

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validateOrderForm(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch('/api/objednavka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, items }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        clearCart();
        setResult(data);
        window.scrollTo(0, 0);
      } else {
        if (data.errors) setErrors(data.errors);
        setServerError(data.message || 'Objednávku sa nepodarilo odoslať.');
      }
    } catch {
      setServerError('Objednávku sa nepodarilo odoslať – skontrolujte pripojenie na internet a skúste znova.');
    } finally {
      setSubmitting(false);
    }
  }

  if (result) return <Success result={result} />;

  if (!ready) {
    return <p className="container-page py-24 text-center text-xl text-ink-soft">Načítavam…</p>;
  }

  if (lines.length === 0) {
    return (
      <div className="container-page py-20">
        <div className="card mx-auto max-w-xl p-10 text-center">
          <h1 className="text-3xl font-bold">Košík je prázdny</h1>
          <p className="mt-2 text-xl text-ink-soft">Najprv si vyberte tovar z ponuky.</p>
          <Link href="/produkty" className="btn-primary mt-6">Pozrieť ponuku</Link>
        </div>
      </div>
    );
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k]);
  const field = (name, label, props = {}) => (
    <div>
      <label htmlFor={name} className="field-label">
        {label} {props.required !== false && <span className="text-alert-600" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        value={form[name]}
        onChange={(e) => set(name, e.target.value)}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `${name}-error` : props.hint ? `${name}-hint` : undefined}
        className="field-input"
        {...props}
        required={props.required !== false}
      />
      {props.hint && !errors[name] && <p id={`${name}-hint`} className="mt-1 text-base text-ink-soft">{props.hint}</p>}
      {errors[name] && (
        <p id={`${name}-error`} className="field-error">
          <Icon name="alert" className="h-5 w-5 flex-shrink-0" /> {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        title="Objednávka"
        intro="Vyplňte, prosím, údaje nižšie. Polia označené hviezdičkou (*) sú povinné."
        crumbs={[{ href: '/', label: 'Domov' }, { href: '/kosarik', label: 'Košík' }, { label: 'Objednávka' }]}
      />

      <form onSubmit={handleSubmit} noValidate className="container-page grid gap-8 py-10 sm:py-14 lg:grid-cols-[1fr_26rem] lg:items-start [&>*]:min-w-0">
        <div className="space-y-8">
          {errorList.length > 0 && (
            <div ref={summaryRef} tabIndex={-1} role="alert" className="scroll-mt-40 rounded-2xl border-2 border-alert-600 bg-alert-50 p-6">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-alert-600">
                <Icon name="alert" /> Prosím, opravte tieto údaje:
              </h2>
              <ul className="mt-3 list-disc space-y-1 pl-6 text-lg">
                {errorList.map((k) => (
                  <li key={k}>
                    <a href={`#${k}`} className="font-semibold underline underline-offset-4">{errors[k]}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Section n={1} title="Ako vás zastihneme">
            <div className="grid gap-5 sm:grid-cols-2">
              {field('meno', 'Meno', { autoComplete: 'given-name' })}
              {field('priezvisko', 'Priezvisko', { autoComplete: 'family-name' })}
              {field('telefon', 'Telefón', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', hint: 'Napríklad 0911 123 456' })}
              {field('email', 'E-mail', { type: 'email', autoComplete: 'email', inputMode: 'email', hint: 'Pošleme vám naň potvrdenie objednávky' })}
            </div>
          </Section>

          <Section n={2} title="Doprava">
            <Choices
              name="doprava"
              value={form.doprava}
              onChange={(v) => set('doprava', v)}
              options={Object.entries(DELIVERY).map(([value, d]) => ({
                value,
                icon: value === 'kurier' ? 'truck' : 'home',
                label: d.label,
                note: d.note,
                price:
                  value === 'osobny'
                    ? 'zdarma'
                    : order.subtotal >= FREE_SHIPPING_FROM
                    ? 'zdarma'
                    : formatPrice(priceOrder(items, 'kurier', 'prevod').shipping),
              }))}
            />
          </Section>

          {form.doprava === 'kurier' && (
            <Section n={3} title="Kam máme tovar doručiť">
              <div className="grid gap-5 sm:grid-cols-[1fr_12rem]">
                <div className="sm:col-span-2">{field('ulica', 'Ulica a číslo domu', { autoComplete: 'street-address', hint: 'V obci bez ulíc stačí obec a súpisné číslo' })}</div>
                {field('mesto', 'Obec / mesto', { autoComplete: 'address-level2' })}
                {field('psc', 'PSČ', { autoComplete: 'postal-code', inputMode: 'numeric', maxLength: 6 })}
              </div>
              <p className="mt-4 text-lg text-ink-soft">Doručujeme na Slovensku. Do zahraničia sa, prosím, dohodnite s nami telefonicky.</p>
            </Section>
          )}

          <Section n={form.doprava === 'kurier' ? 4 : 3} title="Platba">
            <Choices
              name="platba"
              value={form.platba}
              onChange={(v) => set('platba', v)}
              options={paymentsFor(form.doprava).map((value) => ({
                value,
                icon: value === 'prevod' ? 'bank' : 'cash',
                label: PAYMENT[value].label,
                note: PAYMENT[value].note,
              }))}
            />
          </Section>

          <Section n={form.doprava === 'kurier' ? 5 : 4} title="Poznámka (nepovinné)">
            <label htmlFor="poznamka" className="sr-only">Poznámka k objednávke</label>
            <textarea
              id="poznamka"
              rows={3}
              maxLength={1000}
              value={form.poznamka}
              onChange={(e) => set('poznamka', e.target.value)}
              placeholder="Napríklad kedy vás zastihneme doma"
              className="field-input min-h-[7rem] py-3"
            />
          </Section>

          {/* spam trap */}
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label>
              Nevypĺňajte <input tabIndex={-1} autoComplete="off" value={form.web} onChange={(e) => set('web', e.target.value)} />
            </label>
          </div>
        </div>

        <aside className="lg:sticky lg:top-40">
          <div className="card p-6">
            <h2 className="mb-4 text-2xl font-bold">Vaša objednávka</h2>
            <ul className="divide-y divide-wax-200 text-lg">
              {order.lines.map((l) => (
                <li key={l.key} className="flex justify-between gap-4 py-2.5">
                  <span>
                    {l.product.name}
                    {l.variant && <span className="text-ink-soft"> ({l.variant})</span>}
                    <span className="whitespace-nowrap text-ink-soft"> × {l.quantity}</span>
                  </span>
                  <span className="whitespace-nowrap font-semibold">{formatPrice(l.lineTotal)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-2 space-y-1.5 border-t-2 border-wax-200 pt-3 text-lg">
              <Row label="Tovar" value={formatPrice(order.subtotal)} />
              <Row label="Doprava" value={order.shipping === 0 ? 'zdarma' : formatPrice(order.shipping)} />
              {order.codFee > 0 && <Row label="Dobierka" value={formatPrice(order.codFee)} />}
            </dl>
            <div className="mt-3 flex items-baseline justify-between border-t-2 border-wax-200 pt-3">
              <span className="text-xl font-bold">Spolu</span>
              <span className="font-serif text-3xl font-bold text-bark-800">{formatPrice(order.total)}</span>
            </div>
            <p className="mt-1 text-base text-ink-soft">Nie sme platiteľmi DPH.</p>

            <div className="mt-6">
              <label className="flex cursor-pointer items-start gap-3 text-lg">
                <input
                  id="suhlasVop"
                  type="checkbox"
                  checked={form.suhlasVop}
                  onChange={(e) => set('suhlasVop', e.target.checked)}
                  aria-invalid={errors.suhlasVop ? 'true' : undefined}
                  aria-describedby={errors.suhlasVop ? 'suhlasVop-error' : undefined}
                  className="mt-1 h-6 w-6 flex-shrink-0 accent-honey-600"
                />
                <span>
                  Súhlasím s{' '}
                  <Link href="/vop" target="_blank" className="link">obchodnými podmienkami</Link> a s{' '}
                  <Link href="/reklamacny-poriadok" target="_blank" className="link">reklamačným poriadkom</Link>.{' '}
                  <span className="text-alert-600" aria-hidden="true">*</span>
                </span>
              </label>
              {errors.suhlasVop && (
                <p id="suhlasVop-error" className="field-error ml-9">{errors.suhlasVop}</p>
              )}
              <p className="mt-3 text-base text-ink-soft">
                Vaše údaje použijeme len na vybavenie objednávky. Viac v časti{' '}
                <Link href="/ochrana-udajov" target="_blank" className="link font-normal">Ochrana osobných údajov</Link>.
              </p>
            </div>

            {serverError && (
              <div role="alert" className="mt-5 rounded-xl border-2 border-alert-600 bg-alert-50 p-4 text-lg text-alert-600">
                <p className="font-bold">{serverError}</p>
                <p className="mt-1 text-ink">
                  Objednať môžete aj telefonicky: <a href={site.phoneHref} className="link">{site.phone}</a>
                </p>
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary mt-6 w-full !min-h-[3.75rem] !text-xl">
              {submitting ? 'Odosielam…' : 'Objednať s povinnosťou platby'}
            </button>
          </div>
        </aside>
      </form>
    </>
  );
}

function Section({ n, title, children }) {
  return (
    <section className="card p-6 sm:p-8" aria-labelledby={`krok-${n}`}>
      <h2 id={`krok-${n}`} className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-honey-400 font-serif text-xl">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Choices({ name, value, onChange, options }) {
  return (
    <div className="space-y-3" role="radiogroup">
      {options.map((o) => (
        <label
          key={o.value}
          className={`flex cursor-pointer items-center gap-4 rounded-xl border-2 p-4 transition-colors ${
            value === o.value ? 'border-honey-600 bg-wax-50' : 'border-bark-500/25 bg-white hover:border-honey-500'
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.value}
            checked={value === o.value}
            onChange={() => onChange(o.value)}
            className="h-6 w-6 flex-shrink-0 accent-honey-600"
          />
          <Icon name={o.icon} className="hidden h-8 w-8 flex-shrink-0 text-bark-600 sm:block" />
          <span className="flex-1">
            <span className="block text-xl font-bold">{o.label}</span>
            <span className="block text-lg text-ink-soft">{o.note}</span>
            {o.price && <span className="mt-1 block text-xl font-bold text-bark-800 sm:hidden">{o.price}</span>}
          </span>
          {o.price && <span className="hidden whitespace-nowrap text-xl font-bold text-bark-800 sm:block">{o.price}</span>}
        </label>
      ))}
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <dt>{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}

function Success({ result }) {
  return (
    <div className="container-page py-14 sm:py-20">
      <div className="card mx-auto max-w-2xl p-8 text-center sm:p-12">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-meadow-600 text-white">
          <Icon name="check" className="h-10 w-10" strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-4xl font-bold">Ďakujeme za objednávku!</h1>
        <p className="mt-3 text-xl text-ink-soft">
          Číslo objednávky: <strong className="text-ink">{result.orderNumber}</strong>
        </p>
        <p className="mt-2 text-xl text-ink-soft">
          {result.customerEmailSent
            ? 'Potvrdenie sme vám poslali e-mailom. Ak ho nevidíte, pozrite sa aj do priečinka „Spam“.'
            : 'Objednávku sme prijali. Čoskoro sa vám ozveme telefonicky alebo e-mailom.'}
        </p>

        {result.payment === 'prevod' && (
          <div className="mt-8 rounded-2xl bg-wax-50 p-6 text-left text-lg">
            <h2 className="mb-3 text-2xl font-bold">Údaje na platbu</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5">
              <dt className="font-semibold">Suma:</dt>
              <dd className="font-bold">{formatPrice(result.total)}</dd>
              <dt className="font-semibold">Variabilný symbol:</dt>
              <dd className="font-bold">{result.orderNumber}</dd>
              <dt className="font-semibold">Číslo účtu:</dt>
              <dd className="font-bold">{result.iban || 'pošleme vám e-mailom'}</dd>
            </dl>
            <p className="mt-3 text-ink-soft">Tovar odošleme hneď, ako nám platba príde na účet.</p>
          </div>
        )}

        <p className="mt-8 text-lg">
          Otázky? Zavolajte na <a href={site.phoneHref} className="link">{site.phone}</a>.
        </p>
        <Link href="/" className="btn-primary mt-6">Späť na úvodnú stránku</Link>
      </div>
    </div>
  );
}
