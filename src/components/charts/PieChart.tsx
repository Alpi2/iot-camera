import { lazy, Suspense } from "react";

// Lazy load recharts
const RechartsPieChart = lazy(() =>
  import("recharts").then((module) => ({
    default: ({
      data,
      dataKey,
      height = 300,
      colors,
    }: {
      data: any[];
      dataKey: string;
      height?: number;
      colors?: string[];
    }) => {
      const { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } =
        module;

      const defaultColors = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
      ];
      const chartColors = colors || defaultColors;

      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey={dataKey}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "none", // Çerçeveyi kaldırdık, daha modern durur
                borderRadius: "8px",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", // Hafif gölge ekledik
              }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
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

interface PieChartProps {
  data: any[];
  dataKey: string;
  height?: number;
  colors?: string[];
}

export default function PieChart(props: PieChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <RechartsPieChart {...props} />
    </Suspense>
  );
}

export { PieChart };
