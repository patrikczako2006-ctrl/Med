export const metadata = {
  title: 'O nás',
  description: 'Milan Krokavec – výroba včelárskych potrieb a predaj medu z Kraskova.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">O nás</h1>

      {/* Hero */}
      <div className="bg-honey-800 text-white rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
        <div className="text-7xl flex-shrink-0">🧑‍🌾</div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Milan Krokavec</h2>
          <p className="text-honey-200 leading-relaxed">
            Pochádzam z Kraskova a včelárstvu sa venujem s vášňou a tradíciou.
            Vyrábam včelárske potreby z kvalitného sušeného dreva a predávam
            prírodný med priamo z vlastných úľov. Každý výrobok je robený
            s dôrazom na kvalitu a trvanlivosť.
          </p>
        </div>
      </div>

      {/* Story */}
      <div className="prose text-gray-700 text-sm leading-relaxed space-y-4 mb-10">
        <p>
          Včelárstvo je pre nás viac než remeslo – je to životný štýl. Naša rodina
          sa včeláreniu venuje dlhé roky a postupne sme rozšírili svoju činnosť
          o výrobu vlastných včelárskych potrieb.
        </p>
        <p>
          Vyrábame Langstrothove a B-type úle z sušeného smrekového a borovicového
          dreva s hrúbkou stien 25 mm. Každý úľ prechádza dôkladnou kontrolou pred
          odoslaním. Okrem úľov vyrábame aj rámiky, nástavky, kŕmidlá a príslušenstvo.
        </p>
        <p>
          Náš med zbierame z vlastných úľov umiestnených v čistom prostredí
          slovenského vidieka. Med je prírodný, nefiltrovaný a bez akýchkoľvek
          prímesí. Ponúkame kvetový med, krémový med a včelí peľ.
        </p>
        <p>
          Radi poradíme začínajúcim včelárom pri výbere vhodného úľa
          a konfigurácie pre ich podmienky. Neváhajte nás kontaktovať.
        </p>
      </div>

      {/* Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          {
            icon: '🪵',
            title: 'Kvalitné drevo',
            desc: 'Sušené smrekové a borovicové drevo, hrúbka stien 25 mm.',
          },
          {
            icon: '🍯',
            title: 'Prírodný med',
            desc: 'Zbieraný z vlastných úľov, nefiltrovaný, bez prímesí.',
          },
          {
            icon: '🤝',
            title: 'Osobný prístup',
            desc: 'Poradenstvo a podpora pre každého zákazníka.',
          },
        ].map((v) => (
          <div key={v.title} className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
            <div className="text-4xl mb-3">{v.icon}</div>
            <h3 className="font-bold text-gray-900 mb-1">{v.title}</h3>
            <p className="text-gray-500 text-sm">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-honey-50 rounded-2xl p-6 border border-honey-200 text-center">
        <p className="text-gray-700 mb-3">
          Máte otázky alebo si chcete niečo špeciálne objednať?
        </p>
        <a
          href="/kontakt"
          className="inline-block bg-honey-500 hover:bg-honey-600 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors"
        >
          Kontaktujte nás
        </a>
      </div>
    </div>
  );
}
