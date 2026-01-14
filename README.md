# Lemon Protocol - 관계 커뮤니케이션 AI 플랫폼

> **"상황을 설명하면, 전문적인 관계 솔루션을 제공합니다"**

---

## 프로젝트 개요

### 비전

일상적인 연애/관계 문제를 **심리학 이론 기반**으로 분석하고, **즉시 적용 가능한 프로토콜**을 제공하는 AI 플랫폼

### 핵심 가치

| 기존 연애 상담 | Lemon Protocol |
|---------------|----------------|
| "솔직하게 말해봐" | **구조화된 프로토콜** 제공 |
| 감정적/주관적 조언 | **심리학 이론 기반** 분석 |
| 일회성 답변 | **재사용 가능한 도구** |
| 모호한 해결책 | **구체적 스크립트/플로우** |

---

## 서비스 구성

### 1. AI 챗봇 (핵심 기능)

```
[사용자 흐름]

"여자친구가 자꾸 읽씹해요" (상황 입력)
              │
              ▼
┌─────────────────────────────────┐
│         AI 분석 엔진            │
│  • 상황 파싱                    │
│  • 심리학 이론 매칭             │
│  • 전문 용어 프레이밍           │
│  • 맞춤형 프로토콜 생성         │
└─────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────┐
│         분석 결과               │
│  • 문제 메커니즘 (비딩 실패)    │
│  • 원인 분석                    │
│  • 해결 프로토콜                │
│  • 실제 대화 스크립트 예시      │
└─────────────────────────────────┘
```

### 2. 콘텐츠 라이브러리

- **프로토콜 템플릿**: 레몬, 라임, 오렌지 등 상황별 커뮤니케이션 도구
- **이론 가이드**: Gottman 비딩 이론, 정서적 노동, 애착 이론 등
- **사례 아카이브**: 실제 적용 사례 및 스크립트 모음
- **자가 진단 도구**: 관계 건강도 체크

---

## 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Animation**: Framer Motion

### Backend
- **Runtime**: Next.js API Routes / Edge Functions
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth

### AI Integration
- **Primary**: OpenAI GPT-4 API
- **Secondary**: Google Gemini API
- **BYOK**: 사용자 자체 API 키 지원

### Deployment
- **Platform**: Vercel
- **CDN**: Vercel Edge Network

---

## 프로젝트 구조

```
350-레몬/
├── README.md                 # 프로젝트 개요 (현재 파일)
├── docs/                     # 개발 문서
│   ├── ARCHITECTURE.md       # 기술 아키텍처
│   ├── FEATURES.md           # 기능 명세서
│   ├── UI-UX.md              # UI/UX 설계
│   ├── ROADMAP.md            # 개발 로드맵
│   ├── API-SPEC.md           # API 명세
│   └── PROMPTS.md            # AI 프롬프트 설계
├── src/                      # 소스 코드
│   ├── app/                  # Next.js App Router
│   ├── components/           # React 컴포넌트
│   ├── lib/                  # 유틸리티/헬퍼
│   ├── hooks/                # Custom Hooks
│   └── styles/               # 스타일
├── prompts/                  # AI 프롬프트 템플릿
│   ├── analyzer.md           # 상황 분석 프롬프트
│   ├── protocol-generator.md # 프로토콜 생성 프롬프트
│   └── script-writer.md      # 대화 스크립트 프롬프트
├── content-library/          # 콘텐츠 라이브러리
│   ├── protocols/            # 프로토콜 템플릿
│   ├── theories/             # 이론 가이드
│   └── cases/                # 사례 아카이브
└── assets/                   # 이미지, 아이콘 등
```

---

## 핵심 기능

### MVP (Phase 1)
- [ ] AI 챗봇 기본 기능
- [ ] BYOK (Bring Your Own Key) API 키 입력
- [ ] 기본 프로토콜 라이브러리 (5개)
- [ ] 반응형 웹 UI

### Phase 2
- [ ] 사용자 계정 시스템
- [ ] 상담 히스토리 저장
- [ ] 프로토콜 커스터마이징
- [ ] 이론 가이드 라이브러리

### Phase 3
- [ ] 커뮤니티 기능
- [ ] 전문가 연결 (유료)
- [ ] 모바일 앱 (PWA)

---

## 수익 모델

### 기본 무료
- AI 챗봇 사용 (BYOK 방식)
- 기본 콘텐츠 라이브러리 접근

### 프리미엄 (선택적)
- 고급 프로토콜 템플릿
- 상담 히스토리 무제한 저장
- 전문가 1:1 연결

---

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 빌드
npm run build
```

---

## 문서 링크

- [기술 아키텍처](./docs/ARCHITECTURE.md)
- [기능 명세서](./docs/FEATURES.md)
- [UI/UX 설계](./docs/UI-UX.md)
- [개발 로드맵](./docs/ROADMAP.md)

---

## 라이선스

MIT License

---

*Created: 2026-01-14*
*Last Updated: 2026-01-14*
