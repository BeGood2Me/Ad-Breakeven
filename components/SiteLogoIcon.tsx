type SiteLogoIconProps = {
  className?: string;
  size?: number;
};

export default function SiteLogoIcon({
  className,
  size = 32,
}: SiteLogoIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient
          id="site-logo-bg"
          x1="8"
          y1="6"
          x2="58"
          y2="62"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0f1419" />
          <stop offset="0.45" stopColor="#1a3a6e" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient
          id="site-logo-shine"
          x1="16"
          y1="8"
          x2="40"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ffffff" stopOpacity="0.34" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="site-logo-profit"
          x1="32"
          y1="18"
          x2="53"
          y2="34"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5eead4" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.12" />
        </linearGradient>
        <filter
          id="site-logo-glow"
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="site-logo-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow
            dx="0"
            dy="1.5"
            stdDeviation="1.2"
            floodColor="#020617"
            floodOpacity="0.45"
          />
        </filter>
      </defs>

      <g filter="url(#site-logo-soft)">
        <rect width="64" height="64" rx="15" fill="url(#site-logo-bg)" />
        <rect width="64" height="64" rx="15" fill="url(#site-logo-shine)" />
        <rect
          x="0.75"
          y="0.75"
          width="62.5"
          height="62.5"
          rx="14.25"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.14"
        />
      </g>

      <g stroke="#ffffff" strokeOpacity="0.07">
        <line x1="11" y1="22" x2="53" y2="22" />
        <line x1="11" y1="28" x2="53" y2="28" />
        <line x1="11" y1="39" x2="53" y2="39" />
        <line x1="11" y1="45" x2="53" y2="45" />
        <line x1="20" y1="14" x2="20" y2="50" />
        <line x1="32" y1="14" x2="32" y2="50" />
        <line x1="44" y1="14" x2="44" y2="50" />
      </g>

      <line
        x1="11"
        y1="33.5"
        x2="53"
        y2="33.5"
        stroke="#5eead4"
        strokeOpacity="0.85"
        strokeWidth="1.25"
        strokeDasharray="3 2.5"
        strokeLinecap="round"
      />

      <path
        d="M 32 33.5 Q 42.5 24.5 53 18 L 53 33.5 Z"
        fill="url(#site-logo-profit)"
      />

      <path
        d="M 11 39 Q 32 33.5 53 28"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.55"
        strokeWidth="2.25"
        strokeLinecap="round"
      />

      <path
        d="M 11 49 Q 32 34 53 18"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.75"
        strokeLinecap="round"
        filter="url(#site-logo-glow)"
      />

      <circle cx="32" cy="33.5" r="6.5" fill="#2dd4bf" fillOpacity="0.18" />
      <circle
        cx="32"
        cy="33.5"
        r="4.25"
        fill="none"
        stroke="#99f6e4"
        strokeOpacity="0.9"
        strokeWidth="1.25"
      />
      <circle cx="32" cy="33.5" r="2.1" fill="#ffffff" />

      <path
        d="M 38.5 22.5 L 41.5 19.5 M 41.5 19.5 L 44.5 22.5 M 41.5 19.5 L 41.5 25"
        stroke="#99f6e4"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.92"
      />
    </svg>
  );
}
