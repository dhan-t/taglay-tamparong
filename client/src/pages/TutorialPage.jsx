import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { motion, AnimatePresence } from 'framer-motion';
import TutorialOverlay from '../components/TutorialOverlay';
import HubStats from '../components/HubStats';
import GlassCard from '../components/ui/GlassCard';
import GlassBadge from '../components/ui/GlassBadge';
import GlassButton from '../components/ui/GlassButton'; // Import your GlassButton

const TutorialPage = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [tasks, setTasks] = useState([
    { _id: '1', title: 'Test Audio Systems', status: 'completed' },
    { _id: '2', title: 'Verify VIP Guest List', status: 'pending' },
    { _id: '3', title: 'Deploy Security Personnel', status: 'pending' }
  ]);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => 
      t._id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-12">
      <TutorialOverlay />

      <div className="max-w-3xl mx-auto space-y-10">
        <header className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Functional Back Button */}
            <button 
              onClick={() => navigate('/')} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors group"
              title="Return to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div>
              <h1 className="text-4xl font-bold italic tracking-tighter text-blue-200">Sandbox Hub</h1>
              <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-widest">Tutorial_Mode_Active</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <GlassBadge status="manager" />
            <GlassButton 
              variant="ghost" 
              className="py-1 px-3 text-[10px] border-white/5"
              onClick={() => navigate('/')}
            >
              Exit Demo
            </GlassButton>
          </div>
        </header>

        <HubStats tasks={tasks} />

        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">Live Task Feed</h2>
          <AnimatePresence mode="popLayout">
            {tasks.map(task => (
              <motion.div key={task._id} layout>
                <GlassCard className={`flex items-center justify-between transition-opacity ${task.status === 'completed' ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task._id)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${task.status === 'completed' ? 'bg-blue-500 border-blue-500' : 'border-gray-600'}`}
                    >
                      {task.status === 'completed' && <span className="text-black text-[10px] font-bold">✓</span>}
                    </button>
                    <span className={task.status === 'completed' ? 'line-through text-gray-500' : 'text-white font-medium'}>
                      {task.title}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-blue-400 uppercase tracking-tighter">
                    {task.status}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
        
        <footer className="pt-10 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-700 font-mono uppercase tracking-[0.5em]">
            QuickTask | For the love of tech.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default TutorialPage;