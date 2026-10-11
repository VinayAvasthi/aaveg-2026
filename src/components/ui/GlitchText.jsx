import React from 'react';

export default function GlitchText({
  text,
  children,
  className = '',
  style = {},
  ...props
}) {
  const content = text !== undefined ? text : children;
  return (
    <span className={`glitch-text-element ${className}`} style={{ display: 'inline-block', ...style }} {...props}>
      {content}
    </span>
  );
}
