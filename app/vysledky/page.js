'use client';
import { useState, useEffect } from 'react';
import AppNav from '../../components/AppNav';

const SAMPLE_INTERPRETATIONS = {
  'glukóza': { normal: '3.9–5.5 mmol/L', meaning: 'Hladina krvného cukru (glukózy). Zvýšená hladina môže naznačovať cukrovku alebo prediabetes.', high: 'Zvýšená hladina – konzultujte s lekárom kontrolu cukrovky.', low: 'Nízka hladina – hypoglykémia, môže spôsobiť mdloby.' },
  'hemoglobín': { normal: 'muži 135–175 g/L, ženy 120–160 g/L', meaning: 'Proteín v červených krvinkách prenášajúci kyslík. Nízky = anémia.', high: 'Zvýšený – dehydratácia alebo iné ochorenie.', low: 'Znížený – anémia, únava, dýchavičnosť.' },
  'cholesterol': { normal: '< 5.0 mmol/L', meaning: 'Celkový cholesterol. Zvýšený zvyšuje riziko srdcových ochorení.', high: 'Zvýšený – upravte stravu, zvýšte pohyb alebo konzultujte lieky.', low: 'Nízky – zriedkavé, zvyčajne nie je problém.' },
  'tsh': { normal: '0.4–4.0 mIU/L', meaning: 'Hormón stimulujúci štítnu žľazu. Kontroluje funkciu štítnej žľazy.', high: 'Zvýšený – hypofunkcia štítnej žľazy (hypotyreóza).', low: 'Znížený – hyperfunkcia štítnej žľazy (hypertyreóza).' },
  'kreatinín': { normal: 'muži 62–106 µmol/L, ženy 44–80 µmol/L', meaning: 'Odpadový produkt metabolizmu svalov. Ukazuje funkciu obličiek.', high: 'Zvýšený – možné oslabenie funkcie obličiek.', low: 'Znížený – znížená svalová hmota.' },
};

const emptyResult = { name: '', value: '', unit: '', date: new Date().toISOString().slice(0, 10), note: '', reference: '' };

function interpret(name, value) {
  const key = name.toLowerCase();
  const match = Object.keys(SAMPLE_INTERPRETATIONS).find(k => key.includes(k));
  if (!match) return null;
  const data = SAMPLE_INTERPRETATIONS[match];
  const num = parseFloat(value);
  const [low, high] = (data.normal.match(/[\d.]+/g) || []).map(Number);
  let status = 'normal';
  if (!isNaN(num) && high && num > high) status = 'high';
  if (!isNaN(num) && low && num < low) status = 'low';
  return {
    meaning: data.meaning,
    normal: data.normal,
    status,
    message: status === 'high' ? data.high : status === 'low' ? data.low : 'Hodnota je v normálnom rozsahu.',
  };
}

