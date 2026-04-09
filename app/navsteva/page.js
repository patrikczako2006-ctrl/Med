'use client';
import { useState, useEffect } from 'react';
import AppNav from '../../components/AppNav';

const SPECIALIZATIONS = [
  { label: 'Všeobecný lekár', icon: '🩺' },
  { label: 'Kardiológ', icon: '❤️' },
  { label: 'Neurológ', icon: '🧠' },
  { label: 'Ortopéd', icon: '🦴' },
  { label: 'Dermatológ', icon: '🧴' },
  { label: 'Gastroenterológ', icon: '🫃' },
  { label: 'Endokrinológ', icon: '⚗️' },
  { label: 'Psychiater', icon: '🧘' },
  { label: 'Gynekológ', icon: '🌸' },
  { label: 'Urológ', icon: '💧' },
  { label: 'Oftalmológ', icon: '👁️' },
  { label: 'ORL', icon: '👂' },
];

const AI_QUESTIONS = {
  'Všeobecný lekár': [
    'Kedy presne sa príznaky objavili a ako sa vyvíjali?',
    'Máte v rodine ochorenia ako cukrovka, srdcové problémy alebo rakovina?',
    'Aké lieky momentálne užívate vrátane vitamínov a doplnkov?',
    'Ako by ste ohodnotili svoju únavu na škále 1-10 v poslednom týždni?',
    'Zmenili ste stravu alebo cvičenie v poslednom čase?',
    'Máte alergie na lieky alebo potraviny?',
  ],
  'Kardiológ': [
    'Pociťujete bolesť na hrudníku, palpitácie alebo dýchavičnosť?',
    'Aký je váš typický krvný tlak doma (ak si ho meriate)?',
    'Fajčíte alebo ste fajčili? Koľko rokov?',
    'Máte v rodine predčasné srdcové ochorenia alebo infarkty?',
    'Aká je vaša fyzická aktivita – intenzita a frekvencia?',
    'Máte opuchy nôh alebo členkov?',
  ],
  'Neurológ': [
    'Kde presne sa bolesť hlavy nachádza – čelo, temeno, záhlavie?',
    'Je bolesť pulzujúca alebo stálá? Prichádza s nevolnosťou alebo svetloplachosťou?',
    'Máte závraty, poruchy rovnováhy alebo dvojité videnie?',
    'Pociťujete brnenie alebo slabosť v končatinách?',
    'Zmenila sa vaša pamäť alebo koncentrácia?',
    'Máte poruchy spánku – nespavosť alebo nadmernú ospalosť?',
  ],
  'Dermatológ': [
    'Kedy sa kožný problém prvýkrát objavil a ako sa menil?',
    'Svrbí, páli, alebo je bolestivý?',
    'Je problém na jednom mieste alebo sa rozširuje?',
    'Máte alergiu na niečo – látky, kozmetiku, potraviny?',
    'Používali ste nové kozmetické produkty alebo prišli do styku s novými látkami?',
    'Je problém sezónny alebo celoročný?',
  ],
};

const DEFAULT_QUESTIONS = [
  'Kedy presne sa príznaky objavili a čo ich mohlo spustiť?',
  'Ako sa príznaky menia počas dňa alebo týždňa?',
  'Čo príznaky zhoršuje a čo ich zmierňuje?',
  'Ovplyvňujú príznaky váš každodenný život a prácu?',
  'Máte v rodine podobné ochorenia?',
  'Brali ste nejaké lieky na tieto príznaky a pomohlo to?',
];

