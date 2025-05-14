const Game = require('../models/Game')

exports.getAllGames = async(req, res) =>{
    const games = await Game.find();
    res.json(games)
}

exports.createGame = async(req,res)=>{
    const newGame = new Game(req.body)
    await newGame.save()
    res.status(201).json(newGame)
}

exports.getGame = async(req, res) =>{
    const game = await Game.findById(req.params.id)
    res.json(game)
}

exports.updateGame = async(req, res) =>{
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, {new:true})
    res.json(updated)
}


exports.deleteGame = async(req, res)=>{
    const deleted = await Game.findByIdAndDelete(req.params.id)
    res.json({message: 'Deleted game'})
}
















