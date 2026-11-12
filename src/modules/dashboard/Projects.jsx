import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ExternalLink,
  Plus,
  Search,
  ShieldCheck,
} from 'lucide-react';
import './Projects.css';

const initialProjects = [
  {
    id: 'devshield-core',
    name: 'DevShield Core',
    description: 'Secure API gateway and developer workflow orchestration platform.',
    repository: 'https://github.com/devshield/core',
    language: 'TypeScript',
    securityScore: 96,
    vulnerabilities: 8,
    status: 'Healthy',
  },
  {
    id: 'payments-api',
    name: 'Payments API',
    description: 'Transaction processing service with PCI-aligned controls and runtime monitoring.',
    repository: 'https://github.com/devshield/payments-api',
    language: 'Go',
    securityScore: 87,
    vulnerabilities: 14,
    status: 'Monitoring',
  },
  {
    id: 'risk-engine',
    name: 'Risk Engine',
    description: 'Analytics engine for policy scoring, anomaly detection, and compliance flagging.',
    repository: 'https://github.com/devshield/risk-engine',
    language: 'Python',
    securityScore: 81,
    vulnerabilities: 19,
    status: 'Review',
  },
  {
    id: 'identity-service',
    name: 'Identity Service',
    description: 'Authentication and authorization layer for workforce and partner integrations.',
    repository: 'https://github.com/devshield/identity-service',
    language: 'Java',
    securityScore: 91,
    vulnerabilities: 10,
    status: 'Healthy',
  },
];

const statusOptions = ['All', 'Healthy', 'Monitoring', 'Review', 'At Risk'];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    repository: '',
    language: 'TypeScript',
    status: 'Healthy',
  });

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, searchTerm, statusFilter]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newProject = {
      id: (formData.name || 'new-project').toLowerCase().replace(/\s+/g, '-'),
      name: formData.name || 'Untitled Project',
      description: formData.description || 'New project added to the security portfolio.',
      repository: formData.repository || 'https://github.com/devshield/project',
      language: formData.language || 'TypeScript',
      securityScore: 90,
      vulnerabilities: 6,
      status: formData.status || 'Healthy',
    };

    setProjects((current) => [newProject, ...current]);
    setFormData({
      name: '',
      description: '',
      repository: '',
      language: 'TypeScript',
      status: 'Healthy',
    });
    setIsModalOpen(false);
  };

  const handleRunScan = (projectId) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === projectId
          ? {
              ...project,
              status: 'Monitoring',
              securityScore: Math.min(project.securityScore + 2, 100),
              vulnerabilities: Math.max(project.vulnerabilities - 1, 0),
            }
          : project,
      ),
    );
  };

  return (
    <div className="projects-shell">
      <header className="projects-header">
        <div>
          <p className="eyebrow">Portfolio</p>
          <h1>Projects</h1>
        </div>
        <button type="button" className="primary-action" onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Add New Project
        </button>
      </header>

      <section className="toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search projects"
            aria-label="Search projects"
          />
        </div>

        <div className="filter-group">
          {statusOptions.map((status) => (
            <button
              key={status}
              type="button"
              className={statusFilter === status ? 'filter-chip active' : 'filter-chip'}
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>
      </section>

      <section className="projects-grid">
        {filteredProjects.map((project) => (
          <article key={project.id} className="project-card">
            <div className="project-card-header">
              <div>
                <span className="project-tag">{project.language}</span>
                <h2>{project.name}</h2>
              </div>
              <span className={`status-pill ${project.status.toLowerCase().replace(/\s+/g, '-')}`}>
                {project.status}
              </span>
            </div>

            <p className="project-description">{project.description}</p>

            <div className="project-meta">
              <div>
                <span className="meta-label">Repository</span>
                <a href={project.repository} target="_blank" rel="noreferrer">
                  {project.repository.replace('https://github.com/', '')}
                  <ExternalLink size={13} />
                </a>
              </div>
              <div>
                <span className="meta-label">Security score</span>
                <strong>{project.securityScore}/100</strong>
              </div>
            </div>

            <div className="project-stat-row">
              <div>
                <span className="meta-label">Vulnerabilities</span>
                <strong>{project.vulnerabilities}</strong>
              </div>
              <div>
                <span className="meta-label">Status</span>
                <strong>{project.status}</strong>
              </div>
            </div>

            <div className="card-actions">
              <Link to={`/projects/${project.id}`} className="secondary-btn">
                View details
              </Link>
              <button type="button" className="ghost-btn" onClick={() => handleRunScan(project.id)}>
                <ShieldCheck size={15} /> Run scan
              </button>
            </div>
          </article>
        ))}
      </section>

      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="project-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-header">
              <div>
                <p className="eyebrow">New project</p>
                <h2>Add project</h2>
              </div>
              <button type="button" className="close-button" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="project-form">
              <label>
                Project name
                <input name="name" value={formData.name} onChange={handleChange} placeholder="Example: Vault API" required />
              </label>

              <label>
                Description
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the application and its security scope"
                  rows="4"
                  required
                />
              </label>

              <label>
                Repository URL
                <input
                  name="repository"
                  value={formData.repository}
                  onChange={handleChange}
                  placeholder="https://github.com/devshield/project"
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Language
                  <select name="language" value={formData.language} onChange={handleChange}>
                    <option value="TypeScript">TypeScript</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Go">Go</option>
                    <option value="Java">Java</option>
                  </select>
                </label>

                <label>
                  Status
                  <select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Healthy">Healthy</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Review">Review</option>
                    <option value="At Risk">At Risk</option>
                  </select>
                </label>
              </div>

              <div className="modal-actions">
                <button type="button" className="ghost-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-action">
                  Save project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
