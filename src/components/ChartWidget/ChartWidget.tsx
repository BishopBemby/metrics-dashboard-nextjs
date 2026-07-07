'use client'

import type { ChartWidgetProps, DataPoint} from '@/types/metrics';

import {LineChart} from './LineChart';
import {BarChart} from './BarChart';
import {PieChart} from './PieChart';
import { memo, useMemo } from 'react';

function assertNever(x: never): never {
    throw new Error(`Unexpected object: ${x}`);
}

export const ChartWidget = memo(function ChartWidget(props: ChartWidgetProps<DataPoint>) {
    const { data, chartConfig, onPointHover } = props;

    const bounds = useMemo(() => {
    if (data.length === 0) return { min: 0, max: 100 }
    const values = data.map((p) => p.v)
    return {
      min: Math.floor(Math.min(...values) * 0.9),
      max: Math.ceil(Math.max(...values) * 1.1),
    }
  }, [data])
    switch (chartConfig.kind) {
        case 'line':
            return <LineChart data={data as unknown as DataPoint[]} config={chartConfig} onPointHover={onPointHover}  bounds={bounds}/>;
        case 'bar':
            return <BarChart data={data as unknown as DataPoint[]} config={chartConfig}  bounds={bounds}/>;
        case 'pie':
            return <PieChart data={data as unknown as DataPoint[]} config={chartConfig} />;
        default:
            return assertNever(chartConfig);
    }
})




