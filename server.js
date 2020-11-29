const express = require('express')
const app = express()
const mongoose = require('mongoose')
const apiResponse = require('./helpers/apiResponse')
var cors = require('cors')

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://worktodayuser_dev:q3492Rsv@206.189.88.25/WorkToDayDEV'
const PORT = process.env.PORT || 9000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', err => {
  console.error('MongoDB error', err)
})

app.use(cors())
app.use(express.json())

const apiRouter = require('./routers/api.router')
app.use('/api/', apiRouter)
app.use('/', function(req, res) {
  return apiResponse.successResponse(res, 'Welcome To Sixty Six BBQ')
})
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
