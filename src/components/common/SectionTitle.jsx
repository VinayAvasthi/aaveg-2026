import React from 'react';
import ShinyText from '../ui/ShinyText';
import FloatingElements from '../ui/FloatingElements';

export default function SectionTitle({
  subtitle,
  tagline,
  title,
  highlightWord,
  description,
  align = 'center',
  className = '',
}) {
  const isCenter = align === 'center';
  const displaySubtitle = subtitle || tagline;

  const renderTitle = () => {
    if (!title) return null;
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }

    const parts = title.split(highlightWord);
    return (
      <>
        {parts[0]}
        <ShinyText color="#FF2B3C" shimmerColor="#FFAA40">
          {highlightWord}
        </ShinyText>
        {parts.slice(1).join(highlightWord)}
      </>
    );
  };

  return (
    <div
      className={`section-title-wrapper ${className}`}
      style={{
        textAlign: align,
        marginBottom: '2.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {displaySubtitle && (
        <FloatingElements duration={4} distance={3} rotate={1}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.85rem',
              fontWeight: '800',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#FFAA40',
              marginBottom: '0.5rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '5px 16px',
              borderRadius: '20px',
              background: 'rgba(229, 9, 20, 0.15)',
              border: '1px solid rgba(255, 170, 64, 0.4)',
            }}
          >
            ✦ {displaySubtitle} ✦
          </span>
        </FloatingElements>
      )}

      {title && (
        <h2
          style={{
            fontFamily: "'Cinzel Decorative', 'Anton', serif",
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: '900',
            color: '#FFFFFF',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: '0.5rem 0',
            lineHeight: '1.1',
            textShadow: '0 4px 20px rgba(0,0,0,0.95), 0 0 35px rgba(255, 43, 60, 0.4)',
          }}
        >
          {renderTitle()}
        </h2>
      )}

      {description && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)',
            color: '#B8A8AB',
            maxWidth: '680px',
            margin: '0.5rem 0 0',
            lineHeight: '1.6',
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
