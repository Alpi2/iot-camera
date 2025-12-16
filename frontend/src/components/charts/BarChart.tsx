import { lazy, Suspense } from "react";

// Lazy load recharts
const RechartsBarChart = lazy(() =>
  import("recharts").then((module) => ({
    default: ({
      data,
      dataKey,
      fill,
      height = 300,
    }: {
      data: any[];
      dataKey: string;
      fill?: string;
      height?: number;
    }) => {
      const {
        BarChart,
        Bar,
        XAxis,
        YAxis,
        CartesianGrid,
        Tooltip,
        ResponsiveContainer,
      } = module;
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
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
            <Bar
              dataKey={dataKey}
              fill={fill || "#3b82f6"}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
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

interface BarChartProps {
  data: any[];
  dataKey: string;
  fill?: string;
  height?: number;
}

export default function BarChart(props: BarChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <RechartsBarChart {...props} />
    </Suspense>
  );
}

export { BarChart };
