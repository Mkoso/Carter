import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  // Get initials from email
  const getInitials = (email: string) => {
    return email.split('@')[0].slice(0, 2).toUpperCase();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Carter</h1>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Dashboard</span>
        </Link>
        <Link
          to="/call-analysis"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/call-analysis') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Call Analysis</span>
        </Link>
        <Link
          to="/meetings"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/meetings') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Meetings</span>
        </Link>
        <Link
          to="/deals"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/deals') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Deals</span>
        </Link>
        <Link
          to="/playbook"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/playbook') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Playbook</span>
        </Link>
        <Link
          to="/my-performance"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/my-performance') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>Performance</span>
        </Link>
            <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
            isActive('/settings') ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
          <span>Settings</span>
            </Link>
      </nav>
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm">
            {user ? getInitials(user.email) : '??'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{user ? user.email : 'Not logged in'}</p>
          </div>
          <button
            onClick={logout}
            className="px-3 py-1 text-sm bg-gray-800 text-gray-400 rounded hover:bg-gray-700 hover:text-white transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 