import Link from 'next/link';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-honey-800 to-honey-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="text-5xl mb-4">🐝</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
              Včelárstvo a med
              <br />
              <span className="text-honey-300">z Kraskova</span>
            </h1>
            <p className="text-honey-200 text-lg mb-8 leading-relaxed">
              Výroba kvalitných včelárskych potrieb a predaj prírodného medu.
              Tradičná remeselnícka výroba z sušeného dreva. Milan Krokavec –
              Kraskovo, Slovensko.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/produkty"
                className="bg-honey-400 hover:bg-honey-300 text-honey-900 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Zobraziť produkty
              </Link>
              <Link
                href="/kontakt"
                className="border border-honey-400 text-honey-200 hover:bg-honey-800 font-medium px-6 py-3 rounded-xl transition-colors"
              >
                Kontaktujte nás
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="bg-honey-50 border-y border-honey-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {[
              { icon: '🪵', text: 'Sušené drevo, steny 25 mm' },
              { icon: '🍯', text: 'Prírodný med bez prímesí' },
              { icon: '🚚', text: 'Doprava po celom Slovensku' },
              { icon: '✅', text: 'Overená kvalita remeselníka' },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-1.5">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Kategórie</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/produkty?kategoria=${cat.id}`}
              className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-honey-300 hover:shadow-md transition-all group"
            >
              <div className="text-4xl mb-2">{cat.icon}</div>
              <div className="font-semibold text-gray-800 group-hover:text-honey-700 transition-colors text-sm">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Vybrané produkty</h2>
          <Link
            href="/produkty"
            className="text-honey-600 hover:text-honey-800 font-medium text-sm"
          >
            Zobraziť všetky →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-honey-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex flex-col md:flex-row items-center gap-8">
          <div className="text-6xl flex-shrink-0">🧑‍🌾</div>
          <div>
            <h2 className="text-2xl font-bold mb-2">Milan Krokavec</h2>
            <p className="text-honey-200 leading-relaxed mb-4">
              Pochádzame z Kraskova a včelárstvu sa venujeme s láskou. Vyrábame
              úle z kvalitného sušeného dreva a predávame prírodný med priamo
              z vlastných úľov. Radi poradíme začínajúcim aj skúseným
              včelárom.
            </p>
            <Link
              href="/o-nas"
              className="text-honey-300 hover:text-white font-medium transition-colors"
            >
              Viac o nás →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
