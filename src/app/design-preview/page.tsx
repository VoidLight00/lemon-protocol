'use client';

import { useState } from 'react';
import { LemonCharacter } from '@/components/design-v2/characters/lemon-character';
import { SplashIntro } from '@/components/design-v2/animations/splash-intro';
import { LandingHero, ConceptSection, FeaturesSection, CTASection } from '@/components/design-v2/landing/landing-hero';
import '@/components/design-v2/design-v2.css';

type PreviewTab = 'characters' | 'landing' | 'splash' | 'components';

export default function DesignPreviewPage() {
  const [activeTab, setActiveTab] = useState<PreviewTab>('characters');
  const [showSplash, setShowSplash] = useState(false);

  const tabs: { id: PreviewTab; label: string }[] = [
    { id: 'characters', label: '캐릭터' },
    { id: 'landing', label: '랜딩 페이지' },
    { id: 'splash', label: '스플래시' },
    { id: 'components', label: '컴포넌트' },
  ];

  if (showSplash) {
    return <SplashIntro onComplete={() => setShowSplash(false)} duration={3500} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <div>
                <h1 className="font-bold text-gray-900">디자인 프리뷰</h1>
                <p className="text-xs text-gray-500">V2 새로운 디자인 시스템</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
              >
                ← 메인으로
              </a>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-400 text-yellow-900'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main>
        {activeTab === 'characters' && <CharactersPreview />}
        {activeTab === 'landing' && <LandingPreview />}
        {activeTab === 'splash' && <SplashPreview onShowSplash={() => setShowSplash(true)} />}
        {activeTab === 'components' && <ComponentsPreview />}
      </main>
    </div>
  );
}

function CharactersPreview() {
  const expressions = ['neutral', 'happy', 'sour', 'thinking', 'love', 'sad', 'determined'] as const;
  const sizes = ['sm', 'md', 'lg', 'xl'] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">표정 (Expressions)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {expressions.map((expression) => (
            <div key={expression} className="flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-sm">
              <LemonCharacter expression={expression} size="lg" />
              <span className="text-sm font-medium text-gray-600 capitalize">{expression}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">크기 (Sizes)</h2>
        <div className="flex items-end gap-6 p-6 bg-white rounded-2xl shadow-sm">
          {sizes.map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <LemonCharacter expression="happy" size={size} />
              <span className="text-sm font-medium text-gray-600">{size}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">애니메이션</h2>
        <div className="flex gap-6 p-6 bg-white rounded-2xl shadow-sm">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-float">
              <LemonCharacter expression="happy" size="lg" />
            </div>
            <span className="text-sm font-medium text-gray-600">Float</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="animate-bounce-slow">
              <LemonCharacter expression="love" size="lg" />
            </div>
            <span className="text-sm font-medium text-gray-600">Bounce</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="animate-pulse-glow">
              <LemonCharacter expression="determined" size="lg" />
            </div>
            <span className="text-sm font-medium text-gray-600">Glow</span>
          </div>
        </div>
      </section>
    </div>
  );
}

function LandingPreview() {
  return (
    <div className="bg-white">
      <LandingHero />
      <ConceptSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
}

function SplashPreview({ onShowSplash }: { onShowSplash: () => void }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">스플래시 화면</h2>
        <p className="text-gray-600 mb-8">
          앱 시작 시 표시되는 스플래시 인트로 애니메이션입니다.
          레몬 캐릭터가 등장하고 태그라인이 표시됩니다.
        </p>

        <button
          onClick={onShowSplash}
          className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all"
        >
          🍋 스플래시 보기
        </button>

        <div className="mt-12 p-6 bg-gray-100 rounded-2xl text-left">
          <h3 className="font-bold text-gray-900 mb-3">애니메이션 시퀀스</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li>1. 레몬 캐릭터 등장 (scale-in)</li>
            <li>2. 캐릭터 표정 변경 (neutral → happy)</li>
            <li>3. 로고 텍스트 & 태그라인 슬라이드 업</li>
            <li>4. 캐릭터 부드러운 바운스 애니메이션</li>
            <li>5. 줌 아웃하며 페이드 아웃</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

function ComponentsPreview() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* Colors */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">컬러 팔레트</h2>
        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
            <div
              key={shade}
              className="aspect-square rounded-lg flex items-end justify-center pb-2"
              style={{ backgroundColor: `var(--lemon-${shade})` }}
            >
              <span className={`text-xs font-medium ${shade < 500 ? 'text-gray-800' : 'text-white'}`}>
                {shade}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">버튼</h2>
        <div className="flex flex-wrap gap-4 p-6 bg-white rounded-2xl shadow-sm">
          <button className="btn-v2 btn-v2-primary">
            Primary Button
          </button>
          <button className="btn-v2 btn-v2-secondary">
            Secondary Button
          </button>
          <button className="btn-v2 btn-v2-primary" disabled>
            Disabled
          </button>
        </div>
      </section>

      {/* Cards */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">카드</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-v2 p-6">
            <h3 className="font-bold text-gray-900 mb-2">기본 카드</h3>
            <p className="text-gray-600 text-sm">카드 컴포넌트의 기본 스타일입니다.</p>
          </div>
          <div className="card-v2 card-v2-lemon p-6">
            <h3 className="font-bold text-gray-900 mb-2">레몬 카드</h3>
            <p className="text-gray-600 text-sm">레몬 그라디언트가 적용된 카드입니다.</p>
          </div>
          <div className="glass p-6 rounded-3xl">
            <h3 className="font-bold text-gray-900 mb-2">글래스 카드</h3>
            <p className="text-gray-600 text-sm">블러 효과가 적용된 글래스 스타일입니다.</p>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">뱃지</h2>
        <div className="flex flex-wrap gap-3 p-6 bg-white rounded-2xl shadow-sm">
          <span className="badge-v2 badge-v2-lemon">🍋 Lemon</span>
          <span className="badge-v2 badge-v2-mint">🌿 Mint</span>
          <span className="badge-v2 badge-v2-coral">💗 Coral</span>
        </div>
      </section>

      {/* Input */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">입력 필드</h2>
        <div className="max-w-md p-6 bg-white rounded-2xl shadow-sm space-y-4">
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="input-v2 w-full"
          />
          <input
            type="email"
            placeholder="이메일을 입력하세요"
            className="input-v2 w-full"
          />
        </div>
      </section>

      {/* Animations */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">애니메이션 클래스</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-yellow-400 rounded-lg animate-float" />
            <span className="text-xs text-gray-600">.animate-float</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-yellow-400 rounded-lg animate-bounce-slow" />
            <span className="text-xs text-gray-600">.animate-bounce-slow</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-yellow-400 rounded-lg animate-pulse-glow" />
            <span className="text-xs text-gray-600">.animate-pulse-glow</span>
          </div>
          <div className="p-4 bg-white rounded-2xl shadow-sm text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-yellow-400 rounded-lg animate-squish" />
            <span className="text-xs text-gray-600">.animate-squish</span>
          </div>
        </div>
      </section>
    </div>
  );
}
