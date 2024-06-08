const express = require("express")
const app = express()
const cors = require('cors')
require('express-async-errors')

const moviesRouter = require('./controllers/movies')
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

app.use(middleware.getToken)

app.use('/api/movies', moviesRouter)
app.use('/api/users', middleware.getUser, usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)

module.exports = app