const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  adminCode: { 
    type: String,
    required: true, 
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours
  }
});

module.exports = mongoose.model('Hub', hubSchema);