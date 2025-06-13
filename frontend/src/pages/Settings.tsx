import { useState, createContext, useContext } from 'react';

const SettingsContext = createContext<any>(null);

const sidebarSections = [
  { key: 'general', label: 'General Settings', icon: '⚙️' },
  { key: 'team', label: 'Team & Roles', icon: '👥' },
  { key: 'methodology', label: 'Sales Methodology', icon: '📘' },
  { key: 'integrations', label: 'Integrations', icon: '🔌' },
  { key: 'playbook', label: 'Playbook Builder', icon: '🧩' },
  { key: 'ai', label: 'AI Preferences', icon: '🧠' },
  { key: 'security', label: 'Security & Access', icon: '🔒' },
];

const defaultSettings = {
  companyName: 'Carter Oy',
  timezone: 'Europe/Helsinki',
  language: 'fi',
  defaultRange: '30d',
};

const mockUsers = [
  { id: 1, name: 'Mikko Sohlman', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Sarah Patel', role: 'Manager', status: 'Active' },
  { id: 3, name: 'Liam Martin', role: 'Seller', status: 'Invited' },
];

const methodologyOptions = [
  { value: 'meddpicc', label: 'MEDDPICC' },
  { value: 'spin', label: 'SPIN' },
  { value: 'custom', label: 'Custom' },
];

const integrationOptions = [
  { name: 'HubSpot', key: 'hubspot' },
  { name: 'Salesforce', key: 'salesforce' },
  { name: 'Pipedrive', key: 'pipedrive' },
];

function GeneralSettings() {
  const { settings, setSettings } = useContext(SettingsContext);
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">General Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Yrityksen nimi</label>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={settings.companyName}
            onChange={e => setSettings((s: any) => ({ ...s, companyName: e.target.value }))}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Aikavyöhyke</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={settings.timezone}
            onChange={e => setSettings((s: any) => ({ ...s, timezone: e.target.value }))}
          >
            <option value="Europe/Helsinki">Europe/Helsinki</option>
            <option value="Europe/Stockholm">Europe/Stockholm</option>
            <option value="Europe/London">Europe/London</option>
            <option value="America/New_York">America/New_York</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Primary language</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={settings.language}
            onChange={e => setSettings((s: any) => ({ ...s, language: e.target.value }))}
          >
            <option value="fi">Suomi</option>
            <option value="en">English</option>
            <option value="sv">Svenska</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Default time range</label>
          <select
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            value={settings.defaultRange}
            onChange={e => setSettings((s: any) => ({ ...s, defaultRange: e.target.value }))}
          >
            <option value="30d">30d</option>
            <option value="7d">7d</option>
            <option value="1y">1y</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function TeamRoles() {
  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState<any | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('Seller');

  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold">Team & Roles</h2>
        <button
          className="bg-blue-700 hover:bg-blue-600 rounded px-4 py-2 text-sm"
          onClick={() => setShowModal(true)}
        >Invite new member</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-800">
            <th className="py-2">Name</th>
            <th className="py-2">Role</th>
            <th className="py-2">Status</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="even:bg-gray-900 hover:bg-gray-800 transition-colors">
              <td className="py-2 text-white font-medium">{u.name}</td>
              <td className="py-2">{u.role}</td>
              <td className="py-2">{u.status}</td>
              <td className="py-2">
                <button
                  className="text-blue-400 hover:text-blue-200 text-xs"
                  onClick={() => { setEditUser(u); setShowModal(true); }}
                >Muokkaa roolia</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal for invite/edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="max-w-sm w-full bg-gray-900 text-white rounded-lg p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              onClick={() => { setShowModal(false); setEditUser(null); }}
            >✕</button>
            <h2 className="text-lg font-bold mb-4">{editUser ? 'Muokkaa roolia' : 'Invite new member'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  value={editUser ? editUser.name : inviteName}
                  onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setInviteName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Role</label>
                <select
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                  value={editUser ? editUser.role : inviteRole}
                  onChange={e => editUser ? setEditUser({ ...editUser, role: e.target.value }) : setInviteRole(e.target.value)}
                >
                  <option>Admin</option>
                  <option>Manager</option>
                  <option>Seller</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2"
                  onClick={() => {
                    if (editUser) {
                      setUsers(users.map(u => u.id === editUser.id ? editUser : u));
                    } else {
                      setUsers([...users, { id: users.length + 1, name: inviteName, role: inviteRole, status: 'Invited' }]);
                    }
                    setShowModal(false); setEditUser(null); setInviteName(''); setInviteRole('Seller');
                  }}
                >Tallenna</button>
                <button
                  className="bg-gray-700 hover:bg-gray-600 rounded px-4 py-2"
                  onClick={() => { setShowModal(false); setEditUser(null); setInviteName(''); setInviteRole('Seller'); }}
                >Peruuta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SalesMethodology() {
  const [selected, setSelected] = useState('meddpicc');
  const [customSections, setCustomSections] = useState(['Metrics', 'Champion']);
  const [newSection, setNewSection] = useState('');
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Sales Methodology</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Valitse malli</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          {methodologyOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {selected === 'custom' && (
        <div className="space-y-2">
          <label className="block text-sm mb-1">Custom sections</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {customSections.map((s, i) => (
              <span key={i} className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs">{s}</span>
            ))}
          </div>
          <input
            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
            placeholder="Add new section and press Enter"
            value={newSection}
            onChange={e => setNewSection(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && newSection.trim()) {
                setCustomSections([...customSections, newSection.trim()]);
                setNewSection('');
                e.preventDefault();
              }
            }}
          />
        </div>
      )}
      <div className="text-xs text-gray-400 mt-4">AI käyttää tätä referenssinä Playbookeissa.</div>
    </div>
  );
}

function Integrations() {
  const [crm, setCrm] = useState({ hubspot: true, salesforce: false, pipedrive: false });
  const [apiKeys, setApiKeys] = useState({ hubspot: '', salesforce: '', pipedrive: '' });
  const [calendar, setCalendar] = useState('google');
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [slack, setSlack] = useState(false);
  const [teams, setTeams] = useState(false);
  const [webhook, setWebhook] = useState('');
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Integrations</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">CRM</label>
        <div className="flex gap-4">
          {integrationOptions.map(opt => (
            <label key={opt.key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={crm[opt.key as keyof typeof crm]} onChange={e => setCrm({ ...crm, [opt.key]: e.target.checked })} />
              {opt.name}
              <input
                className="ml-2 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
                placeholder="API key"
                value={apiKeys[opt.key as keyof typeof apiKeys]}
                onChange={e => setApiKeys({ ...apiKeys, [opt.key]: e.target.value })}
                disabled={!crm[opt.key as keyof typeof crm]}
              />
            </label>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Kalenteri</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked={calendar === 'google'} onChange={() => setCalendar('google')} /> Google
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="radio" checked={calendar === 'microsoft'} onChange={() => setCalendar('microsoft')} /> Microsoft
          </label>
          <button className="ml-4 bg-blue-700 hover:bg-blue-600 rounded px-3 py-1 text-xs" onClick={() => setCalendarConnected(true)}>
            {calendarConnected ? 'Connected' : 'Connect OAuth'}
          </button>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Slack / Teams</label>
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={slack} onChange={e => setSlack(e.target.checked)} /> Slack
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={teams} onChange={e => setTeams(e.target.checked)} /> Teams
          </label>
          <input
            className="ml-2 bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-white"
            placeholder="Webhook URL"
            value={webhook}
            onChange={e => setWebhook(e.target.value)}
            disabled={!slack && !teams}
          />
        </div>
      </div>
    </div>
  );
}

function PlaybookBuilder() {
  const [sections, setSections] = useState(['Metrics', 'Champion', 'Paper Process']);
  const [newSection, setNewSection] = useState('');
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Playbook Builder</h2>
      <div className="mb-2">Muokkaa organisaation Playbookin rakennetta:</div>
      <div className="flex flex-wrap gap-2 mb-2">
        {sections.map((s, i) => (
          <span key={i} className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs">{s}</span>
        ))}
      </div>
      <input
        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
        placeholder="Lisää uusi vaihe ja paina Enter"
        value={newSection}
        onChange={e => setNewSection(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && newSection.trim()) {
            setSections([...sections, newSection.trim()]);
            setNewSection('');
            e.preventDefault();
          }
        }}
      />
    </div>
  );
}

function AIPreferences() {
  const [outputLang, setOutputLang] = useState('fi');
  const [tone, setTone] = useState('formal');
  const [length, setLength] = useState('short');
  const [prio, setPrio] = useState({ meetings: true, calls: false, deals: true });
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">AI Preferences</h2>
      <div>
        <label className="block text-sm mb-1">Output language</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          value={outputLang}
          onChange={e => setOutputLang(e.target.value)}
        >
          <option value="fi">Suomi</option>
          <option value="en">English</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Summary tone</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          value={tone}
          onChange={e => setTone(e.target.value)}
        >
          <option value="formal">Formal</option>
          <option value="friendly">Friendly</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Litteraatin pituus</label>
        <select
          className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          value={length}
          onChange={e => setLength(e.target.value)}
        >
          <option value="short">Short</option>
          <option value="full">Full</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">AI-suositusten priorisointi</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={prio.meetings} onChange={e => setPrio({ ...prio, meetings: e.target.checked })} /> Meetings
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={prio.calls} onChange={e => setPrio({ ...prio, calls: e.target.checked })} /> Calls
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={prio.deals} onChange={e => setPrio({ ...prio, deals: e.target.checked })} /> Deals
          </label>
        </div>
      </div>
    </div>
  );
}

function SecurityAccess() {
  const [twofa, setTwofa] = useState(false);
  const [retention, setRetention] = useState('90d');
  const [gdpr, setGdpr] = useState(true);
  const auditLog = [
    { user: 'Mikko Sohlman', action: 'Changed role', time: '2024-06-12 13:42' },
    { user: 'Sarah Patel', action: 'Enabled 2FA', time: '2024-06-10 09:15' },
    { user: 'Liam Martin', action: 'Invited new user', time: '2024-06-09 16:22' },
  ];
  return (
    <div className="rounded-lg shadow bg-gray-900 p-6 space-y-4">
      <h2 className="text-xl font-semibold mb-2">Security & Access</h2>
      <div className="flex gap-6 items-center mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={twofa} onChange={e => setTwofa(e.target.checked)} /> Enable 2FA
        </label>
        <label className="block text-sm">Data retention period</label>
        <select
          className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
          value={retention}
          onChange={e => setRetention(e.target.value)}
        >
          <option value="30d">30d</option>
          <option value="90d">90d</option>
          <option value="1y">1y</option>
          <option value="unlimited">Unlimited</option>
        </select>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={gdpr} onChange={e => setGdpr(e.target.checked)} /> GDPR
        </label>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">User audit log</h3>
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-800">
              <th className="py-1">User</th>
              <th className="py-1">Action</th>
              <th className="py-1">Time</th>
            </tr>
          </thead>
          <tbody>
            {auditLog.map((log, i) => (
              <tr key={i} className="even:bg-gray-900 hover:bg-gray-800 transition-colors">
                <td className="py-1 text-white">{log.user}</td>
                <td className="py-1">{log.action}</td>
                <td className="py-1">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Settings() {
  const [active, setActive] = useState('general');
  const [settings, setSettings] = useState(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      <div className="flex min-h-screen bg-gray-950 text-white">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 flex flex-col py-8 px-2 space-y-2 fixed h-full">
          {sidebarSections.map((s) => (
            <button
              key={s.key}
              className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors font-medium ${active === s.key ? 'bg-gray-800' : 'hover:bg-gray-800 text-gray-300'}`}
              onClick={() => setActive(s.key)}
            >
              <span className="text-lg">{s.icon}</span>
              {s.label}
            </button>
          ))}
        </aside>
        {/* Main content */}
        <main className="flex-1 ml-60 p-8">
          {active === 'general' && <GeneralSettings />}
          {active === 'team' && <TeamRoles />}
          {active === 'methodology' && <SalesMethodology />}
          {active === 'integrations' && <Integrations />}
          {active === 'playbook' && <PlaybookBuilder />}
          {active === 'ai' && <AIPreferences />}
          {active === 'security' && <SecurityAccess />}
        </main>
      </div>
    </SettingsContext.Provider>
  );
} 