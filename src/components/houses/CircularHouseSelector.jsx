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
        maxWidth: '100vw',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 0.75rem 2.5rem',
        userSelect: 'none',
      }}
    >
      <FloatingElements duration={4} distance={4} rotate={1}>
        <div
          className="circular-selector-pill"
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
            marginBottom: '1.5rem',
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
            width: 'clamp(260px, 80vw, 580px)',
            height: 'clamp(260px, 80vw, 580px)',
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
              pointerEvents: 'none',
            }}
          >
            {HOUSES.map((house, idx) => {
              const angle = (idx * anglePerStep * Math.PI) / 180;
              const radius = 40;
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
                    pointerEvents: 'auto',
                  }}
                >
                  <div
                    style={{
                      width: 'clamp(40px, 8.5vw, 64px)',
                      height: 'clamp(40px, 8.5vw, 64px)',
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
                    <span
                      style={{
                        fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                        fontFamily: "'Cinzel Decorative', 'Anton', serif",
                        fontWeight: '900',
                        letterSpacing: '0.08em',
                        color: isActive ? '#FFFFFF' : house.color,
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
              width: 'clamp(165px, 44vw, 290px)',
              height: 'clamp(165px, 44vw, 290px)',
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
                padding: 'clamp(0.6rem, 2.5vw, 1.4rem)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <FloatingElements duration={3} distance={4} rotate={0}>
                <div
                  style={{
                    fontFamily: "'Cinzel Decorative', 'Anton', serif",
                    fontSize: 'clamp(2rem, 4.8vw, 3.6rem)',
                    fontWeight: '900',
                    lineHeight: '1',
                    color: currentHouse.color,
                    filter: `drop-shadow(0 0 20px ${currentHouse.color})`,
                    marginBottom: '2px',
                    letterSpacing: '0.06em',
                  }}
                >
                  H{currentHouse.number}
                </div>
              </FloatingElements>

              <h3
                style={{
                  fontFamily: "'Cinzel Decorative', 'Anton', serif",
                  fontSize: 'clamp(1.15rem, 2.8vw, 2rem)',
                  fontWeight: '900',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '10px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.9)',
                }}
              >
                <ShinyText color={currentHouse.color} shimmerColor="#FFFFFF" speed={3}>
                  <GlitchText text={currentHouse.name} />
                </ShinyText>
              </h3>

              <Magnetic strength={0.25}>
                <button
                  onClick={handleHouseConfirm}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    handleHouseConfirm();
                  }}
                  aria-label={`Select and proceed with ${currentHouse.name}`}
                  style={{
                    position: 'relative',
                    padding: 'clamp(8px, 1.8vw, 12px) clamp(16px, 3.5vw, 24px)',
                    borderRadius: '28px',
                    background: `linear-gradient(135deg, ${currentHouse.color} 0%, #B80D1A 100%)`,
                    border: '1.5px solid rgba(255, 255, 255, 0.85)',
                    color: '#FFFFFF',
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 'clamp(0.74rem, 1.8vw, 0.86rem)',
                    fontWeight: '800',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: `0 0 25px ${currentHouse.accentGlow}, 0 6px 20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.4)`,
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
                    touchAction: 'manipulation',
                    whiteSpace: 'nowrap',
                    outline: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08) translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 0 35px ${currentHouse.color}, 0 10px 25px rgba(0,0,0,0.95)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1) translateY(0)';
                    e.currentTarget.style.boxShadow = `0 0 25px ${currentHouse.accentGlow}, 0 6px 20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.4)`;
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.96) translateY(1px)';
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: '#FFFFFF',
                      boxShadow: '0 0 6px #FFFFFF',
                    }}
                  />
                  <span>SELECT & PROCEED</span>
                  <ArrowRight size={14} />
                </button>
              </Magnetic>
            </div>
          </MovingBorder>
        </div>
      </GridBackground>

      {/* Prominent Action Bar for Mobile & Laptop */}
      <div
        className="circular-action-bar"
        style={{
          marginTop: '1.25rem',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '420px',
          padding: '0 1rem',
        }}
      >
        <MovingBorder
          duration={3200}
          color={currentHouse.color}
          borderRadius="30px"
          style={{ width: '100%' }}
        >
          <button
            onClick={handleHouseConfirm}
            onTouchEnd={(e) => {
              e.stopPropagation();
              handleHouseConfirm();
            }}
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '30px',
              background: `linear-gradient(135deg, ${currentHouse.color} 0%, #15060A 100%)`,
              border: `1.5px solid ${currentHouse.color}`,
              color: '#FFFFFF',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(0.82rem, 2vw, 0.92rem)',
              fontWeight: '800',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: `0 4px 25px ${currentHouse.accentGlow}`,
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              touchAction: 'manipulation',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = `0 6px 30px ${currentHouse.color}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = `0 4px 25px ${currentHouse.accentGlow}`;
            }}
          >
            <Sparkles size={16} style={{ color: '#FFEAA7' }} />
            <span>CONFIRM & ENTER HOUSE {currentHouse.number}</span>
            <ArrowRight size={16} />
          </button>
        </MovingBorder>
      </div>

      {/* Navigation Controls */}
      <div
        className="circular-nav-controls"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.25rem',
          marginTop: '1.5rem',
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
        className="circular-quick-pills"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center',
          marginTop: '1.25rem',
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
