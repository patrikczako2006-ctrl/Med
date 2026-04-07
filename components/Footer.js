import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-honey-900 text-honey-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐝</span>
              <div>
                <div className="font-bold text-white text-xl">Krokavec</div>
                <div className="text-honey-400 text-xs">Včelárstvo & med</div>
              </div>
            </div>
            <p className="text-honey-300 text-sm leading-relaxed mb-4">
              Tradičná výroba včelárskych potrieb a predaj prírodného medu
              priamo z Kraskova. S láskou k včelám od roku 2000.
            </p>
            <a
              href="https://www.facebook.com/krokavec.sk/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-honey-400 hover:text-white transition-colors text-sm"
            >
              <span className="text-lg">📘</span>
              Facebook
            </a>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Produkty</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/produkty?kategoria=ule', label: '🏠 Úle a nástavky' },
                { href: '/produkty?kategoria=ramiky', label: '🔲 Rámiky' },
                { href: '/produkty?kategoria=prislusenstvo', label: '🔧 Príslušenstvo' },
                { href: '/produkty?kategoria=med', label: '🍯 Med a včelie produkty' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-honey-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Informácie</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/o-nas', label: 'O nás' },
                { href: '/kontakt', label: 'Kontakt' },
                { href: '/kosarik', label: 'Košík' },
                { href: '/vop', label: 'Obchodné podmienky' },
                { href: '/ochrana-udajov', label: 'Ochrana osobných údajov' },
                { href: '/reklamacny-poriadok', label: 'Reklamačný poriadok' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-honey-300 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Kontakt</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-base flex-shrink-0">📍</span>
                <span className="text-honey-300">Kraskovo 81<br />980 26 Kraskovo, SR</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">📞</span>
                <a href="tel:+421911768758" className="text-honey-300 hover:text-white transition-colors">
                  0911 768 758
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base">✉️</span>
                <a href="mailto:milan@krokavec.sk" className="text-honey-300 hover:text-white transition-colors">
                  milan@krokavec.sk
                </a>
              </div>
            </div>

            {/* Mini trust badges */}
            <div className="mt-5 space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-honey-400">
                <span>🔒</span> Bezpečná objednávka
              </div>
              <div className="flex items-center gap-2 text-xs text-honey-400">
                <span>🔄</span> 14 dní na vrátenie
              </div>
              <div className="flex items-center gap-2 text-xs text-honey-400">
                <span>🚚</span> Doprava zdarma nad 60 €
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-honey-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-honey-500">
          <p>© {new Date().getFullYear()} Milan Krokavec – Včelárstvo. Všetky práva vyhradené.</p>
          <div className="flex gap-4">
            <Link href="/vop" className="hover:text-honey-300 transition-colors">VOP</Link>
            <Link href="/ochrana-udajov" className="hover:text-honey-300 transition-colors">GDPR</Link>
            <Link href="/reklamacny-poriadok" className="hover:text-honey-300 transition-colors">Reklamácie</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
