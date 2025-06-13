import React from 'react';
import { ChartBarIcon, UserGroupIcon, StarIcon, LightBulbIcon } from '@heroicons/react/24/outline';

function Performance() {
  const overallPerformance = {
    callsMade: 2500,
    meetingsBooked: 320,
    dealsClosed: 150,
    conversionRate: '15%',
    averageCallDuration: '12 min',
    sentimentScore: 'Positive',
  };

  const teamMembersPerformance = [
    {
      id: 1,
      name: 'Alice Smith',
      callsMade: 120,
      meetingsBooked: 15,
      dealsClosed: 8,
      conversionRate: '18%',
      sentiment: 'Positive',
      feedback: 'Alice continues to exceed expectations. Her closing rate is exceptional.',
    },
    {
      id: 2,
      name: 'Bob Johnson',
      callsMade: 90,
      meetingsBooked: 10,
      dealsClosed: 5,
      conversionRate: '12%',
      sentiment: 'Neutral',
      feedback: 'Bob shows consistent effort. Focus on improving discovery call techniques.',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      callsMade: 150,
      meetingsBooked: 20,
      dealsClosed: 10,
      conversionRate: '20%',
      sentiment: 'Highly Positive',
      feedback: 'Charlie is a top performer. Consider him for mentoring junior reps.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">My Performance</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <p>Performance content will be here</p>
      </div>
    </div>
  );
}

export default Performance; 