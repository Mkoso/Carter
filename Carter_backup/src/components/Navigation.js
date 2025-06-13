import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700';
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              Carter
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`${isActive('/')} text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Dashboard
            </Link>
            <Link
              to="/calls"
              className={`${isActive('/calls')} text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Calls
            </Link>
            <Link
              to="/meetings"
              className={`${isActive('/meetings')} text-white px-3 py-2 rounded-md text-sm font-medium`}
            >
              Meetings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation; 