import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  ChartBarIcon, 
  UserGroupIcon, 
  LightBulbIcon,
  XMarkIcon,
  UserCircleIcon,
  PhoneIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Card, CardContent } from '../components/ui/card';

// Sample data for the trends chart
const trendData = [
  { date: 'Jan', bookingRate: 35, winRate: 20 },
  { date: 'Feb', bookingRate: 38, winRate: 22 },
  { date: 'Mar', bookingRate: 40, winRate: 24 },
  { date: 'Apr', bookingRate: 38, winRate: 24 },
  { date: 'May', bookingRate: 42, winRate: 25 },
  { date: 'Jun', bookingRate: 45, winRate: 26 },
];

// Sample data for sales team
const salesTeamData = [
  { 
    name: 'S. Patel', 
    calls: 34, 
    meetings: 12, 
    deals: 8,
    analysis: {
      strengths: ['Strong closing rate', 'Excellent follow-up', 'Great product knowledge'],
      weaknesses: ['Could improve initial pitch', 'Needs to work on objection handling'],
      coachingSuggestions: ['Practice elevator pitch', 'Role-play objection scenarios']
    }
  },
  { 
    name: 'L. Martin', 
    calls: 28, 
    meetings: 9, 
    deals: 11,
    analysis: {
      strengths: ['Natural rapport building', 'Strong negotiation skills'],
      weaknesses: ['Documentation needs improvement', 'Sometimes rushes through discovery'],
      coachingSuggestions: ['Implement CRM checklist', 'Practice discovery questions']
    }
  },
  { 
    name: 'J. Harris', 
    calls: 30, 
    meetings: 10, 
    deals: 6,
    analysis: {
      strengths: ['Great at qualifying leads', 'Strong technical knowledge'],
      weaknesses: ['Could be more assertive', 'Needs to improve time management'],
      coachingSuggestions: ['Assertiveness training', 'Time management workshop']
    }
  },
  { 
    name: 'A. Turner', 
    calls: 19, 
    meetings: 6, 
    deals: 1,
    analysis: {
      strengths: ['Excellent product demos', 'Good at building relationships'],
      weaknesses: ['Low conversion rate', 'Needs to improve closing'],
      coachingSuggestions: ['Closing techniques training', 'Conversion optimization']
    }
  },
  { 
    name: 'K. Lee', 
    calls: 25, 
    meetings: 2, 
    deals: 2,
    analysis: {
      strengths: ['Strong technical background', 'Good at handling objections'],
      weaknesses: ['Low meeting booking rate', 'Needs to improve initial outreach'],
      coachingSuggestions: ['Outreach strategy workshop', 'Meeting booking techniques']
    }
  }
];

const stats = [
  { name: 'Total Calls', value: '1,234', icon: PhoneIcon, change: '+12%', changeType: 'increase' },
  { name: 'Meetings Booked', value: '456', icon: CalendarIcon, change: '+8%', changeType: 'increase' },
  { name: 'Active Deals', value: '89', icon: ChartBarIcon, change: '+23%', changeType: 'increase' },
  { name: 'Team Members', value: '12', icon: UserGroupIcon, change: '+2', changeType: 'increase' },
];

const recentActivity = [
  {
    id: 1,
    type: 'call',
    person: 'John Smith',
    company: 'Acme Corp',
    time: '2 hours ago',
    status: 'completed',
  },
  {
    id: 2,
    type: 'meeting',
    person: 'Sarah Johnson',
    company: 'TechStart',
    time: '4 hours ago',
    status: 'scheduled',
  },
  {
    id: 3,
    type: 'deal',
    person: 'Mike Brown',
    company: 'Global Inc',
    time: '1 day ago',
    status: 'in_progress',
  },
];

