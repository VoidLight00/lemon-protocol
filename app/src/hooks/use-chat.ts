'use client';

import { useState, useCallback } from 'react';
import { useChatStore } from '@/stores/chat-store';
import { useSettingsStore } from '@/stores/settings-store';

interface UseChatOptions {
  onError?: (error: string) => void;
}

export function useChat(options: UseChatOptions = {}) {
  const [streamingContent, setStreamingContent] = useState('');
  const { messages, isLoading, addMessage, updateLastMessage, setLoading, setError } =
    useChatStore();
  const { activeProvider, activeModel, getActiveApiKey } = useSettingsStore();

  const sendMessage = useCallback(
    async (content: string) => {
      const apiKey = getActiveApiKey();

      if (!apiKey) {
        const error = 'API 키가 설정되지 않았습니다. 설정에서 API 키를 입력해주세요.';
        setError(error);
        options.onError?.(error);
        return;
      }

      // Add user message
      addMessage({ role: 'user', content });

      // Add placeholder for assistant message
      addMessage({ role: 'assistant', content: '' });
      setLoading(true);
      setStreamingContent('');

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: 'user', content },
            ],
            provider: activeProvider,
            apiKey,
            model: activeModel,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || '요청 처리 중 오류가 발생했습니다.');
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('스트림을 읽을 수 없습니다.');
        }

        const decoder = new TextDecoder();
        let fullContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  fullContent += parsed.content;
                  setStreamingContent(fullContent);
                  updateLastMessage(fullContent);
                }
              } catch {
                // Ignore parse errors for incomplete chunks
              }
            }
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
        setError(errorMessage);
        options.onError?.(errorMessage);
        // Remove the empty assistant message
        useChatStore.setState((state) => ({
          messages: state.messages.slice(0, -1),
        }));
      } finally {
        setLoading(false);
        setStreamingContent('');
      }
    },
    [
      messages,
      activeProvider,
      activeModel,
      getActiveApiKey,
      addMessage,
      updateLastMessage,
      setLoading,
      setError,
      options,
    ]
  );

  return {
    messages,
    isLoading,
    streamingContent,
    sendMessage,
  };
}
