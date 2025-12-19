import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHub, joinHub } from '../services/hubService'; // Import joinHub

const JoinHub = () => {
  const [isJoin, setIsJoin] = useState(true); 
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      let hubData;
      
      if (isJoin) {
        // JOIN LOGIC: Uses the new 'joinHub' service
        hubData = await joinHub(inputVal); 
      } else {
        // CREATE LOGIC
        hubData = await createHub(inputVal);
      }

      // SAVE SESSION: Now includes 'role' (manager/staff)
      localStorage.setItem('currentHub', JSON.stringify(hubData)); 
      
      // Redirect
      navigate(`/hub/${hubData.roomCode}`);

    } catch (err) {
      console.error(err);
      setError(err.toString());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">QuickTask</h1>
        
        <div className="flex mb-6 bg-gray-700 rounded p-1">
          <button 
            className={`flex-1 py-2 rounded ${isJoin ? 'bg-blue-600' : 'hover:bg-gray-600'}`}
            onClick={() => setIsJoin(true)}
          >
            Join Hub
          </button>
          <button 
            className={`flex-1 py-2 rounded ${!isJoin ? 'bg-green-600' : 'hover:bg-gray-600'}`}
            onClick={() => setIsJoin(false)}
          >
            Create New
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">
              {isJoin ? 'Enter Room PIN or Admin Code' : 'Enter Event Name'}
            </label>
            <input
              type="text"
              className="w-full p-3 bg-gray-900 border border-gray-600 rounded focus:border-blue-500 outline-none transition"
              placeholder={isJoin ? "e.g. 3790" : "e.g. Wedding Buffet"}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            className={`w-full py-3 rounded font-bold transition ${
              isJoin ? 'bg-blue-600 hover:bg-blue-500' : 'bg-green-600 hover:bg-green-500'
            }`}
          >
            {isJoin ? 'Enter Hub' : 'Launch Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinHub;