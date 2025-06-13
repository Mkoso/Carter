import { useState } from 'react';
import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const timeFilterOptions = ['1d', '7d', '30d', '1y'];

const users = [
  { name: 'Mikko Sohlman', role: 'Account Executive', team: 'Enterprise', img: '', isAdmin: true },
  { name: 'Sarah Patel', role: 'Account Executive', team: 'Enterprise', img: '', isAdmin: false },
  { name: 'Liam Martin', role: 'SDR', team: 'SMB', img: '', isAdmin: false },
];

const kpis = [
  { title: 'Calls', value: 52, change: '+12%', trend: 'up' },
  { title: 'Meetings', value: 18, change: '+8%', trend: 'up' },
  { title: 'Deals', value: 5, change: '+40%', trend: 'up' },
  { title: 'Avg. Sales Cycle', value: '32d', change: '-8%', trend: 'down' },
];

const chartData = Array.from({ length: 30 }, (_, i) => ({
  day: `Day ${i + 1}`,
  calls: Math.floor(Math.random() * 5 + 3),
  meetings: Math.floor(Math.random() * 2 + 1),
}));

const aiComment = `Käytät fraasia "arvon tuotto" usein – tämä korreloi korkeampaan meeting-läpivientiin. Suosittelemme lisäämään päätöksentekijän tunnistamista keskustelun alkuun. Viimeisen 30 päivän aikana meeting-muuntosi on noussut 8%.`;

const teamStats = [
  { name: 'Sinä', calls: 52, meetings: 18, deals: 5, winRate: 68 },
  { name: 'Tiimi (ka)', calls: 38, meetings: 15, deals: 4, winRate: 54 },
];

export default function Performance() {
  const [selectedTime, setSelectedTime] = useState('30d');
  const [selectedUser, setSelectedUser] = useState(users[0]);
  const isAdmin = selectedUser.isAdmin;

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        {/* Header + aikafiltteri */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center text-2xl font-bold">
              {selectedUser.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="text-lg font-semibold">{selectedUser.name}</div>
              <div className="text-gray-400 text-sm">{selectedUser.role} – {selectedUser.team}</div>
            </div>
            {isAdmin && (
              <select
                value={selectedUser.name}
                onChange={e => setSelectedUser(users.find(u => u.name === e.target.value) || users[0])}
                className="ml-4 bg-gray-800 text-white px-3 py-1 rounded border border-gray-700 text-sm"
              >
                {users.map(u => (
                  <option key={u.name} value={u.name}>{u.name}</option>
                ))}
              </select>
            )}
          </div>
          <select
            value={selectedTime}
            onChange={e => setSelectedTime(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 text-sm"
          >
            {timeFilterOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi) => (
            <div key={kpi.title} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col gap-2">
              <div className="text-sm text-gray-400">{kpi.title}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold">{kpi.value}</span>
                <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'} flex items-center gap-1`}>
                  {kpi.change}
                  {kpi.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Line chart */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Calls vs. Meetings</h2>
          <div className="w-full h-64">
            {/* Korvaa tämä oikealla chart-kirjastolla (esim. recharts) */}
            <svg width="100%" height="100%" viewBox="0 0 600 200">
              {/* Y-akseli */}
              <line x1="40" y1="10" x2="40" y2="180" stroke="#444" />
              {/* X-akseli */}
              <line x1="40" y1="180" x2="580" y2="180" stroke="#444" />
              {/* Calls viiva */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
                points={chartData.map((d, i) => `${40 + i * 18},${180 - d.calls * 15}`).join(' ')}
              />
              {/* Meetings viiva */}
              <polyline
                fill="none"
                stroke="#a78bfa"
                strokeWidth="3"
                points={chartData.map((d, i) => `${40 + i * 18},${180 - d.meetings * 30}`).join(' ')}
              />
            </svg>
            <div className="flex gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-sky-400 inline-block rounded" /> Calls</span>
              <span className="flex items-center gap-1"><span className="w-3 h-2 bg-purple-400 inline-block rounded" /> Meetings</span>
            </div>
          </div>
        </div>

        {/* AI-kommentti */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">AI:n palaute</h2>
          <div className="text-gray-200 text-sm whitespace-pre-line">{aiComment}</div>
        </div>

        {/* Tiimivertailu */}
        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Tiimivertailu</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="py-2">Nimi</th>
                  <th className="py-2">Calls</th>
                  <th className="py-2">Meetings</th>
                  <th className="py-2">Deals</th>
                  <th className="py-2">Win Rate</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((s, i) => (
                  <tr key={i} className="even:bg-gray-900 hover:bg-gray-800 transition-colors">
                    <td className="py-2 text-white font-medium">{s.name}</td>
                    <td className="py-2">{s.calls}</td>
                    <td className="py-2">{s.meetings}</td>
                    <td className="py-2">{s.deals}</td>
                    <td className="py-2">{s.winRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 