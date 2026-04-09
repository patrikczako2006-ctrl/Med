'use client';
import Link from 'next/link';

const features = [
  {
    icon: '📋',
    title: 'Denník príznakov',
    desc: 'Zaznamenávajte príznaky s intenzitou, lokalizáciou a fotkami. Nikdy nezabudnete čo ste pociťovali pred návštevou lekára.',
  },
  {
    icon: '💊',
    title: 'Evidencia liekov',
    desc: 'Prehľad všetkých liekov, dávkovaní a upozornenia na užitie. Automatické pripomienky cez email.',
  },
  {
    icon: '🤖',
    title: 'AI príprava na návštevu',
    desc: 'Umelá inteligencia analyzuje vaše príznaky a pripraví zoznam otázok pre lekára. Prídite pripravení.',
  },
  {
    icon: '🧪',
    title: 'Výsledky vyšetrení',
    desc: 'Nahrajte laboratórne výsledky. AI ich preloží do zrozumiteľného jazyka bez lekárskeho slovníka.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Rodinný účet',
    desc: 'Spravujte zdravie celej rodiny na jednom mieste. Ideálne pre rodičov starající sa o deti alebo starých rodičov.',
  },
  {
    icon: '📊',
    title: 'Zdravotná história',
    desc: 'Kompletná zdravotná história na jednom mieste. Exportujte PDF pre nového lekára alebo poisťovňu.',
  },
];

const steps = [
  { n: '01', title: 'Zaregistrujte sa', desc: 'Vytvorte bezplatný účet za 30 sekúnd. Žiadna platobná karta.' },
  { n: '02', title: 'Zaznamenávajte', desc: 'Pridávajte príznaky, lieky a zdravotné záznamy kedykoľvek.' },
  { n: '03', title: 'Prídite pripravení', desc: 'Pred každou návštevou vám AI pripraví otázky a zhrnutie.' },
];

