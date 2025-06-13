import React, { useState } from 'react';
import {
  PhoneIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const timeRanges = [
  { id: '1d', name: '1 Day' },
  { id: '7d', name: '7 Days' },
  { id: '30d', name: '30 Days' },
  { id: '1y', name: '1 Year' },
];

const metrics = {
  calls: {
    value: 45,
    teamAvg: 38,
    trend: 'up',
    change: 18,
  },
  meetings: {
    value: 12,
    teamAvg: 15,
    trend: 'down',
    change: 20,
  },
  deals: {
    value: 5,
    teamAvg: 4,
    trend: 'up',
    change: 25,
  },
  revenue: {
    value: '$125,000',
    teamAvg: '$98,000',
    trend: 'up',
    change: 28,
  },
};

const recommendations = [
  {
    id: 1,
    title: 'Increase Meeting Bookings',
    description: 'You\'re below team average in meetings. Try to book 7 more meetings this month.',
    metric: 'meetings',
    target: 7,
  },
  {
    id: 2,
    title: 'Improve Call-to-Meeting Ratio',
    description: 'Your current ratio is 3.8 calls per meeting. Aim for 3.0 to match top performers.',
    metric: 'calls',
    target: 3.0,
  },
  {
    id: 3,
    title: 'Focus on Higher-Value Deals',
    description: 'Your average deal size is $25,000. Top performers average $35,000.',
    metric: 'revenue',
    target: '$35,000',
  },
];

function MetricCard({ title, value, teamAvg, trend, change }) {
  return (
    <div className="bg-[#26272e] rounded-lg shadow p-6">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <p className="ml-2 text-sm text-gray-500">vs {teamAvg} avg</p>
      </div>
      <div className="mt-2 flex items-center">
        {trend === 'up' ? (
          <ArrowTrendingUpIcon className="h-4 w-4 text-green-400" />
        ) : (
          <ArrowTrendingDownIcon className="h-4 w-4 text-red-400" />
        )}
        <span className={`ml-1 text-sm font-medium ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {change}%
        </span>
      </div>
    </div>
  );
}

function RecommendationCard({ recommendation }) {
  return (
    <div className="bg-[#26272e] rounded-lg shadow p-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ChartBarIcon className="h-6 w-6 text-blue-400" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-white">{recommendation.title}</h3>
          <p className="mt-1 text-sm text-gray-400">{recommendation.description}</p>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="text-sm font-medium text-white">Target:</span>
              <span className="ml-2 text-sm text-gray-400">{recommendation.target}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Performance() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">My Performance</h1>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.id}
              onClick={() => setSelectedTimeRange(range.id)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedTimeRange === range.id
                  ? 'bg-blue-800 bg-opacity-30 text-blue-300'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {range.name}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Calls Made"
          value={metrics.calls.value}
          teamAvg={metrics.calls.teamAvg}
          trend={metrics.calls.trend}
          change={metrics.calls.change}
        />
        <MetricCard
          title="Meetings Booked"
          value={metrics.meetings.value}
          teamAvg={metrics.meetings.teamAvg}
          trend={metrics.meetings.trend}
          change={metrics.meetings.change}
        />
        <MetricCard
          title="Deals Closed"
          value={metrics.deals.value}
          teamAvg={metrics.deals.teamAvg}
          trend={metrics.deals.trend}
          change={metrics.deals.change}
        />
        <MetricCard
          title="Revenue Generated"
          value={metrics.revenue.value}
          teamAvg={metrics.revenue.teamAvg}
          trend={metrics.revenue.trend}
          change={metrics.revenue.change}
        />
      </div>

      {/* Recommendations */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-4">AI Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recommendation) => (
            <RecommendationCard
              key={recommendation.id}
              recommendation={recommendation}
            />
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PhoneIcon className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white">Call with TechCorp Inc</p>
              <p className="text-sm text-gray-400">45 minutes • Positive outcome</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CalendarIcon className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white">Meeting with StartupX</p>
              <p className="text-sm text-gray-400">60 minutes • Product demo</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CurrencyDollarIcon className="h-5 w-5 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-white">Deal closed with Global Solutions</p>
              <p className="text-sm text-gray-400">$75,000 • 45 days in pipeline</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Performance; 