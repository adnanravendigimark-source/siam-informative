export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="40" height="40" rx="8" fill="#0f2b48" />
      <path
        d="M7 23C10.5 19 14.5 19 18 23C21.5 27 25.5 27 29 23C31 20.8 32.5 21.2 33 22"
        stroke="#38bdf8"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 16.5C10.5 12.5 14.5 12.5 18 16.5C21.5 20.5 25.5 20.5 29 16.5C31 14.3 32.5 14.7 33 15.5"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="28" cy="10" r="2.2" fill="#38bdf8" />
    </svg>
  );
}
