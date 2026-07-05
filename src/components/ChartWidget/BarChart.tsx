import {BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import type {DataPoint} from '@/types/metrics';
import type { ChartConfig } from '@/types/metrics';

type BarConfig = Extract<ChartConfig, { kind: 'bar' }>;

interface BarChartProps {
    data: DataPoint[];
    config: BarConfig;
}

export function BarChart({ data, config }: BarChartProps) {
    return (
        <RechartsBarChart width={600} height={300} data={data}>
            <XAxis dataKey="t" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar stackId={config.stacked ? 'same' : undefined} dataKey="v" fill="#8884d8" barSize={config.barWidth} />
        </RechartsBarChart>
    );
}