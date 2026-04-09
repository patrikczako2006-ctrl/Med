'use client';
import { useState, useEffect } from 'react';
import AppNav from '../../components/AppNav';

const BODY_PARTS = ['Hlava', 'Krk', 'Hrudník', 'Brucho', 'Chrbát', 'Rameno', 'Ruka', 'Noha', 'Celé telo', 'Iné'];
const CATEGORIES = ['Bolesť', 'Únava', 'Teplota', 'Trávenie', 'Dýchanie', 'Spánok', 'Nálada', 'Iné'];

const SEVERITY_LABELS = ['', 'Minimálna', 'Veľmi slabá', 'Slabá', 'Mierna', 'Stredná', 'Výrazná', 'Silná', 'Veľmi silná', 'Neznesiteľná', 'Extrémna'];

function severityColor(n) {
  if (n <= 3) return 'bg-green-500';
  if (n <= 6) return 'bg-orange-400';
  return 'bg-red-500';
}
function severityBg(n) {
  if (n <= 3) return 'bg-green-50 text-green-700 border-green-200';
  if (n <= 6) return 'bg-orange-50 text-orange-700 border-orange-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

const empty = { name: '', category: 'Bolesť', bodyPart: 'Hlava', severity: 5, note: '', date: new Date().toISOString().slice(0, 10) };

export default function SymptomyPage() {
  const [symptoms, setSymptoms] = useState([]);
  const [form, setForm] = useState(empty);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSymptoms(JSON.parse(localStorage.getItem('docready_symptoms') || '[]'));
  }, []);

  const save = () => {
    if (!form.name.trim()) return;
    const updated = [{ ...form, id: Date.now() }, ...symptoms];
    setSymptoms(updated);
    localStorage.setItem('docready_symptoms', JSON.stringify(updated));
    setForm(empty);
    setShowForm(false);
  };

  const remove = (id) => {
    const updated = symptoms.filter(s => s.id !== id);
    setSymptoms(updated);
    localStorage.setItem('docready_symptoms', JSON.stringify(updated));
  };

  const filtered = symptoms.filter(s => {
    if (filter !== 'all' && s.category !== filter) return false;
    if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const grouped = filtered.reduce((acc, s) => {
    const d = s.date;
    if (!acc[d]) acc[d] = [];
    acc[d].push(s);
    return acc;
  }, {});

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppNav />
      <main className="flex-1 md:ml-60 pb-24 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Denník príznakov</h1>
              <p className="text-sm text-gray-500 mt-1">{symptoms.length} zaznamenaných príznakov</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm flex items-center gap-2"
            >
              <span className="text-lg">+</span> Pridať príznak
            </button>
          </div>

          {/* Add form modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-end md:items-center justify-center p-4">
              <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl p-6">
                <h2 className="font-bold text-gray-900 text-lg mb-5">Nový príznak</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Názov príznaku *</label>
                    <input
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                      placeholder="napr. Bolesť hlavy, Únava, Kašeľ..."
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Kategória</label>
                      <select
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.category}
                        onChange={e => setForm({ ...form, category: e.target.value })}
                      >
                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Časť tela</label>
                      <select
                        className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                        value={form.bodyPart}
                        onChange={e => setForm({ ...form, bodyPart: e.target.value })}
                      >
                        {BODY_PARTS.map(b => <option key={b}>{b}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Intenzita: <span className="text-gray-800 normal-case font-bold">{form.severity}/10 – {SEVERITY_LABELS[form.severity]}</span>
                    </label>
                    <input
                      type="range" min="1" max="10"
                      className="mt-2 w-full accent-sky-500"
                      value={form.severity}
                      onChange={e => setForm({ ...form, severity: Number(e.target.value) })}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>1 – Minimálna</span><span>10 – Neznesiteľná</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Dátum</label>
                    <input
                      type="date"
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Poznámka</label>
                    <textarea
                      className="mt-1 w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                      rows={2}
                      placeholder="Opis, kedy nastalo, čo pomohlo..."
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
                    Uložiť príznak
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="mb-5 space-y-3">
            <input
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-white"
              placeholder="Hľadať príznaky..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === 'all' ? 'bg-sky-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                Všetky
              </button>
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === c ? 'bg-sky-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Symptom list */}
          {Object.keys(grouped).length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">📋</div>
              <h3 className="font-semibold text-gray-800 mb-1">Žiadne príznaky</h3>
              <p className="text-sm text-gray-400 mb-4">Začnite zaznamenávať príznaky pre lepšiu prípravu na lekára.</p>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold px-6 py-2.5 rounded-xl text-sm hover:opacity-90"
              >
                Pridať prvý príznak
              </button>
            </div>
          ) : (
            Object.keys(grouped).sort((a, b) => b.localeCompare(a)).map(date => (
              <div key={date} className="mb-5">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 px-1">
                  {new Date(date).toLocaleDateString('sk-SK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
                <div className="space-y-2">
                  {grouped[date].map(s => (
                    <div key={s.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3 hover:border-gray-200 transition-colors">
                      <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${severityColor(s.severity)}`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-gray-900 text-sm">{s.name}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${severityBg(s.severity)}`}>{s.severity}/10</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{s.category}</span>
                          <span className="text-xs text-gray-400">{s.bodyPart}</span>
                        </div>
                        {s.note && <p className="text-xs text-gray-500 mt-1">{s.note}</p>}
                      </div>
                      <button
                        onClick={() => remove(s.id)}
                        className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
