import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ModulePage({ eyebrow, title, description, icon: Icon, action = 'Explore overview' }) {
  return (
    <section className="module-placeholder">
      <div className="module-placeholder-icon">{Icon && <Icon size={25} />}</div>
      <span className="eyebrow">{eyebrow || 'DEVSHIELD MODULE'}</span>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="module-coming-soon"><LockKeyhole size={15} /> Module workspace is ready for integration</div>
      <Link to="/dashboard" className="text-link">{action}<ArrowUpRight size={16} /></Link>
    </section>
  );
}
