const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

router.post('/register', async(req, res)=>{
    const {username, email, password, role} = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const newUser = await User.create({username, email, password: hashedPassword, role})
        const token = jwt.sign({userId: newUser._id, role:newUser.role}, JWT_SECRET, {expiresIn: '1h'})
        res.status(201).json({message: 'user Created', userId: newUser._id, token})

    } catch(err){
        res.status(400).json({error: err.message})
    }
})


router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({error: 'User not found'});
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) return res.status(401).json({error: 'Invalid password'});

    const token = jwt.sign({userId: user._id, role: user.role}, JWT_SECRET, {expiresIn: '1d'});
    res.json({token})
    
})

module.exports = router