import LegalPage from '../../components/LegalPage';
import { site, fullAddress } from '../../lib/site';

export const metadata = {
  title: 'Ochrana osobných údajov',
  description: 'Ako e-shop Krokavec spracúva osobné údaje zákazníkov (GDPR).',
};

export default function OchranaUdajovPage() {
  return (
    <LegalPage
      title="Ochrana osobných údajov"
      intro="Vaše údaje používame len na to, aby sme vám mohli poslať objednaný tovar. Nikomu ich nepredávame."
    >
      <section>
        <h2>1. Kto vaše údaje spracúva</h2>
        <p>
          <strong>{site.owner}</strong>, {fullAddress}, {site.country}
          <br />
          E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>, telefón: <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p>Riadime sa nariadením EÚ 2016/679 (GDPR) a zákonom č. 18/2018 Z. z. o ochrane osobných údajov.</p>
      </section>

      <section>
        <h2>2. Aké údaje spracúvame</h2>
        <ul>
          <li>meno a priezvisko, telefón a e-mail,</li>
          <li>doručovaciu adresu,</li>
          <li>obsah objednávky, spôsob dopravy a platby, poznámku k objednávke.</li>
        </ul>
      </section>

      <section>
        <h2>3. Prečo a ako dlho</h2>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Účel</th>
                <th>Právny základ</th>
                <th>Ako dlho</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vybavenie objednávky</td>
                <td>Plnenie zmluvy – čl. 6 ods. 1 písm. b) GDPR</td>
                <td>Počas vybavovania objednávky a uplatnenia práv z vád</td>
              </tr>
              <tr>
                <td>Účtovníctvo a dane</td>
                <td>Zákonná povinnosť – čl. 6 ods. 1 písm. c) GDPR</td>
                <td>10 rokov (zákon o účtovníctve)</td>
              </tr>
              <tr>
                <td>Vybavenie reklamácií</td>
                <td>Zákonná povinnosť – čl. 6 ods. 1 písm. c) GDPR</td>
                <td>Počas reklamácie a následne podľa zákona</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">Na spracúvanie údajov pri objednávke nepotrebujeme váš súhlas – údaje sú nevyhnutné na splnenie zmluvy.</p>
      </section>

      <section>
        <h2>4. Komu údaje odovzdávame</h2>
        <ul>
          <li>prepravcovi – len meno, adresu a telefón potrebné na doručenie,</li>
          <li>poskytovateľovi e-mailovej služby a webhostingu,</li>
          <li>štátnym orgánom, ak to vyžaduje zákon.</li>
        </ul>
        <p>Údaje nepredávame a nepoužívame na reklamu.</p>
      </section>

      <section>
        <h2>5. Vaše práva</h2>
        <p>Máte právo:</p>
        <ul>
          <li>vedieť, aké údaje o vás máme, a dostať ich kópiu,</li>
          <li>požiadať o opravu nesprávnych údajov,</li>
          <li>požiadať o vymazanie údajov, ak ich už nemusíme uchovávať podľa zákona,</li>
          <li>požiadať o obmedzenie spracúvania a o prenos údajov,</li>
          <li>namietať proti spracúvaniu.</li>
        </ul>
        <p>
          Stačí napísať na <a href={`mailto:${site.email}`}>{site.email}</a> alebo zavolať. Odpovieme najneskôr do 30 dní.
        </p>
      </section>

      <section>
        <h2>6. Sťažnosť</h2>
        <p>
          Ak sa domnievate, že s vašimi údajmi nezaobchádzame správne, môžete podať sťažnosť na Úrad na ochranu osobných
          údajov Slovenskej republiky, Hraničná 12, 820 07 Bratislava,{' '}
          <a href="https://dataprotection.gov.sk" target="_blank" rel="noreferrer">dataprotection.gov.sk</a>.
        </p>
      </section>

      <section>
        <h2>7. Cookies a ukladanie v prehliadači</h2>
        <p>
          Nepoužívame reklamné ani analytické cookies. Vo vašom prehliadači si ukladáme len obsah košíka a nastavenie
          veľkosti písma, aby ste o ne neprišli. Tieto údaje zostávajú vo vašom zariadení a neposielajú sa nám.
          Písma stránky sú uložené priamo na našom serveri, takže sa pri návšteve nič neposiela spoločnosti Google.
        </p>
      </section>
    </LegalPage>
  );
}
