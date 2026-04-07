import Link from 'next/link';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export const metadata = {
  title: 'Krokavec – Prírodný med a včelárske potreby z Kraskova',
  description:
    'Objednajte si prírodný med a profesionálne včelárske potreby priamo od výrobcu. Tradičná remeselnícka výroba, sušené drevo, doručenie po celom Slovensku.',
};

const trustItems = [
  { icon: '🪵', title: 'Hrúbka stien 25 mm', desc: 'Sušené smrekové a borovicové drevo pre maximálnu trvanlivosť' },
  { icon: '🍯', title: '100 % prírodný med', desc: 'Nefiltrovaný, bez prímesí, zbieraný priamo z vlastných úľov' },
  { icon: '🚚', title: 'Doručenie po SR', desc: 'Kuriérom alebo osobne v Kraskove – doprava zdarma nad 60 €' },
  { icon: '🔄', title: '14 dní na vrátenie', desc: 'Nakupujte bez rizika. Vrátenie tovaru bez udania dôvodu.' },
];

const stats = [
  { value: '20+', label: 'rokov skúseností' },
  { value: '100%', label: 'prírodný med' },
  { value: '25 mm', label: 'hrúbka stien' },
  { value: '★★★★★', label: 'osobný prístup' },
];

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-honey-800 via-honey-900 to-stone-900 text-white overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-honey-600 opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-10 w-64 h-64 bg-honey-400 opacity-10 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-honey-700/50 border border-honey-500/30 text-honey-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              🐝 Priamo od výrobcu · Kraskovo, Slovensko
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
              Včelárstvo,<br />
              <span className="text-honey-300">na ktoré sa</span><br />
              môžete spoľahnúť
            </h1>
            <p className="text-honey-100 text-lg mb-8 leading-relaxed max-w-xl">
              Vyrábame pevné, teplé úle z kvalitného sušeného dreva a predávame
              čistý prírodný med priamo z vlastných úľov. Každý produkt robíme
              s remeselníckym svedomím – pre včely, ktoré si to zaslúžia.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/produkty"
                className="bg-honey-400 hover:bg-honey-300 text-honey-900 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg shadow-honey-900/30"
              >
                Nakupovať teraz
              </Link>
              <Link
                href="/o-nas"
                className="border border-honey-500/50 text-honey-200 hover:bg-honey-800/50 font-medium px-7 py-3.5 rounded-xl transition-colors"
              >
                Náš príbeh →
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-honey-700/50">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-bold text-honey-300">{s.value}</div>
                  <div className="text-honey-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                  <div className="text-gray-500 text-xs leading-tight hidden sm:block">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Čo u nás nájdete</h2>
          <p className="text-gray-500 text-sm">Všetko pre včelára – od úľa po med</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produkty?kategoria=${cat.id}`}
              className="group bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-honey-400 hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="text-5xl mb-3 group-hover:scale-110 transition-transform inline-block">
                {cat.icon}
              </div>
              <div className="font-bold text-gray-800 group-hover:text-honey-700 transition-colors text-sm">
                {cat.name}
              </div>
              <div className="text-xs text-honey-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                Zobraziť →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-honey-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Najpredávanejšie</h2>
              <p className="text-gray-500 text-sm mt-1">Produkty, ktoré si zákazníci obľúbili najviac</p>
            </div>
            <Link
              href="/produkty"
              className="hidden sm:flex items-center gap-1 text-honey-600 hover:text-honey-800 font-medium text-sm transition-colors"
            >
              Všetky produkty →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link
              href="/produkty"
              className="inline-block bg-honey-500 hover:bg-honey-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Zobraziť všetky produkty
            </Link>
          </div>
        </div>
      </section>

      {/* About / Story teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-honey-800 to-honey-900 rounded-3xl text-white p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="text-7xl flex-shrink-0 animate-bounce" style={{ animationDuration: '3s' }}>
            🧑‍🌾
          </div>
          <div className="flex-1">
            <p className="text-honey-300 text-sm font-semibold uppercase tracking-wider mb-2">
              Priamo od výrobcu
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Milan Krokavec</h2>
            <p className="text-honey-200 leading-relaxed mb-5 max-w-xl">
              Pochádzam z Kraskova a včelárstvu sa venujem celý život. Každý úľ, ktorý
              opustí moju dielňu, je vyrobený z kvalitného sušeného dreva s hrúbkou
              stien 25 mm – pretože dobré úle robia šťastné včely a šťastné včely
              robia výborný med.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/o-nas"
                className="bg-honey-400 hover:bg-honey-300 text-honey-900 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Viac o nás
              </Link>
              <Link
                href="/kontakt"
                className="border border-honey-500/50 text-honey-200 hover:bg-honey-700/50 font-medium px-5 py-2.5 rounded-xl transition-colors text-sm"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Prečo nakupovať u nás?</h2>
            <p className="text-gray-500 text-sm max-w-lg mx-auto">
              Nie sme veľkosklad – sme remeselníci, ktorí vedia čo robia
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🏆',
                title: 'Overená kvalita',
                desc: 'Každý úľ prechádza ručnou kontrolou pred odoslaním. Žiadne kompromisy pri výbere materiálu.',
              },
              {
                icon: '🌿',
                title: 'Prírodné materiály',
                desc: 'Len sušené drevo, žiadna vlhkosť, žiadne lacné náhrady. Úle, ktoré vydržia desaťročia.',
              },
              {
                icon: '🤝',
                title: 'Poradenstvo zadarmo',
                desc: 'Začínate s včelarením? Zavolajte nám – radi poradíme s výberom vhodného úľa a vybavenia.',
              },
              {
                icon: '📦',
                title: 'Bezpečné balenie',
                desc: 'Každý produkt balíme tak, aby dorazil nepoškodený. Kuriér alebo osobný odber v Kraskove.',
              },
              {
                icon: '🔄',
                title: '14 dní na vrátenie',
                desc: 'Nehodí sa vám produkt? Vráťte ho do 14 dní bez otázok. Vaša spokojnosť je na prvom mieste.',
              },
              {
                icon: '💛',
                title: 'S láskou k včelám',
                desc: 'Každý náš produkt je navrhnutý s rešpektom k včelám a k prírode. To cítiť na každom kusíku.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-honey-200 hover:bg-honey-50 transition-colors"
              >
                <span className="text-3xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-honey-500 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Pripravení začať s včelarením?
          </h2>
          <p className="text-honey-100 mb-6">
            Prezrite si náš sortiment alebo nás kontaktujte priamo – zostavíme vám ponuku na mieru.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/produkty"
              className="bg-white text-honey-700 hover:bg-honey-50 font-bold px-6 py-3 rounded-xl transition-colors shadow"
            >
              Prezrieť produkty
            </Link>
            <Link
              href="/kontakt"
              className="bg-honey-600 hover:bg-honey-700 text-white font-medium px-6 py-3 rounded-xl transition-colors border border-honey-400/30"
            >
              Napíšte nám
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
