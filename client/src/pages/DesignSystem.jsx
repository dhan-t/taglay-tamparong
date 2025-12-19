import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassInput from '../components/ui/GlassInput';
import GlassBadge from '../components/ui/GlassBadge';

const DesignSystem = () => {
  return (
    <div className="min-h-screen p-10 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white">
          Liquid Glass Design System
        </h1>
        <p className="text-gray-400">Atomic Components for QuickTask</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        
        {/* SECTION 1: Typography & Containers */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-300">1. Containers (GlassCard)</h2>
          <GlassCard>
            <h3 className="text-2xl font-bold mb-2">The Glass Card</h3>
            <p className="text-gray-400 mb-4">
              This uses a backdrop-blur-xl effect with a thin white border opacity. 
              It mimics the Apple visionOS depth material.
            </p>
            <div className="flex gap-2">
               <GlassBadge status="manager" />
               <GlassBadge status="staff" />
            </div>
          </GlassCard>
        </section>

        {/* SECTION 2: Form Elements */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-300">2. Inputs</h2>
          <GlassCard>
            <GlassInput label="Hub Name" placeholder="e.g. Project X Launch" />
            <GlassInput label="Room PIN" placeholder="0000" />
            <GlassInput label="Proof of Work" placeholder="Describe what you did..." />
          </GlassCard>
        </section>

        {/* SECTION 3: Action Buttons */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-300">3. Buttons</h2>
          <GlassCard className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <GlassButton variant="primary">Primary Action</GlassButton>
              <GlassButton variant="ghost">Secondary / Cancel</GlassButton>
              <GlassButton variant="danger">Delete Task</GlassButton>
            </div>
            <div className="w-full">
               <GlassButton className="w-full">Full Width Button</GlassButton>
            </div>
          </GlassCard>
        </section>

        {/* SECTION 4: Status Badges */}
        <section className="space-y-6">
          <h2 className="text-xl font-bold text-gray-300">4. Data States</h2>
          <GlassCard>
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span>Task Statuses</span>
                  <div className="flex gap-2">
                    <GlassBadge status="pending" />
                    <GlassBadge status="in-progress" />
                    <GlassBadge status="completed" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Role Types</span>
                  <div className="flex gap-2">
                    <GlassBadge status="manager" />
                    <GlassBadge status="staff" />
                  </div>
                </div>
             </div>
          </GlassCard>
        </section>

      </div>
    </div>
  );
};

export default DesignSystem;