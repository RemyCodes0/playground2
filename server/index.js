const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const gameRoutes = require('./routes/gameRoutes')

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/games", gameRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('mongo connected')})
.catch((err)=>console.log(err));

app.get('/', (req, res)=>{
    res.send("Amea Playground is running")
})

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`server runnning on port ${PORT}`))
















