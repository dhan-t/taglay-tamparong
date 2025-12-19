const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Note: We use /:hubId to get tasks for a specific room
router.get('/:hubId', taskController.getTasks);
router.post('/', taskController.createTask);
router.patch('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;