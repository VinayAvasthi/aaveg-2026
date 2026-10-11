import React from 'react';

export default function Lamp({
  children,
  className = '',
  color = '#FF2B3C',
  secondaryColor = '#FF9A3C',
}) {
  return (
    <div
      className={`lamp-container ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '3rem',
        paddingBottom: '2rem',
      }}
    >
      {/* Light Source Cones */}
      <div
        className="lamp-glow-source"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '140px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Left Conic Light Beam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '50%',
            width: 'clamp(280px, 40vw, 550px)',
            height: '160px',
            background: `conic-gradient(from 70deg at 50% 50%, ${color} 0%, transparent 60%)`,
            transform: 'rotate(-25deg)',
            opacity: 0.45,
            filter: 'blur(35px)',
          }}
        />

        {/* Right Conic Light Beam */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            width: 'clamp(280px, 40vw, 550px)',
            height: '160px',
            background: `conic-gradient(from 290deg at 50% 50%, transparent 40%, ${color} 100%)`,
            transform: 'rotate(25deg)',
            opacity: 0.45,
            filter: 'blur(35px)',
          }}
        />

        {/* Central Core Glow */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            width: 'clamp(200px, 30vw, 380px)',
            height: '60px',
            borderRadius: '50%',
            background: `radial-gradient(ellipse at center, ${secondaryColor} 0%, ${color} 40%, transparent 75%)`,
            filter: 'blur(25px)',
            opacity: 0.7,
          }}
        />

        {/* Horizontal Laser Line Accent */}
        <div
          style={{
            position: 'absolute',
            top: '55px',
            width: 'clamp(260px, 60vw, 750px)',
            height: '2px',
            background: `linear-gradient(90deg, transparent 0%, ${color} 25%, #FFF 50%, ${color} 75%, transparent 100%)`,
            boxShadow: `0 0 16px ${color}, 0 0 35px ${color}`,
          }}
        />
      </div>

      {/* Children Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        {children}
      </div>
    </div>
  );
}
