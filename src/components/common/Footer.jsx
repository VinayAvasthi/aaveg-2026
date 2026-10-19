import React, { useEffect, useRef } from 'react';

const DEVS = [
  { name: 'Aryan Gour',      dept: 'CSE'     },
  { name: 'Vinay Avasthi',   dept: 'CSE'     },
  { name: 'Kuldeep Gurjar',  dept: 'AI'      },
  { name: 'Divyansh Yadav',  dept: 'CSE'     },
  { name: 'Ishank Kukreja',  dept: 'AI & DS' },
  { name: 'Priyanshu Sharma',dept: 'AI & DS' },
];

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add('af2-ready');
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('af2-visible'); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <footer ref={ref} className="af2-root" aria-label="AAVEG site footer">
      <div className="af2-layout">
        {/* Left reaper — mirrored */}
        <img className="af2-reaper af2-reaper-left" src="/assets/reaper.png" alt="" aria-hidden="true" draggable="false" />

        {/* Centre content */}
        <div className="af2-content">
          <p className="af2-eyebrow">The team behind the chronicle</p>
          <h2 className="af2-heading">Developed by</h2>
          <ul className="af2-devlist" aria-label="Development team">
            {DEVS.map(({ name, dept }) => (
              <li key={name}>
                <span className="af2-dev-name">{name}</span>
                <span className="af2-dev-dept">{dept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right reaper */}
        <img className="af2-reaper af2-reaper-right" src="/assets/reaper.png" alt="" aria-hidden="true" draggable="false" />
      </div>

      <div className="af2-bottom">
        <p>© {new Date().getFullYear()} AAVEG — 4-Act Cinematic Chronicle. All rights reserved.</p>
      </div>
    </footer>
  );
}
