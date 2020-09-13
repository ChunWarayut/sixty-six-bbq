var express = require('express')
const productRoute = require('./product.router')
var apiResponse = require('../helpers/apiResponse')

var app = express()

app.use('/product/', productRoute)

app.use('/', function(req, res) {
  return apiResponse.successResponse(res, 'Welcome To Sixty Six BBQ API')
})

// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
module.exports = app
