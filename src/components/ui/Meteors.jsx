import React, { useMemo } from 'react';

export default function Meteors({ number = 16, color = '#FF2B3C' }) {
  const meteorItems = useMemo(() => {
    return Array.from({ length: number }).map((_, idx) => ({
      id: `meteor-${idx}`,
      left: Math.floor(Math.random() * 100),
      delay: (Math.random() * 5).toFixed(2),
      duration: (Math.random() * 4 + 3).toFixed(2),
      size: Math.floor(Math.random() * 2) + 1,
    }));
  }, [number]);

  return (
    <div
      className="meteors-container"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {meteorItems.map((item) => (
        <span
          key={item.id}
          className="meteor-item"
          style={{
            position: 'absolute',
            top: '-10px',
            left: `${item.left}%`,
            width: `${item.size}px`,
            height: `${item.size}px`,
            borderRadius: '50%',
            backgroundColor: color,
            boxShadow: `0 0 0 1px ${color}15, 0 0 12px 1px ${color}`,
            transform: 'rotate(215deg)',
            animation: `meteorFall ${item.duration}s linear infinite`,
            animationDelay: `${item.delay}s`,
            willChange: 'transform',
          }}
        >
          <span
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '60px',
              height: '1px',
              background: `linear-gradient(90deg, ${color}, transparent)`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
