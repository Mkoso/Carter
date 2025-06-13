import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex bg-gray-950 text-white">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-screen">
        <Topbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 