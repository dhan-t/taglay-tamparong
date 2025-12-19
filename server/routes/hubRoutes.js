const express = require('express');
const router = express.Router();
const hubController = require('../controllers/hubController');

router.post('/', hubController.createHub);
router.get('/:roomCode', hubController.getHub);

module.exports = router;