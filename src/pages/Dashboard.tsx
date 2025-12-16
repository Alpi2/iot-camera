import { Users, TrendingUp, AlertTriangle, Clock, MapPin } from "lucide-react";
import MetricCard from "../components/MetricCard";
import ChartContainer from "../components/ChartContainer";
import AlertListItem, { Alert } from "../components/AlertListItem";
import Timeline, { TimelineEvent } from "../components/Timeline";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";

const gateFlowData = [
  { time: "08:00", flow: 120 },
  { time: "09:00", flow: 340 },
  { time: "10:00", flow: 580 },
  { time: "11:00", flow: 720 },
  { time: "12:00", flow: 890 },
  { time: "13:00", flow: 650 },
  { time: "14:00", flow: 480 },
];

const queueLoadData = [
  { time: "08:00", load: 25 },
  { time: "09:00", load: 45 },
  { time: "10:00", load: 72 },
  { time: "11:00", load: 88 },
  { time: "12:00", load: 65 },
  { time: "13:00", load: 48 },
  { time: "14:00", load: 32 },
];

const alerts: Alert[] = [
  {
    id: "1",
    severity: "high",
    timestamp: "2:45 PM",
    location: "North Gate A",
    description: "Crowd density exceeding safety threshold",
  },
  {
    id: "2",
    severity: "medium",
    timestamp: "2:32 PM",
    location: "Queue C",
    description: "Wait time increased to 28 minutes",
  },
  {
    id: "3",
    severity: "low",
    timestamp: "2:15 PM",
    location: "East Gate",
    description: "Minor scanner malfunction resolved",
  },
];

const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    time: "08:00",
    title: "Gates Open",
    description: "All entry points operational",
    type: "success",
  },
  {
    id: "2",
    time: "10:30",
    title: "Peak Arrival",
    description: "Maximum inflow detected",
    type: "info",
  },
  {
    id: "3",
    time: "12:15",
    title: "Queue Alert",
    description: "Queue C wait time spike",
    type: "warning",
  },
  {
    id: "4",
    time: "14:45",
    title: "Crowd Issue",
    description: "North Gate density alert",
    type: "error",
  },
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Visitors"
          value="47,892"
          icon={Users}
          trend={{ value: 12.5, direction: "up" }}
        />
        <MetricCard
          title="Gate Flow Rate"
          value="1,240/hr"
          icon={TrendingUp}
          trend={{ value: 8.3, direction: "up" }}
        />
        <MetricCard
          title="Active Alerts"
          value="12"
          icon={AlertTriangle}
          trend={{ value: 3, direction: "down" }}
        />
        <MetricCard
          title="Queue Load Index"
          value="68%"
          icon={Clock}
          subtitle="Average across all queues"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Arena Mini Map */}
        <div className="lg:col-span-1">
          <ChartContainer title="Crowd Density Heatmap">
            <div className="relative aspect-square bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-gray-200 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-gray-400" />
              </div>
              {/* Heatmap placeholder zones */}
              <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-red-400 rounded-full opacity-40 blur-xl"></div>
              <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-yellow-400 rounded-full opacity-40 blur-xl"></div>
              <div className="absolute bottom-1/4 left-1/3 w-12 h-12 bg-green-400 rounded-full opacity-40 blur-xl"></div>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-2 shadow-sm">
                <div className="flex gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-400 rounded"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                    <span>Med</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-400 rounded"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </ChartContainer>
        </div>

        {/* Live Alerts Feed */}
        <div className="lg:col-span-2">
          <ChartContainer title="Live Alerts Feed">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <AlertListItem key={alert.id} alert={alert} />
              ))}
            </div>
          </ChartContainer>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="mb-6">
        <ChartContainer title="Event Timeline">
          <Timeline events={timelineEvents} orientation="horizontal" />
        </ChartContainer>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer title="Gate Flow Over Time">
          <LineChart
            data={gateFlowData}
            dataKey="flow"
            stroke="#3b82f6"
            height={240}
          />
        </ChartContainer>

        <ChartContainer title="Queue Load Trend">
          <BarChart
            data={queueLoadData}
            dataKey="load"
            fill="#8b5cf6"
            height={240}
          />
        </ChartContainer>
      </div>
    </div>
  );
}
