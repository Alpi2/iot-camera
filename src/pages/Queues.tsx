import { Users, Clock, TrendingUp } from "lucide-react";
import ChartContainer from "../components/ChartContainer";
import StatusBadge from "../components/StatusBadge";
import AlertListItem, { Alert } from "../components/AlertListItem";
import MultiLineChart from "../components/charts/MultiLineChart";

interface Queue {
  id: string;
  name: string;
  loadLevel: number;
  waitTime: number;
  status: "success" | "warning" | "error";
  peopleCount: number;
}

const queues: Queue[] = [
  {
    id: "queue-a",
    name: "Queue A - Main Entrance",
    loadLevel: 85,
    waitTime: 28,
    status: "warning",
    peopleCount: 342,
  },
  {
    id: "queue-b",
    name: "Queue B - VIP Entrance",
    loadLevel: 45,
    waitTime: 8,
    status: "success",
    peopleCount: 89,
  },
  {
    id: "queue-c",
    name: "Queue C - East Gate",
    loadLevel: 92,
    waitTime: 35,
    status: "error",
    peopleCount: 456,
  },
  {
    id: "queue-d",
    name: "Queue D - South Gate",
    loadLevel: 62,
    waitTime: 15,
    status: "success",
    peopleCount: 187,
  },
];

const queueLengthData = [
  { time: "08:00", queueA: 120, queueB: 45, queueC: 180, queueD: 90 },
  { time: "09:00", queueA: 280, queueB: 65, queueC: 320, queueD: 150 },
  { time: "10:00", queueA: 340, queueB: 82, queueC: 420, queueD: 180 },
  { time: "11:00", queueA: 320, queueB: 78, queueC: 450, queueD: 165 },
  { time: "12:00", queueA: 280, queueB: 70, queueC: 380, queueD: 140 },
  { time: "13:00", queueA: 220, queueB: 55, queueC: 290, queueD: 110 },
  { time: "14:00", queueA: 180, queueB: 48, queueC: 240, queueD: 95 },
];

const queueAlerts: Alert[] = [
  {
    id: "qa-1",
    severity: "high",
    timestamp: "2:45 PM",
    location: "Queue C",
    description: "Queue capacity at 92% - recommend opening additional lanes",
    category: "Capacity",
  },
  {
    id: "qa-2",
    severity: "medium",
    timestamp: "2:30 PM",
    location: "Queue A",
    description: "Wait time increased to 28 minutes",
    category: "Wait Time",
  },
  {
    id: "qa-3",
    severity: "low",
    timestamp: "2:15 PM",
    location: "Queue B",
    description: "Optimal flow maintained",
    category: "Status",
  },
];

const lanes = [
  {
    id: "lane-1",
    name: "Lane 1",
    queue: "Queue A",
    active: true,
    throughput: 145,
  },
  {
    id: "lane-2",
    name: "Lane 2",
    queue: "Queue A",
    active: true,
    throughput: 132,
  },
  {
    id: "lane-3",
    name: "Lane 3",
    queue: "Queue B",
    active: true,
    throughput: 89,
  },
  {
    id: "lane-4",
    name: "Lane 4",
    queue: "Queue C",
    active: true,
    throughput: 156,
  },
  {
    id: "lane-5",
    name: "Lane 5",
    queue: "Queue C",
    active: true,
    throughput: 143,
  },
  {
    id: "lane-6",
    name: "Lane 6",
    queue: "Queue C",
    active: false,
    throughput: 0,
  },
];

export default function Queues() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Queue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {queues.map((queue) => (
          <div
            key={queue.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <StatusBadge status={queue.status} />
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-900 mb-1">{queue.name}</div>
              <div className="text-2xl text-gray-900">{queue.peopleCount}</div>
              <div className="text-xs text-gray-500">people in queue</div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <span>Load Level</span>
                  <span>{queue.loadLevel}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      queue.loadLevel > 80
                        ? "bg-red-500"
                        : queue.loadLevel > 60
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: `${queue.loadLevel}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Clock className="w-3 h-3" />
                <span>Est. wait: {queue.waitTime} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Queue Heatmap */}
        <div className="lg:col-span-1">
          <ChartContainer title="Queue Heatmap">
            <div className="space-y-3">
              {queues.map((queue) => (
                <div key={queue.id} className="flex items-center gap-3">
                  <div className="w-20 text-xs text-gray-600">
                    {queue.name.split(" - ")[0]}
                  </div>
                  <div className="flex-1 h-12 relative rounded-lg overflow-hidden border border-gray-200">
                    <div
                      className={`absolute inset-y-0 left-0 ${
                        queue.loadLevel > 80
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : queue.loadLevel > 60
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-400"
                          : "bg-gradient-to-r from-green-500 to-green-400"
                      }`}
                      style={{ width: `${queue.loadLevel}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-900">
                      {queue.loadLevel}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Queue Length Chart */}
        <div className="lg:col-span-2">
          <ChartContainer title="Queue Length Over Time">
            <MultiLineChart
              data={queueLengthData}
              lines={[
                { dataKey: "queueA", stroke: "#3b82f6", name: "Queue A" },
                { dataKey: "queueB", stroke: "#10b981", name: "Queue B" },
                { dataKey: "queueC", stroke: "#f59e0b", name: "Queue C" },
                { dataKey: "queueD", stroke: "#8b5cf6", name: "Queue D" },
              ]}
              height={280}
            />
          </ChartContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Queue Lanes */}
        <ChartContainer title="Queue Lanes Status">
          <div className="grid grid-cols-2 gap-4">
            {lanes.map((lane) => (
              <div
                key={lane.id}
                className={`p-4 rounded-lg border-2 ${
                  lane.active
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-gray-900">{lane.name}</div>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      lane.active ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="text-xs text-gray-600 mb-2">{lane.queue}</div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-gray-500" />
                  <span className="text-xs text-gray-600">
                    {lane.throughput}/hr
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartContainer>

        {/* Queue Alerts */}
        <ChartContainer title="Queue Alerts">
          <div className="space-y-3">
            {queueAlerts.map((alert) => (
              <AlertListItem key={alert.id} alert={alert} />
            ))}
          </div>
        </ChartContainer>
      </div>
    </div>
  );
}
