import React from 'react';
import { UserCircleIcon, BellAlertIcon, PuzzlePieceIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

function Settings() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><UserCircleIcon className="h-6 w-6 mr-2" />Profile Settings</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" id="fullName" defaultValue="John Doe" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input type="email" name="email" id="email" defaultValue="john.doe@example.com" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
              <input type="text" name="title" id="title" defaultValue="Sales Manager" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Profile
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><BellAlertIcon className="h-6 w-6 mr-2" />Notification Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">Email Notifications</label>
              <input type="checkbox" id="emailNotifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700">Push Notifications</label>
              <input type="checkbox" id="pushNotifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="smsNotifications" className="text-sm font-medium text-gray-700">SMS Notifications</label>
              <input type="checkbox" id="smsNotifications" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            </div>
            <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Save Notifications
            </button>
          </div>
        </div>

        {/* Integrations */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><PuzzlePieceIcon className="h-6 w-6 mr-2" />Integrations</h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/30" alt="Salesforce" className="h-6 w-6 mr-2" />
                <span className="text-sm font-medium text-gray-900">Salesforce</span>
              </div>
              <button type="button" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Configure</button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/30" alt="HubSpot" className="h-6 w-6 mr-2" />
                <span className="text-sm font-medium text-gray-900">HubSpot</span>
              </div>
              <button type="button" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Configure</button>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <img src="https://via.placeholder.com/30" alt="Zoom" className="h-6 w-6 mr-2" />
                <span className="text-sm font-medium text-gray-900">Zoom</span>
              </div>
              <button type="button" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Connect</button>
            </li>
          </ul>
        </div>

        {/* Security Settings */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center"><ShieldCheckIcon className="h-6 w-6 mr-2" />Security Settings</h2>
          <div className="space-y-4">
            <div>
              <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                Change Password
              </button>
            </div>
            <div>
              <label htmlFor="twoFactorAuth" className="block text-sm font-medium text-gray-700 mb-1">Two-Factor Authentication</label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Enabled for added security.</span>
                <button type="button" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Disable</button>
              </div>
            </div>
            <div>
              <label htmlFor="sessionManagement" className="block text-sm font-medium text-gray-700 mb-1">Session Management</label>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">View and manage active sessions.</span>
                <button type="button" className="text-blue-600 hover:text-blue-900 text-sm font-medium">Manage Sessions</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings; 