import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-4">🐝</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Stránka nenájdená</h1>
      <p className="text-gray-500 mb-8">Požadovaná stránka neexistuje alebo bola presunutá.</p>
      <Link
        href="/"
        className="bg-honey-500 hover:bg-honey-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Späť na domovskú stránku
      </Link>
    </div>
  );
}
