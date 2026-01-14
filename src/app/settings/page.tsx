'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useSettingsStore, modelOptions } from '@/stores/settings-store';
import type { AIProvider } from '@/types';

export default function SettingsPage() {
  const {
    apiKeys,
    activeProvider,
    activeModel,
    setApiKey,
    removeApiKey,
    setActiveProvider,
    setActiveModel,
    hasApiKey,
  } = useSettingsStore();

  return (
    <div className="container max-w-2xl py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">설정</h1>
          <p className="text-muted-foreground">
            AI 분석을 위한 API 키와 모델을 설정하세요.
          </p>
        </div>

        <Separator />

        {/* API Keys Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔑 API 키 관리
            </CardTitle>
            <CardDescription>
              AI 분석을 사용하려면 API 키가 필요합니다.
              키는 브라우저에 암호화되어 저장됩니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs
              value={activeProvider}
              onValueChange={(v) => setActiveProvider(v as AIProvider)}
            >
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="openai" className="gap-1 text-xs sm:text-sm">
                  OpenAI
                  {hasApiKey('openai') && (
                    <Badge variant="secondary" className="ml-1 text-xs">✓</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="gemini" className="gap-1 text-xs sm:text-sm">
                  Gemini
                  {hasApiKey('gemini') && (
                    <Badge variant="secondary" className="ml-1 text-xs">✓</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="openrouter" className="gap-1 text-xs sm:text-sm">
                  OpenRouter
                  {hasApiKey('openrouter') && (
                    <Badge variant="secondary" className="ml-1 text-xs">✓</Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="ollama" className="gap-1 text-xs sm:text-sm">
                  Ollama
                  {hasApiKey('ollama') && (
                    <Badge variant="secondary" className="ml-1 text-xs">✓</Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="openai" className="mt-4">
                <APIKeyInput
                  provider="openai"
                  label="OpenAI API Key"
                  placeholder="sk-..."
                  helpText="OpenAI에서 API 키를 발급받으세요."
                  helpLink="https://platform.openai.com/api-keys"
                  currentKey={apiKeys.openai}
                  onSave={(key) => setApiKey('openai', key)}
                  onRemove={() => removeApiKey('openai')}
                />
              </TabsContent>

              <TabsContent value="gemini" className="mt-4">
                <APIKeyInput
                  provider="gemini"
                  label="Google Gemini API Key"
                  placeholder="AI..."
                  helpText="Google AI Studio에서 API 키를 발급받으세요."
                  helpLink="https://aistudio.google.com/apikey"
                  currentKey={apiKeys.gemini}
                  onSave={(key) => setApiKey('gemini', key)}
                  onRemove={() => removeApiKey('gemini')}
                />
              </TabsContent>

              <TabsContent value="openrouter" className="mt-4">
                <APIKeyInput
                  provider="openrouter"
                  label="OpenRouter API Key"
                  placeholder="sk-or-..."
                  helpText="OpenRouter에서 API 키를 발급받으세요. 다양한 AI 모델을 하나의 키로 사용할 수 있습니다."
                  helpLink="https://openrouter.ai/keys"
                  currentKey={apiKeys.openrouter}
                  onSave={(key) => setApiKey('openrouter', key)}
                  onRemove={() => removeApiKey('openrouter')}
                />
              </TabsContent>

              <TabsContent value="ollama" className="mt-4">
                <OllamaConfig
                  currentUrl={apiKeys.ollama}
                  onSave={(url) => setApiKey('ollama', url)}
                  onRemove={() => removeApiKey('ollama')}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Model Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🤖 모델 선택
            </CardTitle>
            <CardDescription>
              현재 활성화된 AI 제공자: <strong>
                {activeProvider === 'openai' ? 'OpenAI' :
                 activeProvider === 'gemini' ? 'Google Gemini' :
                 activeProvider === 'openrouter' ? 'OpenRouter' : 'Ollama (로컬)'}
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {modelOptions[activeProvider].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setActiveModel(option.value)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    activeModel === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  {activeModel === option.value && (
                    <Badge>활성</Badge>
                  )}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Info */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <span className="text-2xl">ℹ️</span>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>BYOK (Bring Your Own Key)</strong>: 이 서비스는 사용자의 API 키를 사용합니다.
                </p>
                <p>
                  API 호출 비용은 각 AI 제공자에게 직접 청구됩니다.
                  서버에 키가 저장되지 않으며, 브라우저에서만 암호화되어 보관됩니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface APIKeyInputProps {
  provider: AIProvider;
  label: string;
  placeholder: string;
  helpText: string;
  helpLink: string;
  currentKey?: string;
  onSave: (key: string) => void;
  onRemove: () => void;
}

function APIKeyInput({
  provider,
  label,
  placeholder,
  helpText,
  helpLink,
  currentKey,
  onSave,
  onRemove,
}: APIKeyInputProps) {
  const [key, setKey] = useState('');
  const [isEditing, setIsEditing] = useState(!currentKey);

  const handleSave = () => {
    if (key.trim()) {
      onSave(key.trim());
      setKey('');
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    setIsEditing(true);
  };

  if (!isEditing && currentKey) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="font-mono text-sm">
              {currentKey.slice(0, 8)}...{currentKey.slice(-4)}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={handleRemove}>
              삭제
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Input
          type="password"
          placeholder={placeholder}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="font-mono"
        />
        <Button onClick={handleSave} disabled={!key.trim()}>
          저장
        </Button>
        {currentKey && (
          <Button variant="ghost" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        {helpText}{' '}
        <a
          href={helpLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2"
        >
          키 발급받기 →
        </a>
      </p>
    </div>
  );
}

interface OllamaConfigProps {
  currentUrl?: string;
  onSave: (url: string) => void;
  onRemove: () => void;
}

function OllamaConfig({ currentUrl, onSave, onRemove }: OllamaConfigProps) {
  const [url, setUrl] = useState('');
  const [isEditing, setIsEditing] = useState(!currentUrl);
  const [status, setStatus] = useState<'idle' | 'checking' | 'connected' | 'error'>('idle');

  const defaultUrl = 'http://localhost:11434';

  const checkConnection = async (urlToCheck: string) => {
    setStatus('checking');
    try {
      const response = await fetch(`${urlToCheck}/api/tags`, {
        method: 'GET',
      });
      if (response.ok) {
        setStatus('connected');
        return true;
      }
      setStatus('error');
      return false;
    } catch {
      setStatus('error');
      return false;
    }
  };

  const handleSave = async () => {
    const urlToSave = url.trim() || defaultUrl;
    const isConnected = await checkConnection(urlToSave);
    if (isConnected) {
      onSave(urlToSave);
      setUrl('');
      setIsEditing(false);
    }
  };

  const handleUseDefault = async () => {
    const isConnected = await checkConnection(defaultUrl);
    if (isConnected) {
      onSave(defaultUrl);
      setIsEditing(false);
    }
  };

  const handleRemove = () => {
    onRemove();
    setIsEditing(true);
    setStatus('idle');
  };

  if (!isEditing && currentUrl) {
    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✓</span>
            <span className="font-mono text-sm">{currentUrl}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              수정
            </Button>
            <Button variant="destructive" size="sm" onClick={handleRemove}>
              삭제
            </Button>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          💡 Ollama가 실행 중이어야 합니다. 터미널에서 <code className="bg-muted px-1 rounded">ollama serve</code> 실행
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder={defaultUrl}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="font-mono"
        />
        <Button onClick={handleSave} disabled={status === 'checking'}>
          {status === 'checking' ? '확인 중...' : '연결'}
        </Button>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={handleUseDefault} disabled={status === 'checking'}>
          기본값 사용 ({defaultUrl})
        </Button>
        {currentUrl && (
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        )}
      </div>

      {status === 'error' && (
        <p className="text-sm text-destructive">
          ⚠️ Ollama에 연결할 수 없습니다. Ollama가 실행 중인지 확인하세요.
        </p>
      )}

      <div className="text-sm text-muted-foreground space-y-2">
        <p>
          <strong>🖥️ 로컬 AI 실행</strong>: Ollama로 로컬에서 AI 모델을 실행합니다.
        </p>
        <p>
          1. <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            ollama.ai
          </a>에서 Ollama 설치
        </p>
        <p>
          2. 터미널에서 <code className="bg-muted px-1 rounded">ollama pull llama3.2</code> 실행
        </p>
        <p>
          3. <code className="bg-muted px-1 rounded">ollama serve</code>로 서버 시작
        </p>
      </div>
    </div>
  );
}
