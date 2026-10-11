import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from '../common/Icons';
import { HOUSES } from '../../data/registration';
import SparklesCore from '../ui/SparklesCore';
import MovingBorder from '../ui/MovingBorder';
import GlitchText from '../ui/GlitchText';
import Magnetic from '../ui/Magnetic';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';
import GridBackground from '../ui/GridBackground';

export default function CircularHouseSelector({ onSelectHouse }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef(null);
  const startX = useRef(0);

  const totalHouses = HOUSES.length;
  const anglePerStep = 360 / totalHouses;
  const currentHouse = HOUSES[activeIndex];

  const selectHouseIndex = useCallback(
    (index) => {
      const diff = index - activeIndex;
      let shortestDiff = diff;
      if (diff > totalHouses / 2) shortestDiff = diff - totalHouses;
      if (diff < -totalHouses / 2) shortestDiff = diff + totalHouses;

      setRotationAngle((prev) => prev - shortestDiff * anglePerStep);
      setActiveIndex((index + totalHouses) % totalHouses);
    },
    [activeIndex, totalHouses, anglePerStep]
  );

  const nextHouse = useCallback(() => {
    selectHouseIndex((activeIndex + 1) % totalHouses);
  }, [activeIndex, totalHouses, selectHouseIndex]);

  const prevHouse = useCallback(() => {
    selectHouseIndex((activeIndex - 1 + totalHouses) % totalHouses);
  }, [activeIndex, totalHouses, selectHouseIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextHouse();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevHouse();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextHouse, prevHouse]);

  const handleHouseConfirm = () => {
    if (onSelectHouse) {
      onSelectHouse(currentHouse);
    } else {
      window.location.hash = `house-${currentHouse.number}`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="circular-selector-wrapper"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '2rem 1rem 4rem',
        userSelect: 'none',
      }}
    >
      <FloatingElements duration={4} distance={4} rotate={1}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 20px',
            borderRadius: '25px',
            background: 'rgba(229, 9, 20, 0.15)',
            border: '1px solid rgba(255, 170, 64, 0.45)',
            color: '#FFAA40',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.82rem',
            fontWeight: '700',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          <Sparkles size={14} />
          <span>
            <ShinyText color="#FFAA40" shimmerColor="#FFFFFF" speed={3.5}>
              SELECT YOUR HOSTEL HOUSE • 0{activeIndex + 1} OF 08
            </ShinyText>
          </span>
        </div>
      </FloatingElements>

      <GridBackground color={`${currentHouse.color}15`} maskRadius="60%">
        <div
          className="radial-stage"
          onTouchStart={(e) => {
            startX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const diff = e.changedTouches[0].clientX - startX.current;
            if (diff > 45) prevHouse();
            else if (diff < -45) nextHouse();
          }}
          style={{
            position: 'relative',
            width: 'clamp(280px, 86vw, 620px)',
            height: 'clamp(280px, 86vw, 620px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            touchAction: 'pan-y',
          }}
        >
          {/* Outer Astrolabe Compass Ring */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '1.5px dashed rgba(255, 170, 64, 0.3)',
              boxShadow: '0 0 50px rgba(0, 0, 0, 0.85), inset 0 0 35px rgba(229, 9, 20, 0.12)',
              pointerEvents: 'none',
            }}
          />

          {/* Secondary Concentric Ring */}
          <div
            style={{
              position: 'absolute',
              inset: '12%',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              pointerEvents: 'none',
            }}
          />

          {/* The 8 House Nodes Orbit */}
          <div
            className="orbit-container"
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotate(${rotationAngle}deg)`,
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transformOrigin: 'center center',
            }}
          >
            {HOUSES.map((house, idx) => {
              const angle = (idx * anglePerStep * Math.PI) / 180;
              const radius = 42;
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              const isActive = idx === activeIndex;

              return (
                <div
                  key={house.id}
                  onClick={() => selectHouseIndex(idx)}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) rotate(${-rotationAngle}deg) scale(${isActive ? 1.25 : 0.95})`,
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: isActive ? 20 : 10,
                    cursor: 'pointer',
                    touchAction: 'manipulation',
                  }}
                >
                  <div
                    style={{
                      width: 'clamp(44px, 9vw, 68px)',
                      height: 'clamp(44px, 9vw, 68px)',
                      borderRadius: '50%',
                      background: isActive
                        ? `radial-gradient(circle at 35% 35%, ${house.color} 0%, #15060A 100%)`
                        : 'rgba(20, 10, 14, 0.88)',
                      border: `2px solid ${isActive ? '#FFFFFF' : `${house.color}88`}`,
                      boxShadow: isActive
                        ? `0 0 30px ${house.color}, 0 8px 24px rgba(0,0,0,0.95)`
                        : '0 4px 15px rgba(0,0,0,0.7)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <span style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)' }}>{house.sigil}</span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: "'Cinzel', Georgia, serif",
                        fontWeight: '800',
                        letterSpacing: '0.08em',
                        color: isActive ? '#FFFFFF' : 'rgba(245, 234, 235, 0.75)',
                        marginTop: '1px',
                      }}
                    >
                      H{house.number}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sparkles Aura */}
          <SparklesCore particleColor={currentHouse.color} particleDensity={22} minSize={0.6} maxSize={2.0} />

          {/* Center Stage Showcase */}
          <MovingBorder
            duration={3600}
            color={currentHouse.color}
            borderRadius="50%"
            style={{
              position: 'relative',
              zIndex: 15,
              width: 'clamp(185px, 48vw, 310px)',
              height: 'clamp(185px, 48vw, 310px)',
            }}
          >
            <div
              className="center-showcase"
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: 'radial-gradient(circle at center, rgba(30, 12, 18, 0.96) 0%, rgba(8, 4, 6, 0.98) 100%)',
                border: `2px solid ${currentHouse.color}`,
                boxShadow: `0 0 50px ${currentHouse.accentGlow}, inset 0 0 35px ${currentHouse.accentGlow}, 0 20px 50px rgba(0,0,0,0.95)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '1.5rem',
                backdropFilter: 'blur(20px)',
              }}
            >
              <FloatingElements duration={3} distance={6} rotate={3}>
                <div
                  style={{
                    fontSize: 'clamp(2.4rem, 5vw, 3.4rem)',
                    lineHeight: '1',
                    filter: `drop-shadow(0 0 16px ${currentHouse.color})`,
                    marginBottom: '6px',
                  }}
                >
                  {currentHouse.sigil}
                </div>
              </FloatingElements>

              <h3
                style={{
                  fontFamily: "'Cinzel Decorative', 'Anton', serif",
                  fontSize: 'clamp(1.5rem, 3.2vw, 2.2rem)',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                <ShinyText color={currentHouse.color} shimmerColor="#FFFFFF" speed={3}>
                  <GlitchText text={currentHouse.name} />
                </ShinyText>
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 'clamp(0.72rem, 1.4vw, 0.85rem)',
                  fontWeight: '600',
                  color: currentHouse.color,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  lineHeight: '1.3',
                  maxWidth: '220px',
                  marginBottom: '14px',
                }}
              >
                "{currentHouse.motto}"
              </p>

              <Magnetic strength={0.25}>
                <button
                  onClick={handleHouseConfirm}
                  style={{
                    padding: '8px 20px',
                    borderRadius: '25px',
                    background: currentHouse.color,
                    border: '1px solid #FFFFFF',
                    color: '#FFFFFF',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '0.78rem',
                    fontWeight: '800',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: `0 4px 20px ${currentHouse.accentGlow}`,
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <span>SELECT & PROCEED</span>
                  <ArrowRight size={14} />
                </button>
              </Magnetic>
            </div>
          </MovingBorder>
        </div>
      </GridBackground>

      {/* Navigation Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginTop: '2.5rem',
        }}
      >
        <Magnetic strength={0.3}>
          <button
            onClick={prevHouse}
            aria-label="Previous House"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(255, 170, 64, 0.4)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229, 9, 20, 0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(229, 9, 20, 0.15)')}
          >
            <ChevronLeft size={22} />
          </button>
        </Magnetic>

        <span
          style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '1.1rem',
            fontWeight: '800',
            letterSpacing: '0.15em',
            color: '#FFFFFF',
          }}
        >
          {currentHouse.name}
        </span>

        <Magnetic strength={0.3}>
          <button
            onClick={nextHouse}
            aria-label="Next House"
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(255, 170, 64, 0.4)',
              color: '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(229, 9, 20, 0.35)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(229, 9, 20, 0.15)')}
          >
            <ChevronRight size={22} />
          </button>
        </Magnetic>
      </div>

      {/* Quick House Selector Pill Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '1.5rem',
          maxWidth: '680px',
        }}
      >
        {HOUSES.map((h, i) => (
          <button
            key={h.id}
            onClick={() => selectHouseIndex(i)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              background: activeIndex === i ? h.color : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${activeIndex === i ? '#FFF' : 'rgba(255, 255, 255, 0.14)'}`,
              color: '#FFFFFF',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.75rem',
              fontWeight: activeIndex === i ? '800' : '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: activeIndex === i ? `0 0 16px ${h.color}66` : 'none',
            }}
          >
            {h.name}
          </button>
        ))}
      </div>
    </div>
  );
}
