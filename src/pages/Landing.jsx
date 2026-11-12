import { useState } from 'react';
import {
  Activity, ArrowDown, ArrowRight, ArrowUpRight, Braces, Bug, Check, ChevronDown, Code2,
  Fingerprint, Globe2, Layers3, Menu, Network, ScanSearch, Shield, ShieldCheck,
  Sparkles, Target, X,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';
import FeatureCard from '../components/FeatureCard.jsx';
import StatCard from '../components/StatCard.jsx';

const solutions = [
  { icon: Globe2, title: 'Web application security', description: 'Find weaknesses across your web apps and understand what needs attention first.' },
  { icon: Network, title: 'API security testing', description: 'Get visibility into API surfaces, configurations, and potential exposure.' },
  { icon: Braces, title: 'Source code analysis', description: 'Bring secure code practices into your development workflow from day one.' },
  { icon: Bug, title: 'OWASP vulnerability detection', description: 'Identify common risk patterns with coverage inspired by trusted security guidance.' },
  { icon: Sparkles, title: 'AI security assistant', description: 'Turn complex security findings into clear context and actionable next steps.' },
];

const modules = [
  { icon: Globe2, title: 'Web security', tag: 'APPLICATIONS', style: 'module-web' },
  { icon: Network, title: 'API security', tag: 'ENDPOINTS', style: 'module-api' },
  { icon: Code2, title: 'Code analysis', tag: 'DEVELOPMENT', style: 'module-code' },
  { icon: Target, title: 'Vulnerability management', tag: 'RISK CENTER', style: 'module-risk' },
];

function GuardianArtwork() {
  return (
    <div className="guardian-stage" aria-label="Abstract purple cybersecurity guardian illustration" role="img">
      <div className="guardian-orbit orbit-one" /><div className="guardian-orbit orbit-two" />
      <div className="guardian-grid" />
      <div className="guardian-halo" />
      <div className="guardian-particles" aria-hidden="true">
        <i className="particle-one" /><i className="particle-two" />
        <i className="particle-three" /><i className="particle-four" />
        <i className="particle-five" /><i className="particle-six" />
        <i className="particle-seven" /><i className="particle-eight" />
      </div>
      <div className="guardian-figure">
        <div className="guardian-hood"><div className="guardian-face"><span /><i /></div></div>
        <div className="guardian-body"><div className="guardian-chest"><ShieldCheck size={52} strokeWidth={1.2} /></div></div>
      </div>
      <div className="guardian-scanline" aria-hidden="true" />
      <div className="floating-code code-left"><i>01</i><b>SECURE</b><span>0x4F 2A</span></div>
      <div className="floating-code code-right"><i>02</i><b>PROTECTED</b><span>ENCRYPTED</span></div>
      <div className="guardian-chip chip-top"><Fingerprint size={16} /> ACTIVE DEFENSE</div>
      <div className="guardian-chip chip-bottom"><span className="pulse-dot" /> THREAT MONITORING</div>
    </div>
  );
}

function PerformancePreview() {
  const bars = [39, 61, 47, 76, 51, 84, 64, 94, 58, 76, 48, 69];
  return (
    <div className="performance-card glass-card">
      <div className="performance-top">
        <div><span className="eyebrow">SECURITY OVERVIEW <em>DEMO DATA</em></span><h3>Performance at a glance</h3></div>
        <button type="button" className="period-button">Last 30 days <ChevronDown size={14} /></button>
      </div>
      <div className="performance-kpis">
        <div><span>Assessments</span><strong>1,284</strong><small className="positive">+12.8% <span>vs last month</span></small></div>
        <div><span>Issues found</span><strong>326</strong><small className="neutral">Across all demo scans</small></div>
        <div><span>Risk score</span><strong>24<span className="score-out-of">/100</span></strong><small className="positive">Low risk</small></div>
      </div>
      <div className="performance-chart">
        <div className="chart-labels"><span>Scan activity</span><span>Risk distribution</span></div>
        <div className="activity-chart">
          <div className="chart-y-labels"><span>100</span><span>75</span><span>50</span><span>25</span></div>
          <div className="chart-plot">
            {[0, 1, 2, 3].map((line) => <i key={line} className="plot-line" style={{ top: `${line * 33.3}%` }} />)}
            <div className="bar-set">{bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} className={index > 7 ? 'bar-bright' : ''} />)}</div>
            <svg className="chart-line" viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true">
              <defs><linearGradient id="lineGradient" x1="0" x2="1"><stop stopColor="#7837e8" /><stop offset="1" stopColor="#d0a6ff" /></linearGradient></defs>
              <path d="M0 94 C45 82 45 70 95 78 S155 63 195 66 S255 45 295 57 S350 30 398 42 S458 24 500 34 S555 15 600 22" fill="none" stroke="url(#lineGradient)" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
        <div className="chart-months"><span>May 01</span><span>May 08</span><span>May 15</span><span>May 22</span><span>May 30</span></div>
      </div>
      <div className="risk-distribution">
        <span>Risk distribution</span>
        <div className="risk-bar"><i /><i /><i /><i /></div>
        <div className="risk-legend"><span><i className="risk-critical" />Critical <b>8%</b></span><span><i className="risk-high" />High <b>21%</b></span><span><i className="risk-medium" />Medium <b>34%</b></span><span><i className="risk-low" />Low <b>37%</b></span></div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="landing-page">
      <header className="site-header">
        <a href="#home" className="site-logo" aria-label="DevShield home"><span className="logo-shield"><Shield size={20} /></span><span>dev<span>shield</span></span></a>
        <button type="button" className="mobile-nav-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About us</a>
          <a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</a><a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#documentation" onClick={() => setMenuOpen(false)}>Documentation</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <Button to="/register" className="header-cta">Get started <ArrowUpRight size={15} /></Button>
      </header>

      <section className="hero-section section-wrap" id="home">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> SECURITY THAT MOVES WITH YOU</div>
          <h1>SECURE YOUR<br /><span>DIGITAL</span> WORLD<span className="heading-period">.</span></h1>
          <p>Identify vulnerabilities, strengthen application security, and protect your digital infrastructure with intelligent security analysis.</p>
          <div className="hero-actions"><Button to="/register">Start security assessment <ArrowRight size={17} /></Button><a className="secondary-cta" href="#features">Explore features <ArrowDown size={16} /></a></div>
          <div className="hero-trust"><div className="trust-avatars"><i>DS</i><i>AI</i><i>+</i></div><span><strong>Security-first by design</strong><small>Built for modern development teams</small></span></div>
        </div>
        <GuardianArtwork />
        <div className="hero-footnote"><span>01 / 04</span><i /><span>INTELLIGENCE. INSIGHT. IMPACT.</span></div>
      </section>

      <section className="stats-strip section-wrap" aria-label="Illustrative platform statistics">
        <StatCard icon={ShieldCheck} label="Security assessments" value="250+" note="Illustrative demo" />
        <StatCard icon={Target} label="Detection accuracy" value="98%" note="Illustrative demo" />
        <StatCard icon={Layers3} label="Security modules" value="10+" />
        <StatCard icon={Activity} label="Security events" value="5M+" note="Illustrative demo" />
      </section>

      <section className="about-section section-wrap" id="about">
        <div className="about-visual">
          <div className="about-orbit" /><div className="about-lock"><Shield size={104} strokeWidth={1} /><Fingerprint className="lock-fingerprint" size={39} /></div>
          <div className="about-float float-a"><Check size={14} /> APPLICATIONS SECURE</div>
          <div className="about-float float-b"><span className="pulse-dot" /> THREAT DETECTED <b>BLOCKED</b></div>
          <div className="about-index">DS / 001</div>
        </div>
        <div className="about-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> ABOUT DEVSHIELD</div>
          <h2>We build security that protects <span>your digital world.</span></h2>
          <p className="body-lead">Security should empower your team, not slow it down. DevShield brings essential security insight closer to the people building your products.</p>
          <div className="about-points">
            <div><span><ShieldCheck size={17} /></span><p><strong>Application security</strong><small>See risk across your digital products.</small></p></div>
            <div><span><Network size={17} /></span><p><strong>API security</strong><small>Make your connected services more resilient.</small></p></div>
            <div><span><ScanSearch size={17} /></span><p><strong>Intelligent vulnerability analysis</strong><small>Focus on meaningful security signals.</small></p></div>
            <div><span><Code2 size={17} /></span><p><strong>Secure development practices</strong><small>Build security into every development cycle.</small></p></div>
          </div>
          <a className="text-link" href="#solutions">Discover our approach <ArrowUpRight size={16} /></a>
        </div>
      </section>

      <section className="solutions-section section-wrap" id="solutions">
        <div className="section-heading">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> SECURITY, CONNECTED</div><h2>Protection for every<br /><span>part of your stack.</span></h2></div>
          <p>One clear view of your security landscape. Explore the tools that help your team move from unknown risks to informed action.</p>
        </div>
        <div className="solutions-grid">{solutions.map((solution) => <FeatureCard key={solution.title} {...solution} />)}</div>
      </section>

      <section className="performance-section section-wrap" id="features">
        <div className="performance-intro">
          <div className="eyebrow"><span className="eyebrow-dot" /> CLARITY THROUGH DATA</div>
          <h2>Know where you stand.<br /><span>See what matters.</span></h2>
          <p>Turn complex security signals into a focused picture of your security posture. Keep the important details visible and your team moving forward.</p>
          <ul><li><Check size={15} /> Monitor assessment activity</li><li><Check size={15} /> Understand severity at a glance</li><li><Check size={15} /> Share a clear view of risk</li></ul>
          <Link className="text-link" to="/dashboard">Explore the dashboard <ArrowUpRight size={16} /></Link>
        </div>
        <PerformancePreview />
      </section>

      <section className="modules-section section-wrap" id="documentation">
        <div className="modules-head"><div><div className="eyebrow"><span className="eyebrow-dot" /> BUILT FOR THE BIG PICTURE</div><h2>Security, made <span>actionable.</span></h2></div><a className="text-link" href="#contact">All security modules <ArrowUpRight size={16} /></a></div>
        <div className="modules-grid">{modules.map(({ icon: Icon, title, tag, style }) => <article key={title} className={`module-card ${style}`}>
          <div className="module-art"><div className="module-art-orbit" /><div className="module-art-icon"><Icon size={34} strokeWidth={1.35} /></div><div className="module-art-lines" /></div>
          <div className="module-meta"><div><span>{tag}</span><h3>{title}</h3></div><a href="#solutions" aria-label={`Learn about ${title}`}><ArrowUpRight size={17} /></a></div>
        </article>)}</div>
      </section>

      <section className="cta-section section-wrap" id="contact">
        <div className="cta-glow" /><div className="cta-shield"><ShieldCheck size={47} strokeWidth={1.3} /></div>
        <div><div className="eyebrow">YOUR NEXT STEP STARTS HERE</div><h2>Ready to secure<br /><span>your applications?</span></h2><p>Discover vulnerabilities before attackers do. Start your security journey with DevShield.</p></div>
        <Button to="/register">Get started <ArrowRight size={17} /></Button>
      </section>

      <footer className="site-footer">
        <div className="footer-main section-wrap">
          <div className="footer-brand"><a href="#home" className="site-logo"><span className="logo-shield"><Shield size={20} /></span><span>dev<span>shield</span></span></a><p>Intelligent security for the people building what’s next.</p><div className="footer-social"><a href="https://github.com" aria-label="GitHub">GH</a><a href="#contact" aria-label="Contact">in</a></div></div>
          <div className="footer-links"><div><strong>Explore</strong><a href="#about">About us</a><a href="#solutions">Solutions</a><a href="#features">Features</a></div><div><strong>Resources</strong><a href="#documentation">Documentation</a><a href="#documentation">Security modules</a><Link to="/dashboard">Dashboard</Link></div><div><strong>Get in touch</strong><a href="mailto:hello@devshield.example">hello@devshield.example</a><a href="#contact">Contact DevShield</a><a href="#contact">Privacy &amp; security</a></div></div>
        </div>
        <div className="footer-bottom section-wrap"><span>© 2025 DevShield. All rights reserved.</span><span>Security is a journey. Let’s build it together. <Shield size={14} /></span></div>
      </footer>
    </main>
  );
}
