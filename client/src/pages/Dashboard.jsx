import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTaskStatus, deleteTask } from '../services/taskService';

import { motion, AnimatePresence } from 'framer-motion';
import HubStats from '../components/HubStats';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

const Dashboard = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  
  const [hub, setHub] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedHub = localStorage.getItem('currentHub');
    if (!storedHub) {
      navigate('/');
      return;
    }
    
    const parsedHub = JSON.parse(storedHub);
    if (parsedHub.roomCode !== roomCode) {
      navigate('/');
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

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const task = await createTask({
        hubId: hub._id,
        title: newTask,
        status: 'pending'
      });
      setTasks([task, ...tasks]);
      setNewTask('');
    } catch (error) {
      console.error("Error creating task", error);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    setTasks(tasks.map(t => 
      t._id === task._id ? { ...t, status: newStatus } : t
    ));
    await updateTaskStatus(task._id, newStatus);
  };

  const handleDelete = async (taskId) => {
    setTasks(tasks.filter(t => t._id !== taskId));
    await deleteTask(taskId);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
       <div className="text-blue-200 font-medium animate-pulse">Synchronizing Hub...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto">
        
        {/* 1. Header Section */}
        <header className="flex justify-between items-start mb-10">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200">
                {hub?.name || 'Loading...'}
              </h1>
              <GlassBadge status={hub?.role} />
            </div>
            <p className="text-blue-200/60 font-mono text-sm tracking-wider uppercase">PIN: {hub?.roomCode}</p>
          </div>
          
          <GlassButton 
            variant="ghost" 
            className="text-sm bg-white/5 hover:bg-white/10"
            onClick={() => { localStorage.removeItem('currentHub'); navigate('/'); }}
          >
            Exit Hub
          </GlassButton>
        </header>

        {/* 2. The Stats Bar */}
        <HubStats tasks={tasks} />

        {/* 3. Input Area (Manager Only) */}
        {hub?.role === 'manager' && (
          <motion.form 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleAddTask} 
            className="mb-10 relative z-10"
          >
            <div className="flex gap-3">
               <input
                type="text"
                className="flex-1 bg-black/20 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 backdrop-blur-md transition-all shadow-inner"
                placeholder="Assign a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-2xl font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
              >
                +
              </button>
            </div>
          </motion.form>
        )}

        {/* 4. The Task List */}
        <div className="space-y-4 pb-24">
          <AnimatePresence mode='popLayout'>
            {tasks.map((task) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <GlassCard className={`flex items-center justify-between group py-5 border-white/10 shadow-xl shadow-blue-900/10 ${task.status === 'completed' ? 'opacity-50 grayscale-[0.6]' : ''}`}>
                  
                  <div className="flex items-center gap-5 flex-1">
                    {/* Status Checkbox */}
                    <button
                      onClick={() => toggleStatus(task)}
                      className={`
                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${task.status === 'completed' 
                          ? 'bg-blue-600 border-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' 
                          : 'border-gray-600 hover:border-blue-400'}
                      `}
                    >
                      {task.status === 'completed' && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white font-bold text-[10px]">✓</motion.span>
                      )}
                    </button>

                    <div className="flex flex-col">
                      <span 
                        onClick={() => navigate(`/task/${task._id}`, { state: { title: task.title } })}
                        className={`cursor-pointer text-lg transition-colors ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white group-hover:text-blue-200'}`}
                      >
                        {task.title}
                      </span>
                    </div>
                  </div>

                  {hub?.role === 'manager' && (
                    <button 
                      onClick={() => handleDelete(task._id)}
                      className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400 transition-all p-2"
                    >
                      ✕
                    </button>
                  )}
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>

          {tasks.length === 0 && !loading && (
            <div className="text-center py-20 opacity-30">
              <p className="text-xl text-gray-400 italic">No tasks active.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;