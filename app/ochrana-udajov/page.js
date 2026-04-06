export const metadata = {
  title: 'Ochrana osobných údajov (GDPR)',
  description: 'Zásady ochrany osobných údajov e-shopu Krokavec v súlade s GDPR.',
};

export default function OchranaUdajovPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Ochrana osobných údajov</h1>
      <p className="text-gray-500 text-sm mb-10">
        V súlade s Nariadením EÚ č. 2016/679 (GDPR) a zákonom č. 18/2018 Z. z.
      </p>

      <div className="space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Prevádzkovateľ osobných údajov</h2>
          <p>
            <strong>Milan Krokavec</strong><br />
            Kraskovo 81, 980 26 Kraskovo, Slovenská republika<br />
            E-mail: <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">milan@krokavec.sk</a><br />
            Telefón: <a href="tel:+421911768758" className="text-honey-600 underline">0911 768 758</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Aké osobné údaje spracúvame</h2>
          <p>V súvislosti s nákupom v e-shope spracúvame nasledovné údaje:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Meno a priezvisko</li>
            <li>Doručovacia adresa (ulica, mesto, PSČ, krajina)</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo</li>
            <li>Obsah objednávky (zakúpené položky, ceny)</li>
            <li>Spôsob platby a dopravy</li>
            <li>Poznámka k objednávke (ak je vyplnená)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Účel a právny základ spracúvania</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse mt-2">
              <thead>
                <tr className="bg-honey-50">
                  <th className="text-left p-2 border border-gray-200 font-semibold">Účel</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold">Právny základ</th>
                  <th className="text-left p-2 border border-gray-200 font-semibold">Doba uchovávania</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200">Vybavenie objednávky a plnenie zmluvy</td>
                  <td className="p-2 border border-gray-200">Plnenie zmluvy (čl. 6 ods. 1 písm. b) GDPR)</td>
                  <td className="p-2 border border-gray-200">Po dobu trvania zmluvy + 3 roky</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200">Účtovné a daňové povinnosti</td>
                  <td className="p-2 border border-gray-200">Právna povinnosť (čl. 6 ods. 1 písm. c) GDPR)</td>
                  <td className="p-2 border border-gray-200">10 rokov (zákon o účtovníctve)</td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200">Vybavenie reklamácií</td>
                  <td className="p-2 border border-gray-200">Plnenie zmluvy / právna povinnosť</td>
                  <td className="p-2 border border-gray-200">4 roky od kúpy</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Príjemcovia osobných údajov</h2>
          <p>
            Vaše osobné údaje môžeme poskytnúť nasledovným tretím stranám:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Dopravné spoločnosti</strong> (Slovenská pošta, GLS) – v rozsahu nevyhnutnom pre doručenie</li>
            <li><strong>Poskytovateľ e-mailovej služby</strong> – pre odosielanie potvrdenia objednávok</li>
            <li><strong>Orgány verejnej moci</strong> – ak to vyžaduje zákon</li>
          </ul>
          <p className="mt-2">
            Vaše údaje nie sú predávané tretím stranám na marketingové účely. Neprenášame ich do tretích krajín
            mimo EÚ/EHP.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. Vaše práva</h2>
          <p>Máte nasledovné práva v súvislosti so spracúvaním Vašich osobných údajov:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Právo na prístup</strong> – právo vedieť, aké údaje o Vás spracúvame</li>
            <li><strong>Právo na opravu</strong> – právo na opravu nesprávnych alebo neúplných údajov</li>
            <li><strong>Právo na vymazanie</strong> – právo na výmaz údajov (za zákonných podmienok)</li>
            <li><strong>Právo na obmedzenie spracúvania</strong> – právo požiadať o obmedzenie spracúvania</li>
            <li><strong>Právo na prenosnosť</strong> – právo dostať Vaše údaje v strojovo čitateľnom formáte</li>
            <li><strong>Právo namietať</strong> – právo namietať proti spracúvaniu na základe oprávneného záujmu</li>
            <li><strong>Právo odvolať súhlas</strong> – ak je spracúvanie založené na súhlase</li>
          </ul>
          <p className="mt-2">
            Žiadosť môžete podať e-mailom na{' '}
            <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">milan@krokavec.sk</a>.
            Odpovieme do 30 dní.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Právo podať sťažnosť</h2>
          <p>
            Ak sa domnieva, že spracúvanie Vašich osobných údajov porušuje GDPR, máte právo podať
            sťažnosť na Úrad na ochranu osobných údajov SR:
          </p>
          <p className="mt-2">
            Úrad na ochranu osobných údajov Slovenskej republiky<br />
            Hraničná 12, 820 07 Bratislava<br />
            Tel.: +421 2 3231 3214<br />
            Web: <a href="https://dataprotection.gov.sk" target="_blank" rel="noreferrer" className="text-honey-600 underline">dataprotection.gov.sk</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Cookies</h2>
          <p>
            Táto stránka používa len nevyhnutné technické cookies (napr. obsah košíka uložený
            v localStorage prehliadača). Nepoužívame analytické ani marketingové cookies tretích strán.
            Tieto údaje zostávajú len vo Vašom prehliadači a nie sú odosielané na server.
          </p>
        </section>

      </div>
    </div>
  );
}
