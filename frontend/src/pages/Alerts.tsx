import { useState } from "react";
import { Filter, ChevronDown, X } from "lucide-react";
import ChartContainer from "../components/ChartContainer";
import AlertListItem, { Alert } from "../components/AlertListItem";
import Timeline, { TimelineEvent } from "../components/Timeline";
import PieChart from "../components/charts/PieChart";

const allAlerts: Alert[] = [
  {
    id: "alert-1",
    severity: "high",
    timestamp: "2:45 PM",
    location: "North Gate A",
    description:
      "Crowd density exceeding safety threshold - immediate action required",
    category: "Crowd Safety",
  },
  {
    id: "alert-2",
    severity: "high",
    timestamp: "2:42 PM",
    location: "Queue C",
    description: "Queue capacity at 92% - recommend opening additional lanes",
    category: "Queue Management",
  },
  {
    id: "alert-3",
    severity: "medium",
    timestamp: "2:32 PM",
    location: "East Gate",
    description: "Scanner malfunction detected - backup scanner activated",
    category: "Equipment",
  },
  {
    id: "alert-4",
    severity: "medium",
    timestamp: "2:28 PM",
    location: "Queue A",
    description: "Wait time increased to 28 minutes",
    category: "Queue Management",
  },
  {
    id: "alert-5",
    severity: "low",
    timestamp: "2:15 PM",
    location: "South Gate",
    description: "Traffic flow normalized after peak period",
    category: "Flow Control",
  },
  {
    id: "alert-6",
    severity: "low",
    timestamp: "2:10 PM",
    location: "West Gate",
    description: "Maintenance check completed successfully",
    category: "Maintenance",
  },
  {
    id: "alert-7",
    severity: "medium",
    timestamp: "1:58 PM",
    location: "North Gate B",
    description: "Staff break rotation causing temporary slowdown",
    category: "Operations",
  },
  {
    id: "alert-8",
    severity: "high",
    timestamp: "1:45 PM",
    location: "Central Plaza",
    description: "Emergency medical response in progress",
    category: "Emergency",
  },
];

const categoryData = [
  { name: "Crowd Safety", value: 3, color: "#ef4444" },
  { name: "Queue Management", value: 5, color: "#f59e0b" },
  { name: "Equipment", value: 2, color: "#3b82f6" },
  { name: "Operations", value: 4, color: "#8b5cf6" },
  { name: "Emergency", value: 1, color: "#dc2626" },
];

const incidentTimeline: TimelineEvent[] = [
  {
    id: "timeline-1",
    time: "1:45 PM",
    title: "Emergency Medical Response",
    description: "Medical team dispatched to Central Plaza",
    type: "error",
  },
  {
    id: "timeline-2",
    time: "2:10 PM",
    title: "Patient Stabilized",
    description: "Medical emergency resolved, transport initiated",
    type: "warning",
  },
  {
    id: "timeline-3",
    time: "2:32 PM",
    title: "Equipment Alert",
    description: "Scanner malfunction at East Gate",
    type: "warning",
  },
  {
    id: "timeline-4",
    time: "2:42 PM",
    title: "Queue Capacity Alert",
    description: "Queue C approaching maximum capacity",
    type: "error",
  },
  {
    id: "timeline-5",
    time: "2:45 PM",
    title: "Crowd Density Warning",
    description: "North Gate A safety threshold exceeded",
    type: "error",
  },
];

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  const toggleSeverity = (severity: string) => {
    if (selectedSeverity.includes(severity)) {
      setSelectedSeverity(selectedSeverity.filter((s) => s !== severity));
    } else {
      setSelectedSeverity([...selectedSeverity, severity]);
    }
  };

  const filteredAlerts =
    selectedSeverity.length > 0
      ? allAlerts.filter((alert) => selectedSeverity.includes(alert.severity))
      : allAlerts;

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Filter Bar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Severity:</span>
            <button
              onClick={() => toggleSeverity("high")}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                selectedSeverity.includes("high")
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-red-300"
              }`}
            >
              High
            </button>
            <button
              onClick={() => toggleSeverity("medium")}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                selectedSeverity.includes("medium")
                  ? "bg-yellow-500 text-white border-yellow-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-yellow-300"
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => toggleSeverity("low")}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                selectedSeverity.includes("low")
                  ? "bg-gray-500 text-white border-gray-500"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
              }`}
            >
              Low
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <span className="text-xs text-gray-700">All Categories</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <button className="flex items-center gap-2 px-3 py-1 bg-white rounded-lg border border-gray-200 hover:bg-gray-50">
            <span className="text-xs text-gray-700">Last 24 Hours</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {selectedSeverity.length > 0 && (
            <button
              onClick={() => setSelectedSeverity([])}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-900"
            >
              <X className="w-3 h-3" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Alerts List */}
        <div className="lg:col-span-2">
          <ChartContainer title={`Alerts (${filteredAlerts.length})`}>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredAlerts.map((alert) => (
                <AlertListItem
                  key={alert.id}
                  alert={alert}
                  onClick={() => setSelectedAlert(alert)}
                />
              ))}
            </div>
          </ChartContainer>
        </div>

        {/* Alerts by Category */}
        <div>
          <ChartContainer title="Alerts by Category">
            <PieChart data={categoryData} dataKey="value" />
          </ChartContainer>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="mb-6">
        <ChartContainer title="Incident Chronology">
          <Timeline events={incidentTimeline} orientation="vertical" />
        </ChartContainer>
      </div>

      {/* Alert Details Drawer */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
          <div className="bg-white w-full max-w-md h-full shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl text-gray-900">Alert Details</h2>
                <button
                  onClick={() => setSelectedAlert(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Severity</div>
                  <div>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                        selectedAlert.severity === "high"
                          ? "bg-red-100 text-red-700"
                          : selectedAlert.severity === "medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedAlert.severity.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Description</div>
                  <div className="text-gray-900">
                    {selectedAlert.description}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Location</div>
                  <div className="text-gray-900">{selectedAlert.location}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Time</div>
                  <div className="text-gray-900">{selectedAlert.timestamp}</div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Category</div>
                  <div className="text-gray-900">{selectedAlert.category}</div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Acknowledge Alert
                  </button>
                  <button className="w-full px-4 py-2 mt-2 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
                    Assign to Team
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
