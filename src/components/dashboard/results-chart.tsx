'use client';

import { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { TestResult } from '@/types/database';

interface ResultsChartProps {
  results: TestResult[];
}

const COLORS = ['#fbbf24', '#fb923c', '#f87171', '#a78bfa', '#60a5fa', '#34d399'];

export function ResultsChart({ results }: ResultsChartProps) {
  const chartData = useMemo(() => {
    // 테스트별 결과 수 집계
    const countByTest: Record<string, { name: string; count: number }> = {};

    results.forEach((result) => {
      const key = result.test_id;
      if (!countByTest[key]) {
        countByTest[key] = {
          name: result.test_title.replace(' 테스트', '').replace('(ECR-R)', ''),
          count: 0,
        };
      }
      countByTest[key].count += 1;
    });

    return Object.values(countByTest);
  }, [results]);

  if (chartData.length === 0) {
    return (
      <div className="h-[200px] flex items-center justify-center text-muted-foreground">
        데이터가 없습니다
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
        <XAxis type="number" allowDecimals={false} />
        <YAxis
          type="category"
          dataKey="name"
          width={100}
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-popover border rounded-lg p-2 shadow-lg">
                  <p className="font-medium">{payload[0].payload.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {payload[0].value}회 완료
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {chartData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
