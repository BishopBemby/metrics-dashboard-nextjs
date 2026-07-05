"use client";

import { ChartWidget } from "@/components/ChartWidget/ChartWidget";
import { DataPoint } from "@/types/metrics";

const mockData: DataPoint[] = [
  { t: 1, v: 120 },
  { t: 2, v: 132 },
  { t: 3, v: 101 },
];
export default function Home() {
  return (
    <main>
      <ChartWidget
        data={mockData}
        chartConfig={{ kind: "line", smooth: false, showDots: true }}
        xAccessor={(p) => p.t}
        yAccessor={(p) => p.v}
      />
    </main>
  );
}
