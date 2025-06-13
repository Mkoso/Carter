import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const settingsSections = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'account-management', label: 'Account Management' },
  { id: 'default-account-settings', label: 'Default Account Settings' },
  { id: 'audit-log', label: 'Audit Log' },
  { id: 'users-teams', label: 'Users & Teams' },
  { id: 'product-updates', label: 'Product Updates' },
  { id: 'connected-apps', label: 'Connected Apps' },
  { id: 'private-apps', label: 'Private Apps' },
  { id: 'email-provider', label: 'Email Provider' },
  { id: 'marketplace-downloads', label: 'Marketplace Downloads' },
  { id: 'tracking-code', label: 'Tracking Code' },
  { id: 'privacy-consent', label: 'Privacy & Consent' },
  { id: 'security', label: 'Security' },
  { id: 'brand-identity', label: 'Brand Identity' },
  { id: 'beta', label: 'Beta' },
  { id: 'ai', label: 'AI' },
  { id: 'billing', label: 'Billing' },
  { id: 'new', label: 'New', isNew: true }
];

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar Navigation */}
        <nav className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white shadow-lg lg:shadow-none
          transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="h-full overflow-y-auto py-6 px-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-6 px-2">Settings</h2>
            <ul className="space-y-1">
              {settingsSections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-md text-sm
                      ${activeSection === section.id
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                      flex items-center justify-between
                    `}
                  >
                    <span>{section.label}</span>
                    {section.isNew && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        New
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                {settingsSections.find(s => s.id === activeSection)?.label}
              </h1>
              <p className="text-gray-600">
                Select a setting to view and modify its details. This is a placeholder content area that will be replaced with actual settings content.
              </p>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default SettingsPage; 