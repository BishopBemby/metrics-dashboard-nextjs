import type { DataPoint, Metric } from '@/types/metrics';

// function generateDataPoint(prev: number): DataPoint {
//   const drift = (Math.random() - 0.5) * 10;
//   return { t: Date.now(), v: Math.max(0, prev + drift) };
// }

// export function subscribeMockMetric(
//   metricId: string,
//   onUpdate: (point: DataPoint) => void,
//   intervalMs = 3000
// ) {
//   let last = 100;
//   const id = setInterval(() => {
//     last = generateDataPoint(last).v;
//     onUpdate({ t: Date.now(), v: last });
//   }, intervalMs);
//   return () => clearInterval(id);
// }

// generates one new data point that drifts realistically
// from the previous value — not random jumps
function nextDataPoint(prev: number, variance: number): DataPoint {
  const drift = (Math.random() - 0.5) * variance
  return {
    t: Date.now(),
    v: Math.max(0, Math.round((prev + drift) * 100) / 100),
  }
}

// seed data — the starting state of each metric
export const INITIAL_METRICS: Metric[] = [
  {
    id: 'response-time',
    label: 'Avg response time',
    unit: 'ms',
    value: 142,
    timestamp: Date.now(),
    series: Array.from({ length: 10 }, (_, i) => ({
      t: Date.now() - (10 - i) * 3000,
      v: 130 + Math.random() * 30,
    })),
  },
  {
    id: 'requests',
    label: 'Requests / min',
    unit: 'count',
    value: 3210,
    timestamp: Date.now(),
    series: Array.from({ length: 10 }, (_, i) => ({
      t: Date.now() - (10 - i) * 3000,
      v: 3000 + Math.random() * 500,
    })),
  },
  {
    id: 'error-rate',
    label: 'Error rate',
    unit: 'percent',
    value: 0.42,
    timestamp: Date.now(),
    series: Array.from({ length: 10 }, (_, i) => ({
      t: Date.now() - (10 - i) * 3000,
      v: 0.3 + Math.random() * 0.3,
    })),
  },
]

const VARIANCE: Record<string, number> = {
  'response-time': 15,
  'requests': 200,
  'error-rate': 0.05,
}

export function subscribeMockMetric(
  metricId: string,
  onUpdate: (point: DataPoint) => void,
  intervalMs = 3000
): () => void {
  const metric = INITIAL_METRICS.find((m) => m.id === metricId)
  if (!metric) return () => {}

  let lastValue = metric.value
  const variance = VARIANCE[metricId] ?? 10

  const startDelay = Math.floor(Math.random() * Math.min(intervalMs, 1000))
  let intervalId: ReturnType<typeof setInterval> | null = null

  const timeoutId = setTimeout(() => {
    intervalId = setInterval(() => {
      const point = nextDataPoint(lastValue, variance)
      lastValue = point.v
      onUpdate(point)
    }, intervalMs)
  }, startDelay)

  // return the cleanup function — caller decides when to stop
  return () => {
    clearTimeout(timeoutId)
    if (intervalId !== null) clearInterval(intervalId)
  }
}