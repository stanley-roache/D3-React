const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const server = express()
const router = require('./routes/routes')
const populationRouter = require('./routes/populationRoutes')

server.use(cors('*'))

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

server.use('/', router)
server.use('/population', populationRouter)

module.exports = server
