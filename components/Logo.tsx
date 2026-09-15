export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f2b48" />
          <stop offset="100%" stopColor="#081b2e" />
        </linearGradient>
        <linearGradient id="logoWave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Outer rounded container with subtle border */}
      <rect width="44" height="44" rx="10" fill="url(#logoBg)" stroke="#1e3a5f" strokeWidth="1.5" />
      
      {/* Golden Thai Spire Peak */}
      <path
        d="M22 6L24.5 12H19.5L22 6Z"
        fill="url(#logoGold)"
      />
      <path
        d="M22 11V15M17 15H27"
        stroke="url(#logoGold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="7" r="1.2" fill="#fff" />

      {/* Stylized Ocean Waves */}
      <path
        d="M8 27C12 22.5 16.5 22.5 20.5 27C24.5 31.5 29 31.5 33 27C34.5 25.3 35.5 25.8 36 26.5"
        stroke="url(#logoWave)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 20C12 15.5 16.5 15.5 20.5 20C24.5 24.5 29 24.5 33 20C34.5 18.3 35.5 18.8 36 19.5"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.9"
      />
      <path
        d="M12 34C15.5 31 18.5 31 22 34C25.5 37 28.5 37 32 34"
        stroke="url(#logoWave)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
    </svg>
  );
}