export default function NavstevaPage() {
  const [spec, setSpec] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [questions, setQuestions] = useState([]);
  const [checked, setChecked] = useState({});
  const [generating, setGenerating] = useState(false);
  const [saved, setSaved] = useState([]);
  const [step, setStep] = useState(1);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('docready_symptoms') || '[]');
    setSymptoms(s.slice(-5));
    setSaved(JSON.parse(localStorage.getItem('docready_visits') || '[]'));
  }, []);

  const generate = () => {
    if (!spec) return;
    setGenerating(true);
    setTimeout(() => {
      const base = AI_QUESTIONS[spec] || DEFAULT_QUESTIONS;
      const extra = [];
      if (symptoms.length > 0) {
        const topSymptom = symptoms.sort((a, b) => b.severity - a.severity)[0];
        extra.push(`Príznak "${topSymptom.name}" (intenzita ${topSymptom.severity}/10) – kedy bol naposledy horší ako dnes?`);
        if (symptoms.length > 1) {
          extra.push(`Súvisia niektoré príznaky navzájom – napr. ${symptoms[0].name} a ${symptoms[1].name}?`);
        }
      }
      const all = [...extra, ...base].slice(0, 8);
      setQuestions(all);
      setGenerating(false);
      setStep(2);
    }, 1800);
  };

  const toggleCheck = (i) => setChecked(prev => ({ ...prev, [i]: !prev[i] }));

  const saveVisit = () => {
    const visit = {
      id: Date.now(),
      spec,
      date: new Date().toISOString().slice(0, 10),
      questions: questions.filter((_, i) => checked[i]),
      notes,
      symptomCount: symptoms.length,
    };
    const updated = [visit, ...saved];
    setSaved(updated);
    localStorage.setItem('docready_visits', JSON.stringify(updated));
    setStep(3);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AppNav />
      <main className="flex-1 md:ml-60 pb-24 md:pb-0">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">AI príprava na návštevu</h1>
            <p className="text-sm text-gray-500 mt-1">Nechajte AI pripraviť otázky pre lekára na základe vašich príznakov</p>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? 'bg-gradient-to-br from-sky-500 to-indigo-500 text-white' : 'bg-gray-100 text-gray-400'
                }`}>{s}</div>
                <span className={`text-sm hidden sm:inline ${step >= s ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
                  {s === 1 ? 'Špecializácia' : s === 2 ? 'Otázky' : 'Uložené'}
                </span>
                {s < 3 && <div className={`w-8 h-0.5 ${step > s ? 'bg-sky-400' : 'bg-gray-200'}`}></div>}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              {/* Specialization picker */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-4">Ku ktorému lekárovi idete?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SPECIALIZATIONS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSpec(s.label)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                        spec === s.label
                          ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-200'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <span>{s.icon}</span> {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active symptoms summary */}
              {symptoms.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h2 className="font-semibold text-gray-900 mb-3">Vaše posledné príznaky</h2>
                  <div className="space-y-2">
                    {symptoms.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${s.severity >= 7 ? 'bg-red-400' : s.severity >= 4 ? 'bg-orange-400' : 'bg-green-400'}`}></div>
                        <span className="text-gray-700">{s.name}</span>
                        <span className="text-gray-400 text-xs ml-auto">{s.severity}/10</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">AI použije tieto príznaky pri generovaní otázok</p>
                </div>
              )}

              {/* Notes */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-semibold text-gray-900 mb-3">Vaše poznámky (voliteľné)</h2>
                <textarea
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
                  rows={3}
                  placeholder="Čo chcete lekárovi povedať alebo sa opýtať..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>

              <button
                onClick={generate}
                disabled={!spec}
                className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-3.5 rounded-xl text-base hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
                    </svg>
                    AI generuje otázky...
                  </>
                ) : (
                  <>🤖 Generovať otázky s AI</>
                )}
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0">AI</div>
                  <div>
                    <div className="font-semibold text-gray-900">Odporúčané otázky pre {spec}</div>
                    <div className="text-xs text-gray-400">Vyberte otázky ktoré chcete položiť</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {questions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => toggleCheck(i)}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl border transition-all ${
                        checked[i]
                          ? 'border-sky-300 bg-sky-50'
                          : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        checked[i] ? 'border-sky-500 bg-sky-500' : 'border-gray-300'
                      }`}>
                        {checked[i] && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-sm text-gray-700 leading-relaxed">{q}</span>
                    </button>
                  ))}
                </div>
              </div>

              {notes && (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Vaše poznámky</h3>
                  <p className="text-sm text-gray-600">{notes}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50">
                  ← Späť
                </button>
                <button
                  onClick={saveVisit}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90"
                >
                  Uložiť a exportovať PDF
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center shadow-sm">
              <div className="text-5xl mb-4">✅</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Príprava uložená!</h2>
              <p className="text-gray-500 text-sm mb-6">
                Vaše otázky pre {spec} sú uložené. Môžete si ich prezrieť kedykoľvek alebo exportovať ako PDF.
              </p>
              <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 space-y-2">
                {Object.entries(checked).filter(([, v]) => v).map(([k]) => (
                  <div key={k} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-sky-500 mt-0.5 shrink-0">→</span>
                    {questions[Number(k)]}
                  </div>
                ))}
                {Object.values(checked).filter(Boolean).length === 0 && (
                  <div className="text-sm text-gray-400">Nevybrali ste žiadne otázky.</div>
                )}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setStep(1); setSpec(''); setQuestions([]); setChecked({}); setNotes(''); }}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold py-3 rounded-xl text-sm hover:opacity-90"
                >
                  Nová príprava
                </button>
                <a
                  href="/dashboard"
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 flex items-center justify-center"
                >
                  Na prehľad
                </a>
              </div>
            </div>
          )}

          {/* Past visits */}
          {saved.length > 0 && step !== 3 && (
            <div className="mt-8">
              <h2 className="font-semibold text-gray-700 mb-3 text-sm">Predchádzajúce prípravy</h2>
              <div className="space-y-2">
                {saved.slice(0, 3).map(v => (
                  <div key={v.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
                    <div className="text-xl">🤖</div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{v.spec}</div>
                      <div className="text-xs text-gray-400">{new Date(v.date).toLocaleDateString('sk-SK')} · {v.questions?.length || 0} otázok</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
