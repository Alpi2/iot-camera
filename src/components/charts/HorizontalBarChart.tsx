import { lazy, Suspense } from "react";

// Lazy load recharts
const RechartsHorizontalBarChart = lazy(() =>
  import("recharts").then((module) => ({
    default: ({
      data,
      dataKey,
      nameKey,
      fill,
      height = 300,
    }: {
      data: any[];
      dataKey: string;
      nameKey: string;
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
        Cell,
      } = module;

      // Color function based on uptime percentage
      const getBarColor = (value: number, baseColor: string) => {
        if (value >= 98) return baseColor;
        if (value >= 95) return "#f59e0b"; // yellow/orange for warning
        return "#ef4444"; // red for low uptime
      };

      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            layout="vertical" /* <-- DÜZELTME BURADA: 'horizontal' yerine 'vertical' olmalı */
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            {/* horizontal={false} ekleyerek sadece dikey çizgiler görünmesini sağladık, daha şık durur */}
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis
              type="category"
              dataKey={nameKey}
              stroke="#6b7280"
              style={{ fontSize: "12px" }}
              width={100} /* İsimlerin sığması için genişliği biraz artırdım */
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`${value}%`, "Uptime"]}
            />
            <Bar
              dataKey={dataKey}
              fill={fill || "#3b82f6"}
              radius={[0, 4, 4, 0]} /* Görsellik için radius ayarlandı */
              barSize={20} /* Çubukların çok kalın olmaması için */
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(entry[dataKey], fill || "#3b82f6")}
                />
              ))}
            </Bar>
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

interface HorizontalBarChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  fill?: string;
  height?: number;
}

export default function HorizontalBarChart(props: HorizontalBarChartProps) {
  return (
    <Suspense fallback={<ChartLoader />}>
      <RechartsHorizontalBarChart {...props} />
    </Suspense>
  );
}

export { HorizontalBarChart };
