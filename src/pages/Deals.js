import React, { useState } from 'react';
import {
  CurrencyDollarIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const pipelineStages = [
  { id: 'qualified', name: 'Qualified', color: 'bg-blue-100 text-blue-800' },
  { id: 'proposal', name: 'Proposal', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'negotiation', name: 'Negotiation', color: 'bg-purple-100 text-purple-800' },
  { id: 'closed', name: 'Closed', color: 'bg-green-100 text-green-800' },
];

const deals = [
  {
    id: 1,
    customer: 'TechCorp Inc',
    value: '$75,000',
    stage: 'qualified',
    lastActivity: '2024-03-15',
    duration: '15 days',
    isStalled: false,
  },
  {
    id: 2,
    customer: 'StartupX',
    value: '$45,000',
    stage: 'proposal',
    lastActivity: '2024-03-14',
    duration: '30 days',
    isStalled: true,
  },
  {
    id: 3,
    customer: 'Global Solutions',
    value: '$120,000',
    stage: 'negotiation',
    lastActivity: '2024-03-13',
    duration: '45 days',
    isStalled: false,
  },
  {
    id: 4,
    customer: 'Innovate Co',
    value: '$90,000',
    stage: 'closed',
    lastActivity: '2024-03-12',
    duration: '60 days',
    isStalled: false,
  },
];

function DealCard({ deal }) {
  const stage = pipelineStages.find(s => s.id === deal.stage);

  return (
    <div className="bg-[#26272e] rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-white">{deal.customer}</h3>
          <p className="text-sm text-gray-400">Last activity: {deal.lastActivity}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-white">{deal.value}</p>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stage.color}`}>
            {stage.name}
          </span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
        <div className="flex items-center text-gray-400">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{deal.duration}</span>
        </div>
        {deal.isStalled && (
          <div className="flex items-center text-yellow-400">
            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
            <span>Stalled</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Deals() {
  const [selectedStage, setSelectedStage] = useState('all');

  const filteredDeals = selectedStage === 'all'
    ? deals
    : deals.filter(deal => deal.stage === selectedStage);

  const stalledDeals = deals.filter(deal => deal.isStalled);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Deals</h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <CurrencyDollarIcon className="-ml-1 mr-2 h-5 w-5" />
          New Deal
        </button>
      </div>

      {/* Pipeline Overview */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-4">Pipeline Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {pipelineStages.map((stage) => (
            <div
              key={stage.id}
              className={`p-4 rounded-lg ${
                stage.id === 'qualified' ? 'bg-blue-700 bg-opacity-30 text-blue-100' :
                stage.id === 'proposal' ? 'bg-yellow-700 bg-opacity-30 text-yellow-100' :
                stage.id === 'negotiation' ? 'bg-purple-700 bg-opacity-30 text-purple-100' :
                'bg-green-700 bg-opacity-30 text-green-100'
              }`}
            >
              <h3 className="text-sm font-medium text-white">{stage.name}</h3>
              <p className="mt-1 text-2xl font-semibold text-white">
                {deals.filter(deal => deal.stage === stage.id).length}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stalled Deals Alert */}
      {stalledDeals.length > 0 && (
        <div className="bg-yellow-900 border-l-4 border-yellow-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-100">
                {stalledDeals.length} deal{stalledDeals.length > 1 ? 's' : ''} {stalledDeals.length > 1 ? 'are' : 'is'} stalled
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pipeline Stages */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-white">Pipeline</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedStage('all')}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedStage === 'all'
                  ? 'bg-blue-800 bg-opacity-30 text-blue-300'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {pipelineStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => setSelectedStage(stage.id)}
                className={`px-3 py-1 rounded-md text-sm font-medium ${
                  selectedStage === stage.id
                    ? 'bg-blue-800 bg-opacity-30 text-blue-300'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {stage.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-white mb-4">Conversion Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#1e1f25] rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-400">Qualified to Proposal</span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">65%</p>
          </div>
          <div className="p-4 bg-[#1e1f25] rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-400">Proposal to Negotiation</span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">45%</p>
          </div>
          <div className="p-4 bg-[#1e1f25] rounded-lg">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-400">Negotiation to Closed</span>
            </div>
            <p className="mt-1 text-2xl font-semibold text-white">30%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deals; 