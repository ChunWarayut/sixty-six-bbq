const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')

const PORT = 3456

const app = express()
app.use(cors())

app.use(bodyParser.json())
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))

require('./server/routes')(app)

app.listen(PORT)

module.exports = app
