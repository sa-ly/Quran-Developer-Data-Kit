import React from 'react';

interface QuranLogoProps {
  className?: string;
  size?: number;
}

export const QuranLogo: React.FC<QuranLogoProps> = ({ className = '', size = 44 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      aria-label="شعار القرآن الكريم - hajj.ly"
    >
      <defs>
        <radialGradient id="logoBgGrad" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#0a5c46" />
          <stop offset="60%" stopColor="#064E3B" />
          <stop offset="100%" stopColor="#02281e" />
        </radialGradient>

        <linearGradient id="logoGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCE596" />
          <stop offset="30%" stopColor="#E5C378" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8F6B28" />
        </linearGradient>

        <linearGradient id="logoSoftGold" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#FDF3B8" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>

        <filter id="logoShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Base Rounded Emerald Container */}
      <rect width="512" height="512" rx="108" fill="url(#logoBgGrad)" />

      {/* Ornate Outer Golden Frame */}
      <rect x="22" y="22" width="468" height="468" rx="88" fill="none" stroke="url(#logoGoldGrad)" strokeWidth="8" filter="url(#logoShadow)" />
      <rect x="36" y="36" width="440" height="440" rx="76" fill="none" stroke="url(#logoSoftGold)" strokeWidth="2" opacity="0.6" />

      {/* Corner Florets */}
      <g fill="url(#logoSoftGold)">
        <circle cx="56" cy="56" r="6" />
        <circle cx="456" cy="56" r="6" />
        <circle cx="56" cy="456" r="6" />
        <circle cx="456" cy="456" r="6" />
      </g>

      {/* Central Octagram (نجمة إسلامية مثمنة) */}
      <g transform="translate(256, 252)">
        <path d="M 0,-182 L 52,-128 L 128,-128 L 128,-52 L 182,0 L 128,52 L 128,128 L 52,128 L 0,182 L -52,128 L -128,128 L -128,52 L -182,0 L -128,-52 L -128,-128 L -52,-128 Z"
              fill="#033527" stroke="url(#logoGoldGrad)" strokeWidth="5" />
        <path d="M 0,-168 L 48,-118 L 118,-118 L 118,-48 L 168,0 L 118,48 L 118,118 L 48,118 L 0,168 L -48,118 L -118,118 L -118,48 L -168,0 L -118,-48 L -118,-118 L -48,-118 Z"
              fill="none" stroke="url(#logoSoftGold)" strokeWidth="1.5" opacity="0.75" />
      </g>

      {/* Sacred Quran Book Icon */}
      <g transform="translate(256, 172) scale(0.92)">
        {/* Left Page */}
        <path d="M -8,38 C -45,18 -85,22 -115,35 C -118,36 -120,34 -120,30 L -120,-38 C -120,-42 -116,-45 -112,-46 C -82,-55 -45,-50 -8,-32 Z"
              fill="url(#logoGoldGrad)" stroke="#4A3810" strokeWidth="2.5" />
        <path d="M -25,-22 C -50,-32 -80,-35 -105,-29 M -25,-4 C -50,-14 -80,-17 -105,-11 M -25,14 C -50,4 -80,1 -105,7"
              stroke="#42310C" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

        {/* Right Page */}
        <path d="M 8,38 C 45,18 85,22 115,35 C 118,36 120,34 120,30 L 120,-38 C 120,-42 116,-45 112,-46 C 82,-55 45,-50 8,-32 Z"
              fill="url(#logoSoftGold)" stroke="#4A3810" strokeWidth="2.5" />
        <path d="M 25,-22 C 50,-32 80,-35 105,-29 M 25,-4 C 50,-14 80,-17 105,-11 M 25,14 C 50,4 80,1 105,7"
              stroke="#42310C" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />

        {/* Center Ribbon */}
        <path d="M 0,-34 L 0,42" stroke="#5C4413" strokeWidth="4" strokeLinecap="round" />
        <path d="M 0,40 L 0,66 L 9,56 L 18,66 L 18,40 Z" fill="#DC2626" />
        <circle cx="0" cy="-35" r="5" fill="url(#logoGoldGrad)" />
      </g>

      {/* Sacred Calligraphy: "القرآن" */}
      <g transform="translate(256, 316)">
        <text
          x="0"
          y="0"
          fontFamily="'Amiri', 'Amiri Quran', 'Scheherazade New', 'Traditional Arabic', serif"
          fontSize="94"
          fontWeight="bold"
          fill="url(#logoSoftGold)"
          textAnchor="middle"
          stroke="#382907"
          strokeWidth="2.5"
          letterSpacing="2"
        >
          الْقُرْآن
        </text>

        <text
          x="0"
          y="42"
          fontFamily="'Amiri', 'Scheherazade New', 'Traditional Arabic', serif"
          fontSize="34"
          fontWeight="bold"
          fill="#FCE596"
          textAnchor="middle"
          letterSpacing="4"
          opacity="0.95"
        >
          الْكَرِيم
        </text>
      </g>

      {/* hajj.ly badge */}
      <g transform="translate(256, 420)">
        <rect x="-65" y="-15" width="130" height="30" rx="15" fill="#022118" stroke="url(#logoGoldGrad)" strokeWidth="1.8" />
        <text
          x="0"
          y="6"
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
          fontSize="15"
          fontWeight="800"
          fill="url(#logoSoftGold)"
          textAnchor="middle"
          letterSpacing="2"
        >
          HAJJ.LY
        </text>
      </g>
    </svg>
  );
};
