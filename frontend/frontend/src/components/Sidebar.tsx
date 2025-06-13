import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ChartBarIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  BookOpenIcon,
  ChartPieIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
  { name: 'Call Analysis', path: '/calls', icon: ChartBarIcon },
  { name: 'Meetings', path: '/meetings', icon: CalendarIcon },
  { name: 'Deals', path: '/deals', icon: CurrencyDollarIcon },
  { name: 'Playbook', path: '/playbook', icon: BookOpenIcon },
  { name: 'My Performance', path: '/performance', icon: ChartPieIcon },
  { name: 'Settings', path: '/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-56 bg-gray-900 text-white flex flex-col border-r border-gray-800">
      <div className="p-4 mb-6">
        <h1 className="text-2xl font-bold">Carter</h1>
      </div>
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm ${
                isActive 
                  ? 'bg-gray-800 text-white font-semibold border-l-2 border-blue-500' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 