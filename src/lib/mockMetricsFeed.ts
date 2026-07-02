function generateDataPoint(prev: number): DataPoint {
  const drift = (Math.random() - 0.5) * 10;
  return { t: Date.now(), v: Math.max(0, prev + drift) };
}

export function subscribeMockMetric(
  metricId: string,
  onUpdate: (point: DataPoint) => void,
  intervalMs = 3000
) {
  let last = 100;
  const id = setInterval(() => {
    last = generateDataPoint(last).v;
    onUpdate({ t: Date.now(), v: last });
  }, intervalMs);
  return () => clearInterval(id);
}