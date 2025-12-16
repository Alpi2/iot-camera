import { useState } from "react";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  DoorOpen,
} from "lucide-react";
import ChartContainer from "../components/ChartContainer";
import StatusBadge from "../components/StatusBadge";
import LineChart from "../components/charts/LineChart";
import MultiBarChart from "../components/charts/MultiBarChart";

interface Gate {
  id: string;
  name: string;
  status: "success" | "warning" | "error";
  inCount: number;
  outCount: number;
  changePercent: number;
  chartData: { time: string; value: number }[];
}

const gates: Gate[] = [
  {
    id: "gate-a",
    name: "North Gate A",
    status: "success",
    inCount: 8234,
    outCount: 1205,
    changePercent: 12.4,
    chartData: [
      { time: "08", value: 120 },
      { time: "09", value: 340 },
      { time: "10", value: 580 },
      { time: "11", value: 720 },
      { time: "12", value: 890 },
      { time: "13", value: 650 },
    ],
  },
  {
    id: "gate-b",
    name: "North Gate B",
    status: "success",
    inCount: 7891,
    outCount: 982,
    changePercent: 8.7,
    chartData: [
      { time: "08", value: 100 },
      { time: "09", value: 310 },
      { time: "10", value: 520 },
      { time: "11", value: 680 },
      { time: "12", value: 820 },
      { time: "13", value: 590 },
    ],
  },
  {
    id: "gate-c",
    name: "East Gate",
    status: "warning",
    inCount: 5632,
    outCount: 745,
    changePercent: -5.2,
    chartData: [
      { time: "08", value: 90 },
      { time: "09", value: 250 },
      { time: "10", value: 380 },
      { time: "11", value: 420 },
      { time: "12", value: 480 },
      { time: "13", value: 380 },
    ],
  },
  {
    id: "gate-d",
    name: "South Gate",
    status: "success",
    inCount: 6789,
    outCount: 1123,
    changePercent: 15.3,
    chartData: [
      { time: "08", value: 110 },
      { time: "09", value: 290 },
      { time: "10", value: 450 },
      { time: "11", value: 590 },
      { time: "12", value: 720 },
      { time: "13", value: 620 },
    ],
  },
];

const analyticsData = [
  { gate: "North A", inflow: 8234, outflow: 1205 },
  { gate: "North B", inflow: 7891, outflow: 982 },
  { gate: "East", inflow: 5632, outflow: 745 },
  { gate: "South", inflow: 6789, outflow: 1123 },
  { gate: "West", inflow: 6234, outflow: 890 },
];

export default function Gates() {
  const [selectedGate, setSelectedGate] = useState<string | null>(null);

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <span className="text-sm text-gray-700">All Gates</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <span className="text-sm text-gray-700">Last 4 Hours</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
          <span className="text-sm text-gray-700">All Status</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Gate List Panel */}
        <div className="lg:col-span-1 space-y-4">
          {gates.map((gate) => (
            <div
              key={gate.id}
              onClick={() => setSelectedGate(gate.id)}
              className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all ${
                selectedGate === gate.id
                  ? "border-blue-500 ring-2 ring-blue-100"
                  : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <DoorOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900">{gate.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      Gate ID: {gate.id}
                    </div>
                  </div>
                </div>
                <StatusBadge status={gate.status} />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <ArrowDownRight className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-gray-500">In</span>
                  </div>
                  <div className="text-xl text-gray-900">
                    {gate.inCount.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <ArrowUpRight className="w-3 h-3 text-orange-600" />
                    <span className="text-xs text-gray-500">Out</span>
                  </div>
                  <div className="text-xl text-gray-900">
                    {gate.outCount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <LineChart
                  data={gate.chartData}
                  dataKey="value"
                  stroke="#3b82f6"
                  height={60}
                />
              </div>

              <div
                className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs ${
                  gate.changePercent > 0
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {gate.changePercent > 0 ? "+" : ""}
                {gate.changePercent}% vs yesterday
              </div>
            </div>
          ))}
        </div>

        {/* Gate Analytics Area */}
        <div className="lg:col-span-2 space-y-6">
          <ChartContainer title="Gate Analytics - Inflow vs Outflow">
            <MultiBarChart
              data={analyticsData}
              bars={[
                { dataKey: "inflow", fill: "#3b82f6", name: "Inflow" },
                { dataKey: "outflow", fill: "#f59e0b", name: "Outflow" },
              ]}
              height={320}
            />
          </ChartContainer>

          {selectedGate && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-gray-900 mb-4">Gate Details</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    Selected Gate
                  </div>
                  <div className="text-lg text-gray-900">
                    {gates.find((g) => g.id === selectedGate)?.name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">Status</div>
                  <StatusBadge
                    status={
                      gates.find((g) => g.id === selectedGate)?.status ||
                      "success"
                    }
                  />
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    Total Throughput
                  </div>
                  <div className="text-lg text-gray-900">
                    {(
                      (gates.find((g) => g.id === selectedGate)?.inCount || 0) +
                      (gates.find((g) => g.id === selectedGate)?.outCount || 0)
                    ).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-2">
                    Average Flow Rate
                  </div>
                  <div className="text-lg text-gray-900">1,240/hr</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
