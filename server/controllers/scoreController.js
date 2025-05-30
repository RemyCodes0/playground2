const Score = require('../models/Score');

// Create a new score
exports.createScore = async (req, res) => {
    try {
        const { userId, gameType, score, scoreType, feedbackRate } = req.body;

        // Validate required fields
        if (!userId || !gameType || score === undefined || !scoreType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Create new score
        const newScore = new Score({
            userId,
            gameType,
            score,
            scoreType,
            feedbackRate
        });

        await newScore.save();
        res.status(201).json(newScore);
    } catch (error) {
        console.error('Error creating score:', error);
        res.status(500).json({ error: 'Failed to create score' });
    }
};

// Get scores for a user
exports.getUserScores = async (req, res) => {
    try {
        const { userId } = req.params;
        const scores = await Score.find({ userId })
            .sort({ createdAt: -1 })
            .limit(10);
        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).json({ error: 'Failed to fetch scores' });
    }
};

// Get latest score for a user
exports.getLatestScore = async (req, res) => {
    try {
        const { userId } = req.params;
        const score = await Score.findOne({ userId })
            .sort({ createdAt: -1 });
        res.json(score);
    } catch (error) {
        console.error('Error fetching latest score:', error);
        res.status(500).json({ error: 'Failed to fetch latest score' });
    }
}; 