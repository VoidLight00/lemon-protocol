'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { LemonCharacter } from '../characters/lemon-character';
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
  IconClock,
  IconBridge,
  IconCheck,
  IconUsers,
  IconLemon,
} from '../icons/geometric-icons';

// ============================
// HERO SECTION
// ============================
export function HeroProfessional() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FEFCE8]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#FDE047]/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#FEF08A]/30 to-transparent blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-[#EAB308]/20">
              <IconLemon size="sm" color="#EAB308" />
              <span className="text-sm font-medium tracking-wide text-[#713F12]">
                Relationship AI
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-[#1E293B] leading-[1.1] tracking-tight">
                Sour, but
                <br />
                <span className="text-[#EAB308]">Essential.</span>
              </h1>
              <p className="text-xl lg:text-2xl text-[#475569] max-w-lg leading-relaxed font-light">
                Like lemons in your health regimen, some conversations
                are hard to swallow but vital for growth.
              </p>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1E293B] text-white font-semibold rounded-xl hover:bg-[#0F172A] transition-all">
                Start Free Trial
                <IconArrowRight size="sm" className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 text-[#1E293B] font-semibold rounded-xl border-2 border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white/50 transition-all">
                See How It Works
              </button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 border-t border-[#E2E8F0]/50">
              <div className="flex items-center gap-8">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FDE047] to-[#EAB308] border-2 border-white"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#1E293B]">10,000+</p>
                  <p className="text-sm text-[#64748B]">couples transformed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Character Animation */}
          <div className="hidden lg:flex justify-center items-center">
            <HeroCharacter />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-[#1E293B]/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-[#1E293B]/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function HeroCharacter() {
  const [expression, setExpression] = useState<'neutral' | 'sour' | 'determined' | 'happy'>('neutral');

  useEffect(() => {
    const expressions: ('neutral' | 'sour' | 'determined' | 'happy')[] = [
      'neutral', 'sour', 'determined', 'happy'
    ];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % expressions.length;
      setExpression(expressions[index]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 blur-3xl bg-gradient-to-br from-[#FDE047]/40 to-[#EAB308]/20 rounded-full scale-150" />

      {/* Character */}
      <div className="relative animate-float">
        <LemonCharacter expression={expression} size="xl" />
      </div>

      {/* Floating Labels */}
      <div className={cn(
        "absolute -top-4 -right-8 px-4 py-2 bg-white rounded-xl shadow-lg border border-[#E2E8F0] transition-all duration-500",
        expression === 'sour' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}>
        <span className="text-sm font-medium text-[#475569]">It's hard...</span>
      </div>

      <div className={cn(
        "absolute -bottom-4 -left-8 px-4 py-2 bg-white rounded-xl shadow-lg border border-[#E2E8F0] transition-all duration-500",
        expression === 'happy' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      )}>
        <span className="text-sm font-medium text-[#16A34A]">Worth it!</span>
      </div>
    </div>
  );
}

// ============================
// PHILOSOPHY SECTION
// ============================
export function PhilosophySection() {
  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Why <span className="text-[#EAB308]">Lemon</span>?
          </h2>
          <p className="text-xl text-[#64748B] leading-relaxed">
            The most meaningful conversations are often the hardest to have.
            Just like lemons—sour at first, but ultimately beneficial.
          </p>
        </div>

        {/* Journey Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Step 1 */}
          <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#FEFCE8] to-white border border-[#FDE047]/30 hover:shadow-xl hover:shadow-[#FDE047]/10 transition-all duration-300">
            <div className="absolute top-6 right-6">
              <span className="text-6xl font-bold text-[#FDE047]/30">01</span>
            </div>

            <div className="relative">
              <div className="mb-6">
                <LemonCharacter expression="sour" size="lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                The Initial Sting
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                Confronting difficult emotions and conversations feels overwhelming
                at first. That's natural.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#FEFCE8] to-white border border-[#FDE047]/30 hover:shadow-xl hover:shadow-[#FDE047]/10 transition-all duration-300">
            <div className="absolute top-6 right-6">
              <span className="text-6xl font-bold text-[#FDE047]/30">02</span>
            </div>

            <div className="relative">
              <div className="mb-6">
                <LemonCharacter expression="determined" size="lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                Building Courage
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                With the right guidance and framework, you'll find the strength
                to navigate tough conversations.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group relative p-8 rounded-2xl bg-gradient-to-b from-[#F0FDF4] to-white border border-[#22C55E]/30 hover:shadow-xl hover:shadow-[#22C55E]/10 transition-all duration-300">
            <div className="absolute top-6 right-6">
              <span className="text-6xl font-bold text-[#22C55E]/30">03</span>
            </div>

            <div className="relative">
              <div className="mb-6">
                <LemonCharacter expression="happy" size="lg" />
              </div>
              <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                Lasting Growth
              </h3>
              <p className="text-[#64748B] leading-relaxed">
                The result? Deeper understanding, stronger bonds, and a
                healthier relationship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================
// FEATURES SECTION
// ============================
export function FeaturesSection() {
  const features = [
    {
      icon: IconChat,
      title: 'AI Conversation Coach',
      description: 'Real-time guidance that helps you express yourself clearly and empathetically during difficult discussions.',
      color: '#EAB308',
      bgColor: '#FEF9C3',
    },
    {
      icon: IconAnalysis,
      title: 'Relationship Insights',
      description: 'Understand your communication patterns with detailed analytics based on proven psychological frameworks.',
      color: '#22C55E',
      bgColor: '#DCFCE7',
    },
    {
      icon: IconBook,
      title: 'Expert Library',
      description: 'Access curated resources from relationship experts, therapists, and communication specialists.',
      color: '#F43F5E',
      bgColor: '#FFE4E6',
    },
    {
      icon: IconTarget,
      title: 'Personalized Protocols',
      description: 'Custom strategies tailored to your specific relationship dynamics and communication style.',
      color: '#6366F1',
      bgColor: '#E0E7FF',
    },
  ];

  return (
    <section className="py-32 bg-[#F8FAFC]">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] mb-6">
            <IconSparkle size="sm" color="#EAB308" />
            <span className="text-sm font-medium text-[#64748B]">Core Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Tools for Healthier
            <br />Communication
          </h2>
          <p className="text-xl text-[#64748B] leading-relaxed">
            Everything you need to navigate relationship challenges with confidence and care.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative p-8 bg-white rounded-2xl border border-[#E2E8F0] hover:border-transparent hover:shadow-xl transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: feature.bgColor }}
                >
                  <Icon size="lg" color={feature.color} />
                </div>
                <h3 className="text-xl font-bold text-[#1E293B] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#64748B] leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-[#1E293B] group-hover:text-[#EAB308] transition-colors">
                    Learn more
                    <IconArrowRight size="sm" className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================
// SOCIAL PROOF SECTION
// ============================
export function SocialProofSection() {
  const stats = [
    { value: '10,000+', label: 'Conversations Guided', icon: IconChat },
    { value: '95%', label: 'Report Improvement', icon: IconHeart },
    { value: '24/7', label: 'Available Support', icon: IconClock },
    { value: '50+', label: 'Expert Protocols', icon: IconTarget },
  ];

  return (
    <section className="py-24 bg-[#1E293B]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#334155] mb-4">
                  <Icon size="md" color="#FDE047" />
                </div>
                <p className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-[#94A3B8]">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================
// TESTIMONIALS SECTION
// ============================
export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Lemon Protocol helped us finally have the conversation we'd been avoiding for years. It wasn't easy, but it saved our marriage.",
      author: "Sarah & Mike",
      role: "Together 12 years",
    },
    {
      quote: "The AI coaching gave me the confidence to express my needs clearly. My partner actually understood me for the first time.",
      author: "Jennifer",
      role: "Dating 2 years",
    },
    {
      quote: "We went from constant misunderstandings to genuinely hearing each other. The difference is night and day.",
      author: "David & Chris",
      role: "Engaged",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Real Stories,
            <br />Real Transformation
          </h2>
          <p className="text-xl text-[#64748B]">
            Hear from couples who took the leap with Lemon Protocol.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]"
            >
              <div className="mb-6">
                <IconHeart size="lg" color="#EAB308" />
              </div>
              <blockquote className="text-[#1E293B] text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-[#1E293B]">{testimonial.author}</p>
                <p className="text-sm text-[#64748B]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================
// CTA SECTION
// ============================
export function CTAProfessional() {
  return (
    <section className="py-32 bg-gradient-to-br from-[#FEFCE8] via-[#FEF9C3] to-[#FDE047]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Character */}
          <div className="mb-12 flex justify-center">
            <div className="animate-bounce-slow">
              <LemonCharacter expression="love" size="xl" />
            </div>
          </div>

          {/* Content */}
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[#1E293B] mb-6 tracking-tight">
            Ready to Build
            <br />Something Stronger?
          </h2>
          <p className="text-xl text-[#475569] mb-10 max-w-2xl mx-auto leading-relaxed">
            The first step is always the hardest. Let Lemon Protocol guide you
            toward more meaningful conversations and deeper connection.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#1E293B] text-white font-semibold text-lg rounded-xl hover:bg-[#0F172A] transition-all shadow-xl">
              Start Your Journey
              <IconArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/80 backdrop-blur text-[#1E293B] font-semibold text-lg rounded-xl hover:bg-white transition-all">
              Schedule a Demo
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-[#475569]">
            <span className="flex items-center gap-2">
              <IconCheck size="sm" color="#22C55E" />
              Free 14-day trial
            </span>
            <span className="flex items-center gap-2">
              <IconShield size="sm" color="#22C55E" />
              Privacy protected
            </span>
            <span className="flex items-center gap-2">
              <IconUsers size="sm" color="#22C55E" />
              Expert support
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================
// FOOTER
// ============================
export function FooterProfessional() {
  return (
    <footer className="py-16 bg-[#0F172A]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <IconLemon size="lg" color="#FDE047" />
            <span className="text-xl font-bold text-white">
              Lemon Protocol
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8 text-sm text-[#94A3B8]">
            <a href="#" className="hover:text-white transition-colors">About</a>
            <a href="#" className="hover:text-white transition-colors">Features</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-[#64748B]">
            2025 Lemon Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
