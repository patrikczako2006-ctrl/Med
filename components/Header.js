'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function Header() {
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Domov' },
    { href: '/produkty', label: 'Produkty' },
    { href: '/o-nas', label: 'O nás' },
    { href: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header className="sticky top-0 z-40 flex flex-col shadow-sm">
      {/* Announcement bar */}
      <div className="bg-honey-800 text-honey-100 text-xs font-medium text-center py-2 px-4 hidden sm:block">
        🚚 Doprava kuriérom zdarma pri objednávke nad 60 € &nbsp;·&nbsp; 📞 0911 768 758 &nbsp;·&nbsp; 🔄 14 dní na vrátenie
      </div>
      <div className="bg-honey-800 text-honey-100 text-xs font-medium text-center py-1.5 px-4 sm:hidden">
        🚚 Doprava zdarma nad 60 €
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-3xl">🐝</span>
              <div>
                <div className="font-bold text-honey-800 text-lg leading-tight group-hover:text-honey-600 transition-colors">
                  Krokavec
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  Včelárstvo &amp; med
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-gray-700 hover:text-honey-700 hover:bg-honey-50 font-medium px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Cart + mobile toggle */}
            <div className="flex items-center gap-2">
              <Link
                href="/kosarik"
                className="relative flex items-center gap-1.5 bg-honey-500 hover:bg-honey-600 text-white px-4 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 text-sm shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Košík</span>
                {totalItems > 0 && (
                  <span className="bg-white text-honey-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ml-0.5">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-3 pb-4 space-y-0.5">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block px-3 py-2.5 text-gray-700 hover:text-honey-700 hover:bg-honey-50 font-medium rounded-lg transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-100 mt-2">
                <a href="tel:+421911768758" className="block px-3 py-2 text-honey-700 font-medium text-sm">
                  📞 0911 768 758
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
