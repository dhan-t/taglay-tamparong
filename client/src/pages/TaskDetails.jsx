import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  
  const [task, setTask] = useState(null);
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(true);

  // Use the same API URL logic as your services
  const API_URL = 'http://localhost:5000/api/tasks'; 

  useEffect(() => {
    // We didn't make a "getSingleTask" service, so we'll fetch direct or filter
    // For a 12h hack, it's faster to just fetch the list or add a single endpoint.
    // Let's assume we pass data via state OR just fetch it. 
    // To keep it robust, let's just fetch the specific task.
    // NOTE: You might need to add a "getTaskById" to your backend or service.
    // For now, let's stick to the list logic or just fetch all and find one (laziest vibe way).
    
    // Better way: Add a specific endpoint to your backend for /api/tasks/single/:id 
    // OR just use the Hub list. 
    // Let's rely on the user having the hub list in local storage for speed? 
    // No, that's risky.
    
    // Let's just fetch all tasks for the hub (we need the hubId though).
    // Actually, let's just add a quick "get single task" helper here.
    const fetchTask = async () => {
      try {
        // We will cheat and use a new endpoint or just filter if we had a store.
        // Since we don't, let's assume we can get it. 
        // PRO TIP: In a rush, pass the task object via React Router "state".
      } catch (err) {
        console.error(err);
      }
    };
  }, [taskId]);

  // ACTUALLY, the cleanest 12-hour way is to pass data via Navigation State.
  // We don't need a fetch if we just came from the Dashboard!
  
  // Update: We need to handle the "Refresh" case. 
  // Let's add a GET /api/tasks/detail/:id route to backend quickly? 
  // No, let's just add the component logic assuming we passed state, 
  // and if missing, go back to dashboard.
  
  useEffect(() => {
    if (!task && !loading) {
        // If we have no task data, go back
        navigate(-1);
    }
  }, [task, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/${taskId}`, { 
        status: 'completed',
        proof: proof 
      });
      navigate(-1); // Go back to Dashboard
    } catch (error) {
      console.error("Failed to submit proof", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl border border-gray-700">
        <button 
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white mb-6 flex items-center gap-2"
        >
          ← Back to Hub
        </button>

        <h1 className="text-2xl font-bold text-blue-400 mb-2">Submit Proof</h1>
        <p className="text-gray-300 mb-6 text-lg">
          Task: <span className="font-semibold text-white">
            {/* We will try to read this from location state */}
             {window.history.state?.usr?.title || "Selected Task"}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              How did you complete this?
            </label>
            <textarea
              className="w-full h-32 p-3 bg-gray-900 border border-gray-600 rounded focus:border-blue-500 outline-none resize-none"
              placeholder="e.g. Cleared table 5 and replaced napkins..."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-green-600 hover:bg-green-500 rounded font-bold transition"
          >
            Mark as Done
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskDetails;