import {
  Activity,
  Aperture,
  Users,
  AlertTriangle,
  Zap,
  FileText,
  ChevronDown,
  Settings,
  LucideIcon,
} from "lucide-react";

type PageType =
  | "dashboard"
  | "gates"
  | "queues"
  | "alerts"
  | "utilities"
  | "report"
  | "settings";

interface NavigationProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

interface NavItem {
  id: PageType;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Activity },
  { id: "gates", label: "Gates", icon: Aperture },
  { id: "queues", label: "Queues", icon: Users },
  { id: "alerts", label: "Alerts", icon: AlertTriangle },
  { id: "utilities", label: "Utilities", icon: Zap },
  { id: "report", label: "Event Report", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Navigation({
  currentPage,
  onPageChange,
}: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8 overflow-hidden">
            {/* Logo Section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">EventOps</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => onPageChange(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User / Context Section */}
          <div className="flex items-center gap-4 flex-shrink-0 pl-4">
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <span className="text-gray-700 text-sm">
                Summer Music Festival 2025
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-medium">OA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
