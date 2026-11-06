import Icon from './Icons';
import { site } from '../lib/site';

// "Prefer to call?" box – many of our customers order by phone.
export default function CallBox({ title = 'Radšej telefonicky?', text = 'Zavolajte nám – poradíme s výberom a objednávku zapíšeme za vás.', className = '' }) {
  return (
    <div className={`rounded-2xl bg-bark-800 p-6 text-wax-50 sm:p-8 ${className}`}>
      <div className="flex flex-col items-start gap-4 min-[400px]:flex-row">
        <span className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-honey-400 text-ink">
          <Icon name="phone" className="h-7 w-7" />
        </span>
        <div>
          <h2 className="font-serif text-2xl font-bold text-cream">{title}</h2>
          <p className="mt-1 text-lg text-wax-100">{text}</p>
          <a href={site.phoneHref} className="mt-3 inline-block whitespace-nowrap font-serif text-[1.6rem] font-bold sm:text-3xl text-honey-300 underline-offset-4 hover:underline">
            {site.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
