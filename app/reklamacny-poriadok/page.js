export const metadata = {
  title: 'Reklamačný poriadok',
  description: 'Reklamačný poriadok e-shopu Krokavec – postup pri reklamácii tovaru.',
};

export default function ReklamacnyPoriadokPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reklamačný poriadok</h1>
      <p className="text-gray-500 text-sm mb-10">Platný od 1. januára 2024</p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Všeobecné ustanovenia</h2>
          <p>
            Tento reklamačný poriadok sa vzťahuje na tovar zakúpený prostredníctvom e-shopu krokavec.sk.
            Predávajúcim je Milan Krokavec, Kraskovo 81, 980 26 Kraskovo. Reklamačný poriadok je
            vypracovaný v súlade so zákonom č. 40/1964 Zb. (Občiansky zákonník) a zákonom
            č. 250/2007 Z. z. o ochrane spotrebiteľa.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Záručné podmienky</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Na tovar predávaný predávajúcim sa vzťahuje <strong>zákonná záručná doba 24 mesiacov</strong>
              {' '}odo dňa prevzatia tovaru kupujúcim.
            </li>
            <li>
              Na potravinárske výrobky (med, včelí peľ) je záručná doba určená <strong>dátumom
              minimálnej trvanlivosti</strong> alebo dátumom spotreby vyznačeným na obale.
            </li>
            <li>
              Záručná doba na použitý tovar je 12 mesiacov.
            </li>
            <li>
              Záruka sa nevzťahuje na poškodenie spôsobené nesprávnym použitím, mechanickým
              poškodením, nevhodným skladovaním alebo porušením ochranného obalu (v prípade
              potravinárskych produktov).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Uplatnenie reklamácie</h2>
          <p>Reklamáciu možno uplatniť:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>E-mailom:</strong>{' '}
              <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">milan@krokavec.sk</a>
            </li>
            <li>
              <strong>Telefonicky:</strong>{' '}
              <a href="tel:+421911768758" className="text-honey-600 underline">0911 768 758</a>
            </li>
            <li>
              <strong>Písomne:</strong> Milan Krokavec, Kraskovo 81, 980 26 Kraskovo
            </li>
          </ul>
          <p className="mt-3">
            Pri uplatnení reklamácie kupujúci uvedie: meno a priezvisko, číslo objednávky,
            popis vady, požadovaný spôsob vybavenia reklamácie a priloží doklad o kúpe
            (faktúra alebo potvrdenie objednávky).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Postup pri reklamácii</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Kupujúci oznámi vadu predávajúcemu a zašle (alebo donesie) reklamovaný tovar
              na adresu predávajúceho.
            </li>
            <li>
              Predávajúci vydá kupujúcemu <strong>potvrdenie o uplatnení reklamácie</strong>
              (reklamačný protokol) e-mailom alebo písomne.
            </li>
            <li>
              Predávajúci vybaví reklamáciu <strong>do 30 dní</strong> odo dňa jej uplatnenia.
              O výsledku reklamácie kupujúceho informuje e-mailom.
            </li>
            <li>
              Ak nie je možné reklamáciu vybaviť v stanovenej lehote, predávajúci o tom
              kupujúceho informuje a dohodne ďalší postup.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. Spôsoby vybavenia reklamácie</h2>
          <p>Kupujúci má právo požadovať:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Bezplatnú opravu</strong> vady (ak je možná)</li>
            <li><strong>Výmenu tovaru</strong> za nový kus bez vady</li>
            <li><strong>Primeranú zľavu</strong> z ceny</li>
            <li><strong>Vrátenie kúpnej ceny</strong> (odstúpenie od zmluvy), ak nie je možná oprava ani výmena</li>
          </ul>
          <p className="mt-2">
            Výber spôsobu vybavenia reklamácie prináleží kupujúcemu. Predávajúci môže navrhnúť
            iný spôsob, ak zvolený spôsob je v porovnaní s iným neúmerný alebo neuskutočniteľný.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Neoprávnená reklamácia</h2>
          <p>
            Ak predávajúci zistí, že vada tovaru bola spôsobená kupujúcim (napr. mechanickým
            poškodením, nesprávnym používaním), reklamácia bude zamietnutá. Kupujúci bude
            o zamietnutí informovaný s odôvodnením.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Alternatívne riešenie sporov</h2>
          <p>
            Ak nie je kupujúci spokojný s vybavením reklamácie, môže sa obrátiť na:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Slovenská obchodná inšpekcia (SOI)</strong> – www.soi.sk
            </li>
            <li>
              <strong>Platforma RSO (online)</strong> –{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer" className="text-honey-600 underline">
                ec.europa.eu/consumers/odr
              </a>
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
