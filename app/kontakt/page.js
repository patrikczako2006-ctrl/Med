import PageHeader from '../../components/PageHeader';
import Icon from '../../components/Icons';
import { site } from '../../lib/site';

export const metadata = {
  title: 'Kontakt',
  description: 'Kontakt na Milana Krokavca – včelárstvo a med, Kraskovo. Telefón 0911 768 758.',
};

export default function KontaktPage() {
  return (
    <>
      <PageHeader
        title="Kontakt"
        intro="Najrýchlejšie nás zastihnete telefonicky. Na e-maily odpovedáme do 24 hodín."
        crumbs={[{ href: '/', label: 'Domov' }, { label: 'Kontakt' }]}
      />

      <div className="container-page py-12 sm:py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <a href={site.phoneHref} className="group flex min-w-0 items-center gap-4 rounded-2xl bg-bark-800 p-5 sm:gap-5 sm:p-7 text-cream shadow-card transition-colors hover:bg-bark-900">
            <span className="hidden h-16 w-16 flex-shrink-0 min-[400px]:flex items-center justify-center rounded-full bg-honey-400 text-ink">
              <Icon name="phone" className="h-8 w-8" />
            </span>
            <span>
              <span className="block text-lg text-wax-200">Zavolajte nám</span>
              <span className="block whitespace-nowrap font-serif text-[1.6rem] font-bold text-honey-300 group-hover:underline sm:text-4xl">{site.phone}</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="card group flex min-w-0 items-center gap-4 p-5 sm:gap-5 sm:p-7 transition-colors hover:border-honey-400">
            <span className="hidden h-16 w-16 flex-shrink-0 min-[400px]:flex items-center justify-center rounded-full bg-wax-100 text-bark-700">
              <Icon name="mail" className="h-8 w-8" />
            </span>
            <span className="min-w-0">
              <span className="block text-lg text-ink-soft">Napíšte nám</span>
              <span className="block break-all font-serif text-xl font-bold text-bark-800 group-hover:underline sm:text-3xl">{site.email}</span>
            </span>
          </a>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="card p-7 text-lg">
            <h2 className="mb-5 text-2xl font-bold">Adresa</h2>
            <address className="flex gap-4 not-italic">
              <Icon name="pin" className="h-7 w-7 flex-shrink-0 text-bark-600" />
              <span>
                <strong>{site.owner}</strong>
                <br />
                {site.street}
                <br />
                {site.zip} {site.city}
                <br />
                <span className="text-ink-soft">{site.district}</span>
              </span>
            </address>
            {site.ico && <p className="mt-4 text-ink-soft">IČO: {site.ico}</p>}
            <a href={site.mapUrl} target="_blank" rel="noreferrer" className="btn-outline mt-6 w-full sm:w-auto">
              <Icon name="pin" className="h-5 w-5" /> Ukázať na mape
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer" className="link mt-5 flex items-center gap-2">
              <Icon name="facebook" className="h-5 w-5" /> Sledujte nás na Facebooku
            </a>
          </div>

          <div className="space-y-4">
            {[
              ['home', 'Osobný odber', 'Tovar si môžete vyzdvihnúť priamo u nás v Kraskove – zadarmo. Vopred nám, prosím, zavolajte, aby sme boli doma.'],
              ['handshake', 'Poradenstvo', 'Neviete, aký úľ si vybrať? Radi poradíme začínajúcim aj skúseným včelárom.'],
              ['box', 'Objednávky na mieru', 'Prijímame aj špeciálne objednávky – napríklad rámiky na mieru alebo väčšie množstvá.'],
            ].map(([icon, title, text]) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-wax-200 bg-wax-50 p-6">
                <Icon name={icon} className="h-8 w-8 flex-shrink-0 text-bark-600" />
                <div>
                  <h2 className="text-xl font-bold">{title}</h2>
                  <p className="mt-1 text-lg text-ink-soft">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
