import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-honey-900 text-honey-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🐝</span>
              <span className="font-bold text-white text-lg">Krokavec</span>
            </div>
            <p className="text-honey-300 text-sm leading-relaxed">
              Výroba včelárskych potrieb a predaj medu z Kraskova. Tradičná
              výroba s dôrazom na kvalitu.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Rýchle odkazy</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produkty" className="text-honey-300 hover:text-white transition-colors">
                  Produkty
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="text-honey-300 hover:text-white transition-colors">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="text-honey-300 hover:text-white transition-colors">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/kosarik" className="text-honey-300 hover:text-white transition-colors">
                  Košík
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3">Informácie</h3>
            <ul className="space-y-2 text-sm mb-4">
              <li>
                <Link href="/vop" className="text-honey-300 hover:text-white transition-colors">
                  Obchodné podmienky
                </Link>
              </li>
              <li>
                <Link href="/ochrana-udajov" className="text-honey-300 hover:text-white transition-colors">
                  Ochrana osobných údajov
                </Link>
              </li>
              <li>
                <Link href="/reklamacny-poriadok" className="text-honey-300 hover:text-white transition-colors">
                  Reklamačný poriadok
                </Link>
              </li>
            </ul>
            <div className="text-honey-300 text-sm space-y-1">
              <p>Milan Krokavec</p>
              <p>Kraskovo 81, 980 26 Kraskovo</p>
              <p>
                <a href="tel:+421911768758" className="hover:text-white transition-colors">
                  0911 768 758
                </a>
              </p>
              <p>
                <a href="mailto:milan@krokavec.sk" className="hover:text-white transition-colors">
                  milan@krokavec.sk
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-honey-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-honey-400">
          <p>© {new Date().getFullYear()} Milan Krokavec – Včelárstvo. Všetky práva vyhradené.</p>
          <p>IČO: doplniť | DIČ: doplniť</p>
        </div>
      </div>
    </footer>
  );
}
