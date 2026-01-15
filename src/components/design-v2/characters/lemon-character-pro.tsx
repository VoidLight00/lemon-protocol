'use client';

import { cn } from '@/lib/utils';

interface LemonCharacterProProps {
  expression?: 'neutral' | 'happy' | 'sour' | 'thinking' | 'love' | 'sad' | 'determined' | 'wink';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  className?: string;
  animate?: boolean;
  showGlow?: boolean;
}

const sizeMap = {
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-32 h-32',
  xl: 'w-48 h-48',
  '2xl': 'w-64 h-64',
  '3xl': 'w-80 h-80',
};

export function LemonCharacterPro({
  expression = 'neutral',
  size = 'md',
  className,
  animate = false,
  showGlow = false,
}: LemonCharacterProProps) {
  return (
    <div className={cn(sizeMap[size], animate && 'animate-float', className)}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{
          filter: showGlow ? 'drop-shadow(0 0 30px rgba(250, 204, 21, 0.4))' : 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.1))',
        }}
      >
        <defs>
          {/* Main body gradient - more sophisticated */}
          <linearGradient id="lemonBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="30%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FACC15" />
          </linearGradient>

          {/* Highlight gradient */}
          <linearGradient id="lemonHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Shadow gradient for depth */}
          <linearGradient id="lemonShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Leaf gradient */}
          <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          {/* Inner shadow filter */}
          <filter id="innerShadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="2" result="offset-blur" />
            <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
            <feFlood floodColor="#000" floodOpacity="0.1" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Shadow under character */}
        <ellipse cx="100" cy="188" rx="45" ry="8" fill="#000" opacity="0.08" />

        {/* Main lemon body */}
        <ellipse
          cx="100"
          cy="105"
          rx="68"
          ry="58"
          fill="url(#lemonBodyGradient)"
        />

        {/* Body outline for definition */}
        <ellipse
          cx="100"
          cy="105"
          rx="68"
          ry="58"
          fill="none"
          stroke="#EAB308"
          strokeWidth="1.5"
        />

        {/* Left tip */}
        <ellipse
          cx="32"
          cy="105"
          rx="14"
          ry="9"
          fill="url(#lemonShadow)"
        />

        {/* Right tip */}
        <ellipse
          cx="168"
          cy="105"
          rx="14"
          ry="9"
          fill="url(#lemonShadow)"
        />

        {/* Highlight on body - top left */}
        <ellipse
          cx="70"
          cy="75"
          rx="30"
          ry="20"
          fill="url(#lemonHighlight)"
          transform="rotate(-20 70 75)"
        />

        {/* Secondary highlight */}
        <ellipse
          cx="55"
          cy="85"
          rx="12"
          ry="8"
          fill="white"
          opacity="0.4"
          transform="rotate(-20 55 85)"
        />

        {/* Stem */}
        <path
          d="M100 47 L100 38 Q100 32 104 30"
          stroke="#854D0E"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Main leaf */}
        <path
          d="M104 30 Q115 20 125 25 Q120 35 108 38 Q105 35 104 30"
          fill="url(#leafGradient)"
        />

        {/* Leaf vein */}
        <path
          d="M106 32 Q112 30 118 28"
          stroke="#16A34A"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />

        {/* Small leaf */}
        <path
          d="M96 35 Q88 28 82 32 Q86 40 96 38"
          fill="url(#leafGradient)"
          opacity="0.8"
        />

        {/* Face */}
        <LemonFacePro expression={expression} />

        {/* Blush - subtle by default */}
        <ellipse
          cx="55"
          cy="115"
          r="8"
          fill="#FCA5A5"
          opacity={expression === 'love' || expression === 'happy' ? 0.5 : 0.2}
        />
        <ellipse
          cx="145"
          cy="115"
          r="8"
          fill="#FCA5A5"
          opacity={expression === 'love' || expression === 'happy' ? 0.5 : 0.2}
        />
      </svg>
    </div>
  );
}

