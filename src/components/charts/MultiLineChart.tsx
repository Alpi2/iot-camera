import { lazy, Suspense } from "react";

// Lazy load recharts for multi-line charts
const RechartsMultiLineChart = lazy(() =>
  import("recharts").then((module) => ({
    default: ({
      data,
      lines,
      height = 300,
    }: {
      data: any[];
      lines: { dataKey: string; stroke: string; name: string }[];
      height?: number;
    }) => {
      const {
        LineChart,
        Line,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        ResponsiveContainer,
        Legend,
      } = module;
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="time"
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#6b7280" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Legend />
            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                stroke={line.stroke}
                name={line.name}
                strokeWidth={2}
                dot={{ fill: line.stroke, r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      );
    },
  }))
);

const ChartLoader = () => (
  <div className="flex items-center justify-center h-full w-full min-h-[300px]">
    <div className="text-center">
      <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-blue-600 border-r-transparent"></div>
      <p className="mt-2 text-sm text-gray-500">Loading chart...</p>
    </div>
  </div>
);

interface MultiLineChartProps {
  data: any[];
  lines: { dataKey: string; stroke: string; name: string }[];
  height?: number;
}

export default function MultiLineChart(props: MultiLineChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <RechartsMultiLineChart {...props} />
    </Suspense>
  );
}

export { MultiLineChart };
