import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Gates from "./pages/Gates";
import Queues from "./pages/Queues";
import Alerts from "./pages/Alerts";
import Utilities from "./pages/Utilities";
import EventReport from "./pages/EventReport";
import Settings from "./pages/Settings";
import Navigation from "./components/Navigation";

type PageType =
  | "dashboard"
  | "gates"
  | "queues"
  | "alerts"
  | "utilities"
  | "report"
  | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("dashboard");

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "gates":
        return <Gates />;
      case "queues":
        return <Queues />;
      case "alerts":
        return <Alerts />;
      case "utilities":
        return <Utilities />;
      case "report":
        return <EventReport />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pt-16">{renderPage()}</main>
    </div>
  );
}
