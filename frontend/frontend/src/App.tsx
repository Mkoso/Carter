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
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold text-gray-900">Carter</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Layout><Dashboard /></Layout>} />
              <Route path="/call-analysis" element={<Layout><CallAnalysis /></Layout>} />
              <Route path="/meetings" element={<Layout><Meetings /></Layout>} />
              <Route path="/deals" element={<Layout><Deals /></Layout>} />
              <Route path="/playbook" element={<Layout><Playbook /></Layout>} />
              <Route path="/my-performance" element={<Layout><Performance /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
