import { useId } from "react";

export default function Logo({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Flowlytics"
    >
      <rect width="32" height="32" rx="8" fill={`url(#${gradientId})`} />
      <rect x="7" y="19" width="5" height="8" rx="1.5" fill="white" fillOpacity="0.95" />
      <rect x="14" y="13" width="5" height="14" rx="1.5" fill="white" fillOpacity="0.95" />
      <rect x="21" y="7" width="5" height="20" rx="1.5" fill="white" fillOpacity="0.95" />
      <defs>
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </svg>
  );
}
