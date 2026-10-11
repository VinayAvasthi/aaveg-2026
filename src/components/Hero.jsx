import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import CastleScrollCanvas from './CastleScrollCanvas.jsx';
import FallbackForest from './FallbackForest.jsx';
import PortalMenu from './PortalMenu.jsx';

export default function Hero({ reduced }) {
  const wrap = useRef(null);
  const progress = useRef(0);
  const [portalVisible, setPortalVisible] = useState(false);

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (s) => {
            progress.current = s.progress;
            if (s.progress >= 0.85) {
              setPortalVisible(true);
            } else {
              setPortalVisible(false);
            }
          },
        },
      });

      tl.to('.scroll-target', { opacity: 0, scale: 0.8, duration: 0.06, ease: 'none' }, 0.01);
      tl.set({}, {}, 1);
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="home" ref={wrap} data-nav="home" className={`hero${reduced ? ' hero-static' : ''}`} aria-label="AAVEG 2026 opening sequence">
      <div className="hero-sticky">
        {!reduced ? <CastleScrollCanvas progressRef={progress} /> : <FallbackForest />}
        <div className="hero-shade" aria-hidden="true" />
        <div className="scroll-target" aria-hidden="true">
          <span className="scroll-text">SCROLL</span>
          <div className="scroll-rings">
            <span className="ring ring-outer" />
            <span className="ring ring-inner" />
            <span className="ring-core" />
          </div>
        </div>
        <PortalMenu visible={portalVisible} />
      </div>
    </section>
  );
}
