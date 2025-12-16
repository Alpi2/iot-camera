type Status =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "low"
  | "medium"
  | "high";

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const STATUS_STYLES: Record<Status, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  error: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  low: "bg-gray-50 text-gray-700 border-gray-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const displayText = label || status.charAt(0).toUpperCase() + status.slice(1);

  const statusClass = STATUS_STYLES[status] || STATUS_STYLES.low;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs border ${statusClass}`}
    >
      {displayText}
    </span>
  );
}
