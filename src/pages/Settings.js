import React, { useState } from 'react';
import { UserIcon, BellIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const settingsSections = [
  {
    id: 'profile',
    title: 'Profile Settings',
    icon: UserIcon,
    description: 'Manage your personal information and preferences',
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    icon: BellIcon,
    description: 'Configure how and when you receive notifications',
  },
  {
    id: 'integrations',
    title: 'Integrations',
    icon: GlobeAltIcon,
    description: 'Connect and manage your third-party integrations',
  },
  {
    id: 'security',
    title: 'Security',
    icon: ShieldCheckIcon,
    description: 'Manage your security settings and authentication',
  },
];

const integrations = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Sync your calls and meetings with HubSpot CRM',
    status: 'connected',
    icon: 'https://www.hubspot.com/hubfs/assets/hubspot.com/style-guide/brand-guidelines/guidelines_the-logo.svg',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and updates in Slack',
    status: 'disconnected',
    icon: 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
  },
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Schedule and join meetings directly from Zoom',
    status: 'connected',
    icon: 'https://zoom.us/img/logo.png',
  },
];

function IntegrationCard({ integration, onConnect, onDisconnect }) {
  return (
    <div className="bg-[#26272e] rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={integration.icon}
            alt={integration.name}
            className="h-12 w-12 object-contain filter invert brightness-0 saturate-100 hue-rotate-180 contrast-200"
          />
          <div>
            <h3 className="text-lg font-medium text-white">{integration.name}</h3>
            <p className="text-sm text-gray-400">{integration.description}</p>
          </div>
        </div>
        <div>
          {integration.status === 'connected' ? (
            <button
              onClick={() => onDisconnect(integration.id)}
              className="px-4 py-2 text-sm font-medium text-red-400 bg-red-900 rounded-md hover:bg-red-800"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => onConnect(integration.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Connect
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleConnect = (integrationId) => {
    // Handle integration connection
    console.log(`Connecting ${integrationId}`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDisconnect = (integrationId) => {
    // Handle integration disconnection
    console.log(`Disconnecting ${integrationId}`);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-900 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-100">Settings updated successfully</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="text-green-400 hover:text-green-300"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L9.586 10l-1.293 1.293a1 1 0 101.414 1.414L11 11.414l1.293 1.293a1 1 0 001.414-1.414L12.414 10l1.293-1.293a1 1 0 00-1.414-1.414L11 8.586 9.707 7.293z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Navigation */}
      <div className="bg-[#26272e] shadow rounded-lg">
        <nav className="flex space-x-8 px-6 py-4" aria-label="Settings">
          {settingsSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`${
                activeSection === section.id
                  ? 'border-blue-500 text-blue-300'
                  : 'border-transparent text-gray-400 hover:text-white hover:border-gray-700'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
            >
              <section.icon className="h-5 w-5 text-gray-400" />
              <span>{section.title}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Settings Content */}
      <div className="bg-[#26272e] shadow rounded-lg p-6">
        {activeSection === 'profile' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-400">Update your personal information.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-300">
                  First name
                </label>
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-[#1e1f25] text-white"
                />
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-300">
                  Last name
                </label>
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-[#1e1f25] text-white"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-[#1e1f25] text-white"
                />
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
          </div>
        )}

        {activeSection === 'notifications' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Notification Preferences</h3>
              <p className="mt-1 text-sm text-gray-400">Choose how you want to be notified.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Push Notifications</h4>
                  <p className="text-sm text-gray-400">Receive push notifications</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Use setting</span>
                  <span
                    className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Save Changes</Button>
          </div>
        )}

        {activeSection === 'integrations' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Third-Party Integrations</h3>
              <p className="mt-1 text-sm text-gray-400">Connect your account with other services.</p>
            </div>
            <div className="space-y-4">
              {integrations.map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  onConnect={handleConnect}
                  onDisconnect={handleDisconnect}
                />
              ))}
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-400">Manage your account security.</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-white">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">Add an extra layer of security to your account.</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-700 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Enable two-factor authentication</span>
                  <span
                    className="translate-x-0 pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  />
                </button>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Change Password</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings; 