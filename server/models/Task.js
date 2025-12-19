const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  hubId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hub',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  proof: {
    type: String, // Text input for "Proof of Work"
    default: ''
  },
  assignedTo: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Task', taskSchema);