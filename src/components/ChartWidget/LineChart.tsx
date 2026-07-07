import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DataPoint } from "@/types/metrics";
import type { ChartConfig } from "@/types/metrics";

type LineConfig = Extract<ChartConfig, { kind: "line" }>;

interface LineChartProps {
  data: DataPoint[];
  config: LineConfig;
  bounds?: { min: number; max: number };
  onPointHover?: (point: DataPoint) => void;
}

export function LineChart({
  data,
  config,
  bounds,
  onPointHover,
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <RechartsLineChart
        data={data}
        onMouseMove={(nextState) => {
          const raw = (nextState as { activePayload?: Array<{ payload?: DataPoint }> })?.activePayload?.[0];
          if (raw?.payload && onPointHover) {
            onPointHover(raw.payload);
          }
        }}
      >
        <XAxis
          dataKey="t"
          tickFormatter={(t) => new Date(t).toLocaleTimeString()}
          tick={{ fontSize: 10 }}
          tickLine={false}
        />
        <YAxis
          domain={bounds ? [bounds.min, bounds.max] : ["auto", "auto"]}
          tick={{ fontSize: 10 }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
        <Tooltip labelFormatter={(t) => new Date(t).toLocaleTimeString()} />
        <Line
          type={config.smooth ? "monotone" : "linear"}
          dataKey="v"
          stroke="#378ADD"
          strokeWidth={2}
          dot={config.showDots ? { r: 3 } : false}
          activeDot={{ r: 5 }}
          isAnimationActive={false} // ← turn off animation for live data
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
