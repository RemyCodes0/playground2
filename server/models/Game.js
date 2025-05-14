const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        unique: true,
    },
    image: String,
    likes: {
        type: Number,
        default: 0
    },
    bookmarked:{
        type: Boolean,
        default: false
    }
})


module.exports = mongoose.model("Game", GameSchema)