const plans = [
  {
    name: 'Základný',
    price: '0',
    period: 'navždy zadarmo',
    color: 'border-gray-200',
    btnClass: 'border-2 border-sky-500 text-sky-600 hover:bg-sky-50',
    features: ['Denník príznakov (30/mesiac)', 'Evidencia 5 liekov', 'História 3 mesiace', 'Export PDF'],
    missing: ['AI asistent', 'Rodinný účet', 'Laboratórne výsledky', 'Email pripomienky'],
  },
  {
    name: 'Premium',
    price: '4,99',
    period: 'mesačne',
    color: 'border-sky-500 ring-2 ring-sky-200',
    btnClass: 'bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90',
    badge: 'Najobľúbenejší',
    features: ['Neobmedzený denník príznakov', 'Neobmedzené lieky', 'Kompletná história', 'AI asistent na návštevy', 'Interpretácia výsledkov', 'Email pripomienky', 'Export PDF', '1 člen rodiny navyše'],
    missing: [],
  },
  {
    name: 'Rodinný',
    price: '8,99',
    period: 'mesačne',
    color: 'border-indigo-300',
    btnClass: 'bg-indigo-600 text-white hover:bg-indigo-700',
    features: ['Všetko z Premium', 'Až 6 členov rodiny', 'Centrálny rodinný prehľad', 'Prioritná podpora'],
    missing: [],
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
            <span className="font-bold text-xl text-gray-900">DocReady</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <a href="#funkcie" className="hover:text-sky-600 transition-colors">Funkcie</a>
            <a href="#ako-to-funguje" className="hover:text-sky-600 transition-colors">Ako to funguje</a>
            <a href="#ceny" className="hover:text-sky-600 transition-colors">Ceny</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-sky-600 font-medium">
              Prihlásiť sa
            </Link>
            <Link href="/dashboard" className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Začať zadarmo
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse inline-block"></span>
            Nová aplikácia na slovenskom trhu
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Prídite k lekárovi
            <br />
            <span className="bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent">
              vždy pripravení
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            DocReady vám pomôže sledovať príznaky, lieky a zdravotné záznamy. Pred každou návštevou vám AI pripraví personalizované otázky pre lekára.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold px-8 py-4 rounded-xl text-lg hover:opacity-90 transition-opacity shadow-lg shadow-sky-200">
              Začať zadarmo →
            </Link>
            <a href="#funkcie" className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              Zistiť viac
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">Žiadna platobná karta. Bezplatný účet navždy.</p>
        </div>

        {/* App Preview mockup */}
        <div className="max-w-5xl mx-auto mt-16 bg-white rounded-2xl shadow-2xl shadow-sky-100 border border-gray-100 overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <div className="flex-1 bg-white rounded text-xs text-gray-400 text-center py-0.5 ml-4">docready.sk/dashboard</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-sky-50 to-indigo-50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-semibold text-gray-800 mb-1">Dnešné príznaky</div>
                <div className="text-sm text-gray-500">Bolesť hlavy – intenzita 4/10</div>
                <div className="text-sm text-gray-500">Únava – intenzita 6/10</div>
                <div className="mt-2 text-xs text-sky-600 font-medium">+ Pridať príznak</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">💊</div>
                <div className="font-semibold text-gray-800 mb-1">Lieky dnes</div>
                <div className="flex items-center gap-2 text-sm mb-1">
                  <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                  <span className="text-gray-500">Metformin 500mg</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">!</span>
                  <span className="text-gray-500">Atorvastatín 10mg</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-semibold text-gray-800 mb-1">AI príprava</div>
                <div className="text-sm text-gray-500 mb-2">Návšteva: Všeobecný lekár</div>
                <div className="text-xs bg-sky-50 text-sky-700 rounded-lg p-2">
                  &quot;Kedy sa bolesť hlavy zhoršuje – ráno alebo večer?&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: '89%', label: 'pacientov zabudne príznaky u lekára' },
            { n: '67%', label: 'odíde bez odpovede na všetky otázky' },
            { n: '4.2×', label: 'lepšia komunikácia s lekárom' },
            { n: '100%', label: 'slovenčina a GDPR' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-extrabold text-sky-600">{s.n}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="funkcie" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Všetko čo potrebujete</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Komplexný nástroj pre správu vášho zdravia. Navrhnutý pre slovenských pacientov.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-sky-200 hover:shadow-lg transition-all">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="ako-to-funguje" className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ako to funguje</h2>
            <p className="text-gray-500 text-lg">Tri jednoduché kroky k lepšej zdravotnej starostlivosti</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="ceny" className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Jednoduchá cena</h2>
            <p className="text-gray-500 text-lg">Začnite zadarmo. Upgradujte keď budete potrebovať viac.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`bg-white rounded-2xl p-7 border-2 ${p.color} relative`}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                    {p.badge}
                  </div>
                )}
                <div className="mb-5">
                  <div className="font-bold text-gray-900 text-lg">{p.name}</div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-gray-900">€{p.price}</span>
                    <span className="text-gray-400 text-sm">/ {p.period}</span>
                  </div>
                </div>
                <Link href="/dashboard" className={`block text-center py-2.5 px-4 rounded-xl font-semibold text-sm mb-6 transition-all ${p.btnClass}`}>
                  {p.price === '0' ? 'Začať zadarmo' : 'Vyskúšať 14 dní zadarmo'}
                </Link>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span> {f}
                    </li>
                  ))}
                  {p.missing.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-400 line-through">
                      <span className="mt-0.5 shrink-0">✗</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Pre nemocnice a kliniky ponúkame B2B riešenie –{' '}
            <a href="mailto:info@docready.sk" className="text-sky-600 hover:underline">kontaktujte nás</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-sky-500 to-indigo-600 py-20 px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Začnite dnes. Je to zadarmo.</h2>
        <p className="text-sky-100 text-lg mb-8 max-w-xl mx-auto">
          Pripojte sa k tisíckam Slovákov ktorí chodia k lekárovi pripravení.
        </p>
        <Link href="/dashboard" className="bg-white text-sky-600 font-bold px-8 py-4 rounded-xl text-lg hover:bg-sky-50 transition-colors shadow-lg inline-block">
          Vytvoriť bezplatný účet →
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-md flex items-center justify-center text-white font-bold text-xs">D</div>
            <span className="font-bold text-white">DocReady</span>
          </div>
          <div className="text-sm">© 2025 DocReady s.r.o. Slovenská republika · GDPR · Ochrana súkromia</div>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">Podmienky</a>
            <a href="#" className="hover:text-white transition-colors">Súkromie</a>
            <a href="mailto:info@docready.sk" className="hover:text-white transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
