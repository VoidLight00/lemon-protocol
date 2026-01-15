'use client';

import { cn } from '@/lib/utils';

interface LemonCharacterProps {
  expression?: 'neutral' | 'happy' | 'sour' | 'thinking' | 'love' | 'sad' | 'determined';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  animate?: boolean;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
  '2xl': 'w-64 h-64',
};

export function LemonCharacter({
  expression = 'neutral',
  size = 'md',
  className,
  animate = false,
}: LemonCharacterProps) {
  return (
    <div className={cn(sizeMap[size], animate && 'animate-bounce-slow', className)}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        {/* Lemon Body - Gradient */}
        <defs>
          <linearGradient id="lemonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>
          <linearGradient id="lemonShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="50" ry="10" fill="#00000015" />

        {/* Lemon Body */}
        <ellipse
          cx="100"
          cy="100"
          rx="70"
          ry="60"
          fill="url(#lemonGradient)"
          stroke="#EAB308"
          strokeWidth="2"
        />

        {/* Lemon Tips */}
        <ellipse cx="30" cy="100" rx="12" ry="8" fill="url(#lemonShadow)" />
        <ellipse cx="170" cy="100" rx="12" ry="8" fill="url(#lemonShadow)" />

        {/* Leaf */}
        <path
          d="M100 40 Q90 25 100 15 Q110 25 100 40"
          fill="#22C55E"
          stroke="#16A34A"
          strokeWidth="1"
        />
        <path
          d="M100 35 Q95 28 100 20"
          stroke="#16A34A"
          strokeWidth="1"
          fill="none"
        />

        {/* Face based on expression */}
        <LemonFace expression={expression} />

        {/* Blush (always present, opacity varies) */}
        <circle cx="55" cy="110" r="10" fill="#FCA5A5" opacity={expression === 'love' ? 0.8 : 0.3} />
        <circle cx="145" cy="110" r="10" fill="#FCA5A5" opacity={expression === 'love' ? 0.8 : 0.3} />
      </svg>
    </div>
  );
}

function LemonFace({ expression }: { expression: string }) {
  switch (expression) {
    case 'happy':
      return (
        <>
          {/* Happy eyes - closed crescents */}
          <path d="M70 90 Q80 80 90 90" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M110 90 Q120 80 130 90" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Big smile */}
          <path d="M65 115 Q100 145 135 115" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
        </>
      );

    case 'sour':
      return (
        <>
          {/* Squinting eyes */}
          <path d="M65 85 L90 92" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
          <path d="M135 85 L110 92" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
          {/* Puckered mouth */}
          <ellipse cx="100" cy="120" rx="8" ry="12" fill="#713F12" />
          {/* Sweat drop */}
          <path d="M150 70 Q155 80 150 90 Q145 80 150 70" fill="#60A5FA" />
        </>
      );

    case 'thinking':
      return (
        <>
          {/* One eye normal, one looking up */}
          <circle cx="80" cy="90" r="8" fill="#713F12" />
          <circle cx="120" cy="85" r="8" fill="#713F12" />
          <circle cx="122" cy="83" r="3" fill="white" />
          {/* Slight frown */}
          <path d="M80 120 Q100 125 120 118" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Thought bubble */}
          <circle cx="155" cy="60" r="5" fill="#E5E7EB" />
          <circle cx="165" cy="50" r="7" fill="#E5E7EB" />
          <circle cx="178" cy="38" r="10" fill="#E5E7EB" />
        </>
      );

    case 'love':
      return (
        <>
          {/* Heart eyes */}
          <path d="M70 85 L80 95 L90 85 Q80 75 70 85" fill="#EF4444" />
          <path d="M110 85 L120 95 L130 85 Q120 75 110 85" fill="#EF4444" />
          {/* Happy smile */}
          <path d="M70 115 Q100 140 130 115" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Floating hearts */}
          <path d="M45 60 L50 65 L55 60 Q50 55 45 60" fill="#FCA5A5" opacity="0.8" />
          <path d="M150 55 L155 60 L160 55 Q155 50 150 55" fill="#FCA5A5" opacity="0.8" />
        </>
      );

    case 'sad':
      return (
        <>
          {/* Sad eyes */}
          <ellipse cx="80" cy="90" rx="8" ry="10" fill="#713F12" />
          <ellipse cx="120" cy="90" rx="8" ry="10" fill="#713F12" />
          {/* Eyebrows */}
          <path d="M65 75 L90 82" stroke="#713F12" strokeWidth="3" strokeLinecap="round" />
          <path d="M135 75 L110 82" stroke="#713F12" strokeWidth="3" strokeLinecap="round" />
          {/* Sad mouth */}
          <path d="M75 125 Q100 110 125 125" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Tear */}
          <path d="M130 95 Q135 105 130 115 Q125 105 130 95" fill="#60A5FA" />
        </>
      );

    case 'determined':
      return (
        <>
          {/* Determined eyes */}
          <circle cx="80" cy="90" r="8" fill="#713F12" />
          <circle cx="120" cy="90" r="8" fill="#713F12" />
          <circle cx="82" cy="88" r="3" fill="white" />
          <circle cx="122" cy="88" r="3" fill="white" />
          {/* Eyebrows - determined */}
          <path d="M62 78 L88 85" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
          <path d="M138 78 L112 85" stroke="#713F12" strokeWidth="4" strokeLinecap="round" />
          {/* Confident smile */}
          <path d="M75 118 Q100 130 125 118" stroke="#713F12" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Sparkle */}
          <path d="M155 65 L160 60 L165 65 L160 70 Z" fill="#FDE047" />
        </>
      );

    default: // neutral
      return (
        <>
          {/* Normal eyes */}
          <circle cx="80" cy="90" r="8" fill="#713F12" />
          <circle cx="120" cy="90" r="8" fill="#713F12" />
          <circle cx="82" cy="88" r="3" fill="white" />
          <circle cx="122" cy="88" r="3" fill="white" />
          {/* Slight smile */}
          <path d="M80 115 Q100 125 120 115" stroke="#713F12" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      );
  }
}

// Animated version with different states
export function LemonCharacterAnimated({
  className,
  size = 'lg',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}) {
  return (
    <div className={cn('relative', sizeMap[size], className)}>
      <div className="animate-float">
        <LemonCharacter expression="happy" size={size} />
      </div>
    </div>
  );
}
