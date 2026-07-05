import {LineChart as RechartsLineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {DataPoint} from '@/types/metrics';
import type { ChartConfig } from '@/types/metrics';

type LineConfig = Extract<ChartConfig, { kind: 'line' }>;

interface LineChartProps {
    data: DataPoint[];
    config: LineConfig;
}

export function LineChart({ data, config }: LineChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={data}>
                <XAxis dataKey="t" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line  type={config.smooth ? 'monotone' : 'linear'} dataKey="v" dot={config.showDots} strokeWidth={2} />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
}