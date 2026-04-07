'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('krokavec-cookies');
      if (!accepted) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function accept() {
    try {
      localStorage.setItem('krokavec-cookies', '1');
    } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-5xl mx-auto bg-honey-900 text-white rounded-2xl shadow-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <p className="text-sm text-honey-100 leading-relaxed">
            Táto stránka používa len nevyhnutné technické cookies (uloženie obsahu košíka v prehliadači).
            Žiadne analytické ani marketingové cookies tretích strán nepoužívame.{' '}
            <Link href="/ochrana-udajov" className="underline text-honey-300 hover:text-white transition-colors">
              Viac informácií
            </Link>
          </p>
        </div>
        <button
          onClick={accept}
          className="flex-shrink-0 bg-honey-400 hover:bg-honey-300 text-honey-900 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
        >
          Rozumiem, súhlasím
        </button>
      </div>
    </div>
  );
}
