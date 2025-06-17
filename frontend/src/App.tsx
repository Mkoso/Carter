import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Dashboard from './pages/Dashboard.tsx';
import CallAnalysis from './pages/CallAnalysis.tsx';
import Meetings from './pages/Meetings.tsx';
import Deals from './pages/Deals.tsx';
import Playbook from './pages/Playbook.tsx';
import Performance from './pages/Performance.tsx';
import Settings from './pages/Settings.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import PrivateRoute from './components/PrivateRoute.tsx';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/call-analysis" element={<CallAnalysis />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/playbook" element={<Playbook />} />
              <Route path="/my-performance" element={<Performance />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            </Route>
          </Routes>
      </div>
    </Router>
  );
};

export default App;
