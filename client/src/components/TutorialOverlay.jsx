import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassCard from './ui/GlassCard';
import GlassButton from './ui/GlassButton';

const steps = [
  {
    title: "Welcome to the Lab",
    content: "This is a sandbox environment. No data is saved to the cloud, so feel free to experiment with the interface.",
  },
  {
    title: "Real-Time Progress",
    content: "In a real Hub, the progress bar updates instantly for everyone as tasks are completed.",
  },
  {
    title: "Verification Protocol",
    content: "Managers can require 'Proof of Work' notes. Click a task name to see how staff submit verification.",
  }
];

const TutorialOverlay = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <GlassCard className="max-w-sm border-blue-500/30 shadow-2xl relative">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">
                  Guide // Step {currentStep + 1} of {steps.length}
                </span>
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition">✕</button>
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{steps[currentStep].title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8">
                {steps[currentStep].content}
              </p>

              <div className="flex gap-3">
                {currentStep < steps.length - 1 ? (
                  <GlassButton className="w-full py-3 text-xs" onClick={() => setCurrentStep(s => s + 1)}>
                    Next Module
                  </GlassButton>
                ) : (
                  <GlassButton className="w-full py-3 text-xs from-green-600 to-green-500" onClick={() => setIsOpen(false)}>
                    Finish Tutorial
                  </GlassButton>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TutorialOverlay; // THIS LINE FIXES YOUR ERROR