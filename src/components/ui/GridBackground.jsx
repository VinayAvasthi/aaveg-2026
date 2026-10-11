import React from 'react';

export default function GridBackground({
  children,
  className = '',
  pattern = 'grid',
  color = 'rgba(255, 77, 0, 0.08)',
  maskRadius = '60%',
  style = {},
}) {
  const bgSvg =
    pattern === 'dots'
      ? `radial-gradient(${color} 1px, transparent 1px)`
      : `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`;

  const bgSize = pattern === 'dots' ? '24px 24px' : '40px 40px';

  if (!children) {
    return (
      <div
        className={`pointer-events-none absolute inset-0 ${className}`}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgSvg,
          backgroundSize: bgSize,
          maskImage: `radial-gradient(ellipse at center, black 25%, transparent ${maskRadius})`,
          WebkitMaskImage: `radial-gradient(ellipse at center, black 25%, transparent ${maskRadius})`,
          pointerEvents: 'none',
          zIndex: 0,
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        position: 'relative',
        width: '100%',
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: bgSvg,
          backgroundSize: bgSize,
          maskImage: `radial-gradient(ellipse at center, black 25%, transparent ${maskRadius})`,
          WebkitMaskImage: `radial-gradient(ellipse at center, black 25%, transparent ${maskRadius})`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>{children}</div>
    </div>
  );
}
