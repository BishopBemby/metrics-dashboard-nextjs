'use client'

import type { ChartWidgetProps, DataPoint} from '@/types/metrics';

import {LineChart} from './LineChart';
import {BarChart} from './BarChart';
import {PieChart} from './PieChart';

function assertNever(x: never): never {
    throw new Error(`Unexpected object: ${x}`);
}

export function ChartWidget<T extends object>(props: ChartWidgetProps<T>) {
    const { data, chartConfig } = props;
    switch (chartConfig.kind) {
        case 'line':
            return <LineChart data={data as unknown as DataPoint[]} config={chartConfig} />;
        case 'bar':
            return <BarChart data={data as unknown as DataPoint[]} config={chartConfig} />;
        case 'pie':
            return <PieChart data={data as unknown as DataPoint[]} config={chartConfig} />;
        default:
            return assertNever(chartConfig);
    }
}




