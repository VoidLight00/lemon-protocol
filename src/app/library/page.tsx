'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { protocols, theories } from '@/lib/protocols';

export default function LibraryPage() {
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [selectedTheory, setSelectedTheory] = useState<string | null>(null);

  return (
    <div className="container max-w-4xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">📚 라이브러리</h1>
          <p className="text-muted-foreground">
            프로토콜과 이론 가이드를 탐색하세요.
          </p>
        </div>

        <Tabs defaultValue="protocols">
          <TabsList>
            <TabsTrigger value="protocols">프로토콜</TabsTrigger>
            <TabsTrigger value="theories">이론 가이드</TabsTrigger>
          </TabsList>

          {/* Protocols Tab */}
          <TabsContent value="protocols" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {protocols.map((protocol) => (
                <Card
                  key={protocol.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedProtocol === protocol.id ? 'border-primary ring-1 ring-primary' : ''
                  }`}
                  onClick={() =>
                    setSelectedProtocol(
                      selectedProtocol === protocol.id ? null : protocol.id
                    )
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{protocol.emoji}</span>
                      <div>
                        <CardTitle className="text-lg">{protocol.name}</CardTitle>
                        <CardDescription>{protocol.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  {selectedProtocol === protocol.id && (
                    <CardContent className="border-t pt-4 space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">📌 사용 상황</h4>
                        <p className="text-sm text-muted-foreground">
                          {protocol.situation}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">📖 사용법</h4>
                        <ol className="text-sm space-y-1 list-decimal list-inside text-muted-foreground">
                          {protocol.usage.map((step, i) => (
                            <li key={i}>{step}</li>
                          ))}
                        </ol>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">⚠️ 규칙</h4>
                        <ul className="text-sm space-y-1 list-disc list-inside text-muted-foreground">
                          {protocol.rules.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-destructive">
                            ❌ Before
                          </h4>
                          <div className="text-sm bg-destructive/5 p-3 rounded-lg space-y-1">
                            {protocol.examples.before.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2 text-green-600">
                            ✅ After
                          </h4>
                          <div className="text-sm bg-green-500/5 p-3 rounded-lg space-y-1">
                            {protocol.examples.after.map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Theories Tab */}
          <TabsContent value="theories" className="mt-6">
            <div className="space-y-4">
              {theories.map((theory) => (
                <Card
                  key={theory.id}
                  className={`cursor-pointer transition-all hover:border-primary ${
                    selectedTheory === theory.id ? 'border-primary ring-1 ring-primary' : ''
                  }`}
                  onClick={() =>
                    setSelectedTheory(
                      selectedTheory === theory.id ? null : theory.id
                    )
                  }
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{theory.name}</CardTitle>
                      <Badge variant="secondary">{theory.nameEn}</Badge>
                    </div>
                    <CardDescription>{theory.description}</CardDescription>
                  </CardHeader>
                  {selectedTheory === theory.id && (
                    <CardContent className="border-t pt-4 space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">🔑 핵심 개념</h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          {theory.keyPoints.map((point, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">💡 적용 방법</h4>
                        <ul className="text-sm space-y-2 text-muted-foreground">
                          {theory.applications.map((app, i) => (
                            <li key={i} className="flex gap-2">
                              <span className="text-primary">→</span>
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
