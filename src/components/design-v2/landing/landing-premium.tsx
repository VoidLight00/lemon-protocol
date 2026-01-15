'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { LemonCharacterPro } from '../characters/lemon-character-pro';
import {
  IconChat,
  IconHeart,
  IconCouple,
  IconAnalysis,
  IconBook,
  IconTarget,
  IconShield,
  IconArrowRight,
  IconSparkle,
  IconCheck,
  IconLemon,
} from '../icons/geometric-icons';

// ============================================
// HERO SECTION - Premium
// ============================================
export function HeroPremium() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFFEF5]">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* Gradient orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FEF08A]/30 to-transparent blur-[120px]" />
      <div className="absolute bottom-[-30%] left-[-15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FDE047]/20 to-transparent blur-[100px]" />

      <div className="relative container mx-auto px-6 lg:px-16 xl:px-24 py-24">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left Content */}
          <div className={cn(
            "space-y-10 transition-all duration-1000",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[2px] bg-[#EAB308]" />
              <span className="text-sm font-medium tracking-[0.2em] uppercase text-[#854D0E]">
                Relationship AI
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="text-[3.5rem] lg:text-[4.5rem] xl:text-[5.5rem] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A]">
                Sour,{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">but vital</span>
                  <span className="absolute bottom-2 left-0 w-full h-4 bg-[#FDE047]/60 -z-0" />
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-[#525252] max-w-xl leading-relaxed font-light tracking-[-0.01em]">
                Like lemons in your diet—hard to swallow at first,
                but essential for lasting health.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group relative px-8 py-4 bg-[#1A1A1A] text-white font-semibold rounded-full overflow-hidden transition-all hover:shadow-xl hover:shadow-black/10">
                <span className="relative z-10 flex items-center gap-3">
                  Get started free
                  <IconArrowRight size="sm" className="transition-transform group-hover:translate-x-1" />
                </span>
              </button>
              <button className="px-8 py-4 text-[#1A1A1A] font-medium rounded-full border border-[#E5E5E5] hover:border-[#1A1A1A] transition-colors">
                How it works
              </button>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-12 pt-8 border-t border-[#E5E5E5]/50">
              <Stat value="10K+" label="Conversations" />
              <Stat value="95%" label="Satisfaction" />
              <Stat value="24/7" label="Available" />
            </div>
          </div>

          {/* Right - Interactive Character */}
          <div className={cn(
            "hidden lg:flex justify-center items-center transition-all duration-1000 delay-300",
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            <InteractiveHeroCharacter />
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.15em] uppercase text-[#A3A3A3]">Scroll</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#A3A3A3] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">{value}</p>
      <p className="text-sm text-[#737373] tracking-wide">{label}</p>
    </div>
  );
}

function InteractiveHeroCharacter() {
  const [expression, setExpression] = useState<'neutral' | 'sour' | 'determined' | 'happy'>('neutral');
  const [label, setLabel] = useState('');

  useEffect(() => {
    const sequence = [
      { expr: 'neutral' as const, label: '' },
      { expr: 'sour' as const, label: 'It stings...' },
      { expr: 'determined' as const, label: 'But I can do this' },
      { expr: 'happy' as const, label: 'Worth it!' },
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % sequence.length;
      setExpression(sequence[index].expr);
      setLabel(sequence[index].label);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Glow ring */}
      <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-br from-[#FEF9C3] to-[#FDE047]/30 blur-2xl opacity-60" />

      {/* Character container */}
      <div className="relative">
        <div className="animate-float">
          <LemonCharacterPro expression={expression} size="3xl" showGlow />
        </div>

        {/* Speech bubble */}
        <div className={cn(
          "absolute -top-8 left-full ml-4 transition-all duration-500",
          label ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
        )}>
          <div className="relative bg-white rounded-2xl px-6 py-3 shadow-lg border border-[#F5F5F5]">
            <span className="text-sm font-medium text-[#525252] whitespace-nowrap">{label}</span>
            {/* Bubble tail */}
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-4 bg-white border-l border-b border-[#F5F5F5] transform rotate-45" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CONCEPT SECTION - "Why Lemon?"
// ============================================
export function ConceptPremium() {
  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="max-w-3xl mb-20 lg:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-[2px] bg-[#EAB308]" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-[#737373]">
              Philosophy
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-[#1A1A1A] leading-[1.1]">
            Why{' '}
            <span className="text-[#EAB308]">Lemon</span>?
          </h2>
          <p className="mt-6 text-xl text-[#525252] leading-relaxed max-w-2xl">
            The most meaningful conversations are often the hardest to have.
            Just like lemons—sour at first, but ultimately nourishing.
          </p>
        </div>

        {/* Journey Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <JourneyCard
            step="01"
            expression="sour"
            title="The Initial Sting"
            description="Confronting difficult emotions feels overwhelming. That's completely natural."
            accent="#FEF08A"
          />
          <JourneyCard
            step="02"
            expression="determined"
            title="Building Courage"
            description="With the right guidance, you'll find strength to navigate tough conversations."
            accent="#FEF08A"
          />
          <JourneyCard
            step="03"
            expression="happy"
            title="Lasting Growth"
            description="The result? Deeper understanding and stronger, healthier relationships."
            accent="#BBF7D0"
            highlight
          />
        </div>
      </div>
    </section>
  );
}

function JourneyCard({
  step,
  expression,
  title,
  description,
  accent,
  highlight = false,
}: {
  step: string;
  expression: 'sour' | 'determined' | 'happy';
  title: string;
  description: string;
  accent: string;
  highlight?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "group relative p-10 rounded-3xl transition-all duration-500 cursor-pointer",
        highlight ? "bg-gradient-to-b from-[#F0FDF4] to-white" : "bg-gradient-to-b from-[#FFFEF5] to-white",
        "border border-[#F5F5F5] hover:border-transparent hover:shadow-2xl hover:shadow-black/5"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Step number */}
      <span className="absolute top-8 right-8 text-7xl font-bold tracking-tighter" style={{ color: `${accent}80` }}>
        {step}
      </span>

      {/* Character */}
      <div className={cn(
        "relative mb-8 transition-transform duration-500",
        isHovered && "scale-110"
      )}>
        <LemonCharacterPro expression={expression} size="lg" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-bold text-[#1A1A1A] mb-3 tracking-[-0.01em]">
        {title}
      </h3>
      <p className="text-[#525252] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// ============================================
// FEATURES SECTION - Interactive Tabs
// ============================================
export function FeaturesPremium() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 'coaching',
      label: 'AI Coaching',
      icon: IconChat,
      title: 'Real-time conversation guidance',
      description: 'Our AI provides contextual suggestions during difficult conversations, helping you express yourself clearly while remaining empathetic.',
      points: [
        'Contextual prompts based on conversation flow',
        'Emotion detection and de-escalation strategies',
        'Personalized communication style matching',
      ],
      color: '#EAB308',
      bg: '#FEF9C3',
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: IconAnalysis,
      title: 'Understand your patterns',
      description: 'Gain deep insights into your communication patterns with analytics built on proven psychological frameworks.',
      points: [
        'Communication style assessment',
        'Conflict pattern recognition',
        'Progress tracking over time',
      ],
      color: '#22C55E',
      bg: '#DCFCE7',
    },
    {
      id: 'library',
      label: 'Library',
      icon: IconBook,
      title: 'Expert-curated resources',
      description: 'Access a comprehensive library of resources from relationship experts, therapists, and communication specialists.',
      points: [
        'Guided conversation scripts',
        'Situation-specific advice',
        'Video tutorials from experts',
      ],
      color: '#F43F5E',
      bg: '#FFE4E6',
    },
    {
      id: 'protocols',
      label: 'Protocols',
      icon: IconTarget,
      title: 'Personalized action plans',
      description: 'Custom strategies tailored to your specific relationship dynamics and communication challenges.',
      points: [
        'Step-by-step conversation guides',
        'Adaptive difficulty progression',
        'Milestone celebrations',
      ],
      color: '#6366F1',
      bg: '#E0E7FF',
    },
  ];

  const activeFeature = features[activeTab];
  const ActiveIcon = activeFeature.icon;

  return (
    <section className="py-32 lg:py-40 bg-[#FAFAFA]">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <IconSparkle size="sm" color="#EAB308" />
            <span className="text-sm font-medium tracking-[0.15em] uppercase text-[#737373]">
              Features
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
            Tools that{' '}
            <span className="relative inline-block">
              <span className="relative z-10">click</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FDE047]/50 -z-0" />
            </span>
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 lg:mb-16">
          <div className="inline-flex bg-white rounded-full p-1.5 shadow-sm border border-[#F5F5F5]">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all",
                    activeTab === index
                      ? "bg-[#1A1A1A] text-white"
                      : "text-[#525252] hover:text-[#1A1A1A]"
                  )}
                >
                  <Icon size="sm" color={activeTab === index ? 'white' : '#525252'} />
                  <span className="hidden sm:inline">{feature.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Feature Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Visual */}
          <div className="relative">
            <div
              className="aspect-square max-w-md mx-auto rounded-3xl flex items-center justify-center"
              style={{ backgroundColor: activeFeature.bg }}
            >
              <div className="relative">
                <div
                  className="w-32 h-32 rounded-2xl flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: 'white' }}
                >
                  <ActiveIcon size="xl" color={activeFeature.color} />
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full" style={{ backgroundColor: activeFeature.color, opacity: 0.2 }} />
                <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full" style={{ backgroundColor: activeFeature.color, opacity: 0.15 }} />
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold tracking-[-0.02em] text-[#1A1A1A]">
              {activeFeature.title}
            </h3>
            <p className="text-lg text-[#525252] leading-relaxed">
              {activeFeature.description}
            </p>

            <ul className="space-y-4 pt-4">
              {activeFeature.points.map((point, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: activeFeature.bg }}
                  >
                    <IconCheck size="sm" color={activeFeature.color} />
                  </div>
                  <span className="text-[#525252]">{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6">
              <button
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                style={{ color: activeFeature.color }}
              >
                Learn more about {activeFeature.label.toLowerCase()}
                <IconArrowRight size="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// TESTIMONIALS - Minimal Cards
// ============================================
export function TestimonialsPremium() {
  const testimonials = [
    {
      quote: "Lemon Protocol helped us finally have the conversation we'd been avoiding for years. It saved our marriage.",
      author: "Sarah & Mike",
      role: "Together 12 years",
    },
    {
      quote: "The AI coaching gave me confidence to express my needs clearly. My partner actually understood me for the first time.",
      author: "Jennifer K.",
      role: "Dating 2 years",
    },
    {
      quote: "We went from constant misunderstandings to genuinely hearing each other. The difference is incredible.",
      author: "David & Chris",
      role: "Engaged",
    },
  ];

  return (
    <section className="py-32 lg:py-40 bg-white">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold tracking-[-0.03em] text-[#1A1A1A]">
            Real stories,{' '}
            <span className="text-[#737373]">real growth</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group p-8 lg:p-10 rounded-3xl bg-[#FAFAFA] border border-transparent hover:border-[#E5E5E5] hover:bg-white transition-all duration-300"
            >
              {/* Quote mark */}
              <div className="text-5xl font-serif text-[#E5E5E5] mb-4 leading-none">"</div>

              <blockquote className="text-[#1A1A1A] text-lg leading-relaxed mb-8">
                {testimonial.quote}
              </blockquote>

              <div>
                <p className="font-semibold text-[#1A1A1A]">{testimonial.author}</p>
                <p className="text-sm text-[#737373]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// CTA SECTION - Premium
// ============================================
export function CTAPremium() {
  return (
    <section className="py-32 lg:py-40 bg-gradient-to-b from-[#FFFEF5] to-[#FEF9C3]">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Character */}
          <div className="mb-12 flex justify-center">
            <div className="animate-bounce-slow">
              <LemonCharacterPro expression="love" size="2xl" showGlow />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[-0.03em] text-[#1A1A1A] leading-[1.1] mb-6">
            Ready to build something{' '}
            <span className="relative inline-block">
              <span className="relative z-10">stronger</span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-[#FDE047] -z-0" />
            </span>
            ?
          </h2>

          <p className="text-xl text-[#525252] mb-12 max-w-2xl mx-auto leading-relaxed">
            The first step is always the hardest. Let Lemon Protocol guide you
            toward more meaningful conversations.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-10 py-5 bg-[#1A1A1A] text-white font-semibold text-lg rounded-full hover:shadow-xl transition-all">
              <span className="flex items-center gap-3">
                Start your journey
                <IconArrowRight className="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>

          {/* Trust */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#737373]">
            <span className="flex items-center gap-2">
              <IconCheck size="sm" color="#22C55E" />
              Free 14-day trial
            </span>
            <span className="flex items-center gap-2">
              <IconShield size="sm" color="#22C55E" />
              Privacy protected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// FOOTER - Minimal
// ============================================
export function FooterPremium() {
  return (
    <footer className="py-16 bg-[#0A0A0A]">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <IconLemon size="lg" color="#FDE047" />
            <span className="text-xl font-semibold text-white tracking-tight">
              Lemon Protocol
            </span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8 text-sm text-[#A3A3A3]">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-[#525252]">
            © 2025 Lemon Protocol
          </p>
        </div>
      </div>
    </footer>
  );
}
