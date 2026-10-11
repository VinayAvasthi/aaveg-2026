import React, { useRef, useState } from 'react';

export default function Magnetic({
  children,
  strength = 0.35,
  className = '',
  style = {},
  disabled = false,
}) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current || !window.matchMedia('(hover: hover)').matches) return;
    const { clientX, clientY } = e;
    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`magnetic-wrapper ${className}`}
      style={{
        display: 'inline-block',
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0 && position.y === 0 ? 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' : 'transform 0.1s ease-out',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
