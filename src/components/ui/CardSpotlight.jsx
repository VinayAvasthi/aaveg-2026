import React, { useState, useRef } from 'react';

export default function CardSpotlight({
  children,
  className = '',
  color = '#FF2B3C',
  glowRadius = 320,
  style = {},
  onClick,
  tilt = true,
}) {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });

    if (tilt && window.matchMedia('(hover: hover)').matches) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      setTiltStyle({
        transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`,
        willChange: 'transform',
      });
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: -1000, y: -1000 });
    if (tilt) {
      setTiltStyle({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`card-spotlight-wrapper ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '20px',
        border: '1px solid rgba(255, 170, 64, 0.22)',
        background: 'radial-gradient(ellipse at center, rgba(30, 10, 16, 0.85) 0%, rgba(10, 5, 8, 0.95) 100%)',
        backdropFilter: 'blur(16px)',
        transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease',
        boxShadow: isHovered ? '0 15px 45px rgba(0,0,0,0.85)' : '0 8px 25px rgba(0,0,0,0.6)',
        ...tiltStyle,
        ...style,
      }}
    >
      {/* Specular Highlight Arc on Top Rim */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '10%',
          right: '10%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 190, 80, 0.6) 50%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Radial Cursor Spotlight Glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
          zIndex: 1,
          background: `radial-gradient(${glowRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${color}35 0%, transparent 80%)`,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}
