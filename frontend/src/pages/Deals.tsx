import { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data - korvataan myöhemmin oikealla datalla
const timeRanges = [
  { value: '1d', label: 'Last 24 hours' },
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '1y', label: 'Last year' }
];

const summaryData = {
  winRate: 68,
  totalDeals: { won: 24, lost: 11 },
  avgDuration: '45 days',
  topWinReason: 'Strong ROI case',
  topLossReason: 'Budget constraints'
};

const dealsData = [
  {
    id: 1,
    name: 'Enterprise Cloud Migration',
    status: 'won',
    seller: 'Sarah Johnson',
    keywords: ['cloud', 'migration', 'enterprise'],
    summary: 'Successfully closed through strong technical alignment and clear ROI demonstration.',
    fullAnalysis: 'The deal was won through a combination of technical expertise and clear business value demonstration. Key factors included: 1) Early stakeholder engagement, 2) Detailed ROI analysis, 3) Strong technical proof of concept.'
  },
  {
    id: 2,
    name: 'Security Platform Upgrade',
    status: 'lost',
    seller: 'Mike Chen',
    keywords: ['security', 'upgrade', 'compliance'],
    summary: 'Lost to competitor due to pricing concerns and timing issues.',
    fullAnalysis: 'The deal was lost primarily due to: 1) Higher initial cost compared to competitor, 2) Implementation timeline concerns, 3) Lack of immediate compliance benefits.'
  }
];

const patternData = {
  winningPatterns: [
    'Early stakeholder engagement',
    'Clear ROI demonstration',
    'Technical proof of concept'
  ],
  losingPatterns: [
    'Late pricing discussions',
    'Missing key stakeholders',
    'Weak competitive differentiation'
  ],
  commonPhrases: {
    won: ['ROI', 'technical alignment', 'implementation timeline'],
    lost: ['budget', 'timing', 'competitor']
  }
};

const recommendations = [
  {
    seller: 'Mike Chen',
    insights: [
      'Focus on early ROI discussions',
      'Strengthen competitive positioning',
      'Engage stakeholders earlier'
    ]
  },
  {
    phase: 'Pricing',
    insights: [
      'Present pricing earlier in the process',
      'Include ROI calculator in proposals',
      'Highlight long-term value'
    ]
  }
];

export default function Deals() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Time Range Filter */}
        <div className="flex justify-end">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-700 transition-colors"
          >
            {timeRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400">Win Rate</div>
            <div className="text-2xl font-bold">{summaryData.winRate}%</div>
          </Card>
          <Card className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400">Total Deals</div>
            <div className="text-2xl font-bold">
              {summaryData.totalDeals.won}/{summaryData.totalDeals.won + summaryData.totalDeals.lost}
            </div>
          </Card>
          <Card className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400">Avg. Duration</div>
            <div className="text-2xl font-bold">{summaryData.avgDuration}</div>
          </Card>
          <Card className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400">Top Win Reason</div>
            <div className="text-lg font-medium">{summaryData.topWinReason}</div>
          </Card>
          <Card className="bg-gray-900 p-4">
            <div className="text-sm text-gray-400">Top Loss Reason</div>
            <div className="text-lg font-medium">{summaryData.topLossReason}</div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deals Analysis */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">Deal Analysis</h2>
              <div className="space-y-4">
                {dealsData.map(deal => (
                  <div key={deal.id} className="border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {deal.status === 'won' ? (
                          <CheckCircle className="text-green-500" />
                        ) : (
                          <XCircle className="text-red-500" />
                        )}
                        <span className="font-medium">{deal.name}</span>
                      </div>
                      <span className="text-sm text-gray-400">{deal.seller}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {deal.keywords.map(keyword => (
                        <span key={keyword} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="text-sm text-gray-400 hover:text-white">
                          {deal.summary}
                        </TooltipTrigger>
                        <TooltipContent className="max-w-md">
                          <p>{deal.fullAnalysis}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Patterns & Recommendations */}
          <div className="space-y-6">
            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">Winning Patterns</h2>
              <div className="space-y-4">
                {patternData.winningPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 h-5 w-5" />
                    <span>{pattern}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">Losing Patterns</h2>
              <div className="space-y-4">
                {patternData.losingPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <XCircle className="text-red-500 h-5 w-5" />
                    <span>{pattern}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
              <Tabs defaultValue="sellers">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sellers">By Seller</TabsTrigger>
                  <TabsTrigger value="phases">By Phase</TabsTrigger>
                </TabsList>
                <TabsContent value="sellers">
                  {recommendations[0].insights.map((insight, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Info className="text-blue-500 h-4 w-4" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="phases">
                  {recommendations[1].insights.map((insight, index) => (
                    <div key={index} className="flex items-center space-x-2 mt-2">
                      <Info className="text-blue-500 h-4 w-4" />
                      <span className="text-sm">{insight}</span>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 