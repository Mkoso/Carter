import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Esimerkkidata
const timeFilterOptions = ['1d', '7d', '30d', '1y'];
const kpiData = [
  { title: 'Booked Calls %', value: '85%', change: '+5%', trend: 'up' },
  { title: 'Win Rate %', value: '65%', change: '-2%', trend: 'down' },
  { title: 'Avg. Deal Size', value: '$45k', change: '+12%', trend: 'up' },
  { title: 'Avg. Sales Cycle', value: '32d', change: '-8%', trend: 'up' },
];

const insightsData = {
  whatsWorking: [
    'Using "value-based selling" approach increased win rate by 15%',
    'Early morning calls have 40% higher booking rate',
    'Personalized follow-ups improved response rate by 25%',
  ],
  alerts: [
    'No deals closed in last 7 days',
    'Call activity down 30% vs last week',
    '3 deals at risk of slipping to next quarter',
  ],
};

const teamData = [
  { name: 'John Smith', calls: { value: 45, change: '+12%' }, meetings: { value: 12, change: '+5%' }, deals: { value: 3, change: '-2%' } },
  { name: 'Sarah Johnson', calls: { value: 38, change: '-8%' }, meetings: { value: 15, change: '+15%' }, deals: { value: 4, change: '+25%' } },
  { name: 'Mike Brown', calls: { value: 52, change: '+20%' }, meetings: { value: 18, change: '+8%' }, deals: { value: 5, change: '+40%' } },
];

// Esimerkkidata graafille
const chartData = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  bookingRate: Math.random() * 30 + 60,
  winRate: Math.random() * 20 + 50,
}));

export default function Dashboard() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('7d');

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Time Filter */}
      <div className="flex justify-end">
        <select
          value={selectedTimeFilter}
          onChange={(e) => setSelectedTimeFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700"
        >
          {timeFilterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-sm text-gray-400">{kpi.title}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-bold text-white">{kpi.value}</p>
              <span className={`ml-2 text-sm ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">What's Working</h2>
          <ul className="space-y-3">
            {insightsData.whatsWorking.map((insight, index) => (
              <li key={index} className="text-gray-300">
                {insight}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-gray-900 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Alerts</h2>
          <ul className="space-y-3">
            {insightsData.alerts.map((alert, index) => (
              <li key={index} className="text-red-400">
                {alert}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Line Chart */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Booking Rate vs Win Rate</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.375rem',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="bookingRate"
                stroke="#3B82F6"
                name="Booking Rate"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="winRate"
                stroke="#10B981"
                name="Win Rate"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance Table */}
      <div className="bg-gray-900 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Team Performance</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                <th className="pb-3">Name</th>
                <th className="pb-3">Calls</th>
                <th className="pb-3">Meetings</th>
                <th className="pb-3">Deals</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((member, index) => (
                <tr key={member.name} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}`}>
                  <td className="py-3 text-white">{member.name}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <span className="text-white">{member.calls.value}</span>
                      <span className={`ml-2 text-sm ${member.calls.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {member.calls.change}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <span className="text-white">{member.meetings.value}</span>
                      <span className={`ml-2 text-sm ${member.meetings.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {member.meetings.change}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <span className="text-white">{member.deals.value}</span>
                      <span className={`ml-2 text-sm ${member.deals.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                        {member.deals.change}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 