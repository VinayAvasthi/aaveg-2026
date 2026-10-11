import React from 'react';

export default function Spotlight({
  className = '',
  fill = '#FF2B3C',
  opacity = 0.22,
}) {
  return (
    <svg
      className={`pointer-events-none absolute z-10 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
      style={{
        position: 'absolute',
        top: '-20%',
        left: '-10%',
        width: '140%',
        height: '140%',
        pointerEvents: 'none',
        zIndex: 2,
        opacity: opacity,
        animation: 'spotlightSweep 10s ease-in-out infinite alternate',
      }}
    >
      <g filter="url(#spotlight-blur-filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.45"
        />
      </g>
      <defs>
        <filter
          id="spotlight-blur-filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur_1065_8" />
        </filter>
      </defs>
    </svg>
  );
}
