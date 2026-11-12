import { ShieldAlert } from 'lucide-react';
import ModulePage from './ModulePage.jsx';
export default function Vulnerabilities() {
  return <ModulePage icon={ShieldAlert} eyebrow="RISK MANAGEMENT" title="Vulnerabilities" description="Prioritize security findings by severity, context, and remediation status." />;
}
