'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AppNav from '../../components/AppNav';

const todayStr = () => new Date().toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long' });

function HealthScoreRing({ score }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <svg width="130" height="130" viewBox="0 0 130 130">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#e0f2fe" strokeWidth="12" />
      <circle
        cx="65" cy="65" r={r} fill="none"
        stroke="url(#grad)" strokeWidth="12"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        transform="rotate(-90 65 65)"
      />
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <text x="65" y="60" textAnchor="middle" className="text-2xl font-bold" fill="#1e293b" fontSize="26" fontWeight="700">{score}</text>
      <text x="65" y="78" textAnchor="middle" fill="#94a3b8" fontSize="11">zdravie</text>
    </svg>
  );
}

export default function DashboardPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('docready_symptoms') || '[]');
    const m = JSON.parse(localStorage.getItem('docready_meds') || '[]');
    setSymptoms(s);
    setMeds(m);
  }, []);

  const recentSymptoms = symptoms.slice(-3).reverse();
  const todayMeds = meds.slice(0, 4);
  const score = Math.max(40, 100 - symptoms.filter(s => {
    const d = new Date(s.date);
    const now = new Date();
    return (now - d) / 864e5 < 7;
  }).length * 5);

  const quickActions = [
    { href: '/symptomy', icon: '📋', label: 'Pridať príznak', color: 'bg-blue-50 text-blue-700 border-blue-100' },
    { href: '/lieky', icon: '💊', label: 'Pridať liek', color: 'bg-purple-50 text-purple-700 border-purple-100' },
    { href: '/navsteva', icon: '🤖', label: 'AI príprava', color: 'bg-sky-50 text-sky-700 border-sky-100' },
    { href: '/vysledky', icon: '🧪', label: 'Výsledky', color: 'bg-green-50 text-green-700 border-green-100' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppNav />
      <main className="flex-1 md:ml-60 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="text-sm text-gray-400 capitalize">{todayStr()}</div>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Dobrý deň, Ján 👋</h1>
          </div>

          {/* Top cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {/* Health score */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col items-center shadow-sm">
              <div className="text-sm font-semibold text-gray-500 mb-3">Zdravotné skóre</div>
              <HealthScoreRing score={score} />
              <div className="mt-3 text-xs text-center text-gray-400">
                {score >= 80 ? 'Skvelý stav! Pokračujte.' : score >= 60 ? 'Niekoľko aktívnych príznakov.' : 'Navštívte lekára.'}
              </div>
            </div>

            {/* This week stats */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="text-sm font-semibold text-gray-500 mb-4">Tento týždeň</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Zaznamenané príznaky</span>
                  <span className="font-bold text-gray-900">{symptoms.filter(s => { const d = new Date(s.date); const now = new Date(); return (now - d) / 864e5 < 7; }).length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aktívne lieky</span>
                  <span className="font-bold text-gray-900">{meds.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">AI prípravy</span>
                  <span className="font-bold text-gray-900">0</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50">
                <div className="text-xs text-gray-400">Pravidelnosť záznamu</div>
                <div className="flex gap-1 mt-2">
                  {[1,1,0,1,1,0,1].map((a, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full ${a ? 'bg-sky-400' : 'bg-gray-100'}`}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Next appointment */}
            <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-5 text-white shadow-sm">
              <div className="text-sm font-semibold text-sky-100 mb-3">Nasledujúca návšteva</div>
              <div className="text-2xl font-bold mb-1">Všeobecný lekár</div>
              <div className="text-sky-200 text-sm mb-4">MUDr. Kováčová · 15. apríla</div>
              <Link href="/navsteva" className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors inline-block">
                Pripraviť sa s AI →
              </Link>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {quickActions.map((a) => (
              <Link key={a.href} href={a.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl border font-medium text-sm transition-all hover:shadow-md ${a.color}`}>
                <span className="text-xl">{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Recent symptoms */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900">Posledné príznaky</h2>
                <Link href="/symptomy" className="text-xs text-sky-600 hover:underline">Zobraziť všetky</Link>
              </div>
              {recentSymptoms.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-3xl mb-2">📋</div>
                  <div className="text-sm">Zatiaľ žiadne príznaky</div>
                  <Link href="/symptomy" className="text-xs text-sky-600 hover:underline mt-2 inline-block">Pridať prvý →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentSymptoms.map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${s.severity >= 7 ? 'bg-red-400' : s.severity >= 4 ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{s.name}</div>
                        <div className="text-xs text-gray-400">{new Date(s.date).toLocaleDateString('sk-SK')}</div>
                      </div>
                      <div className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{s.severity}/10</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Medications today */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-900">Lieky dnes</h2>
                <Link href="/lieky" className="text-xs text-sky-600 hover:underline">Spravovať</Link>
              </div>
              {todayMeds.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-3xl mb-2">💊</div>
                  <div className="text-sm">Žiadne aktívne lieky</div>
                  <Link href="/lieky" className="text-xs text-sky-600 hover:underline mt-2 inline-block">Pridať liek →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {todayMeds.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-lg">💊</div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{m.name}</div>
                        <div className="text-xs text-gray-400">{m.dose} · {m.frequency}</div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${m.taken ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-500'}`}>
                        {m.taken ? '✓' : '!'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI tip */}
          <div className="mt-5 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-sm shrink-0">AI</div>
              <div>
                <div className="font-semibold text-gray-800 text-sm mb-1">Tip od DocReady AI</div>
                <div className="text-sm text-gray-600">
                  Máte naplánovanú návštevu lekára? Zaznamenávajte príznaky aspoň 3-7 dní vopred. Lekár tak bude mať presnejší obraz o vašom stave a môže urobiť lepšiu diagnózu.
                </div>
                <Link href="/navsteva" className="text-xs text-sky-600 hover:underline mt-2 inline-block">Pripraviť sa na návštevu →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
