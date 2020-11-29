var express = require('express')
const userRoute = require('./user.router')
const checkinRoute = require('./checkin.router')
const worktimeRoute = require('./worktime.router')
var apiResponse = require('../helpers/apiResponse')

var app = express()

app.use('/user/', userRoute)
app.use('/checkin/', checkinRoute)
app.use('/worktime/', worktimeRoute)
// app.use('/contact/', contactRoute)
// app.use('/image/', imageRoute)
// app.use('/foodmenu/', foodmenuRoute)
// app.use('/product/', productRoute)

// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
module.exports = app
