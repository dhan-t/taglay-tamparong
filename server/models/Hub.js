const mongoose = require('mongoose');

const hubSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    default: "New Event Hub"
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // TTL Index: Auto-deletes doc after 24 hours (86400 seconds)
  }
});

module.exports = mongoose.model('Hub', hubSchema);