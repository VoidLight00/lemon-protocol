# 기술 아키텍처

> Lemon Protocol 시스템 아키텍처 문서

---

## 목차

- [시스템 개요](#시스템-개요)
- [기술 스택 상세](#기술-스택-상세)
- [시스템 아키텍처](#시스템-아키텍처)
- [AI 파이프라인](#ai-파이프라인)
- [데이터 모델](#데이터-모델)
- [보안 설계](#보안-설계)
- [확장성 고려](#확장성-고려)

---

## 시스템 개요

### 핵심 설계 원칙

1. **BYOK First**: 사용자 API 키 우선 설계
2. **Edge-Ready**: Edge Function 활용으로 빠른 응답
3. **Privacy by Design**: 최소 데이터 수집
4. **Modular**: 기능별 모듈화로 유지보수 용이

---

## 기술 스택 상세

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 14.x | 풀스택 프레임워크 (App Router) |
| React | 18.x | UI 라이브러리 |
| TypeScript | 5.x | 타입 안정성 |
| Tailwind CSS | 3.x | 스타일링 |
| shadcn/ui | latest | UI 컴포넌트 |
| Zustand | 4.x | 상태 관리 |
| Framer Motion | 10.x | 애니메이션 |
| React Hook Form | 7.x | 폼 관리 |
| Zod | 3.x | 스키마 검증 |

### Backend

| 기술 | 용도 |
|------|------|
| Next.js API Routes | REST API 엔드포인트 |
| Edge Functions | AI 스트리밍 응답 |
| Supabase | 데이터베이스 + 인증 |

### AI Integration

| 서비스 | 용도 | 우선순위 |
|--------|------|----------|
| OpenAI GPT-4 | 메인 분석 엔진 | Primary |
| OpenAI GPT-4o-mini | 경량 분석 | Secondary |
| Google Gemini Pro | 대체 엔진 | Fallback |
| Google Gemini Flash | 빠른 응답 | Fallback |

### Infrastructure

| 서비스 | 용도 |
|--------|------|
| Vercel | 호스팅 + CI/CD |
| Supabase | PostgreSQL + Auth + Storage |
| Upstash | Rate Limiting (Redis) |

---

## 시스템 아키텍처

### 전체 구조

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Web App   │  │     PWA     │  │   Mobile    │          │
│  │  (Next.js)  │  │  (Future)   │  │  (Future)   │          │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘          │
└─────────┼────────────────┼────────────────┼─────────────────┘
          │                │                │
          ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway Layer                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Next.js API Routes / Edge                  │ │
│  │  • /api/chat          - AI 챗봇 엔드포인트              │ │
│  │  • /api/protocols     - 프로토콜 CRUD                   │ │
│  │  • /api/library       - 콘텐츠 라이브러리               │ │
│  │  • /api/auth          - 인증 (Supabase)                │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                      Service Layer                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  AI Service  │  │Protocol Svc  │  │ Content Svc  │       │
│  │              │  │              │  │              │       │
│  │ • 상황 분석  │  │ • 템플릿관리 │  │ • 라이브러리 │       │
│  │ • 프로토콜   │  │ • 커스터마이징│  │ • 검색       │       │
│  │   생성       │  │              │  │              │       │
│  └──────┬───────┘  └──────────────┘  └──────────────┘       │
└─────────┼───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│                    External Services                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   OpenAI     │  │   Gemini     │  │   Supabase   │       │
│  │   GPT-4      │  │    Pro       │  │   Database   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### 컴포넌트 구조

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 인증 관련 페이지
│   │   ├── login/
│   │   └── register/
│   ├── (main)/                   # 메인 페이지
│   │   ├── chat/                 # AI 챗봇
│   │   ├── library/              # 콘텐츠 라이브러리
│   │   └── settings/             # 설정 (API 키 등)
│   ├── api/                      # API Routes
│   │   ├── chat/
│   │   │   └── route.ts          # POST /api/chat
│   │   ├── protocols/
│   │   └── library/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/                       # shadcn/ui 컴포넌트
│   ├── chat/                     # 챗봇 관련
│   │   ├── ChatContainer.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── InputArea.tsx
│   │   └── AnalysisResult.tsx
│   ├── library/                  # 라이브러리 관련
│   │   ├── ProtocolCard.tsx
│   │   ├── TheoryCard.tsx
│   │   └── CaseCard.tsx
│   └── common/                   # 공통 컴포넌트
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── ai/                       # AI 관련
│   │   ├── openai.ts
│   │   ├── gemini.ts
│   │   ├── prompts.ts
│   │   └── analyzer.ts
│   ├── supabase/                 # Supabase 클라이언트
│   │   ├── client.ts
│   │   └── server.ts
│   └── utils/                    # 유틸리티
│       ├── cn.ts
│       └── validators.ts
│
├── hooks/
│   ├── useChat.ts
│   ├── useApiKey.ts
│   └── useProtocols.ts
│
├── stores/
│   ├── chatStore.ts
│   ├── settingsStore.ts
│   └── userStore.ts
│
└── types/
    ├── chat.ts
    ├── protocol.ts
    └── user.ts
```

---

## AI 파이프라인

### 분석 흐름

```
[사용자 입력]
"여자친구가 자꾸 읽씹해요. 바쁘다고 하는데 진짜인지 모르겠어요"
                    │
                    ▼
┌─────────────────────────────────────────┐
│           1. Input Parser               │
│  • 상황 키워드 추출                      │
│  • 감정 톤 분석                          │
│  • 관계 유형 파악                        │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         2. Theory Matcher               │
│  • 비딩(Bidding) 이론 매칭               │
│  • 정서적 노동 개념 연결                 │
│  • 관련 연구/이론 검색                   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│       3. Protocol Generator             │
│  • 맞춤형 프로토콜 생성                  │
│  • 단계별 실행 계획                      │
│  • 대화 스크립트 작성                    │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│        4. Response Formatter            │
│  • 마크다운 포맷팅                       │
│  • 시각적 다이어그램 생성                │
│  • 실행 체크리스트 생성                  │
└─────────────────────────────────────────┘
                    │
                    ▼
[구조화된 분석 결과]
```

### 프롬프트 체인

```typescript
// 분석 파이프라인 예시
const analysisPipeline = [
  {
    name: 'situation_parser',
    prompt: PROMPTS.SITUATION_PARSER,
    output: 'parsed_situation'
  },
  {
    name: 'theory_matcher',
    prompt: PROMPTS.THEORY_MATCHER,
    input: 'parsed_situation',
    output: 'matched_theories'
  },
  {
    name: 'protocol_generator',
    prompt: PROMPTS.PROTOCOL_GENERATOR,
    input: ['parsed_situation', 'matched_theories'],
    output: 'protocol'
  },
  {
    name: 'script_writer',
    prompt: PROMPTS.SCRIPT_WRITER,
    input: 'protocol',
    output: 'final_response'
  }
];
```

---

## 데이터 모델

### ERD (Entity Relationship Diagram)

```
┌─────────────────┐       ┌─────────────────┐
│     users       │       │   api_keys      │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────<│ user_id (FK)    │
│ email           │       │ provider        │
│ created_at      │       │ encrypted_key   │
│ settings        │       │ created_at      │
└─────────────────┘       └─────────────────┘
         │
         │
         ▼
┌─────────────────┐       ┌─────────────────┐
│ chat_sessions   │       │    messages     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │──────<│ session_id (FK) │
│ user_id (FK)    │       │ role            │
│ title           │       │ content         │
│ created_at      │       │ created_at      │
└─────────────────┘       └─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│   protocols     │       │    theories     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ name            │       │ name            │
│ description     │       │ description     │
│ template        │       │ content         │
│ category        │       │ references      │
└─────────────────┘       └─────────────────┘
```

### Supabase 스키마

```sql
-- Users (Supabase Auth에서 자동 관리)

-- API Keys 테이블
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('openai', 'gemini')),
  encrypted_key TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Sessions 테이블
CREATE TABLE chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages 테이블
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Protocols 테이블
CREATE TABLE protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  template JSONB NOT NULL,
  category TEXT,
  is_public BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own API keys" ON api_keys
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own sessions" ON chat_sessions
  FOR ALL USING (auth.uid() = user_id);
```

---

## 보안 설계

### API 키 보안

```
[BYOK 보안 흐름]

사용자 API 키 입력
        │
        ▼
┌───────────────────┐
│   클라이언트 측   │
│   AES-256 암호화  │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│    Supabase       │
│  암호화 저장      │
│  (encrypted_key)  │
└───────────────────┘
        │
        ▼ (API 호출 시)
┌───────────────────┐
│   Edge Function   │
│   복호화 → 사용   │
│   메모리에서만    │
└───────────────────┘
        │
        ▼
┌───────────────────┐
│   OpenAI/Gemini   │
│   API 호출        │
└───────────────────┘
```

### 보안 원칙

1. **API 키 서버 저장 금지**: Edge Function에서만 일시적 사용
2. **암호화 저장**: 사용자 선택 시 암호화하여 저장
3. **Rate Limiting**: Upstash Redis 활용
4. **Input Sanitization**: 모든 입력 검증

---

## 확장성 고려

### 수평 확장

- Vercel Edge Functions: 글로벌 자동 스케일링
- Supabase: 연결 풀링으로 DB 확장

### 캐싱 전략

```typescript
// 캐싱 레이어
const cacheStrategy = {
  // 정적 콘텐츠 (라이브러리)
  static: {
    storage: 'Vercel Edge Cache',
    ttl: '24h',
    revalidate: 'on-demand'
  },

  // 사용자 세션
  session: {
    storage: 'Upstash Redis',
    ttl: '1h'
  },

  // AI 응답 (유사 질문)
  ai_response: {
    storage: 'Upstash Redis',
    ttl: '7d',
    key: 'hash(normalized_query)'
  }
};
```

---

## 환경 변수

```env
# App
NEXT_PUBLIC_APP_URL=https://lemon-protocol.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# AI (선택적 - 폴백용)
OPENAI_API_KEY=
GOOGLE_AI_API_KEY=

# Security
ENCRYPTION_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

*문서 버전: 1.0*
*최종 수정: 2026-01-14*
