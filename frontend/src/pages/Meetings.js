import React from 'react';
import { CalendarDaysIcon, UserGroupIcon, PlayIcon, LinkIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

function Meetings() {
  const sampleMeetings = [
    {
      id: 1,
      title: 'Q3 Sales Strategy Meeting',
      date: '2024-06-01',
      time: '10:00 AM - 11:00 AM',
      attendees: ['Alice Smith', 'Bob Johnson', 'Charlie Brown'],
      status: 'Completed',
      description: 'Review of Q2 performance and planning for Q3 sales strategies and targets.',
      recordingLink: '#',
      notesLink: '#',
    },
    {
      id: 2,
      title: 'Client Onboarding - Acme Corp',
      date: '2024-06-05',
      time: '02:00 PM - 03:00 PM',
      attendees: ['Alice Smith', 'John Doe (Acme Corp)'],
      status: 'Scheduled',
      description: 'Initial onboarding session with Acme Corp to set up their account and demonstrate key features.',
      recordingLink: null,
      notesLink: '#',
    },
    {
      id: 3,
      title: 'Weekly Sales Sync',
      date: '2024-06-03',
      time: '09:00 AM - 09:30 AM',
      attendees: ['Sales Team'],
      status: 'Completed',
      description: 'Quick sync-up on weekly progress, challenges, and upcoming priorities.',
      recordingLink: '#',
      notesLink: '#',
    },
    {
      id: 4,
      title: 'Product Feedback Session',
      date: '2024-06-10',
      time: '03:00 PM - 04:00 PM',
      attendees: ['Bob Johnson', 'Product Team'],
      status: 'Scheduled',
      description: 'Gathering feedback on new product features from the sales team.',
      recordingLink: null,
      notesLink: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Meetings</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming & Recent Meetings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleMeetings.map((meeting) => (
                <tr key={meeting.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{meeting.title}</div>
                    <div className="text-sm text-gray-500">{meeting.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <CalendarDaysIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{meeting.date} at {meeting.time}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <UserGroupIcon className="h-4 w-4 mr-1 text-gray-400" />
                      <span>{meeting.attendees.join(', ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${meeting.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {meeting.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      {meeting.recordingLink && (
                        <a href={meeting.recordingLink} className="text-blue-600 hover:text-blue-900 flex items-center">
                          <PlayIcon className="h-4 w-4 mr-1" />Recording
                        </a>
                      )}
                      <a href={meeting.notesLink} className="text-blue-600 hover:text-blue-900 flex items-center">
                        <DocumentTextIcon className="h-4 w-4 mr-1" />Notes
                      </a>
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

export default Meetings; 