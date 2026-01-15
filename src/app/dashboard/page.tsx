'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getSupabase } from '@/lib/supabase/client';
import { useTestResultsStore } from '@/stores/test-results-store';
import type { TestResult, UserProfile } from '@/types/database';
import { ResultsChart } from '@/components/dashboard/results-chart';
import { AttachmentChart } from '@/components/dashboard/attachment-chart';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { localResults, serverResults, setServerResults, setLoading } = useTestResultsStore();

  useEffect(() => {
    const loadUserData = async () => {
      const supabase = getSupabase();

      // 유저 확인
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (!authUser) {
        // 비로그인 상태면 로컬 결과만 표시
        setIsLoading(false);
        return;
      }

      // 프로필 가져오기
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (profile) {
        setUser(profile);
      }

      // 테스트 결과 가져오기
      setLoading(true);
      const { data: results, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

      if (!error && results) {
        setServerResults(results);
      }
      setLoading(false);
      setIsLoading(false);
    };

    loadUserData();
  }, [setServerResults, setLoading]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  // 표시할 결과 (서버 결과 우선, 없으면 로컬)
  const results: TestResult[] = serverResults.length > 0 ? serverResults : localResults;

  // 테스트별 최신 결과 그룹핑
  const latestByTest = results.reduce((acc, result) => {
    if (!acc[result.test_id]) {
      acc[result.test_id] = result;
    }
    return acc;
  }, {} as Record<string, TestResult>);

  const latestResults = Object.values(latestByTest);

  if (isLoading) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-8 px-4">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            {user ? `${user.nickname || '사용자'}님의 대시보드` : '내 대시보드'}
          </h1>
          <p className="text-muted-foreground">
            {user ? user.email : '로그인하면 결과가 저장됩니다'}
          </p>
        </div>
        <div className="flex gap-2">
          {user ? (
            <Button variant="outline" onClick={handleLogout}>
              로그아웃
            </Button>
          ) : (
            <Link href="/auth/login">
              <Button>로그인</Button>
            </Link>
          )}
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">개요</TabsTrigger>
          <TabsTrigger value="history">히스토리</TabsTrigger>
          <TabsTrigger value="analysis">분석</TabsTrigger>
        </TabsList>

        {/* 개요 탭 */}
        <TabsContent value="overview" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-4xl mb-4">📊</p>
                <p className="text-muted-foreground mb-4">
                  아직 테스트 결과가 없습니다
                </p>
                <Link href="/test">
                  <Button>테스트 시작하기</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* 최신 결과 요약 */}
              <div className="grid gap-4 md:grid-cols-2">
                {latestResults.map((result) => (
                  <Card key={result.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{result.test_title}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(result.created_at), 'MM.dd', { locale: ko })}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{result.result_emoji}</span>
                        <div>
                          <p className="font-medium">{result.result_title}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.result_type}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* 빠른 액션 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">빠른 액션</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Link href="/test">
                    <Button variant="outline" size="sm">
                      🧪 새 테스트
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="sm">
                      💬 AI 상담
                    </Button>
                  </Link>
                  <Link href="/library">
                    <Button variant="outline" size="sm">
                      📚 콘텐츠
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        {/* 히스토리 탭 */}
        <TabsContent value="history" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">테스트 기록이 없습니다</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{result.result_emoji}</span>
                        <div>
                          <p className="font-medium">{result.test_title}</p>
                          <p className="text-sm text-muted-foreground">
                            {result.result_title}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(result.created_at), 'yyyy.MM.dd HH:mm', { locale: ko })}
                        </p>
                        {result.total_score !== undefined && (
                          <Badge variant="outline">점수: {result.total_score}</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* 분석 탭 */}
        <TabsContent value="analysis" className="space-y-4">
          {results.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center">
                <p className="text-muted-foreground">분석할 데이터가 없습니다</p>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* 테스트별 점수 추이 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">테스트 결과 분포</CardTitle>
                  <CardDescription>각 테스트별 결과 유형</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResultsChart results={results} />
                </CardContent>
              </Card>

              {/* 애착 유형 분석 (ECR-R 결과가 있는 경우) */}
              {results.some(r => r.test_id === 'attachment-ecr' && r.dimension_scores) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">애착 유형 분석</CardTitle>
                    <CardDescription>불안 vs 회피 차원</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AttachmentChart
                      results={results.filter(
                        r => r.test_id === 'attachment-ecr' && r.dimension_scores
                      )}
                    />
                  </CardContent>
                </Card>
              )}

              {/* 카테고리별 분석 */}
              {results.some(r => r.category_scores) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">카테고리별 점수</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {results
                      .filter(r => r.category_scores)
                      .slice(0, 3)
                      .map(result => (
                        <div key={result.id}>
                          <p className="text-sm font-medium mb-2">{result.test_title}</p>
                          <div className="space-y-2">
                            {Object.entries(result.category_scores || {}).map(([cat, score]) => (
                              <div key={cat} className="flex items-center gap-2">
                                <span className="text-xs w-24 truncate">{cat}</span>
                                <div className="flex-1 bg-muted rounded-full h-2">
                                  <div
                                    className="bg-primary h-2 rounded-full"
                                    style={{ width: `${Math.min(score * 5, 100)}%` }}
                                  />
                                </div>
                                <span className="text-xs w-8">{score}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
