'use client';

import { useState } from 'react';
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

type TestResult = DiagnosticResult | AttachmentResult | GottmanResult;

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: string; value: number; category?: string }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleStartTest = (test: DiagnosticTest) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  const handleAnswer = (value: number) => {
    if (!selectedTest) return;

    const question = selectedTest.questions[currentQuestion];
    const newAnswers = [
      ...answers,
      { questionId: question.id, value, category: question.category },
    ];
    setAnswers(newAnswers);

    if (currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 테스트 완료 - 결과 계산
      calculateResult(newAnswers);
    }
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

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
  };

  // Test Selection
  if (!selectedTest) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">관계 진단 테스트</h1>
          <p className="text-muted-foreground">
            심리학 연구에서 검증된 테스트로 나와 상대방의 관계 패턴을 이해해보세요.
          </p>
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
            <p>• 모든 테스트는 심리학 연구에서 검증된 척도를 기반으로 합니다</p>
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
                          style={{ width: `${(result.anxietyScore / 42) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium">{result.anxietyScore}/42</span>
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
                          style={{ width: `${(result.avoidanceScore / 42) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium">{result.avoidanceScore}/42</span>
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
                          style={{ width: `${(result.scores.criticism / 15) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.criticism}/15</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>경멸 (Contempt)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(result.scores.contempt / 15) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.contempt}/15</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>방어 (Defensiveness)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-orange-400 h-2 rounded-full"
                          style={{ width: `${(result.scores.defensiveness / 15) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.defensiveness}/15</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>담쌓기 (Stonewalling)</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-background rounded-full h-2">
                        <div
                          className="bg-gray-500 h-2 rounded-full"
                          style={{ width: `${(result.scores.stonewalling / 15) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right">{result.scores.stonewalling}/15</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  주요 개선 영역: <strong>{result.mainIssue}</strong> | 총점: {result.totalScore}/60
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

            {/* 버튼들 */}
            <div className="flex gap-2">
              <Button onClick={resetTest} variant="outline" className="flex-1">
                다른 테스트
              </Button>
              <Button onClick={() => handleStartTest(selectedTest)} className="flex-1">
                다시 하기
              </Button>
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
            {question.options.map((option, i) => (
              <Button
                key={i}
                variant="outline"
                className="w-full justify-start text-left h-auto py-3 px-4"
                onClick={() => handleAnswer(option.value)}
              >
                {option.text}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
