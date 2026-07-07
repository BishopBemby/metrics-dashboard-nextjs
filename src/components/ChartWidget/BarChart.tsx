import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { DataPoint } from '@/types/metrics'
import type { ChartConfig } from '@/types/metrics'

type BarConfig = Extract<ChartConfig, { kind: 'bar' }>

interface BarChartProps {
  data: DataPoint[]
  config: BarConfig
  bounds?: { min: number; max: number }
}

export function BarChart({ data, config, bounds }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="t"
          tickFormatter={(t) => new Date(t).toLocaleTimeString()}
          tick={{ fontSize: 10 }}
          tickLine={false}
        />
        <YAxis
          domain={bounds ? [bounds.min, bounds.max] : ['auto', 'auto']}
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip
          labelFormatter={(t) => new Date(t).toLocaleTimeString()}
        />
        <Bar
          dataKey="v"
          fill="#1D9E75"
          radius={[3, 3, 0, 0]}
          isAnimationActive={false}
          stackId={config.stacked ? 'stack' : undefined}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}