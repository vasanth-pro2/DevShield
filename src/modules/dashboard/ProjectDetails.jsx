import {
  Activity,
  AlertTriangle,
  CalendarClock,
  GitBranch,
  ShieldCheck,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './ProjectDetails.css';

const projectData = [
  {
    id: 'devshield-core',
    name: 'DevShield Core',
    description: 'Secure API gateway and developer workflow orchestration platform.',
    repository: 'https://github.com/devshield/core',
    language: 'TypeScript',
    securityScore: 96,
    totalVulnerabilities: 8,
    critical: 1,
    high: 2,
    medium: 3,
    low: 2,
    lastScan: '2026-11-12',
    status: 'Healthy',
    trend: [
      { month: 'Jan', score: 82 },
      { month: 'Feb', score: 83 },
      { month: 'Mar', score: 85 },
      { month: 'Apr', score: 89 },
      { month: 'May', score: 92 },
      { month: 'Jun', score: 94 },
      { month: 'Jul', score: 96 },
    ],
    activity: [
      { title: 'CI security gate passed', detail: 'Policy checks cleared for release 1.8.4', time: '2 hours ago' },
      { title: 'Container image scan completed', detail: 'Base image vulnerabilities reduced by 32%', time: '6 hours ago' },
      { title: 'SAST findings reviewed', detail: 'Two medium items remediated in auth middleware', time: '1 day ago' },
    ],
  },
  {
    id: 'payments-api',
    name: 'Payments API',
    description: 'Transaction processing service with PCI-aligned controls and runtime monitoring.',
    repository: 'https://github.com/devshield/payments-api',
    language: 'Go',
    securityScore: 87,
    totalVulnerabilities: 14,
    critical: 2,
    high: 5,
    medium: 4,
    low: 3,
    lastScan: '2026-11-11',
    status: 'Monitoring',
    trend: [
      { month: 'Jan', score: 74 },
      { month: 'Feb', score: 78 },
      { month: 'Mar', score: 79 },
      { month: 'Apr', score: 81 },
      { month: 'May', score: 84 },
      { month: 'Jun', score: 86 },
      { month: 'Jul', score: 87 },
    ],
    activity: [
      { title: 'PCI compliance review', detail: 'Policy guardrails revalidated for production release', time: '4 hours ago' },
      { title: 'Secrets scan triggered', detail: 'One new secret candidate removed from CI config', time: '1 day ago' },
      { title: 'Dependency upgrade approved', detail: 'High-risk package patched in payments service', time: '2 days ago' },
    ],
  },
  {
    id: 'risk-engine',
    name: 'Risk Engine',
    description: 'Analytics engine for policy scoring, anomaly detection, and compliance flagging.',
    repository: 'https://github.com/devshield/risk-engine',
    language: 'Python',
    securityScore: 81,
    totalVulnerabilities: 19,
    critical: 3,
    high: 6,
    medium: 7,
    low: 3,
    lastScan: '2026-11-09',
    status: 'Review',
    trend: [
      { month: 'Jan', score: 68 },
      { month: 'Feb', score: 72 },
      { month: 'Mar', score: 75 },
      { month: 'Apr', score: 77 },
      { month: 'May', score: 79 },
      { month: 'Jun', score: 80 },
      { month: 'Jul', score: 81 },
    ],
    activity: [
      { title: 'Model access review pending', detail: 'Raised for feature pipeline personnel access', time: '2 hours ago' },
      { title: 'Policy drift detected', detail: 'Scoring rules require review for new tenant config', time: '18 hours ago' },
      { title: 'Jupyter notebook scan', detail: 'Findings triaged for dataset exposure', time: '3 days ago' },
    ],
  },
  {
    id: 'identity-service',
    name: 'Identity Service',
    description: 'Authentication and authorization layer for workforce and partner integrations.',
    repository: 'https://github.com/devshield/identity-service',
    language: 'Java',
    securityScore: 91,
    totalVulnerabilities: 10,
    critical: 1,
    high: 2,
    medium: 4,
    low: 3,
    lastScan: '2026-11-12',
    status: 'Healthy',
    trend: [
      { month: 'Jan', score: 80 },
      { month: 'Feb', score: 83 },
      { month: 'Mar', score: 84 },
      { month: 'Apr', score: 87 },
      { month: 'May', score: 88 },
      { month: 'Jun', score: 90 },
      { month: 'Jul', score: 91 },
    ],
    activity: [
      { title: 'Session rotation completed', detail: 'Token lifetime policy updated to 14 minutes', time: '1 hour ago' },
      { title: 'MFA audit approved', detail: 'Partner access review marked compliant', time: '9 hours ago' },
      { title: 'Third-party library check', detail: 'High CVE in auth library replaced', time: '1 day ago' },
    ],
  },
];

const severityTone = {
  critical: 'critical',
  high: 'high',
  medium: 'medium',
  low: 'low',
};

export default function ProjectDetails({ projectId = 'devshield-core', projects = projectData }) {
  const selectedProject = projects.find((project) => project.id === projectId) || projects[0];

  return (
    <div className="project-details-shell">
      <header className="project-detail-header">
        <div>
          <p className="eyebrow">Project details</p>
          <h1>{selectedProject.name}</h1>
        </div>
        <span className={`status-pill ${selectedProject.status.toLowerCase().replace(/\s+/g, '-')}`}>
          {selectedProject.status}
        </span>
      </header>

      <section className="project-overview panel">
        <div className="project-summary">
          <div>
            <p className="summary-label">Description</p>
            <p className="summary-copy">{selectedProject.description}</p>
          </div>

          <div className="summary-info-grid">
            <div>
              <span className="meta-label">Repository</span>
              <a href={selectedProject.repository} target="_blank" rel="noreferrer">
                <GitBranch size={16} /> {selectedProject.repository.replace('https://github.com/', '')}
              </a>
            </div>
            <div>
              <span className="meta-label">Language</span>
              <strong>{selectedProject.language}</strong>
            </div>
            <div>
              <span className="meta-label">Security score</span>
              <strong>{selectedProject.securityScore}/100</strong>
            </div>
            <div>
              <span className="meta-label">Total vulnerabilities</span>
              <strong>{selectedProject.totalVulnerabilities}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid">
        {[
          { label: 'Critical', value: selectedProject.critical, icon: AlertTriangle, tone: 'critical' },
          { label: 'High', value: selectedProject.high, icon: ShieldCheck, tone: 'high' },
          { label: 'Medium', value: selectedProject.medium, icon: Activity, tone: 'medium' },
          { label: 'Low', value: selectedProject.low, icon: CalendarClock, tone: 'low' },
        ].map((metric) => (
          <div key={metric.label} className={`metric-card ${metric.tone}`}>
            <div className="metric-icon">
              <metric.icon size={18} />
            </div>
            <div>
              <span className="meta-label">{metric.label}</span>
              <strong>{metric.value}</strong>
            </div>
          </div>
        ))}
      </section>

      <section className="detail-panels">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Scan health</p>
              <h2>Security trend</h2>
            </div>
            <span className="scan-status">{selectedProject.status}</span>
          </div>

          <div className="trend-chart-wrap">
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={selectedProject.trend}>
                <defs>
                  <linearGradient id="projectTrend" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.08} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2b40" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" stroke="#9eb4d6" tickLine={false} axisLine={false} />
                <YAxis stroke="#9eb4d6" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1728',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} fill="url(#projectTrend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Timeline</p>
              <h2>Recent project activity</h2>
            </div>
          </div>

          <ul className="activity-list">
            {selectedProject.activity.map((item) => (
              <li key={`${item.title}-${item.time}`} className="activity-item">
                <span className="dot" />
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                  <small>{item.time}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