// Metric Card Component
const MetricCard = ({ title, value, subtitle, className = '' }) => (
  <div className={`bg-[#26272e] rounded-lg shadow p-6 ${className}`}>
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-3xl font-bold mt-2 text-white">{value}</p>
    {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

// Sales Rep Profile Modal Component
const SalesRepProfile = ({ rep, onClose }) => {
  if (!rep) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border border-gray-700 w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-[#26272e] text-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-[#1e1f25] flex items-center justify-center overflow-hidden">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{rep.name}</h3>
              <p className="text-sm text-gray-400">Sales Representative</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1e1f25] p-4 rounded-lg">
            <p className="text-sm text-blue-400">Calls</p>
            <p className="text-2xl font-bold text-white">{rep.calls}</p>
          </div>
          <div className="bg-[#1e1f25] p-4 rounded-lg">
            <p className="text-sm text-green-400">Meetings</p>
            <p className="text-2xl font-bold text-white">{rep.meetings}</p>
          </div>
          <div className="bg-[#1e1f25] p-4 rounded-lg">
            <p className="text-sm text-purple-400">Deals</p>
            <p className="text-2xl font-bold text-white">{rep.deals}</p>
          </div>
        </div>

        {/* AI Analysis */}
        <div className="space-y-6">
          {/* Strengths */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
              <ChartBarIcon className="h-5 w-5 text-green-400 mr-2" />
              Strengths
            </h4>
            <ul className="space-y-2">
              {rep.analysis.strengths.map((strength, index) => (
                <li key={index} className="text-gray-300">{strength}</li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
              <UserGroupIcon className="h-5 w-5 text-yellow-400 mr-2" />
              Areas for Improvement
            </h4>
            <ul className="space-y-2">
              {rep.analysis.weaknesses.map((weakness, index) => (
                <li key={index} className="text-gray-300">{weakness}</li>
              ))}
            </ul>
          </div>

          {/* Coaching Suggestions */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-2 flex items-center">
              <LightBulbIcon className="h-5 w-5 text-blue-400 mr-2" />
              Coaching Suggestions
            </h4>
            <ul className="space-y-2">
              {rep.analysis.coachingSuggestions.map((suggestion, index) => (
                <li key={index} className="text-gray-300">{suggestion}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sales Team Table Component
const SalesTeamTable = ({ data, onRepClick }) => {
  return (
    <div className="bg-[#26272e] rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-[#1e1f25]">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Sales Rep
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              Calls
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              Meetings
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
              Deals
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#26272e] divide-y divide-gray-700">
          {data.map((rep) => (
            <tr key={rep.name}>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onRepClick(rep)}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  {rep.name}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">{rep.calls}</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300 mt-1">
                    View calls
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">{rep.meetings}</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300 mt-1">
                    View meetings
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">{rep.deals}</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300 mt-1">
                    View deals
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

function Dashboard() {
  const [selectedRep, setSelectedRep] = useState(null);

  const handleRepClick = (rep) => {
    setSelectedRep(rep);
  };

  return (
    <div className="min-h-screen bg-[#1e1f25] text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Sales Dashboard</h1>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Booking Rate Card */}
          <Card className="bg-[#26272e] p-6 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-400 mb-1">Booking Rate</h3>
            <p className="text-3xl font-bold">38%</p>
          </Card>

          {/* Meetings Held Card */}
          <Card className="bg-[#26272e] p-6 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-400 mb-1">Meetings Held</h3>
            <p className="text-3xl font-bold">42</p>
            <p className="text-sm text-gray-500 mt-1">62% success rate</p>
          </Card>

          {/* Deals Closed Card */}
          <Card className="bg-[#26272e] p-6 rounded-xl shadow-md">
            <h3 className="text-sm text-gray-400 mb-1">Deals Closed</h3>
            <p className="text-3xl font-bold">31</p>
            <p className="text-sm text-gray-500 mt-1">avg. 23 days</p>
          </Card>

          {/* Alerts Card */}
          <Card className="bg-[#26272e] p-6 rounded-xl shadow-md flex items-center justify-between">
            <div>
              <h3 className="text-sm text-gray-400 mb-1">Alerts</h3>
              <p className="text-3xl font-bold">3 issues to review</p>
            </div>
            <LightBulbIcon className="h-8 w-8 text-yellow-400" />
          </Card>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-[#26272e] px-4 pt-5 pb-12 shadow"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-600 p-3">
                  <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-400">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-white">{stat.value}</p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {stat.change}
                </p>
              </dd>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-[#26272e] shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-white">Recent Activity</h3>
          </div>
          <div className="border-t border-gray-700">
            <ul role="list" className="divide-y divide-gray-700">
              {recentActivity.map((activity) => (
                <li key={activity.id} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {activity.type === 'call' ? (
                          <PhoneIcon className="h-6 w-6 text-blue-400" />
                        ) : activity.type === 'meeting' ? (
                          <CalendarIcon className="h-6 w-6 text-green-400" />
                        ) : (
                          <ChartBarIcon className="h-6 w-6 text-purple-400" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">{activity.person}</p>
                        <p className="text-sm text-gray-400">{activity.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                          activity.status === 'completed'
                            ? 'bg-green-700 text-green-100'
                            : activity.status === 'scheduled'
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-yellow-700 text-yellow-100'
                        }`}
                      >
                        {activity.status.replace('_', ' ')}
                      </span>
                      <span className="ml-4 text-sm text-gray-400">{activity.time}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard 
            title="Total Calls" 
            value="136" 
            subtitle="Last 30 days"
          />
          <MetricCard 
            title="Meetings Booked" 
            value="39" 
            subtitle="Last 30 days"
          />
          <MetricCard 
            title="Deals Closed" 
            value="28" 
            subtitle="Last 30 days"
          />
        </div>

        {/* Trends Chart */}
        <div className="bg-[#26272e] rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Performance Trends</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4a4a4a" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1e1f25', border: 'none' }} itemStyle={{ color: '#fff' }} labelStyle={{ color: '#fff' }} />
                <Line type="monotone" dataKey="bookingRate" stroke="#60a5fa" name="Booking Rate" />
                <Line type="monotone" dataKey="winRate" stroke="#34d399" name="Win Rate" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales Team Performance */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Sales Team Performance</h2>
          <SalesTeamTable data={salesTeamData} onRepClick={handleRepClick} />
        </div>

        {/* Sales Rep Profile Modal */}
        {selectedRep && (
          <SalesRepProfile rep={selectedRep} onClose={() => setSelectedRep(null)} />
        )}
      </div>
    </div>
  );
}

export default Dashboard; 