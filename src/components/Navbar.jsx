import { useState } from 'react';
import { Bell, ChevronDown, Menu, Search, Sun } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const pageTitles = {
  '/dashboard': 'Security overview',
  '/dashboard/web-scanner': 'Web Scanner',
  '/dashboard/api-security': 'API Security',
  '/dashboard/code-analysis': 'Code Analysis',
  '/dashboard/vulnerabilities': 'Vulnerabilities',
  '/dashboard/reports': 'Reports',
  '/dashboard/scan-history': 'Scan History',
  '/dashboard/settings': 'Settings',
};

export default function Navbar({ onMenuClick }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="dashboard-navbar">
      <button className="mobile-menu-button" type="button" onClick={onMenuClick} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{pageTitles[pathname] || 'Security overview'}</strong></div>
      <div className="navbar-actions">
        <label className="dashboard-search">
          <Search size={16} />
          <input aria-label="Search dashboard" placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button theme-toggle" type="button" aria-label="Theme preference"><Sun size={18} /></button>
        <button className="icon-button notification-button" type="button" aria-label="Notifications">
          <Bell size={18} /><i />
        </button>
        <div className="profile-wrap">
          <button className="profile-button" type="button" aria-expanded={profileOpen} onClick={() => setProfileOpen(!profileOpen)}>
            <span className="avatar">JD</span><span className="profile-name">Jordan Davis</span><ChevronDown size={15} />
          </button>
          {profileOpen && <div className="profile-menu">
            <span>Signed in as</span><strong>jordan@acme.dev</strong>
            <Link to="/dashboard/settings">Account settings</Link>
            <Link to="/login">Log out</Link>
          </div>}
        </div>
      </div>
    </header>
  );
}
