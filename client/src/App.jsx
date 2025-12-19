import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import JoinHub from './pages/JoinHub';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import TutorialPage from './pages/TutorialPage'; // Ensure this matches your file name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/join" element={<JoinHub />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/hub/:roomCode" element={<Dashboard />} />
        <Route path="/task/:taskId" element={<TaskDetails />} />
      </Routes>
    </Router>
  );
}

export default App;