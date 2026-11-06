'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { LogoMark } from './Art';
import Icon from './Icons';
import FontSizeToggle from './FontSizeToggle';
import { site } from '../lib/site';
import { FREE_SHIPPING_FROM } from '../lib/pricing';

const navLinks = [
  { href: '/', label: 'Domov' },
  { href: '/produkty', label: 'Ponuka' },
  { href: '/o-nas', label: 'O nás' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const { totalItems, ready } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* Top info bar */}
      <div className="bg-bark-800 text-wax-50">
        <div className="container-page flex min-h-[2.75rem] flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1 text-base">
          <a href={site.phoneHref} className="inline-flex items-center gap-2 font-semibold hover:text-honey-300">
            <Icon name="phone" className="h-5 w-5" />
            <span>
              <span className="hidden sm:inline">Poradíme aj telefonicky: </span>
              {site.phone}
            </span>
          </a>
          <p className="hidden items-center gap-2 md:flex">
            <Icon name="truck" className="h-5 w-5 text-honey-300" />
            Doprava zdarma od {FREE_SHIPPING_FROM} €
          </p>
          <FontSizeToggle className="hover:bg-bark-700" />
        </div>
      </div>

      {/* Main bar */}
      <div className="border-b border-wax-200 bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
        <div className="container-page flex min-h-[5rem] items-center justify-between gap-2 sm:gap-4">
          <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name} – úvodná stránka`}>
            <LogoMark className="h-11 w-11 flex-shrink-0 transition-transform group-hover:-rotate-6 sm:h-12 sm:w-12" />
            <span className="hidden leading-tight min-[430px]:block">
              <span className="block font-serif text-[1.35rem] font-bold text-bark-800 sm:text-2xl">{site.name}</span>
              <span className="hidden text-base text-ink-soft sm:block">Včelárstvo a med z Kraskova</span>
            </span>
          </Link>

          <nav aria-label="Hlavná ponuka" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={`relative rounded-lg px-4 py-2.5 text-lg font-semibold transition-colors hover:bg-wax-100 ${
                      isActive(l.href) ? 'text-bark-900' : 'text-ink-soft'
                    }`}
                  >
                    {l.label}
                    {isActive(l.href) && (
                      <span className="absolute inset-x-4 -bottom-0.5 h-1 rounded-full bg-honey-500" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/kosarik" className="btn-primary !min-h-[3rem] !gap-1.5 !px-3 sm:!gap-2.5 sm:!px-5">
              <Icon name="cart" />
              <span className="cart-label">Košík</span>
              {ready && totalItems > 0 && (
                <span className="ml-0.5 inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-full bg-bark-800 px-1.5 text-base text-cream">
                  {totalItems}
                  <span className="sr-only"> ks</span>
                </span>
              )}
            </Link>
            <button
              type="button"
              className="btn-outline !min-h-[3rem] flex-shrink-0 !px-3 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} />
              <span className="hidden sm:inline">Menu</span>
              <span className="sr-only sm:hidden">Menu</span>
            </button>
          </div>
        </div>

        {open && (
          <nav id="mobile-menu" aria-label="Hlavná ponuka" className="border-t border-wax-200 bg-cream lg:hidden">
            <ul className="container-page py-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? 'page' : undefined}
                    className={`flex min-h-[3.5rem] items-center justify-between border-b border-wax-100 px-2 text-xl font-semibold ${
                      isActive(l.href) ? 'text-bark-900' : 'text-ink-soft'
                    }`}
                  >
                    {l.label}
                    <Icon name="arrowRight" className="h-5 w-5 text-honey-600" />
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a href={site.phoneHref} className="btn-dark w-full">
                  <Icon name="phone" /> Zavolať {site.phone}
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
