const Tree = ({ x, h, s }) => (
  <g>
    <path d={`M${x - 7 * s} 800 L${x - 2 * s} ${800 - h} L${x + 2 * s} ${800 - h} L${x + 7 * s} 800Z`} />
    <path d={`M${x} ${800 - h * 0.6} l${-50 * s} ${-60 * s} M${x} ${800 - h * 0.75} l${46 * s} ${-70 * s} M${x} ${800 - h * 0.9} l${-30 * s} ${-50 * s}`} fill="none" stroke="currentColor" strokeWidth={4 * s} strokeLinecap="round" />
  </g>
);
const row = (n, off, step) => Array.from({ length: n }, (_, i) => off + i * step);

export default function FallbackForest() {
  return (
    <svg className="fallback-forest" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="fbHalo">
          <stop offset="0" stopColor="#FF2B3C" stopOpacity=".6" />
          <stop offset="0.45" stopColor="#8A0512" stopOpacity=".2" />
          <stop offset="1" stopColor="#15080C" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="fbSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070608" />
          <stop offset="1" stopColor="#15080C" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#fbSky)" />
      <g className="fb-layer fb-moon">
        <circle cx="820" cy="190" r="190" fill="url(#fbHalo)" />
        <circle cx="820" cy="190" r="58" fill="#FFF0F2" />
      </g>
      <g className="fb-layer fb-house" fill="#100609">
        <rect x="520" y="560" width="150" height="130" /><polygon points="505,562 595,490 685,562" />
        <rect x="490" y="500" width="40" height="190" /><polygon points="484,502 510,450 536,502" />
        {[[545, 590], [595, 590], [633, 620], [498, 540], [498, 600]].map(([x, y]) => (
          <rect key={x + y} x={x} y={y} width="14" height="20" fill="#FF3322" />
        ))}
      </g>
      <g className="fb-layer fb-far" color="#18080E" fill="#18080E">{row(14, 20, 90).map((x, i) => <Tree key={x} x={x} h={150 + (i % 3) * 30} s={0.8} />)}</g>
      <g className="fb-layer fb-mid" color="#100508" fill="#100508">{row(9, 60, 140).map((x, i) => <Tree key={x} x={x} h={260 + (i % 4) * 40} s={1.2} />)}</g>
      <g className="fb-layer fb-near" color="#070608" fill="#070608">{[40, 210, 960, 1130].map((x, i) => <Tree key={x} x={x} h={520 + i * 30} s={2} />)}</g>
    </svg>
  );
}
