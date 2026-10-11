import React from 'react';

export default function ShinyText({
  children,
  text,
  disabled = false,
  speed = 3.5,
  className = '',
  color = '#FFFFFF',
  shimmerColor = '#FF8A3D',
  style = {},
}) {
  const content = children !== undefined ? children : text;

  return (
    <span
      className={`shiny-text ${className}`}
      style={{
        display: 'inline-block',
        color: disabled ? color : 'transparent',
        backgroundImage: disabled
          ? 'none'
          : `linear-gradient(120deg, ${color} 0%, ${color} 30%, ${shimmerColor} 50%, #FFFFFF 56%, ${color} 70%, ${color} 100%)`,
        backgroundSize: '220% 100%',
        WebkitBackgroundClip: disabled ? 'unset' : 'text',
        backgroundClip: disabled ? 'unset' : 'text',
        animation: disabled ? 'none' : `shimmerSweep ${speed}s linear infinite`,
        ...style,
      }}
    >
      {content}
    </span>
  );
}
