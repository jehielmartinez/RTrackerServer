const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const dutiesRoutes = require('./routes/dutiesRoutes')

//DB Conection
const connectionString = process.env.DATABASE_URI
mongoose.connect(connectionString, {useNewUrlParser: true})

//Allow cross domain
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
}

//Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('client'))
app.use(allowCrossDomain)

//Routes
app.use('/api', dutiesRoutes)


module.exports = app
