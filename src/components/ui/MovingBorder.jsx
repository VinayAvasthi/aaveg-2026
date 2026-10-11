import React from 'react';

export default function MovingBorder({
  children,
  duration = 3500,
  className = '',
  as: Component = 'div',
  containerClassName = '',
  color = '#FF2B3C',
  borderRadius = '30px',
  style = {},
  ...props
}) {
  return (
    <Component
      className={`moving-border-container ${containerClassName}`}
      style={{
        position: 'relative',
        padding: '1.5px',
        overflow: 'hidden',
        borderRadius: borderRadius,
        background: 'transparent',
        display: 'inline-block',
        ...style,
      }}
      {...props}
    >
      {/* Animated Conic Gradient Traveling Beam */}
      <div
        className="moving-border-beam"
        style={{
          position: 'absolute',
          inset: '-100%',
          width: '300%',
          height: '300%',
          top: '-100%',
          left: '-100%',
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0%, transparent 70%, ${color} 88%, #FFEAA7 94%, ${color} 100%)`,
          animation: `spinBorder ${duration}ms linear infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Inner Children Layer */}
      <div
        className={`moving-border-content ${className}`}
        style={{
          position: 'relative',
          zIndex: 10,
          borderRadius: 'inherit',
        }}
      >
        {children}
      </div>
    </Component>
  );
}
