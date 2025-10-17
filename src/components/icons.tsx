import type { SVGProps } from "react";

export function PennyWiseLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M10 11v-2a2 2 0 1 1 4 0v2" />
      <path d="M4 17.172C5.172 16 6.586 15 8 15s2.828 1 4 2.172C13.172 16 14.586 15 16 15s2.828 1 4 2.172V9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8.172z" />
      <path d="M2 21h20" />
      <path d="M15.999 8.5A2.5 2.5 0 0 0 16 3.51V2" />
      <path d="M12 2v1.5" />
    </svg>
  );
}
