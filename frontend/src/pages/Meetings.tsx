import React, { useState } from 'react';

// Esimerkkidata
const timeFilterOptions = ['1d', '7d', '30d', '1y'];

const kpiData = [
  { title: 'Total Meetings', value: '124', change: '+15%', trend: 'up' },
  { title: 'Meeting → Deal', value: '42%', change: '+8%', trend: 'up' },
  { title: 'Avg. Duration', value: '32m', change: '-5%', trend: 'down' },
  { title: 'Positive Sentiment', value: '78%', change: '+4%', trend: 'up' },
];

const keywordData = [
  { phrase: 'business impact', count: 38, example: "What's the business impact of this solution?" },
  { phrase: 'decision criteria', count: 35, example: "What are your key decision criteria?" },
  { phrase: 'next steps', count: 32, example: "Let's agree on the next steps..." },
  { phrase: 'champion', count: 28, example: "Who will be our champion in this process?" },
  { phrase: 'budget', count: 25, example: "What's the budget allocation for this?" },
];

const meetingsData = [
  {
    date: '2024-03-20',
    salesperson: 'Sarah Patel',
    customer: 'Acme Corp',
    duration: '45m',
    outcome: 'Deal Won',
    score: 91,
    frameworkAreas: {
      metrics: true,
      decision: true,
      champion: true,
      budget: true,
      process: true,
      competition: true,
      pain: true,
      criteria: true
    }
  },
  {
    date: '2024-03-19',
    salesperson: 'Liam Martin',
    customer: 'TechStart Inc',
    duration: '35m',
    outcome: 'Next Meeting',
    score: 87,
    frameworkAreas: {
      metrics: true,
      decision: true,
      champion: true,
      budget: true,
      process: true,
      competition: false,
      pain: true,
      criteria: true
    }
  },
  {
    date: '2024-03-18',
    salesperson: 'Emma Wilson',
    customer: 'Global Solutions',
    duration: '28m',
    outcome: 'No Deal',
    score: 62,
    frameworkAreas: {
      metrics: true,
      decision: false,
      champion: false,
      budget: true,
      process: true,
      competition: false,
      pain: true,
      criteria: false
    }
  }
];

const suggestions = [
  'Champion-puoli puuttuu 54% tapaamisista',
  'Avaa seuraava tapaaminen kysymyksellä "Mikä on teidän päätöksentekoprosessinne?"',
  'Keskimääräinen tapaamiskesto jää alle 30 minuutin',
  'Budget-keskustelut johtavat useammin voittoon',
];

export default function Meetings() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('7d');
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);

  // Lasketaan framework compliance -tilastot
  const frameworkStats = {
    avgCompliance: 74,
    complianceChange: -6,
    mostMissed: 'Decision Criteria',
    mostMissedPercentage: 47,
    topPerformers: [
      { name: 'S. Patel', score: 91 },
      { name: 'L. Martin', score: 87 }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
      {/* Time Filter */}
      <div className="flex justify-end">
        <select
          value={selectedTimeFilter}
          onChange={(e) => setSelectedTimeFilter(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors"
        >
          {timeFilterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Framework Compliance Summary */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Framework Compliance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Average Compliance</p>
            <div className="flex items-baseline mt-1">
              <p className="text-2xl font-bold text-white">{frameworkStats.avgCompliance}%</p>
              <span className="ml-2 text-sm text-red-500">↓ {frameworkStats.complianceChange}%</span>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Most Missed</p>
            <p className="text-xl font-bold text-white mt-1">
              {frameworkStats.mostMissed} ({frameworkStats.mostMissedPercentage}%)
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Top Performers</p>
            <div className="mt-1 space-y-1">
              {frameworkStats.topPerformers.map((performer) => (
                <p key={performer.name} className="text-white">
                  {performer.name}: {performer.score}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi) => (
          <div key={kpi.title} className="bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
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

      {/* Keyword Analysis */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Top Performing Phrases</h2>
        <div className="flex flex-wrap gap-2">
          {keywordData.map((keyword) => (
            <div
              key={keyword.phrase}
              className="relative"
              onMouseEnter={() => setHoveredKeyword(keyword.phrase)}
              onMouseLeave={() => setHoveredKeyword(null)}
            >
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors cursor-help">
                {keyword.phrase}
              </span>
              {hoveredKeyword === keyword.phrase && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                  <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg border border-gray-700">
                    <p className="font-medium">Count: {keyword.count}</p>
                    <p className="text-gray-400 mt-1">{keyword.example}</p>
                  </div>
                  <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1 border-r border-b border-gray-700"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Meetings Table */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Recent Meetings</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                <th className="pb-3">Date</th>
                <th className="pb-3">Salesperson</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Outcome</th>
                <th className="pb-3">Score</th>
              </tr>
            </thead>
            <tbody>
              {meetingsData.map((meeting, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}>
                  <td className="py-3 text-white">{meeting.date}</td>
                  <td className="py-3 text-white">{meeting.salesperson}</td>
                  <td className="py-3 text-white">{meeting.customer}</td>
                  <td className="py-3 text-white">{meeting.duration}</td>
                  <td className="py-3 text-white">{meeting.outcome}</td>
                  <td className="py-3">
                    <div
                      className="relative inline-block"
                      onMouseEnter={() => setHoveredScore(index)}
                      onMouseLeave={() => setHoveredScore(null)}
                    >
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        meeting.score >= 90 ? 'bg-green-800' :
                        meeting.score >= 70 ? 'bg-blue-800' :
                        'bg-yellow-800'
                      } text-white`}>
                        {meeting.score}/100
                      </span>
                      {hoveredScore === index && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-10">
                          <div className="bg-gray-800 text-white text-sm rounded-lg p-3 shadow-lg border border-gray-700">
                            <p className="font-medium mb-2">Framework Areas:</p>
                            <div className="space-y-1">
                              {Object.entries(meeting.frameworkAreas).map(([area, completed]) => (
                                <p key={area} className="flex items-center">
                                  <span className="mr-2">{completed ? '✅' : '❌'}</span>
                                  {area.charAt(0).toUpperCase() + area.slice(1)}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1 border-r border-b border-gray-700"></div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">AI Suggestions</h2>
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-gray-300 flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 