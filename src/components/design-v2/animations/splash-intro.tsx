'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { LemonCharacter } from '../characters/lemon-character';

interface SplashIntroProps {
  onComplete?: () => void;
  duration?: number;
}

export function SplashIntro({ onComplete, duration = 3000 }: SplashIntroProps) {
  const [phase, setPhase] = useState<'logo' | 'tagline' | 'zoom'>('logo');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('tagline'), 800);
    const timer2 = setTimeout(() => setPhase('zoom'), 2000);
    const timer3 = setTimeout(() => onComplete?.(), duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete, duration]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-lemon-100 via-lemon-200 to-lemon-300 overflow-hidden">
      {/* Background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-lemon-300/30 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-yellow-200/40 blur-3xl" />
      </div>

      {/* Content */}
      <div
        className={cn(
          'flex flex-col items-center gap-6 transition-all duration-700',
          phase === 'zoom' && 'scale-150 opacity-0'
        )}
      >
        {/* Lemon Character */}
        <div
          className={cn(
            'transition-all duration-500',
            phase === 'logo' && 'animate-scale-in',
            phase === 'tagline' && 'animate-bounce-slow'
          )}
        >
          <LemonCharacter
            expression={phase === 'tagline' ? 'happy' : 'neutral'}
            size="2xl"
          />
        </div>

        {/* Logo Text */}
        <div
          className={cn(
            'text-center opacity-0 transition-all duration-500',
            phase !== 'logo' && 'opacity-100 animate-slide-up'
          )}
        >
          <h1 className="text-4xl font-bold text-lemon-900 mb-2">
            Lemon Protocol
          </h1>
          <p className="text-lg text-lemon-700">
            시고 두렵지만, 건강한 관계를 위한 솔루션
          </p>
        </div>
      </div>

      {/* Particles */}
      <SplashParticles />
    </div>
  );
}

function SplashParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-lemon-400/60 animate-float"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + (i % 2)}s`,
          }}
        />
      ))}
    </div>
  );
}

// Simplified Hero Intro for use in landing page
export function HeroIntro() {
  const [expression, setExpression] = useState<'neutral' | 'happy' | 'sour' | 'determined'>('neutral');

  useEffect(() => {
    const expressions: ('neutral' | 'happy' | 'sour' | 'determined')[] = ['neutral', 'sour', 'determined', 'happy'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % expressions.length;
      setExpression(expressions[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div className="animate-float">
        <LemonCharacter expression={expression} size="xl" />
      </div>

      {/* Speech bubble */}
      <div className="absolute -top-2 -right-4 bg-white rounded-2xl px-4 py-2 shadow-lg border border-lemon-200 animate-bounce-slow">
        <span className="text-sm font-medium text-lemon-800">
          {expression === 'sour' && '으... 시다! 😖'}
          {expression === 'happy' && '해냈어! 💪'}
          {expression === 'determined' && '할 수 있어!'}
          {expression === 'neutral' && '안녕! 🍋'}
        </span>
        {/* Bubble tail */}
        <div className="absolute -bottom-2 left-4 w-4 h-4 bg-white border-l border-b border-lemon-200 transform rotate-[-45deg]" />
      </div>
    </div>
  );
}
