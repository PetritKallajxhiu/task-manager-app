// This is where the js app will be started, exported, ect
const express = require('express')
require('./db/mongoose')  //Nuk e ruajme diku pasi duhet vec per te aktivizuar scriptin (hapur lidhjen me DB)
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// app.use((req, res, next) => {
//     res.status(503).send('Service is in maintenance')
//     // Nqs do vendosnin next() atehere do ekzekutoheshinn funksionet e tjera
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app