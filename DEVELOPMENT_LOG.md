# 레몬 프로토콜 개발 로그

## 프로젝트 개요
**레몬 프로토콜**은 관계 소통을 위한 AI 플랫폼으로, 애착 유형 테스트와 AI 기반 관계 상담을 제공합니다.

---

## 개발 히스토리 (2026-01-15)

### 1. Supabase 프로젝트 설정
- **프로젝트 생성**: `wjqgmvglohcflwggwuug`
- **리전**: Northeast Asia (Seoul)
- **데이터베이스 설정 완료**

### 2. 데이터베이스 스키마 구축

#### 테이블 구조:

**profiles 테이블**
```sql
- id: UUID (auth.users 참조)
- email: TEXT
- nickname: TEXT
- avatar_url: TEXT
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

**test_results 테이블**
```sql
- id: UUID
- user_id: UUID (profiles 참조)
- test_type: TEXT ('ecr-r', 'love-language', 'conflict-style')
- answers: JSONB
- dimension_scores: JSONB
- result_summary: TEXT
- created_at: TIMESTAMP
```

**daily_checkins 테이블**
```sql
- id: UUID
- user_id: UUID (profiles 참조)
- mood_score: INTEGER (1-10)
- energy_level: INTEGER (1-10)
- relationship_satisfaction: INTEGER (1-10)
- notes: TEXT
- checkin_date: DATE
- created_at: TIMESTAMP
```

### 3. Row Level Security (RLS) 정책
- 사용자별 데이터 격리
- 본인 데이터만 조회/수정 가능
- Service role을 통한 관리자 접근 허용

### 4. 트리거 함수 구현

**문제 발생**: 회원가입 시 "Database error saving new user" 오류

**원인**: RLS 정책으로 인해 트리거가 profiles 테이블에 삽입 불가

**해결책**:
```sql
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, nickname)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER SET search_path = public;
```

### 5. 인증 시스템 구현

#### 초기 문제:
- 이메일 확인 없이 로그인 불가 ("Email not confirmed")

#### 사용자 요청:
- 6자리 OTP 이메일 인증 방식으로 변경

#### 구현 내용:

**회원가입 플로우** (`src/app/auth/register/page.tsx`)
1. 이메일, 비밀번호, 닉네임 입력
2. "인증 코드 받기" 클릭
3. 이메일로 6자리 OTP 코드 발송
4. OTP 코드 입력 및 인증
5. 회원가입 완료 → 로그인 페이지로 이동

**로그인 플로우** (`src/app/auth/login/page.tsx`)
- 이메일/비밀번호 로그인
- 로그인 성공 시 대시보드로 리다이렉트

### 6. 이메일 서비스 설정

#### 문제:
- Supabase 기본 이메일 서비스의 제한
- "Email address is invalid" 오류 발생

#### 해결: Resend SMTP 설정
```
smtp_host: smtp.resend.com
smtp_port: 465
smtp_user: resend
smtp_pass: [Resend API Key]
smtp_admin_email: onboarding@resend.dev
smtp_sender_name: Lemon Protocol
```

#### 이메일 템플릿 (한국어)
```html
<h2>🍋 레몬 프로토콜 이메일 인증</h2>
<p>아래 인증 코드를 입력해주세요:</p>
<h1 style="font-size: 32px; letter-spacing: 8px; text-align: center;
    background: #fef3c7; padding: 20px; border-radius: 8px;">
  {{ .Token }}
</h1>
<p>이 코드는 1시간 동안 유효합니다.</p>
```

### 7. Supabase Auth 설정

```json
{
  "mailer_autoconfirm": false,
  "mailer_otp_length": 6,
  "mailer_otp_exp": 3600,
  "site_url": "https://lemon-protocol-i0c9uybkt-voidlight.vercel.app",
  "uri_allow_list": "https://lemon-protocol-i0c9uybkt-voidlight.vercel.app/**,https://*.vercel.app/**"
}
```

### 8. 프론트엔드 구현

#### 인증 페이지
- `/auth/register` - 회원가입 (OTP 인증 포함)
- `/auth/login` - 로그인

#### 대시보드
- `/dashboard` - 메인 대시보드
- 애착 유형 차트 (ECR-R 결과 시각화)
- 테스트 결과 히스토리
- 일일 체크인 기능

#### 컴포넌트
- `AttachmentChart` - 애착 유형 산점도 차트 (Recharts)
- `Header` - 네비게이션 헤더
- Supabase 클라이언트 유틸리티

### 9. 상태 관리

**Zustand 스토어**
- `auth-store.ts` - 인증 상태 관리
- `test-results-store.ts` - 테스트 결과 관리

### 10. 배포

**Vercel 배포**
- URL: https://lemon-protocol-i0c9uybkt-voidlight.vercel.app
- 자동 배포 설정 완료

---

## 해결된 이슈

| 이슈 | 원인 | 해결책 |
|------|------|--------|
| Database error saving new user | RLS 정책이 트리거 차단 | SECURITY DEFINER + 예외 처리 |
| Email not confirmed | 이메일 확인 필수 설정 | OTP 인증 방식 구현 |
| Error sending confirmation email | SMTP 미설정 | Resend SMTP 연동 |
| Email address is invalid | Supabase 이메일 서비스 제한 | 커스텀 SMTP 설정 |
| 로그인 실패 | 이메일 오타 (icthyeon vs icyhyeon) | 올바른 이메일로 로그인 |

---

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **State Management**: Zustand
- **Email**: Resend SMTP
- **Deployment**: Vercel

---

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=https://wjqgmvglohcflwggwuug.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[ANON_KEY]
OPENAI_API_KEY=[OPENAI_KEY]
```

---

## 다음 단계

1. [ ] AI 채팅 기능 구현 (OpenAI API 연동)
2. [ ] ECR-R 테스트 페이지 완성
3. [ ] 테스트 결과 상세 분석 페이지
4. [ ] 일일 체크인 기능 강화
5. [ ] 파트너 연결 기능
6. [ ] 푸시 알림 설정

---

## 참고 링크

- [Supabase Dashboard](https://supabase.com/dashboard/project/wjqgmvglohcflwggwuug)
- [Vercel Deployment](https://lemon-protocol-i0c9uybkt-voidlight.vercel.app)
- [Resend Dashboard](https://resend.com)

---

*마지막 업데이트: 2026-01-15*
