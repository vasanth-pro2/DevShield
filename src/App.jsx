import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout.jsx';

const Landing = lazy(() => import('./pages/Landing.jsx'));
const Login = lazy(() => import('./pages/Login.jsx'));
const Register = lazy(() => import('./pages/Register.jsx'));
const Dashboard = lazy(() => import('./pages/Dashboard.jsx'));
const WebScanner = lazy(() => import('./pages/WebScanner.jsx'));
const ApiSecurity = lazy(() => import('./pages/ApiSecurity.jsx'));
const CodeAnalysis = lazy(() => import('./pages/CodeAnalysis.jsx'));
const Vulnerabilities = lazy(() => import('./pages/Vulnerabilities.jsx'));
const Reports = lazy(() => import('./pages/Reports.jsx'));
const ScanHistory = lazy(() => import('./pages/ScanHistory.jsx'));
const Settings = lazy(() => import('./pages/Settings.jsx'));

export default function App() {
  return (
    <Suspense fallback={<div className="route-loading" role="status">Loading DevShield...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/web-scanner" element={<WebScanner />} />
          <Route path="/dashboard/api-security" element={<ApiSecurity />} />
          <Route path="/dashboard/code-analysis" element={<CodeAnalysis />} />
          <Route path="/dashboard/vulnerabilities" element={<Vulnerabilities />} />
          <Route path="/dashboard/reports" element={<Reports />} />
          <Route path="/dashboard/scan-history" element={<ScanHistory />} />
          <Route path="/dashboard/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
