// 데이터베이스 타입 정의

export interface UserProfile {
  id: string;
  email: string;
  nickname?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TestResult {
  id: string;
  user_id: string;
  test_id: string;
  test_title: string;
  result_type: string;
  result_title: string;
  result_emoji: string;
  total_score?: number;
  category_scores?: Record<string, number>;
  dimension_scores?: {
    anxiety?: number;
    avoidance?: number;
  };
  tips: string[];
  created_at: string;
}

export interface DailyCheckIn {
  id: string;
  user_id: string;
  mood_score: number; // 1-5
  gratitude?: string;
  conflict_note?: string;
  created_at: string;
}

// Supabase 테이블 타입
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile;
        Insert: Omit<UserProfile, 'created_at' | 'updated_at'>;
        Update: Partial<Omit<UserProfile, 'id' | 'created_at'>>;
      };
      test_results: {
        Row: TestResult;
        Insert: Omit<TestResult, 'id' | 'created_at'>;
        Update: Partial<Omit<TestResult, 'id' | 'user_id' | 'created_at'>>;
      };
      daily_checkins: {
        Row: DailyCheckIn;
        Insert: Omit<DailyCheckIn, 'id' | 'created_at'>;
        Update: Partial<Omit<DailyCheckIn, 'id' | 'user_id' | 'created_at'>>;
      };
    };
  };
};
