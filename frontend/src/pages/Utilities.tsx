import React from "react";
import { Zap, Droplet, Wifi, Wind, Thermometer, Circle } from "lucide-react";
import ChartContainer from "../components/ChartContainer";
import StatusBadge from "../components/StatusBadge";
import LazyLineChart from "../components/charts/LineChart";
import LazyHorizontalBarChart from "../components/charts/HorizontalBarChart";
import MultiLineChart from "../components/charts/MultiLineChart";

interface SystemStatus {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  status: "success" | "warning" | "error";
  value: string;
  unit: string;
  sparklineData: { value: number }[];
}

const systems: SystemStatus[] = [
  {
    id: "electricity",
    name: "Electricity",
    icon: Zap,
    status: "success",
    value: "87.5",
    unit: "kW",
    sparklineData: [
      { value: 65 },
      { value: 72 },
      { value: 78 },
      { value: 82 },
      { value: 85 },
      { value: 88 },
      { value: 87 },
    ],
  },
  {
    id: "water",
    name: "Water",
    icon: Droplet,
    status: "success",
    value: "45.2",
    unit: "L/min",
    sparklineData: [
      { value: 42 },
      { value: 44 },
      { value: 43 },
      { value: 46 },
      { value: 45 },
      { value: 47 },
      { value: 45 },
    ],
  },
  {
    id: "network",
    name: "Network",
    icon: Wifi,
    status: "warning",
    value: "92.3",
    unit: "% Uptime",
    sparklineData: [
      { value: 98 },
      { value: 97 },
      { value: 95 },
      { value: 90 },
      { value: 88 },
      { value: 91 },
      { value: 92 },
    ],
  },
  {
    id: "hvac",
    name: "HVAC",
    icon: Wind,
    status: "success",
    value: "22.5",
    unit: "°C",
    sparklineData: [
      { value: 23 },
      { value: 22 },
      { value: 23 },
      { value: 22 },
      { value: 23 },
      { value: 22 },
      { value: 22 },
    ],
  },
  {
    id: "sensors",
    name: "IoT Sensors",
    icon: Circle,
    status: "success",
    value: "247/250",
    unit: "Online",
    sparklineData: [
      { value: 245 },
      { value: 246 },
      { value: 247 },
      { value: 248 },
      { value: 247 },
      { value: 247 },
      { value: 247 },
    ],
  },
];

const networkUptimeData = [
  { device: "Gateway 1", uptime: 99.8 },
  { device: "Gateway 2", uptime: 98.5 },
  { device: "Gateway 3", uptime: 92.1 },
  { device: "Gateway 4", uptime: 99.2 },
  { device: "Gateway 5", uptime: 97.8 },
  { device: "Gateway 6", uptime: 99.9 },
  { device: "Gateway 7", uptime: 96.4 },
  { device: "Gateway 8", uptime: 98.1 },
];

const sensorUptimeData = [
  { zone: "North Entrance", uptime: 99.5 },
  { zone: "South Entrance", uptime: 98.8 },
  { zone: "East Wing", uptime: 97.2 },
  { zone: "West Wing", uptime: 99.1 },
  { zone: "Central Plaza", uptime: 98.5 },
  { zone: "VIP Area", uptime: 99.7 },
  { zone: "Queue Zone", uptime: 96.8 },
  { zone: "Food Court", uptime: 97.9 },
];

const environmentData = [
  { time: "08:00", temp: 22, humidity: 55 },
  { time: "09:00", temp: 23, humidity: 58 },
  { time: "10:00", temp: 24, humidity: 60 },
  { time: "11:00", temp: 25, humidity: 62 },
  { time: "12:00", temp: 26, humidity: 65 },
  { time: "13:00", temp: 25, humidity: 63 },
  { time: "14:00", temp: 24, humidity: 60 },
];

const iotDevices = [
  {
    id: "sensor-001",
    name: "Temperature Sensor 1",
    zone: "North Gate",
    status: "success",
    lastUpdate: "1 min ago",
  },
  {
    id: "sensor-002",
    name: "Crowd Counter 1",
    zone: "Main Entrance",
    status: "success",
    lastUpdate: "1 min ago",
  },
  {
    id: "sensor-003",
    name: "Air Quality Monitor",
    zone: "Central Plaza",
    status: "warning",
    lastUpdate: "5 min ago",
  },
  {
    id: "sensor-004",
    name: "Temperature Sensor 2",
    zone: "South Gate",
    status: "success",
    lastUpdate: "2 min ago",
  },
  {
    id: "sensor-005",
    name: "Humidity Sensor 1",
    zone: "East Wing",
    status: "success",
    lastUpdate: "1 min ago",
  },
  {
    id: "sensor-006",
    name: "Motion Detector 1",
    zone: "West Gate",
    status: "error",
    lastUpdate: "15 min ago",
  },
  {
    id: "sensor-007",
    name: "Crowd Counter 2",
    zone: "VIP Entrance",
    status: "success",
    lastUpdate: "1 min ago",
  },
  {
    id: "sensor-008",
    name: "Temperature Sensor 3",
    zone: "Queue Area",
    status: "success",
    lastUpdate: "2 min ago",
  },
];

export default function Utilities() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        {systems.map((system) => {
          const Icon = system.icon;
          return (
            <div
              key={system.id}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <StatusBadge status={system.status} />
              </div>
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">{system.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl text-gray-900">{system.value}</span>
                  <span className="text-xs text-gray-500">{system.unit}</span>
                </div>
              </div>
              <LazyLineChart
                data={system.sparklineData}
                dataKey="value"
                stroke="#3b82f6"
                height={40}
              />
            </div>
          );
        })}
      </div>

      {/* Environment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ChartContainer
          title="Environment Monitoring"
          className="lg:col-span-2"
        >
          <MultiLineChart
            data={environmentData}
            height={280}
            lines={[
              { dataKey: "temp", stroke: "#ef4444", name: "Temperature (°C)" },
              { dataKey: "humidity", stroke: "#3b82f6", name: "Humidity (%)" },
            ]}
          />
        </ChartContainer>

        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                <Thermometer className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Temperature</div>
                <div className="text-2xl text-gray-900">24°C</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>10°C</span>
              <span>40°C</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Humidity</div>
                <div className="text-2xl text-gray-900">60%</div>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 bg-blue-500 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network and Sensor Uptime */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartContainer title="Network Gateway Uptime">
          <LazyHorizontalBarChart
            data={networkUptimeData}
            dataKey="uptime"
            nameKey="device"
            fill="#10b981"
            height={320}
          />
        </ChartContainer>

        <ChartContainer title="Sensor Zone Uptime">
          <LazyHorizontalBarChart
            data={sensorUptimeData}
            dataKey="uptime"
            nameKey="zone"
            fill="#3b82f6"
            height={320}
          />
        </ChartContainer>
      </div>

      {/* IoT Device List */}
      <ChartContainer title="IoT Device Status">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {iotDevices.map((device) => (
            <div
              key={device.id}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      device.status === "success"
                        ? "bg-green-500"
                        : device.status === "warning"
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-900">{device.name}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-1">{device.zone}</div>
              <div className="text-xs text-gray-400">
                Updated {device.lastUpdate}
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </div>
  );
}
