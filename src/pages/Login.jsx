import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Shield, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button.jsx';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('Your details are valid. Connect an authentication service to sign in.');
  };
  return (
    <main className="auth-page">
      <Link to="/" className="auth-back"><ArrowLeft size={16} /> Back to home</Link>
      <section className="auth-card">
        <div className="auth-visual"><div className="auth-visual-orbit" /><div className="auth-shield"><Shield size={93} strokeWidth={1.1} /><ShieldCheck className="auth-shield-check" size={35} /></div><div className="auth-visual-copy"><span>DEVSHIELD ACCESS</span><strong>Security starts<br />with visibility.</strong><i><span /> YOUR WORKSPACE IS PROTECTED</i></div></div>
        <div className="auth-form-side">
          <Link to="/" className="site-logo auth-logo"><span className="logo-shield"><Shield size={19} /></span><span>dev<span>shield</span></span></Link>
          <div className="auth-heading"><span className="eyebrow">WELCOME BACK</span><h1>Sign in to your<br /><span>workspace.</span></h1><p>Enter your details to access your security workspace.</p></div>
          <form onSubmit={handleSubmit}>
            <label className="form-field">Email address<input type="email" name="email" placeholder="you@company.com" autoComplete="email" required /></label>
            <label className="form-field">Password<span className="password-wrap"><input type={showPassword ? 'text' : 'password'} name="password" placeholder="Enter your password" autoComplete="current-password" minLength="8" required /><button type="button" aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <div className="form-options"><label className="remember-label"><input type="checkbox" name="remember" /> Remember me</label><a href="mailto:support@devshield.example?subject=Password%20reset">Forgot password?</a></div>
            <Button type="submit" className="auth-submit">Sign in <span>→</span></Button>
            {notice && <p className="form-notice" role="status">{notice}</p>}
          </form>
          <p className="auth-switch">New to DevShield? <Link to="/register">Create an account</Link></p>
          <small className="auth-disclaimer">Protected workspace · Authentication is not connected yet</small>
        </div>
      </section>
    </main>
  );
}
