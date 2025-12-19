import React from 'react';

const GlassButton = ({ children, variant = 'primary', className = "", ...props }) => {
  const baseStyle = "px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 shadow-lg shadow-blue-900/20 border border-blue-400/20 text-white",
    danger: "bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 shadow-lg shadow-red-900/20 border border-red-400/20 text-white",
    ghost: "bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white backdrop-blur-md",
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default GlassButton;