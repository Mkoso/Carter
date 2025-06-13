import React from 'react';
import { FunnelIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

function Deals() {
  const pipelineStages = [
    { name: 'Prospecting', deals: 50, value: '€500,000', conversionRate: '20%' },
    { name: 'Qualification', deals: 30, value: '€400,000', conversionRate: '30%' },
    { name: 'Proposal', deals: 20, value: '€300,000', conversionRate: '40%' },
    { name: 'Negotiation', deals: 10, value: '€200,000', conversionRate: '50%' },
    { name: 'Closed Won', deals: 5, value: '€100,000', conversionRate: '100%' },
  ];

  const recentDeals = [
    { id: 1, name: 'Acme Corp Software License', stage: 'Negotiation', value: '€50,000', closeDate: '2024-06-30', status: 'Active' },
    { id: 2, name: 'Globex Inc. Consulting Services', stage: 'Proposal', value: '€35,000', closeDate: '2024-06-25', status: 'Active' },
    { id: 3, name: 'Stark Industries Hardware Upgrade', stage: 'Qualification', value: '€75,000', closeDate: '2024-07-15', status: 'Stalled' },
    { id: 4, name: 'Wayne Enterprises Cloud Migration', stage: 'Closed Won', value: '€120,000', closeDate: '2024-05-28', status: 'Closed Won' },
  ];

  const stalledDeals = recentDeals.filter(deal => deal.status === 'Stalled');

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Deals</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Deals content will be here</p>
      </div>
    </div>
  );
}

export default Deals; 