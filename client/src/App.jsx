import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JoinHub from './pages/JoinHub';
import Dashboard from './pages/Dashboard'; // Import is now real!
import TaskDetails from './pages/TaskDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinHub />} />
        {/* Pass roomCode as a parameter */}
        <Route path="/hub/:roomCode" element={<Dashboard />} /> 
        <Route path="*" element={<div className="text-white">404 Not Found</div>} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
};

export default App;4711