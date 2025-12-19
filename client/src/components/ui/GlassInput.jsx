import React from 'react';

const GlassInput = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">{label}</label>}
      <input
        className="
          w-full bg-black/20 text-white 
          placeholder-gray-500
          border border-white/5 rounded-xl 
          px-4 py-3
          outline-none
          focus:border-blue-400/50 focus:bg-black/30
          focus:ring-2 focus:ring-blue-500/20
          transition-all duration-200
        "
        {...props}
      />
    </div>
  );
};

export default GlassInput;