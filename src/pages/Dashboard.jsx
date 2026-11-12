import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Bug, ChevronDown,
  CircleCheck, Clock3, ExternalLink, Globe2, ShieldAlert, ShieldCheck, Waves,
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import StatCard from '../components/StatCard.jsx';

const activityData = [
  { day: 'Mon', scans: 24, issues: 15 }, { day: 'Tue', scans: 38, issues: 25 },
  { day: 'Wed', scans: 31, issues: 19 }, { day: 'Thu', scans: 53, issues: 31 },
  { day: 'Fri', scans: 42, issues: 27 }, { day: 'Sat', scans: 68, issues: 39 },
  { day: 'Sun', scans: 57, issues: 32 },
];
const severityData = [{ name: 'Critical', value: 8, color: '#ff5b78' }, { name: 'High', value: 21, color: '#ff9c54' }, { name: 'Medium', value: 34, color: '#f5cb5c' }, { name: 'Low', value: 37, color: '#8a66ff' }];
const scans = [
  { name: 'acme-web-app', type: 'Web application', time: '12 min ago', findings: 12, status: 'Completed', icon: Globe2 },
  { name: 'payments-api', type: 'API security', time: '48 min ago', findings: 4, status: 'Completed', icon: Waves },
  { name: 'frontend-core', type: 'Code analysis', time: '2 hours ago', findings: 8, status: 'Review needed', icon: Activity },
];
const findings = [
  { title: 'Outdated dependency detected', asset: 'acme-web-app · Dependency', severity: 'High', age: '18 min ago' },
  { title: 'Missing content security policy', asset: 'marketing-site · Configuration', severity: 'Medium', age: '1 hour ago' },
  { title: 'Potentially exposed endpoint', asset: 'payments-api · API', severity: 'Critical', age: '3 hours ago' },
];

function PanelHeading({ title, aside }) {
  return <div className="panel-heading"><h2>{title}</h2>{aside}</div>;
}

