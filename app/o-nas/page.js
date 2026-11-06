import Link from 'next/link';
import PageHeader from '../../components/PageHeader';
import CallBox from '../../components/CallBox';
import { HeroScene } from '../../components/Art';
import Icon from '../../components/Icons';
import { site } from '../../lib/site';

export const metadata = {
  title: 'O nás',
  description: 'Milan Krokavec – výroba úľov a včelárskych potrieb a predaj medu z Kraskova.',
};

const values = [
  { icon: 'wood', title: 'Kvalitné drevo', text: 'Sušené smrekové a borovicové drevo, steny hrubé 25 mm. Úle vydržia roky.' },
  { icon: 'jar', title: 'Poctivý med', text: 'Z vlastných úľov, nefiltrovaný a bez akýchkoľvek prímesí.' },
  { icon: 'handshake', title: 'Osobný prístup', text: 'Poradíme s výberom úľa aj rámikov. Pokojne nám zavolajte.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="O nás" title="Včelárstvo Krokavec z Kraskova" crumbs={[{ href: '/', label: 'Domov' }, { label: 'O nás' }]} />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5 text-xl leading-relaxed">
            <p className="font-serif text-2xl font-semibold leading-snug text-bark-800">
              Včelárstvo je pre nás viac než remeslo – je to spôsob života.
            </p>
            <p>
              Včeláreniu sa v Kraskove venujeme dlhé roky. Postupne sme začali vyrábať aj vlastné včelárske potreby,
              pretože sme chceli úle, na ktoré sa dá spoľahnúť.
            </p>
            <p>
              Vyrábame úle Langstroth a B-typ zo sušeného smrekového a borovicového dreva s hrúbkou stien 25 mm. Každý
              úľ pred odoslaním dôkladne skontrolujeme. Okrem úľov vyrábame aj rámiky, nadstavky a ďalšie príslušenstvo.
            </p>
            <p>
              Med zbierame z vlastných úľov v čistom prostredí slovenského vidieka. Je prírodný, nefiltrovaný a bez
              akýchkoľvek prímesí. Ponúkame kvetový a krémový med aj včelí peľ.
            </p>
          </div>
          <HeroScene className="w-full rounded-[28px] shadow-lift" />
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <li key={v.title} className="card p-7">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-honey-400 text-ink">
                <Icon name={v.icon} className="h-8 w-8" />
              </span>
              <h2 className="mt-4 text-2xl font-bold">{v.title}</h2>
              <p className="mt-2 text-lg text-ink-soft">{v.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <CallBox title="Začínate so včelami?" text="Radi poradíme, aký úľ a koľko rámikov potrebujete. Stačí zavolať." />
          <div className="card flex flex-col justify-center p-8">
            <h2 className="text-2xl font-bold">Pozrite si našu ponuku</h2>
            <p className="mt-2 text-lg text-ink-soft">Úle, nadstavky, rámiky, príslušenstvo a med z Kraskova.</p>
            <Link href="/produkty" className="btn-primary mt-5 self-start">
              Prejsť na ponuku <Icon name="arrowRight" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
