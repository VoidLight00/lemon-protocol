'use client';

import { useState } from 'react';
import { LemonCharacter } from '../characters/lemon-character';
import { HeroIntro } from '../animations/splash-intro';

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FEFCE8] via-[#FEF9C3] to-[#FEF08A]">
        {/* Decorative circles */}
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#FDE047]/30 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#FEF08A]/50 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur border border-[#FDE047]">
              <span className="text-lg">🍋</span>
              <span className="text-sm font-semibold text-[#713F12]">
                관계 커뮤니케이션 AI
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-[#713F12] leading-tight">
                시고 두렵지만,
                <br />
                <span className="text-[#EAB308]">꼭 필요한</span> 솔루션
              </h1>
              <p className="text-xl text-[#854D0E] max-w-lg">
                레몬처럼 처음엔 시지만, 결국 건강에 좋듯이.
                <br />
                불편한 대화도 결국 더 건강한 관계를 만듭니다.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-[#FACC15] to-[#EAB308] text-[#713F12] font-bold rounded-2xl shadow-lg shadow-yellow-400/30 hover:shadow-xl hover:shadow-yellow-400/40 transform hover:-translate-y-1 transition-all">
                시작하기
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur text-[#713F12] font-semibold rounded-2xl border-2 border-[#FDE047] hover:bg-white transition-all">
                더 알아보기
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-[#713F12]">10K+</p>
                <p className="text-sm text-[#854D0E]">상담 완료</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#713F12]">95%</p>
                <p className="text-sm text-[#854D0E]">만족도</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#713F12]">24/7</p>
                <p className="text-sm text-[#854D0E]">항상 대기</p>
              </div>
            </div>
          </div>

          {/* Right: Character */}
          <div className="flex justify-center lg:justify-end animate-fade-in delay-300">
            <HeroIntro />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-[#713F12]/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-[#713F12]/50 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export function ConceptSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-[#713F12] mb-4">
            왜 <span className="text-[#EAB308]">레몬</span>일까요?
          </h2>
          <p className="text-lg text-[#854D0E] max-w-2xl mx-auto">
            건강한 관계를 위해 꼭 거쳐야 하는 불편한 순간들이 있습니다
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="group bg-gradient-to-br from-[#FEFCE8] to-white p-8 rounded-3xl border border-[#FDE047]/50 hover:shadow-xl transition-all animate-slide-up">
            <div className="mb-6 flex justify-center">
              <LemonCharacter expression="sour" size="lg" />
            </div>
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-[#FEF08A] rounded-full text-sm font-semibold text-[#713F12] mb-3">
                Step 1
              </div>
              <h3 className="text-xl font-bold text-[#713F12] mb-2">
                으... 시다! 😖
              </h3>
              <p className="text-[#854D0E]">
                불편한 감정, 어려운 대화를 마주하는 것은 처음엔 정말 힘들어요
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group bg-gradient-to-br from-[#FEFCE8] to-white p-8 rounded-3xl border border-[#FDE047]/50 hover:shadow-xl transition-all animate-slide-up delay-100">
            <div className="mb-6 flex justify-center">
              <LemonCharacter expression="determined" size="lg" />
            </div>
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-[#FEF08A] rounded-full text-sm font-semibold text-[#713F12] mb-3">
                Step 2
              </div>
              <h3 className="text-xl font-bold text-[#713F12] mb-2">
                그래도 먹어야 해 💪
              </h3>
              <p className="text-[#854D0E]">
                레몬 프로토콜과 함께 용기를 내어 대화를 시작해보세요
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group bg-gradient-to-br from-[#FEFCE8] to-white p-8 rounded-3xl border border-[#FDE047]/50 hover:shadow-xl transition-all animate-slide-up delay-200">
            <div className="mb-6 flex justify-center">
              <LemonCharacter expression="happy" size="lg" />
            </div>
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-[#22C55E]/20 rounded-full text-sm font-semibold text-[#16A34A] mb-3">
                Step 3
              </div>
              <h3 className="text-xl font-bold text-[#713F12] mb-2">
                더 건강해졌어! 🌟
              </h3>
              <p className="text-[#854D0E]">
                불편함을 이겨내면, 관계는 더욱 단단하고 건강해집니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    {
      emoji: '💬',
      title: 'AI 대화 코칭',
      description: '실시간으로 대화 전략을 제안받으세요',
      color: 'bg-[#FEF08A]',
    },
    {
      emoji: '📊',
      title: '관계 진단',
      description: '심리학 기반 테스트로 관계를 분석해요',
      color: 'bg-[#BBF7D0]',
    },
    {
      emoji: '📚',
      title: '관계 라이브러리',
      description: '전문가가 엄선한 관계 팁을 제공해요',
      color: 'bg-[#FECDD3]',
    },
    {
      emoji: '🎯',
      title: '맞춤형 프로토콜',
      description: '당신의 상황에 맞는 해결책을 제시해요',
      color: 'bg-[#E0E7FF]',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-[#FEFCE8]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#713F12] mb-4">
            레몬이 도와드릴게요
          </h2>
          <p className="text-lg text-[#854D0E]">
            건강한 관계를 위한 모든 도구가 준비되어 있어요
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-lg transition-all group cursor-pointer animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                {feature.emoji}
              </div>
              <h3 className="text-lg font-bold text-[#713F12] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-[#854D0E]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#FDE047] via-[#FACC15] to-[#EAB308]">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <LemonCharacter expression="love" size="xl" animate />
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-[#713F12] mb-6">
            더 건강한 관계를 위한
            <br />
            첫 걸음을 내딛어보세요
          </h2>

          <p className="text-xl text-[#854D0E] mb-10 max-w-2xl mx-auto">
            시작은 조금 시릴 수 있지만,
            <br />
            레몬이 끝까지 함께할게요 🍋
          </p>

          <button className="px-10 py-5 bg-white text-[#713F12] font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all">
            무료로 시작하기
          </button>
        </div>
      </div>
    </section>
  );
}
