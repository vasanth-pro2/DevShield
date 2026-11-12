import { useMemo, useState } from 'react';
import { Download, Eye, ShieldAlert, ShieldCheck } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './Reports.css';

const reportData = [
  {
    id: 'report-01',
    title: 'Monthly DevSecOps Summary',
    range: 'Nov 2026',
    score: 92,
    total: 126,
    critical: 13,
    high: 26,
    medium: 48,
    low: 39,
    status: 'Reviewed',
    project: 'Platform Security',
  },
  {
    id: 'report-02',
    title: 'API Security Review',
    range: 'Oct 2026',
    score: 88,
    total: 142,
    critical: 18,
    high: 32,
    medium: 58,
    low: 34,
    status: 'Pending',
    project: 'Payments API',
  },
  {
    id: 'report-03',
    title: 'Identity Protection Audit',
    range: 'Sep 2026',
    score: 90,
    total: 118,
    critical: 9,
    high: 24,
    medium: 51,
    low: 34,
    status: 'Reviewed',
    project: 'Identity Service',
  },
];

const projectSummary = [
  { name: 'DevShield Core', score: 96, vulnerabilities: 8 },
  { name: 'Payments API', score: 87, vulnerabilities: 14 },
  { name: 'Risk Engine', score: 81, vulnerabilities: 19 },
  { name: 'Identity Service', score: 91, vulnerabilities: 10 },
];

const distributionData = [
  { name: 'Critical', value: 13, color: '#f87171' },
  { name: 'High', value: 26, color: '#fb923c' },
  { name: 'Medium', value: 48, color: '#facc15' },
  { name: 'Low', value: 39, color: '#38bdf8' },
];

const dateRangeOptions = ['Last 30 days', 'Last 90 days', 'Last 6 months', 'This year'];

export default function Reports() {
  const [range, setRange] = useState('Last 90 days');
  const [selectedReport, setSelectedReport] = useState(reportData[0]);

  const summary = useMemo(() => {
    const totalReports = reportData.length;
    const avgScore = Math.round(reportData.reduce((sum, report) => sum + report.score, 0) / totalReports);
    const totalVulns = reportData.reduce((sum, report) => sum + report.total, 0);

    return { totalReports, avgScore, totalVulns };
  }, []);

  const downloadCsv = () => {
    const headers = ['Title', 'Project', 'Range', 'Security Score', 'Total Vulnerabilities', 'Critical', 'High', 'Medium', 'Low', 'Status'];
    const rows = reportData.map((report) => [
      report.title,
      report.project,
      report.range,
      report.score,
      report.total,
      report.critical,
      report.high,
      report.medium,
      report.low,
      report.status,
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'devshield-security-reports.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="reports-shell">
      <header className="reports-header">
        <div>
          <p className="eyebrow">Reporting</p>
          <h1>Security reports</h1>
        </div>
        <button type="button" className="primary-action" onClick={downloadCsv}>
          <Download size={16} /> Download CSV
        </button>
      </header>

      <section className="summary-cards">
        <div className="summary-card">
          <span className="summary-label">Total reports</span>
          <strong>{summary.totalReports}</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Security score</span>
          <strong>{summary.avgScore}/100</strong>
        </div>
        <div className="summary-card">
          <span className="summary-label">Vulnerability stats</span>
          <strong>{summary.totalVulns}</strong>
        </div>
      </section>

      <section className="report-toolbar">
        <div className="range-picker">
          {dateRangeOptions.map((option) => (
            <button
              key={option}
              type="button"
              className={range === option ? 'range-option active' : 'range-option'}
              onClick={() => setRange(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <section className="report-panels">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Portfolio</p>
              <h2>Project-wise security summary</h2>
            </div>
          </div>

          <div className="project-summary-list">
            {projectSummary.map((project) => (
              <div key={project.name} className="project-summary-row">
                <div>
                  <strong>{project.name}</strong>
                  <small>{project.vulnerabilities} findings</small>
                </div>
                <div className="score-badge">{project.score}/100</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Distribution</p>
              <h2>Severity distribution</h2>
            </div>
          </div>

          <div className="distribution-chart">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={distributionData} barSize={42}>
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
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="report-list panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Archive</p>
            <h2>Report listing</h2>
          </div>
        </div>

        <div className="report-table">
          <div className="table-head">
            <span>Report</span>
            <span>Project</span>
            <span>Range</span>
            <span>Score</span>
            <span>Status</span>
            <span>Actions</span>
          </div>

          {reportData.map((report) => (
            <div key={report.id} className="table-row">
              <div>
                <strong>{report.title}</strong>
              </div>
              <div>{report.project}</div>
              <div>{report.range}</div>
              <div>{report.score}/100</div>
              <div>
                <span className={`report-status ${report.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  {report.status}
                </span>
              </div>
              <div className="table-actions">
                <button type="button" className="icon-button" aria-label={`View ${report.title}`} onClick={() => setSelectedReport(report)}>
                  <Eye size={15} />
                </button>
                <button type="button" className="icon-button" aria-label={`Download ${report.title}`} onClick={downloadCsv}>
                  <Download size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedReport && (
        <div className="report-modal-backdrop" onClick={() => setSelectedReport(null)}>
          <div className="report-modal" onClick={(event) => event.stopPropagation()}>
            <div className="report-modal-header">
              <div>
                <p className="eyebrow">Report preview</p>
                <h3>{selectedReport.title}</h3>
              </div>
              <button type="button" className="close-button" onClick={() => setSelectedReport(null)}>
                ×
              </button>
            </div>

            <div className="report-modal-body">
              <div className="report-modal-grid">
                <div>
                  <span className="meta-label">Project</span>
                  <strong>{selectedReport.project}</strong>
                </div>
                <div>
                  <span className="meta-label">Range</span>
                  <strong>{selectedReport.range}</strong>
                </div>
                <div>
                  <span className="meta-label">Security score</span>
                  <strong>{selectedReport.score}/100</strong>
                </div>
                <div>
                  <span className="meta-label">Total vulnerabilities</span>
                  <strong>{selectedReport.total}</strong>
                </div>
              </div>

              <ul className="severity-preview">
                <li><span>Critical</span><strong>{selectedReport.critical}</strong></li>
                <li><span>High</span><strong>{selectedReport.high}</strong></li>
                <li><span>Medium</span><strong>{selectedReport.medium}</strong></li>
                <li><span>Low</span><strong>{selectedReport.low}</strong></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
