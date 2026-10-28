import type { SVGProps } from "react";

function Icon({ children, size = 14, ...props }: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ClockIcon = () => (
  <Icon><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></Icon>
);
export const FlameIcon = () => (
  <Icon><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.4 1-3 0 1.4 1 2.5 2.5 2.5Z" /></Icon>
);
export const StarIcon = () => (
  <Icon><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2Z" /></Icon>
);
export const PlusIcon = ({ size = 16 }: { size?: number }) => (
  <Icon size={size}><path d="M12 5v14M5 12h14" /></Icon>
);
export const BookmarkIcon = ({ size = 16 }: { size?: number }) => (
  <Icon size={size}><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></Icon>
);
export const CheckIcon = ({ size = 14 }: { size?: number }) => (
  <Icon size={size}><path d="M20 6 9 17l-5-5" /></Icon>
);
export const CloseIcon = ({ size = 16 }: { size?: number }) => (
  <Icon size={size}><path d="M18 6 6 18M6 6l12 12" /></Icon>
);
