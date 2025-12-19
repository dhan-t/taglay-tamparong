import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../services/taskService';

const Dashboard = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  
  const [hub, setHub] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Load Hub & Tasks on Mount
  useEffect(() => {
    const storedHub = localStorage.getItem('currentHub');
    if (!storedHub) {
      navigate('/'); // Redirect if no session
      return;
    }
    
    const parsedHub = JSON.parse(storedHub);
    if (parsedHub.roomCode !== roomCode) {
      navigate('/'); // Security check: URL must match session
      return;
    }

    setHub(parsedHub);
    fetchTasks(parsedHub._id);
  }, [roomCode, navigate]);

  const fetchTasks = async (hubId) => {
    try {
      const data = await getTasks(hubId);
      setTasks(data);
    } catch (error) {
      console.error("Failed to load tasks", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle New Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = await createTask({
        hubId: hub._id,
        title: newTask,
        status: 'pending'
      });
      setTasks([task, ...tasks]); // Add to top of list
      setNewTask('');
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  // 3. Handle Status Toggle
  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    
    // Optimistic UI Update (feels faster)
    setTasks(tasks.map(t => 
      t._id === task._id ? { ...t, status: newStatus } : t
    ));

    await updateTaskStatus(task._id, newStatus);
  };

  // 4. Handle Delete
  const handleDelete = async (taskId) => {
    setTasks(tasks.filter(t => t._id !== taskId)); // Remove immediately
    await deleteTask(taskId);
  };

  if (loading) return <div className="text-white text-center mt-20">Loading Hub...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8 border-b border-gray-700 pb-4">
          <div>
            <span className="text-gray-400 text-sm">HUB PIN: {hub.roomCode}</span>
            <h1 className="text-3xl font-bold text-blue-400">{hub.name}</h1>
          </div>
          <button 
            onClick={() => { localStorage.removeItem('currentHub'); navigate('/'); }}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Leave Hub
          </button>
        </div>

        {/* Input Area */}
        <form onSubmit={handleAddTask} className="mb-8 flex gap-2">
          <input
            type="text"
            className="flex-1 p-4 bg-gray-800 rounded-lg border border-gray-700 focus:border-blue-500 outline-none"
            placeholder="What needs to be done?"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button 
            type="submit"
            className="bg-blue-600 px-6 rounded-lg font-bold hover:bg-blue-500 transition"
          >
            Add
          </button>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 py-10">No tasks yet. Start the vibe!</div>
          )}
          
          {tasks.map(task => (
            <div 
              key={task._id} 
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                task.status === 'completed' 
                  ? 'bg-gray-800 border-gray-700 opacity-60' 
                  : 'bg-gray-800 border-blue-900'
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Checkmark Button (Keep this for quick toggle if proof isn't needed) */}
                <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent clicking the parent div
                    toggleStatus(task);
                }}
                className="..."
                >
                {/* ... icon */}
                </button>

                {/* The Task Title - NOW CLICKABLE */}
                <span 
                onClick={() => navigate(`/task/${task._id}`, { state: { title: task.title } })}
                className={`cursor-pointer hover:text-blue-400 ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}
                >
                {task.title}
                </span>
            </div>
              
              <button 
                onClick={() => handleDelete(task._id)}
                className="text-gray-600 hover:text-red-400 px-2"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;