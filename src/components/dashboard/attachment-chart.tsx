'use client';

import { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import type { TestResult } from '@/types/database';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface AttachmentChartProps {
  results: TestResult[];
}

type QuadrantType = 'secure' | 'anxious' | 'avoidant' | 'fearful';

const QUADRANT_COLORS: Record<QuadrantType, string> = {
  secure: '#34d399', // 안정형 - 녹색
  anxious: '#fbbf24', // 불안형 - 노랑
  avoidant: '#60a5fa', // 회피형 - 파랑
  fearful: '#f87171', // 두려움형 - 빨강
};

function getQuadrant(anxiety: number, avoidance: number): QuadrantType {
  const midPoint = 63; // ECR-R 중간점
  if (anxiety <= midPoint && avoidance <= midPoint) return 'secure';
  if (anxiety > midPoint && avoidance <= midPoint) return 'anxious';
  if (anxiety <= midPoint && avoidance > midPoint) return 'avoidant';
  return 'fearful';
}

export function AttachmentChart({ results }: AttachmentChartProps) {
  const chartData = useMemo(() => {
    return results
      .filter(r => r.dimension_scores?.anxiety !== undefined)
      .map(r => ({
        anxiety: r.dimension_scores?.anxiety || 0,
        avoidance: r.dimension_scores?.avoidance || 0,
        date: r.created_at,
        quadrant: getQuadrant(
          r.dimension_scores?.anxiety || 0,
          r.dimension_scores?.avoidance || 0
        ),
      }))
      .slice(0, 10); // 최근 10개만
  }, [results]);

  if (chartData.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        ECR-R 테스트 결과가 없습니다
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="avoidance"
            name="회피"
            domain={[0, 126]}
            label={{ value: '회피 →', position: 'bottom', offset: 0 }}
          />
          <YAxis
            type="number"
            dataKey="anxiety"
            name="불안"
            domain={[0, 126]}
            label={{ value: '불안 →', angle: -90, position: 'left' }}
          />
          <ReferenceLine x={63} stroke="#888" strokeDasharray="5 5" />
          <ReferenceLine y={63} stroke="#888" strokeDasharray="5 5" />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-popover border rounded-lg p-3 shadow-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {format(new Date(data.date), 'yyyy.MM.dd', { locale: ko })}
                    </p>
                    <p className="text-sm">불안: {data.anxiety}</p>
                    <p className="text-sm">회피: {data.avoidance}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Scatter data={chartData} fill="#fbbf24">
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={QUADRANT_COLORS[entry.quadrant]}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: QUADRANT_COLORS.secure }} />
          <span>안정형 (낮은 불안, 낮은 회피)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: QUADRANT_COLORS.anxious }} />
          <span>불안형 (높은 불안, 낮은 회피)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: QUADRANT_COLORS.avoidant }} />
          <span>회피형 (낮은 불안, 높은 회피)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: QUADRANT_COLORS.fearful }} />
          <span>두려움형 (높은 불안, 높은 회피)</span>
        </div>
      </div>
    </div>
  );
}
