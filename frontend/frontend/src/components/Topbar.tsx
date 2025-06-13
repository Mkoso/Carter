import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <header className="flex justify-between items-center px-6 py-3 border-b border-gray-800 bg-gray-900 text-white">
      <div className="flex gap-2">
        {["1d", "7d", "30d", "1y"].map((period) => (
          <button
            key={period}
            className="text-sm px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 transition"
          >
            {period}
          </button>
        ))}
      </div>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded hover:bg-gray-700"
        >
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs">JD</div>
          <span>John Doe</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 bg-gray-800 rounded shadow-md py-2 w-40 z-10">
            <a href="/settings" className="block px-4 py-2 text-sm hover:bg-gray-700">Settings</a>
            <button
              onClick={logout}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
} 