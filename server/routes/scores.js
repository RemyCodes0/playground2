const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');
const verifyToken = require('../middleware/auth');

// Create a new score
router.post('/', verifyToken, scoreController.createScore);

// Get scores for a user
router.get('/user/:userId', verifyToken, scoreController.getUserScores);

// Get latest score for a user
router.get('/user/:userId/latest', verifyToken, scoreController.getLatestScore);

module.exports = router; 