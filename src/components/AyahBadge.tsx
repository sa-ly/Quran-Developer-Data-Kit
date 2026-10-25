import React from 'react';

interface AyahBadgeProps {
  ayahNumber: number;
  className?: string;
}

export const AyahBadge: React.FC<AyahBadgeProps> = ({ ayahNumber, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center justify-center align-middle mx-1.5 select-none ${className}`}
      title={`الآية ${ayahNumber}`}
    >
      <span className="relative inline-flex items-center justify-center w-8 h-8">
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full text-[#C5A059] drop-shadow-xs"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer 8-point geometric star rosette */}
          <rect
            x="4"
            y="4"
            width="28"
            height="28"
            rx="4"
            className="stroke-[#C5A059] fill-[#FAF8F5]"
            strokeWidth="1.2"
          />
          <rect
            x="4"
            y="4"
            width="28"
            height="28"
            rx="4"
            transform="rotate(45 18 18)"
            className="stroke-[#C5A059] fill-[#FAF8F5]"
            strokeWidth="1.2"
          />
          {/* Inner circle */}
          <circle
            cx="18"
            cy="18"
            r="10.5"
            className="stroke-[#064E3B] fill-white"
            strokeWidth="0.9"
          />
        </svg>
        {/* Ayah Number */}
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold font-mono text-[#064E3B] pt-0.5">
          {ayahNumber}
        </span>
      </span>
    </span>
  );
};
