import React from 'react';

export default function FloatingElements({
  children,
  duration = 4,
  distance = 10,
  rotate = 2,
  delay = 0,
  className = '',
  style = {},
}) {
  return (
    <div
      className={`floating-element ${className}`}
      style={{
        display: 'inline-block',
        animation: `floatHarmonic ${duration}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
        '--float-dist': `${distance}px`,
        '--float-rot': `${rotate}deg`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
