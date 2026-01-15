'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  diagnosticTests,
  getResultByScore,
  getResultByCategory,
  getAttachmentResult,
  getGottmanResult,
  type DiagnosticTest,
  type DiagnosticResult,
  type AttachmentResult,
  type GottmanResult,
} from '@/lib/diagnostics';
import { getSupabase } from '@/lib/supabase/client';
import { useTestResultsStore } from '@/stores/test-results-store';
import type { TestResult as DBTestResult } from '@/types/database';

type TestResult = DiagnosticResult | AttachmentResult | GottmanResult;

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; value: number; category?: string }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { addLocalResult } = useTestResultsStore();

  // 유저 확인
  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };
    checkUser();
  }, []);

  const handleStartTest = (test: DiagnosticTest) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setIsSaved(false);
  };

  const handleAnswer = (value: number) => {
    if (!selectedTest) return;

    const question = selectedTest.questions[currentQuestion];

    // 기존 답변이 있으면 업데이트, 없으면 추가
    const existingIndex = answers.findIndex(a => a.questionId === question.id);
    let newAnswers;

    if (existingIndex >= 0) {
      newAnswers = [...answers];
      newAnswers[existingIndex] = { questionId: question.id, value, category: question.category };
    } else {
      newAnswers = [
        ...answers,
        { questionId: question.id, value, category: question.category },
      ];
    }
    setAnswers(newAnswers);

    if (currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료 - 결과 계산
      calculateResult(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNext = () => {
    if (!selectedTest) return;

    // 현재 질문에 답변이 있는 경우에만 다음으로 이동
    const question = selectedTest.questions[currentQuestion];
    const hasAnswer = answers.some(a => a.questionId === question.id);

    if (hasAnswer && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (hasAnswer && currentQuestion === selectedTest.questions.length - 1) {
      // 마지막 질문이면 결과 계산
      calculateResult(answers);
    }
  };

  // 현재 질문의 선택된 답변 가져오기
  const getCurrentAnswer = () => {
    if (!selectedTest) return null;
    const question = selectedTest.questions[currentQuestion];
    return answers.find(a => a.questionId === question.id)?.value ?? null;
  };

  const calculateResult = (allAnswers: { questionId: string; value: number; category?: string }[]) => {
    if (!selectedTest) return;

    let calculatedResult: TestResult | null = null;

    switch (selectedTest.scoringType) {
      case 'sum': {
        // 단순 합산 (RAS)
        const total = allAnswers.reduce((sum, a) => sum + a.value, 0);
        calculatedResult = getResultByScore(selectedTest.id, total);
        break;
      }

      case 'category': {
        // 카테고리별 합산 (사랑의 언어, 갈등 스타일)
        const categoryScores: Record<string, number> = {};
        allAnswers.forEach((a) => {
          if (a.category) {
            categoryScores[a.category] = (categoryScores[a.category] || 0) + a.value;
          }
        });

        // Gottman은 특별 처리
        if (selectedTest.id === 'gottman-health') {
          calculatedResult = getGottmanResult(categoryScores);
        } else {
          calculatedResult = getResultByCategory(selectedTest.id, categoryScores);
        }
        break;
      }

      case 'dimension': {
        // 2차원 분석 (ECR-R 애착)
        const anxietyScore = allAnswers
          .filter((a) => a.category === 'anxiety')
          .reduce((sum, a) => sum + a.value, 0);
        const avoidanceScore = allAnswers
          .filter((a) => a.category === 'avoidance')
          .reduce((sum, a) => sum + a.value, 0);
        calculatedResult = getAttachmentResult(anxietyScore, avoidanceScore);
        break;
      }
    }

    setResult(calculatedResult);
    setShowResult(true);
  };

  // 결과 저장 함수
  const saveResult = async () => {
    if (!selectedTest || !result || isSaved) return;

    setIsSaving(true);

    // DB에 저장할 데이터 구성
    const dbResult: Omit<DBTestResult, 'id' | 'created_at' | 'user_id'> = {
      test_id: selectedTest.id,
      test_title: selectedTest.title,
      result_type: result.type || '',
      result_title: result.title,
      result_emoji: result.emoji,
      tips: result.tips,
    };

    // 점수 정보 추가
    if ('totalScore' in result) {
      dbResult.total_score = result.totalScore;
    }
    if ('scores' in result) {
      dbResult.category_scores = result.scores;
    }
    if ('anxietyScore' in result && 'avoidanceScore' in result) {
      dbResult.dimension_scores = {
        anxiety: result.anxietyScore,
        avoidance: result.avoidanceScore,
      };
    }

    try {
      if (userId) {
        // 로그인 사용자: Supabase에 저장
        const supabase = getSupabase();
        const { error } = await supabase
          .from('test_results')
          .insert({
            ...dbResult,
            user_id: userId,
          });

        if (error) {
          console.error('Save error:', error);
          // 실패시 로컬에 저장
          addLocalResult(dbResult);
        }
      } else {
        // 비로그인 사용자: 로컬 스토어에 저장
        addLocalResult(dbResult);
      }

      setIsSaved(true);
    } catch (err) {
      console.error('Save error:', err);
      // 실패시 로컬에 저장
      addLocalResult(dbResult);
      setIsSaved(true);
    } finally {
      setIsSaving(false);
    }
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setIsSaved(false);
  };

  // Test Selection
  if (!selectedTest) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-2">관계 진단 테스트</h1>
            <p className="text-muted-foreground">
              심리학 연구에서 검증된 테스트로 나와 상대방의 관계 패턴을 이해해보세요.
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              📊 내 결과
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {diagnosticTests.map((test) => (
            <Card
              key={test.id}
              className="cursor-pointer hover:border-primary transition-colors"
              onClick={() => handleStartTest(test)}
            >
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{test.emoji}</span>
                  <Badge variant="secondary">{test.questions.length}문항</Badge>
                </div>
                <CardTitle className="text-lg">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
                {test.source && (
                  <p className="text-xs text-muted-foreground mt-2">
                    출처: {test.source}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <Button className="w-full">테스트 시작</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">테스트 활용 팁</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 솔직하게 답변할수록 정확한 결과를 얻을 수 있어요</p>
            <p>• 결과는 참고용이며, 전문적인 진단을 대체하지 않습니다</p>
            <p>• 파트너와 함께 테스트하면 서로를 더 잘 이해할 수 있어요</p>
            <p>• 결과를 챗봇에 공유하면 맞춤형 조언을 받을 수 있습니다</p>
            <p>• {userId ? '✓ 로그인됨 - 결과가 자동 저장됩니다' : '로그인하면 결과가 저장됩니다'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show Result
  if (showResult && result) {
    return (
      <div className="container max-w-2xl py-8 px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{result.emoji}</span>
            </div>
            <CardTitle>{selectedTest.title} 결과</CardTitle>
            <CardDescription>
              {selectedTest.source && `(${selectedTest.source})`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 주요 결과 */}
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{result.emoji}</span>
                <h3 className="font-semibold text-lg">{result.title}</h3>
              </div>
              <p className="text-muted-foreground">{result.description}</p>
            </div>

            {/* ECR-R 애착 유형 추가 정보 */}
            {'anxietyScore' in result && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-medium">상세 분석</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">불안 차원</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(result.anxietyScore / 126) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium">{result.anxietyScore}/126</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.anxietyLevel === 'high' ? '높음 - 버림받을까 걱정' : '낮음 - 안정적'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">회피 차원</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-background rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${(result.avoidanceScore / 126) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium">{result.avoidanceScore}/126</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {result.avoidanceLevel === 'high' ? '높음 - 친밀감 불편' : '낮음 - 친밀감 편안'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Gottman 4가지 독소 분석 */}
            {'scores' in result && 'mainIssue' in result && (
              <div className="p-4 bg-muted rounded-lg space-y-3">
                <h4 className="font-medium">4가지 독소 분석</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>비난 (Criticism)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-red-400 h-2 rounded-full"
                          style={{ width: `${(result.scores.criticism / 25) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.criticism}/25</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>경멸 (Contempt)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(result.scores.contempt / 25) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.contempt}/25</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>방어 (Defensiveness)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-orange-400 h-2 rounded-full"
                          style={{ width: `${(result.scores.defensiveness / 25) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.defensiveness}/25</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>담쌓기 (Stonewalling)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-gray-500 h-2 rounded-full"
                          style={{ width: `${(result.scores.stonewalling / 25) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.stonewalling}/25</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  주요 개선 영역: <strong>{result.mainIssue}</strong> | 총점: {result.totalScore}/100
                </p>
              </div>
            )}

            {/* 추천 행동 */}
            <div>
              <h4 className="font-medium mb-2">추천 행동</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {result.tips.map((tip, i) => (
                  <li key={i}>• {tip}</li>
                ))}
              </ul>
            </div>

            {/* 결과 저장 버튼 */}
            <Button
              onClick={saveResult}
              disabled={isSaving || isSaved}
              className="w-full"
              variant={isSaved ? 'outline' : 'default'}
            >
              {isSaving ? '저장 중...' : isSaved ? '✓ 저장됨' : '💾 결과 저장하기'}
            </Button>

            {/* 버튼들 */}
            <div className="flex gap-2">
              <Button onClick={resetTest} variant="outline" className="flex-1">
                다른 테스트
              </Button>
              <Button onClick={() => handleStartTest(selectedTest)} variant="outline" className="flex-1">
                다시 하기
              </Button>
              <Link href="/dashboard" className="flex-1">
                <Button variant="outline" className="w-full">
                  📊 내 결과
                </Button>
              </Link>
            </div>

            {/* 챗봇 연동 안내 */}
            <div className="p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">챗봇에게 물어보기</p>
              <p className="text-muted-foreground">
                &quot;{selectedTest.title} 결과가 {result.title}이 나왔어. 어떻게 해야 할까?&quot;
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Question View
  const question = selectedTest.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedTest.questions.length) * 100;

  return (
    <div className="container max-w-2xl py-8 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">
              {currentQuestion + 1} / {selectedTest.questions.length}
            </Badge>
            <Button variant="ghost" size="sm" onClick={resetTest}>
              취소
            </Button>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-4">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <CardTitle className="text-lg">{selectedTest.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-lg font-medium">{question.text}</p>

          <div className="space-y-2">
            {question.options.map((option, i) => {
              const isSelected = getCurrentAnswer() === option.value;
              return (
                <Button
                  key={i}
                  variant={isSelected ? "default" : "outline"}
                  className={`w-full justify-start text-left h-auto py-3 px-4 ${isSelected ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => handleAnswer(option.value)}
                >
                  {isSelected && <span className="mr-2">✓</span>}
                  {option.text}
                </Button>
              );
            })}
          </div>

          {/* 이전/다음 네비게이션 버튼 */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2"
            >
              <span>←</span>
              <span>이전</span>
            </Button>

            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} / {selectedTest.questions.length}
            </span>

            <Button
              variant="outline"
              onClick={handleNext}
              disabled={getCurrentAnswer() === null}
              className="flex items-center gap-2"
            >
              <span>{currentQuestion === selectedTest.questions.length - 1 ? '완료' : '다음'}</span>
              <span>→</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
