import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function StatCard({ icon: Icon, label, value, change, tone = 'purple', note }) {
  return (
    <article className="stat-card glass-card">
      <div className={`stat-icon ${tone}`}>{Icon && <Icon size={19} aria-hidden="true" />}</div>
      <div className="stat-copy">
        <p>{label}</p>
        <div className="stat-value">{value}</div>
        {note && <span className="stat-note">{note}</span>}
        {change && <span className={`stat-change ${change.startsWith('-') ? 'down' : ''}`}>
          {change.startsWith('-') ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
          {change}
        </span>}
      </div>
    </article>
  );
}