export default function Dashboard() {
  return (
    <div className="overview-page">
      <div className="dashboard-welcome"><div><span className="eyebrow"><span className="eyebrow-dot" /> THURSDAY, MAY 30</span><h1>Good morning, Jordan <span>✦</span></h1><p>Here’s what’s happening across your security workspace.</p></div><button className="date-filter" type="button">Last 7 days <ChevronDown size={15} /></button></div>
      <div className="demo-banner"><span><i /> DEMO WORKSPACE</span> All activity and metrics on this page are illustrative sample data.</div>
      <section className="dashboard-stats">
        <StatCard icon={Activity} label="Total scans" value="1,284" change="+12.8% this month" />
        <StatCard icon={ShieldAlert} label="Critical vulnerabilities" value="08" change="-4 this week" tone="red" />
        <StatCard icon={Bug} label="High vulnerabilities" value="24" change="+2 this week" tone="orange" />
        <StatCard icon={CircleCheck} label="Resolved issues" value="186" change="+18 this month" tone="green" />
      </section>
      <section className="dashboard-chart-grid">
        <article className="dashboard-panel chart-panel">
          <PanelHeading title="Security assessment overview" aside={<button type="button" className="select-button">This week <ChevronDown size={14} /></button>} />
          <div className="chart-key"><span><i className="key-scans" /> Scans</span><span><i className="key-findings" /> Findings</span><b>DEMO DATA</b></div>
          <div className="recharts-area"><ResponsiveContainer width="100%" height="100%">
            <AreaChart data={activityData} margin={{ top: 10, right: 4, left: -18, bottom: 0 }}>
              <defs><linearGradient id="scansFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#9b67ff" stopOpacity={0.28} /><stop offset="95%" stopColor="#9b67ff" stopOpacity={0} /></linearGradient><linearGradient id="issuesFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4dd8c0" stopOpacity={0.2} /><stop offset="95%" stopColor="#4dd8c0" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid stroke="#272136" strokeDasharray="3 5" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: '#858092', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#858092', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#171222', border: '1px solid #342747', borderRadius: 9, color: '#fff' }} />
              <Area type="monotone" dataKey="scans" stroke="#a97cff" strokeWidth={2} fill="url(#scansFill)" />
              <Area type="monotone" dataKey="issues" stroke="#55d7c3" strokeWidth={2} fill="url(#issuesFill)" />
            </AreaChart>
          </ResponsiveContainer></div>
        </article>
        <article className="dashboard-panel severity-panel">
          <PanelHeading title="Vulnerability severity" aside={<button className="chart-more" aria-label="More options" type="button">···</button>} />
          <div className="severity-chart-wrap"><ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={severityData} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="92%" paddingAngle={4} stroke="none">
              {severityData.map((item) => <Cell key={item.name} fill={item.color} />)}
            </Pie><Tooltip contentStyle={{ background: '#171222', border: '1px solid #342747', borderRadius: 9, color: '#fff' }} /></PieChart>
          </ResponsiveContainer><div className="severity-center"><strong>326</strong><span>FINDINGS</span></div></div>
          <div className="severity-legend">{severityData.map((item) => <span key={item.name}><i style={{ backgroundColor: item.color }} />{item.name}<b>{item.value}%</b></span>)}</div>
        </article>
      </section>
      <section className="dashboard-lower-grid">
        <article className="dashboard-panel activity-panel">
          <PanelHeading title="Recent scan activity" aside={<a className="panel-link" href="/dashboard/scan-history">View history <ArrowRight size={14} /></a>} />
          <div className="scan-list">{scans.map(({ name, type, time, findings: count, status, icon: Icon }) => <div className="scan-row" key={name}>
            <span className="scan-app-icon"><Icon size={17} /></span><div className="scan-info"><strong>{name}</strong><small>{type}</small></div><span className="scan-time"><Clock3 size={13} />{time}</span><span className="scan-findings">{count} findings</span><span className={`scan-status ${status === 'Completed' ? 'complete' : 'review'}`}><i />{status}</span><button aria-label={`Open ${name} scan`} className="row-more" type="button"><ExternalLink size={14} /></button>
          </div>)}</div>
        </article>
        <article className="dashboard-panel owasp-panel">
          <PanelHeading title="OWASP distribution" aside={<span className="demo-tag">DEMO</span>} />
          <div className="owasp-list">{[['A01', 'Broken access control', 38], ['A02', 'Cryptographic failures', 26], ['A03', 'Injection', 19], ['A05', 'Security misconfiguration', 11]].map(([id, name, value]) => <div className="owasp-row" key={id}><span className="owasp-id">{id}</span><span className="owasp-name">{name}</span><span className="owasp-track"><i style={{ width: `${value * 2}%` }} /></span><strong>{value}</strong></div>)}</div>
          <a href="/dashboard/vulnerabilities" className="panel-link owasp-link">View findings <ArrowRight size={14} /></a>
        </article>
      </section>
      <section className="dashboard-panel findings-panel">
        <PanelHeading title="Recent security findings" aside={<a className="panel-link" href="/dashboard/vulnerabilities">View all findings <ArrowRight size={14} /></a>} />
        <div className="findings-table">
          <div className="findings-head"><span>FINDING</span><span>ASSET &amp; CATEGORY</span><span>SEVERITY</span><span>DETECTED</span><span /></div>
          {findings.map((item) => <div className="finding-row" key={item.title}><span className="finding-title"><span className={`severity-icon ${item.severity.toLowerCase()}`}><ShieldAlert size={15} /></span><strong>{item.title}</strong></span><span className="finding-asset">{item.asset}</span><span className={`severity-pill ${item.severity.toLowerCase()}`}>{item.severity}</span><span className="finding-age">{item.age}</span><button className="row-more" aria-label={`Open ${item.title}`} type="button"><ArrowUpRight size={15} /></button></div>)}
        </div>
      </section>
      <div className="dashboard-footnote"><ArrowDownRight size={14} /> This dashboard contains demo data for preview purposes only.</div>
    </div>
  );
}
