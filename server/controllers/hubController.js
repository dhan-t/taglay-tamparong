const Hub = require('../models/Hub');

// Helper to generate 4-digit PIN
const generatePin = () => Math.floor(1000 + Math.random() * 9000).toString();

// CREATE: New Event Room
exports.createHub = async (req, res) => {
  try {
    let unique = false;
    let roomCode = '';

    // Simple collision check
    while (!unique) {
      roomCode = generatePin();
      const existing = await Hub.findOne({ roomCode });
      if (!existing) unique = true;
    }

    const newHub = new Hub({
      roomCode,
      name: req.body.name || "Untitled Event"
    });

    const savedHub = await newHub.save();
    res.status(201).json(savedHub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ: Join/Find Hub by PIN
exports.getHub = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const hub = await Hub.findOne({ roomCode });
    
    if (!hub) return res.status(404).json({ message: "Hub not found or expired" });
    
    res.status(200).json(hub);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};