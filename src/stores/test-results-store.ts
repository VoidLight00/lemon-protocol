import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TestResult } from '@/types/database';

interface TestResultsState {
  // 로컬 저장된 결과 (비로그인 사용자용)
  localResults: TestResult[];
  // 서버에서 가져온 결과 (로그인 사용자용)
  serverResults: TestResult[];
  // 로딩 상태
  isLoading: boolean;

  // Actions
  addLocalResult: (result: Omit<TestResult, 'id' | 'created_at' | 'user_id'>) => void;
  setServerResults: (results: TestResult[]) => void;
  setLoading: (loading: boolean) => void;
  clearLocalResults: () => void;

  // Getters
  getAllResults: () => TestResult[];
  getResultsByTestId: (testId: string) => TestResult[];
  getLatestResult: (testId: string) => TestResult | null;
}

export const useTestResultsStore = create<TestResultsState>()(
  persist(
    (set, get) => ({
      localResults: [],
      serverResults: [],
      isLoading: false,

      addLocalResult: (result) => {
        const newResult: TestResult = {
          ...result,
          id: `local-${Date.now()}`,
          user_id: 'local',
          created_at: new Date().toISOString(),
        };
        set((state) => ({
          localResults: [newResult, ...state.localResults],
        }));
      },

      setServerResults: (results) => set({ serverResults: results }),

      setLoading: (isLoading) => set({ isLoading }),

      clearLocalResults: () => set({ localResults: [] }),

      getAllResults: () => {
        const { localResults, serverResults } = get();
        // 서버 결과가 있으면 서버 결과만, 없으면 로컬 결과
        return serverResults.length > 0 ? serverResults : localResults;
      },

      getResultsByTestId: (testId) => {
        return get().getAllResults().filter((r) => r.test_id === testId);
      },

      getLatestResult: (testId) => {
        const results = get().getResultsByTestId(testId);
        return results.length > 0 ? results[0] : null;
      },
    }),
    {
      name: 'lemon-test-results',
      partialize: (state) => ({
        localResults: state.localResults,
      }),
    }
  )
);
