import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Sidebar from '../components/Sidebar.jsx';

export default function DashboardLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  return (
    <div className={`dashboard-shell ${mobileSidebarOpen ? 'mobile-sidebar-open' : ''}`}>
      <Sidebar />
      {mobileSidebarOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setMobileSidebarOpen(false)} />}
      <div className="dashboard-main">
        <Navbar onMenuClick={() => setMobileSidebarOpen(!mobileSidebarOpen)} />
        <main className="dashboard-content"><Outlet /></main>
      </div>
    </div>
  );
}
