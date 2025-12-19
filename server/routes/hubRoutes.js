const express = require('express');
const router = express.Router();
const hubController = require('../controllers/hubController');

router.post('/', hubController.createHub);
router.post('/join', hubController.joinHub); // New Logic

module.exports = router;