'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { diagnosticTests, getResultDescription, type DiagnosticTest } from '@/lib/diagnostics';

export default function TestPage() {
  const [selectedTest, setSelectedTest] = useState<DiagnosticTest | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleStartTest = (test: DiagnosticTest) => {
    setSelectedTest(test);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (selectedTest && currentQuestion < selectedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateResult = () => {
    if (!selectedTest) return null;
    const total = answers.reduce((sum, val) => sum + val, 0);
    return getResultDescription(selectedTest.id, total);
  };

  const resetTest = () => {
    setSelectedTest(null);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  // Test Selection
  if (!selectedTest) {
    return (
      <div className="container max-w-4xl py-8 px-4">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">관계 진단 테스트</h1>
          <p className="text-muted-foreground">
            나와 상대방의 관계 패턴을 이해하는 첫 걸음입니다.
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
              </CardHeader>
              <CardContent>
                <Button className="w-full">테스트 시작</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">💡 테스트 활용 팁</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>• 솔직하게 답변할수록 정확한 결과를 얻을 수 있어요</p>
            <p>• 결과는 참고용이며, 전문적인 진단을 대체하지 않습니다</p>
            <p>• 파트너와 함께 테스트하면 서로를 더 잘 이해할 수 있어요</p>
            <p>• 결과를 챗봇에 공유하면 맞춤형 조언을 받을 수 있습니다</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show Result
  if (showResult) {
    const result = calculateResult();
    const total = answers.reduce((sum, val) => sum + val, 0);

    return (
      <div className="container max-w-2xl py-8 px-4">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{selectedTest.emoji}</span>
            </div>
            <CardTitle>{selectedTest.title} 결과</CardTitle>
            <CardDescription>
              총점: {total}점 / {selectedTest.questions.length * 4}점
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {result && (
              <>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{result.emoji}</span>
                    <h3 className="font-semibold text-lg">{result.type}</h3>
                  </div>
                  <p className="text-muted-foreground">{result.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">🎯 추천 행동</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {result.tips.map((tip, i) => (
                      <li key={i}>• {tip}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={resetTest} variant="outline" className="flex-1">
                다른 테스트
              </Button>
              <Button onClick={() => handleStartTest(selectedTest)} className="flex-1">
                다시 하기
              </Button>
            </div>

            <div className="p-4 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-1">💬 챗봇에게 물어보기</p>
              <p className="text-muted-foreground">
                &quot;{selectedTest.title} 결과가 {result?.type}이 나왔어. 어떻게 해야 할까?&quot;
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
