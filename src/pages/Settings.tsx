import { useState } from "react";
import {
  Settings as SettingsIcon,
  Calendar,
  DoorOpen,
  Camera,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import ChartContainer from "../components/ChartContainer";

interface Event {
  id: string;
  name: string;
  date: string;
  venue: string;
  expectedAttendance: number;
  status: "active" | "upcoming" | "completed";
}

interface Gate {
  id: string;
  name: string;
  capacity: number;
  cameraIds: string[];
  status: "active" | "inactive";
}

interface CameraConfig {
  id: string;
  name: string;
  rtspUrl: string;
  type: "Entry Point" | "Queue Monitor" | "Crowd Density" | "General";
  location: string;
  objectDetectionEnabled: boolean;
  status: "online" | "offline";
}

type TabType = "events" | "gates" | "cameras";

export default function Settings() {
  const [activeTab, setActiveTab] = useState<TabType>("events");
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGateForm, setShowGateForm] = useState(false);
  const [showCameraForm, setShowCameraForm] = useState(false);

  // Events State
  const [events, setEvents] = useState<Event[]>([
    {
      id: "evt_001",
      name: "Summer Music Festival 2025",
      date: "2025-12-12",
      venue: "Central Stadium",
      expectedAttendance: 50000,
      status: "active",
    },
  ]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    name: "",
    date: "",
    venue: "",
    expectedAttendance: 0,
    status: "upcoming",
  });

  // Gates State
  const [gates, setGates] = useState<Gate[]>([
    {
      id: "north_gate_a",
      name: "North Gate A",
      capacity: 1000,
      cameraIds: ["CAM_01", "CAM_02"],
      status: "active",
    },
    {
      id: "north_gate_b",
      name: "North Gate B",
      capacity: 1000,
      cameraIds: ["CAM_03"],
      status: "active",
    },
  ]);
  const [newGate, setNewGate] = useState<Partial<Gate>>({
    id: "",
    name: "",
    capacity: 1000,
    cameraIds: [],
    status: "active",
  });

  // Cameras State
  const [cameras, setCameras] = useState<CameraConfig[]>([
    {
      id: "CAM_NORTH_GATE_A_01",
      name: "North Gate A - Camera 1",
      rtspUrl: "rtsp://192.168.1.100:554/stream",
      type: "Entry Point",
      location: "North Gate A",
      objectDetectionEnabled: true,
      status: "online",
    },
    {
      id: "CAM_NORTH_GATE_A_02",
      name: "North Gate A - Camera 2",
      rtspUrl: "rtsp://192.168.1.101:554/stream",
      type: "Queue Monitor",
      location: "North Gate A",
      objectDetectionEnabled: true,
      status: "online",
    },
  ]);
  const [newCamera, setNewCamera] = useState<Partial<CameraConfig>>({
    id: "",
    name: "",
    rtspUrl: "",
    type: "Entry Point",
    location: "",
    objectDetectionEnabled: true,
    status: "online",
  });

  // Event Handlers
  const handleCreateEvent = () => {
    if (newEvent.name && newEvent.date && newEvent.venue) {
      const event: Event = {
        id: `evt_${Date.now()}`,
        name: newEvent.name,
        date: newEvent.date,
        venue: newEvent.venue,
        expectedAttendance: newEvent.expectedAttendance || 0,
        status: newEvent.status as "active" | "upcoming" | "completed",
      };
      setEvents([...events, event]);
      setNewEvent({
        name: "",
        date: "",
        venue: "",
        expectedAttendance: 0,
        status: "upcoming",
      });
      setShowEventForm(false);
    }
  };

  const handleCreateGate = () => {
    if (newGate.id && newGate.name) {
      const gate: Gate = {
        id: newGate.id,
        name: newGate.name,
        capacity: newGate.capacity || 1000,
        cameraIds: newGate.cameraIds || [],
        status: newGate.status as "active" | "inactive",
      };
      setGates([...gates, gate]);
      setNewGate({
        id: "",
        name: "",
        capacity: 1000,
        cameraIds: [],
        status: "active",
      });
      setShowGateForm(false);
    }
  };

  const handleCreateCamera = () => {
    if (newCamera.id && newCamera.name && newCamera.rtspUrl) {
      const camera: CameraConfig = {
        id: newCamera.id,
        name: newCamera.name,
        rtspUrl: newCamera.rtspUrl,
        type: newCamera.type as CameraConfig["type"],
        location: newCamera.location || "",
        objectDetectionEnabled: newCamera.objectDetectionEnabled ?? true,
        status: newCamera.status as "online" | "offline",
      };
      setCameras([...cameras, camera]);
      setNewCamera({
        id: "",
        name: "",
        rtspUrl: "",
        type: "Entry Point",
        location: "",
        objectDetectionEnabled: true,
        status: "online",
      });
      setShowCameraForm(false);
    }
  };

  const handleDeleteEvent = (id: string) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleDeleteGate = (id: string) => {
    setGates(gates.filter((g) => g.id !== id));
  };

  const handleDeleteCamera = (id: string) => {
    setCameras(cameras.filter((c) => c.id !== id));
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl text-gray-900">Configuration & Settings</h1>
        </div>
        <p className="text-gray-600">
          Manage your events, gates, and camera configurations
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "events"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </button>
        <button
          onClick={() => setActiveTab("gates")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "gates"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <DoorOpen className="w-4 h-4" />
          <span>Gates</span>
        </button>
        <button
          onClick={() => setActiveTab("cameras")}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
            activeTab === "cameras"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Cameras</span>
        </button>
      </div>

      {/* Events Tab */}
      {activeTab === "events" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Event Management</h2>
            <button
              onClick={() => setShowEventForm(!showEventForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Create New Event
            </button>
          </div>

          {showEventForm && (
            <ChartContainer title="Create New Event" className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={newEvent.name}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, name: e.target.value })
                    }
                    placeholder="Summer Music Festival 2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Venue
                  </label>
                  <input
                    type="text"
                    value={newEvent.venue}
                    onChange={(e) =>
                      setNewEvent({ ...newEvent, venue: e.target.value })
                    }
                    placeholder="Central Stadium"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Expected Attendance
                  </label>
                  <input
                    type="number"
                    value={newEvent.expectedAttendance}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        expectedAttendance: parseInt(e.target.value),
                      })
                    }
                    placeholder="50000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCreateEvent}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save Event
                </button>
                <button
                  onClick={() => setShowEventForm(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </ChartContainer>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900">{event.name}</h3>
                      <p className="text-sm text-gray-500">{event.venue}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs ${
                      event.status === "active"
                        ? "bg-green-50 text-green-700"
                        : event.status === "upcoming"
                        ? "bg-blue-50 text-blue-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Date:</span>
                    <span className="text-gray-900">{event.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expected Attendance:</span>
                    <span className="text-gray-900">
                      {event.expectedAttendance.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gates Tab */}
      {activeTab === "gates" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Gate Configuration</h2>
            <button
              onClick={() => setShowGateForm(!showGateForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Gate
            </button>
          </div>

          {showGateForm && (
            <ChartContainer title="Add New Gate" className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Gate ID
                  </label>
                  <input
                    type="text"
                    value={newGate.id}
                    onChange={(e) =>
                      setNewGate({ ...newGate, id: e.target.value })
                    }
                    placeholder="north_gate_a"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Gate Name
                  </label>
                  <input
                    type="text"
                    value={newGate.name}
                    onChange={(e) =>
                      setNewGate({ ...newGate, name: e.target.value })
                    }
                    placeholder="North Gate A"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Capacity (per hour)
                  </label>
                  <input
                    type="number"
                    value={newGate.capacity}
                    onChange={(e) =>
                      setNewGate({
                        ...newGate,
                        capacity: parseInt(e.target.value),
                      })
                    }
                    placeholder="1000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Camera IDs (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newGate.cameraIds?.join(", ")}
                    onChange={(e) =>
                      setNewGate({
                        ...newGate,
                        cameraIds: e.target.value
                          .split(",")
                          .map((s) => s.trim()),
                      })
                    }
                    placeholder="CAM_01, CAM_02"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCreateGate}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save Gate
                </button>
                <button
                  onClick={() => setShowGateForm(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </ChartContainer>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gates.map((gate) => (
              <div
                key={gate.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                      <DoorOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-900">{gate.name}</h3>
                      <p className="text-sm text-gray-500">ID: {gate.id}</p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs ${
                      gate.status === "active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {gate.status}
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Capacity:</span>
                    <span className="text-gray-900">{gate.capacity}/hour</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Cameras:</span>
                    <span className="text-gray-900">
                      {gate.cameraIds.join(", ")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteGate(gate.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cameras Tab */}
      {activeTab === "cameras" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-900">Camera Configuration</h2>
            <button
              onClick={() => setShowCameraForm(!showCameraForm)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Camera
            </button>
          </div>

          {showCameraForm && (
            <ChartContainer title="Add New Camera" className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Camera ID
                  </label>
                  <input
                    type="text"
                    value={newCamera.id}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, id: e.target.value })
                    }
                    placeholder="CAM_NORTH_GATE_A_01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Camera Name
                  </label>
                  <input
                    type="text"
                    value={newCamera.name}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, name: e.target.value })
                    }
                    placeholder="North Gate A - Camera 1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-700 mb-2">
                    RTSP URL
                  </label>
                  <input
                    type="text"
                    value={newCamera.rtspUrl}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, rtspUrl: e.target.value })
                    }
                    placeholder="rtsp://192.168.1.100:554/stream"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newCamera.type}
                    onChange={(e) =>
                      setNewCamera({
                        ...newCamera,
                        type: e.target.value as CameraConfig["type"],
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="Entry Point">Entry Point</option>
                    <option value="Queue Monitor">Queue Monitor</option>
                    <option value="Crowd Density">Crowd Density</option>
                    <option value="General">General</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newCamera.location}
                    onChange={(e) =>
                      setNewCamera({ ...newCamera, location: e.target.value })
                    }
                    placeholder="North Gate A"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="objectDetection"
                    checked={newCamera.objectDetectionEnabled}
                    onChange={(e) =>
                      setNewCamera({
                        ...newCamera,
                        objectDetectionEnabled: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="objectDetection"
                    className="text-sm text-gray-700"
                  >
                    Enable Object Detection
                  </label>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleCreateCamera}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save Camera
                </button>
                <button
                  onClick={() => setShowCameraForm(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </ChartContainer>
          )}

          <div className="grid grid-cols-1 gap-4">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Camera className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-gray-900">{camera.name}</h3>
                          <p className="text-sm text-gray-500">
                            ID: {camera.id}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-xs ${
                              camera.status === "online"
                                ? "bg-green-50 text-green-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {camera.status}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md text-xs bg-blue-50 text-blue-700">
                            {camera.type}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <span className="text-xs text-gray-500">
                            RTSP URL:
                          </span>
                          <p className="text-sm text-gray-900 font-mono">
                            {camera.rtspUrl}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">
                            Location:
                          </span>
                          <p className="text-sm text-gray-900">
                            {camera.location}
                          </p>
                        </div>
                        <div>
                          <span className="text-xs text-gray-500">
                            Object Detection:
                          </span>
                          <p className="text-sm text-gray-900">
                            {camera.objectDetectionEnabled
                              ? "Enabled"
                              : "Disabled"}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteCamera(camera.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
