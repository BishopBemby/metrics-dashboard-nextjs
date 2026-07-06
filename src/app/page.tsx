'use client'

import { useCallback, useMemo } from 'react'
import { useMetricsFeed } from '@/hooks/useMetricsFeed'
import { ChartWidget } from '@/components/ChartWidget/ChartWidget'
import type { DataPoint, Metric } from '@/types/metrics'

const CHART_CONFIGS = {
  'response-time': { kind: 'line' as const, smooth: true, showDots: false },
  'requests': { kind: 'bar' as const, stacked: false, barWidth: 32 },
  'error-rate': { kind: 'line' as const, smooth: false, showDots: true },
}


export default function DashboardPage() {
  const { data: metrics, isLoading, isError } = useMetricsFeed()

  const handlePointHover = useCallback((point: DataPoint) => {
    console.log('Hovered point:', point)
  }, []) 

  const summaryStats = useMemo(() => {
    if (!metrics) return []
    return metrics.map((m: Metric) => ({
      id: m.id,
      label: m.label,
      value: m.value,
      unit: m.unit,
    }))
  }, [metrics])

  if (isLoading) return <p>Loading metrics...</p>
  if (isError) return <p>Failed to load metrics.</p>
  if (!metrics) return null

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Operations dashboard</h1>

      {/* Summary metric cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {summaryStats.map((stat) => (
          <div key={stat.id} style={{ padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>{stat.label}</p>
            <p style={{ margin: '4px 0 0', fontSize: '24px', fontWeight: 500 }}>
              {stat.value.toFixed(stat.unit === 'percent' ? 2 : 0)} {stat.unit}
            </p>
          </div>
        ))}
      </div>

      {/* Chart widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {metrics.map((metric: Metric) => (
          <div key={metric.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '1rem' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 500 }}>{metric.label}</p>
            <ChartWidget
              data={metric.series}
              chartConfig={CHART_CONFIGS[metric.id as keyof typeof CHART_CONFIGS]}
              onPointHover={handlePointHover}
            />
          </div>
        ))}
      </div>
    </main>
  )
}