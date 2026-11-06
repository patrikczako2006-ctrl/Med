import Link from 'next/link';
import { ProductArt } from '../components/Art';
import { site } from '../lib/site';

export const metadata = { title: 'Stránka sa nenašla' };

export default function NotFound() {
  return (
    <div className="container-page py-20">
      <div className="card mx-auto max-w-xl p-10 text-center">
        <ProductArt art="frames" className="mx-auto h-40 w-56" />
        <h1 className="mt-4 text-4xl font-bold">Stránka sa nenašla</h1>
        <p className="mt-3 text-xl text-ink-soft">
          Táto stránka neexistuje alebo bola presunutá. Skúste začať od úvodnej stránky, alebo nám zavolajte na{' '}
          <a href={site.phoneHref} className="link">{site.phone}</a>.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn-primary">Úvodná stránka</Link>
          <Link href="/produkty" className="btn-outline">Ponuka</Link>
        </div>
      </div>
    </div>
  );
}
