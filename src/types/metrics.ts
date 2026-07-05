export interface DataPoint{
    t: number;
    v: number;
}

export interface Metric{
    name: string;
    label: string;
    unit: 'ms' | 'bytes' | 'count' | 'percent';
    value: number;
    timestamp: number;
    series: DataPoint[];
}

type PartialMetricUpdate<T> = {
    [K in keyof T]?: T[K];
}

type ReadonlyMetric<T> = {
    readonly [K in keyof T]: T[K];
}

type PreviewMetric = Pick<Metric, 'name' | 'label'>;
type SummaryMetric = Omit<Metric, 'series'>;
type NewSubMetric = Partial<Metric> 

const metricA: Metric = {
    name: 'metricA',
    label: 'Metric A',
    unit: 'ms',
    value: 100,
    timestamp: Date.now(),
    series: []
}
 function updateMetric(metric: Metric, toUpdate: NewSubMetric): Metric {
    return { ...metric, ...toUpdate };
}

const metricB = updateMetric(metricA, {unit: 'bytes'})

//opposite of Partial
const metricC: Required<Metric> = {
    name: 'metricC',
    label: 'Metric C',
    unit: 'ms',
    value: 200,
    timestamp: Date.now(),
    series: []
}

interface ToDo {
    title: string;
}

const toDo: Readonly<ToDo> = {
    title: 'Finish TypeScript project'
}

// todo.title = 'Finish TypeScript project and submit' // Error: Cannot assign to 'title' because it is a read-only property.

type DogBreed = 'Beagle' | 'Bulldog' | 'Collie';

type DogsInfo = {
    age: number;
    weight: number;
}

const Dogs :Record<DogBreed, DogsInfo> = {
    Beagle: { age: 3, weight: 20 },
    Bulldog: { age: 5, weight: 50 },
    Collie: { age: 2, weight: 30 }
}

//discriminated Union

export type ChartConfig =
| {kind: 'line', smooth: boolean, showDots: boolean}
| {kind: 'bar', stacked: boolean, barWidth: number}
| {kind: 'pie', donut: boolean, legendPosition: 'top' | 'bottom' | 'left' | 'right'};

//generics
export interface ChartWidgetProps<T>{
    data: T[];
    chartConfig: ChartConfig;
    xAccessor: (point: T) => number;
    yAccessor: (point: T) => number;
}

export type ChartPreviewProps<T> = Pick<ChartWidgetProps<T>,'data' | 'chartConfig'>