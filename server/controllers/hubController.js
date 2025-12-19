const Hub = require('../models/Hub');

// Helper: Generate 4-digit PIN for Staff, 6-digit for Admin
const generatePin = (len) => {
  const min = Math.pow(10, len - 1);
  const max = Math.pow(10, len) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

// CREATE: Generates a Hub with TWO codes
exports.createHub = async (req, res) => {
  try {
    let unique = false;
    let roomCode = '';
    let adminCode = '';

    while (!unique) {
      roomCode = generatePin(4); // e.g. "3920"
      adminCode = generatePin(6); // e.g. "928374"
      
      const existing = await Hub.findOne({ 
        $or: [{ roomCode }, { adminCode }] 
      });
      if (!existing) unique = true;
    }

    const newHub = new Hub({
      roomCode,
      adminCode,
      name: req.body.name || "Untitled Event"
    });

    const savedHub = await newHub.save();
    
    // Return both codes to the creator so they can share them
    res.status(201).json({
      _id: savedHub._id,
      name: savedHub.name,
      roomCode: savedHub.roomCode,
      adminCode: savedHub.adminCode,
      role: 'manager' // Creator is always manager
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// JOIN: Determines Role based on the Code entered
exports.joinHub = async (req, res) => {
  try {
    const { code } = req.body; // User sends ONE code (either 4 or 6 digits)

    // 1. Try finding by Room Code (Staff)
    let hub = await Hub.findOne({ roomCode: code });
    if (hub) {
      return res.status(200).json({
        _id: hub._id,
        name: hub.name,
        roomCode: hub.roomCode,
        role: 'staff' // Limited permissions
      });
    }

    // 2. Try finding by Admin Code (Manager)
    hub = await Hub.findOne({ adminCode: code });
    if (hub) {
      return res.status(200).json({
        _id: hub._id,
        name: hub.name,
        roomCode: hub.roomCode, // Return the public code so they can share it
        adminCode: hub.adminCode,
        role: 'manager' // Full permissions
      });
    }

    res.status(404).json({ message: "Invalid Room or Admin Code" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};