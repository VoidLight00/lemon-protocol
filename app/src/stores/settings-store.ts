import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings, AIProvider } from '@/types';

interface SettingsState extends Settings {
  // Actions
  setApiKey: (provider: AIProvider, key: string) => void;
  removeApiKey: (provider: AIProvider) => void;
  setActiveProvider: (provider: AIProvider) => void;
  setActiveModel: (model: string) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setSaveHistory: (save: boolean) => void;
  hasApiKey: (provider: AIProvider) => boolean;
  getActiveApiKey: () => string | undefined;
  reset: () => void;
}

const defaultSettings: Settings = {
  apiKeys: {},
  activeProvider: 'openai',
  activeModel: 'gpt-4o-mini',
  theme: 'system',
  saveHistory: false,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      setApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key },
        })),

      removeApiKey: (provider) =>
        set((state) => {
          const { [provider]: _, ...rest } = state.apiKeys;
          return { apiKeys: rest };
        }),

      setActiveProvider: (provider) =>
        set({ activeProvider: provider }),

      setActiveModel: (model) =>
        set({ activeModel: model }),

      setTheme: (theme) =>
        set({ theme }),

      setSaveHistory: (save) =>
        set({ saveHistory: save }),

      hasApiKey: (provider) => {
        const key = get().apiKeys[provider];
        return !!key && key.length > 0;
      },

      getActiveApiKey: () => {
        const state = get();
        return state.apiKeys[state.activeProvider];
      },

      reset: () => set(defaultSettings),
    }),
    {
      name: 'lemon-settings',
      partialize: (state) => ({
        apiKeys: state.apiKeys,
        activeProvider: state.activeProvider,
        activeModel: state.activeModel,
        theme: state.theme,
        saveHistory: state.saveHistory,
      }),
    }
  )
);

// Model options per provider
export const modelOptions: Record<AIProvider, Array<{ value: string; label: string }>> = {
  openai: [
    { value: 'gpt-4o', label: 'GPT-4o (권장)' },
    { value: 'gpt-4o-mini', label: 'GPT-4o Mini (빠름)' },
    { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
  ],
  gemini: [
    { value: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash (권장)' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash (빠름)' },
  ],
  openrouter: [
    // 무료/저가 모델
    { value: 'moonshotai/kimi-k2', label: '🆓 Kimi K2 (무료, 권장)' },
    { value: 'deepseek/deepseek-chat-v3-0324', label: '🆓 DeepSeek V3 (무료)' },
    { value: 'google/gemini-2.0-flash-001', label: '💰 Gemini 2.0 Flash (저가)' },
    { value: 'meta-llama/llama-3.3-70b-instruct', label: '💰 Llama 3.3 70B (저가)' },
    { value: 'mistralai/mistral-small-3.1-24b-instruct', label: '💰 Mistral Small (저가)' },
    // 프리미엄 모델
    { value: 'anthropic/claude-sonnet-4', label: '⭐ Claude Sonnet 4' },
    { value: 'anthropic/claude-3.5-sonnet', label: '⭐ Claude 3.5 Sonnet' },
    { value: 'openai/gpt-4o', label: '⭐ GPT-4o' },
    { value: 'openai/gpt-4o-mini', label: '💰 GPT-4o Mini (저가)' },
    { value: 'google/gemini-2.5-pro-preview', label: '⭐ Gemini 2.5 Pro' },
  ],
  ollama: [
    // 인기 모델
    { value: 'llama3.2', label: '🦙 Llama 3.2 (8B, 권장)' },
    { value: 'llama3.3', label: '🦙 Llama 3.3 (70B)' },
    { value: 'qwen2.5', label: '🌟 Qwen 2.5 (7B, 한국어 우수)' },
    { value: 'qwen2.5:14b', label: '🌟 Qwen 2.5 (14B)' },
    { value: 'gemma2', label: '💎 Gemma 2 (9B)' },
    { value: 'mistral', label: '🌀 Mistral (7B)' },
    { value: 'deepseek-r1', label: '🔬 DeepSeek R1 (추론)' },
    { value: 'phi4', label: '🔷 Phi-4 (14B)' },
    { value: 'codellama', label: '💻 CodeLlama (코딩)' },
    { value: 'llava', label: '👁️ LLaVA (비전)' },
  ],
};
