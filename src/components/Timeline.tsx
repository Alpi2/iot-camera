import { AlertCircle, CheckCircle, Clock } from "lucide-react";

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: "success" | "warning" | "error" | "info";
}

interface TimelineProps {
  events: TimelineEvent[];
  orientation?: "horizontal" | "vertical";
}

const getIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "warning":
      return <AlertCircle className="w-4 h-4 text-yellow-600" />;
    case "error":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4 text-blue-600" />;
  }
};

const getColor = (type: string) => {
  switch (type) {
    case "success":
      return "bg-green-100 border-green-200";
    case "warning":
      return "bg-yellow-100 border-yellow-200";
    case "error":
      return "bg-red-100 border-red-200";
    default:
      return "bg-blue-100 border-blue-200";
  }
};

export default function Timeline({
  events,
  orientation = "vertical",
}: TimelineProps) {
  if (orientation === "horizontal") {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {events.map((event, index) => (
          <div key={event.id} className="flex items-center gap-2">
            <div className="flex flex-col items-center min-w-[160px]">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getColor(
                  event.type
                )}`}
              >
                {getIcon(event.type)}
              </div>
              <div className="text-xs text-gray-500 mt-2">{event.time}</div>
              <div className="text-sm text-gray-900 mt-1 text-center">
                {event.title}
              </div>
            </div>
            {index < events.length - 1 && (
              <div className="w-12 h-0.5 bg-gray-200 mb-12" />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${getColor(
                event.type
              )}`}
            >
              {getIcon(event.type)}
            </div>
            {index < events.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 mt-2" />
            )}
          </div>
          <div className="flex-1 pb-6">
            <div className="text-xs text-gray-500 mb-1">{event.time}</div>
            <div className="text-sm text-gray-900 mb-1">{event.title}</div>
            <div className="text-xs text-gray-600">{event.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
