type ChartConfig =
| {kind: 'line', smooth: boolean, showDots: boolean}
| {kind: 'bar', stacked: boolean, barWidth: number}
| {kind: 'pie', donut: boolean, legendPosition: 'top' | 'bottom' | 'left' | 'right'};

function renderShapes(config: ChartConfig) {
  switch (config.kind) {
    case 'line':
        return config.smooth;
    case 'bar':
        return config.stacked;
    case 'pie':
        return config.donut;
    default: {
        const _exhaustiveCheck: never = config;
        return _exhaustiveCheck;
    }
  }
}

interface ChatWidgetProps<T>{
    data: T[];
    chartConfig: ChartConfig;
    xAccessor: (point: T) => number;
    yAccessor: (point: T) => number;
}

