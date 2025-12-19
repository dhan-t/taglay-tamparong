import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import GlassCard from '../components/ui/GlassCard';
import GlassButton from '../components/ui/GlassButton';
import GlassBadge from '../components/ui/GlassBadge';

// --- Animated Mockup Components ---

const DashboardPreview = () => (
  <div className="relative w-full h-full p-4 flex items-center justify-center overflow-hidden">
    {/* Blue Glow Accent */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
    <GlassCard className="w-full border-white/20 shadow-2xl scale-95 origin-center">
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-4">
        <div className="h-4 w-24 bg-white/10 rounded-full" />
        <GlassBadge status="completed" />
      </div>
      <div className="space-y-4">
        {[
          { t: "Coordinate Lobby Entrance", s: "completed", w: "100%" },
          { t: "Check Stage Lighting", s: "in-progress", w: "65%" },
          { t: "Sync with Audio Crew", s: "pending", w: "0%" }
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className={`w-4 h-4 rounded-full border ${item.s === 'completed' ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'border-gray-600'}`} />
            <div className="flex-1 space-y-2">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: item.w }} 
                  transition={{ duration: 1.5, delay: 0.8 + i * 0.2 }}
                  className="h-full bg-blue-500" 
                />
              </div>
              <div className="text-[9px] text-gray-500 font-mono uppercase">{item.t}</div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

const SyncPreview = () => (
  <div className="relative w-full h-full flex items-center justify-center p-8">
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm relative">
      <GlassCard className="aspect-square flex flex-col items-center justify-center gap-3">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-2xl">📱</motion.div>
        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">STAFF_01</div>
      </GlassCard>
      <GlassCard className="aspect-square flex flex-col items-center justify-center gap-3">
        <div className="text-2xl">💻</div>
        <div className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">MANAGER</div>
      </GlassCard>
      <div className="col-span-2 h-1.5 bg-white/5 rounded-full overflow-hidden mt-4">
        <motion.div 
          animate={{ x: ['-100%', '100%'] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-1/3 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" 
        />
      </div>
    </div>
  </div>
);

const ProofPreview = () => (
  <div className="w-full h-full flex items-center justify-center p-6">
    <GlassCard className="w-full max-w-xs space-y-4">
      <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Submit Proof</div>
      <div className="h-20 w-full bg-black/40 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 text-[10px] leading-relaxed p-4 italic">
        "Refilled the water station and replaced the 5 gal container."
      </div>
      <div className="h-10 w-full bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold tracking-tight">
        MARK AS COMPLETED
      </div>
    </GlassCard>
  </div>
);

// --- Main Page Component ---

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const savedHub = localStorage.getItem('currentHub');
    if (savedHub) {
      const hub = JSON.parse(savedHub);
      navigate(`/hub/${hub.roomCode}`);
    }
  }, [navigate]);

  return (
    <div className="min-h-screen text-white bg-[#0a0a0a] selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-6 backdrop-blur-xl sticky top-0 z-50 border-b border-white/5 bg-black/20">
        <div className="text-xl font-bold tracking-tighter italic text-blue-400">QUICKTASK</div>
        <GlassButton variant="ghost" className="border-white/10" onClick={() => navigate('/join')}>
          Launch App
        </GlassButton>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 md:px-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-left">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-400 text-xs font-bold tracking-widest uppercase">
              Taglay 2025
            </motion.div>
            <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-6xl md:text-7xl font-bold tracking-tight leading-[0.9]">
              Organize teams <br /> <span className="text-blue-500 italic">at light speed.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg text-gray-400 max-w-lg font-light leading-relaxed">
              The high-performance task manager for ephemeral events. No accounts, no delays, just pure real-time coordination.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col md:flex-row gap-4 justify-left">
            <GlassButton className="px-12 py-4 text-lg" onClick={() => navigate('/join')}>
                Create Hub
            </GlassButton>
            <GlassButton variant="ghost" className="px-12 py-4 text-lg border-blue-500/30 text-blue-400" onClick={() => navigate('/tutorial')}>
                Try Me — Interactive Demo
            </GlassButton>
            </motion.div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      {/* Process Section (Alternating Background) */}
      <section id="how-it-works" className="py-32 px-6 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-white">Zero to organized in 60 seconds.</h2>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { n: "01", t: "Generate", d: "Instantly spin up a private hub for your team." },
              { n: "02", t: "Invite", d: "Share the 4-digit PIN for instant anonymous access." },
              { n: "03", t: "Deploy", d: "Watch the dashboard sync live as tasks get finished." }
            ].map((step, i) => (
              <div key={i} className="p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 transition-colors">
                <div className="text-4xl font-black text-blue-500/20 mb-4">{step.n}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{step.t}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zig-Zag Features */}
      <section id="features" className="py-32 px-6 space-y-40 bg-[#0a0a0a] border-t border-white/5">
        <FeatureLayout tag="Live Sync" title="Instant Team Broadcast" desc="Every status change is broadcast to every device instantly. No more shouting across the venue." mockup={<SyncPreview />} />
        <FeatureLayout tag="Accountability" title="Proof of Completion" desc="Require text-based validation for critical tasks. Know exactly how jobs were finished." mockup={<ProofPreview />} reverse />
      </section>

      {/* Metrics (Blue Theme) */}
      <section id="metrics" className="py-24 px-6 bg-blue-500/5 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <Metric n="40%" l="Efficiency Boost" />
          <Metric n="0s" l="Signup Friction" />
          <Metric n="24h" l="Data Expiry" />
          <Metric n="100%" l="Visibility" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 text-[10px] font-mono text-gray-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>QUICKTASK 2025 | For the love of tech.</div>
          <div className="flex gap-8 uppercase tracking-widest text-gray-500">
            <a href="#" className="hover:text-blue-400 transition">Privacy</a>
            <a href="https://www.linkedin.com/in/dhan-t/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">LinkedIn</a>
            <a href="https://github.com/dhan-t/taglay-tamparong" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Github</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Helpers ---

const FeatureLayout = ({ tag, title, desc, mockup, reverse }) => (
  <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-20 max-w-6xl mx-auto`}>
    <div className="flex-1 space-y-6">
      <div className="text-blue-400 font-bold tracking-widest text-[10px] uppercase">{tag}</div>
      <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">{title}</h2>
      <p className="text-lg text-gray-400 font-light leading-relaxed">{desc}</p>
    </div>
    <div className="flex-1 w-full bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden min-h-[300px] flex items-center justify-center">
      {mockup}
    </div>
  </div>
);

const Metric = ({ n, l }) => (
  <div className="text-center">
    <div className="text-5xl font-bold text-blue-500 mb-2">{n}</div>
    <div className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">{l}</div>
  </div>
);

export default Landing;