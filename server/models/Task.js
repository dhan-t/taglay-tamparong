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
    // UPDATE THIS LINE: Add 'in-progress'
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending'
  },
  proof: {
    type: String,
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