import React from 'react';

const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`
      relative overflow-hidden
      bg-white/5 
      backdrop-blur-xl 
      border border-white/10 
      shadow-xl 
      rounded-2xl 
      p-6
      transition-all duration-300
      hover:bg-white/10 hover:border-white/20
      ${className}
    `}>
      {children}
    </div>
  );
};

export default GlassCard;