'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageBubble } from './message-bubble';
import { ChatInput } from './chat-input';
import { useChat } from '@/hooks/use-chat';
import { GREETING_MESSAGE } from '@/lib/ai/prompts';
import { useSettingsStore } from '@/stores/settings-store';
import { useChatStore } from '@/stores/chat-store';
import { scenarios } from '@/lib/scenarios';

export function ChatContainer() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages, isLoading, sendMessage } = useChat();
  const hasApiKey = useSettingsStore((s) => s.hasApiKey(s.activeProvider));
  const { sessions, currentSessionId, createSession, loadSession, deleteSession, exportSession } = useChatStore();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showScenarios, setShowScenarios] = useState(true);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Hide scenarios after first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowScenarios(false);
    }
  }, [messages.length]);

  const handleScenarioClick = (prompt: string) => {
    setShowScenarios(false);
    sendMessage(prompt);
  };

  const handleExport = (format: 'markdown' | 'json') => {
    if (!currentSessionId) return;
    const content = exportSession(currentSessionId, format);
    const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lemon-chat-${new Date().toISOString().slice(0, 10)}.${format === 'json' ? 'json' : 'md'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleNewChat = () => {
    createSession();
    setShowScenarios(true);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar - History */}
      {showSidebar && (
        <div className="w-64 border-r bg-muted/30 flex flex-col">
          <div className="p-3 border-b">
            <Button onClick={handleNewChat} className="w-full" size="sm">
              + 새 대화
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {sessions.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  대화 기록이 없습니다
                </p>
              ) : (
                sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-2 rounded-lg cursor-pointer text-sm hover:bg-muted ${
                      session.id === currentSessionId ? 'bg-muted' : ''
                    }`}
                    onClick={() => loadSession(session.id)}
                  >
                    <div className="font-medium truncate">{session.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(session.updatedAt).toLocaleDateString('ko-KR')}
                    </div>
                    <button
                      className="text-xs text-destructive hover:underline mt-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(session.id);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          {currentSessionId && (
            <div className="p-2 border-t space-y-1">
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => handleExport('markdown')}>
                📄 마크다운 내보내기
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => handleExport('json')}>
                📦 JSON 내보내기
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Toggle Sidebar Button */}
        <div className="p-2 border-b flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
            className="text-xs"
          >
            {showSidebar ? '◀ 닫기' : '▶ 기록'}
          </Button>
          {currentSessionId && (
            <span className="text-xs text-muted-foreground">
              {sessions.find(s => s.id === currentSessionId)?.title}
            </span>
          )}
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 px-4" ref={scrollRef}>
          <div className="max-w-3xl mx-auto py-4 space-y-4">
            {/* Greeting Message */}
            {messages.length === 0 && (
              <div className="flex justify-start">
                <div className="max-w-[85%] bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="prose-chat whitespace-pre-wrap">{GREETING_MESSAGE}</div>
                </div>
              </div>
            )}

            {/* Scenario Cards - Show when no messages */}
            {messages.length === 0 && showScenarios && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  💡 이런 상황으로 시작해보세요
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {scenarios.slice(0, 6).map((scenario) => (
                    <Card
                      key={scenario.id}
                      className="p-3 cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleScenarioClick(scenario.prompt)}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{scenario.emoji}</span>
                        <div>
                          <div className="font-medium text-sm">{scenario.title}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">
                            {scenario.description}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Messages */}
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
                isStreaming={isLoading && index === messages.length - 1 && message.role === 'assistant'}
              />
            ))}

            {/* Loading indicator when waiting for response */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
              <div className="flex justify-start">
                <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <LoadingDots />
                    <span>분석 중...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* API Key Warning */}
        {!hasApiKey && (
          <div className="px-4 py-2 bg-destructive/10 text-destructive text-sm text-center">
            ⚠️ API 키가 설정되지 않았습니다.{' '}
            <a href="/settings" className="underline font-medium">
              설정
            </a>
            에서 API 키를 입력해주세요.
          </div>
        )}

        {/* Input Area */}
        <ChatInput onSend={sendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
}

function LoadingDots() {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
    </div>
  );
}
