import React from 'react';

export default function BackgroundBeams({ className = '', color = '#FF2B3C' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.35,
        }}
      >
        <g stroke={color} strokeWidth="1" strokeOpacity="0.25">
          <line x1="-100" y1="0" x2="600" y2="900" strokeDasharray="6 6" />
          <line x1="200" y1="0" x2="900" y2="900" strokeDasharray="8 8" />
          <line x1="600" y1="0" x2="1300" y2="900" strokeDasharray="10 10" />
          <line x1="1000" y1="0" x2="1700" y2="900" strokeDasharray="6 6" />
          <line x1="1500" y1="0" x2="800" y2="900" strokeDasharray="8 8" strokeOpacity="0.18" />
          <line x1="1100" y1="0" x2="400" y2="900" strokeDasharray="12 12" strokeOpacity="0.18" />
        </g>
        <circle cx="720" cy="450" r="300" fill={color} fillOpacity="0.06" style={{ filter: 'blur(80px)' }} />
      </svg>
    </div>
  );
}
