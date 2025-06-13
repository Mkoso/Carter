import { useState } from 'react';
import { CheckCircle, XCircle, ChevronDown, Info, Plus, Pencil, Trash, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data - korvataan myöhemmin oikealla datalla
const methodology = {
  name: 'MEDDPICC',
  version: 'Custom',
  description: 'Modified version of MEDDPICC methodology with additional focus on pricing confidence',
  lastUpdated: '2024-03-20'
};

const timeFilterOptions = ['1d', '7d', '30d', '1y'];

const playbookData = [
  {
    id: 1,
    name: 'Metrics',
    description: 'Quantifiable business impact and ROI metrics',
    compliance: 85,
    aiComment: 'Strong in early stages, but often missing in final negotiations',
    keywords: ['ROI', 'cost savings', 'revenue impact', 'efficiency gains'],
    timing: 'Early',
    status: 'active'
  },
  {
    id: 2,
    name: 'Economic Buyer',
    description: 'Decision maker with budget authority',
    compliance: 72,
    aiComment: 'Often identified late in the process',
    keywords: ['decision maker', 'budget holder', 'CFO', 'VP'],
    timing: 'Mid',
    status: 'active'
  },
  {
    id: 3,
    name: 'Decision Criteria',
    description: 'Clear evaluation criteria and process',
    compliance: 68,
    aiComment: 'Needs more emphasis in discovery phase',
    keywords: ['evaluation', 'criteria', 'process', 'timeline'],
    timing: 'Early',
    status: 'active'
  },
  {
    id: 4,
    name: 'Decision Process',
    description: 'Understanding of customer\'s buying process',
    compliance: 65,
    aiComment: 'Often unclear or not documented',
    keywords: ['process', 'steps', 'approvals', 'timeline'],
    timing: 'Early',
    status: 'active'
  },
  {
    id: 5,
    name: 'Paper Process',
    description: 'Documentation and legal requirements',
    compliance: 90,
    aiComment: 'Well covered in most deals',
    keywords: ['legal', 'documentation', 'approvals', 'signatures'],
    timing: 'Late',
    status: 'active'
  },
  {
    id: 6,
    name: 'Implicate',
    description: 'Understanding of customer\'s pain points',
    compliance: 78,
    aiComment: 'Strong in discovery, but needs reinforcement',
    keywords: ['pain points', 'challenges', 'problems', 'impact'],
    timing: 'Early',
    status: 'active'
  },
  {
    id: 7,
    name: 'Champion',
    description: 'Internal advocate for the solution',
    compliance: 82,
    aiComment: 'Well identified but needs more engagement',
    keywords: ['champion', 'advocate', 'sponsor', 'influencer'],
    timing: 'Mid',
    status: 'active'
  },
  {
    id: 8,
    name: 'Competition',
    description: 'Understanding of competitive landscape',
    compliance: 75,
    aiComment: 'Often discussed too late in the process',
    keywords: ['competitor', 'alternative', 'differentiation', 'advantage'],
    timing: 'Mid',
    status: 'active'
  },
  {
    id: 9,
    name: 'Pricing Confidence',
    description: 'Customer\'s confidence in pricing and value',
    compliance: 62,
    aiComment: 'New addition - needs more focus',
    keywords: ['pricing', 'value', 'budget', 'ROI'],
    timing: 'Mid',
    status: 'suggested'
  }
];

const aiInsights = {
  winningPatterns: [
    'Early metrics discussion correlates with 74% higher win rate',
    'Champions identified in first meeting lead to 2.3x faster deals',
    'Clear decision criteria documented before demo improves success by 45%'
  ],
  suggestedImprovements: [
    {
      type: 'timing',
      insight: 'Move Competition discussion earlier - currently 65% of deals discuss it too late',
      impact: 'High',
      status: 'pending'
    },
    {
      type: 'new',
      insight: 'Add "Pricing Confidence" as new metric - correlates with 40% higher win rate',
      impact: 'High',
      status: 'approved'
    },
    {
      type: 'modification',
      insight: 'Expand Metrics section to include more quantitative KPIs',
      impact: 'Medium',
      status: 'pending'
    }
  ]
};

const sellerStats = [
  { name: 'A. Turner', compliance: 52, note: 'Champion puuttuu usein' },
  { name: 'S. Patel', compliance: 81, note: 'Metrics mainitaan vahvasti' },
  { name: 'L. Martin', compliance: 67, note: 'Paper Process jää vajaaksi' },
];

export default function Playbook() {
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin state
  const [editingSection, setEditingSection] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState('7d');
  const [modalData, setModalData] = useState<any | null>(null);

  // Modal field handlers
  const handleModalChange = (field: string, value: any) => {
    setModalData({ ...modalData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{methodology.name} ({methodology.version})</h1>
            <p className="text-gray-400">{methodology.description}</p>
          </div>
          <div className="text-sm text-gray-400">
            Last updated: {methodology.lastUpdated}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Playbook Table */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Playbook Structure</h2>
                {isAdmin && (
                  <button className="flex items-center gap-2 px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Section
                  </button>
                )}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-400 border-b border-gray-800">
                      <th className="pb-3">Section</th>
                      <th className="pb-3">Description</th>
                      <th className="pb-3">Compliance</th>
                      <th className="pb-3">AI Insights</th>
                      {isAdmin && <th className="pb-3">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {playbookData.map((section) => (
                      <tr key={section.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            {section.name}
                            {section.status === 'suggested' && (
                              <span className="px-2 py-0.5 text-xs bg-blue-600 rounded-full">New</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 text-gray-400">{section.description}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-gray-700 rounded-full">
                              <div 
                                className="h-full bg-blue-600 rounded-full"
                                style={{ width: `${section.compliance}%` }}
                              />
                            </div>
                            <span>{section.compliance}%</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="text-gray-400 hover:text-white">
                                {section.aiComment}
                              </TooltipTrigger>
                              <TooltipContent className="max-w-md">
                                <p>Timing: {section.timing}</p>
                                <p>Keywords: {section.keywords.join(', ')}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </td>
                        {isAdmin && (
                          <td className="py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-1 hover:bg-gray-700 rounded">
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button className="p-1 hover:bg-gray-700 rounded">
                                <Trash className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* AI Insights */}
          <div className="space-y-6">
            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">Winning Patterns</h2>
              <div className="space-y-4">
                {aiInsights.winningPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 h-5 w-5 mt-0.5" />
                    <span className="text-sm">{pattern}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-gray-900 p-6">
              <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
              <div className="space-y-4">
                {aiInsights.suggestedImprovements.map((suggestion, index) => (
                  <div key={index} className="border border-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{suggestion.type}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        suggestion.status === 'approved' ? 'bg-green-600' : 'bg-yellow-600'
                      }`}>
                        {suggestion.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{suggestion.insight}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Impact: {suggestion.impact}</span>
                      {isAdmin && suggestion.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs bg-green-600 rounded hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-2 py-1 text-xs bg-red-600 rounded hover:bg-red-700">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Myyjäkohtainen seuranta */}
        <div className="bg-gray-900 rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Myyjäkohtainen seuranta</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-gray-800">
                  <th className="py-2">Myyjä</th>
                  <th className="py-2">Compliance-%</th>
                  <th className="py-2">Huomio</th>
                </tr>
              </thead>
              <tbody>
                {sellerStats.map((s, i) => (
                  <tr key={i} className="even:bg-gray-900 hover:bg-gray-800 transition-colors">
                    <td className="py-2 text-white font-medium">{s.name}</td>
                    <td className="py-2 flex items-center gap-2">
                      {s.compliance}%
                      {s.compliance < 60 && <span className="text-yellow-400">⚠️</span>}
                    </td>
                    <td className="py-2 text-gray-300">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Muokkaa -modal */}
        {editingSection && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="max-w-xl w-full bg-gray-900 text-white rounded-xl p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setEditingSection(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-bold mb-4">Muokkaa Playbook-osiota</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-1">Osa-alueen nimi</label>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    value={modalData?.name || ''}
                    onChange={e => handleModalChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Kuvaus</label>
                  <textarea
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    value={modalData?.description || ''}
                    onChange={e => handleModalChange('description', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Esimerkkifraasit</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {(modalData?.keywords || []).map((phrase: string, idx: number) => (
                      <span key={idx} className="bg-blue-800 text-white px-3 py-1 rounded-full text-xs">{phrase}</span>
                    ))}
                  </div>
                  <input
                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    placeholder="Lisää uusi fraasi ja paina Enter"
                    onKeyDown={e => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        handleModalChange('keywords', [...(modalData?.keywords || []), e.currentTarget.value.trim()]);
                        e.currentTarget.value = '';
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="flex gap-4 items-center">
                  <label className="block text-sm">Näytetään missä?</label>
                  <label className="flex items-center gap-1 text-xs">
                    <input type="checkbox" checked={modalData?.showIn?.calls} onChange={e => handleModalChange('showIn', { ...modalData.showIn, calls: e.target.checked })} /> Calls
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input type="checkbox" checked={modalData?.showIn?.meetings} onChange={e => handleModalChange('showIn', { ...modalData.showIn, meetings: e.target.checked })} /> Meetings
                  </label>
                  <label className="flex items-center gap-1 text-xs">
                    <input type="checkbox" checked={modalData?.showIn?.deals} onChange={e => handleModalChange('showIn', { ...modalData.showIn, deals: e.target.checked })} /> Deals
                  </label>
                </div>
                <div>
                  <label className="block text-sm mb-1">Tärkeys</label>
                  <select
                    className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                    value={modalData?.importance || 1}
                    onChange={e => handleModalChange('importance', Number(e.target.value))}
                  >
                    {[1,2,3,4,5].map(n => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
                <div className="text-xs text-gray-500 mt-2">Viimeksi muokattu: {modalData?.lastEdited}</div>
                <div className="flex gap-3 mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 rounded px-4 py-2"
                    onClick={() => setEditingSection(null)}
                  >Tallenna</button>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 rounded px-4 py-2"
                    onClick={() => setEditingSection(null)}
                  >Peruuta</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 