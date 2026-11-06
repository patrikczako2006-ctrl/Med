import Link from 'next/link';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import CallBox from '../components/CallBox';
import { HeroScene, ProductArt } from '../components/Art';
import Icon from '../components/Icons';
import { site } from '../lib/site';
import { FREE_SHIPPING_FROM, SHIPPING_FEE, COD_FEE, formatPrice } from '../lib/pricing';

export default function HomePage() {
  const featured = products.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="honeycomb relative overflow-hidden border-b border-wax-200 bg-wax-50">
        <div className="container-page grid items-center gap-10 py-12 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow mb-4">Rodinné včelárstvo · Kraskovo</p>
            <h1 className="text-[2.6rem] font-bold leading-[1.1] sm:text-6xl">
              Poctivé úle a&nbsp;med <span className="text-bark-600">z&nbsp;Kraskova</span>
            </h1>
            <p className="mt-6 max-w-xl text-xl text-ink-soft sm:text-[1.35rem] sm:leading-relaxed">
              Úle a včelárske potreby vyrábame vo vlastnej dielni zo sušeného dreva. Med a peľ
              predávame priamo z našich úľov. Radi poradíme začínajúcim aj skúseným včelárom.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/produkty" className="btn-primary !text-xl">
                Pozrieť ponuku
                <Icon name="arrowRight" />
              </Link>
              <a href={site.phoneHref} className="btn-outline !text-xl">
                <Icon name="phone" />
                {site.phone}
              </a>
            </div>
            <ul className="mt-8 grid gap-2.5 text-lg font-semibold sm:grid-cols-2">
              {[
                'Sušené drevo, steny 25 mm',
                'Med bez akýchkoľvek prímesí',
                `Doprava zdarma od ${FREE_SHIPPING_FROM} €`,
                'Osobný odber v Kraskove zdarma',
              ].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-meadow-600 text-white">
                    <Icon name="check" className="h-4 w-4" strokeWidth={3.5} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <HeroScene className="w-full rounded-[28px] shadow-lift" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="kategorie">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow mb-2">Čo ponúkame</p>
          <h2 id="kategorie" className="text-4xl font-bold">Vyberte si z ponuky</h2>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => {
            const count = products.filter((p) => p.category === cat.id).length;
            return (
              <li key={cat.id}>
                <Link
                  href={`/produkty?kategoria=${cat.id}`}
                  className="card group flex h-full flex-col overflow-hidden transition-all hover:-translate-y-1 hover:border-honey-400 hover:shadow-lift"
                >
                  <div className="honeycomb bg-wax-100">
                    <ProductArt art={cat.art} className="mx-auto h-40 w-full max-w-[15rem]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-bold group-hover:text-bark-700">{cat.name}</h3>
                    <p className="mt-1 flex-1 text-lg text-ink-soft">{cat.description}</p>
                    <p className="mt-4 flex items-center gap-2 text-lg font-bold text-bark-700">
                      Zobraziť ({count})
                      <Icon name="arrowRight" className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Featured */}
      <section className="border-y border-wax-200 bg-cream py-16 sm:py-20" aria-labelledby="odporucame">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Najčastejšie objednávané</p>
              <h2 id="odporucame" className="text-4xl font-bold">Odporúčame</h2>
            </div>
            <Link href="/produkty" className="btn-outline">
              Celá ponuka <Icon name="arrowRight" className="h-5 w-5" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* How to order */}
      <section className="container-page py-16 sm:py-20" aria-labelledby="ako-nakupit">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div className="min-w-0">
            <p className="eyebrow mb-2">Jednoducho a bez starostí</p>
            <h2 id="ako-nakupit" className="text-4xl font-bold">Ako u nás nakúpiť</h2>
            <ol className="mt-8 space-y-6">
              {[
                ['Vyberte tovar', 'Pri výrobku kliknite na žlté tlačidlo „Pridať do košíka“.'],
                ['Vyplňte objednávku', 'V košíku kliknite na „Pokračovať k objednávke“ a vyplňte meno, adresu a telefón.'],
                ['Prevezmite zásielku', 'Pošleme ju kuriérom až k vám domov, alebo si ju vyzdvihnete u nás v Kraskove.'],
              ].map(([title, text], i) => (
                <li key={title} className="flex gap-5">
                  <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-honey-400 font-serif text-2xl font-bold text-ink shadow-[inset_0_-3px_0_rgba(140,90,7,.35)]">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <p className="mt-1 text-lg text-ink-soft">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <dl className="mt-10 grid gap-4 rounded-2xl border border-wax-200 bg-cream p-6 text-lg sm:grid-cols-2">
              <div>
                <dt className="font-bold">Kuriér na adresu</dt>
                <dd className="text-ink-soft">{formatPrice(SHIPPING_FEE)}, od {FREE_SHIPPING_FROM} € zdarma</dd>
              </div>
              <div>
                <dt className="font-bold">Osobný odber v Kraskove</dt>
                <dd className="text-ink-soft">zdarma, po dohode</dd>
              </div>
              <div>
                <dt className="font-bold">Platba vopred prevodom</dt>
                <dd className="text-ink-soft">bez poplatku</dd>
              </div>
              <div>
                <dt className="font-bold">Platba na dobierku</dt>
                <dd className="text-ink-soft">+ {formatPrice(COD_FEE)}</dd>
              </div>
            </dl>
          </div>
          <CallBox
            className="lg:mt-24"
            text="Nechce sa vám vypĺňať formulár? Zavolajte nám. Poradíme s výberom úľa aj rámikov a objednávku zapíšeme za vás."
          />
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-bark-800 text-wax-50">
        <div className="container-page grid items-center gap-10 py-16 sm:py-20 md:grid-cols-[auto_1fr]">
          <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-wax-100 ring-8 ring-bark-700 md:h-56 md:w-56">
            <ProductArt art="hive" className="h-40 w-40 md:h-48 md:w-48" />
          </div>
          <div>
            <p className="text-base font-bold uppercase tracking-[0.12em] text-honey-300">Kto sme</p>
            <h2 className="mt-2 text-4xl font-bold text-cream">{site.owner}</h2>
            <p className="mt-4 max-w-2xl text-xl leading-relaxed text-wax-100">
              Včelárstvu sa v Kraskove venujeme s láskou už dlhé roky. Úle vyrábame z kvalitného
              sušeného dreva a med predávame priamo z vlastných úľov. Každý výrobok pred odoslaním
              osobne skontrolujeme.
            </p>
            <Link href="/o-nas" className="btn-primary mt-6">
              Viac o nás <Icon name="arrowRight" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
