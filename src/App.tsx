import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Rules from './pages/Rules';
import JobRules from './pages/JobRules';
import RobberyRules from './pages/RobberyRules';
import GangRules from './pages/GangRules';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
        </motion.div>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/global" replace />} />
            <Route path="/global" element={<Rules />} />
            <Route path="/jobs" element={<JobRules />} />
            <Route path="/robberies" element={<RobberyRules />} />
            <Route path="/gangs" element={<GangRules />} />
            <Route path="*" element={<Navigate to="/global" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
