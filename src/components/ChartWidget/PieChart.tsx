import {PieChart as RechartsPieChart, Pie, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import type {DataPoint} from '@/types/metrics';
import type { ChartConfig } from '@/types/metrics';

type PieConfig = Extract<ChartConfig, { kind: 'pie' }>;

interface PieChartProps {
    data: DataPoint[];
    config: PieConfig;
}

export function PieChart({ data, config }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={config.donut ? 40 : 0}    
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="v"
                />
                <Tooltip />
                <Legend />
            </RechartsPieChart>
        </ResponsiveContainer>
    );
}
