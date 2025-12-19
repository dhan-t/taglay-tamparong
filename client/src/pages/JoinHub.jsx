import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHub, joinHub } from '../services/hubService';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import { motion, AnimatePresence } from 'framer-motion';

const JoinHub = () => {
  // Modes: 'staff' (join via PIN), 'manager' (join via Admin Code), 'create' (new event)
  const [mode, setMode] = useState('staff'); 
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let hubData;
      if (mode === 'create') {
        hubData = await createHub(inputVal);
      } else {
        // Backend handles 4-digit (staff) or 6-digit (manager) validation
        hubData = await joinHub(inputVal);
      }
      localStorage.setItem('currentHub', JSON.stringify(hubData)); 
      navigate(`/hub/${hubData.roomCode}`);
    } catch (err) {
      setError(err.toString());
    }
  };

  const getThemeColor = () => {
    if (mode === 'staff') return 'from-blue-600 to-blue-500';
    if (mode === 'manager') return 'from-purple-600 to-purple-500';
    return 'from-green-600 to-green-500';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-y-auto selection:bg-blue-500/30">
      
      <div className="flex flex-col items-center justify-center pt-20 pb-20 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 mb-4 italic tracking-tighter">
            QuickTask
          </h1>
          <p className="text-lg text-blue-200/60 font-light">
            Ephemeral synchronization for high-stakes teams.
          </p>
        </div>

        <GlassCard className="w-full max-w-lg p-8 shadow-2xl border-white/5">
          {/* 3-Way Segmented Control */}
          <div className="flex mb-10 bg-black/40 rounded-2xl p-1.5 border border-white/5 shadow-inner">
            <button 
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'staff' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => { setMode('staff'); setInputVal(''); }}
            >
              Staff
            </button>
            <button 
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'manager' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => { setMode('manager'); setInputVal(''); }}
            >
              Manager
            </button>
            <button 
              className={`flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'create' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-500 hover:text-gray-300'}`}
              onClick={() => { setMode('create'); setInputVal(''); }}
            >
              New Hub
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassInput
                  label={
                    mode === 'staff' ? 'Room Access PIN' : 
                    mode === 'manager' ? 'Administrative Code' : 
                    'Event Identification'
                  }
                  type="text"
                  placeholder={
                    mode === 'staff' ? "Enter 4-digit PIN" : 
                    mode === 'manager' ? "Enter 6-digit Code" : 
                    "e.g. Wedding_VIP_Lounge"
                  }
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  required
                />
                <p className="text-[10px] text-gray-500 mt-2 ml-1 font-mono uppercase tracking-tighter italic">
                  {mode === 'staff' && "// Check with your lead for the 4-digit PIN"}
                  {mode === 'manager' && "// Enter the secret code generated at creation"}
                  {mode === 'create' && "// Temporary hub will expire in 24 hours"}
                </p>
              </motion.div>
            </AnimatePresence>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-[10px] font-bold p-3 rounded-lg text-center uppercase tracking-widest">
                {error}
              </div>
            )}

            <GlassButton 
              type="submit" 
              className={`w-full py-5 text-sm uppercase tracking-[0.2em] ${getThemeColor()}`}
            >
              {mode === 'create' ? 'Initialize Hub' : 'Enter Session'}
            </GlassButton>
          </form>
        </GlassCard>
      </div>
<div className="max-w-5xl mx-auto px-6 py-24 space-y-20">
  {/* The Definitions */}
  <div className="grid md:grid-cols-2 gap-6">
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">🚀</div>
      <h3 className="text-xl font-bold text-white mb-2">Join Hub</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-light">
        For staff and volunteers. Enter the 4-digit PIN provided by your manager to view the checklist. No account required.
      </p>
    </div>
    <div className="p-8 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-2xl">👑</div>
      <h3 className="text-xl font-bold text-white mb-2">Manager Access</h3>
      <p className="text-gray-400 text-sm leading-relaxed font-light">
        Use your 6-digit Admin Code to manage tasks, delete entries, and view proof of work.
      </p>
    </div>
  </div>

  {/* Visual Workflow */}
  <div className="text-center">
    <h2 className="text-3xl font-bold text-white mb-10 tracking-tight">How It Works</h2>
    <div className="grid md:grid-cols-3 gap-8 relative">
      <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl shadow-xl mb-6">📝</div>
        <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest">1. Create</h4>
        <p className="text-[10px] text-gray-500 mt-2 max-w-[150px]">Name your event and list your to-dos.</p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl shadow-xl mb-6">📢</div>
        <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest">2. Share</h4>
        <p className="text-[10px] text-gray-500 mt-2 max-w-[150px]">Give the 4-digit PIN to your team.</p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center text-4xl shadow-xl mb-6">✅</div>
        <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest">3. Track</h4>
        <p className="text-[10px] text-gray-500 mt-2 max-w-[150px]">Watch progress bars update live.</p>
      </div>
    </div>
  </div>
</div>
      {/* Footer Branding */}
      <footer className="max-w-5xl mx-auto py-12 border-t border-white/5 text-center">
        <p className="text-[9px] text-gray-700 font-mono uppercase tracking-[0.5em]">
          QuickTask | For the love of tech.
        </p>
      </footer>
    </div>
  );
};

export default JoinHub;