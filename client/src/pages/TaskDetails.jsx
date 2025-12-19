import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { updateTaskStatus } from '../services/taskService';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const taskTitle = location.state?.title || "Task Details";

  const [proof, setProof] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hub, setHub] = useState(null);

  useEffect(() => {
    const storedHub = localStorage.getItem('currentHub');
    if (storedHub) setHub(JSON.parse(storedHub));
  }, []);

  const handleComplete = async () => {
    if (!proof.trim()) {
      alert("Please provide proof of completion.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Logic: Update status to 'completed' and attach proof text
      await updateTaskStatus(taskId, 'completed', proof);
      navigate(-1); // Go back to dashboard
    } catch (error) {
      console.error("Failed to complete task", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl"
      >
        <GlassCard className="border-white/10 shadow-2xl shadow-blue-900/20 p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <button 
                onClick={() => navigate(-1)}
                className="text-gray-500 hover:text-white transition text-sm font-mono uppercase tracking-widest"
              >
                ← Back
              </button>
              <GlassBadge status="pending" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-200 leading-tight">
              {taskTitle}
            </h1>
          </div>

          {/* Instructions/Role Info */}
          <div className="bg-white/5 border border-white/5 rounded-2xl p-6 mb-8">
            <h3 className="text-s font-bold text-blue-400 uppercase tracking-widest mb-2">Submission Protocol</h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              To verify this task, please describe the actions taken. This proof will be visible to the event manager in real-time.
            </p>
          </div>

          {/* Proof Input */}
          <div className="space-y-4">
            <label className="text-s font-bold text-gray-500 uppercase tracking-widest ml-1">
              Proof of Completion
            </label>
            <textarea
              className="w-full h-40 bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-none shadow-inner"
              placeholder="e.g. Cables have been taped down, microphones tested, and spare batteries placed at the podium."
              value={proof}
              onChange={(e) => setProof(e.target.value)}
            />
          </div>

          {/* Action Button */}
          <div className="mt-10">
            <GlassButton 
              className="w-full py-1 text-lg shadow-lg shadow-blue-600/20"
              onClick={handleComplete}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Verify & Complete Task'}
            </GlassButton>

          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default TaskDetail;