import React from 'react';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon = null,
  disabled = false,
  style: customStyle = {},
  ...props
}) {
  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    if (to) {
      e.preventDefault();
      const targetHash = to === '/' ? '' : to.replace(/^\//, '');
      window.location.hash = targetHash;
    }
    if (onClick) onClick(e);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #FF2B3C 0%, #D80015 50%, #8A000A 100%)',
          color: '#FFFFFF',
          border: '1.5px solid rgba(255, 170, 64, 0.7)',
          boxShadow: '0 0 25px rgba(255, 43, 60, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.35)',
        };
      case 'outline':
        return {
          background: 'rgba(18, 9, 14, 0.85)',
          color: '#F5EAEB',
          border: '1.5px solid rgba(255, 170, 64, 0.45)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(229, 9, 20, 0.15)',
        };
      case 'glass':
        return {
          background: 'rgba(28, 12, 18, 0.65)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.3)',
        };
      case 'danger':
        return {
          background: 'linear-gradient(135deg, #C92F15 0%, #851403 100%)',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 50, 20, 0.5)',
          boxShadow: '0 4px 20px rgba(201, 47, 21, 0.5)',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 14px', fontSize: '0.78rem' };
      case 'lg':
        return { padding: '12px 28px', fontSize: '1rem' };
      case 'xl':
        return { padding: '16px 36px', fontSize: '1.1rem' };
      case 'md':
      default:
        return { padding: '9px 20px', fontSize: '0.88rem' };
    }
  };

  const baseStyle = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    borderRadius: '30px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    textDecoration: 'none',
    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
    position: 'relative',
    overflow: 'hidden',
    ...getVariantStyles(),
    ...getSizeStyles(),
    ...customStyle,
  };

  if (href) {
    const isExternal = typeof href === 'string' && (href.startsWith('http') || props.target === '_blank');
    const rel = props.rel || (isExternal ? 'noopener noreferrer' : undefined);
    return (
      <a href={href} className={`aaveg-btn ${className}`} style={baseStyle} onClick={handleClick} rel={rel} {...props}>
        {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button className={`aaveg-btn ${className}`} style={baseStyle} onClick={handleClick} disabled={disabled} {...props}>
      {icon && <span style={{ display: 'inline-flex', alignItems: 'center' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}
