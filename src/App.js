import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Logo from './components/Logo';
import Dashboard from './pages/Dashboard';
import CallAnalysis from './pages/CallAnalysis';
import Meetings from './pages/Meetings';
import Deals from './pages/Deals';
import Playbook from './pages/Playbook';
import Performance from './pages/Performance';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route path="/" element={
        <div className="flex h-screen bg-[#1e1f25]">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8 bg-[#1e1f25]">
              <div className="mb-8">
                <Logo />
              </div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/calls" element={<CallAnalysis />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/deals" element={<Deals />} />
                <Route path="/playbook" element={<Playbook />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </main>
        </div>
      } />
    </Routes>
  );
}

export default App; 