export default function VysledkyPage() {
  const [results, setResults] = useState([]);
  const [form, setForm] = useState(emptyResult);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    setResults(JSON.parse(localStorage.getItem('docready_results') || '[]'));
  }, []);

  const save = () => {
    if (!form.name.trim() || !form.value.trim()) return;
    const updated = [{ ...form, id: Date.now() }, ...results];
    setResults(updated);
    localStorage.setItem('docready_results', JSON.stringify(updated));
    setForm(emptyResult);
    setShowForm(false);
  };

  const remove = (id) => {
    const updated = results.filter(r => r.id !== id);
    setResults(updated);
    localStorage.setItem('docready_results', JSON.stringify(updated));
  };

  const statusColor = (s) => {
    if (s === 'high') return 'bg-red-50 border-red-200 text-red-700';
    if (s === 'low') return 'bg-orange-50 border-orange-200 text-orange-700';
    return 'bg-green-50 border-green-200 text-green-700';
  };
  const statusIcon = (s) => s === 'high' ? '↑' : s === 'low' ? '↓' : '✓';
  const statusLabel = (s) => s === 'high' ? 'Zvýšené' : s === 'low' ? 'Znížené' : 'V norme';

  const grouped = results.reduce((acc, r) => {
    if (!acc[r.date]) acc[r.date] = [];
    acc[r.date].push(r);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppNav />
      <main className="flex-1 md:ml-60 pb-24 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Výsledky vyšetrení</h1>
              <p className="text-sm text-gray-500 mt-1">AI interpretácia laboratórnych výsledkov</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center gap-2"
            >
              <span className="text-lg">+</span> Pridať výsledok
            </button>
          </div>

          {/* Info banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex gap-3">
            <span className="text-xl shrink-0">⚠️</span>
            <p className="text-xs text-amber-700">
              Interpretácie slúžia len na vzdelávacie účely. Vždy konzultujte výsledky s lekárom. DocReady nie je medicínska služba.
            </p>
          </div>

          {/* Add form */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Nový výsledok</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Názov ukazovateľa *</label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                      placeholder="napr. Glukóza, Hemoglobín, Cholesterol, TSH..."
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                    <p className="text-xs text-gray-400 mt-1">AI rozpozná: Glukóza, Hemoglobín, Cholesterol, TSH, Kreatinín</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Hodnota *</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. 5.8"
                        value={form.value}
                        onChange={e => setForm({ ...form, value: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Jednotka</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. mmol/L"
                        value={form.unit}
                        onChange={e => setForm({ ...form, unit: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Referenčná hodnota</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. 3.9–5.5"
                        value={form.reference}
                        onChange={e => setForm({ ...form, reference: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dátum vyšetrenia</label>
                      <input
                        type="date"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.date}
                        onChange={e => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Poznámka</label>
                    <textarea
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                      rows={2}
                      placeholder="Názov laboratória, lekár, kontext..."
                      value={form.note}
                      onChange={e => setForm({ ...form, note: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                    Zrušiť
                  </button>
                  <button onClick={save} className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
                    Uložiť a interpretovať
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results list */}
          {Object.keys(grouped).length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">🧪</div>
              <h3 className="font-semibold text-gray-800 mb-1">Žiadne výsledky</h3>
              <p className="text-sm text-gray-400 mb-4">Pridajte výsledky krvných testov a AI ich vysvetlí zrozumiteľnou slovenčinou.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90"
              >
                Pridať výsledok
              </button>
            </div>
          ) : (
            Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map(date => (
              <div key={date} className="mb-6">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
                  {new Date(date).toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="space-y-3">
                  {grouped[date].map(r => {
                    const interp = interpret(r.name, r.value);
                    const isExpanded = expandedId === r.id;
                    return (
                      <div key={r.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                        <div className="p-4 flex items-center gap-3">
                          <div className="text-2xl">🧪</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-semibold text-gray-900 text-sm">{r.name}</span>
                              <span className="text-sm font-bold text-gray-800">{r.value} {r.unit}</span>
                              {r.reference && <span className="text-xs text-gray-400">(ref: {r.reference})</span>}
                              {interp && (
                                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColor(interp.status)}`}>
                                  {statusIcon(interp.status)} {statusLabel(interp.status)}
                                </span>
                              )}
                            </div>
                            {r.note && <p className="text-xs text-gray-400 mt-0.5">{r.note}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            {interp && (
                              <button
                                onClick={() => setExpandedId(isExpanded ? null : r.id)}
                                className="text-xs text-sky-600 hover:underline font-medium"
                              >
                                {isExpanded ? 'Skryť' : 'AI výklad'}
                              </button>
                            )}
                            <button onClick={() => remove(r.id)} className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none">×</button>
                          </div>
                        </div>
                        {isExpanded && interp && (
                          <div className="border-t border-gray-50 p-4 bg-sky-50">
                            <div className="flex items-start gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">AI</div>
                              <div className="space-y-2">
                                <p className="text-sm text-gray-700"><strong>Čo to je:</strong> {interp.meaning}</p>
                                <p className="text-sm text-gray-700"><strong>Normálne hodnoty:</strong> {interp.normal}</p>
                                <p className={`text-sm font-medium ${interp.status === 'normal' ? 'text-green-700' : interp.status === 'high' ? 'text-red-700' : 'text-orange-700'}`}>
                                  {interp.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
