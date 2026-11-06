'use client';

import { useEffect, useState } from 'react';

// Lets visitors switch to bigger text with one click (remembered on this device).
export default function FontSizeToggle({ className = '' }) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    setLarge(document.documentElement.dataset.size === 'large');
  }, []);

  function toggle() {
    const next = !large;
    setLarge(next);
    if (next) document.documentElement.dataset.size = 'large';
    else delete document.documentElement.dataset.size;
    try {
      localStorage.setItem('krokavec-font', next ? 'large' : 'normal');
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={large}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 font-semibold transition-colors ${className}`}
    >
      <span aria-hidden="true" className="font-serif text-xl leading-none">
        A<span className="text-sm">A</span>
      </span>
      {large ? 'Bežné písmo' : 'Väčšie písmo'}
    </button>
  );
}

// Runs before the page paints so the chosen size doesn't "jump".
export const fontSizeScript = `try{if(localStorage.getItem('krokavec-font')==='large')document.documentElement.dataset.size='large'}catch(e){}`;
