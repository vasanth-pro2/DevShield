import { Settings as SettingsIcon } from 'lucide-react';
import ModulePage from './ModulePage.jsx';
export default function Settings() {
  return <ModulePage icon={SettingsIcon} eyebrow="PREFERENCES" title="Settings" description="Manage workspace preferences, profile details, and security configuration." />;
}
