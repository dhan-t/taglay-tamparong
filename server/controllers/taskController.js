const Task = require('../models/Task');

// GET: All tasks for a specific Hub
exports.getTasks = async (req, res) => {
  try {
    const { hubId } = req.params;
    const tasks = await Task.find({ hubId }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Create a new task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH: Update status or add proof
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true } 
    );
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Remove task
exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// --- THIS IS THE MISSING PART CAUSING THE CRASH ---
exports.claimTask = async (req, res) => {
  try {
    const { userName } = req.body; 
    
    const task = await Task.findById(req.params.id);
    
    if (task.assignedTo && task.assignedTo !== userName) {
      return res.status(400).json({ message: "Task already claimed by someone else" });
    }

    task.assignedTo = userName;
    task.status = 'in-progress'; 
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};