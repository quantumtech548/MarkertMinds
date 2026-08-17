import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function MarketMindLogo({ className = '', size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5E3A" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      
      {/* Neural network / brain connections */}
      {/* Left node cluster representing AI / Mind */}
      <circle cx="25" cy="40" r="4.5" fill="url(#logo-grad)" opacity="0.85" />
      <circle cx="35" cy="24" r="5" fill="url(#logo-grad)" />
      <circle cx="50" cy="30" r="5.5" fill="url(#logo-grad)" />
      <circle cx="18" cy="55" r="5.5" fill="url(#logo-grad)" />
      <circle cx="38" cy="48" r="6" fill="url(#logo-grad)" />
      <circle cx="30" cy="72" r="4.5" fill="url(#logo-grad)" opacity="0.85" />

      {/* Connecting lines for neural network */}
      <line x1="25" y1="40" x2="35" y2="24" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="35" y1="24" x2="50" y2="30" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="25" y1="40" x2="38" y2="48" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="55" x2="38" y2="48" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="38" y1="48" x2="50" y2="30" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="18" y1="55" x2="30" y2="72" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="38" y1="48" x2="30" y2="72" stroke="url(#logo-grad)" strokeWidth="1.5" opacity="0.6" />

      {/* Growth/Trend Bars representing Market */}
      <rect x="52" y="60" width="8" height="20" rx="3" fill="url(#logo-grad)" />
      <rect x="66" y="48" width="8" height="32" rx="3" fill="url(#logo-grad)" />
      <rect x="80" y="32" width="8" height="48" rx="3" fill="url(#logo-grad)" />

      {/* Trending growth line and arrow */}
      <path
        d="M38 65 L52 50 L68 38 L84 18"
        stroke="url(#logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M74 18 H84 V28"
        stroke="url(#logo-grad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
