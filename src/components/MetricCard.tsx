import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  subtitle?: string;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  subtitle,
}: MetricCardProps) {
  const isTrendUp = trend?.direction === "up";

  const trendStyles = isTrendUp
    ? "bg-green-50 text-green-700"
    : "bg-red-50 text-red-700";

  const TrendIcon = isTrendUp ? TrendingUp : TrendingDown;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        {/* Icon Container */}
        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-md ${trendStyles}`}
            aria-label={`Trending ${trend.direction} by ${trend.value}%`}
          >
            <TrendIcon className="w-3 h-3" />
            <span className="text-xs font-medium">
              {Math.abs(trend.value)}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div>
        <div className="text-3xl font-semibold text-gray-900 mb-1">{value}</div>

        <div className="text-sm text-gray-600 font-medium">{title}</div>

        {subtitle && (
          <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
        )}
      </div>
    </div>
  );
}
