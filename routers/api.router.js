var express = require('express')
const userRoute = require('./user.router')
const loginRoute = require('../controllers/user.controller')
const checkinRoute = require('./checkin.router')
const worktimeRoute = require('./worktime.router')
var apiResponse = require('../helpers/apiResponse')

var app = express()



app.use('/user/', userRoute)
app.use('/login/', loginRoute.userLogin)
app.use('/checkin/', checkinRoute)
app.use('/worktime/', worktimeRoute)

var publicDir = require('path').join(__dirname, '../assets')
app.use(express.static(publicDir))

app.get('/', function(req, res) {
  console.log(88)
  return apiResponse.successResponse(res, 'Welcome To Sixty Six BBQ')
})
// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
module.exports = app
