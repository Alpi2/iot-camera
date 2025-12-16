import {
  Users,
  Clock,
  TrendingUp,
  AlertTriangle,
  Download,
  FileText,
  Lightbulb,
} from "lucide-react";
import MetricCard from "../components/MetricCard";
import ChartContainer from "../components/ChartContainer";
import LineChart from "../components/charts/LineChart";
import MultiBarChart from "../components/charts/MultiBarChart";
import PieChart from "../components/charts/PieChart";

const attendanceData = [
  { time: "08:00", visitors: 1200 },
  { time: "09:00", visitors: 4500 },
  { time: "10:00", visitors: 8900 },
  { time: "11:00", visitors: 15600 },
  { time: "12:00", visitors: 24300 },
  { time: "13:00", visitors: 32100 },
  { time: "14:00", visitors: 38700 },
  { time: "15:00", visitors: 42500 },
  { time: "16:00", visitors: 45200 },
  { time: "17:00", visitors: 47200 },
  { time: "18:00", visitors: 47892 },
];

const gatePerformanceData = [
  { gate: "North A", entries: 8234, exits: 1205, efficiency: 92 },
  { gate: "North B", entries: 7891, exits: 982, efficiency: 88 },
  { gate: "East", entries: 5632, exits: 745, efficiency: 78 },
  { gate: "South", entries: 6789, exits: 1123, efficiency: 85 },
  { gate: "West", entries: 6234, exits: 890, efficiency: 82 },
];

const alertsDistribution = [
  { name: "Crowd Safety", value: 8, color: "#ef4444" },
  { name: "Queue Mgmt", value: 12, color: "#f59e0b" },
  { name: "Equipment", value: 5, color: "#3b82f6" },
  { name: "Operations", value: 9, color: "#8b5cf6" },
  { name: "Emergency", value: 2, color: "#dc2626" },
];

const insights = [
  {
    id: "insight-1",
    type: "peak",
    title: "Peak Attendance Period",
    description:
      "Maximum visitor influx occurred between 2:00 PM - 4:00 PM with 18,200 entries per hour.",
    impact: "high",
  },
  {
    id: "insight-2",
    type: "trend",
    title: "Gate Performance Variance",
    description:
      "North Gate A showed 15% higher efficiency compared to other gates due to optimized staff allocation.",
    impact: "medium",
  },
  {
    id: "insight-3",
    type: "bottleneck",
    title: "Queue Bottleneck Identified",
    description:
      "Queue C experienced wait times exceeding 30 minutes during peak hours, suggesting need for additional lanes.",
    impact: "high",
  },
  {
    id: "insight-4",
    type: "incident",
    title: "Medical Response Time",
    description:
      "Average emergency response time was 3.2 minutes, meeting safety standards.",
    impact: "low",
  },
];

const statistics = [
  { metric: "Total Visitors", value: "47,892", change: "+12.5% vs last event" },
  {
    metric: "Average Queue Wait Time",
    value: "18 min",
    change: "+3 min vs target",
  },
  { metric: "Gate Efficiency", value: "85%", change: "+5% vs last event" },
  { metric: "Total Alerts", value: "36", change: "-8 vs last event" },
  {
    metric: "Peak Concurrent Visitors",
    value: "28,450",
    change: "+2,100 vs capacity",
  },
  {
    metric: "Average Dwell Time",
    value: "4.2 hrs",
    change: "+0.5 hrs vs expected",
  },
];

export default function EventReport() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Export Buttons */}
      <div className="fixed top-20 right-6 flex gap-2 z-10">
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700">
          <Download className="w-4 h-4" />
          Export PDF
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700">
          <FileText className="w-4 h-4" />
          Export PPT
        </button>
      </div>

      {/* Hero Metrics */}
      <div className="mb-8">
        <h1 className="text-3xl text-gray-900 mb-2">
          Event Intelligence Summary
        </h1>
        <p className="text-gray-600 mb-6">
          Summer Music Festival 2025 - December 12, 2025
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Visitors"
            value="47,892"
            icon={Users}
            trend={{ value: 12.5, direction: "up" }}
          />
          <MetricCard
            title="Peak Time"
            value="2:00 PM"
            icon={Clock}
            subtitle="18,200 entries/hour"
          />
          <MetricCard
            title="Max Queue Load"
            value="92%"
            icon={TrendingUp}
            subtitle="Queue C at 2:45 PM"
          />
          <MetricCard
            title="Total Incidents"
            value="36"
            icon={AlertTriangle}
            trend={{ value: 18.2, direction: "down" }}
          />
        </div>
      </div>

      {/* Large Charts */}
      <div className="space-y-6 mb-6">
        <ChartContainer title="Cumulative Attendance Over Time">
          <LineChart
            data={attendanceData}
            dataKey="visitors"
            stroke="#3b82f6"
            height={320}
          />
        </ChartContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartContainer title="Gate Performance Comparison">
            <MultiBarChart
              data={gatePerformanceData}
              height={280}
              bars={[
                { dataKey: "entries", fill: "#3b82f6", name: "Entries" },
                { dataKey: "exits", fill: "#f59e0b", name: "Exits" },
              ]}
            />
          </ChartContainer>

          <ChartContainer title="Alerts Distribution by Category">
            <PieChart
              data={alertsDistribution}
              dataKey="value"
              height={280}
              colors={["#ef4444", "#f59e0b", "#3b82f6", "#8b5cf6", "#dc2626"]}
            />
          </ChartContainer>
        </div>
      </div>

      {/* AI Insights Module */}
      <div className="mb-6">
        <ChartContainer
          title="Key Insights & Recommendations"
          action={
            <div className="flex items-center gap-2 text-sm text-purple-600">
              <Lightbulb className="w-4 h-4" />
              <span>AI-Generated</span>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={`p-4 border-l-4 rounded-lg ${
                  insight.impact === "high"
                    ? "bg-red-50 border-red-500"
                    : insight.impact === "medium"
                    ? "bg-yellow-50 border-yellow-500"
                    : "bg-blue-50 border-blue-500"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm text-gray-900">{insight.title}</h4>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      insight.impact === "high"
                        ? "bg-red-100 text-red-700"
                        : insight.impact === "medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {insight.impact}
                  </span>
                </div>
                <p className="text-xs text-gray-600">{insight.description}</p>
              </div>
            ))}
          </div>
        </ChartContainer>
      </div>

      {/* Statistics Table */}
      <ChartContainer title="Event Statistics Summary">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Metric
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Value
                </th>
                <th className="text-left py-3 px-4 text-sm text-gray-600">
                  Comparison
                </th>
              </tr>
            </thead>
            <tbody>
              {statistics.map((stat, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {stat.metric}
                  </td>
                  <td className="py-3 px-4 text-gray-900">{stat.value}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {stat.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartContainer>
    </div>
  );
}
