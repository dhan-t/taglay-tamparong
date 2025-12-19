import React from 'react';

const GlassBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-500/20 text-yellow-200 border-yellow-500/30",
    "in-progress": "bg-blue-500/20 text-blue-200 border-blue-500/30",
    completed: "bg-green-500/20 text-green-200 border-green-500/30",
    manager: "bg-purple-500/20 text-purple-200 border-purple-500/30",
    staff: "bg-gray-500/20 text-gray-300 border-gray-500/30",
  };

  return (
    <span className={`
      px-3 py-1 rounded-full text-xs font-medium 
      border backdrop-blur-md
      ${styles[status] || styles.staff}
    `}>
      {status.toUpperCase().replace('-', ' ')}
    </span>
  );
};

export default GlassBadge;