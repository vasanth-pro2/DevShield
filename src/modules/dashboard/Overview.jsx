import {
  AlertTriangle,
  ArrowUpRight,
  BellRing,
  BriefcaseBusiness,
  ShieldCheck,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './Overview.css';

const totalProjects = 24;
const totalVulnerabilities = 126;
const criticalVulnerabilities = 13;
const securityScore = 92;

const severityData = [
  { name: 'Critical', value: 18, color: '#f87171' },
  { name: 'High', value: 31, color: '#fb923c' },
  { name: 'Medium', value: 47, color: '#facc15' },
  { name: 'Low', value: 30, color: '#38bdf8' },
];

const trendData = [
  { month: 'Jan', score: 76 },
  { month: 'Feb', score: 79 },
  { month: 'Mar', score: 82 },
  { month: 'Apr', score: 85 },
  { month: 'May', score: 88 },
  { month: 'Jun', score: 91 },
  { month: 'Jul', score: 92 },
];

const alerts = [
  { title: 'Legacy auth endpoint exposed', severity: 'Critical', time: '12 mins ago', project: 'Auth Gateway' },
  { title: 'S3 bucket policy drift detected', severity: 'High', time: '42 mins ago', project: 'InfraOps' },
  { title: 'New dependency advisory in Node SDK', severity: 'Medium', time: '1 hour ago', project: 'UI Platform' },
];

const recentActivity = [
  { title: 'Dependency scan completed', project: 'Payments API', time: '2 hours ago', status: 'Healthy' },
  { title: 'Container policy review signed off', project: 'Identity Service', time: '4 hours ago', status: 'Approved' },
  { title: 'Code review request raised', project: 'Risk Engine', time: 'Today', status: 'In review' },
];

const projectStatus = [
  { name: 'Production', count: 14, tone: 'safe' },
  { name: 'Staging', count: 6, tone: 'warning' },
  { name: 'Under review', count: 4, tone: 'critical' },
];

function StatCard({ icon: Icon, label, value, change, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>
        <Icon size={20} />
      </div>
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <strong>{value}</strong>
        <small>
          <ArrowUpRight size={14} /> {change}
        </small>
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">Security overview</p>
          <h1>Dashboard</h1>
        </div>
        <button type="button" className="primary-action">
          <ShieldCheck size={16} /> Export report
        </button>
      </header>

      <section className="stats-grid">
        <StatCard
          icon={BriefcaseBusiness}
          label="Total Projects"
          value={totalProjects}
          change="+4 this month"
          tone="blue"
        />
        <StatCard
          icon={ShieldAlert}
          label="Total Vulnerabilities"
          value={totalVulnerabilities}
          change="-8% from last scan"
          tone="amber"
        />
        <StatCard
          icon={AlertTriangle}
          label="Critical Vulnerabilities"
          value={criticalVulnerabilities}
          change="3 newly flagged"
          tone="red"
        />
        <StatCard
          icon={TrendingUp}
          label="Security Score"
          value={`${securityScore}/100`}
          change="+7 points"
          tone="cyan"
        />
      </section>

      <section className="charts-grid">
        <div className="panel large-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Exposure trend</p>
              <h2>Vulnerability severity distribution</h2>
            </div>
          </div>

          <div className="bar-chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={severityData} barSize={40}>
                <CartesianGrid stroke="#1f2b40" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="#9eb4d6" tickLine={false} axisLine={false} />
                <YAxis stroke="#9eb4d6" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1728',
                    border: '1px solid rgba(148, 163, 184, 0.2)',
                    borderRadius: 12,
                    color: '#e2e8f0',
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {severityData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel large-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Quarterly overview</p>
              <h2>Security trends</h2>
            </div>
          </div>

          <div className="area-chart-wrap">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="trendFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.04} />
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
                <Area type="monotone" dataKey="score" stroke="#38bdf8" strokeWidth={3} fill="url(#trendFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Monitoring</p>
              <h2>Recent security alerts</h2>
            </div>
            <BellRing size={18} className="header-icon" />
          </div>

          <ul className="alert-list">
            {alerts.map((alert) => (
              <li key={alert.title} className="alert-item">
                <span className={`severity-dot ${alert.severity.toLowerCase()}`}></span>
                <div className="alert-copy">
                  <strong>{alert.title}</strong>
                  <div className="meta-row">
                    <span>{alert.project}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
                <span className={`alert-badge ${alert.severity.toLowerCase()}`}>{alert.severity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">History</p>
              <h2>Recent project activity</h2>
            </div>
          </div>

          <ul className="activity-list">
            {recentActivity.map((item) => (
              <li key={`${item.title}-${item.project}`} className="activity-item">
                <div className="activity-marker" />
                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <div className="meta-row">
                    <span>{item.project}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <span className="activity-status">{item.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="panel full-width-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2>Project security status</h2>
            </div>
          </div>

          <div className="status-grid">
            {projectStatus.map((item) => (
              <div key={item.name} className={`status-card ${item.tone}`}>
                <span className="status-label">{item.name}</span>
                <strong>{item.count}</strong>
                <small>Repositories</small>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
