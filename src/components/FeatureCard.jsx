import { ArrowUpRight } from 'lucide-react';

export default function FeatureCard({ icon: Icon, title, description, className = '' }) {
  return (
    <article className={`feature-card glass-card ${className}`}>
      <div className="feature-icon">{Icon && <Icon size={22} strokeWidth={1.7} aria-hidden="true" />}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="feature-link" aria-hidden="true"><ArrowUpRight size={17} /></span>
    </article>
  );
}
