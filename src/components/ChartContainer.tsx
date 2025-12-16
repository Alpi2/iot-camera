import React from "react";

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export default function ChartContainer({
  title,
  children,
  action,
  className = "",
}: ChartContainerProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-gray-900">{title}</h3>
        {action}
      </div>
      <div>{children}</div>
    </div>
  );
}
