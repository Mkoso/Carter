import React from 'react';
import Sidebar from './Sidebar';
// import Logo from './Logo';

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow">
          <div className="px-4 py-3">
            {/* <Logo /> */}
            <h1 className="text-3xl font-bold text-gray-900">Layout Test</h1>
          </div>
        </header>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 