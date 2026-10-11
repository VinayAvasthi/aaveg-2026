import { useEffect, useRef, useState, useCallback } from 'react';
import LiquidGL from './LiquidGL.jsx';

const ITEMS = [
  {
    num: '01',
    title: 'SELECT HOUSE',
    desc: 'Choose your hostel house and join the battle for glory.',
    cta: 'EXPLORE →',
    href: '#houses',
    img: '/assets/portal_house.jpg',
    baseAngle: Math.PI, // Starts at 9 o'clock (left)
  },
  {
    num: '02',
    title: 'LEADERBOARD',
    desc: 'Check house rankings and see who leads the night.',
    cta: 'VIEW →',
    href: '#leaderboard',
    img: '/assets/portal_trophy.jpg',
    baseAngle: (5 * Math.PI) / 3, // Starts at ~2 o'clock (right)
  },
  {
    num: '03',
    title: '4-ACT CINEMATIC CHRONICLE',
    desc: 'Immerse in the haunted story, from opening hook to final act.',
    cta: 'EXPLORE →',
    href: '#chronicle',
    img: '/assets/portal_book.jpg',
    baseAngle: Math.PI / 2, // Starts at 6 o'clock (bottom)
  },
];

export default function PortalMenu({ visible }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(false);
  const [clickedIdx, setClickedIdx] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const nodeRefs = useRef([]);
  const animState = useRef({
    orbitAngle: 0,
    entryProgress: 0,
    nodeScales: [0, 0, 0],
    nodeOpacities: [0, 0, 0],
  });
  const rafRef = useRef(null);

  // Responsive orbital radius
  const getRadius = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const h = typeof window !== 'undefined' ? window.innerHeight : 800;
    const minDim = Math.min(w, h);
    if (w < 480) return Math.min(115, Math.floor(minDim * 0.28));
    if (w < 768) return 145;
    if (w < 1024) return 195;
    return Math.min(300, Math.floor(minDim * 0.32));
  }, []);

  // Responsive card size
  const getCardSize = useCallback(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
    if (w < 480) return 130;
    if (w < 768) return 165;
    if (w < 1024) return 220;
    return 275;
  }, []);

  // Continuous circular motion animation loop
  useEffect(() => {
    if (!visible) {
      setActive(false);
      animState.current.entryProgress = 0;
      return;
    }

    const timer = setTimeout(() => setActive(true), 120);
    let lastTime = performance.now();

    const loop = (now) => {
      rafRef.current = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const state = animState.current;
      // Entry scale ease in
      state.entryProgress += (1 - state.entryProgress) * Math.min(1, dt * 3.5);

      // Continuous circular motion: steady rotation, slows on hover for effortless selection
      const orbitSpeed = isHovered ? 0.08 : 0.32;
      state.orbitAngle += dt * orbitSpeed;

      const radius = getRadius();
      const entryEased = Math.sin((state.entryProgress * Math.PI) / 2);

      ITEMS.forEach((item, i) => {
        const el = nodeRefs.current[i];
        if (!el) return;

        // Position on circle in continuous circular motion
        const currentAngle = item.baseAngle + state.orbitAngle;
        const x = Math.cos(currentAngle) * radius * entryEased;
        const y = Math.sin(currentAngle) * radius * entryEased;

        // Dynamic scale & opacity spring
        const targetScale = clickedIdx === -1 ? (isHovered ? 1.02 : 1) * entryEased : clickedIdx === i ? 1.15 : 0.65;
        const targetOpacity = clickedIdx === -1 ? entryEased : clickedIdx === i ? 1 : 0.25;
        state.nodeScales[i] += (targetScale - state.nodeScales[i]) * Math.min(1, dt * 6);
        state.nodeOpacities[i] += (targetOpacity - state.nodeOpacities[i]) * Math.min(1, dt * 5);

        const s = state.nodeScales[i];
        el.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
        el.style.opacity = state.nodeOpacities[i];
      });
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible, clickedIdx, isHovered, getRadius]);

  // Subtle interactive parallax
  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    setMousePos({ x: nx * 12, y: ny * 12 });
  }, []);

  const handleClick = (idx, e) => {
    e.preventDefault();
    if (clickedIdx !== -1) return;
    setClickedIdx(idx);
    const targetHref = ITEMS[idx]?.href;
    if (targetHref) {
      setTimeout(() => {
        window.location.hash = targetHref.replace('#', '');
        setClickedIdx(-1);
      }, 350);
    } else {
      setTimeout(() => {
        setClickedIdx(-1);
      }, 1200);
    }
  };

  if (!visible) return null;

  const radius = getRadius();
  const cardSize = getCardSize();
  const liquidSize = Math.max(68, Math.floor(cardSize * 0.52));
  const lanternSize = Math.max(75, Math.floor(radius * 0.60));

  return (
    <div
      ref={containerRef}
      className={`portal-menu-wrap ${active ? 'portal-active' : ''}`}
      onMouseMove={handleMouseMove}
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      {/* Red themed gothic background with animated bats and embers */}
      <div className="portal-atmosphere-backdrop" aria-hidden="true">
        <img src="/assets/portal_gothic_bg.jpg" alt="" className="portal-bg-image" />
        <div className="portal-bg-overlay" />
        <div className="portal-red-fog" />

        {/* Animated flying silhouette bats */}
        <svg className="portal-bat bat-1" viewBox="0 0 32 18">
          <path d="M16 8 C13 2, 7 0, 1 5 C5 9, 10 10, 14 12 C14 15, 18 15, 18 12 C22 10, 27 9, 31 5 C25 0, 19 2, 16 8 Z" fill="#0C0306" />
        </svg>
        <svg className="portal-bat bat-2" viewBox="0 0 32 18">
          <path d="M16 8 C13 2, 7 0, 1 5 C5 9, 10 10, 14 12 C14 15, 18 15, 18 12 C22 10, 27 9, 31 5 C25 0, 19 2, 16 8 Z" fill="#0C0306" />
        </svg>
        <svg className="portal-bat bat-3" viewBox="0 0 32 18">
          <path d="M16 8 C13 2, 7 0, 1 5 C5 9, 10 10, 14 12 C14 15, 18 15, 18 12 C22 10, 27 9, 31 5 C25 0, 19 2, 16 8 Z" fill="#0C0306" />
        </svg>
        <svg className="portal-bat bat-4" viewBox="0 0 32 18">
          <path d="M16 8 C13 2, 7 0, 1 5 C5 9, 10 10, 14 12 C14 15, 18 15, 18 12 C22 10, 27 9, 31 5 C25 0, 19 2, 16 8 Z" fill="#0C0306" />
        </svg>

        {/* Drifting crimson embers */}
        <div className="portal-embers-layer">
          <span className="p-ember e-1" /><span className="p-ember e-2" />
          <span className="p-ember e-3" /><span className="p-ember e-4" />
          <span className="p-ember e-5" /><span className="p-ember e-6" />
        </div>
      </div>

      {/* Celestial Canvas with Parallax */}
      <div
        className="portal-celestial-canvas"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      >
        {/* Astrological Coordinates & Concentric Rings */}
        <svg
          className="portal-astrolabe-svg"
          viewBox="-400 -400 800 800"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="verticalRay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffaa40" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#e58232" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffaa40" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Central axis rays */}
          <line x1="0" y1="-280" x2="0" y2="340" stroke="url(#verticalRay)" strokeWidth="1.2" strokeDasharray="3 3" />
          <line x1="-340" y1="0" x2="340" y2="0" stroke="rgba(229,130,50,0.18)" strokeWidth="1" strokeDasharray="4 4" />

          {/* Primary Orbital Circle on which the nodes travel */}
          <circle cx="0" cy="0" r={radius} fill="none" stroke="rgba(229,130,50,0.4)" strokeWidth="1.5" />
          <circle cx="0" cy="0" r={radius + 18} fill="none" stroke="rgba(229,130,50,0.18)" strokeWidth="1" strokeDasharray="6 8" />
          <circle cx="0" cy="0" r={radius - 18} fill="none" stroke="rgba(229,130,50,0.18)" strokeWidth="1" strokeDasharray="2 4" />

          {/* Inner concentric rings around lantern */}
          <circle cx="0" cy="0" r={radius * 0.52} fill="none" stroke="rgba(229,130,50,0.3)" strokeWidth="1.2" />
          <circle cx="0" cy="0" r={radius * 0.36} fill="none" stroke="rgba(229,130,50,0.2)" strokeWidth="1" strokeDasharray="3 5" />

          {/* Astrolabe compass starbursts */}
          {[-Math.PI / 2, 0, Math.PI / 2, Math.PI, -Math.PI / 4, Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4].map((ang, idx) => {
            const sx = Math.cos(ang) * radius;
            const sy = Math.sin(ang) * radius;
            return (
              <g key={idx} transform={`translate(${sx}, ${sy})`}>
                <polygon
                  points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
                  fill="rgba(255,185,90,0.85)"
                  filter="drop-shadow(0 0 4px rgba(255,140,40,0.8))"
                />
              </g>
            );
          })}
        </svg>

        {/* Crescent Moon at the top axis */}
        <div className="portal-celestial-moon">
          <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
            <path
              d="M16 3C10.5 3 6 7.5 6 13C6 19.5 11.5 24.5 18 24.5C21 24.5 23.5 23.5 25.5 22C20.5 21 16.5 17 16.5 11.5C16.5 7.8 18.2 4.8 21 3.2C19.5 3.1 17.8 3 16 3Z"
              fill="rgba(255,200,120,0.9)"
            />
            <polygon points="16,28 17.5,31 16,34 14.5,31" fill="#ffaa40" />
          </svg>
        </div>

        {/* Central Hanging Gothic Lantern with Armillary Rings & Liquid Glass */}
        <div className="portal-center-lantern-unit">
          <div className="portal-lantern-chain" />
          <div className="portal-lantern-glow-aura" />
          <div className="portal-lantern-radial-flare" />
          
          {/* Gyroscopic armillary orbit rings */}
          <div className="portal-armillary-ring a-ring-1" style={{ width: lanternSize * 1.35, height: lanternSize * 1.35 }} />
          <div className="portal-armillary-ring a-ring-2" style={{ width: lanternSize * 1.18, height: lanternSize * 1.18 }} />

          <div className="portal-lantern-frame" style={{ width: lanternSize, height: lanternSize }}>
            <LiquidGL imageSrc="/assets/portal_lantern.jpg" size={lanternSize} />
            <div className="portal-candle-flicker" />
            <div className="portal-glass-specular-arc" />
          </div>
        </div>

        {/* The Three Circular Nodes (Always moving in circular motion) */}
        {ITEMS.map((item, idx) => (
          <div
            key={item.num}
            ref={(el) => (nodeRefs.current[idx] = el)}
            onClick={(e) => handleClick(idx, e)}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
            className={`portal-circular-card ${clickedIdx === idx ? 'portal-card--selected' : ''}`}
            style={{
              width: cardSize,
              height: cardSize,
              opacity: 0,
              transform: 'translate(0, 0) scale(0)',
            }}
          >
            {/* Number badge at top rim */}
            <div className="portal-node-badge">
              <span>{item.num}</span>
            </div>

            {/* Circular Liquid Glass Lens with WebGL Refraction */}
            <div className="portal-liquid-lens-container" style={{ width: liquidSize, height: liquidSize }}>
              <LiquidGL imageSrc={item.img} size={liquidSize} />
              <div className="portal-glass-specular-arc" />
            </div>

            {/* Typography */}
            <div className="portal-card-body">
              <h3 className="portal-card-title">{item.title}</h3>
            </div>

            {/* Glass rim and star compass accents */}
            <span className="portal-rim-star portal-rim-star--w">✦</span>
            <span className="portal-rim-star portal-rim-star--e">✦</span>
            <span className="portal-rim-star portal-rim-star--s">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
