'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getSupabase } from '@/lib/supabase/client';

type Step = 'register' | 'verify';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // 유효성 검사
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = getSupabase();

      // 회원가입 - 이메일로 인증 코드 발송
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nickname: nickname || email.split('@')[0],
          },
        },
      });

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('이미 등록된 이메일입니다.');
        } else {
          setError(authError.message);
        }
        return;
      }

      if (data.user) {
        setSuccess('인증 코드가 이메일로 발송되었습니다. 이메일을 확인해주세요.');
        setStep('verify');
      }
    } catch {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (otpCode.length !== 6) {
      setError('6자리 인증 코드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const supabase = getSupabase();

      const { error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otpCode,
        type: 'signup',
      });

      if (verifyError) {
        setError('인증 코드가 올바르지 않습니다. 다시 확인해주세요.');
        return;
      }

      setSuccess('회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch {
      setError('인증 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setError('');
    setIsLoading(true);

    try {
      const supabase = getSupabase();

      const { error: resendError } = await supabase.auth.resend({
        type: 'signup',
        email,
      });

      if (resendError) {
        setError('코드 재발송에 실패했습니다. 잠시 후 다시 시도해주세요.');
        return;
      }

      setSuccess('인증 코드가 다시 발송되었습니다.');
    } catch {
      setError('코드 재발송 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="container max-w-md py-16 px-4">
        <Card>
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">✉️</div>
            <CardTitle>이메일 인증</CardTitle>
            <CardDescription>
              {email}로 발송된 6자리 인증 코드를 입력해주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="otpCode" className="text-sm font-medium">
                  인증 코드
                </label>
                <Input
                  id="otpCode"
                  type="text"
                  placeholder="6자리 코드 입력"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  required
                  disabled={isLoading}
                  className="text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center">{error}</p>
              )}

              {success && (
                <p className="text-sm text-green-500 text-center">{success}</p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? '인증 중...' : '인증 완료'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleResendCode}
                disabled={isLoading}
              >
                인증 코드 다시 받기
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => setStep('register')}
                className="text-sm text-muted-foreground hover:underline"
              >
                ← 이전 단계로 돌아가기
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-md py-16 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="text-4xl mb-2">🍋</div>
          <CardTitle>회원가입</CardTitle>
          <CardDescription>
            레몬 프로토콜과 함께 관계를 성장시켜보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="nickname" className="text-sm font-medium">
                닉네임 <span className="text-muted-foreground">(선택)</span>
              </label>
              <Input
                id="nickname"
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                placeholder="최소 6자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                비밀번호 확인
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {success && (
              <p className="text-sm text-green-500 text-center">{success}</p>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '처리 중...' : '인증 코드 받기'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-primary hover:underline">
              로그인
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              ← 메인으로 돌아가기
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
