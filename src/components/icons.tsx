import type { SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 3h18v18H3z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M9 9l3 3 3-3" stroke="hsl(var(--primary-foreground))" />
      <path d="M9 15v-3h6v3" stroke="hsl(var(--primary-foreground))" />
      <circle cx="12" cy="7" r="1" fill="hsl(var(--primary-foreground))" stroke="none" />
    </svg>
  );
}
