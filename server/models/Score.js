const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    gameType: {
        type: String,
        required: true,
        enum: ['ace_it']
    },
    score: {
        type: Number,
        required: true
    },
    scoreType: {
        type: String,
        required: true,
        enum: ['initial_test', 'final_score']
    },
    feedbackRate: {
        type: Number,
        required: function () {
            return this.scoreType === 'final_score';
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Score', scoreSchema); 