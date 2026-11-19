/** Small inline marks for the tech-stack pills on the landing page. */
import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

export const ReactLogo = (p: P) => (
  <svg viewBox="-11.5 -10.23 23 20.46" aria-hidden {...p}>
    <circle r="2.05" fill="#58C4DC" />
    <g fill="none" stroke="#58C4DC" strokeWidth="1">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const TailwindLogo = (p: P) => (
  <svg viewBox="0 0 54 33" aria-hidden {...p}>
    <path
      fill="#38BDF8"
      fillRule="evenodd"
      d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0ZM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2Z"
    />
  </svg>
);

/** React Aria is by Adobe — three-piece "A" mark in Adobe red. */
export const ReactAriaLogo = (p: P) => (
  <svg viewBox="0 0 30 26" aria-hidden {...p}>
    <g fill="#E1251B">
      <path d="M11.5 0H0v26Z" />
      <path d="M18.5 0H30v26Z" />
      <path d="M15 9.6 22.1 26h-4.7l-2.1-5.2h-5.2Z" />
    </g>
  </svg>
);

export const TypeScriptLogo = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden {...p}>
    <rect width="24" height="24" rx="4" fill="#3178C6" />
    <text x="21" y="20" textAnchor="end" fontSize="11" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#fff" letterSpacing="-0.3">
      TS
    </text>
  </svg>
);
