import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Message, ChatSession } from '@/types';

interface ChatState {
  // Current chat state
  messages: Message[];
  isLoading: boolean;
  error: string | null;

  // Session management
  currentSessionId: string | null;
  sessions: ChatSession[];

  // Actions
  addMessage: (message: Omit<Message, 'id' | 'createdAt'>) => void;
  updateLastMessage: (content: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  clearError: () => void;

  // Session actions
  createSession: (title?: string) => string;
  loadSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  updateSessionTitle: (sessionId: string, title: string) => void;

  // Export
  exportSession: (sessionId: string, format: 'markdown' | 'json') => string;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isLoading: false,
      error: null,
      currentSessionId: null,
      sessions: [],

      addMessage: (message) => {
        const newMessage: Message = {
          ...message,
          id: generateId(),
          createdAt: new Date(),
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        // Update session if exists
        const sessionId = get().currentSessionId;
        if (sessionId) {
          set((state) => ({
            sessions: state.sessions.map((s) =>
              s.id === sessionId
                ? { ...s, messages: [...s.messages, newMessage], updatedAt: new Date() }
                : s
            ),
          }));
        }
      },

      updateLastMessage: (content) => {
        set((state) => {
          const messages = [...state.messages];
          if (messages.length > 0) {
            messages[messages.length - 1] = {
              ...messages[messages.length - 1],
              content,
            };
          }
          return { messages };
        });

        // Update session if exists
        const sessionId = get().currentSessionId;
        if (sessionId) {
          set((state) => ({
            sessions: state.sessions.map((s) => {
              if (s.id === sessionId) {
                const messages = [...s.messages];
                if (messages.length > 0) {
                  messages[messages.length - 1] = {
                    ...messages[messages.length - 1],
                    content,
                  };
                }
                return { ...s, messages, updatedAt: new Date() };
              }
              return s;
            }),
          }));
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),

      clearMessages: () => set({ messages: [], currentSessionId: null }),

      clearError: () => set({ error: null }),

      createSession: (title) => {
        const id = generateId();
        const now = new Date();
        const session: ChatSession = {
          id,
          title: title || `새 대화 ${now.toLocaleDateString('ko-KR')}`,
          messages: [],
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({
          sessions: [session, ...state.sessions],
          currentSessionId: id,
          messages: [],
        }));

        return id;
      },

      loadSession: (sessionId) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (session) {
          set({
            currentSessionId: sessionId,
            messages: session.messages,
          });
        }
      },

      deleteSession: (sessionId) => {
        set((state) => ({
          sessions: state.sessions.filter((s) => s.id !== sessionId),
          ...(state.currentSessionId === sessionId
            ? { currentSessionId: null, messages: [] }
            : {}),
        }));
      },

      updateSessionTitle: (sessionId, title) => {
        set((state) => ({
          sessions: state.sessions.map((s) =>
            s.id === sessionId ? { ...s, title } : s
          ),
        }));
      },

      exportSession: (sessionId, format) => {
        const session = get().sessions.find((s) => s.id === sessionId);
        if (!session) return '';

        if (format === 'json') {
          return JSON.stringify(session, null, 2);
        }

        // Markdown format
        let markdown = `# ${session.title}\n\n`;
        markdown += `> 생성: ${new Date(session.createdAt).toLocaleString('ko-KR')}\n\n`;
        markdown += `---\n\n`;

        session.messages.forEach((msg) => {
          const role = msg.role === 'user' ? '👤 나' : '🍋 레몬';
          markdown += `### ${role}\n\n${msg.content}\n\n---\n\n`;
        });

        return markdown;
      },
    }),
    {
      name: 'lemon-chat-storage',
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
      }),
    }
  )
);
