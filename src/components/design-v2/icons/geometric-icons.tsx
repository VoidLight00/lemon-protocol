'use client';

import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

// Chat/Communication Icon - Two overlapping speech bubbles
export function IconChat({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M8 9h8M8 13h4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 12c0-4.243 0-6.364 1.318-7.682C5.636 3 7.758 3 12 3c4.243 0 6.364 0 7.682 1.318C21 5.636 21 7.758 21 12c0 4.243 0 6.364-1.318 7.682C18.364 21 16.242 21 12 21c-1.178 0-2.181 0-3.052-.032-.503-.018-.754-.027-.949.032-.194.058-.398.188-.804.448l-2.072 1.324c-.66.422-1.398-.194-1.123-.937l.579-1.562c.163-.44.245-.66.2-.867-.046-.206-.19-.376-.477-.716C3 17.207 3 15.413 3 12z"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
}

// Heart Icon - Geometric heart shape
export function IconHeart({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M12 5.5c-1.887-2.073-5.013-2.476-7.188-.57-2.175 1.906-2.48 5.089-.773 7.32 1.418 1.855 5.674 5.65 7.276 7.058.177.156.266.234.368.264a.494.494 0 00.234 0c.102-.03.19-.108.368-.264 1.602-1.408 5.858-5.203 7.276-7.058 1.707-2.231 1.448-5.437-.773-7.32-2.22-1.883-5.3-1.503-7.188.57z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Couple Icon - Two abstract figures
export function IconCouple({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="8" cy="6" r="2.5" stroke={color} strokeWidth="1.5" />
      <circle cx="16" cy="6" r="2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M4 18c0-2.5 2-4.5 4-4.5s4 2 4 4.5M12 18c0-2.5 2-4.5 4-4.5s4 2 4 4.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 14.5l2 1 2-1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Analysis/Chart Icon - Bar chart
export function IconAnalysis({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <rect x="3" y="14" width="4" height="7" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="10" y="9" width="4" height="12" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="17" y="4" width="4" height="17" rx="1" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Book/Library Icon - Open book
export function IconBook({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M12 6.5c-1.5-1.5-3.5-2-6-2-1 0-2 .2-3 .5v13c1-.3 2-.5 3-.5 2.5 0 4.5.5 6 2 1.5-1.5 3.5-2 6-2 1 0 2 .2 3 .5v-13c-1-.3-2-.5-3-.5-2.5 0-4.5.5-6 2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 6.5v13" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

// Target/Goal Icon - Concentric circles with center dot
export function IconTarget({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke={color} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  );
}

// Shield/Protection Icon - Shield shape
export function IconShield({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M12 3l8 3v5c0 5.5-3.5 9.74-8 11-4.5-1.26-8-5.5-8-11V6l8-3z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l2 2 4-4"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrow Right Icon - Simple arrow
export function IconArrowRight({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sparkle/Star Icon - Four-pointed star
export function IconSparkle({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Clock/Time Icon - Simple clock
export function IconClock({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 7v5l3 3"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Bridge/Connection Icon - Two dots connected
export function IconBridge({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="5" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <circle cx="19" cy="12" r="2" stroke={color} strokeWidth="1.5" />
      <path
        d="M7 12c0-3 2.5-5 5-5s5 2 5 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7 12c0 3 2.5 5 5 5s5-2 5-5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

// Hand/Support Icon - Open hand
export function IconHand({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <path
        d="M18 11V6a2 2 0 00-4 0v1M14 7V4a2 2 0 00-4 0v3M10 7V5a2 2 0 00-4 0v6M6 11v-1a2 2 0 00-4 0v5c0 4.4 3.6 8 8 8h2c4.4 0 8-3.6 8-8v-4a2 2 0 00-4 0"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lemon Icon - Stylized geometric lemon
export function IconLemon({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <ellipse
        cx="12"
        cy="13"
        rx="7"
        ry="6"
        stroke={color}
        strokeWidth="1.5"
      />
      <ellipse cx="5.5" cy="13" rx="1.5" ry="1" stroke={color} strokeWidth="1.5" />
      <ellipse cx="18.5" cy="13" rx="1.5" ry="1" stroke={color} strokeWidth="1.5" />
      <path
        d="M12 7v-2c0-1 .5-2 1.5-2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 5c-.5 0-1-.5-1.5-1"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Check Circle Icon
export function IconCheck({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="1.5" />
      <path
        d="M8 12l3 3 5-6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Users/Community Icon
export function IconUsers({ className, size = 'md', color = 'currentColor' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={cn(sizeMap[size], className)}
    >
      <circle cx="9" cy="7" r="3" stroke={color} strokeWidth="1.5" />
      <path
        d="M3 18c0-2.8 2.7-5 6-5s6 2.2 6 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="17" cy="8" r="2.5" stroke={color} strokeWidth="1.5" />
      <path
        d="M15 18c0-1.5.8-2.8 2-3.6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Export all icons
export const Icons = {
  Chat: IconChat,
  Heart: IconHeart,
  Couple: IconCouple,
  Analysis: IconAnalysis,
  Book: IconBook,
  Target: IconTarget,
  Shield: IconShield,
  ArrowRight: IconArrowRight,
  Sparkle: IconSparkle,
  Clock: IconClock,
  Bridge: IconBridge,
  Hand: IconHand,
  Lemon: IconLemon,
  Check: IconCheck,
  Users: IconUsers,
};
