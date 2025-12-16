import { lazy, Suspense } from "react";

// Lazy load recharts
const RechartsLineChart = lazy(() =>
  import("recharts").then((module) => ({
    default: ({
      data,
      dataKey,
      stroke,
      height = 300,
    }: {
      data: any[];
      dataKey: string;
      stroke?: string;
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
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={stroke || "#3b82f6"}
              strokeWidth={2}
              dot={{ fill: stroke || "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
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

interface LineChartProps {
  data: any[];
  dataKey: string;
  stroke?: string;
  height?: number;
}

export default function LineChart(props: LineChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <RechartsLineChart {...props} />
    </Suspense>
  );
}

export { LineChart };
