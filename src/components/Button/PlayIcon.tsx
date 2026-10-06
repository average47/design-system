import type { SVGProps } from 'react';

/** 16×16 play glyph used by the secondary "Watch Free Episode" button. */
export function PlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
      {...props}
    >
      <path
        transform="translate(2 1.3333)"
        d="M11.7707 7.05252L0.687144 13.2741L0.687144 13.2734C0.545714 13.3533 0.371421 13.3533 0.229286 13.2734C0.087856 13.1936 0 13.0471 0 12.888L0 0.445497C0 0.286467 0.0878579 0.139235 0.229286 0.0593756C0.371429 -0.0197919 0.545722 -0.0197919 0.687144 0.0593756L11.7707 6.28099C11.9121 6.36015 12 6.50737 12 6.66642C12 6.82546 11.9121 6.97266 11.7707 7.05252Z"
      />
    </svg>
  );
}
