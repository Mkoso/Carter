import React, { useState } from 'react';
import {
  PhoneIcon,
  CalendarIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const calls = [
  {
    id: 1,
    person: 'John Smith',
    company: 'Acme Corp',
    date: '2024-03-20',
    time: '10:00 AM',
    duration: '15:23',
    status: 'completed',
    notes: 'Discussed pricing and implementation timeline. Follow-up meeting scheduled.',
  },
  {
    id: 2,
    person: 'Sarah Johnson',
    company: 'TechStart',
    date: '2024-03-20',
    time: '2:30 PM',
    duration: '20:15',
    status: 'scheduled',
    notes: 'Initial discovery call to understand requirements.',
  },
  {
    id: 3,
    person: 'Mike Brown',
    company: 'Global Inc',
    date: '2024-03-19',
    time: '11:45 AM',
    duration: '12:30',
    status: 'completed',
    notes: 'Product demo completed. Interested in enterprise plan.',
  },
];

function CallDetails({ call, onClose }) {
  if (!call) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <UserCircleIcon className="h-16 w-16 text-gray-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{call.person}</h3>
              <p className="text-sm text-gray-500">{call.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="text-lg font-medium">{call.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="text-lg font-medium">{call.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-medium">{call.duration}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  call.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {call.status}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
            <p className="text-gray-600">{call.notes}</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
              Edit
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Schedule Follow-up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Calls() {
  const [selectedCall, setSelectedCall] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Calls</h1>
        <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          New Call
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Calls</h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {calls.map((call) => (
              <li key={call.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PhoneIcon className="h-6 w-6 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{call.person}</p>
                      <p className="text-sm text-gray-500">{call.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-sm text-gray-500">
                      {call.date} at {call.time}
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        call.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {call.status}
                    </span>
                    <button
                      onClick={() => setSelectedCall(call)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedCall && (
        <CallDetails call={selectedCall} onClose={() => setSelectedCall(null)} />
      )}
    </div>
  );
}

export default Calls; 