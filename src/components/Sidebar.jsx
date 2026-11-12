import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Activity, ChevronLeft, ChevronRight, Code2, FileBarChart2, Fingerprint,
  LayoutDashboard, LogOut, ScanLine, Settings, Shield, ShieldAlert, Waves,
} from 'lucide-react';

const navigation = [
  { label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Web Scanner', to: '/dashboard/web-scanner', icon: ScanLine },
  { label: 'API Security', to: '/dashboard/api-security', icon: Waves },
  { label: 'Code Analysis', to: '/dashboard/code-analysis', icon: Code2 },
  { label: 'Vulnerabilities', to: '/dashboard/vulnerabilities', icon: ShieldAlert },
  { label: 'Reports', to: '/dashboard/reports', icon: FileBarChart2 },
  { label: 'Scan History', to: '/dashboard/scan-history', icon: Activity },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Main navigation">
      <div className="sidebar-brand">
        <NavLink to="/" className="brand-lockup" aria-label="DevShield home">
          <span className="brand-mark"><Shield size={20} /></span>
          {!collapsed && <span>dev<span>shield</span></span>}
        </NavLink>
        <button className="collapse-button" type="button" onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      <div className="sidebar-caption">{!collapsed && 'WORKSPACE'}</div>
      <nav className="sidebar-nav">
        {navigation.map(({ label, to, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/dashboard'} title={collapsed ? label : undefined}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <NavLink to="/dashboard/settings" title={collapsed ? 'Settings' : undefined}
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Settings size={18} /><span>Settings</span>
        </NavLink>
        <button className="nav-item logout-item" type="button" title={collapsed ? 'Log out' : undefined}
          onClick={() => navigate('/login')}>
          <LogOut size={18} /><span>Log out</span>
        </button>
        {!collapsed && <div className="workspace-card">
          <div className="workspace-icon"><Fingerprint size={17} /></div>
          <div><strong>Security status</strong><small>All systems operational</small></div>
          <i className="status-dot" />
        </div>}
      </div>
    </aside>
  );
}
