const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['admin', 'player'],
        default: 'Player'
    },
    linkedGames: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    bookmarkedGames: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    playedGames : [{type: mongoose.Schema.Types.ObjectId, ref:'Games'}]
    
}, {timestamps: true})

module.exports = mongoose.model('User',UserSchema)