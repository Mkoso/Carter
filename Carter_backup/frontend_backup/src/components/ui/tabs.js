import React from 'react';

export function Tabs({ defaultValue, className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

export function TabsList({ className, children }) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 text-sm font-medium rounded-md hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  return (
    <div className="mt-4">
      {children}
    </div>
  );
} 