const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const gameRoutes = require('./routes/gameRoutes')
const authRoutes = require('./routes/auth')
const scoreRoutes = require('./routes/scores')
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/games", gameRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/scores', scoreRoutes)


app.use(express.static(path.join(__dirname, 'public')))

app.get('/SpotThePlane', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'Spot the plane.html'))
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => { console.log('mongo connected') })
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send("Amea Playground is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`server runnning on port ${PORT}`))
















