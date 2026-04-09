'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', icon: '🏠', label: 'Prehľad' },
  { href: '/symptomy', icon: '📋', label: 'Príznaky' },
  { href: '/lieky', icon: '💊', label: 'Lieky' },
  { href: '/navsteva', icon: '🤖', label: 'Návšteva AI' },
  { href: '/vysledky', icon: '🧪', label: 'Výsledky' },
];

export default function AppNav() {
  const pathname = usePathname();
  return (
    <>
      {/* Sidebar – desktop */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen fixed left-0 top-0 z-40">
        <div className="p-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">D</div>
            <span className="font-bold text-lg text-gray-900">DocReady</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                pathname === item.href
                  ? 'bg-sky-50 text-sky-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 rounded-xl p-3 text-center">
            <div className="text-xs text-gray-500 mb-1">Plán: Základný</div>
            <Link href="/#ceny" className="text-xs font-semibold text-sky-600 hover:underline">
              Upgradovať na Premium →
            </Link>
          </div>
          <div className="mt-3 flex items-center gap-2 px-1">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-indigo-400 flex items-center justify-center text-white text-xs font-bold">J</div>
            <div>
              <div className="text-xs font-semibold text-gray-800">Ján Novák</div>
              <div className="text-xs text-gray-400">jan@email.sk</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Bottom nav – mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 flex flex-col items-center py-2 text-xs transition-colors ${
              pathname === item.href ? 'text-sky-600' : 'text-gray-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="mt-0.5">{item.label.split(' ')[0]}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
