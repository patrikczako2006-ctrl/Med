'use client';
import { useState, useEffect } from 'react';
import AppNav from '../../components/AppNav';

const FREQUENCIES = ['1× denne', '2× denne', '3× denne', 'Každé 2 dni', 'Raz týždenne', 'Podľa potreby'];
const TIMES = ['Ráno', 'Na obed', 'Večer', 'Pred spaním', 'Ráno + Večer', 'Ráno + Obed + Večer'];

const emptyMed = {
  name: '', dose: '', frequency: '1× denne', time: 'Ráno',
  reason: '', startDate: new Date().toISOString().slice(0, 10), note: '', taken: false
};

const MED_COLORS = [
  'bg-blue-100 text-blue-700',
  'bg-purple-100 text-purple-700',
  'bg-pink-100 text-pink-700',
  'bg-indigo-100 text-indigo-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
];

export default function LiekyPage() {
  const [meds, setMeds] = useState([]);
  const [form, setForm] = useState(emptyMed);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setMeds(JSON.parse(localStorage.getItem('docready_meds') || '[]'));
  }, []);

  const persist = (updated) => {
    setMeds(updated);
    localStorage.setItem('docready_meds', JSON.stringify(updated));
  };

  const save = () => {
    if (!form.name.trim() || !form.dose.trim()) return;
    persist([{ ...form, id: Date.now() }, ...meds]);
    setForm(emptyMed);
    setShowForm(false);
  };

  const toggleTaken = (id) => {
    persist(meds.map(m => m.id === id ? { ...m, taken: !m.taken } : m));
  };

  const remove = (id) => persist(meds.filter(m => m.id !== id));

  const takenCount = meds.filter(m => m.taken).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppNav />
      <main className="flex-1 md:ml-60 pb-24 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Evidencia liekov</h1>
              <p className="text-sm text-gray-500 mt-1">{takenCount}/{meds.length} užitých dnes</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center gap-2"
            >
              <span className="text-lg">+</span> Pridať liek
            </button>
          </div>

          {/* Progress bar */}
          {meds.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">Denný progres</span>
                <span className="text-sm text-gray-500">{takenCount} z {meds.length}</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${meds.length ? (takenCount / meds.length) * 100 : 0}%` }}
                ></div>
              </div>
              {takenCount === meds.length && meds.length > 0 && (
                <div className="mt-2 text-xs text-green-600 font-medium">Všetky lieky na dnes sú užité!</div>
              )}
            </div>
          )}

          {/* Add form modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Nový liek</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Názov lieku *</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. Metformin, Aspirin..."
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dávka *</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. 500mg, 10ml..."
                        value={form.dose}
                        onChange={e => setForm({ ...form, dose: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Frekvencia</label>
                      <select
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.frequency}
                        onChange={e => setForm({ ...form, frequency: e.target.value })}
                      >
                        {FREQUENCIES.map(f => <option key={f}>{f}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Čas užitia</label>
                      <select
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.time}
                        onChange={e => setForm({ ...form, time: e.target.value })}
                      >
                        {TIMES.map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Od dátumu</label>
                      <input
                        type="date"
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.startDate}
                        onChange={e => setForm({ ...form, startDate: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dôvod užívania</label>
                      <input
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        placeholder="napr. Cukrovka, Vysoký tlak..."
                        value={form.reason}
                        onChange={e => setForm({ ...form, reason: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Poznámka</label>
                      <textarea
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                        rows={2}
                        placeholder="Vedľajšie účinky, pokyny lekára..."
                        value={form.note}
                        onChange={e => setForm({ ...form, note: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setShowForm(false)} className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50">
                    Zrušiť
                  </button>
                  <button onClick={save} className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-2.5 rounded-xl text-sm font-semibold hover:opacity-90">
                    Uložiť liek
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Meds list */}
          {meds.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">💊</div>
              <h3 className="font-semibold text-gray-800 mb-1">Žiadne lieky</h3>
              <p className="text-sm text-gray-400 mb-4">Pridajte lieky ktoré užívate pre lepší prehľad a pripomienky.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90"
              >
                Pridať prvý liek
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {meds.map((m, i) => (
                <div key={m.id} className={`bg-white rounded-2xl border border-gray-100 p-4 transition-all ${m.taken ? 'opacity-60' : ''}`}>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTaken(m.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all shrink-0 ${
                        m.taken
                          ? 'bg-green-100 text-green-600 border-2 border-green-300'
                          : `${MED_COLORS[i % MED_COLORS.length]} border-2 border-transparent`
                      }`}
                      title={m.taken ? 'Označiť ako neužité' : 'Označiť ako užité'}
                    >
                      {m.taken ? '✓' : '💊'}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-semibold text-sm ${m.taken ? 'line-through text-gray-400' : 'text-gray-900'}`}>{m.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{m.dose}</span>
                        {m.taken && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Užité</span>}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2 flex-wrap">
                        <span>{m.frequency}</span>
                        <span>·</span>
                        <span>{m.time}</span>
                        {m.reason && <><span>·</span><span>{m.reason}</span></>}
                      </div>
                    </div>
                    <button
                      onClick={() => remove(m.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors text-xl leading-none shrink-0"
                    >
                      ×
                    </button>
                  </div>
                  {m.note && (
                    <div className="mt-2 ml-14 text-xs text-gray-400 bg-gray-50 rounded-lg px-3 py-2">{m.note}</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Premium banner */}
          <div className="mt-8 bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🔔</div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">Email pripomienky – Premium funkcia</div>
                <div className="text-xs text-gray-500 mt-0.5">Dostávajte upozornenia na užitie liekov priamo na email. Dostupné v Premium pláne.</div>
              </div>
              <a href="/#ceny" className="ml-auto shrink-0 bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90">
                Upgradovať
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
