import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import StatusBadge from "./StatusBadge";

export interface Alert {
  id: string;
  severity: "low" | "medium" | "high";
  timestamp: string;
  location: string;
  description: string;
  category?: string;
}

interface AlertListItemProps {
  alert: Alert;
  onClick?: () => void;
}

const getSeverityIcon = (severity: Alert["severity"]) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    case "medium":
      return <AlertCircle className="w-5 h-5 text-yellow-600" />;
    default:
      return <Info className="w-5 h-5 text-gray-600" />;
  }
};

export default function AlertListItem({ alert, onClick }: AlertListItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="mt-0.5">{getSeverityIcon(alert.severity)}</div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="text-sm font-medium text-gray-900">
            {alert.description}
          </div>
          <StatusBadge status={alert.severity} />
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600">
          <span>{alert.timestamp}</span>
          <span>•</span>
          <span>{alert.location}</span>
          {alert.category && (
            <>
              <span>•</span>
              <span>{alert.category}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
