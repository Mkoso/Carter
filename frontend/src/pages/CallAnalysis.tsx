import React, { useState } from 'react';

// Esimerkkidata
const timeFilterOptions = ['1d', '7d', '30d', '1y'];

const kpiData = [
  { title: 'Total Calls', value: '156', change: '+12%', trend: 'up' },
  { title: 'Booking Rate', value: '68%', change: '+5%', trend: 'up' },
  { title: 'Avg. Call Duration', value: '4m 32s', change: '-8%', trend: 'up' },
  { title: 'Positive Sentiment', value: '72%', change: '+3%', trend: 'up' },
];

const keywordData = [
  { phrase: 'value proposition', count: 45, example: '"Our value proposition is..."' },
  { phrase: 'next steps', count: 38, example: '"Let\'s discuss next steps..."' },
  { phrase: 'pain points', count: 32, example: '"What are your main pain points?"' },
  { phrase: 'ROI', count: 28, example: '"The ROI calculation shows..."' },
  { phrase: 'implementation', count: 25, example: '"Our implementation process..."' },
];

const callsData = [
  {
    date: '2024-03-20',
    salesperson: 'John Smith',
    customer: 'Acme Corp',
    duration: '5m 12s',
    outcome: 'Meeting Booked',
    transcript: 'Full conversation transcript...',
    sentiment: 85,
    keywords: ['value proposition', 'next steps', 'ROI'],
  },
  {
    date: '2024-03-20',
    salesperson: 'Sarah Johnson',
    customer: 'TechStart Inc',
    duration: '3m 45s',
    outcome: 'No Interest',
    transcript: 'Full conversation transcript...',
    sentiment: 45,
    keywords: ['pricing', 'competition'],
  },
  // Lisää esimerkkidataa tarvittaessa
];

const suggestions = [
  'Keskimääräinen puhelupituus jää alle 2 minuutin',
  'Fraasi "voitko varata ajan" toimii poikkeuksellisen hyvin',
  'Keskustelun aloitus vaikuttaa merkittävästi lopputulokseen',
  'ROI-keskustelut johtavat useammin tapaamiseen',
];

export default function CallAnalysis() {
  const [selectedTimeFilter, setSelectedTimeFilter] = useState('7d');
  const [selectedCall, setSelectedCall] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredKeyword, setHoveredKeyword] = useState<string | null>(null);

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

      {/* Calls Table */}
      <div className="bg-gray-900 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-bold text-white mb-4">Recent Calls</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                <th className="pb-3">Date</th>
                <th className="pb-3">Salesperson</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Duration</th>
                <th className="pb-3">Outcome</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {callsData.map((call, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'} hover:bg-gray-700 transition-colors`}>
                  <td className="py-3 text-white">{call.date}</td>
                  <td className="py-3 text-white">{call.salesperson}</td>
                  <td className="py-3 text-white">{call.customer}</td>
                  <td className="py-3 text-white">{call.duration}</td>
                  <td className="py-3 text-white">{call.outcome}</td>
                  <td className="py-3">
                    <button
                      onClick={() => {
                        setSelectedCall(call);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View
                    </button>
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

      {/* Call Details Modal */}
      {isModalOpen && selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold text-white">Call Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm text-gray-400">Transcript</h3>
                <p className="text-white mt-1">{selectedCall.transcript}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400">Sentiment Analysis</h3>
                <p className="text-white mt-1">{selectedCall.sentiment}% positive</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400">Keywords</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCall.keywords.map((keyword: string) => (
                    <span
                      key={keyword}
                      className="bg-blue-800 text-white px-2 py-1 rounded-full text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm text-gray-400">Comments</h3>
                <textarea
                  className="w-full mt-1 bg-gray-800 text-white rounded-md p-2 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                  rows={3}
                  placeholder="Add your comments here..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 