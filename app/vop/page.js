import Link from 'next/link';
import LegalPage, { LEGAL_VALID_FROM } from '../../components/LegalPage';
import { site, fullAddress } from '../../lib/site';
import { SHIPPING_FEE, FREE_SHIPPING_FROM, COD_FEE, formatPrice } from '../../lib/pricing';

export const metadata = {
  title: 'Obchodné podmienky',
  description: 'Všeobecné obchodné podmienky e-shopu Krokavec – včelárstvo a med.',
};

export default function VopPage() {
  return (
    <LegalPage title="Obchodné podmienky" intro={`Všeobecné obchodné podmienky platné od ${LEGAL_VALID_FROM}.`}>
      <section>
        <h2>1. Predávajúci</h2>
        <p>
          <strong>{site.owner}</strong>
          <br />
          {fullAddress}, {site.country}
          <br />
          {site.ico && (<>IČO: {site.ico}<br /></>)}
          {site.dic && (<>DIČ: {site.dic}<br /></>)}
          E-mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          <br />
          Telefón: <a href={site.phoneHref}>{site.phone}</a>
        </p>
        <p>
          Predávajúci je fyzická osoba – podnikateľ zapísaný v živnostenskom registri. Predávajúci nie je platiteľom DPH.
        </p>
      </section>

      <section>
        <h2>2. Základné pojmy</h2>
        <ul>
          <li><strong>Predávajúci</strong> – {site.owner}, prevádzkovateľ e-shopu krokavec.sk.</li>
          <li><strong>Kupujúci – spotrebiteľ</strong> – fyzická osoba, ktorá nakupuje mimo svojho podnikania.</li>
          <li><strong>Tovar</strong> – včelárske potreby, med a včelie produkty ponúkané v e-shope.</li>
          <li><strong>Kúpna zmluva</strong> – zmluva uzavretá na diaľku cez e-shop, e-mailom alebo telefonicky.</li>
        </ul>
      </section>

      <section>
        <h2>3. Objednávka a uzavretie zmluvy</h2>
        <p>
          Objednávku môžete urobiť cez formulár v e-shope alebo telefonicky. Objednávka cez e-shop je odoslaná
          kliknutím na tlačidlo <strong>„Objednať s povinnosťou platby“</strong>. Pred odoslaním vidíte celkovú cenu
          vrátane dopravy a poplatkov.
        </p>
        <p>
          Prijatie objednávky vám potvrdíme e-mailom. Kúpna zmluva je uzavretá doručením tohto potvrdenia. Ak tovar
          nie je dostupný, objednávku môžeme odmietnuť – v takom prípade vás bezodkladne kontaktujeme.
        </p>
      </section>

      <section>
        <h2>4. Ceny a platba</h2>
        <p>Ceny sú uvedené v eurách a sú konečné. Predávajúci nie je platiteľom DPH.</p>
        <ul>
          <li><strong>Bankový prevod</strong> – bez poplatku. Tovar odošleme po pripísaní platby na náš účet.</li>
          <li><strong>Dobierka</strong> – platba kuriérovi pri prevzatí, poplatok {formatPrice(COD_FEE)}.</li>
          <li><strong>Hotovosť</strong> – pri osobnom odbere v Kraskove.</li>
        </ul>
      </section>

      <section>
        <h2>5. Doprava a dodanie</h2>
        <p>
          Tovar odošleme do <strong>5 pracovných dní</strong> od prijatia platby (pri prevode) alebo od potvrdenia
          objednávky (pri dobierke). Doručujeme na území Slovenskej republiky; dopravu do zahraničia je možné dohodnúť
          individuálne.
        </p>
        <ul>
          <li>Kuriér: {formatPrice(SHIPPING_FEE)}, pri objednávke tovaru za {FREE_SHIPPING_FROM} € a viac zdarma.</li>
          <li>Osobný odber na adrese {fullAddress}: zdarma, po telefonickej dohode.</li>
        </ul>
        <p>Pri prevzatí zásielky, prosím, skontrolujte, či obal nie je poškodený. Poškodenie zásielky spíšte s kuriérom.</p>
      </section>

      <section>
        <h2>6. Odstúpenie od zmluvy do 14 dní</h2>
        <p>
          Spotrebiteľ môže od zmluvy uzavretej na diaľku odstúpiť bez udania dôvodu do <strong>14 dní</strong> odo dňa
          prevzatia tovaru. Stačí nám to oznámiť e-mailom na <a href={`mailto:${site.email}`}>{site.email}</a>,
          listom na našu adresu alebo pomocou vzorového formulára nižšie.
        </p>
        <p>
          Tovar nám pošlite späť najneskôr do 14 dní od odstúpenia – nepoškodený a pokiaľ možno v pôvodnom obale.
          Náklady na vrátenie tovaru znáša kupujúci. Peniaze vrátane pôvodných nákladov na najlacnejší spôsob dopravy
          vám vrátime do 14 dní od doručenia odstúpenia, nie však skôr, ako nám tovar príde alebo nám preukážete, že
          ste ho odoslali.
        </p>
        <p>
          <strong>Výnimka:</strong> od zmluvy nie je možné odstúpiť pri potravinách (med, peľ) v uzavretom obale,
          ktorý bol po dodaní otvorený, a ktoré z dôvodu ochrany zdravia alebo z hygienických dôvodov nie je možné
          vrátiť.
        </p>
        <h3 className="mt-6 text-xl font-bold">Vzorový formulár na odstúpenie od zmluvy</h3>
        <div className="mt-3 rounded-xl border-2 border-dashed border-wax-300 bg-wax-50 p-5">
          <p>
            Komu: {site.owner}, {fullAddress}, {site.email}
            <br />
            Týmto oznamujem, že odstupujem od zmluvy na tento tovar: …………
            <br />
            Dátum objednania / prevzatia: …………
            <br />
            Číslo objednávky: …………
            <br />
            Meno a adresa: …………
            <br />
            Číslo účtu na vrátenie peňazí: …………
            <br />
            Dátum a podpis (pri listovej forme): …………
          </p>
        </div>
      </section>

      <section>
        <h2>7. Zodpovednosť za vady a reklamácie</h2>
        <p>
          Na tovar platí zákonná lehota <strong>24 mesiacov</strong> od prevzatia. Pri potravinách (med, peľ) je
          rozhodujúci dátum minimálnej trvanlivosti uvedený na obale. Postup pri reklamácii nájdete
          v <Link href="/reklamacny-poriadok">reklamačnom poriadku</Link>.
        </p>
      </section>

      <section>
        <h2>8. Osobné údaje</h2>
        <p>
          Ako spracúvame vaše údaje, sa dočítate v časti <Link href="/ochrana-udajov">Ochrana osobných údajov</Link>.
        </p>
      </section>

      <section>
        <h2>9. Alternatívne riešenie sporov</h2>
        <p>
          Ak nie ste spokojný s tým, ako sme vybavili vašu reklamáciu, alebo sa domnievate, že sme porušili vaše práva,
          napíšte nám najprv na <a href={`mailto:${site.email}`}>{site.email}</a>. Ak vám neodpovieme do 30 dní alebo
          vašu žiadosť zamietneme, môžete podať návrh na alternatívne riešenie sporu subjektu alternatívneho riešenia
          sporov, napríklad Slovenskej obchodnej inšpekcii (<a href="https://www.soi.sk" target="_blank" rel="noreferrer">www.soi.sk</a>).
        </p>
      </section>

      <section>
        <h2>10. Záverečné ustanovenia</h2>
        <p>
          Tieto obchodné podmienky platia od {LEGAL_VALID_FROM}. Na každú objednávku sa vzťahujú podmienky platné
          v čase jej odoslania. Vzťahy, ktoré tu nie sú upravené, sa riadia Občianskym zákonníkom (zákon č. 40/1964 Zb.)
          a zákonom č. 108/2024 Z. z. o ochrane spotrebiteľa.
        </p>
      </section>
    </LegalPage>
  );
}
