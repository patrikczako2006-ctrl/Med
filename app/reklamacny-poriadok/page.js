import LegalPage, { LEGAL_VALID_FROM } from '../../components/LegalPage';
import { site, fullAddress } from '../../lib/site';

export const metadata = {
  title: 'Reklamačný poriadok',
  description: 'Ako reklamovať tovar kúpený v e-shope Krokavec.',
};

export default function ReklamacnyPoriadokPage() {
  return (
    <LegalPage title="Reklamačný poriadok" intro={`Platný od ${LEGAL_VALID_FROM}. Ak s tovarom niečo nie je v poriadku, ozvite sa nám – vždy sa dohodneme.`}>
      <section>
        <h2>1. Úvod</h2>
        <p>
          Tento reklamačný poriadok platí pre tovar kúpený v e-shope krokavec.sk. Predávajúcim je {site.owner},
          {' '}{fullAddress}. Riadi sa Občianskym zákonníkom (zákon č. 40/1964 Zb.) a zákonom č. 108/2024 Z. z.
          o ochrane spotrebiteľa.
        </p>
      </section>

      <section>
        <h2>2. Lehota na uplatnenie vád</h2>
        <ul>
          <li>Na všetok tovar platí zákonná lehota <strong>24 mesiacov</strong> od prevzatia.</li>
          <li>Pri potravinách (med, peľ) je rozhodujúci <strong>dátum minimálnej trvanlivosti</strong> na obale.</li>
          <li>
            Za vadu sa nepovažuje opotrebenie bežným používaním, poškodenie nesprávnym použitím alebo skladovaním,
            ani prirodzená kryštalizácia medu.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Ako reklamovať</h2>
        <ul>
          <li>Telefonicky: <a href={site.phoneHref}>{site.phone}</a></li>
          <li>E-mailom: <a href={`mailto:${site.email}`}>{site.email}</a></li>
          <li>Listom alebo osobne: {site.owner}, {fullAddress}</li>
        </ul>
        <p>
          Uveďte, prosím, svoje meno, číslo objednávky, čo je na tovare zlé a ako chcete reklamáciu vybaviť. Pomôže aj
          fotografia vady.
        </p>
      </section>

      <section>
        <h2>4. Postup</h2>
        <ol>
          <li>Oznámite nám vadu a tovar nám po dohode pošlete alebo prinesiete.</li>
          <li>Prijatie reklamácie vám potvrdíme e-mailom alebo písomne.</li>
          <li>Reklamáciu vybavíme najneskôr <strong>do 30 dní</strong> od jej uplatnenia a o výsledku vás budeme informovať.</li>
        </ol>
      </section>

      <section>
        <h2>5. Ako môže byť reklamácia vybavená</h2>
        <ul>
          <li>bezplatnou opravou,</li>
          <li>výmenou za nový kus bez vady,</li>
          <li>primeranou zľavou z ceny,</li>
          <li>vrátením peňazí, ak oprava ani výmena nie sú možné.</li>
        </ul>
        <p>Spôsob vybavenia si vyberáte vy. Iný spôsob vám môžeme navrhnúť len vtedy, ak by zvolený spôsob nebol možný alebo by bol neprimeraný.</p>
      </section>

      <section>
        <h2>6. Zamietnutie reklamácie</h2>
        <p>Ak vadu spôsobilo nesprávne používanie alebo mechanické poškodenie, reklamáciu zamietneme a dôvod vám písomne vysvetlíme.</p>
      </section>

      <section>
        <h2>7. Ak nie ste spokojný</h2>
        <p>
          Môžete sa obrátiť na Slovenskú obchodnú inšpekciu (<a href="https://www.soi.sk" target="_blank" rel="noreferrer">www.soi.sk</a>),
          ktorá je aj subjektom alternatívneho riešenia sporov.
        </p>
      </section>
    </LegalPage>
  );
}
