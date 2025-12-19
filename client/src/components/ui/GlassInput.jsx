import React from 'react';

const GlassInput = ({ label, ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 w-full">
      {label && <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider ml-1">{label}</label>}
      <input
        className="
          w-full bg-black/20 text-white 
          placeholder-gray-400
          border border-white/10 rounded-xl 
          px-4 py-3
          outline-none
          focus:border-blue-400/50 focus:bg-black/40
          focus:ring-2 focus:ring-blue-500/20
          transition-all duration-200
        "
        {...props}
      />
    </div>
  );
};

export default GlassInput;