function LemonFacePro({ expression }: { expression: string }) {
  const eyeStyle = {
    fill: '#1E293B',
  };

  switch (expression) {
    case 'happy':
      return (
        <g>
          {/* Happy closed eyes - curved crescents */}
          <path
            d="M68 95 Q80 82 92 95"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M108 95 Q120 82 132 95"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Big happy smile */}
          <path
            d="M65 118 Q100 150 135 118"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Smile teeth hint */}
          <path
            d="M75 123 Q100 138 125 123"
            fill="white"
            opacity="0.9"
          />
        </g>
      );

    case 'sour':
      return (
        <g>
          {/* Squinting eyes */}
          <path
            d="M65 88 L88 96"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M135 88 L112 96"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Puckered mouth */}
          <ellipse cx="100" cy="125" rx="10" ry="14" fill="#1E293B" />
          <ellipse cx="100" cy="122" rx="5" ry="6" fill="#FDA4AF" />
          {/* Sweat drops */}
          <path
            d="M150 70 Q156 82 150 94 Q144 82 150 70"
            fill="#60A5FA"
            opacity="0.8"
          />
          <path
            d="M158 85 Q161 90 158 95 Q155 90 158 85"
            fill="#60A5FA"
            opacity="0.5"
          />
          {/* Stress lines */}
          <path d="M60 70 L55 65" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <path d="M55 75 L50 72" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </g>
      );

    case 'thinking':
      return (
        <g>
          {/* One eye normal, one looking up */}
          <ellipse cx="80" cy="95" rx="7" ry="8" {...eyeStyle} />
          <circle cx="82" cy="93" r="2.5" fill="white" />

          <ellipse cx="120" cy="90" rx="7" ry="8" {...eyeStyle} />
          <circle cx="123" cy="87" r="2.5" fill="white" />

          {/* Raised eyebrow */}
          <path
            d="M105 78 Q120 72 135 80"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Slight hmm mouth */}
          <path
            d="M78 125 Q100 130 122 122"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Thought bubbles */}
          <circle cx="155" cy="60" r="4" fill="#E2E8F0" />
          <circle cx="165" cy="48" r="6" fill="#E2E8F0" />
          <circle cx="178" cy="35" r="9" fill="#E2E8F0" />
        </g>
      );

    case 'love':
      return (
        <g>
          {/* Heart eyes */}
          <path
            d="M70 90 L80 102 L90 90 Q80 78 70 90"
            fill="#EF4444"
          />
          <path
            d="M110 90 L120 102 L130 90 Q120 78 110 90"
            fill="#EF4444"
          />
          {/* Sparkles on hearts */}
          <circle cx="73" cy="85" r="1.5" fill="white" />
          <circle cx="113" cy="85" r="1.5" fill="white" />

          {/* Loving smile */}
          <path
            d="M68 118 Q100 148 132 118"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Floating hearts */}
          <g opacity="0.7">
            <path d="M42 55 L47 62 L52 55 Q47 48 42 55" fill="#FCA5A5" />
            <path d="M155 50 L160 57 L165 50 Q160 43 155 50" fill="#FCA5A5" />
            <path d="M45 75 L48 79 L51 75 Q48 71 45 75" fill="#FECDD3" />
          </g>
        </g>
      );

    case 'sad':
      return (
        <g>
          {/* Sad eyes */}
          <ellipse cx="80" cy="95" rx="7" ry="9" {...eyeStyle} />
          <ellipse cx="120" cy="95" rx="7" ry="9" {...eyeStyle} />
          <circle cx="82" cy="97" r="2" fill="white" />
          <circle cx="122" cy="97" r="2" fill="white" />

          {/* Sad eyebrows */}
          <path
            d="M62 80 L90 88"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M138 80 L110 88"
            stroke="#1E293B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Sad frown */}
          <path
            d="M75 130 Q100 115 125 130"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tear */}
          <path
            d="M128 100 Q133 112 128 124 Q123 112 128 100"
            fill="#60A5FA"
          />
        </g>
      );

    case 'determined':
      return (
        <g>
          {/* Determined eyes */}
          <ellipse cx="80" cy="95" rx="7" ry="8" {...eyeStyle} />
          <ellipse cx="120" cy="95" rx="7" ry="8" {...eyeStyle} />
          <circle cx="82" cy="93" r="2.5" fill="white" />
          <circle cx="122" cy="93" r="2.5" fill="white" />

          {/* Strong eyebrows - determined angle */}
          <path
            d="M60 82 L88 90"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M140 82 L112 90"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Confident smile */}
          <path
            d="M72 120 Q100 135 128 120"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sparkle effects */}
          <path d="M150 65 L155 60 L160 65 L155 70 Z" fill="#FDE047" />
          <path d="M155 60 L155 55 M160 65 L165 65 M155 70 L155 75 M150 65 L145 65"
                stroke="#FDE047" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      );

    case 'wink':
      return (
        <g>
          {/* Open eye */}
          <ellipse cx="80" cy="95" rx="7" ry="8" {...eyeStyle} />
          <circle cx="82" cy="93" r="2.5" fill="white" />

          {/* Winking eye */}
          <path
            d="M108 95 Q120 88 132 95"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Playful smile */}
          <path
            d="M68 118 Q100 145 132 118"
            stroke="#1E293B"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Tongue peeking */}
          <ellipse cx="115" cy="128" rx="8" ry="5" fill="#FDA4AF" />

          {/* Wink sparkle */}
          <path d="M145 85 L148 82 L151 85 L148 88 Z" fill="#FDE047" />
        </g>
      );

    default: // neutral
      return (
        <g>
          {/* Normal eyes */}
          <ellipse cx="80" cy="95" rx="7" ry="8" {...eyeStyle} />
          <ellipse cx="120" cy="95" rx="7" ry="8" {...eyeStyle} />

          {/* Eye highlights */}
          <circle cx="82" cy="93" r="2.5" fill="white" />
          <circle cx="122" cy="93" r="2.5" fill="white" />

          {/* Gentle smile */}
          <path
            d="M78 120 Q100 132 122 120"
            stroke="#1E293B"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      );
  }
}

// Animated character with expression cycling
export function LemonCharacterAnimated({
  className,
  size = 'xl',
  showGlow = true,
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showGlow?: boolean;
}) {
  return (
    <div className={cn('relative', className)}>
      <div className="animate-float">
        <LemonCharacterPro expression="happy" size={size} showGlow={showGlow} />
      </div>
    </div>
  );
}
