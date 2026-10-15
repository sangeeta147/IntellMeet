
import type { ReactNode } from "react";
import Sidebar from "../components/layout/Sidebar";
import "../pages/Dashboard.css";

type DashboardLayoutProps = {
  children: ReactNode;
};

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;