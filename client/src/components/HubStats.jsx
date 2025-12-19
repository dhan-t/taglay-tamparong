import React from 'react';
import GlassCard from './ui/GlassCard';
import { motion } from 'framer-motion';

const HubStats = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <GlassCard className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h2 className="text-gray-400 text-sm uppercase tracking-wider font-semibold">Event Progress</h2>
          <div className="text-3xl font-bold text-white flex items-baseline gap-2">
            {percentage}% 
            <span className="text-sm text-gray-400 font-normal">
              ({completed}/{total} tasks)
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="h-4 bg-black/30 rounded-full overflow-hidden border border-white/5 relative">
        {/* The Liquid Fill */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, type: "spring" }}
          className="h-full bg-gradient-to-r from-blue-600 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        />
      </div>
    </GlassCard>
  );
};

export default HubStats;