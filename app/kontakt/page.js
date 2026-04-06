export const metadata = {
  title: 'Kontakt',
  description: 'Kontaktujte Milan Krokavec – včelárstvo a med, Kraskovo.',
};

export default function KontaktPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Kontakt</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact info */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="font-bold text-gray-900 text-lg mb-6">Kontaktné údaje</h2>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="text-2xl">🧑‍🌾</span>
              <div>
                <p className="font-semibold text-gray-900">Milan Krokavec</p>
                <p className="text-gray-500 text-sm">IČO: (doplniť)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="font-semibold text-gray-900">Adresa</p>
                <p className="text-gray-600 text-sm">
                  Kraskovo 81<br />
                  980 26 Kraskovo<br />
                  Slovenská republika
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <p className="font-semibold text-gray-900">Telefón</p>
                <a
                  href="tel:+421911768758"
                  className="text-honey-600 hover:text-honey-800 transition-colors text-sm"
                >
                  0911 768 758
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">✉️</span>
              <div>
                <p className="font-semibold text-gray-900">E-mail</p>
                <a
                  href="mailto:milan@krokavec.sk"
                  className="text-honey-600 hover:text-honey-800 transition-colors text-sm"
                >
                  milan@krokavec.sk
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="text-2xl">🕒</span>
              <div>
                <p className="font-semibold text-gray-900">Otváracie hodiny</p>
                <p className="text-gray-600 text-sm">
                  Osobný odber po predchádzajúcej dohode.<br />
                  Odpovieme do 24 hodín.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info card */}
        <div className="space-y-5">
          <div className="bg-honey-50 rounded-2xl p-6 border border-honey-200">
            <h3 className="font-bold text-honey-900 mb-2">📦 Osobný odber</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Tovar je možné vyzdvihnúť osobne na adrese Kraskovo 81
              po predchádzajúcom telefonickom alebo e-mailovom dohodnutí.
              Osobný odber je bezplatný.
            </p>
          </div>

          <div className="bg-honey-50 rounded-2xl p-6 border border-honey-200">
            <h3 className="font-bold text-honey-900 mb-2">🐝 Poradenstvo</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Ak neviete, aký úľ alebo konfiguráciu si vybrať, radi poradíme.
              Stačí nás kontaktovať telefonicky alebo e-mailom – sme tu pre Vás.
            </p>
          </div>

          <div className="bg-honey-50 rounded-2xl p-6 border border-honey-200">
            <h3 className="font-bold text-honey-900 mb-2">🛒 Špeciálne objednávky</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Prijímame aj špeciálne objednávky – napr. rámiky na mieru
              alebo väčšie množstvá. Kontaktujte nás s požiadavkou.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3">Sledujte nás</h3>
            <a
              href="https://www.facebook.com/krokavec.sk/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
            >
              <span className="text-xl">📘</span>
              Facebook – Krokavec
            </a>
          </div>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="mt-6 bg-honey-50 rounded-2xl p-8 border border-honey-100 text-center">
        <p className="text-gray-500 text-sm">
          📍 Kraskovo 81, 980 26 Kraskovo – obec v okrese Revúca, Banskobystrický kraj
        </p>
        <a
          href="https://maps.google.com/?q=Kraskovo+81,+980+26+Kraskovo"
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-3 text-honey-600 hover:text-honey-800 text-sm font-medium transition-colors"
        >
          Zobraziť na Google Maps →
        </a>
      </div>
    </div>
  );
}
