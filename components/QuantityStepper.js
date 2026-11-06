'use client';

import Icon from './Icons';

export default function QuantityStepper({ value, onChange, max = 99, min = 1, label = 'Počet kusov', size = 'lg' }) {
  const btn =
    size === 'lg'
      ? 'h-[3.25rem] w-[3.25rem]'
      : 'h-12 w-12';
  return (
    <div className="inline-flex items-center rounded-xl border-2 border-bark-500/40 bg-white" role="group" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className={`${btn} inline-flex items-center justify-center rounded-l-[10px] text-bark-800 hover:bg-wax-100 disabled:opacity-35`}
        aria-label="Menej o 1 kus"
      >
        <Icon name="minus" strokeWidth={2.5} />
      </button>
      <span className="min-w-[3rem] text-center text-xl font-bold tabular-nums" aria-live="polite">
        {value}
        <span className="sr-only"> ks</span>
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className={`${btn} inline-flex items-center justify-center rounded-r-[10px] text-bark-800 hover:bg-wax-100 disabled:opacity-35`}
        aria-label="Viac o 1 kus"
      >
        <Icon name="plus" strokeWidth={2.5} />
      </button>
    </div>
  );
}
