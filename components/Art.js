// Hand-drawn style SVG illustrations used instead of photos/emoji.
// Replace with real product photos later if you have them.

const C = {
  line: '#5E3B1B',
  ink: '#2A1E12',
  woodLight: '#E8C08A',
  wood: '#D6A25E',
  woodDark: '#A9743D',
  metal: '#B8C1C7',
  metalDark: '#7D8990',
  honey: '#E39B12',
  honeyLight: '#F5BE45',
  cream: '#F3DCA0',
  glass: '#FFF8EA',
  ground: '#E6D6A8',
  leaf: '#6E9B4E',
};

export function Bee({ x = 0, y = 0, s = 1, r = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <ellipse cx="-3" cy="-8" rx="6" ry="4.2" fill="#fff" fillOpacity=".9" stroke={C.line} strokeWidth="1.2" transform="rotate(-20 -3 -8)" />
      <ellipse cx="4" cy="-9" rx="5" ry="3.6" fill="#fff" fillOpacity=".9" stroke={C.line} strokeWidth="1.2" transform="rotate(15 4 -9)" />
      <ellipse cx="0" cy="0" rx="9.5" ry="6.5" fill={C.honeyLight} stroke={C.ink} strokeWidth="1.6" />
      <path d="M-3.5 -5.6v11.2M2 -6.2v12.4" stroke={C.ink} strokeWidth="2.4" />
      <circle cx="9.5" cy="-1" r="3.6" fill={C.ink} />
    </g>
  );
}

function Ground({ cx = 120, cy = 162, rx = 92 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry="9" fill={C.ground} opacity=".75" />;
}

function Grain({ x, y, w }) {
  return (
    <path
      d={`M${x + 8} ${y + 10}c${w * 0.2} -3 ${w * 0.35} 3 ${w * 0.55} 0M${x + w * 0.45} ${y + 26}c${w * 0.15} -3 ${w * 0.3} 3 ${w * 0.45} 0`}
      fill="none"
      stroke={C.woodDark}
      strokeOpacity=".45"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  );
}

/** A complete hive: stand, bottom board, two boxes, metal roof. Drawn at 0..120 wide. */
export function HiveShape({ x = 0, y = 0, s = 1, boxes = 2 }) {
  const boxH = 38;
  const top = 26 + (2 - boxes) * boxH;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} strokeLinejoin="round">
      {/* stand */}
      <rect x="4" y="126" width="112" height="7" rx="2" fill={C.woodDark} stroke={C.line} strokeWidth="2" />
      <rect x="12" y="133" width="8" height="14" fill={C.woodDark} stroke={C.line} strokeWidth="2" />
      <rect x="100" y="133" width="8" height="14" fill={C.woodDark} stroke={C.line} strokeWidth="2" />
      {/* bottom board + entrance */}
      <rect x="6" y="114" width="108" height="12" rx="2" fill={C.wood} stroke={C.line} strokeWidth="2" />
      <rect x="40" y="118" width="40" height="5" rx="2.5" fill={C.ink} />
      {/* landing board */}
      <path d="M36 126h48l6 6H30z" fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      {/* boxes */}
      {Array.from({ length: boxes }).map((_, i) => {
        const by = top + 12 + i * boxH;
        return (
          <g key={i}>
            <rect x="8" y={by} width="104" height={boxH} fill={i % 2 ? C.wood : C.woodLight} stroke={C.line} strokeWidth="2" />
            <Grain x={8} y={by} w={104} />
            <rect x="48" y={by + 15} width="24" height="7" rx="3.5" fill={C.woodDark} stroke={C.line} strokeWidth="1.5" />
          </g>
        );
      })}
      {/* roof */}
      <rect x="0" y={top} width="120" height="14" rx="3" fill={C.metal} stroke="#56626A" strokeWidth="2" />
      <path d={`M6 ${top + 4}h108`} stroke="#fff" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function HoneycombPattern({ id }) {
  return (
    <pattern id={id} width="14" height="24.25" patternUnits="userSpaceOnUse">
      <path d="M7 0l7 4v8l-7 4-7-4V4zM7 16v8.25" fill={C.honeyLight} stroke="#B87708" strokeWidth="1.3" />
    </pattern>
  );
}

function Frame({ x, y, w = 92, h = 66, comb = true, id }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
      {/* top bar with ears */}
      <rect x="-10" y="0" width={w + 20} height="9" rx="2" fill={C.wood} stroke={C.line} strokeWidth="2" />
      <rect x="0" y="9" width={w} height={h} fill="none" stroke={C.line} strokeWidth="2" />
      {comb ? (
        <rect x="6" y="14" width={w - 12} height={h - 10} fill={`url(#${id})`} />
      ) : (
        <path d={`M${w / 3} 9v${h}M${(2 * w) / 3} 9v${h}`} stroke={C.woodDark} strokeWidth="1" strokeDasharray="2 4" />
      )}
      <rect x="0" y="9" width="6" height={h} fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      <rect x={w - 6} y="9" width="6" height={h} fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      <rect x="0" y={h + 3} width={w} height="6" fill={C.woodLight} stroke={C.line} strokeWidth="2" />
    </g>
  );
}

