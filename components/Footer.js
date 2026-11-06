import Link from 'next/link';
import { site } from '../lib/site';
import { LogoMark } from './Art';
import Icon from './Icons';

export default function Footer() {
  return (
    <footer className="mt-auto bg-bark-900 text-wax-100">
      <div className="container-page grid gap-10 py-14 text-lg sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="mb-4 flex items-center gap-3">
            <LogoMark className="h-12 w-12" />
            <span className="font-serif text-2xl font-bold text-cream">{site.name}</span>
          </div>
          <p className="text-wax-200">
            Úle a včelárske potreby z vlastnej dielne a med z vlastných úľov v Kraskove.
          </p>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl font-bold text-cream">Obchod</h2>
          <ul className="space-y-2.5">
            <FooterLink href="/produkty">Celá ponuka</FooterLink>
            <FooterLink href="/produkty?kategoria=ule">Úle a nadstavky</FooterLink>
            <FooterLink href="/produkty?kategoria=med">Med a peľ</FooterLink>
            <FooterLink href="/kosarik">Košík</FooterLink>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl font-bold text-cream">Informácie</h2>
          <ul className="space-y-2.5">
            <FooterLink href="/o-nas">O nás</FooterLink>
            <FooterLink href="/vop">Obchodné podmienky</FooterLink>
            <FooterLink href="/reklamacny-poriadok">Reklamačný poriadok</FooterLink>
            <FooterLink href="/ochrana-udajov">Ochrana osobných údajov</FooterLink>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl font-bold text-cream">Kontakt</h2>
          <address className="space-y-3 not-italic">
            <p>
              {site.owner}
              <br />
              {site.street}, {site.zip} {site.city}
            </p>
            <a href={site.phoneHref} className="flex items-center gap-2 font-bold text-honey-300 hover:text-honey-400">
              <Icon name="phone" className="h-5 w-5" /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-cream">
              <Icon name="mail" className="h-5 w-5" /> {site.email}
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-cream">
              <Icon name="facebook" className="h-5 w-5" /> Facebook
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-bark-700">
        <div className="container-page flex flex-col gap-2 py-6 text-base text-wax-200 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.owner} – Včelárstvo
          </p>
          {(site.ico || site.dic) && (
            <p>
              {site.ico && <>IČO: {site.ico}</>}
              {site.ico && site.dic && ' · '}
              {site.dic && <>DIČ: {site.dic}</>}
            </p>
          )}
          <p>Nie sme platiteľmi DPH.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link href={href} className="underline-offset-4 hover:text-cream hover:underline">
        {children}
      </Link>
    </li>
  );
}
