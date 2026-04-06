export const metadata = {
  title: 'Obchodné podmienky',
  description: 'Všeobecné obchodné podmienky e-shopu Krokavec – včelárstvo a med.',
};

export default function VopPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Všeobecné obchodné podmienky</h1>
      <p className="text-gray-500 text-sm mb-10">Platné od 1. januára 2024</p>

      <div className="prose prose-gray max-w-none space-y-8 text-sm leading-relaxed text-gray-700">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">1. Identifikácia predávajúceho</h2>
          <p>
            Predávajúci: <strong>Milan Krokavec</strong><br />
            Sídlo: Kraskovo 81, 980 26 Kraskovo, Slovenská republika<br />
            IČO: (doplniť)<br />
            DIČ: (doplniť)<br />
            E-mail: <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">milan@krokavec.sk</a><br />
            Telefón: <a href="tel:+421911768758" className="text-honey-600 underline">0911 768 758</a><br />
          </p>
          <p className="mt-2">
            Predávajúci je fyzická osoba – podnikateľ zapísaný v Živnostenskom registri SR.
            Predávajúci nie je platiteľom DPH (ak sa situácia zmení, bude to oznámené na stránke).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">2. Vymedzenie pojmov</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Predávajúci</strong> – Milan Krokavec, prevádzkovateľ e-shopu krokavec.sk.</li>
            <li><strong>Kupujúci (spotrebiteľ)</strong> – fyzická osoba, ktorá nakupuje tovar na účely nesúvisiace s jej podnikateľskou činnosťou.</li>
            <li><strong>Tovar</strong> – produkty ponúkané v e-shope (včelárske potreby, med, včelie produkty).</li>
            <li><strong>Objednávka</strong> – záväzný prejav vôle kupujúceho kúpiť tovar za dohodnutých podmienok.</li>
            <li><strong>Zmluva</strong> – kúpna zmluva uzavretá na diaľku medzi predávajúcim a kupujúcim.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">3. Objednávka a uzavretie zmluvy</h2>
          <p>
            Kupujúci podá objednávku prostredníctvom e-shopu vyplnením objednávkového formulára. Objednávka je záväzná
            po kliknutí na tlačidlo <strong>„Záväzne objednať"</strong>. Zaslaním objednávky kupujúci potvrdzuje,
            že sa oboznámil s týmito VOP a súhlasí s nimi.
          </p>
          <p className="mt-2">
            Predávajúci potvrdí prijatie objednávky e-mailom na adresu uvedenú kupujúcim. Kúpna zmluva sa považuje
            za uzavretú okamihom doručenia potvrdenia objednávky kupujúcemu. Predávajúci si vyhradzuje právo odmietnuť
            objednávku, ak nie je tovar skladom alebo z iného závažného dôvodu; v takom prípade o tom kupujúceho
            bezodkladne informuje.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">4. Cena tovaru a platobné podmienky</h2>
          <p>
            Ceny sú uvedené v eurách (€). Predávajúci nie je platiteľom DPH. Cena tovaru nezahŕňa náklady
            na dopravu, ktoré sú kupujúcemu zobrazené pred dokončením objednávky.
          </p>
          <p className="mt-2"><strong>Spôsoby platby:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mt-1">
            <li><strong>Bankový prevod</strong> – platba vopred na účet predávajúceho. Tovar bude odoslaný po pripísaní platby.</li>
            <li><strong>Dobierka</strong> – platba v hotovosti pri prevzatí zásielky. Za dobierku sa účtuje poplatok 1,50 €.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">5. Dodacie podmienky</h2>
          <p>
            Predávajúci sa zaväzuje odoslať tovar do <strong>5 pracovných dní</strong> od prijatia platby
            (pri bankovom prevode) alebo od potvrdenia objednávky (pri dobierke). Osobný odber je možný
            na adrese Kraskovo 81, 980 26 Kraskovo po predchádzajúcej dohode.
          </p>
          <p className="mt-2">
            Doprava kuriérom je bezplatná pri objednávke nad 60 €. Pri objednávke nižšej ako 60 €
            je poplatok za dopravu 4,50 €. Osobný odber je bezplatný.
          </p>
          <p className="mt-2">
            Predávajúci nezodpovedá za omeškanie doručenia spôsobené dopravcom alebo okolnosťami
            nezávislými od jeho vôle (vyššia moc).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">6. Právo na odstúpenie od zmluvy (14 dní)</h2>
          <p>
            Kupujúci – spotrebiteľ má právo odstúpiť od zmluvy uzavretej na diaľku bez udania dôvodu
            do <strong>14 dní</strong> odo dňa prevzatia tovaru, v súlade so zákonom č. 102/2014 Z. z.
          </p>
          <p className="mt-2">
            Odstúpenie je potrebné oznámiť predávajúcemu e-mailom na adresu{' '}
            <a href="mailto:milan@krokavec.sk" className="text-honey-600 underline">milan@krokavec.sk</a>{' '}
            alebo písomne na adresu predávajúceho. Po odstúpení je kupujúci povinný vrátiť tovar
            do 14 dní nepoužitý, nepoškodený a v pôvodnom obale. Náklady na vrátenie tovaru znáša kupujúci.
          </p>
          <p className="mt-2">
            Predávajúci vráti kúpnu cenu vrátane nákladov na dopravu (s výnimkou doplnkových nákladov)
            do 14 dní od doručenia oznámenia o odstúpení, avšak najskôr po vrátení tovaru alebo
            po preukázaní jeho odoslania.
          </p>
          <p className="mt-2">
            <strong>Výnimky:</strong> Právo na odstúpenie sa nevzťahuje na potraviny (med, peľ) podľa
            § 7 ods. 6 písm. d) zákona č. 102/2014 Z. z. (tovar rýchlo sa kaziaci alebo s krátkou
            dobou spotreby), ak bola narušená ochranná fólia alebo bol tovar otvorený.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">7. Záručné podmienky a reklamácia</h2>
          <p>
            Na tovar predávaný predávajúcim sa vzťahuje zákonná záručná doba <strong>24 mesiacov</strong>
            {' '}(na potravinárske výrobky zodpovedá dátum minimálnej trvanlivosti na obale). Reklamačný
            postup je upravený v Reklamačnom poriadku dostupnom na stránke{' '}
            <a href="/reklamacny-poriadok" className="text-honey-600 underline">/reklamacny-poriadok</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">8. Ochrana osobných údajov</h2>
          <p>
            Spracovanie osobných údajov kupujúcich sa riadi Zásadami ochrany osobných údajov (GDPR)
            dostupnými na{' '}
            <a href="/ochrana-udajov" className="text-honey-600 underline">/ochrana-udajov</a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">9. Alternatívne riešenie sporov</h2>
          <p>
            V prípade, že spotrebiteľ nie je spokojný s vybavením reklamácie alebo sa domnieva,
            že predávajúci porušil jeho práva, môže podať návrh na alternatívne riešenie sporu
            príslušnému subjektu ARS, napr. Slovenská obchodná inšpekcia (www.soi.sk) alebo
            prostredníctvom platformy ODR (https://ec.europa.eu/consumers/odr/).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">10. Záverečné ustanovenia</h2>
          <p>
            Tieto VOP sú platné a účinné od 1. januára 2024. Predávajúci si vyhradzuje právo
            meniť VOP. Zmeny nadobúdajú účinnosť dňom uverejnenia na stránke. Na objednávky
            podané pred zmenou sa vzťahujú VOP platné v čase objednávky.
          </p>
          <p className="mt-2">
            Právne vzťahy medzi predávajúcim a kupujúcim, ktoré nie sú upravené týmito VOP,
            sa riadia príslušnými ustanoveniami Občianskeho zákonníka, zákona č. 102/2014 Z. z.
            a zákona č. 250/2007 Z. z. o ochrane spotrebiteľa.
          </p>
        </section>

      </div>
    </div>
  );
}
