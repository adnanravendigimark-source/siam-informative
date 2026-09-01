// New, original mark for this project: a stylised wave crest inside a
// rounded shield-ish outline, evoking a water park guide without reusing
// any motif (temple roofline, pyramid, palace gate) from the other 12
// sibling projects.
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" fill="#1E2A4A" />
      <path
        d="M6 23c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0 5 3 7.5 0"
        stroke="#D9A441"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M6 17c2.5-3 5-3 7.5 0s5 3 7.5 0 5-3 7.5 0 5 3 7.5 0"
        stroke="#E1592C"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="20" cy="10.5" r="2.6" fill="#F6D9C9" />
    </svg>
  );
}