function Jar({ x = 80, y = 34, fill = C.honey, kind = 'honey' }) {
  return (
    <g transform={`translate(${x} ${y})`} strokeLinejoin="round">
      {/* lid */}
      <rect x="10" y="0" width="60" height="18" rx="4" fill="#8A5A2B" stroke={C.line} strokeWidth="2" />
      <path d="M18 4v10M26 4v10M34 4v10M42 4v10M50 4v10M58 4v10" stroke={C.line} strokeOpacity=".5" strokeWidth="1.5" />
      {/* glass */}
      <path d="M8 22h64c6 0 8 4 8 10v74c0 10-6 16-16 16H16C6 122 0 116 0 106V32c0-6 2-10 8-10z" fill={C.glass} stroke={C.line} strokeWidth="2.2" />
      {/* contents */}
      <path d="M5 34h70v72c0 7-4 11-11 11H16c-7 0-11-4-11-11z" fill={fill} />
      {kind === 'pollen' &&
        [
          [14, 44, '#E8A317'], [26, 52, '#C7871A'], [40, 44, '#F2C14E'], [54, 50, '#9C8A2B'], [66, 42, '#E8A317'],
          [18, 62, '#F2C14E'], [32, 68, '#E07B1F'], [48, 62, '#E8A317'], [62, 70, '#C7871A'],
          [14, 82, '#9C8A2B'], [28, 88, '#F2C14E'], [44, 82, '#E8A317'], [58, 90, '#E07B1F'], [68, 80, '#F2C14E'],
          [20, 102, '#E8A317'], [36, 106, '#C7871A'], [52, 102, '#F2C14E'], [64, 108, '#9C8A2B'],
        ].map(([cx, cy, f], i) => <circle key={i} cx={cx} cy={cy} r="5.2" fill={f} stroke="#8C5A07" strokeOpacity=".35" />)}
      {kind === 'cream' && <path d="M12 46c14-4 22 4 34 0s20-4 24 0" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />}
      {/* highlight */}
      <path d="M12 38v58" stroke="#fff" strokeOpacity=".6" strokeWidth="5" strokeLinecap="round" />
      {/* label */}
      <rect x="18" y="60" width="44" height="34" rx="5" fill="#FFFCF5" stroke={C.line} strokeWidth="1.8" />
      <path d="M40 66l7 4v8l-7 4-7-4v-8z" fill={C.honeyLight} stroke={C.line} strokeWidth="1.5" />
      <path d="M27 88h26" stroke={C.line} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

const ARTS = {
  hive: () => (
    <>
      <Ground />
      <HiveShape x={60} y={12} />
      <Bee x={178} y={118} s={0.9} r={-10} />
      <Bee x={196} y={70} s={0.8} r={12} />
      <Bee x={44} y={56} s={0.75} r={-18} />
    </>
  ),
  box: () => (
    <g strokeLinejoin="round">
      <Ground />
      {/* top face with frame top bars */}
      <path d="M48 66l22-22h140l-22 22z" fill={C.woodDark} stroke={C.line} strokeWidth="2" />
      {Array.from({ length: 9 }).map((_, i) => (
        <path key={i} d={`M${62 + i * 14} 62l16-15`} stroke={C.woodLight} strokeWidth="5" strokeLinecap="round" />
      ))}
      {/* right face */}
      <path d="M188 66l22-22v62l-22 22z" fill={C.wood} stroke={C.line} strokeWidth="2" />
      {/* front */}
      <rect x="48" y="66" width="140" height="62" fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      <Grain x={48} y={70} w={140} />
      <rect x="102" y="90" width="32" height="9" rx="4.5" fill={C.woodDark} stroke={C.line} strokeWidth="1.5" />
      <Bee x={40} y={44} s={0.8} r={-12} />
    </g>
  ),
  roof: () => (
    <g strokeLinejoin="round">
      <Ground />
      <path d="M40 82l26-30h150l-26 30z" fill="#D3DADF" stroke="#56626A" strokeWidth="2" />
      <path d="M80 60h120M70 72h118" stroke="#fff" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 82l26-30v22l-26 30z" fill={C.metalDark} stroke="#56626A" strokeWidth="2" />
      <rect x="40" y="82" width="150" height="22" fill={C.metal} stroke="#56626A" strokeWidth="2" />
      <path d="M46 88h138" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
      {/* rain drops */}
      {[[70, 24], [110, 16], [150, 28], [186, 18]].map(([x, y], i) => (
        <path key={i} d={`M${x} ${y}c-4 6-6 9-6 12a6 6 0 0012 0c0-3-2-6-6-12z`} fill="#8EC3E6" stroke="#3E7CA6" strokeWidth="1.5" />
      ))}
    </g>
  ),
  frames: () => (
    <>
      <defs>
        <HoneycombPattern id="comb-a" />
      </defs>
      <Ground />
      <Frame x={34} y={34} comb={false} />
      <Frame x={90} y={60} id="comb-a" />
      <Bee x={196} y={46} s={0.85} r={10} />
    </>
  ),
  feeder: () => (
    <g strokeLinejoin="round">
      <Ground />
      <path d="M40 92l30-34h140l-30 34z" fill="#EAD9B8" stroke={C.line} strokeWidth="2" />
      <path d="M58 88l20-24h48l-20 24zM132 88l20-24h48l-20 24z" fill="#F0C76A" stroke={C.line} strokeWidth="1.8" />
      <path d="M108 88l20-24h6l-20 24z" fill={C.woodDark} stroke={C.line} strokeWidth="1.5" />
      <path d="M180 92l30-34v24l-30 34z" fill="#D8C49C" stroke={C.line} strokeWidth="2" />
      <rect x="40" y="92" width="140" height="24" fill="#E2CFA8" stroke={C.line} strokeWidth="2" />
      <Bee x={122} y={50} s={0.85} r={20} />
      <Bee x={190} y={34} s={0.7} r={-8} />
    </g>
  ),
  bottom: () => (
    <g strokeLinejoin="round">
      <defs>
        <pattern id="mesh" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 0h7v7" fill="none" stroke="#7D8990" strokeWidth="1" />
        </pattern>
      </defs>
      <Ground />
      <path d="M36 98l34-38h142l-34 38z" fill={C.wood} stroke={C.line} strokeWidth="2" />
      <path d="M62 92l24-26h100l-24 26z" fill="url(#mesh)" stroke={C.line} strokeWidth="1.5" />
      <path d="M178 98l34-38v18l-34 38z" fill={C.woodDark} stroke={C.line} strokeWidth="2" />
      <rect x="36" y="98" width="142" height="18" fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      <rect x="66" y="102" width="82" height="10" rx="2" fill="#F6E7C1" stroke={C.line} strokeWidth="1.5" />
      {[78, 92, 104, 118, 132].map((x, i) => (
        <circle key={x} cx={x} cy="107" r="3.6" fill={['#E8A317', '#F2C14E', '#E07B1F', '#9C8A2B', '#E8A317'][i]} />
      ))}
      <Bee x={196} y={44} s={0.8} r={8} />
    </g>
  ),
  trap: () => (
    <g strokeLinejoin="round">
      <Ground />
      <rect x="64" y="38" width="112" height="78" rx="6" fill={C.woodLight} stroke={C.line} strokeWidth="2" />
      <rect x="78" y="50" width="84" height="40" rx="4" fill="#FFFCF5" stroke={C.line} strokeWidth="2" />
      {Array.from({ length: 4 }).flatMap((_, r) =>
        Array.from({ length: 8 }).map((__, c) => (
          <circle key={`${r}-${c}`} cx={86 + c * 10} cy={57 + r * 9} r="3" fill={C.ink} />
        ))
      )}
      <rect x="70" y="96" width="100" height="14" rx="3" fill="#F6E7C1" stroke={C.line} strokeWidth="1.8" />
      {[84, 98, 112, 126, 140, 154].map((x, i) => (
        <circle key={x} cx={x} cy="103" r="4" fill={['#E8A317', '#F2C14E', '#E07B1F', '#9C8A2B', '#E8A317', '#F2C14E'][i]} />
      ))}
      <Bee x={194} y={66} s={0.85} r={-160} />
      <Bee x={44} y={44} s={0.75} r={-14} />
    </g>
  ),
  honey: () => (
    <>
      <Ground />
      <Jar x={70} y={30} />
      {/* dipper */}
      <g transform="translate(150 74) rotate(28)" strokeLinejoin="round">
        <rect x="-3" y="-44" width="6" height="58" rx="3" fill={C.woodDark} stroke={C.line} strokeWidth="1.8" />
        <rect x="-11" y="12" width="22" height="26" rx="9" fill={C.wood} stroke={C.line} strokeWidth="1.8" />
        <path d="M-11 20h22M-11 28h22" stroke={C.line} strokeWidth="1.5" />
      </g>
      <path d="M170 128c0 8 4 14 4 20a5 5 0 01-10 0c0-6 6-12 6-20z" fill={C.honey} />
      <Bee x={44} y={52} s={0.8} r={-14} />
    </>
  ),
  cream: () => (
    <>
      <Ground />
      <Jar x={80} y={30} fill={C.cream} kind="cream" />
      <Bee x={190} y={60} s={0.8} r={12} />
    </>
  ),
  pollen: () => (
    <>
      <Ground />
      <Jar x={80} y={30} fill="#F6E7C1" kind="pollen" />
      {[[188, 140, '#E8A317'], [198, 148, '#F2C14E'], [180, 150, '#E07B1F'], [46, 146, '#9C8A2B'], [56, 152, '#F2C14E']].map(([cx, cy, f], i) => (
        <circle key={i} cx={cx} cy={cy} r="5" fill={f} />
      ))}
      <Bee x={196} y={56} s={0.8} r={12} />
    </>
  ),
};

/** Product / category illustration. `art` is one of the keys above. */
export function ProductArt({ art, className = '', label }) {
  const Draw = ARTS[art] || ARTS.hive;
  return (
    <svg
      viewBox="0 0 240 180"
      className={className}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <Draw />
    </svg>
  );
}

/** Big illustration for the home page hero: hives in a meadow. */
export function HeroScene({ className = '' }) {
  const flowers = [
    [40, 360, '#fff'], [92, 378, '#F5BE45'], [150, 364, '#fff'], [420, 372, '#fff'],
    [478, 360, '#F5BE45'], [520, 380, '#fff'], [268, 386, '#F5BE45'], [340, 392, '#fff'],
  ];
  return (
    <svg viewBox="0 0 560 420" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#FCEFC9" />
          <stop offset="1" stopColor="#FDF6E3" />
        </linearGradient>
        <clipPath id="heroClip">
          <rect width="560" height="420" rx="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#heroClip)">
        <rect width="560" height="420" fill="url(#sky)" />
        <circle cx="450" cy="92" r="48" fill="#F5BE45" />
        <circle cx="450" cy="92" r="70" fill="#F5BE45" opacity=".2" />
        {/* hills */}
        <path d="M0 250c90-40 170-50 260-22s180 30 300-12v204H0z" fill="#B9CF8E" />
        <path d="M0 292c120-36 230-30 340-6s160 10 220-6v140H0z" fill="#93B467" />
        <path d="M0 330c140-20 300-14 560 6v84H0z" fill="#7FA457" />
        {/* trees */}
        <g fill="#5E8740">
          <circle cx="60" cy="236" r="22" />
          <circle cx="84" cy="228" r="26" />
          <circle cx="508" cy="222" r="24" />
        </g>
        <path d="M80 250v24M506 244v22" stroke="#6B4423" strokeWidth="5" />
        {/* hives */}
        <HiveShape x={88} y={196} s={0.95} />
        <HiveShape x={232} y={176} s={1.1} />
        <HiveShape x={392} y={210} s={0.9} boxes={1} />
        {/* flowers */}
        {flowers.map(([x, y, c], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M0 0v18" stroke="#4F7A34" strokeWidth="2.5" />
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse key={a} cx="0" cy="-6" rx="4" ry="6.5" fill={c} transform={`rotate(${a})`} />
            ))}
            <circle r="3.6" fill="#E39B12" />
          </g>
        ))}
        {/* flight path */}
        <path d="M150 150c40-60 110-80 150-50s70 20 110-30" fill="none" stroke="#8C5A07" strokeWidth="2.5" strokeDasharray="2 9" strokeLinecap="round" />
        <Bee x={150} y={146} s={1.4} r={-30} />
        <Bee x={300} y={98} s={1.3} r={20} />
        <Bee x={414} y={68} s={1.5} r={-25} />
      </g>
    </svg>
  );
}

/** Logo mark: honey hexagon with a bee. */
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true">
      <path d="M28 3l22 12.5v25L28 53 6 40.5v-25z" fill="#F0B032" stroke="#5E3B1B" strokeWidth="3" strokeLinejoin="round" />
      <Bee x={27} y={31} s={1.45} r={-15} />
    </svg>
  );
}
