import { ScanLine } from 'lucide-react';
import ModulePage from './ModulePage.jsx';
export default function WebScanner() {
  return <ModulePage icon={ScanLine} eyebrow="APPLICATION SECURITY" title="Web Scanner" description="Assess web applications for exposed risk, misconfigurations, and common security weaknesses." />;
}
