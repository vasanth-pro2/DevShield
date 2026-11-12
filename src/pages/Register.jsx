import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('Your details are valid. Connect an account service to finish creating your workspace.');
  };
  return (
    <main className="auth-page">
      <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link>
      <section className="auth-card">
        <div className="auth-visual"><div className="auth-visual-orbit" /><div className="auth-shield"><Shield size={93} strokeWidth={1.1} /></div><div className="auth-visual-copy"><span>BUILD WITH CONFIDENCE</span><strong>Make security<br />part of your story.</strong><i><span /> YOUR SECURITY JOURNEY STARTS HERE</i></div></div>
        <div className="auth-form-side">
          <Link to="/" className="site-logo auth-logo"><span className="logo-shield"><Shield size={19} /></span><span>dev<span>shield</span></span></Link>
          <div className="auth-heading"><span className="eyebrow">GET STARTED</span><h1>Create your<br /><span>workspace.</span></h1><p>Start exploring a clearer view of your application security.</p></div>
          <form onSubmit={handleSubmit}>
            <label className="form-field">Full name<input type="text" name="name" placeholder="Jordan Davis" autoComplete="name" minLength="2" required /></label>
            <label className="form-field">Work email<input type="email" name="email" placeholder="you@company.com" autoComplete="email" required /></label>
            <label className="form-field">Password<span className="password-wrap"><input type={showPassword ? 'text' : 'password'} name="password" placeholder="At least 8 characters" autoComplete="new-password" minLength="8" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <Button type="submit" className="auth-submit">Create account <span>→</span></Button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
          <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
          <small className="auth-disclaimer">No authentication provider is connected at this time</small>
        </div>
      </section>
    </main>
  );
}
