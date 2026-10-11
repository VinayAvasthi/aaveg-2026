import React, { useState, Children } from 'react';

export default function FocusCards({
  children,
  cards = [],
  renderCard,
  className = '',
  gridClassName = '',
  style = {},
  blurAmount = '2px',
  unfocusedOpacity = 0.65,
  unfocusedScale = 0.98,
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (cards && cards.length > 0 && typeof renderCard === 'function') {
    return (
      <div
        className={`focus-cards-grid ${gridClassName} ${className}`}
        style={{
          display: 'grid',
          ...style,
        }}
      >
        {cards.map((card, idx) => {
          const isHovered = hoveredIndex === idx;
          const isOtherHovered = hoveredIndex !== null && !isHovered;

          return (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: isOtherHovered ? `blur(${blurAmount}) brightness(${unfocusedOpacity})` : 'none',
                transform: isHovered
                  ? 'translateY(-6px) scale(1.02)'
                  : isOtherHovered
                  ? `scale(${unfocusedScale})`
                  : 'scale(1)',
                zIndex: isHovered ? 20 : 1,
                willChange: 'transform, filter',
              }}
            >
              {renderCard(card, idx, isHovered)}
            </div>
          );
        })}
      </div>
    );
  }

  const childrenArray = Children.toArray(children);

  return (
    <div
      className={`focus-cards-grid ${gridClassName} ${className}`}
      style={{
        display: 'grid',
        ...style,
      }}
    >
      {childrenArray.map((child, idx) => {
        const isHovered = hoveredIndex === idx;
        const isOtherHovered = hoveredIndex !== null && !isHovered;

        return (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              filter: isOtherHovered ? `blur(${blurAmount}) brightness(${unfocusedOpacity})` : 'none',
              transform: isHovered
                ? 'translateY(-6px) scale(1.02)'
                : isOtherHovered
                ? `scale(${unfocusedScale})`
                : 'scale(1)',
              zIndex: isHovered ? 20 : 1,
              willChange: 'transform, filter',
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
